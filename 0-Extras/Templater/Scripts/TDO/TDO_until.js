function TDO_until() {
  return {
    /** 输入文件夹路径，循环遍历访问该项目下的文件夹
     *
     * 用到了递归
     * @param path 为 filemap 的 path ，类型为 string
     * @param placeholder Placeholder string of the prompt ，类型为 string
     *  */
    chooseProject: async function chooseProject(path, placeholder, tp, app) {
      let sg = app.vault.fileMap[path];

      while (
        "children" in sg &&
        sg.children.filter((v) => "children" in v).length
      ) {
        let item = sg.children
          .filter((v) => "children" in v)
          .map((v) => v.path);
        let itemOfName = item.map(
          (v, i) => "【" + (i + 1) + "】" + v.split("/").slice(-1)
        );

        item.unshift(sg.path);
        itemOfName.unshift("【0】" + "创建 新项目");
        if (sg.parent.parent !== null) {
          console.log(sg.parent.parent);
          item.push(sg.parent.path);
          itemOfName.push("【z】" + "返回上一级");
        }
        // console.log(itemOfName, item);
        const subpath = await tp.system.suggester(
          itemOfName,
          item,
          false,
          sg.path
        );
        if (subpath === null) break;
        if (subpath === sg.path) {
          let name = await tp.system.prompt("请输入Project name");

          if (await app.vault.adapter.exists("/" + subpath + "/" + name)) {
          } else {
            await app.vault.adapter.mkdir("/" + subpath + "/" + name);
          }
          //多层级创建文件夹会不渲染（ob的文件目录不显示），需要更新ob的文件目录
          await app.vault.adapter.update;
          return subpath + "/" + name;
        }
        sg = app.vault.fileMap[subpath];
      }
      return sg.path;
    },
  };
}

module.exports = TDO_until;
