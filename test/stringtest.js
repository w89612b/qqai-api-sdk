
const https = require('https');
const crypto = require('crypto');

const querystring = require('querystring');
const iconv = require('iconv-lite')
//iconv.encode(querystring.escape('你好，我是楠尼玛'), 'gbk').toString('binary')
//console.log(Utf8ToUnicode(querystring.escape('你好，我是楠尼玛')))
//'%C4%E3%BA%C3%A3%AC%CE%D2%CA%C7%E9%AA%C4%E1%C2%'
var str =  'nonce_str=61MK23K317RL1WD1&time_stamp=1517915781&app_id=1106658418&text=%C4%E3%BA%C3%A3%AC%CE%D2%CA%C7%E9%AA%C4%E1%C2%&sign=6D7458245A2236C930FD7560D5204465';
var sign = crypto.createHash('md5').update(str).digest('hex').toUpperCase()
console.log(sign)
var requestOpt = {
  protocol: 'https:',
  hostname: 'api.ai.qq.com',
  port: 443,
  method: 'POST',
  path: '/fcgi-bin/nlp/nlp_wordseg',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
};

var proxy = https.request(requestOpt , (pres) => {
  let body = ''
  pres.on('data', (d) => {
    body += d;
  }).on('end', () => {
    console.log(JSON.parse(body));
  });
}).on('error', (e) => {
  console.log(e);
});
// 写入数据到请求主体
proxy.write(str+ `&sign=${sign}`);
proxy.end();
