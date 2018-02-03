# QQAI-API-SDK to Node.js 

# 安装QQAI开放平台 Node.js SDK 非官方平台提供

* http://qqai.jswebtest.com/

**直接使用npm安装依赖：**
```sh
# install
npm install qqai-api-sdk

# use
const { Translate } = require('qqai-api-sdk');
const APP = {
  // 设置请求数据（应用密钥、接口请求参数）
  appkey: 'your appkey',
  appid: 'your appid'
}
const translate = new Translate(APP.appkey, APP.appid);
// 文本翻译（AI Lab）
translate.texttrans({text: '你好'}).then((res)=>{
  console.log('文本翻译(AI Lab)',JSON.stringify(res));
}, (e)=>{
  console.log('文本翻译(AI Lab)',JSON.stringify(e));
})
```

**Node.js SDK目录结构**

        ├── src
        │  ├── client                              //通用代理请求类
        │  ├── util                                //通用数据类
        │  ├── ApiBaseLanguae.js                   //自然语言处理-基本类 
        │  ├── ApiFace.js                          //计算机视觉-面部识别类     
        │  ├── ApiImgPublic.js                     //计算机视觉-图片识别公共类  
        │  ├── ApiImgSpecialEffects.js             //计算机视觉-图片特效类   
        │  ├── ApiOCR.js                           //计算机视觉-ORC类    
        │  ├── ApiPersion.js                       //计算机视觉-人体管理类   
        │  ├── ApiSpeech.js                        //智能语音 
        │  ├── ApiTranslate.js                     //自然语言处理-翻译类  
        │  └── index.js                            //入口文件
        ├── test                                   
        │  └── index.js                            //测试
        └── package.json                           //npm包描述文件
# Demos

* [https://ai.qq.com/](https://ai.qq.com/)

# 日志
2018年02月03日  添加 计算机视觉 面部识别类、人体管理类、图片特效类  
2018年02月02日  添加 计算机视觉 图片识别公共类、ORC类

# 详细使用文档

参考[QQAI开放平台官方文档](https://ai.qq.com/doc/index.shtml)

# License

[QQAI-API-SDK](https://github.com/w89612b/qqai-api-sdk) is released under [MIT licence](https://www.webrtc-experiment.com/licence/) . Copyright (c) [wubo](http://www.jswebtest.com/).
