/**
 * 测试通用类
 * @author wubo  2018-02-04
 * @version 1.1.0
 */
const fs = require('fs');

module.exports.APP = {
  // 设置请求数据（应用密钥、接口请求参数）
  appkey: '',
  appid: ''
};

module.exports.fsReadSync = function (fsPath) {
  return fs.readFileSync(fsPath, {
    encoding: 'base64'
  });
}

module.exports.ttformat = {
  '1': 'pcm',
  '2': 'wav',
  '3': 'mp3'
}
