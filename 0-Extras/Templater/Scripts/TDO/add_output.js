async function add_output(tp, app) {
  const Output_PATH = tp.user.TDO_config().Output_PATH;

  const folder_path = await tp.user
    .TDO_until()
    .chooseProject(Output_PATH, Output_PATH + "/", tp, app);
  if (folder_path == null) return "";

  const name = await tp.system.prompt("请输入 Output name: ");
  if (name == null) return "";

  await tp.file.create_new(
    await tp.file.find_tfile("ioto_output"),
    name,
    false,
    await app.vault.getAbstractFileByPath(folder_path)
  );

  return "[[" + name + "]]";
}
module.exports = add_output;
