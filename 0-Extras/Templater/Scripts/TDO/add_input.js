async function add_input(tp, app) {
  const Input_PATH = tp.user.TDO_config().Input_PATH;

  const folder_path = await tp.user
    .TDO_until()
    .chooseProject(Input_PATH, "创建文件在" + Input_PATH + "/", tp, app);
  if (folder_path == null) return "";

  const name = await tp.system.prompt("请输入 Input name: ");
  if (name == null) return "";

  await tp.file.create_new(
    await tp.file.find_tfile("ioto_input"),
    name,
    false,
    await app.vault.getAbstractFileByPath(folder_path)
  );

  return "[[" + name + "]]";
}
module.exports = add_input;
