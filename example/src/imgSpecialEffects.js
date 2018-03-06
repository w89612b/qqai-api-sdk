const {
  ImgSpecialEffects
} = require('qqai-api-sdk');
const {
  APP
} = require('./util');
const imgSpecialEffects = new ImgSpecialEffects(APP.appkey, APP.appid);

module.exports = class ImgSpecialEffectsService {
  constructor(headers) {
    this.headers = headers;
  }
  facecosmetic(param, res) {
    imgSpecialEffects.facecosmetic(param.image, param.code).then((result) => {
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      res.write(JSON.stringify(e));
      res.end();
    });
  }
  facedecoration(param, res) {
    imgSpecialEffects.facedecoration(param.image, param.code).then((result) => {
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      res.write(JSON.stringify(e));
      res.end();
    });
  }
  ptuimgfilter(param, res) {
    imgSpecialEffects.ptuimgfilter(param.image, param.code).then((result) => {
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      res.write(JSON.stringify(e));
      res.end();
    });
  }
  visionimgfilter(param, res) {
    imgSpecialEffects.visionimgfilter(param.image, param.code, 'jewebtest').then((result) => {
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      res.write(JSON.stringify(e));
      res.end();
    });
  }
  facemerge(param, res) {
    imgSpecialEffects.facemerge(param.image, param.code).then((result) => {
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      res.write(JSON.stringify(e));
      res.end();
    });
  }
  facesticker(param, res) {
    imgSpecialEffects.facesticker(param.image, param.code).then((result) => {
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      res.write(JSON.stringify(e));
      res.end();
    });
  }
  faceage(param, res) {
    imgSpecialEffects.faceage(param).then((result) => {
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
        this.facecosmetic(param, res);
        break;
      case 1:
        this.facedecoration(param, res)
        break;
      case 2:
        this.ptuimgfilter(param, res)
        break;
      case 3:
        this.visionimgfilter(param, res)
        break;
      case 4:
        this.facemerge(param, res)
        break;
      case 5:
        this.facesticker(param, res)
        break;
      case 6:
        this.faceage(param.image, res)
        break;
    }
  }
}
