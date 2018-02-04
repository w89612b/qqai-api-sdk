const randomstring = require('randomstring');
const process = require('process')
const {
  APP,
  fsReadSync,
  ttformat
} = require('./util');
const {
  OCR
} = require('../');
const ocr = new OCR(APP.appkey, APP.appid);
/**
 * OCR API 测试文件
 * @author wubo  2018-02-04
 * @version 1.1.0
 */
ocr.idcardocr(fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\idcard0.jpg` : `${__dirname}/file/idcard0.jpg`)).then((res) => {
  res.data.frontimage = '';
  console.log('身份证OCR识别 人像面 正面', JSON.stringify(res));
}, (e) => {
  console.log('身份证OCR识别 人像面 正面', JSON.stringify(e));
});
ocr.idcardocr(fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\idcard11.jpg` : `${__dirname}/file/idcard11.jpg`), 1).then((res) => {
  res.data.backimage = '';
  console.log('身份证OCR识别 国徽面 反面', JSON.stringify(res));
}, (e) => {
  console.log('身份证OCR识别 国徽面 反面', JSON.stringify(e));
});
ocr.bcocr(fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\名片一.jpg` : `${__dirname}/file/名片一.jpg`)).then((res) => {
  console.log('名片OCR识别', JSON.stringify(res));
}, (e) => {
  console.log('名片OCR识别', JSON.stringify(e));
});
ocr.driverlicenseocr(fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\驾驶证2.jpg` : `${__dirname}/file/驾驶证2.jpg`)).then((res) => {
  console.log('驾驶证OCR识别', JSON.stringify(res));
}, (e) => {
  console.log('驾驶证OCR识别', JSON.stringify(e));
});
ocr.driverlicenseocr(fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\行驶证1.jpg` : `${__dirname}/file/行驶证1.jpg`), 0).then((res) => {
  console.log('行驶证OCR识别', JSON.stringify(res));
}, (e) => {
  console.log('行驶证OCR识别', JSON.stringify(e));
});
ocr.bizlicenseocr(fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\yyzz.jpg` : `${__dirname}/file/yyzz.jpg`)).then((res) => {
  console.log('营业执照OCR识别', JSON.stringify(res));
}, (e) => {
  console.log('营业执照OCR识别', JSON.stringify(e));
});
// 注意事项 银行卡最好是正面向下，方向反了需要翻转
ocr.creditcardocr(fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\image银行卡1.jpg` : `${__dirname}/file/image银行卡1.jpg`)).then((res) => {
  console.log('银行卡OCR识别', JSON.stringify(res));
}, (e) => {
  console.log('银行卡OCR识别', JSON.stringify(e));
});
ocr.generalocr(fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\1369620356421.jpg` : `${__dirname}/file/1369620356421.jpg`)).then((res) => {
  console.log('通用OCR识别', JSON.stringify(res));
}, (e) => {
  console.log('通用OCR识别', JSON.stringify(e));
});
