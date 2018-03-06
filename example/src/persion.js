const {
  Person
} = require('qqai-api-sdk');
const fs = require('fs');
const process = require('process');
const {
  APP
} = require('./util');
const person = new Person(APP.appkey, APP.appid);

module.exports = class PersonService {
  constructor(headers) {
    this.headers = headers;
  }
  getgroupids(res) {
    person.getgroupids().then((result) => {
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      res.write(JSON.stringify(e));
      res.end();
    });
  }
  getpersonids(param, res) {
    person.getpersonids(param.group_id).then((result) => {
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      res.write(JSON.stringify(e));
      res.end();
    });
  }

  getinfo(param, res) {
    person.getinfo(param.person_id).then((result) => {
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      res.write(JSON.stringify(e));
      res.end();
    });
  }
  delperson(param, res) {
    person.delperson(param.person_id).then((result) => {
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      res.write(JSON.stringify(e));
      res.end();
    });
  }
  newperson(param, res) {
    delete param.index
    person.newperson(param).then((result) => {
      if (!res.ret) {
        let dir = !!process.platform.match(/^win/) ? `${__dirname}\\..\\image\\face\\${result.data.face_id}.jpg` : `${__dirname}/../image/face/${result.data.face_id}.jpg`
        fs.writeFileSync(dir, param.image, {
          encoding: 'base64'
        });
      }
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      res.write(JSON.stringify(e));
      res.end();
    });
  }

  addface(param, res) {
    delete param.index
    person.addface(param.images, param.person_id, param.tag).then((result) => {
      if (!result.ret) {
        let dir = !!process.platform.match(/^win/) ? `${__dirname}\\..\\image\\face\\${result.data.face_ids[0]}.jpg` : `${__dirname}/../image/face/${result.data.face_ids[0]}.jpg`
        fs.writeFileSync(dir, param.images, {
          encoding: 'base64'
        });
      }
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      res.write(JSON.stringify(e));
      res.end();
    });
  }

  delface(param, res) {
    delete param.index
    person.delface(param.person_id, param.face_ids).then((result) => {
      res.write(JSON.stringify(result));
      res.end();
    }, (e) => {
      res.write(JSON.stringify(e));
      res.end();
    });
  }

  setinfo(param, res) {
    person.setinfo(param.person_id, param.person_name, param.tag).then((result) => {
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
        this.getgroupids(res);
        break;
      case 1:
        this.getpersonids(param, res);
        break;
      case 2:
        this.getinfo(param, res);
        break;
      case 3:
        this.delperson(param, res);
        break;
      case 4:
        this.newperson(param, res);
        break;
      case 5:
        this.addface(param, res);
        break;
      case 6:
        this.delface(param, res);
        break;
      case 7:
        this.setinfo(param, res);
        break;
    }
  }
}
