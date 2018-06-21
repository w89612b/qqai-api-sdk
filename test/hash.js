const crypto = require('crypto');
const ksort = (opt) => {
  let arrayList = [],
    sort = (a, b) => {
      return a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
    };
  for (let key in opt) {
    arrayList.push({
      "key": key,
      "value": opt[key]
    })
  }
  return arrayList.sort(sort)
}


const getReqSign = (opt) => {
  let parList, sign, str = '',
    hashOpt = {};
  // 添加uid和userid参数
  opt.userid = userId;
  opt.uid = new Date().getTime();
  // 升序排列
  parList = ksort(opt);
  // 组合升序新的签名对象
  parList.map((item) => {
    if (item.value !== '') {
      hashOpt[item.key] = item.value;
    }
  });
  // 组装需要签名的字符串
  str = `${opt.userid}${JSON.stringify(hashOpt)}${opt.uid}`;
  // 签名
  sign = crypto.createHash('md5').update(str).digest('hex').toUpperCase()
  console.log(str, '  ', sign)
  return sign;
}
var opt = {
  userName: 'nihao123',
  password: '333333',
  text: '中国 人 啊'
};
opt.hash = getReqSign(opt, 129);

console.log(JSON.stringify(opt))