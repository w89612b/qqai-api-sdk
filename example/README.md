# QQAI-API-SDK to Node.js 

# 安装QQAI开放平台 Node.js SDK 非官方平台提供  
所有测试文件来至网络 有版权啥的请联系我
* http://ai.jswebtest.com/

**直接使用npm安装依赖：**
```sh
# install
npm install 

use
 src/util.js 
 module.exports.APP = {
  // 设置请求数据（应用密钥、接口请求参数）
  appkey: '',
  appid: ''
  };
# start server
npm run dev
```
**Demo目录结构**

        ├── html                                   //静态文件文件夹
        ├── image                                  //示例图片文件夹
        │  ├── face                                //人体管理保存文件夹
        ├── public                                 //CSS和前端JS文件
        ├── src                                    //服务开发文件夹
        ├── tta                                    //返回TTA合成文件放置位置
        ├── tts                                    //返回TTS合成文件放置位置
        ├── index.js                               //服务启动文件
        └── package.json                           //npm包描述文件
# 日志  
2018年04月18日 版本 1.2.1   
>当编码不能解析时，原样输出

2018年03月06日 版本 1.1.8   
>SDK 示例程序发布


# License

[QQAI-API-SDK](https://github.com/w89612b/qqai-api-sdk) is released under [MIT licence](https://www.webrtc-experiment.com/licence/) . Copyright (c) [wubo](http://www.jswebtest.com/).
