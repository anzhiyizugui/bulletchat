/* eslint-disable */

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

exports.getRandomInt = function (min = 1, max = 5) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
