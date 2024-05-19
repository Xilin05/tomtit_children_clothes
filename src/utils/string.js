export function splitLettersAndNumbers(str) {
  // 匹配连续的字母或数字
  const matches = str.match(/([a-zA-Z]+|\d+)/g);

  // 验证是否匹配到内容，如果没有匹配到（如空字符串）则返回一个空数组和一个空字符串
  if (!matches) {
    return ['', ''];
  }

  // 将匹配到的数组中的数字部分合并（如果有的话），字母部分同样合并
  const numbers = matches.filter(match => /^\d+$/.test(match)).join('');
  const letters = matches.filter(match => !/^\d+$/.test(match)).join('');

  // 返回分割后的字符串数组
  return [letters, numbers];
}
