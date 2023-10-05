function TDO_until() {
  return {
    /** 输入文件夹路径， 用 suggester 选择访问该项目下的文件夹
     *
     * @returns 注意: 选择的文件夹下面有子文件夹，会在末尾添加 `/`
     *
     * @param path 为 filemap 的 path ，类型为 string
     * @param placeholder Placeholder string of the prompt ，类型为 string
     *  */
    chooseProject: async function chooseProject(path, placeholder, tp, app) {
      let sg = app.vault.fileMap[path];

      while (
        "children" in sg &&
        sg.children.filter((v) => "children" in v).length &&
        sg.parent !== null
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
          // console.log(sg.parent.parent);
          item.push(sg.parent.path);
          itemOfName.push("【ESC】" + "返回上一级");
        }
        // console.log(itemOfName, item);
        const subpath = await tp.system.suggester(
          itemOfName,
          item,
          false,
          placeholder
        );
        if (subpath === null) {
          if (sg.parent.parent == null) {
            console.log("Cancel suggester");
            return null;
          }
          //返回上一级
          sg = sg.parent;
          continue;
        }
        if (subpath === sg.path) {
          return subpath + "/";
        }
        sg = app.vault.fileMap[subpath];
      }
      return sg.path;
    },
  };
}

module.exports = TDO_until;
