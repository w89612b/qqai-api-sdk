/**
 * 定义通用类
 * @exports URIS 请求接口地址数据
 * @exports commonParams 签名通用字段处理方法 时间和随机字符串
 * @exports error 参数错误处理方法， 模拟服务器返回 通用定义错误类型为4096
 * @author wubo 2018-01-30
 * @version 1.0.4
 * @update
 *  2018-02-08 解决GBK转码问题 去掉Stack, nulBase ,  修改textToGBK V1.1.4
 *  2018-02-07 解决GBK转码问题 加入Stack, nulBase , textToGBK V1.1.3
 *  2018-06-21 加入OCRURI 车牌识别和手写体识别 V1.2.2
 */
const randomString = require('randomstring');
const iconv = require('iconv-lite');
module.exports.URIS = {
  // 智能语音
  // 语音合成doc https://ai.qq.com/doc/aaitts.shtml
  tts: '/fcgi-bin/aai/aai_tts',
  tta: '/fcgi-bin/aai/aai_tta',
  // 语音识别doc https://ai.qq.com/doc/aaiasr.shtml
  asr: '/fcgi-bin/aai/aai_asr',
  asrs: '/fcgi-bin/aai/aai_asrs',
  wxasrs: '/fcgi-bin/aai/aai_wxasrs',
  // 长语音识别doc https://ai.qq.com/doc/wxasrlong.shtml
  wxasrlong: '/fcgi-bin/aai/aai_wxasrlong',
  // 关键词检索doc https://ai.qq.com/doc/detectword.shtml
  detectword:'/fcgi-bin/aai/aai_detectkeyword',
  // 自然语言处理
  // 基本文本分析doc https://ai.qq.com/doc/nlpbase.shtml
  wordseg: '/fcgi-bin/nlp/nlp_wordseg',
  wordpos: '/fcgi-bin/nlp/nlp_wordpos',
  wordner: '/fcgi-bin/nlp/nlp_wordner',
  wordsyn: '/fcgi-bin/nlp/nlp_wordsyn',
  // 语义解析doc https://ai.qq.com/doc/nlpsem.shtml
  wordcom: '/fcgi-bin/nlp/nlp_wordcom',
  // 情感分析doc https://ai.qq.com/doc/nlpemo.shtml
  textpolar: '/fcgi-bin/nlp/nlp_textpolar',
  // 智能闲聊doc https://ai.qq.com/doc/nlpchat.shtml
  textchat: '/fcgi-bin/nlp/nlp_textchat',
  // 机器翻译
  // 文本翻译doc https://ai.qq.com/doc/nlptrans.shtml
  texttrans: '/fcgi-bin/nlp/nlp_texttrans',
  texttranslate: '/fcgi-bin/nlp/nlp_texttranslate',
  // 图片翻译doc https://ai.qq.com/doc/imagetranslate.shtml
  imagetranslate: '/fcgi-bin/nlp/nlp_imagetranslate',
  // 语音翻译doc https://ai.qq.com/doc/speechtranslate.shtml
  speechtranslate: '/fcgi-bin/nlp/nlp_speechtranslate',
  // 语种识别doc https://ai.qq.com/doc/textdetect.shtml
  textdetect: '/fcgi-bin/nlp/nlp_textdetect',
  // 计算机视觉
  // 智能鉴黄doc https://ai.qq.com/doc/jianhuang.shtml
  porn: '/fcgi-bin/vision/vision_porn',
  // 暴恐图片识别doc https://ai.qq.com/doc/imageterrorism.shtml
  terrorism: '/fcgi-bin/image/image_terrorism',
  // OCR识别
  // 身份证OCR识别doc https://ai.qq.com/doc/ocridcardocr.shtml
  idcardocr: '/fcgi-bin/ocr/ocr_idcardocr',
  // 名片OCR识别doc https://ai.qq.com/doc/ocrbcocr.shtml
  bcocr: '/fcgi-bin/ocr/ocr_bcocr',
  // 行驶证驾驶证OCR识别doc https://ai.qq.com/doc/ocrdriverlicenseocr.shtml
  driverlicenseocr: '/fcgi-bin/ocr/ocr_driverlicenseocr',
  // 营业执照OCR识别doc https://ai.qq.com/doc/ocrbizlicenseocr.shtml
  bizlicenseocr: '/fcgi-bin/ocr/ocr_bizlicenseocr',
  // 银行卡OCR识别doc https://ai.qq.com/doc/ocrcreditcardocr.shtml
  creditcardocr: '/fcgi-bin/ocr/ocr_creditcardocr',
  // 通用OCR识别doc https://ai.qq.com/doc/ocrgeneralocr.shtml
  generalocr: '/fcgi-bin/ocr/ocr_generalocr',
  // 车牌OCR 识别doc:https://ai.qq.com/doc/plateocr.shtml
  plateocr: '/fcgi-bin/ocr/ocr_plateocr',
  // 手写体OCR 识别doc:https://ai.qq.com/doc/handwritingocr.shtml
  handwritingocr: '/fcgi-bin/ocr/ocr_handwritingocr',
  // 人脸识别
  // 人脸分析doc https://ai.qq.com/doc/detectface.shtml
  detectface: '/fcgi-bin/face/face_detectface',
  // 多人脸检测doc https://ai.qq.com/doc/detectmultiface.shtml
  detectmultiface: '/fcgi-bin/face/face_detectmultiface',
  // 人脸对比doc https://ai.qq.com/doc/facecompare.shtml
  facecompare: '/fcgi-bin/face/face_facecompare',
  // 跨年龄人脸识别doc https://ai.qq.com/doc/detectcrossageface.shtml
  detectcrossageface: '/fcgi-bin/face/face_detectcrossageface',
  // 五官定位doc https://ai.qq.com/doc/faceshape.shtml
  faceshape: '/fcgi-bin/face/face_faceshape',
  // 人脸识别doc https://ai.qq.com/doc/faceidentify.shtml
  faceidentify: '/fcgi-bin/face/face_faceidentify',
  // 人脸验证doc https://ai.qq.com/doc/faceverify.shtml
  faceverify: '/fcgi-bin/face/face_faceverify',
  // 个体管理
  // 个体创建doc https://ai.qq.com/doc/newperson.shtml
  newperson: '/fcgi-bin/face/face_newperson',
  // 删除个体doc https://ai.qq.com/doc/delperson.shtml
  delperson: '/fcgi-bin/face/face_delperson',
  // 增加人脸doc https://ai.qq.com/doc/addface.shtml
  addface: '/fcgi-bin/face/face_addface',
  // 删除人脸doc https://ai.qq.com/doc/delface.shtml
  delface: '/fcgi-bin/face/face_delface',
  // 设置信息doc https://ai.qq.com/doc/setinfo.shtml
  setinfo: '/fcgi-bin/face/face_setinfo',
  // 获取信息doc https://ai.qq.com/doc/getinfo.shtml
  getinfo: '/fcgi-bin/face/face_getinfo',
  // 信息查询
  // 获取组列表doc https://ai.qq.com/doc/getgroupids.shtml
  getgroupids: '/fcgi-bin/face/face_getgroupids',
  // 获取个体列表doc https://ai.qq.com/doc/getpersonids.shtml
  getpersonids: '/fcgi-bin/face/face_getpersonids',
  // 获取人脸列表doc https://ai.qq.com/doc/getfaceids.shtml
  getfaceids: '/fcgi-bin/face/face_getfaceids',
  // 获取人脸信息doc https://ai.qq.com/doc/getfaceinfo.shtml
  getfaceinfo: '/fcgi-bin/face/face_getfaceinfo',
  // 图片识别
  // 场景识别doc https://ai.qq.com/doc/visionimgidy.shtml
  scener: '/fcgi-bin/vision/vision_scener',
  // 物体识别doc 
  objectr: '/fcgi-bin/vision/vision_objectr',
  // 图像标签识别doc https://ai.qq.com/doc/imagetag.shtml
  imagetag: '/fcgi-bin/image/image_tag',
  // 花草/车辆识别doc https://ai.qq.com/doc/imgidentify.shtml
  imgidentify: '/fcgi-bin/vision/vision_imgidentify',
  // 看图说话doc https://ai.qq.com/doc/imgtotext.shtml
  imgtotext: '/fcgi-bin/vision/vision_imgtotext',
  // 模糊图片检测doc https://ai.qq.com/doc/imagefuzzy.shtml
  imagefuzzy: '/fcgi-bin/image/image_fuzzy',
  // 美食图片识别doc https://ai.qq.com/doc/imagefood.shtml
  imagefood: '/fcgi-bin/image/image_food',
  // 图片特效
  // 人脸美妆doc https://ai.qq.com/doc/facecosmetic.shtml
  facecosmetic: '/fcgi-bin/ptu/ptu_facecosmetic',
  // 人脸变妆doc https://ai.qq.com/doc/facedecoration.shtml
  facedecoration: '/fcgi-bin/ptu/ptu_facedecoration',
  // 滤镜doc 图片滤镜（天天P图） https://ai.qq.com/doc/ptuimgfilter.shtml
  ptuimgfilter: '/fcgi-bin/ptu/ptu_imgfilter',
  // 图片滤镜（AI Lab）	
  visionimgfilter: '/fcgi-bin/vision/vision_imgfilter',
  // 人脸融合doc https://ai.qq.com/doc/facemerge.shtml
  facemerge: '/fcgi-bin/ptu/ptu_facemerge',
  // 大头贴doc https://ai.qq.com/doc/facesticker.shtml
  facesticker: '/fcgi-bin/ptu/ptu_facesticker',
  // 颜龄检测doc https://ai.qq.com/doc/faceage.shtml
  faceage: '/fcgi-bin/ptu/ptu_faceage',
};

module.exports.commonParams = () => {
  return {
    'nonce_str': randomString.generate({
      length: 16,
      charset: 'alphanumeric',
      capitalization: 'uppercase'
    }),
    'time_stamp': Math.floor(Date.now() / 1000),
  }
}

module.exports.error = (msg) => {
  return new Promise((resolve, reject) => {
    reject({
      "ret": 4096,
      "msg": msg,
      "data": {}
    });
  });
}


const textToGBK = module.exports.textToGBK = (text) => {
  // http://www.qqxiuzi.cn/zh/hanzi-gbk-bianma.php
  let str = iconv.encode(text, 'gbk'),
    strList = '';
  str.map(item => {
    switch (true) {
      // ascii 0
      case item === 0:
        strList += '%00';
        break;
      // 空格转为+号
      case item === 32:
        strList += '+';
        break;
      // 原样输出
      case item === 42 || item === 45 || item === 46 || item === 95 || (item >= 48 && item <= 57) || (item >= 65 && item <= 90) || (item >= 97 && item <= 122):
        strList += String.fromCharCode(item);
        break;
      // 需要编码
      default:
        strList += '%' + item.toString(16).toUpperCase();
        break;
    }
  })
  return strList;
}
