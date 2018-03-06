const {
  APP
} = require('./util');
const {
  Translate
} = require('qqai-api-sdk');
const translate = new Translate(APP.appkey, APP.appid);

const AILab = {
  'zh_en': 1,
  'en_ch': 2,
  'zh_es': 3,
  'es_zh': 4,
  'zh_fr': 5,
  'fr_zh': 6,
  'en_vi': 7,
  'vi_en': 8,
  'zh_ct': 9,
  'ct_zh': 10,
  'zh_kr': 11,
  'en_de': 13,
  'de_en': 14,
  'zh_jp': 15,
  'jp_zh': 16
};

module.exports = class BaseLanguaeServerice {
  constructor(headers) {
    this.headers = headers;
  }
  texttrans(param, res) {
    res.writeHead(200, this.headers);
    if (param.engine === 'fyj') {
      translate.texttranslate({
        text: param.text,
        source: param.source_lan,
        target: param.target_lan
      }).then(result => {
        res.write(JSON.stringify(result));
        res.end();
      }, e => {
        res.write(JSON.stringify(e));
        res.end();
      })
    } else {
      translate.texttrans({
        type: AILab[`${param.source_lan}_${param.target_lan}`],
        text: param.text
      }).then(result => {
        res.write(JSON.stringify(result));
        res.end();
      }, e => {
        res.write(JSON.stringify(e));
        res.end();
      })
    }
  }
  imagetranslate(param, res) {
    res.writeHead(200, this.headers);
    translate.imagetranslate(param).then(result => {
      res.write(JSON.stringify(result));
      res.end();
    }, e => {
      res.write(JSON.stringify(e));
      res.end();
    })
  }
  speechtranslate(param, res) {
    res.writeHead(200, this.headers);
    translate.speechtranslate(param).then(result => {
      res.write(JSON.stringify(result));
      res.end();
    }, e => {
      res.write(JSON.stringify(e));
      res.end();
    })
  }
}
