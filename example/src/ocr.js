const {
  OCR
} = require('qqai-api-sdk');
const {
  APP
} = require('./util');
const ocr = new OCR(APP.appkey, APP.appid);

module.exports = class OCRService {
  constructor(headers) {
    this.headers = headers;
  }
  idcardocr(param, res) {
    ocr.idcardocr(param).then((result) => {
      result.data.frontimage = '';
      result.data.backimage = '';
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      res.write(JSON.stringify(e));
      res.end();
    });
  }
  bcocr(param, res) {
    ocr.bcocr(param).then((result) => {
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      res.write(JSON.stringify(e));
      res.end();
    });
  }
  driverlicenseocr(param, res) {
    ocr.driverlicenseocr(param.image, param.code).then((result) => {
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      res.write(JSON.stringify(e));
      res.end();
    });
  }
  bizlicenseocr(param, res) {
    ocr.bizlicenseocr(param).then((result) => {
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      res.write(JSON.stringify(e));
      res.end();
    });
  }
  creditcardocr(param, res) {
    ocr.creditcardocr(param).then((result) => {
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      res.write(JSON.stringify(e));
      res.end();
    });
  }
  generalocr(param, res) {
    ocr.generalocr(param).then((result) => {
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      res.write(JSON.stringify(e));
      res.end();
    });
  }
  plateocr(param, res) {
    ocr.plateocr(param).then((result) => {
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      res.write(JSON.stringify(e));
      res.end();
    });
  }
  handwritingocr(param, res) {
    ocr.handwritingocr(param).then((result) => {
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      res.write(JSON.stringify(e));
      res.end();
    });
  }
  inPost(param, res) {
    res.writeHead(200, this.headers);
    switch (param.index) {
      case 0:
        this.idcardocr(param.image, res);
        break;
      case 1:
        this.bcocr(param.image, res)
        break;
      case 2:
        param.code = 0
        this.driverlicenseocr(param, res)
        break;
      case 3:
        param.code = 1
        this.driverlicenseocr(param, res)
        break;
      case 4:
        this.bizlicenseocr(param.image, res)
        break;
      case 5:
        this.creditcardocr(param.image, res)
        break;
      case 6:
        this.generalocr(param.image, res)
        break;
      case 7:
        this.handwritingocr(param.image, res)
        break;
      case 8:
        this.plateocr(param.image, res)
        break;
    }
  }
}
