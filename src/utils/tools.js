/* eslint-disable */

/**
 * @Author: SAM
 * @Description: 创建hash码
 * @Date: 2021-08-01 02:15:54
 * @param {number} hashLength 需要的hash长度
 * @return {string} hash字符串
 */
exports.createHash = function (hashLength) {
  if (!hashLength || typeof Number(hashLength) !== 'number') {
    return;
  }
  const ar = [
    ...new Array(10).fill().map((v, i) => String(i)),
    ...new Array(26).fill(97).map((v, i) => String.fromCharCode(v + i)),
  ];
  const hs = [];
  const hl = Number(hashLength);
  const al = ar.length;
  for (let i = 0; i < hl; i++) {
    hs.push(ar[Math.floor(Math.random() * al)]);
  }

  return hs.join('');
};

/**
 * @Author: SAM
 * @Description: 取随机整数
 * @Date: 2021-08-01 02:18:06
 * @param {number} min 最小整数
 * @param {number} max 小大整数
 * @return {number} 指定的随机整数
 */
exports.getRandomInt = function (min = 1, max = 10) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
