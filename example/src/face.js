const {
  Face
} = require('qqai-api-sdk');
const {
  APP
} = require('./util');
const face = new Face(APP.appkey, APP.appid);
module.exports = class FaceService {
  constructor(headers) {
    this.headers = headers;
  }

  detectface(param, res) {
    face.detectface(param).then(result => {
      res.write(JSON.stringify(result, null, 2));
      res.end();
    }, e => {
      res.write(JSON.stringify(e));
      res.end();
    })
  }
  detectmultiface(param, res) {
    face.detectmultiface(param).then(result => {
      res.write(JSON.stringify(result, null, 2));
      res.end();
    }, e => {
      res.write(JSON.stringify(e));
      res.end();
    })
  }
  faceshape(param, res) {
    face.faceshape(param).then(result => {
      res.write(JSON.stringify(result, null, 2));
      res.end();
    }, e => {
      res.write(JSON.stringify(e));
      res.end();
    })
  }
  facecompare(param, res) {
    face.facecompare(param.source_image , param.target_image).then(result => {
      res.write(JSON.stringify(result, null, 2));
      res.end();
    }, e => {
      res.write(JSON.stringify(e));
      res.end();
    })
  }
  detectcrossageface(param, res) {
    face.detectcrossageface(param.source_image , param.target_image).then(result => {
      res.write(JSON.stringify(result, null, 2));
      res.end();
    }, e => {
      res.write(JSON.stringify(e));
      res.end();
    })
  }

  inPost(param, res) {
    res.writeHead(200, this.headers);
    switch (param.index) {
      case 0:
        this.detectface(param.image, res);
        break;
      case 1:
        this.detectmultiface(param.image, res)
        break;
      case 2:
        this.faceshape(param.image, res)
        break;
      case 3:
        this.facecompare(param, res)
        break;
      case 4:
        this.detectcrossageface(param, res)
        break;
    }
  }
}
