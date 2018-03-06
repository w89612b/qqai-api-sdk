window.AutioContext = window.AutioContext || window.WebKitAutioContext;
jQuery(function ($) {
  var $ttsForm = $('#ttsForm'),
    $ttaForm = $('#ttaForm');
  audio = new Audio();

  $ttsForm.on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var calssName = $(e.target).attr('class');
    switch (true) {
      case calssName.indexOf('speak') !== -1:
        var data = {};
        $(this).serializeArray().map(function (item) {
          data[item.name] = item.value.replace(/\s/g, '');
        });
        $.post('/tts', JSON.stringify(data), function (resdata) {
          if (!resdata.ret) {
            audio.src = resdata.url;
            audio.play()
          } else {
            console.log(resdata)
          }
        }, 'json');
        break;
      case calssName.indexOf('pause') !== -1:
        if (audio.currentTime === audio.duration) {
          audio.play()
        } else {
          audio.pause();
        }
        break;
      case calssName.indexOf('resume') !== -1:
        if (audio.currentTime === audio.duration) {
          audio.play()
        } else {
          audio.resume();
        }
        break;
      default:
        break;
    }
  });

  $ttaForm.on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var calssName = $(e.target).attr('class');
    switch (true) {
      case calssName.indexOf('speak') !== -1:
        var data = {};
        $(this).serializeArray().map(function (item) {
          data[item.name] = item.value.replace(/\s/g, '');
        });
        $.post('/tta', JSON.stringify(data), function (resdata) {
          if (!resdata.ret) {
            audio.src = resdata.url;
            audio.play()
          } else {
            console.log(resdata)
          }
        }, 'json');
        break;
      case calssName.indexOf('pause') !== -1:
        if (audio.currentTime === audio.duration) {
          audio.play()
        } else {
          audio.pause();
        }
        break;
      case calssName.indexOf('resume') !== -1:
        if (audio.currentTime === audio.duration) {
          audio.play()
        } else {
          audio.resume();
        }
        break;
      default:
        break;
    }
  })
})
