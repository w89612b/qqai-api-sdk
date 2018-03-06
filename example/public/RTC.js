jQuery(function ($) {
  var $audio = $('audio'),
    $start = $('#start'),
    $stop = $('#stop'),
    $play = $('#play'),
    $record = $('#record'),
    $discern = $('#discern'),
    format = ['', 'pcm',
      'wav',
      'amr',
      'silk'
    ],
    audioBase64 = '',
    isEdge = navigator.userAgent.indexOf('Edge') !== -1 && (!!navigator.msSaveOrOpenBlob || !!navigator.msSaveBlob),
    recordRTC;

  function getFileName(fileExtension) {
    var d = new Date();
    var year = d.getUTCFullYear();
    var month = d.getUTCMonth();
    var date = d.getUTCDate();
    return 'RecordRTC-' + year + month + date + '-' + getRandomString() + '.' + fileExtension;
  }

  function getRandomString() {
    if (window.crypto && window.crypto.getRandomValues && navigator.userAgent.indexOf('Safari') === -1) {
      var a = window.crypto.getRandomValues(new Uint32Array(3)),
        token = '';
      for (var i = 0, l = a.length; i < l; i++) {
        token += a[i].toString(36);
      }
      return token;
    } else {
      return (Math.random() * new Date().getTime()).toString(36).replace(/\./g, '');
    }
  }
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
        mimeType: `audio/${format[Number($('#format').val())]}`,
        recorderType: StereoAudioRecorder,
        disableLogs: true,
        desiredSampRate: $('#rate').val(),
        numberOfAudioChannels: 1
      };
      recordRTC = RecordRTC(stream, options);
      recordRTC.setRecordingDuration(30 * 1000).onRecordingStopped(function (url) {
        console.debug('setRecordingDuration', url);
      });
      recordRTC.startRecording();
    })
  });
  $stop.on('click', function (e) {
    if (recordRTC) {
      recordRTC.stopRecording();
    } else {
      alert('请先录音！')
    }
  });
  $play.on('click', function (e) {
    if (recordRTC) {
      recordRTC.getDataURL(function (dataURL) {
        $audio.attr('src', dataURL);
      });
    } else {
      alert('请先录音！')
    }
  });
  $record.on('click', function (e) {
    if (recordRTC) {
      var recordedBlob = recordRTC.getBlob();
      var a = new FileReader()
      a.onload = function (e) {
        var audioStr = e.target.result;
        console.log(audioStr)
        audioBase64 = audioStr.substr(audioStr.indexOf(',') + 1);
        console.log(audioBase64)
      }
      a.readAsDataURL(recordedBlob);
      debugger;
    } else {
      alert('请先录音！')
    }
  });
  $discern.on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (recordRTC) {
      var formData = {
        rate: $('#rate').val(),
        format: $('#format').val(),
        speech: audioBase64
      };
      $.post('/asr', JSON.stringify(formData), function (resdata) {
        if (!resdata.ret) {
          $('#discernC').val(`format: ${resdata.data.format} \nrate: ${resdata.data.rate} \ntext: ${resdata.data.text}`)
        } else {
          $('#discernC').val(`code: ${resdata.ret}\n msg: ${resdata.msg}`)
        }
      }, 'json');
    } else {
      alert('请先录音！')
    }
  });
});
