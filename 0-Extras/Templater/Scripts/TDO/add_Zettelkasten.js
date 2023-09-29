str = "123a23";

function endsWithNumber(str) {
  const pattern = /\d$/;
  return pattern.test(str);
}

function endsWithLetter(str) {
  const pattern = /[a-z]$/;
  return pattern.test(str);
}

/**
 * 使用 JavaScript 实现字母加 1 的代码：
 *
 * 这段代码由 openai ChatGPT Feb 13 Version 生成，第一次生成错误，‘z’的next是 ‘a’，提醒后纠正
 *
 * 在代码中添加了一个特殊的处理逻辑，如果最后一个字母是 "z"，并且字符串的长度为 1，就直接返回 "aa"。这样就能正确地处理输入为 "z" 的情况。
 * 否则，将最后一个字符加 1。如果有进位，则对字符串中除了最后一个字符的部分进行递归，
 * 最后返回整个新字符串。如果没有进位，则只需将字符串的最后一个字符替换为新的字符并返回。
 *
 * @param {string} str
 * @returns
 */

function nextLetter(str) {
  let lastChar = str.charAt(str.length - 1);
  let carry = 0;

  if (lastChar === "z") {
    carry = 1;
    lastChar = "a";
  } else {
    lastChar = String.fromCharCode(lastChar.charCodeAt(0) + 1);
  }

  if (carry) {
    const allButLast = str.slice(0, -1);
    if (allButLast === "") {
      return "a" + lastChar;
    } else {
      return nextLetter(allButLast) + lastChar;
    }
  } else {
    return str.slice(0, -1) + lastChar;
  }
}

function replaceLastLetters(str) {
  const pattern = /[a-z]+$/;
  const matches = str.match(pattern);
  if (matches) {
    const lastLetters = matches[0];
    return (
      str.slice(0, str.length - lastLetters.length) + nextLetter(lastLetters)
    );
  } else {
    return str;
  }
}

/**
 * 这个函数会处理以下几种情况：
 *
 * 如果输入字符串为空或者没有数字，直接返回字符串末尾添加1的结果，如果字符串为空，则返回'1'。
 * 如果字符串末尾都是数字，那么和之前的实现一样，从字符串末尾往前找到第一个非数字字符的位置，将前缀和后缀分别处理，然后将它们拼接起来得到最终的字符串。
 * 如果字符串末尾不是数字，但是包含数字，那么认为这些数字组成了一个长度为1的数字串，直接将它加1并返回。例如输入 "foo"，返回 "foo1"。
 * 如果字符串末尾不是数字，并且也没有数字，那么认为没有数字子串，直接返回字符串末尾添加1的结果。例如输入 "foo!"，返回 "foo!1"。
 *
 * @param {*} s
 * @returns
 */
function incrementString(s) {
  if (!s || !/\d/.test(s)) {
    return s ? s + "1" : "1";
  }

  let i = s.length - 1;
  while (i >= 0 && /\d/.test(s[i])) {
    i--;
  }

  if (i < 0) {
    return (Number(s) + 1).toString();
  }

  let prefix = s.slice(0, i + 1);
  let suffix = s.slice(i + 1);

  return (
    prefix +
    (suffix
      ? (Number(suffix) + 1).toString().padStart(suffix.length, "0")
      : "1")
  );
}

// 返回同级别的下一个编号
function fundNextOrder(str) {
  if (endsWithLetter(str)) {
    return replaceLastLetters(str);
  }
  if (endsWithNumber(str)) {
    return incrementString(str);
  }
  return null;
}

function fundChildOrder(str) {
  return (str += endsWithNumber(str) ? "a" : "1");
}

// 测试用例
// console.log(fundNextOrder("003"));
// console.log(fundNextOrder("f003"));
// console.log(fundNextOrder("a12a99"));
// console.log(fundNextOrder("a123z"));
// console.log(fundNextOrder("a123zz"));

// console.log(fundChildOrder("003"));
// console.log(fundChildOrder("f003"));
// console.log(fundChildOrder("a12a99"));
// console.log(fundChildOrder("a123zz"));

async function add_Zettelkasten(tp) {
  await tp.file.create_new(
    "file.title",
    fundNextOrder(tp.file.title.split("-")[0]),
    true
  );
  return tp.file.title;
}
module.exports = add_Zettelkasten;

//使用：在创建一个模版，使用 <% tp.user.add_Zettelkasten(tp) %>
