const { Translate } = require('../');
const fs = require('fs');
function readFSacyn(fspath){
  return fs.readFileSync(fspath, {encoding: 'base64'});
}
const APP = {
  // 设置请求数据（应用密钥、接口请求参数）
  appkey: 'de80dZriJUIpyYaA',
  appid: '1106658418'
}
const translate = new Translate(APP.appkey, APP.appid);
// 文本翻译（AI Lab）
translate.texttrans({text: '你好'}).then((res)=>{
  console.log('文本翻译(AI Lab)',JSON.stringify(res));
}, (e)=>{
  console.log('文本翻译(AI Lab)',JSON.stringify(e));
})
// 文本翻译（翻译君）
translate.texttranslate({text: '你好', target: 'en'}).then((res)=>{
  console.log('文本翻译(翻译君)',JSON.stringify(res));
}, (e)=>{
  console.log('文本翻译(翻译君)',JSON.stringify(e));
})
// 图片翻译
translate.imagetranslate({image: readFSacyn(`${__dirname}/file/jp.jpg`), session_id: 'test123456', scene: 'doc', source:'jp', target: 'zh'}).then((res)=>{
  console.log('图片翻译',JSON.stringify(res));
}, (e)=>{
  console.log('图片翻译',JSON.stringify(e));
})
// 语音翻译
translate.speechtranslate({speech_chunk: readFSacyn(`${__dirname}/file/tta_1516975854420_Voice.pcm`), session_id: 'test123456',format:6}).then((res)=>{
  console.log('语音翻译',JSON.stringify(res));
}, (e)=>{
  console.log('语音翻译',JSON.stringify(e));
})
// 语种识别
translate.textdetect({text: '你好'}).then((res)=>{
  console.log('语种识别',JSON.stringify(res));
}, (e)=>{
  console.log('语种识别',JSON.stringify(e));
})
