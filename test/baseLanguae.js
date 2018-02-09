const randomstring = require('randomstring');
const iconv = require('iconv-lite')
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
 * @update
 *  2018-02-07  解决了GBK转码问题 全部测试通过  V1.1.3
 */
baseLanguae.wordseg('中国 人啊，a c ! hello word').then((res) => {
  console.log('基本文本分析 分词', JSON.stringify(res));
}, (e) => {
  console.log('基本文本分析 分词', JSON.stringify(e));
});
// 词性定义
const pos_code =  {"0":"未知词性","1":"形容词","2":"副形词","3":"名形词","4":"区别词","5":"连词","6":"副词","7":"叹词","8":"方位词","9":"语素词","10":"前接成分","11":"成语","12":"简称略语","13":"后接成分","14":"习用语","15":"数词","16":"名词","17":"人名","18":"姓","19":"名","20":"地名","21":"机构团体","22":"其他专名","23":"非汉字串","24":"拟声词","25":"介词","26":"量词","27":"代词","28":"处所词","29":"时间词","30":"助词","31":"动词","32":"副动词","33":"名动词","34":"标点符号","35":"非语素字","36":"语气词","37":"状态词","38":"形语素","39":"区别语素","40":"副语素","41":"数词性语素","42":"名语素","43":"量语素","44":"代语素","45":"时语素","46":"动语素","47":"语气词语素","48":"状态词语素","49":"开始词","50":"URL","51":"电话号码","52":"email","55":"结束词"};
baseLanguae.wordpos('腾讯人工智能').then((res) => {
  res.data.base_tokens.map(item=>{
    item.pos_code = pos_code[item.pos_code];
  })
  res.data.mix_tokens.map(item=>{
    item.pos_code = pos_code[item.pos_code];
  })
  console.log('基本文本分析 词性标注', JSON.stringify(res));
}, (e) => {
  console.log('基本文本分析 词性标注', JSON.stringify(e));
});
// 专有名词编码
const types = {1000:'人名', 1100: '地名', 1200: '机构名', 1300: '时间'};
baseLanguae.wordner('最近张学友在深圳开了一场演唱会').then((res) => {
  res.data.ner_tokens.map(item=>{
    item.types[0] =  types[item.types[0]];
  })
  console.log('基本文本分析 专有名词识别', JSON.stringify(res));
}, (e) => {
  console.log('基本文本分析 专有名词识别', JSON.stringify(e));
});
baseLanguae.wordsyn('今天的天气怎么样').then((res) => {
  console.log('基本文本分析 同义词识别', JSON.stringify(res));
}, (e) => {
  console.log('基本文本分析 同义词识别', JSON.stringify(e));
});
// 意图编码定义
const intents = {"0":"未知","1":"天气","2":"音乐","3":"股票","4":"新闻"};
// 成分编码定义
const comTypes = {"0":"未知","1":"歌词","2":"下载地址","3":"乐器","4":"歌曲","5":"人名","6":"时间","7":"地点","8":"风格","9":"数字","10":"视频","11":"民族","12":"专辑","13":"序数词","14":"综艺","15":"乐队","16":"景点","17":"电影","18":"电视剧","19":"百科","34":"股票名称","35":"股票代码","36":"指数","37":"价格","38":"行情","40":"山","41":"湖","42":"是否","43":"餐馆","44":"菜名","45":"儿歌","46":"故事","47":"相声","48":"评书","49":"有声内容","128":"类别词","129":"关系词","130":"省略词"};
baseLanguae.wordcom('Despacito歌词搜索').then((res) => {
  res.data.intent = intents[res.data.intent];
  res.data.com_tokens.map(item=>{
    item.com_type = comTypes[item.com_type]
  })
  console.log('语义解析', JSON.stringify(res));
}, (e) => {
  console.log('语义解析', JSON.stringify(e));
});
// 情感编码
const polar = {'-1':'负面', '0':'中性', '1':'正面'};
baseLanguae.textpolar('今天的天气不错呀').then((res) => {
  res.data.polar =  polar[res.data.polar]
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
