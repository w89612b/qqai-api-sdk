const {
  APP
} = require('./util');
const {
  BaseLanguae
} = require('qqai-api-sdk');
const baseLanguae = new BaseLanguae(APP.appkey, APP.appid);
// 词性定义
const pos_code = {
  "0": "未知词性",
  "1": "形容词",
  "2": "副形词",
  "3": "名形词",
  "4": "区别词",
  "5": "连词",
  "6": "副词",
  "7": "叹词",
  "8": "方位词",
  "9": "语素词",
  "10": "前接成分",
  "11": "成语",
  "12": "简称略语",
  "13": "后接成分",
  "14": "习用语",
  "15": "数词",
  "16": "名词",
  "17": "人名",
  "18": "姓",
  "19": "名",
  "20": "地名",
  "21": "机构团体",
  "22": "其他专名",
  "23": "非汉字串",
  "24": "拟声词",
  "25": "介词",
  "26": "量词",
  "27": "代词",
  "28": "处所词",
  "29": "时间词",
  "30": "助词",
  "31": "动词",
  "32": "副动词",
  "33": "名动词",
  "34": "标点符号",
  "35": "非语素字",
  "36": "语气词",
  "37": "状态词",
  "38": "形语素",
  "39": "区别语素",
  "40": "副语素",
  "41": "数词性语素",
  "42": "名语素",
  "43": "量语素",
  "44": "代语素",
  "45": "时语素",
  "46": "动语素",
  "47": "语气词语素",
  "48": "状态词语素",
  "49": "开始词",
  "50": "URL",
  "51": "电话号码",
  "52": "email",
  "55": "结束词"
};
// 专有名词编码
const types = {
  1000: '人名',
  1100: '地名',
  1200: '机构名',
  1300: '时间'
};
// 意图编码定义
const intents = {
  "0": "未知",
  "1": "天气",
  "2": "音乐",
  "3": "股票",
  "4": "新闻"
};
// 成分编码定义
const comTypes = {
  "0": "未知",
  "1": "歌词",
  "2": "下载地址",
  "3": "乐器",
  "4": "歌曲",
  "5": "人名",
  "6": "时间",
  "7": "地点",
  "8": "风格",
  "9": "数字",
  "10": "视频",
  "11": "民族",
  "12": "专辑",
  "13": "序数词",
  "14": "综艺",
  "15": "乐队",
  "16": "景点",
  "17": "电影",
  "18": "电视剧",
  "19": "百科",
  "34": "股票名称",
  "35": "股票代码",
  "36": "指数",
  "37": "价格",
  "38": "行情",
  "40": "山",
  "41": "湖",
  "42": "是否",
  "43": "餐馆",
  "44": "菜名",
  "45": "儿歌",
  "46": "故事",
  "47": "相声",
  "48": "评书",
  "49": "有声内容",
  "128": "类别词",
  "129": "关系词",
  "130": "省略词"
};
// 情感编码
const polar = {
  '-1': '负面',
  '0': '中性',
  '1': '正面'
};
module.exports = class BaseLanguaeServerice {
  constructor(headers) {
    this.headers = headers;
  }
  // 基础闲聊
  textchat(param, res) {
    res.writeHead(200, this.headers);
    baseLanguae.textchat(param).then(result => {
      res.write(JSON.stringify(result));
      res.end();
    }, e => {
      res.write(JSON.stringify(e));
      res.end();
    })
  }
  // 基础文本分析
  wordseg(param, res) {
    res.writeHead(200, this.headers);
    baseLanguae.wordseg(param).then(result => {
      res.write(JSON.stringify(result));
      res.end();
    }, e => {
      res.write(JSON.stringify(e));
      res.end();
    })
  }
  wordpos(param, res) {
    res.writeHead(200, this.headers);
    baseLanguae.wordpos(param).then(result => {
      if (!result.ret) {
        result.data.base_tokens.map(item => {
          item.pos_code = pos_code[item.pos_code];
        })
        result.data.mix_tokens.map(item => {
          item.pos_code = pos_code[item.pos_code];
        })
      }
      res.write(JSON.stringify(result));
      res.end();
    }, e => {
      res.write(JSON.stringify(e));
      res.end();
    })
  }
  wordner(param, res) {
    res.writeHead(200, this.headers);
    baseLanguae.wordner(param).then(result => {
      if (!result.ret) {
        if (result.data.ner_tokens.length) {
          result.data.ner_tokens.map(item => {
            item.types[0] = types[item.types[0]];
          })
        }
      }
      res.write(JSON.stringify(result));
      res.end();
    }, e => {
      res.write(JSON.stringify(e));
      res.end();
    })
  }
  wordsyn(param, res) {
    res.writeHead(200, this.headers);
    baseLanguae.wordsyn(param).then(result => {
      res.write(JSON.stringify(result));
      res.end();
    }, e => {
      res.write(JSON.stringify(e));
      res.end();
    })
  }

  wordcom(param, res) {
    res.writeHead(200, this.headers);
    baseLanguae.wordcom(param).then(result => {
      if (!result.ret) {
        result.data.intent = intents[result.data.intent];
        let key = 0,
          tokens = [],
          temp = [],
          ttokens = result.data.com_tokens.sort((a, b) => {
            return a.com_type < b.com_type ? -1 : a.com_type > b.com_type ? 1 : 0;
          });
        key = ttokens[0].com_type;
        ttokens.map(item => {
          if (key !== item.com_type) {
            tokens.push({
              com_type: key,
              com_name: comTypes[key],
              com_words: temp
            })
            key = item.com_type;
            temp = [];
          }
          temp.push(item.com_word)
        })
        tokens.push({
          com_type: key,
          com_name: comTypes[key],
          com_words: temp
        })
        result.data.com_tokens = tokens;
      }
      res.write(JSON.stringify(result));
      res.end();

    }, e => {
      res.write(JSON.stringify(e));
      res.end();
    })
  }
  textpolar(param, res) {
    res.writeHead(200, this.headers);
    baseLanguae.textpolar(param).then(result => {
      if (!result.ret) {
        result.data.polar = polar[result.data.polar]
      }
      res.write(JSON.stringify(result));
      res.end();
    }, e => {
      res.write(JSON.stringify(e));
      res.end();
    })
  }
}
