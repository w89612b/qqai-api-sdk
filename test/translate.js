const randomstring = require('randomstring');
const process = require('process');
const {
  APP,
  fsReadSync
} = require('./util');
const {
  Translate
} = require('../');
const translate = new Translate(APP.appkey, APP.appid);
/**
 * 自然语言处理-翻译类 测试文件
 * 全部测试通过
 * @author wubo  2018-01-30
 * @version 1.0.4
 */
// 文本翻译（AI Lab）
translate.texttrans({
  text: 'Hello 世界',
  type: 0
}).then((res) => {
  console.log('文本翻译(AI Lab)', JSON.stringify(res));
}, (e) => {
  console.log('文本翻译(AI Lab)', JSON.stringify(e));
})
// 文本翻译（翻译君）
translate.texttranslate({
  text: '你好',
  target: 'en'
}).then((res) => {
  console.log('文本翻译(翻译君)', JSON.stringify(res));
}, (e) => {
  console.log('文本翻译(翻译君)', JSON.stringify(e));
})
// 图片翻译
translate.imagetranslate({
  image: fsReadSync(`${__dirname}/file/kr.jpg`),
  session_id: randomstring.generate({
    length: 16,
    capitalization: 'uppercase'
  }),
  scene: 'doc',
  source: 'kr',
  target: 'zh'
}).then((res) => {
  console.log('图片翻译', JSON.stringify(res));
}, (e) => {
  console.log('图片翻译', JSON.stringify(e));
})
// 语音翻译
translate.speechtranslate({
  speech_chunk: fsReadSync(`${__dirname}/file/VOICE1513237078.pcm`),
  session_id: randomstring.generate({
    length: 16,
    capitalization: 'uppercase'
  }),
  format: 6
}).then((res) => {
  console.log('语音翻译', JSON.stringify(res));
}, (e) => {
  console.log('语音翻译', JSON.stringify(e));
})
// 语种识别
translate.textdetect({
  text: '你好'
}).then((res) => {
  console.log('语种识别', JSON.stringify(res));
}, (e) => {
  console.log('语种识别', JSON.stringify(e));
})
