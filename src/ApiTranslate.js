const {
  URIS,
  commonParams,
  error
} = require('./util');
const PS = require('./client/ProxyServices');
/**
 * 机器翻译API服务类
 * @description 提供QQAI翻译模块的API调用
 * @author wubo 2018-01-30
 * @version 1.0.4
 */
module.exports = class Translate {
  /**
   * 机器翻译API构造函数
   * @prop {String} app_key 应用key
   * @prop {String} app_id  应用id
   * @function texttrans(Object) 文本翻译（AI Lab）
   * @function texttranslate(Object) 文本翻译（翻译君）
   * @function imagetranslate(Object) 图片翻译
   * @function speechtranslate(Object) 语音翻译
   * @function textdetect(Object) 语种识别
   * @example
   *  new Translate('a95eceb1ac8c24ee28b70f7dbba912bf', '1000001')
   */
  constructor(appKey, appId) {
    if (!appKey || !appId) {
      console.log(`appKey and appId are required`);
      return;
    }
    this.appKey = appKey;
    this.appId = appId;
  }
  /**
   * 文本翻译（AI Lab）
   * @description 文本翻译接口提供自动翻译能力，可以帮您快速完成一段文本的翻译，支持中、英、德、法、日、韩、西、粤语种。
   * 具体参数查看：https://ai.qq.com/doc/nlptrans.shtml
   * @prop {String} text  UTF-8编码，非空且长度上限1024字节
   * @prop {Number} type
   * 0	自动识别（中英文互转）
   * 1	中文翻译成英文
   * 2	英文翻译成中文
   * 3	中文翻译成西班牙文
   * 4	西班牙文翻译成中文
   * 5	中文翻译成法文
   * 6	法文翻译成中文
   * 7	英文翻译成越南语
   * 8	越南语翻译成英文
   * 9	中文翻译成粤语
   * 10	粤语翻译成中文
   * 11	中文翻译成韩文
   * 13	英文翻译成德语
   * 14	德语翻译成英文
   * 15	中文翻译成日文
   * 16	日文翻译成中文
   * @example 
   *  texttrans({
   *    type: 0,
   *    text: '你好QQAI',
   *  })
   * @return A Promise Object
   */
  texttrans({
    type = 0,
    text = ''
  }) {
    if (text && Buffer.byteLength(text, 'utf8') < 1024) {
      return PS(URIS.texttrans, this.appKey, Object.assign({}, commonParams(), {
        app_id: this.appId,
        type: type,
        text: text
      }));
    } else {
      return error(`text不能为空 或者应小于 1024B`);
    }
  }
  /**
   * 文本翻译（翻译君）
   * @description 文本翻译接口提供自动翻译能力，可以帮您快速完成一段文本的翻译，支持多种语言之间的互译。
   * 具体参数查看：https://ai.qq.com/doc/nlptrans.shtml
   * @prop {String} text  UTF-8编码，非空且长度上限1024字节
   * @prop {String} source  默认 auto  中文	zh/英文	en/日文	jp/韩文	kr/法文	fr/西班牙文	es/意大利文	it/德文	de/土耳其文	tr/俄文	ru/葡萄牙文	pt/越南文	vi/印度尼西亚文	id/马来西亚文	ms/泰文	th/自动识别（中英互译）	auto
   * @prop {string} target   默认 en
   * en=>>zh, fr, es, it, de, tr, ru, pt, vi, id, ms, th----
   * zh=>>en, fr, es, it, de, tr, ru, pt, vi, id, ms, th, jp, kr----
   * fr=>>en, zh, es, it, de, tr, ru, pt----
   * es=>>en, zh, fr, it, de, tr, ru, pt----
   * it=>>en, zh, fr, es, de, tr, ru, pt----
   * de=>>en, zh, fr, es, it, tr, ru, pt----
   * tr=>>en, zh, fr, es, it, de, ru, pt----
   * ru=>>en, zh, fr, es, it, de, tr, pt----
   * pt=>>en, zh, fr, es, it, de, tr, ru----
   * vi=>>en, zh----
   * id=>>en, zh----
   * ms=>>en, zh----
   * th=>>en, zh----
   * jp=>>zh----
   * kr=>>zh----
   * @example 
   *  texttranslate({
   *    text: 'hi',
   *    source: 'auto',
   *    target: 'zh'
   *  })
   * @return A Promise Object
   */
  texttranslate({
    text = '',
    source = 'auto',
    target = 'zh'
  }) {
    if (text && Buffer.byteLength(text, 'utf8') < 1024) {
      return PS(URIS.texttranslate, this.appKey, Object.assign({}, commonParams(), {
        app_id: this.appId,
        text: text,
        source: source,
        target: target
      }));
    } else {
      return error(`text不能为空 或者应小于 1024B`);
    }
  }
  /**
   * 图片翻译
   * @description 识别图片中的文字，并进行翻译
   * 具体参数查看：https://ai.qq.com/doc/imagetranslate.shtml
   * @prop {string} image  原始图片的base64编码数据（原图大小上限1MB） 
   * @prop {string} session_id 一次请求ID（尽可能唯一，长度上限64字节）
   * @prop {string} scene 默认 word word-单词识别，doc-文档识别  
   * @prop {string} source 默认 auto 中文	zh \ 英文	en \ 日文	jp \ 韩文	kr \ 自动识别（中英互译）	auto  
   * @prop {string} target 默认 en en=>zh \ zh=>en,jp,kr \j p=>zh \ kr=>zh   
   * @example 
   *  imagetranslate({
   *    image: database64,
   *    session_id: '1509333186',
   *    scene: 'word',
   *    source: 'zh',
   *    target: 'en',
   *  })
   * @return A Promise Object
   */
  imagetranslate({
    image = '',
    session_id = '',
    scene = 'word',
    source = 'auto',
    target = 'en'
  }) {
    if (image && session_id) {
      if (Buffer.byteLength(image, 'base64') < 1048576) {
        return PS(URIS.imagetranslate, this.appKey, Object.assign({}, commonParams(), {
          app_id: this.appId,
          image: image,
          session_id: session_id,
          scene: scene,
          source: source,
          target: target
        }));
      } else {
        return error(`图片大小必须小于1M`);
      }
    } else {
      return error(`image/session_id 不能为空`);
    }
  }
  /**
   * 语音翻译
   * @description 识别出音频中的文字，并进行翻译
   * 具体参数查：https://ai.qq.com/doc/speechtranslate.shtml
   * @prop {int} format 默认MP3-8 AMR	3/SILK	4/PCM	6/MP3	8/AAC	9 
   * @prop {int} seq 默认0 语音分片所在语音流的偏移量（字节）
   * @prop {int} end 默认1  0	中间分片/1	结束分片
   * @prop {string} session_id   非空且长度上限64B
   * @prop {string} speech_chunk 语音分片数据的Base64编码，非空且长度上限8MB
   * @prop {string} source 默认auto 中文	zh / 英文	en/ 日文	jp /韩文	kr / 自动识别（中英互译）	auto
   * @prop {string} target 默认auto  en=>	zh / zh=>	en, jp, kr / jp=>zh / kr=> zh
   * @example 
   *  speechtranslate({
   *    format: '3',
   *    seq: '2',
   *    end: 0，
   *    session_id: test1,
   *    speech_chunk: database64,
   *    source: 'auto',
   *    target: 'en'
   *  })
   * @return A Promise Object
   */
  speechtranslate({
    format = 8,
    seq = 0,
    end = 1,
    session_id = '',
    speech_chunk = '',
    source = 'auto',
    target = 'auto'
  }) {
    if (speech_chunk && session_id) {
      if (Buffer.byteLength(speech_chunk, 'base64') < 1048576 * 8) {
        return PS(URIS.speechtranslate, this.appKey, Object.assign({}, commonParams(), {
          app_id: this.appId,
          format: format,
          seq: seq,
          end: 1,
          session_id: session_id,
          speech_chunk: speech_chunk,
          source: source,
          target: target
        }));
      } else {
        return error(`speech_chunk必须小于8M`);
      }
    } else {
      return error(`speech_chunk/session_id 不能为空`);
    }
  }
  /**
   * 语种识别
   * @description 识别给出文本的语种
   * 具体参数查看：https://ai.qq.com/doc/textdetect.shtml
   * @prop {String} text  UTF-8编码，非空且长度上限1024字节
   * @prop {String} candidate_langs  语言缩写，多种语言间用“,“ 分割
   * 中文	zh \ 英文	en \ 日文	jp \ 韩文	kr
   * @prop {int} force 是否强制从候选语言中选择（只对二选一有效）
   * @example 
   *  textdetect({
   *    text: 'hi',
   *    candidate_langs: 'zh,en',
   *    force: 0
   *  })
   * @return A Promise Object
   */
  textdetect({
    text,
    candidate_langs = 'zh,en,kr,jp',
    force = 0
  }) {
    if (text && Buffer.byteLength(text, 'utf8') < 1024) {
      return PS(URIS.textdetect, this.appKey, Object.assign({}, commonParams(), {
        app_id: this.appId,
        text: text,
        candidate_langs: candidate_langs,
        force: force
      }));
    } else {
      return error(`text不能为空 或者应小于 1024B`);
    }
  }
}
