const { APP, fsReadSync } = require('./util');
const { Face } = require('../');
const face = new Face(APP.appkey, APP.appid);
/**
 * 面部识别API 测试类
 * @author wubo 2018-02-06
 * @version 1.1.2 
 */
// 人脸分析
face.detectface(
  fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\人脸美妆.jpg` : `${__dirname}/file/人脸美妆.jpg`),
  0
).then((res) => {
  if(res.ret === 0){
    console.log('正常人脸分析', JSON.stringify(res));
  }else {
    console.log('ERROR正常人脸分析', JSON.stringify(res));
  }
}, (e) => {
  console.log('正常人脸分析', JSON.stringify(e));
});
face.detectface(
  fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\face.jpg` : `${__dirname}/file/face.jpg`),
  1
).then((res) => {
  if(res.ret === 0){
    console.log('大脸模式人脸分析', JSON.stringify(res));
  }else {
    console.log('ERROR大脸模式人脸分析', JSON.stringify(res));
  }
}, (e) => {
  console.log('大脸模式人脸分析', JSON.stringify(e));
});
// 多人脸检测
face.detectmultiface(fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\detectmultiface.jpg` : `${__dirname}/file/detectmultiface.jpg`)).then((res) => {
  if(res.ret === 0){
    console.log('多人脸检测', JSON.stringify(res));
  }else {
    console.log('ERROR多人脸检测', JSON.stringify(res));
  }
}, (e) => {
  console.log('多人脸检测', JSON.stringify(e));
});
// 人脸对比
face.facecompare(
  fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\facecompare_a.jpg` : `${__dirname}/file/facecompare_a.jpg`),
  fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\facecompare_b.jpg` : `${__dirname}/file/facecompare_b.jpg`)
).then((res) => {
  if(res.ret === 0){
    console.log('人脸对比', JSON.stringify(res));
  }else {
    console.log('ERROR人脸对比', JSON.stringify(res));
  }
}, (e) => {
  console.log('人脸对比', JSON.stringify(e));
});
// 五官定位
face.faceshape(
  fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\人脸美妆.jpg` : `${__dirname}/file/人脸美妆.jpg`),
  0
).then((res) => {
  if(res.ret === 0){
    console.log('正常五官定位', JSON.stringify(res));
  }else {
    console.log('ERROR正常五官定位', JSON.stringify(res));
  }
}, (e) => {
  console.log('正常五官定位', JSON.stringify(e));
});
face.faceshape(
  fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\face.jpg` : `${__dirname}/file/face.jpg`),
  1
).then((res) => {
  if(res.ret === 0){
    console.log('大脸模式五官定位', JSON.stringify(res));
  }else {
    console.log('ERROR大脸模式五官定位', JSON.stringify(res));
  }
}, (e) => {
  console.log('大脸模式五官定位', JSON.stringify(e));
});
