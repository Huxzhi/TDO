async function add_outcome(tp, app) {
  const Task_PATH = tp.user.TDO_config().Task_PATH;
  const Outcome_PATH = tp.user.TDO_config().Outcome_PATH;

  const current_MapPath = tp.file.folder(true);

  if (!current_MapPath.search(re) == 0) return "Not Task/Project";
  // 找到 task 对应的 outcome 内的文件夹，支持 task 包含 subTask
  const re = new RegExp("^" + Task_PATH);
  const refolder_path = current_MapPath.replace(re, Outcome_PATH);

  if (await app.vault.adapter.exists("/" + refolder_path)) {
  } else {
    await app.vault.adapter.mkdir("/" + refolder_path);
    await app.vault.adapter.update;
  }

  const folder_path = await tp.user
    .TDO_until()
    .chooseProject(refolder_path, refolder_path, tp, app);
  if (folder_path == null) return "";

  let name = await tp.system.prompt("请输入 outcome name: ");
  if (name == null) return "";

  let create_file_name = folder_path + "/" + name;

  if (await tp.file.exists(create_file_name + ".md")) {
    console.log("existed", create_file_name);
    app.workspace.activeLeaf.openFile(
      await tp.file.find_tfile(create_file_name)
    );
  } else {
    await tp.file.create_new(
      await tp.file.find_tfile("ioto_outcome"),
      name,
      false,
      await app.vault.getAbstractFileByPath(folder_path)
    );
  }
  return "[[" + name + "]]";
}
module.exports = add_outcome;
