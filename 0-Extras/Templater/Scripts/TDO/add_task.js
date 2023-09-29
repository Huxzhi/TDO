/**
 * IOTO 理念我很喜欢  https://www.bilibili.com/video/BV1Y14y1r7xJ/
 * 没有看代码，我打算自己实现一个用 templates 来实现
 * 官方参考：https://silentvoid13.github.io/Templater/
 * 其他参考：https://forum-zh.obsidian.md/t/topic/9014
 */

//创建一个任务，先去项目文件夹找存在的项目，每任务是我一天之内做的具体内容

/**
 *
 * @param {*} path 不带根目录 / 的路径
 * @param {*} tp
 * @param {*} app
 * @returns
 */

async function addTaskByProject(path, tp, app) {
  if (path == null) {
    return "path is null";
  }
  const sg = app.vault.fileMap[path];
  let create_file_name =
    sg.path + "/" + sg.name + "-" + tp.date.now("YYYY-MM-DD");

  if (await tp.file.exists(create_file_name + ".md")) {
    console.log("existed", create_file_name);
  } else {
    await tp.file.create_new(
      await tp.file.find_tfile("ioto_task"),
      sg.name + "-" + tp.date.now("YYYY-MM-DD"),
      false,
      await app.vault.getAbstractFileByPath(sg.path)
    );
  }
  app.workspace.activeLeaf.openFile(await tp.file.find_tfile(create_file_name));
  // return sg
  return sg.name + "-" + tp.date.now("YYYY-MM-DD");
}

/** 创建一个项目
 * @param  tp tamplates 插件
 * @param app ob API
 * @return fileMap
 *  */

async function add_task(tp, app) {
  const Task_PATH = tp.user.TDO_config().Task_PATH;
  const Outcome_PATH = tp.user.TDO_config().Outcome_PATH;

  let path = await tp.user
    .TDO_until()
    .chooseProject(Task_PATH, Task_PATH + "/", tp, app);

  if (
    app.vault.fileMap.hasOwnProperty(path) &&
    "children" in app.vault.fileMap[path]
  ) {
    const re = new RegExp("^" + Task_PATH);

    // 找到task 对应的 outcome 内的文件夹，支持 task 包含 subTask
    const folder_path = path.replace(re, Outcome_PATH);

    if (await app.vault.adapter.exists("/" + folder_path)) {
    } else {
      await app.vault.adapter.mkdir("/" + folder_path);
      await app.vault.adapter.update;
    }
  }

  await addTaskByProject(path, tp, app);

  return "";
}
module.exports = add_task;
