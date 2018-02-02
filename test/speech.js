const { Speech } = require('../');

const APP = {
  // 设置请求数据（应用密钥、接口请求参数）
  appkey: 'de80dZriJUIpyYaA',
  appid: '1106658418'
};
const speech = new Speech(APP.appkey, APP.appid);

speech.asr({speech: '', rate:16000}).then((res)=>{
  console.log('语音识别-echo版',JSON.stringify(res));
}, (e)=>{
  console.log('语音识别-echo版',JSON.stringify(e));
});
