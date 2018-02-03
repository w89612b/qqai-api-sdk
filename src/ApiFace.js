const { URIS, commonParams, error } = require('./util');
const PS = require('./client/ProxyServices');
/**
 * 面部识别API服务类
 * @description 提供QQAI面部识别模块的API调用
 * @author wubo
 */
module.exports = class Face {
  /**
   * 面部识别API服务类
   * @param {String} appKey 应用key
   * @param {String} appId 应用id
   * @function detectface 人脸分析
   * @function detectmultiface 多人脸检测
   * @function facecompare 人脸对比
   * @function faceshape 五官定位
   * @function faceidentify 人脸识别
   * @function faceverify 人脸验证
   * @example
   * new Face('a95eceb1ac8c24ee28b70f7dbba912bf', '1000001')
   */
  constructor(appKey, appId){
    if (appKey || appId) {
      console.log(`appKey and appId are required`);
      return;
    }
    this.appKey = appKey;
    this.appId = appId;
  }

  /**
   * 人脸分析
   * @description 检测给定图片（Image）中的所有人脸（Face）的位置和相应的面部属性。位置包括（x, y, w, h），面部属性包括性别（gender）, 年龄（age）, 表情（expression）, 魅力（beauty）, 眼镜（glass）和姿态（pitch，roll，yaw）
   * 具体参数查看：https://ai.qq.com/doc/detectface.shtml
   * @param {String} image 待识别图片 原始图片的base64编码数据（原图大小上限1MB，支持JPG、PNG、BMP格式）
   * @param {Numbrt} mode 默认1 检测模式，0-正常，1-大脸模式
   * @example
   * detectface(imageBase64String, 1)
   * @return A Promise Object
   */
  detectface(image, mode = 1){
    if (image && Buffer.byteLength(image, 'base64') >= 1048576) {
      return error('image 不能为空且大小小余1M');
    }
    if (mode && mode < 0 || mode > 1) {
      return error('mode 不能为空且检测模式，0-正常，1-大脸模式');
    }
    return PS(URIS.detectface, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      image: image,
      mode: mode
    }));
  }

  /**
   * 多人脸检测
   * @description 检测图片中的人脸位置，可以识别出一张图片上的多个人脸。
   * 具体参数查看：https://ai.qq.com/doc/detectmultiface.shtml
   * @param {String} image 待识别图片 原始图片的base64编码数据（原图大小上限1MB）
   * @example
   * detectmultiface(imageBase64String)
   * @return A Promise Object
   */
  detectmultiface(image){
    if (image && Buffer.byteLength(image, 'base64') >= 1048576) {
      return error('image 不能为空且大小小余1M');
    }
    return PS(URIS.detectmultiface, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      image: image
    }));
  }

  /**
   * 人脸对比
   * @description 对请求图片的两个人脸进行对比，计算相似性以及五官相似度
   * 具体参数查看：https://ai.qq.com/doc/facecompare.shtml
   * @param {String} image_a 待对比人脸图片A 原始图片的base64编码数据（原图大小上限1MB，支持JPG、PNG、BMP格式）
   * @param {String} image_b 待对比人脸图片B 原始图片的base64编码数据（原图大小上限1MB，支持JPG、PNG、BMP格式）
   * @example
   * facecompare(imageBase64String, imageBase64String)
   * @return A Promise Object
   */
  facecompare(image_a, image_b){
    if (image_a && Buffer.byteLength(image_a, 'base64') >= 1048576) {
      return error('image_a 不能为空且大小小余1M');
    }
    if (image_b && Buffer.byteLength(image_b, 'base64') >= 1048576) {
      return error('image_b 不能为空且大小小余1M');
    }
    return PS(URIS.facecompare, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      image_a: image_a,
      image_b: image_b
    }));
  }

  /**
   * 五官定位
   * @description 对请求图片进行五官定位，计算构成人脸轮廓的88个点，包括眉毛（左右各8点）、眼睛（左右各8点）、鼻子（13点）、嘴巴（22点）、脸型轮廓（21点）
   * 具体参数查看：https://ai.qq.com/doc/faceshape.shtml
   * @param {String} image 待识别图片 原始图片的base64编码数据（原图大小上限1MB，支持JPG、PNG、BMP格式）
   * @param {Number} mode 默认1 检测模式，0-正常，1-大脸模式
   * @example
   * faceshape(imageBase64String, 1)
   * @return A Promise Object
   */
  faceshape(image, mode = 1){
    if (image && Buffer.byteLength(image, 'base64') >= 1048576) {
      return error('image 不能为空且大小小余1M');
    }
    if (mode && mode < 0 || mode > 1) {
      return error('mode 不能为空且检测模式，0-正常，1-大脸模式');
    }
    return PS(URIS.faceshape, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      image: image,
      mode: mode
    }));
  }

  /**
   * 人脸识别
   * @description 对于一个待识别的人脸图片，在一个组（Group）中识别出最相似的N个个体（Person）作为候选人返回，返回的N个个体（Person）按照相似度从大到小排列，N由参数topn指定。
   * 具体参数查看：https://ai.qq.com/doc/faceidentify.shtml
   * @param {String} image 待识别人脸图片 原始图片的base64编码数据（原图大小上限1MB，支持JPG、PNG、BMP格式）
   * @param {String} group_id 候选人组ID（个体创建时设定）
   * @param {Number} topn 默认9个 返回的候选人个数可选值范围[1~10]
   * @example
   * faceidentify(imageBase64String, '1509333186', 9)
   * @return A Promise Object
   */
  faceidentify(image, group_id, topn = 9){
    if (image && Buffer.byteLength(image, 'base64') >= 1048576) {
      return error('image 不能为空且大小小余1M');
    }
    if (group_id) {
      return error('group_id 不能为空');
    }
    if (topn && topn < 1 || topn > 10) {
      return error('topn 不能为空且取值范围为[1~10]');
    }
    return PS(URIS.faceidentify, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      image: image,
      group_id: group_id,
      topn: topn
    }));
  }

  /**
   * 人脸验证
   * @description 根据提供的图片和个体（Person）ID，返回图片和个体是否是同一个人的判断以及置信度。
   * 具体参数查看：https://ai.qq.com/doc/faceverify.shtml
   * @param {String} image 待验证人脸图片 原始图片的base64编码数据（原图大小上限1MB，支持JPG、PNG、BMP格式）
   * @param {String} person_id  待验证的个体（Person）ID
   * @example
   * faceverify(imageBase64String, '1509333186')
   * @return A Promise Object
   */
  faceverify(image, person_id){
    if (image && Buffer.byteLength(image, 'base64') >= 1048576) {
      return error('image 不能为空且大小小余1M');
    }
    if (person_id) {
      return error('person_id 不能为空');
    }
    return PS(URIS.faceverify, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      image: image,
      person_id: person_id
    }));
  }
}
