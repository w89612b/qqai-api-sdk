const { URIS, commonParams } = require('./util');
const PS = require('./client/ProxyServices');
module.exports = class Speech{
  /**
   * 智能语音API服务类
   * @param {String} app_key 应用key
   * @param {String} app_id  应用id
   */
  constructor(appKey, appId) {
    this.appKey = appKey;
    this.appId = appId;
  }
  /**
   * 语音合成（AI Lab）
   * @param {Object} param 具体参数查看：https://ai.qq.com/doc/aaitts.shtml
   * @return A Promise Object
   */
  tts(param) {
    return PS(URIS.tta, this.appKey, Object.assign({},commonParams(), {app_id: this.appId}, param));
  }
  /**
   * 语音合成（优图）
   * @param {Object} param 具体参数查看：https://ai.qq.com/doc/aaitts.shtml
   * @return A Promise Object
   */
  tta(param) {
    return PS(URIS.tta, this.appKey, Object.assign({},commonParams(), {app_id: this.appId}, param));
  }
  /**
   * 语音识别-echo版
   * @param {Object} param 具体参数查看：https://ai.qq.com/doc/aaiasr.shtml
   * @return A Promise Object
   */
  asr(param) {
    return PS(URIS.asr, this.appKey, Object.assign({},commonParams(), {app_id: this.appId}, param));
  }
  /**
   * 语音识别-流式版（AI Lab）
   * @param {Object} param 具体参数查看：https://ai.qq.com/doc/aaiasr.shtml
   * @return A Promise Object
   */
  asrs(param) {
    return PS(URIS.asrs, this.appKey, Object.assign({},commonParams(), {app_id: this.appId}, param));
  }
  /**
   * 语音识别-流式版(WeChat AI)
   * @param {Object} param 具体参数查看：https://ai.qq.com/doc/aaiasr.shtml
   * @return A Promise Object
   */
  wxasrs(param) {
    return PS(URIS.wxasrs, this.appKey, Object.assign({},commonParams(), {app_id: this.appId}, param));
  }
  /**
   * 长语音识别
   * @param {Object} param 具体参数查看：https://ai.qq.com/doc/wxasrlong.shtml
   * @return A Promise Object
   */
  wxasrlong(param) {
    return PS(URIS.wxasrlong, this.appKey, Object.assign({},commonParams(), {app_id: this.appId}, param));
  }
}
