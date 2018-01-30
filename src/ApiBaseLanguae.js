const { URIS, commonParams } = require('./util');
const PS = require('./client/ProxyServices');
module.exports = class BaseLanguae {
  /**
   * 自然语言处理基础部分
   * @param {String} app_key 应用key
   * @param {String} app_id  应用id
   */
  constructor(appKey, appId) {
    this.appKey = appKey;
    this.appId = appId;
  }

  /**
   * 分词
   * @param {Object} param 具体参数查看：https://ai.qq.com/doc/nlpbase.shtml
   * @return A Promise Object
   */
  wordseg(param) {
    return PS(URIS.wordseg, this.appKey, Object.assign({},commonParams(), {app_id: this.appId}, param));
  }
  /**
   * 词性标注
   * @param {Object} param 具体参数查看：https://ai.qq.com/doc/nlpbase.shtml
   * @return A Promise Object
   */
  wordpos(param) {
    return PS(URIS.wordpos, this.appKey, Object.assign({},commonParams(), {app_id: this.appId}, param));
  }
  /**
   * 专有名词识别
   * @param {Object} param 具体参数查看：https://ai.qq.com/doc/nlpbase.shtml
   * @return A Promise Object
   */
  wordner(param) {
    return PS(URIS.wordner, this.appKey, Object.assign({},commonParams(), {app_id: this.appId}, param));
  }
  /**
   * 同义词识别
   * @param {Object} param 具体参数查看：https://ai.qq.com/doc/nlpbase.shtml
   * @return A Promise Object
   */
  wordsyn(param) {
    return PS(URIS.wordsyn, this.appKey, Object.assign({},commonParams(), {app_id: this.appId}, param));
  }
  /**
   * 语义解析
   * @param {Object} param 具体参数查看：https://ai.qq.com/doc/nlpsem.shtml
   * @return A Promise Object
   */
  wordcom(param) {
    return PS(URIS.wordcom, this.appKey, Object.assign({},commonParams(), {app_id: this.appId}, param));
  }
  /**
   * 情感分析
   * @param {Object} param 具体参数查看：https://ai.qq.com/doc/nlpemo.shtml
   * @return A Promise Object
   */
  textpolar(param) {
    return PS(URIS.textpolar, this.appKey, Object.assign({},commonParams(), {app_id: this.appId}, param));
  }
  /**
   * 智能闲聊
   * @param {Object} param 具体参数查看：https://ai.qq.com/doc/nlpchat.shtml
   * @return A Promise Object
   */
  textchat(param) {
    return PS(URIS.textchat, this.appKey, Object.assign({},commonParams(), {app_id: this.appId}, param));
  }
}
