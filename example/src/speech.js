const randomstring = require('randomstring');
const process = require('process');
const fs = require('fs');
const {
  APP,
  ttformat
} = require('./util');
const {
  Speech
} = require('qqai-api-sdk');
const speech = new Speech(APP.appkey, APP.appid);
/**
 * 智能语音服务类
 * @author wubo  2018-02-07
 * @version 0.0.1
 */
module.exports = class SpeechService {
  constructor(headers) {
    this.headers = headers;
  }

  tts(params, res) {
    res.writeHead(200, this.headers);
    speech.tts(params).then((result) => {
      if (!result.ret) {
        let nowdate = Date.now();
        let dir = !!process.platform.match(/^win/) ? `${__dirname}\\..\\tts\\tts_${nowdate}_Voice.${ttformat[result.data.format]}` : `${__dirname}/../tts/tts_${nowdate}_Voice.${ttformat[result.data.format]}`;
        fs.writeFileSync(dir, new Buffer(result.data.speech, 'base64'));
        res.write(JSON.stringify({
          "url": `/tts/tts_${nowdate}_Voice.${ttformat[result.data.format]}`
        }));
        res.end();
      } else {
        res.write(JSON.stringify(result));
        res.end();
      }
    }, (e) => {
      // 发生网络错误
      res.write(JSON.stringify(e))
      res.end();
    });
  }

  tta(params, res) {
    res.writeHead(200, this.headers);
    speech.tta(params).then((result) => {
      if (!result.ret) {
        let nowdate = Date.now();
        let dir = !!process.platform.match(/^win/) ? `${__dirname}\\..\\tta\\tta_${nowdate}_Voice.${ttformat['1']}` : `${__dirname}/../tta/tta_${nowdate}_Voice.${ttformat['1']}`;
        fs.writeFileSync(dir, new Buffer(result.data.voice, 'base64'));
        res.write(JSON.stringify({
          "url": `/tta/tta_${nowdate}_Voice.${ttformat['1']}`
        }));
        res.end();
      } else {
        res.write(JSON.stringify(result));
        res.end();
      }
    }, (e) => {
      // 发生网络错误
      res.write(JSON.stringify(e))
      res.end();
    });
  }

  asr(params, res) {
    res.writeHead(200, this.headers);
    speech.asr(params).then((result) => {
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      // 发生网络错误
      res.write(JSON.stringify(e))
      res.end();
    });
  }
}
