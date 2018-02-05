const randomstring = require('randomstring');
const {
  APP,
  fsReadSync,
  ttformat
} = require('./util');
const {
  BaseLanguae
} = require('../');
const baseLanguae = new BaseLanguae(APP.appkey, APP.appid);
/**
 * 自然语言处理-基本类 API 测试文件
 * @author wubo  2018-02-05
 * @version 1.1.1
 */
// baseLanguae.wordseg('今天的天气怎么样').then((res) => {
//   console.log('基本文本分析 分词', JSON.stringify(res));
// }, (e) => {
//   console.log('基本文本分析 分词', JSON.stringify(e));
// });
// baseLanguae.wordseg('腾讯人工智能').then((res) => {
//   console.log('基本文本分析 词性标注', JSON.stringify(res));
// }, (e) => {
//   console.log('基本文本分析 词性标注', JSON.stringify(e));
// });
// baseLanguae.wordseg('最近张学友在深圳开了一场演唱会').then((res) => {
//   console.log('基本文本分析 专有名词识别', JSON.stringify(res));
// }, (e) => {
//   console.log('基本文本分析 专有名词识别', JSON.stringify(e));
// });
// baseLanguae.wordseg('今天的天气怎么样').then((res) => {
//   console.log('基本文本分析 同义词识别', JSON.stringify(res));
// }, (e) => {
//   console.log('基本文本分析 同义词识别', JSON.stringify(e));
// });

baseLanguae.wordcom('Despacito歌词搜索').then((res) => {
  console.log('语义解析', JSON.stringify(res));
}, (e) => {
  console.log('语义解析', JSON.stringify(e));
});
baseLanguae.textpolar('今天的天气不错呀').then((res) => {
  console.log('情感分析识别', JSON.stringify(res));
}, (e) => {
  console.log('情感分析识别', JSON.stringify(e));
});
baseLanguae.textchat({ question:'今天的天气不错呀', session: randomstring.generate({
  length: 16,
  capitalization: 'uppercase'
})}).then((res) => {
  console.log('基础闲聊', JSON.stringify(res));
}, (e) => {
  console.log('基础闲聊', JSON.stringify(e));
});
