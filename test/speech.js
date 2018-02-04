const randomstring = require('randomstring');
const process = require('process');
const fs = require('fs');
const {
  APP,
  fsReadSync,
  ttformat
} = require('./util');
const {
  Speech
} = require('../');
const speech = new Speech(APP.appkey, APP.appid);
/**
 * 智能语音 测试文件
 * 语音识别-流式版（AI Lab）、语音识别-流式版(WeChat AI)、长语音识别  没有具体测试 不明朗
 * @author wubo  2018-02-04
 * @version 1.1.0
 */
speech.tts({
  text: '你好中国',
  speaker: 1,
  format: 2,
  volume: 10,
  speed: 100,
  aht: 0,
  apc: 58
}).then((res) => {
  let nowdate = Date.now();
  let dir = !!process.platform.match(/^win/) ? `${__dirname}\\tts\\tts_${nowdate}_Voice.${ttformat[res.data.format]}` : `${__dirname}/tts/tts_${nowdate}_Voice.${ttformat[res.data.format]}`;
  fs.writeFileSync(dir, new Buffer(res.data.speech, 'base64'));
  console.log('语音合成TTS', `文件存放位置${dir}`);
}, (e) => {
  console.log('语音合成TTS', JSON.stringify(e));
});

speech.tta({
  text: '中国心',
  model_type: 0,
  speed: 0
}).then((res) => {
  let nowdate = Date.now();
  let dir = !!process.platform.match(/^win/) ? `${__dirname}\\tta\\tta_${nowdate}_Voice.${ttformat['3']}` : `${__dirname}/tta/tta_${nowdate}_Voice.${ttformat['3']}`;
  fs.writeFileSync(dir, new Buffer(res.data.voice, 'base64'));
  console.log('语音合成TTA', `文件存放位置${dir}`);
}, (e) => {
  console.log('语音合成TTA', JSON.stringify(e));
});

speech.asr({
  speech: fsReadSync(`${__dirname}/file/tts_1516976077578_Voice.wav`),
  rate: 16000
}).then((res) => {
  console.log('语音识别-echo版 WAV', JSON.stringify(res));
}, (e) => {
  console.log('语音识别-echo版 WAV', JSON.stringify(e));
});
