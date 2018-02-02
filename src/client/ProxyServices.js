const https = require('https');
const querystring = require('querystring');
const crypto = require('crypto');

/**
 * 腾讯AI请求代理类
 * @param {string} uri  请求的URI
 * @param {string} appkey 请求的APP_key
 * @param {Object} opt 请求的数据对象，不包含签名属性,不用进行数据编码
 * @param {Function} resolve 请求正确结果的处理方法
 * @param {Function} reject 请求错误的处理方法
 * @example 
 *   new ProxyServices(uri, appkey, opt, resolve, reject)
 * @returns ProxyServices实体类
 */
class ProxyServices {
  constructor(uri, appkey, opt, resolve, reject) {
    this.uri = uri; // 绑定请求资源
    this.opt = opt; // 绑定基础数据
    this.resolve = resolve; // 绑定正确处理方法
    this.reject = reject; // 绑定错误处理方法
    this.appkey = appkey; // 绑定APPkey
    this.postData = null; // 请求数据
    this.requestOpt = null; // 请求参数
    // 初始化
    this.init()
  }

  /**
   * ksort ：根据 接口请求参数 升序排序
   * @param this.opt 接口请求参数
   * @returns 升序排序结果
   */
  ksort() {
    let arrayList = [],
      sort = (a, b) => {
        return a.key < b.key ? -1 : a.key > b.key ? 1 : 0;
      };
    for (let key in this.opt) {
      arrayList.push({
        "key": key,
        "value": this.opt[key]
      })
    }
    return arrayList.sort(sort)
  }

  /**
   * getReqSign ：根据 接口请求参数 和 应用密钥 计算 请求签名
   * @param this.opt 接口请求参数
   * @param this.appkey：应用密钥
   * @returns 签名结果
   */
  getReqSign() {
    let parList, sign, str = ''
    // 1. 字典升序排序
    parList = this.ksort();
    // 2. 拼按URL键值对
    parList.map((item) => {
      if (item.value !== '') {
        str += `${item.key}=${querystring.escape(item.value)}&`;
      }
    });
    // 3. 拼接app_key
    str += `app_key=${this.appkey}`;
    // 4. MD5运算+转换大写，得到请求签名
    sign = crypto.createHash('md5').update(str).digest('hex').toUpperCase()
    console.log(sign)
    return sign;
  }

  /**
   * 代理请求
   */
  request() {
    var proxy = https.request(this.requestOpt, (pres) => {
      let body = ''
      pres.on('data', (d) => {
        body += d;
      }).on('end', () => {
        this.resolve(JSON.parse(body));
      });
    }).on('error', (e) => {
      this.reject(e);
    });
    // 写入数据到请求主体
    proxy.write(this.postData);
    proxy.end();
  }

  // 初始化
  init() {
    // 计算签名
    this.opt['sign'] = this.getReqSign();
    // 提交数据组装
    this.postData = querystring.stringify(this.opt);
    // 请求数据组装
    this.requestOpt = {
      protocol: 'https:', // <string> 使用的协议。默认为 http:
      hostname: 'api.ai.qq.com', //<string> host 的别名。为了支持 url.parse()，hostname 优先于 host。
      port: 443, //<number> 远程服务器的端口。默认为 80。
      method: 'POST', // <string> 指定 HTTP 请求方法的字符串。默认为 'GET'。
      path: this.uri, // <string> 请求的路径。默认为 '/'。 应包括查询字符串（如有的话）。如 '/index.html?page=12'。 当请求的路径中包含非法字符时，会抛出异常。 目前只有空字符会被拒绝，但未来可能会变化。
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(this.postData)
      } //<Object> 包含请求头的对象
    };
    // 发起请求
    this.request();
  }
}

/**
 * 代理请求处理方法
 * @param {String} URI 请求的URI，例如：'/fcgi-bin/aai/aai_tts'
 * @param {String} appkey 你的app_key
 * @param {Object} OPT 除了签名以外的请求数据对象，不用对数据进行编码，请求会进行编码
 * @example
 *  const fs = require('fs');
 *  // 随机字符串
 *  const randomString = require('randomstring');
 *  const appkey = 'Your APPKEY';
 *  // 基础请求数据
 *  const commonParams = () => {
 *    return {
 *      'app_id': 'Your APPID',
 *      'nonce_str': randomString.generate({
 *        length: 16,
 *        charset: 'alphanumeric',
 *        capitalization: 'uppercase'
 *      }),
 *      'time_stamp': Math.floor(Date.now() / 1000),
 *    }
 *  }
 *  // 文件请求数据
 *  var FSRead = function (dir) {
 *    let FileBase64 = fs.readFileSync(dir, {
 *      encoding: 'base64'
 *    });
 *    return {
 *      image: FileBase64
 *    };
 *  }
 *  // 组装请求数据
 *  var asrparams = Object.assign(commonParams(), FSRead(`file path`));
 *  // 建立一个代理请求
 *  PS('AI URI', appkey, asrparams).then((result) => {
 *    console.log(JSON.stringify(result));
 *  }, (e) => {
 *    // 发生网络错误
 *    console.log(JSON.stringify(e))
 *  });
 * @returns Promise
 */
const PS = module.exports = function (URI, appkey, OPT) {
  return new Promise((resolve, reject) => {
    new ProxyServices(URI, appkey, OPT, resolve, reject);
  });
}
