const {
  URIS,
  commonParams,
  error
} = require('./util');
const PS = require('./client/ProxyServices');
/**
 * 智能语音API服务类
 * @description 提供QQAI智能语音模块的API调用
 * @author wubo 2018-01-30
 * @version 1.0.4
 * 2018-09-29 添加关键词检索接口detectword
 */
module.exports = class Speech {
  /**
   * 智能语音API服务类
   * @prop {String} app_key 应用key
   * @prop {String} app_id  应用id
   * @function tts(Object) 语音合成（AI Lab）
   * @function tta(Object) 语音合成（优图）
   * @function asr(Object) 语音识别-echo版
   * @function asrs(Object) 语音识别-流式版（AI Lab）
   * @function wxasrs(Object) 语音识别-流式版(WeChat AI)
   * @function wxasrlong(Object) 长语音识别
   * @function detectword(Object) 关键词检索
   * @example
   *  new Speech('a95eceb1ac8c24ee28b70f7dbba912bf', '1000001')
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
   * 语音合成（AI Lab）
   * @description 将文字转换为语音，返回文字的语音数据
   * 具体参数查看：https://ai.qq.com/doc/aaitts.shtml
   * @prop {String} text  待合成文本 UTF-8编码，非空且长度上限150字节
   * @prop {Number} speaker 默认1 语音发音人编码，取值范围[普通话男声	1 | 静琪女声	5 | 欢馨女声	6 | 碧萱女声	7]
   * @prop {Number} format 默认2  合成语音格式编码，取值范围[PCM	1 | WAV	2 | MP3	3]
   * @prop {Number} volume 默认10dB 合成语音音量，取值范围[-10, 10]，
   * @prop {Number} speed 默认100---- 合成语音语速，取值范围[50, 200]
   * @prop {Number} aht 默认0---- 合成语音降低/升高半音个数，即改变音高，取值范围[-24, 24]
   * @prop {Number} apc 默认58--- 控制频谱翘曲的程度，改变说话人的音色，取值范围[0, 100] 
   * @example 
   *  tts({
   *    text: '你好中国',
   *    speaker: 1,
   *    format: 2,
   *    volume: 10,
   *    speed: 100,
   *    aht: 0,
   *    apc: 58
   *  })
   * @return A Promise Object
   */
  tts({
    text = '',
    speaker = 1,
    format = 2,
    volume = 10,
    speed = 100,
    aht = 0,
    apc = 58
  }) {
    if (text && Buffer.byteLength(text, 'utf8') < 150) {
      return PS(URIS.tts, this.appKey, Object.assign({}, commonParams(), {
        app_id: this.appId,
        text: text,
        speaker: speaker,
        format: format,
        volume: volume,
        speed: speed,
        aht: aht,
        apc: apc
      }));
    } else {
      return error(`text不能为空 或者应小于 150B`);
    }
  }
  /**
   * 语音合成（优图）
   * @description 将文字转换为语音，返回文字的语音数据
   * 具体参数查看：https://ai.qq.com/doc/aaitts.shtml
   * @prop {String} text 待合成语音文本 utf8格式，最大300字节
   * @prop {Number} model_type 默认0--- 发音模型，取值范围[女生	0 | 女生纯英文	1 | 男生	2 | 喜道公子	6] 
   * @prop {Number} speed 默认0--- 合成语音语速，取值范围[0.6倍速	-2 | 0.8倍速	-1 | 正常速度	0 | 1.2倍速	1 | 1.5倍速	2] 
   * @example 
   *  tta({
   *    text: '你好中国',
   *    model_type: 0,
   *    speed: 0
   *  })
   * @return A Promise Object
   */
  tta({
    text = '',
    model_type = 0,
    speed = 0
  }) {
    if (text && Buffer.byteLength(text, 'utf8') < 300) {
      return PS(URIS.tta, this.appKey, Object.assign({}, commonParams(), {
        app_id: this.appId,
        text: text,
        model_type: model_type,
        speed: speed
      }));
    } else {
      return error(`text不能为空 或者应小于 300B`);
    }
  }
  /**
   * 语音识别-echo版
   * @description 接口提供在线识别语音的能力，识别完成后，将返回语音的文字内容。
   * 具体参数查看：https://ai.qq.com/doc/aaiasr.shtml
   * @prop {String} speech 待识别语音（时长上30s） 单声道，16bit采样位数，语音数据的Base64编码，非空且长度上限8MB
   * @prop {Number} format 默认2--- 语音压缩格式编码，取值范围[PCM	1 | WAV	2 | AMR	3 | SILK	4] 
   * @prop {Number} rate 默认8000--- 语音采样率编码，取值范围[8KHz	8000 | 16KHz	16000] 
   * @example 
   *  asr({
   *    text: '你好中国',
   *    model_type: 2,
   *    speed: 8000
   *  })
   * @return A Promise Object
   */
  asr({
    speech = '',
    format = 2,
    rate = 8000
  }) {
    if (speech && Buffer.byteLength(speech, 'base64') < 1048576 * 8) {
      return PS(URIS.asr, this.appKey, Object.assign({}, commonParams(), {
        app_id: this.appId,
        speech: speech,
        format: format,
        rate: rate
      }));
    } else {
      return error(`speech 不能为空`);
    }
  }
  /**
   * 语音识别-流式版（AI Lab）
   * @description 流式版接口提供在线流式识别语音的能力，可以快速获取边录音边识别的能力。
   * 具体参数查看：https://ai.qq.com/doc/aaiasr.shtml
   * @prop {String} speech_chunk 待识别语音 单声道，语音数据的Base64编码，非空且长度上限8MB   
   * 分片规则[
   * PCM	支持按字节或者时间切片  |  
   * WAV	支持按字节或者时间切片   |   
   * AMR	仅支持按帧切片，第一个分片需包含AMR头标识（#!AMR\n），每个分片至少包含一个AMR帧，一个分片允许包含多个AMR帧   |   
   * SILK	仅支持按帧切片，第一个分片需包含SILK头标识（#!SILK_V3），每个分片至少包含一个SILK帧，一个分片允许包含多个SILK帧]
   * @prop {String} speech_id 语音唯一标识（同一应用内）
   * @prop {Number} len 语音分片长度（字节）
   * @prop {Number} seq 默认0 语音分片所在语音流的偏移量（字节）
   * @prop {Number} end 默认1 是否结束分片标识，取值范围[0	中间分片 | 1	结束分片]
   * @prop {Number} format 默认2--- 语音压缩格式编码，取值范围[PCM	1 | WAV	2 | AMR	3 | SILK	4] 
   * @prop {Number} rate 默认8000--- 语音采样率编码，取值范围[8KHz	8000 | 16KHz	16000] 
   * @example 
   *  asrs({
   *    format：1,
   *    rate：16000,
   *    seq：2048,
   *    len：1024,
   *    end：1,
   *    speech_id：id,
   *    speech_chunk：database64
   *  })
   * @return A Promise Object
   */
  asrs({
    speech_chunk = '',
    speech_id = '',
    len = 0,
    seq = 0,
    end = 1,
    format = 2,
    rate = 8000
  }) {
    if (speech_chunk && Buffer.byteLength(speech_chunk, 'base64') < 1048576 * 8 && speech_id && len) {
      return PS(URIS.asrs, this.appKey, Object.assign({}, commonParams(), {
        app_id: this.appId,
        speech_chunk: speech_chunk,
        speech_id: speech_id,
        len: len,
        seq: seq,
        end: end,
        format: format,
        rate: rate
      }));
    } else {
      return error(`speech_chunk/speech_id 不能为空, len不能为0  或者 speech_chunk大小必须小余8M`);
    }
  }
  /**
   * 语音识别-流式版(WeChat AI)
   * @description 流式版接口提供在线流式识别语音的能力，可以快速获取边录音边识别的能力。
   * 为保证识别的流畅度，语音的分片时长建议200-300ms，单段语音的总时长上限为90s。
   * 具体参数查看：https://ai.qq.com/doc/aaiasr.shtml
   * @prop {String} speech_chunk 待识别语音 单声道，非空且时长上限90s，建议时长200-300ms，分片规则见下文描述  
   * 分片规则[
   * PCM	支持按字节或者时间切片
   * WAV	支持按字节或者时间切片
   * AMR	支持按字节或者时间切片
   * SILK	支持按字节或者时间切片
   * SPEEX	支持按字节或者时间切片]
   * @prop {String} speech_id 语音唯一标识（同一应用内）
   * @prop {Number} len 语音分片长度（字节）
   * @prop {Number} seq 默认0 语音分片所在语音流的偏移量（字节）
   * @prop {Number} end 默认1 是否结束分片标识，取值范围[0	中间分片 | 1	结束分片]
   * @prop {Number} format 默认2--- 语音压缩格式编码，取值范围[PCM	1 | WAV	2 | AMR	3 | SILK	4 | SPEEX	5] 
   * @prop {Number} rate 默认16000--- 语音采样率编码，取值范围[16KHz	16000] 
   * @prop {Number} bits 默认16位--- 音频采样位数 
   * @prop {Number} cont_res 默认0--- 是否获取中间识别结果，取值范围 [0	不获取 | 1	获取]
   * @example 
   *  wxasrs({
   *    format：1,
   *    rate：16000,
   *    seq：2048,
   *    len：1024,
   *    end：1,
   *    speech_id：id,
   *    speech_chunk：database64,
   *    bits: 16,
   *    cont_res: 0
   *  })
   * @return A Promise Object
   */
  wxasrs(speech_chunk = '', speech_id = '', len = 0, seq = 0, end = 1, format = 2, rate = 16000, bits = 16, cont_res = 0) {
    if (speech_chunk && speech_id && len) {
      return PS(URIS.wxasrs, this.appKey, Object.assign({}, commonParams(), {
        app_id: this.appId,
        speech_chunk: speech_chunk,
        speech_id: speech_id,
        len: len,
        seq: seq,
        end: end,
        format: format,
        rate: rate,
        bits: bits,
        cont_res: cont_res
      }));
    } else {
      return error(`speech_chunk/speech_id 不能为空, len不能为0`);
    }
  }
  /**
   * 长语音识别
   * @description 长语音识别包含两个接口：语音上传接口，回调接口。用户调用语音上传接口上传语音，返回task_id，在识别完成后平台异步通知用户，返回识别结果。
   * 具体参数查看：https://ai.qq.com/doc/wxasrlong.shtml
   * @prop {Number} format 默认2--- 语音压缩格式编码，取值范围[PCM	1 | WAV	2 | AMR	3 | SILK	4] 
   * @prop {String} callback_url 用户回调url，需用户提供，用于平台向用户通知识别结果 
   * @prop {String} speech 待识别语音（时长上限15min） 语音数据的Base64编码，原始音频大小上限5MB
   * @prop {String} speech_url 待识别语音下载地址（时长上限15min） 音频下载地址，音频大小上限30MB
   * @example 
   *  wxasrlong({
   *    format：1,
   *    callback_url: 'url',
   *    speech：database64,
   *    speech_url：'url',
   *  })
   * @return A Promise Object
   */
  wxasrlong({
    format = 2,
    callback_url = '',
    speech = '',
    speech_url = ''
  }) {
    if (callback_url && (speech || speech_url)) {
      if (Buffer.byteLength(speech, 'base64') < 1048576 * 5 || speech_url) {
        return PS(URIS.wxasrlong, this.appKey, Object.assign({}, commonParams(), {
          app_id: this.appId,
          speech_url: speech_url,
          speech: speech,
          callback_url: callback_url,
          format: format
        }));
      } else {
        return error(`speech大小必须小余5M`);
      }
    } else {
      return error(`callback_url/speech 不能为空 或者 callback_url/speech_url不能为空`);
    }
  }

  /**
   * 关键词检索
   * @description 关键词检索包含两个接口：语音上传接口，回调接口。用户调用语音上传接口上传语音，返回task_id，在识别完成后平台异步通知用户，返回识别结果。
   * 具体参数查看：https://ai.qq.com/doc/detectword.shtml
   * @prop {Number} format 默认2--- 语音压缩格式编码，取值范围[PCM	1 | WAV	2 | AMR	3 | SILK	4] 
   * @prop {String} callback_url 用户回调url，需用户提供，用于平台向用户通知识别结果 
   * @prop {String} key_words 待识别关键词 多个关键词之间用“|”分隔，每个词长度不低于两个字，上限500个词
   * @prop {String} speech 待识别语音（时长上限15min） 语音数据的Base64编码，原始音频大小上限5MB
   * @prop {String} speech_url 待识别语音下载地址（时长上限15min） 音频下载地址，音频大小上限30MB
   * @example 
   *  detectword({
   *    format：1,
   *    callback_url: 'url',
   *    speech：database64,
   *    key_words: 'A'
   *    speech_url：'url',
   *  })
   * @return A Promise Object
   */
  detectword({
    format = 2,
    callback_url = '',
    key_words = '',
    speech = '',
    speech_url = ''
  }) {
    if (callback_url && (speech || speech_url) && key_words) {
      if (Buffer.byteLength(speech, 'base64') < 1048576 * 5 || speech_url) {
        return PS(URIS.detectword, this.appKey, Object.assign({}, commonParams(), {
          app_id: this.appId,
          speech_url: speech_url,
          speech: speech,
          key_words: key_words,
          callback_url: callback_url,
          format: format
        }));
      } else {
        return error(`speech大小必须小余5M`);
      }
    } else {
      return error(`callback_url/speech 不能为空 或者 key_words/callback_url/speech_url不能为空`);
    }
  }
}
