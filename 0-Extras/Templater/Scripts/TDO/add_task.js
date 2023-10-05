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
  console.log(path);
  if (path === null) {
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
  const folder_path = await tp.user
    .TDO_until()
    .chooseProject(Task_PATH, Task_PATH + "/", tp, app);

  if (folder_path.substr(-1) === "/") {
    //创建新task

    const name = await tp.system.prompt("请输入Project name");

    if (await app.vault.adapter.exists("/" + folder_path + name)) {
      console.log("task existed");
    } else {
      await app.vault.adapter.mkdir("/" + folder_path + name);
      //多层级创建文件夹会不渲染（ob的文件目录不显示），需要更新ob的文件目录
      await app.vault.adapter.update;
    }

    // 找到task 对应的 outcome 内的文件夹，支持 task 包含 subTask
    const re = new RegExp("^" + Task_PATH);
    const refolder_path = folder_path.replace(re, Outcome_PATH);

    if (await app.vault.adapter.exists("/" + refolder_path + name)) {
      console.log("outcome existed");
    } else {
      await app.vault.adapter.mkdir("/" + refolder_path + name);
      await app.vault.adapter.update;
    }
    await addTaskByProject(folder_path + name, tp, app);
  } else if (folder_path !== null) {
    await addTaskByProject(folder_path, tp, app);
  }

  return "";
}
module.exports = add_task;
