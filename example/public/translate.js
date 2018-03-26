$(document).ready(function ($) {
  $('.collapse-btn .btn').on('click', function (e) {
    var index = $(this).index();
    $(this).addClass('btn-primary').siblings().removeClass('btn-primary');
    $($('.collapse-box .col-sm')[index]).addClass('active').siblings().removeClass('active');
  });
  /** 源语言和目标语言 */
  var fyj_sourceObj = {
      'zh': '中文',
      'en': '英文',
      'jp': '日文',
      'kr': '韩文',
      'fr': '法文',
      'es': '西班牙文',
      'it': '意大利文',
      'de': '德文',
      'tr': '土耳其文',
      'ru': '俄文',
      'pt': '葡萄牙文',
      'vi': '越南文',
      'id': '印度尼西亚文',
      'ms': '马来西亚文',
      'th': '泰文'
    },
    fyj_targetObj = {
      'en': ['zh', 'fr', 'es', 'it', 'de', 'tr', 'ru', 'pt', 'vi', 'id', 'ms', 'th'],
      'zh': ['en', 'fr', 'es', 'it', 'de', 'tr', 'ru', 'pt', 'vi', 'id', 'ms', 'th', 'jp', 'kr'],
      'fr': ['en', 'zh', 'es', 'it', 'de', 'tr', 'ru', 'pt'],
      'es': ['en', 'zh', 'fr', 'it', 'de', 'tr', 'ru', 'pt'],
      'it': ['en', 'zh', 'fr', 'es', 'de', 'tr', 'ru', 'pt'],
      'de': ['en', 'zh', 'fr', 'es', 'it', 'tr', 'ru', 'pt'],
      'tr': ['en', 'zh', 'fr', 'es', 'it', 'de', 'ru', 'pt'],
      'ru': ['en', 'zh', 'fr', 'es', 'it', 'de', 'tr', 'pt'],
      'pt': ['en', 'zh', 'fr', 'es', 'it', 'de', 'tr', 'ru'],
      'vi': ['en', 'zh'],
      'id': ['en', 'zh'],
      'ms': ['en', 'zh'],
      'th': ['en', 'zh'],
      'jp': ['zh'],
      'kr': ['zh']
    },
    ailab_sourceObj = {
      'zh': '中文',
      'en': '英文',
      'de': '德文',
      'fr': '法文',
      'jp': '日文',
      'kr': '韩文',
      'es': '西班牙文',
      'ct': '粤语',
      'vi': '越南文'
    },
    ailab_targetObj = {
      'zh': ['en', 'kr', 'jp', 'ct', 'fr', 'es'],
      'en': ['zh', 'de', 'vi'],
      'de': ['en'],
      'fr': ['zh'],
      'jp': ['zh'],
      'kr': ['zh'],
      'es': ['zh'],
      'ct': ['en'],
      'vi': ['en']
    };
  /** 页面元素声明 */
  var $source_lan = $('#source_lan'),
    $target_lan = $('#target_lan'),
    $form_check_inline = $('.form-check-inline'),
    $textarea_tips = $('.textarea_tips'),
    $texttransForm = $('#texttransForm'),
    $texttransBox = $('.texttransBox'),
    sopts = '',
    topts = '';

  /** 初始化 */
  for (var key in fyj_sourceObj) {
    sopts += '<option value="' + key + '" >' + fyj_sourceObj[key] + '</option>'
  }
  fyj_targetObj.zh.map(function (item) {
    topts += '<option value="' + item + '" >' + fyj_sourceObj[item] + '</option>'
  });
  $source_lan.html(sopts);
  $target_lan.html(topts);
  $source_lan.val('zh');
  $target_lan.val('en');
  /** 技术提供点击事件， 控制语言选着*/
  $form_check_inline.find('.form-check-label').on('click', function (e) {
    var val = $('input[name="engine"]:checked').val();
    if (val !== 'fyj') {
      for (var key in fyj_sourceObj) {
        sopts += '<option value="' + key + '" >' + fyj_sourceObj[key] + '</option>'
      }
      fyj_targetObj.zh.map(function (item) {
        topts += '<option value="' + item + '" >' + fyj_sourceObj[item] + '</option>'
      });
    } else {
      for (var key in ailab_sourceObj) {
        sopts += '<option value="' + key + '" >' + ailab_sourceObj[key] + '</option>'
      }
      ailab_targetObj.zh.map(function (item) {
        topts += '<option value="' + item + '" >' + ailab_sourceObj[item] + '</option>'
      });
    }
    $source_lan.html(sopts);
    $target_lan.html(topts);
    $source_lan.val('zh');
    $target_lan.val('en');
  });
  $source_lan.on('change', function (e) {
    var val = $(this).val(),
      engine_val = $('input[name="engine"]:checked').val(),
      one = '';
    if (engine_val === 'fyj') {
      fyj_targetObj[val].map(function (item) {
        topts += '<option value="' + item + '" >' + fyj_sourceObj[item] + '</option>'
      });
      one = fyj_targetObj[val][0]
    } else {
      ailab_targetObj[val].map(function (item) {
        topts += '<option value="' + item + '" >' + ailab_sourceObj[item] + '</option>'
      });
      one = ailab_targetObj[val][0];
    }
    $target_lan.html(topts);
    $target_lan.val(one);
  });
  $('.texttrans_text').on('input', texttrans_text);
  $('.texttrans_text').on('blur', texttrans_text);

  function texttrans_text(e) {
    var val = $(this).val(),
      l = val.length;
    if (l <= 500) {
      $textarea_tips.html('' + l + '/500');
      $textarea_tips.removeAttr('style');
      var postData = {};
      $texttransForm.serializeArray().map((item, index) => {
        postData[item.name] = item.value;
      });
      $.post('/texttrans', JSON.stringify(postData), function (res) {
        $texttransBox.text(res.data.trans_text || res.data.target_text || res.retMsg)
      });
    } else {
      $textarea_tips.html('' + l + '/500');
      $textarea_tips.css('color', 'red');
    }
  };

  /**图片翻译 */
  var $imagetranslateBox = $('.imagetranslateBox');
  $('.filebtn').on('click', function (e) {
    $('#imgFile').click();
  })
  $('#imgFile').on('change', function () {
    var postData = imagetranslateGetPostData(),
      file = this.files[0];
    var a = new FileReader()
    a.onload = function () {
      document.querySelector('#viewImg').src = this.result;
      postData.image = this.result.split(',')[1];
      imagetranslatePost(postData)
    }
    a.readAsDataURL(file);
  });
  $('.imgUrl').on('click', function (e) {
    var postData = imagetranslateGetPostData(),
      url = $('#url').val();
    postData.image = url;
    imagetranslatePost(postData)
    document.querySelector('#viewImg').src = url;
  });
  // 基本图片请求数据
  function imagetranslateGetPostData() {
    var scene = $('#scene').val(),
      lan = $('#lan').val().split('-')
    return {
      image: '',
      session_id: 'jswebtest',
      scene: scene,
      source: lan[0],
      target: lan[1]
    }
  }
  // 图片翻译请求
  function imagetranslatePost(postData) {
    $.post('/imagetranslate', JSON.stringify(postData), function (res) {
      var html = '';
      res.data.image_records.map(function (item) {
        html += '<div class="tsitem">\
            <div class="source">原文：' + item.source_text + '</div>\
            <div class="target">译文：' + item.target_text + '</div>\
          </div>'
      })
      $imagetranslateBox.html(html || '<div class="tsitem">\
      <div class="source">原文：没有找到文字区域</div>\
      <div class="target">译文：没有找到文字区域</div>\
    </div>');
    });
  }
  // 语音翻译
  var $start = $('.speech'),
    $stop = $('.stop'),
    formats = {
      3: 'amr',
      4: 'silk',
      6: 'pcm',
      8: 'mp3',
      9: 'aac'
    },
    $speechtranslateBox = $('.speechtranslateBox'),
    recordRTC;
  if (typeof navigator.mediaDevices === 'undefined' || !navigator.mediaDevices.getUserMedia) {
    alert('此浏览器不支持WebRTC getUserMedia API.');
    if (!!navigator.getUserMedia) {
      alert('这个浏览器似乎支持弃用的getUserMedia API.');
    }
  }

  function captureMicrophone(callback) {
    var mediaConstraints = {
      audio: true
    };
    navigator.mediaDevices.getUserMedia(mediaConstraints).then(callback).catch(function (error) {
      alert('无法捕捉您的麦克风。 请检查控制台日志。');
      console.error(error);
    });
  }
  $start.on('click', function (e) {
    captureMicrophone(function (stream) {
      var options = {
        type: 'audio',
        mimeType: 'audio/wav',
        recorderType: StereoAudioRecorder,
        disableLogs: true,
        desiredSampRate: 16000,
        numberOfAudioChannels: 1
      };
      recordRTC = RecordRTC(stream, options);
      recordRTC.setRecordingDuration(5 * 1000).onRecordingStopped(function (url) {
        speechPost(this.getBlob());
        recordRTC = null;
      });
      recordRTC.startRecording();
    })
  });
  $stop.on('click', function (e) {
    if (recordRTC) {
      recordRTC.stopRecording(function (e) {
        speechPost(this.getBlob());
        recordRTC = null;
      });
    } else {
      alert('请先录音！')
    }
  });

  function speechPost(blob) {
    var a = new FileReader(),
      lan = $('#speechlan').val().split('-'),
      postData = {
        source: lan[0],
        target: lan[1],
        session_id: 'jswebtest',
        speech_chunk: '',
        format: 8
      };
    a.onload = function (e) {
      var audioStr = e.target.result;
      postData.speech_chunk = audioStr.split(',')[1];
      $.post('/speechtranslate', JSON.stringify(postData), function (res) {
        var html = '<div class="tsitem">\
                  <div class="source">原文：' + res.data.source_text || res.retMsg + '</div>\
                  <div class="target">译文：' + res.data.target_text + '</div>\
                </div>';
        $speechtranslateBox.append(html);
        $speechtranslateBox[0].scrollTop = $speechtranslateBox[0].scrollHeight;
      });
    }
    a.readAsDataURL(new File([blob], 'test.mp3', {
      type: 'audio/mp3'
    }));
  }

});
