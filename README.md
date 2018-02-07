# QQAI-API-SDK to Node.js 

# 安装QQAI开放平台 Node.js SDK 非官方平台提供  
所有测试文件来至网络 有版权啥的请联系我
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
        │  ├── file                                //测试使用的相关文件存放地址
        │  ├── tta                                 //tta合成文件存放地址
        │  ├── tts                                 //tts合成文件存放地址
        │  ├── baseLanguae.js                      //自然语言处理-基本类 测试文件    
        │  ├── face.js                             //计算机视觉-面部识别 测试文件  
        │  ├── imgpulic.js                         //计算机视觉-图片识别公共类 测试文件 
        │  ├── ImgSpecialEffects.js                //计算机视觉-图片特效 测试文件   
        │  ├── OCR.js                              //计算机视觉-ORC 测试文件
        │  ├── Persion.js                          //计算机视觉-人体管理类 测试文件  
        │  ├── speech.js                           //智能语音 测试文件   语音识别-流式版（AI Lab）、语音识别-流式版(WeChat AI)、长语音识别  没有具体测试 
        │  ├── translate.js                        //自然语言处理-翻译类 测试文件            
        │  └── util.js                             //测试公用文件
        └── package.json                           //npm包描述文件
# Demos

* [https://ai.qq.com/](https://ai.qq.com/)

# 日志  
2018年02月07日   版本 1.1.3   
> 添加 计算机视觉-人体管理 测试文件   
> 修改类 GBK编码相关的文件 公共类文件  连接代理类文件   
> 特别说明：官方GBK不支持  文字需要GBK编码的接口不能包含半角对应的数字和大小写字母 其他均可  ，如需要用到字母和数字请用全角输入     


2018年02月06日   版本 1.1.2   
> 添加 计算机视觉-图片特效 计算机视觉-面部识别 测试文件   
> 修改类 计算机视觉-人体管理类 从ApiFace类中迁入人脸识别和人脸验证        
   计算机视觉-面部识别   移动人脸识别和人脸验证到APIPerson类中   


2018年02月05日   版本 1.1.1   
> 添加 自然语言处理-基本类 计算机视觉-图片识别公共类 测试文件   
> 自然语言处理-基本类 GBK 转码的问题 需要解决   
> 修改类 计算机视觉-图片识别公共类 创建方法
> 语音识别加入PCM文件正常识别
> 加入转码包 iconv-lite 依赖      
 

2018年02月04日   版本 1.1.0   
> 添加 语音测试 计算机视觉-ORC  修改部分注释   
> 修改 类创建验证BUG    

2018年02月03日  添加 计算机视觉 面部识别类、人体管理类、图片特效类  
2018年02月02日  添加 计算机视觉 图片识别公共类、ORC类

# 致歉
由于本人 于2018年02月03日 加入类创建验证写反，导致系列错误 对不起大家

# 详细使用文档

参考[QQAI开放平台官方文档](https://ai.qq.com/doc/index.shtml)

# License

[QQAI-API-SDK](https://github.com/w89612b/qqai-api-sdk) is released under [MIT licence](https://www.webrtc-experiment.com/licence/) . Copyright (c) [wubo](http://www.jswebtest.com/).
