const {
  URIS,
  commonParams,
  error
} = require('./util');
const PS = require('./client/ProxyServices');
/**
 * 图片识别公共API服务类
 * @description 提供QQAI图片识别公共模块的API调用
 * @author wubo 2018-02-02
 * @version 1.0.7
 * 2018-04-18 暂时物体识别去掉objectr接口format参数, 由于加入format参数现在会报签名错误   1.2.1  
 * 2018-06-21 恢复物体识别objectr接口format参数, 由于腾讯API修复   1.2.2
 */
module.exports = class ImgPublic {
  /**
   * 图片识别公共API服务类
   * @prop {String} app_key 应用key
   * @prop {String} app_id  应用id
   * @function porn(imageBase64String) 智能鉴黄
   * @function terrorism(imageBase64String) 暴恐识别
   * @function scener(imageBase64String) 场景识别
   * @function objectr(imageBase64String) 物体识别
   * @function imagetag(imageBase64String) 图像标签识别
   * @function imgidentify(imageBase64String) 花草/车辆识别
   * @function imgtotext(imageBase64String) 看图说话
   * @function imagefuzzy(imageBase64String) 模糊图片检测
   * @function imagefood(imageBase64String) 获取人脸信息
   * @example
   *  new ImgPublic('a95eceb1ac8c24ee28b70f7dbba912bf', '1000001')
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
   * 智能鉴黄
   * @description 识别一个图像是否为色情图像
   * 具体参数查看：https://ai.qq.com/doc/jianhuang.shtml
   * @param {String} imageBase64String 待识别图片 原始图片的base64编码数据（原图大小上限1MB）
   * @example
   * porn(imageBase64String)
   * @return A Promise Object
   */
  porn(imageBase64String) {
    if (imageBase64String && Buffer.byteLength(imageBase64String, 'base64') < 1048576) {
      return PS(URIS.porn, this.appKey, Object.assign({}, commonParams(), {
        app_id: this.appId,
        image: imageBase64String
      }));
    } else {
      return error('imageBase64String 不能为空 且 大小小余1M');
    }
  }

  /**
   * 暴恐识别
   * @description 识别一个图像是否为暴恐图像
   * 具体参数查看：https://ai.qq.com/doc/imageterrorism.shtml
   * @param {String} imageBase64String 待识别图片 原始图片的base64编码数据（原图大小上限1MB）
   * @example
   * terrorism(imageBase64String)
   * @return A Promise Object
   */
  terrorism(imageBase64String) {
    if (imageBase64String && Buffer.byteLength(imageBase64String, 'base64') < 1048576) {
      return PS(URIS.terrorism, this.appKey, Object.assign({}, commonParams(), {
        app_id: this.appId,
        image: imageBase64String
      }));
    } else {
      return error('imageBase64String 不能为空 且 大小小余1M');
    }
  }

  /**
   * 场景识别
   * @description 场景识别接口提供场景识别能力，可以帮您快速找出图片中包含的场景信息。
   * 具体参数查看：https://ai.qq.com/doc/visionimgidy.shtml
   * @prop {String} image 待识别图片 原始图片的base64编码数据（解码后大小上限1MB）
   * @prop {Number} format 默认1 图片格式 [1	JPG格式（image/jpeg）]
   * @prop {Number} topk 默认1 返回结果个数（已按置信度倒排）[1-5]
   * @example
   * scener({
   *  image: imageBase64String,
   *  format: 1,
   *  topk: 1
   * })
   * @return A Promise Object
   */
  scener({
    image,
    format = 1,
    topk = 1
  }) {
    if (image && Buffer.byteLength(image, 'base64') < 1048576) {
      return PS(URIS.scener, this.appKey, Object.assign({}, commonParams(), {
        app_id: this.appId,
        image: image,
        format: format,
        topk: topk
      }));
    } else {
      return error('image 不能为空 且 大小小余1M');
    }
  }

  /**
   * 物体识别
   * @description 物体识别接口提供物体识别能力，可以帮您快速找出图片中包含的物体信息。
   * 具体参数查看：https://ai.qq.com/doc/visionimgidy.shtml
   * @prop {String} image 待识别图片 原始图片的base64编码数据（解码后大小上限1MB）
   * @prop {Number} format 默认1 图片格式 [1	JPG格式（image/jpeg）]
   * @prop {Number} topk 默认1 返回结果个数（已按置信度倒排）[1-5]
   * @example
   * objectr({
   *  image: imageBase64String,
   *  format: 1,
   *  topk: 1
   * })
   * @return A Promise Object
   * @update 
   * 暂时去掉format参数, 由于加入format参数现在会报签名错误   2018-04-18
   * 恢复format参数, 由于API修复format参数 2018-06-21
   */
  objectr({
    image,
    format = 1,
    topk = 1
  }) {
    if (image && Buffer.byteLength(image, 'base64') < 1048576) {
      return PS(URIS.objectr, this.appKey, Object.assign({}, commonParams(), {
        app_id: this.appId,
        image: image,
        format: format,
        topk: topk
      }));
    } else {
      return error('image 不能为空 且 大小小余1M');
    }
  }

  /**
   * 图像标签识别
   * @description 识别一个图像的标签信息,对图像分类
   * 具体参数查看：https://ai.qq.com/doc/imagetag.shtml
   * @param {String} imageBase64String 待识别图片 原始图片的base64编码数据（解码后大小上限1MB）
   * @example
   * imagetag(imageBase64String)
   * @return A Promise Object
   */
  imagetag(imageBase64String) {
    if (imageBase64String && Buffer.byteLength(imageBase64String, 'base64') < 1048576) {
      return PS(URIS.imagetag, this.appKey, Object.assign({}, commonParams(), {
        app_id: this.appId,
        image: imageBase64String
      }));
    } else {
      return error('imageBase64String 不能为空 且 大小小余1M');
    }
  }

  /**
   * 花草/车辆识别
   * @description 花草/车辆识别接口提供特定类别的识别能力，可以根据您选择的场景识别出图片中的花草或车辆信息，目前已覆盖3000种常见花草，近3000类车型。
   * 具体参数查看：https://ai.qq.com/doc/imgidentify.shtml
   * @param {String} imageBase64String 待识别图片 原始图片的base64编码数据（解码后大小上限1MB）
   * @param {Number} scene  识别场景，1-车辆识别，2-花草识别
   * @example
   * imgidentify(imageBase64String, scene)
   * @return A Promise Object
   */
  imgidentify(imageBase64String, scene = 1) {
    if (imageBase64String && Buffer.byteLength(imageBase64String, 'base64') < 1048576) {
      return PS(URIS.imgidentify, this.appKey, Object.assign({}, commonParams(), {
        app_id: this.appId,
        image: imageBase64String,
        scene: scene
      }));
    } else {
      return error('imageBase64String 不能为空 且 大小小余1M');
    }
  }

  /**
   * 看图说话
   * @description 用一句话文字描述图片。
   * 具体参数查看：https://ai.qq.com/doc/imgtotext.shtml
   * @param {String} imageBase64String 待识别图片 原始图片的base64编码数据（解码后大小上限1MB）
   * @param {String} session_id  一次请求ID 尽可能唯一，长度上限64字节
   * @example
   * imgtotext(imageBase64String)
   * @return A Promise Object
   */
  imgtotext(imageBase64String, session_id) {
    if (imageBase64String && Buffer.byteLength(imageBase64String, 'base64') < 1048576 && session_id && Buffer.byteLength(session_id, 'base64') < 64) {
      return PS(URIS.imgtotext, this.appKey, Object.assign({}, commonParams(), {
        app_id: this.appId,
        image: imageBase64String,
        session_id: session_id
      }));
    } else {
      return error('imageBase64String/session_id 不能为空 且 imageBase64String大小小余1M session_id长度小于64B');
    }
  }

  /**
   * 模糊图片检测
   * @description 判断一个图像的模糊程度。
   * 具体参数查看：https://ai.qq.com/doc/imagefuzzy.shtml
   * @param {String} imageBase64String 待识别图片 原始图片的base64编码数据（解码后大小上限1MB）
   * @example
   * imagefuzzy(imageBase64String)
   * @return A Promise Object
   */
  imagefuzzy(imageBase64String) {
    if (imageBase64String && Buffer.byteLength(imageBase64String, 'base64') < 1048576) {
      return PS(URIS.imagefuzzy, this.appKey, Object.assign({}, commonParams(), {
        app_id: this.appId,
        image: imageBase64String
      }));
    } else {
      return error('imageBase64String 不能为空 且 大小小余1M');
    }
  }
  /**
   * 美食图片识别
   * @description 识别一个图像是否为美食图像。
   * 具体参数查看：https://ai.qq.com/doc/imagefood.shtml
   * @param {String} imageBase64String 待识别图片 原始图片的base64编码数据（解码后大小上限1MB）
   * @example
   * imagefood(imageBase64String)
   * @return A Promise Object
   */
  imagefood(imageBase64String) {
    if (imageBase64String && Buffer.byteLength(imageBase64String, 'base64') < 1048576) {
      return PS(URIS.imagefood, this.appKey, Object.assign({}, commonParams(), {
        app_id: this.appId,
        image: imageBase64String
      }));
    } else {
      return error('imageBase64String 不能为空 且 大小小余1M');
    }
  }
}
