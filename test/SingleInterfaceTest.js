//原始测试
const https = require('https');
const crypto = require('crypto');
const {
  APP
} = require('./util');
const {
  URIS,
  textToGBK,
  commonParams
} = require('../src/util');
const fs = require('fs');
const querystring = require('querystring');
const iconv = require('iconv-lite')
const requestOpt = {
  protocol: 'https:',
  hostname: 'api.ai.qq.com',
  port: 443,
  method: 'POST',
  path: URIS.wordseg,
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded;'
  }
};
const opt = Object.assign({}, commonParams(), {
  app_id: APP.appid,
  text: textToGBK('中国 人啊，a c ! hello word'),
  sign: ''
})


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


const getReqSign = (opt, appkey) => {
  let parList, sign, str = '', tstr = '';
  parList = ksort(opt);
  parList.map((item) => {
    if (item.value !== '') {
      str += `${item.key}=${item.value}&`;
    }
  });
  sign = crypto.createHash('md5').update(str + `app_key=${appkey}`).digest('hex').toUpperCase()
  console.log(str)
  return {
    sign,
    str
  };
}
var proxy = https.request(requestOpt, (pres) => {
  let arrBuf = [],
    bufLength = 0,
    code = pres.headers['content-type'].split('=')[1];
  pres.on('data', (chunk) => {
    arrBuf.push(chunk);
    bufLength += chunk.length;
  }).on('end', () => {
    let chunkAll = Buffer.concat(arrBuf, bufLength);;
    let decodedBody = iconv.decode(chunkAll, code ? code : 'utf8');
    let res = JSON.parse(decodedBody);
    console.log(JSON.stringify(res))
  });
}).on('error', (e) => {
  console.log(e);
});
const {
  sign,
  str
} = getReqSign(opt, APP.appkey);
// opt.sign = sign
// const postData = querystring.stringify(opt)
const postData = str + 'sign=' + sign
console.log(postData)
proxy.write(postData);
proxy.end();
