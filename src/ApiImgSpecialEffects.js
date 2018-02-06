const {
  URIS,
  commonParams,
  error
} = require('./util');
const PS = require('./client/ProxyServices')
/**
 * 图片特效 API服务类
 * @description 提供QQAI图片特效模块的API调用
 * @author wubo 2018-02-03
 * @version 1.0.9
 */
module.exports = class ImgSpecialEffects {
  /**
   * 图片特效API服务类
   * @param {String} appKey 应用key
   * @param {String} appId  应用id
   * @function facecosmetic(image, cosmetic) 人脸美妆
   * @function facedecoration(image, decoration) 人脸变妆
   * @function ptuimgfilter(image, filter) 图片滤镜（天天P图）
   * @function visionimgfilter(image, filter, session_id) 图片滤镜（AI Lab）
   * @function facemerge(image, model) 人脸融合
   * @function facesticker(image, sticker) 大头贴
   * @function faceage(image) 颜龄检测
   * @example
   *  new ImgSpecialEffects('a95eceb1ac8c24ee28b70f7dbba912bf', '1000001')
   */
  constructor(appKey, appId) {
    if (!appKey || !appId) {
      console.log(`appKey and appId are required`);
      return;
    }
    this.appKey = appKey;
    this.appId = appId;
  }
  /**
   * 人脸美妆
   * @description 人脸美妆接口提供人脸美妆特效功能，可以帮您快速实现原始图片的人脸美妆特效处理
   * 具体参数查看：https://ai.qq.com/doc/facecosmetic.shtml
   * @param {String} image 待处理图片 原始图片的base64编码数据（原图大小上限500KB）
   * @param {Number} cosmetic 美妆编码取值区间[1-23]
   * @example
   * facecosmetic(imageBase64String, 1)
   * @return A Promise Object
   */
  facecosmetic(image, cosmetic = 1) {
    if (image && Buffer.byteLength(image, 'base64') >= 500 * 1024) {
      return error('image 不能为空且大小小余500KB');
    }
    if (cosmetic && cosmetic < 1 && cosmetic > 22) {
      return error('cosmetic 不能为空且取值区间为[1-23]');
    }
    return PS(URIS.facecosmetic, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      image: image,
      cosmetic: cosmetic
    }));
  }
  /**
   * 人脸变妆
   * @description 人脸变妆接口提供人脸变妆特效功能，可以帮您快速实现原始图片的人脸变妆特效处理。
   * 具体参数查看：https://ai.qq.com/doc/facedecoration.shtml
   * @param {String} image 待处理图片 原始图片的base64编码数据（原图大小上限500KB）
   * @param {Number} decoration 人脸变妆编码取值区间[1-22]
   * @example
   * facedecoration(imageBase64String, 1)
   * @return A Promise Object
   */
  facedecoration(image, decoration = 1) {
    if (image && Buffer.byteLength(image, 'base64') >= 500 * 1024) {
      return error('image 不能为空且大小小余500KB');
    }
    if (decoration && decoration < 1 && decoration > 22) {
      return error('decoration 不能为空且取值区间为[1-22]');
    }
    return PS(URIS.facedecoration, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      image: image,
      decoration: decoration
    }));
  }

  /**
   * 图片滤镜(天天P图)
   * @description 图片滤镜接口提供滤镜特效功能，可以帮您快速实现原始图片的滤镜特效处理。
   * 具体参数查看：https://ai.qq.com/doc/ptuimgfilter.shtml
   * @param {String} image 待处理图片 原始图片的base64编码数据（原图大小上限500KB）
   * @param {Number} filter 滤镜特效编码取值区间[1-32]
   * @example
   * ptuimgfilter(imageBase64String, 1)
   * @return A Promise Object
   */
  ptuimgfilter(image, filter) {
    if (image && Buffer.byteLength(image, 'base64') >= 500 * 1024) {
      return error('image 不能为空且大小小余500KB');
    }
    if (filter && filter < 1 && filter > 32) {
      return error('filter 不能为空且取值区间为[1-32]');
    }
    return PS(URIS.ptuimgfilter, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      image: image,
      filter: filter
    }));
  }

  /**
   * 图片滤镜（AI Lab）
   * @description 图片滤镜接口提供滤镜特效功能，可以帮您快速实现原始图片的滤镜特效处理
   * 具体参数查看： https://ai.qq.com/doc/ptuimgfilter.shtml
   * @param {String} image 待处理图片 原始图片的base64编码数据（原图大小上限1MB）
   * @param {Number} filter 滤镜特效编码取值区间[1-65]
   * @param {String} session_id 一次请求ID 尽可能唯一，长度上限64字节
   * @example
   * visionimgfilter(imageBase64String, 1, '1509333186')
   * @return A Promise Object
   */
  visionimgfilter(image, filter, session_id) {
    if (image && Buffer.byteLength(image, 'base64') >= 1048576) {
      return error('image 不能为空且大小小余1M');
    }
    if (filter && filter < 1 && filter > 65) {
      return error('filter 不能为空且取值区间为[1-65]');
    }
    if (session_id && Buffer.byteLength(session_id, 'base64') > 64) {
      return error('session_id 不能为空且大小小余65b');
    }
    return PS(URIS.visionimgfilter, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      image: image,
      filter: filter,
      session_id: session_id
    }));
  }

  /**
   * 人脸融合
   * @description 人脸融合接口提供人脸融合特效功能，可以帮您快速实现原始图片的人脸融合特效处理
   * 具体参数查看：https://ai.qq.com/doc/facemerge.shtml
   * @param {String} image 待处理图片 原始图片的base64编码数据（原图大小上限500KB）
   * @param {Number} model 默认素材模板编码见下文描述 取值区间[1-50]；自定义素材模板可在应用详情页上传和查询
   * @example
   * facemerge(imageBase64String, 1)
   * @return A Promise Object
   */
  facemerge(image, model) {
    if (image && Buffer.byteLength(image, 'base64') >= 500 * 1024) {
      return error('image 不能为空且大小小余500Kb');
    }
    if (model && model < 1 && model > 50) {
      return error('model 不能为空且取值区间为[1-50]');
    }
    return PS(URIS.facemerge, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      image: image,
      model: model
    }));
  }

  /**
   * 大头贴
   * @description 大头贴接口提供大头贴特效功能，可以帮您快速实现原始图片的大头贴特效处理。
   * 具体参数查看：https://ai.qq.com/doc/facesticker.shtml
   * @param {String} image 待处理图片 原始图片的base64编码数据（原图大小上限500KB）
   * @param {Number} sticker 大头贴编码 取值区间[1-31]
   * @example
   * facesticker(imageBase64String, 1)
   * @return A Promise Object
   */
  facesticker(image, sticker) {
    if (image && Buffer.byteLength(image, 'base64') >= 500 * 1024) {
      return error('image 不能为空 且 大小小余500Kb');
    }
    if (sticker && sticker < 1 && sticker > 32) {
      return error('model 不能为空且取值区间为[1-31]');
    }
    return PS(URIS.facesticker, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      image: image,
      sticker: sticker
    }));
  }

  /**
   * 颜龄检测
   * @description 颜龄检测接口提供颜龄检测功能，可以帮您快速实现原始图片的颜龄检测处理。
   * 具体参数查看：https://ai.qq.com/doc/faceage.shtml
   * @param {String} image 待处理图片 原始图片的base64编码数据（原图大小上限500KB）
   * @example
   *  faceage(imageBase64String)
   * @return A Promise Object
   */
  faceage(image) {
    if (image && Buffer.byteLength(image, 'base64') >= 500 * 1024) {
      return error('image 不能为空 且 大小小余500Kb');
    }
    return PS(URIS.faceage, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      image: image
    }));
  }
}
