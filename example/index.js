const http = require('http');
const https = require('https');
const fs = require('fs');
const url = require('url');
const path = require('path');
const process = require('process')
const port = 3000;
const queryString = require('querystring');
const headers = {
  'Content-Type': 'application/json; charset=UTF-8'
};
const SpeechService = require('./src/speech');
const speechService = new SpeechService(headers);
const ImgPublicServeice = require('./src/imgPublic');
const imgPublicServeice = new ImgPublicServeice(headers);
const BaseLanguaeServerice = require('./src/baseLanguae');
const baseLanguaeServerice = new BaseLanguaeServerice(headers);
const TranslateServerice = require('./src/translate');
const translateServerice = new TranslateServerice(headers);
const OCRService = require('./src/ocr');
const ocrServerice = new OCRService(headers);
const ImgSpecialEffectsService = require('./src/imgSpecialEffects');
const imgSpecialEffectsService = new ImgSpecialEffectsService(headers);
const FaceService = require('./src/face');
const faceService = new FaceService(headers);
const PersonService = require('./src/persion');
const personService = new PersonService(headers);
const {
  Imgs,
  OCRImgs,
  faceImgs,
  EffectsImgs
} = require('./src/util')
const myhttp = function (image, img_url, postData, res, service) {
  var imgdatas = {};
  if (img_url.startsWith('https')) {
    https.get(new url.URL(img_url), function (response) {
      response.setEncoding('base64');
      var Data = '';
      response.on('data', function (data) { // 加载到内存
        Data += data;
      }).on('end', function () { // 加载完
        postData[image] = Data;
        if (image === 'source_image') {
          myhttp('target_image', postData.target_image, postData, res, service)
        } else {
          service.inPost(postData, res);
        }
      })
    });
  } else if (img_url.startsWith('http')) {
    http.get(new url.URL(img_url), function (response) {
      response.setEncoding('base64');
      var Data = '';
      response.on('data', function (data) { // 加载到内存
        Data += data;
      }).on('end', function () { // 加载完
        postData[image] = Data;
        if (image === 'source_image') {
          myhttp('target_image', postData.target_image, postData, res, service)
        } else {
          service.inPost(postData, res);
        }
      })
    });
  } else {
    res.writeHead(200, headers);
    res.write(JSON.stringify({
      "ret": 4096,
      "msg": '图片数据不是一个正确的URL',
      "data": {}
    }))
    res.end()
  }
}
const CallBack = (req, res) => {
  let dataBuerffArray = [];
  req.on('data', (dataBuerff) => {
    dataBuerffArray.push(dataBuerff);
  });
  req.on('end', () => {
    let uri = req.url;
    try {
      let data = dataBuerffArray.length ? JSON.parse(Buffer.concat(dataBuerffArray).toString()) : {};
      switch (uri) {
        // 语音合成
        case '/tts':
          speechService.tts(data, res)
          break;
        case '/tta':
          speechService.tta(data, res)
          break;
          // 语音识别
        case '/asr':
          speechService.asr(data, res)
          break;
        case '/wordseg':
          baseLanguaeServerice.wordseg(data.text, res);
          break;
        case '/wordpos':
          baseLanguaeServerice.wordpos(data.text, res);
          break;
        case '/wordner':
          baseLanguaeServerice.wordner(data.text, res);
          break;
        case '/wordsyn':
          baseLanguaeServerice.wordsyn(data.text, res);
          break;
        case '/wordcom':
          baseLanguaeServerice.wordcom(data.text, res);
          break;
        case '/textpolar':
          baseLanguaeServerice.textpolar(data.text, res);
          break;
        case '/textchat':
          baseLanguaeServerice.textchat(data, res);
          break;
        case '/texttrans':
          translateServerice.texttrans(data, res);
          break;
        case '/imagetranslate':
          if (data.image.indexOf('https') !== -1) {
            https.get(new url.URL(data.image), function (response) {
              response.setEncoding('base64');
              var Data = '';
              response.on('data', function (data) { // 加载到内存
                Data += data;
              }).on('end', function () { // 加载完
                data.image = Data;
                translateServerice.imagetranslate(data, res);
              })
            });
          } else if (data.image.indexOf('http') !== -1) {
            http.get(new url.URL(data.image), function (response) {
              response.setEncoding('base64');
              var Data = '';
              response.on('data', function (data) { // 加载到内存
                Data += data;
              }).on('end', function () { // 加载完
                data.image = Data;
                translateServerice.imagetranslate(data, res);
              })
            });
          } else {
            translateServerice.imagetranslate(data, res);
          }
          break;
        case '/speechtranslate':
          translateServerice.speechtranslate(data, res);
          break;
        case '/visionimgidy':
          if (data.image.startsWith('http')) {
            myhttp('image', data.image, data, res, imgPublicServeice)
          } else {
            imgPublicServeice.inPost(data, res);
          }
          break;
        case '/ocr':
          if (data.image.startsWith('http')) {
            myhttp('image', data.image, data, res, ocrServerice)
          } else {
            ocrServerice.inPost(data, res);
          }
          break;
        case '/fcgi':
          if (data.image.startsWith('http')) {
            myhttp('image', data.image, data, res, imgSpecialEffectsService)
          } else {
            imgSpecialEffectsService.inPost(data, res);
          }
          break;
        case '/face':
          if (data.image.startsWith('http')) {
            myhttp('image', data.image, data, res, faceService)
          } else {
            faceService.inPost(data, res);
          }
          break;
        case '/facetow':
          if (data.source_image.startsWith('http')) {
            myhttp('source_image', data.source_image, data, res, faceService)
          } else if (data.target_image.startsWith('http')) {
            myhttp('target_image', data.target_image, data, res, faceService)
          } else {
            faceService.inPost(data, res);
          }
          break;
          // 返回示例图片
        case '/getExample':
          res.writeHead(200, headers);
          res.write(JSON.stringify(Imgs[data.index]));
          res.end();
          break;
        case '/getOCRExample':
          res.writeHead(200, headers);
          res.write(JSON.stringify(OCRImgs[data.index]));
          res.end();
          break;
        case '/getFcgiExample':
          res.writeHead(200, headers);
          res.write(JSON.stringify(EffectsImgs[data.index]));
          res.end();
          break;
        case '/getFaceExample':
          res.writeHead(200, headers);
          res.write(JSON.stringify(faceImgs[data.index]));
          res.end();
          break;
        case '/getgroupids':
          data.index = 0
          personService.inPost(data, res)
          break;
        case '/getpersonids':
          data.index = 1
          personService.inPost(data, res)
          break;
        case '/getinfo':
          data.index = 2
          personService.inPost(data, res)
          break;
        case '/delperson':
          data.index = 3
          personService.inPost(data, res)
          break;
        case '/newperson':
          data.index = 4
          personService.inPost(data, res)
          break;
        case '/addface':
          data.index = 5
          personService.inPost(data, res)
          break;
        case '/delface':
          data.index = 6
          personService.inPost(data, res)
          break;
        case '/setinfo':
          data.index = 7
          personService.inPost(data, res)
          break;

        default:
          let uri = queryString.unescape(url.parse(req.url).pathname),
            type = '',
            // 判断当前系统
            isWin = !!process.platform.match(/^win/),
            filename = '';
          if (uri === '/') {
            uri = '/index.html'
          }
          type = uri.substring(uri.lastIndexOf('.') + 1);
          if (type === 'html' || type === 'htm' || uri.startsWith('/public') || uri.startsWith('/image') || uri.startsWith('/tta') || uri.startsWith('/tts')) {
            uri = (type === 'html' || type === 'htm') ? '/html' + uri : uri;
            filename = path.join(process.cwd(), uri);
            fs.exists(filename, function (exists) {
              if (!exists) {
                res.writeHead(404, {
                  'Content-Type': 'text/plain'
                });
                res.write('404 Not Found: ' + filename + '\n');
                res.end();
                return;
              }

              if (filename.indexOf('favicon.ico') !== -1) {
                return;
              }

              fs.readFile(filename, 'binary', function (err, file) {
                if (err) {
                  res.writeHead(500, {
                    'Content-Type': 'text/plain'
                  });
                  res.write(err + '\n');
                  res.end();
                  return;
                }

                var contentType = function (_type) {
                  switch (_type) { // 扩展名
                    case 'html':
                    case 'htm':
                      return 'text/html; charset=UTF-8';
                    case 'js':
                      return 'application/javascript; charset=UTF-8';
                    case 'css':
                      return 'text/css; charset=UTF-8';
                    case 'txt':
                      return 'text/plain; charset=UTF-8';
                    case 'manifest':
                      return 'text/cache-manifest; charset=UTF-8';
                    default:
                      return 'application/octet-stream';
                  }
                }(filename.substring(filename.lastIndexOf('.') + 1));

                if (contentType) {
                  res.writeHead(200, {
                    'Content-Type': contentType
                  });
                } else res.writeHead(200);

                res.write(file, 'binary');
                res.end();
              });
            });
          } else {
            throw new Error('没有访问的资源文件')
          }
          break;
      }
    } catch (error) {
      res.writeHead(404, {
        'Content-Type': 'text/html; charset=UTF-8'
      });
      res.write(`<!DOCTYPE><html><head><title>404 Not Found</title></head><body style="width: 100%;height: 100%;overflow: hidden;padding: 0;margin: 0;"><img src="/public/404.jpg" style="max-width:320px;position: absolute;left: 50%;top: 50%;margin: -143px 0 0 -160px;"></body></html>`);
      res.end();
    }
  });
}
const APP = http.createServer(CallBack);

APP.listen(port)
console.log(`Your application is running here: http://localhost:${port}`)
