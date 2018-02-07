const {
  URIS,
  commonParams,
  error
} = require('./util');
const PS = require('./client/ProxyServices');
/**
 * 人体管理API服务类
 * @description 提供QQAI人体管理模块的API调用
 * @author wubo 2018-02-03
 * @version 1.0.9
 * 2018-02-06  从ApiFace类中迁入人脸识别和人脸验证  1.1.2
 */
module.exports = class Person {
  /**
   * 人体管理API服务类
   * @param {String} appKey 应用key
   * @param {String} appId 应用id
   * @function newperson 个体创建
   * @function delperson 删除个体
   * @function addface 增加人脸
   * @function delface 删除人脸
   * @function setinfo 设置信息
   * @function getinfo 获取信息
   * @function getgroupids 获取组列表
   * @function getpersonids 获取个体列表
   * @function getfaceids 获取人脸列表
   * @function getfaceinfo 获取人脸信息
   * @function faceidentify 人脸识别
   * @function faceverify 人脸验证
   * @example
   * new Person('a95eceb1ac8c24ee28b70f7dbba912bf', '1000001')
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
   * 个体创建
   * @description 创建一个个体（Person），并将个体放置到指定的组（Group）当中。一个组（Group）里面的个体（Person）总数上限为20000个。如果ID指定的组不存在，则会新建组并创建个体。
   * 具体参数查看：https://ai.qq.com/doc/newperson.shtml
   * @prop {String} image 个体图片 原始图片的base64编码数据（原图大小上限1MB，支持JPG、PNG、BMP格式）
   * @prop {String} person_id 指定的个体（Person）ID
   * @prop {String} person_name 名字
   * @prop {String} group_ids group
   * @prop {String} tag 备注信息
   * @example
   * newperson({
   *  image: 'imageBase64String'
   *  person_name: '王小二'
   *  group_ids: 'group'
   *  person_id: '1509333186'
   *  tag:'备注信息'
   * })
   * @return A Promise Object
   */
  newperson({
    image,
    person_name,
    group_ids,
    person_id,
    tag = ''
  }) {
    if (image && Buffer.byteLength(image, 'base64') >= 1048576) {
      return error('image 不能为空且大小小余1M');
    }
    if (!person_name) {
      return error('person_name 不能为空');
    }
    if (!group_ids) {
      return error('group_ids 不能为空');
    }
    if (!person_id) {
      return error('person_id 不能为空');
    }
    return PS(URIS.newperson, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      image: image,
      person_name: person_name,
      group_ids: group_ids,
      person_id: person_id,
      tag: tag
    }));
  }
  /**
   * 删除个体
   * @description 删除一个个体（Person）。
   * 具体参数查看：https://ai.qq.com/doc/delperson.shtml
   * @param {String} person_id 需要删除的个体（Person）ID
   * @example
   * delperson('1509333186')
   * @return A Promise Object
   */
  delperson(person_id) {
    if (!person_id) {
      return error('person_id 不能为空');
    }
    return PS(URIS.delperson, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      person_id: person_id
    }));
  }
  /**
   * 增加人脸
   * @description 将一组人脸（Face）加入到一个个体（Person）中。注意，一个人脸只能被加入到一个个体中。 一个个体最多允许包含20个人脸；加入几乎相同的人脸会返回错误。
   * 具体参数查看：https://ai.qq.com/doc/addface.shtml
   * @param {String} image 多个人脸图片之间用“|”分隔 原始图片的base64编码数据（原图大小上限1MB，支持JPG、PNG、BMP格式）
   * @param {String} person_id  指定的个体（Person）ID
   * @param {String} tag 备注信息
   * @example
   * addface('imageBase64String|imageBase64String', '1509333186', '王小二')
   * @return A Promise Object
   */
  addface(images, person_id, tag = '') {
    if (images && Buffer.byteLength(images, 'base64') >= 1048576) {
      return error('image 不能为空且大小小余1M');
    }
    if (!person_id) {
      return error('person_id 不能为空');
    }
    return PS(URIS.addface, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      images: images,
      person_id: person_id,
      tag: tag
    }));
  }
  /**
   * 删除人脸
   * @description 删除一个个体（Person）下的人脸（Face），包括特征，属性和ID。
   * 具体参数查看：https://ai.qq.com/doc/delface.shtml
   * @param {String} person_id 指定的个体（Person）ID
   * @param {String} face_ids 需要删除的人脸（Face）ID（多个之间用"\")
   * @example
   * delface('1509333186', '1509333186\1509333186')
   * @return A Promise Object
   */
  delface(person_id, face_ids) {
    if (!person_id) {
      return error('person_id 不能为空');
    }
    if (!face_ids) {
      return error('face_ids 不能为空');
    }
    return PS(URIS.delface, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      person_id: person_id,
      face_ids: face_ids
    }));
  }
  /**
   * 设置信息
   * @description 设置个体（Person）的名字或备注
   * 具体参数查看：https://ai.qq.com/doc/setinfo.shtml
   * @param {String} person_id 需要设置的个体（Person）ID
   * @param {String} person_name 新的名字
   * @param {String} tag 备注信息
   * @example
   * setinfo('1509333186', '中国人', '一个NB的人')
   * @return A Promise Object
   */
  setinfo(person_id, person_name, tag = '') {
    if (!person_id) {
      return error('person_id 不能为空');
    }
    if (!person_name) {
      return error('person_name 不能为空');
    }
    return PS(URIS.setinfo, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      person_id: person_id,
      person_name: person_name,
      tag: tag
    }));
  }
  /**
   * 获取信息
   * @description 获取一个个体（Person）的信息，包括ID，名字，备注，相关的人脸（Face）ID列表，以及所属组（Group）ID列表。
   * 具体参数查看：https://ai.qq.com/doc/getinfo.shtml
   * @param {String} person_id 需要查询的个体（Person）ID
   * @example
   * getinfo('1509333186')
   * @return A Promise Object
   */
  getinfo(person_id) {
    if (!person_id) {
      return error('person_id 不能为空');
    }
    return PS(URIS.getinfo, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      person_id: person_id
    }));
  }
  /**
   * 获取组列表
   * @description 获取一个AppId下所有Group ID。
   * 具体参数查看：https://ai.qq.com/doc/getgroupids.shtml
   * @example
   * getgroupids()
   * @return A Promise Object
   */
  getgroupids() {
    return PS(URIS.getgroupids, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId
    }));
  }
  /**
   * 获取个体列表
   * @description 获取一个组（Group）中的所有个体（Person）ID 。
   * 具体参数查看：https://ai.qq.com/doc/getpersonids.shtml
   * @param {String} group_id 组（Group）ID
   * @example
   * getpersonids('1509333186')
   * @return A Promise Object
   */
  getpersonids(group_id) {
    if (!group_id) {
      return error('group_id 不能为空');
    }
    return PS(URIS.getpersonids, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      group_id: group_id
    }));
  }
  /**
   * 获取人脸列表
   * @description 获取一个个体（Person）下所有人脸（Face）ID。
   * 具体参数查看：https://ai.qq.com/doc/getfaceids.shtml
   * @param {String} person_id 个体（Person）ID
   * @example
   * getfaceids('1509333186')
   * @return A Promise Object
   */
  getfaceids(person_id) {
    if (!person_id) {
      return error('person_id 不能为空');
    }
    return PS(URIS.getfaceids, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      person_id: person_id
    }));
  }
  /**
   * 获取人脸信息
   * @description 获取一个人脸（Face）的详细信息
   * 具体参数查看：https://ai.qq.com/doc/getfaceinfo.shtml
   * @param {String} face_id 人脸（Face） ID
   * @example
   * getfaceinfo('1509333186')
   * @return A Promise Object
   */
  getfaceinfo(face_id) {
    if (!face_id) {
      return error('face_id 不能为空');
    }
    return PS(URIS.getfaceinfo, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      face_id: face_id
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
    if (!group_id) {
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
    if (!person_id) {
      return error('person_id 不能为空');
    }
    return PS(URIS.faceverify, this.appKey, Object.assign({}, commonParams(), {
      app_id: this.appId,
      image: image,
      person_id: person_id
    }));
  }
}
