$(document).ready(function ($) {
  var $imgFile = $('#imgFile'),
    $imglist = $('.imglist'),
    $tips = $('.tips'),
    $viewImg = $('#viewImg'),
    $fileUrl = $('.fileUrl'),
    $inputUrl = $('#inputUrl'),
    $resBox = $('.resBox'),
    $resText = $('.resText'),
    $filebtn = $('.filebtn'),
    data = {},
    getParam = {
      getData: function (index) {
        this.getExample(index)
        this.setTips(this.getTips(index))
        if (index !== 6) {
          $viewImg.attr('src', index === 0 ? '/image/Effects.jpg' : index === 1 ? '/image/imgfilter.jpg' : index === 2 ? '/image/facecosmetic.jpg' : index === 3 ? '/image/facedecoration.jpg' : index === 4 ? '/image/facemerge.jpg' : index === 5 ? '/image/facesticker.jpg' : '');
        }
        return {
          url: '/fcgi',
          postData: this.getPostData(index)
        }
      },
      getPostData: function (index) {
        return {
          image: '',
          index: index,
          code: 1
        };
      },
      getTips: function (index) {
        return '提示：图片尺寸不超过1080*1080，图片大小不超过1M，请保证需要识别部分为图片主体部分';
      },
      getExample: function (index) {
        var uri = '/getFcgiExample';
        $.post(uri, JSON.stringify({
          index: index
        }), function (res) {
          var html = '';
          $imglist.empty();
          if (data.postData.index === 6) {
            res.imglist.map(function (item) {
              html += '<div class="imglist-item">\
              <img class="rounded" src="' + item.imgStr + '">\
            </div>';
            });
          } else {
            for (var key in res) {
              html += '<div class="imglist-item"><img class="rounded" src="' + res[key].effectImg + '">' + (res[key].name ? ('<label class="imglist-item-name">' + res[key].name + '</label>') : '') + '</div>';
            }
          }
          $imglist.html(html);
          $imglist.find('.imglist-item:first').addClass('active').click();
        });
      },
      setTips: function (text) {
        $tips.text(text)
      },
      inpostData: function (postData) {
        data.postData.image = postData.image;
        $.post(data.url, JSON.stringify(data.postData), function (res) {
          var html = '';
          if (res.ret !== 0) {
            html = '<div class="alert alert-warning" role="alert">' + res.retMsg + '</div>'
          } else {
            html = '<img id="ResImg" src="data:image/jpeg;base64,' + res.data.image + '" alt="">'
          }
          $resBox.html('<label>识别结果</label>' + html)
        });
      }
    };
  data = getParam.getData(0);
  $resText.hide();
  $('.collapse-btn .btn').on('click', function (e) {
    var index = $(this).index();
    $(this).addClass('btn-primary').siblings().removeClass('btn-primary');
    data = getParam.getData(index);
  });
  $imglist.on('click', '.imglist-item', function (e) {
    var $this = $(this),
      imgUrl = $this.find('img').attr('src'),
      index = $this.index();
    $this.addClass('active').siblings().removeClass('active');
    data.postData.code = 1 + index;
    if (data.postData.index === 6) {
      $viewImg.attr('src', imgUrl);
      getParam.inpostData({
        image: location.origin + imgUrl
      });
    } else {
      getParam.inpostData({
        image: location.origin + $viewImg.attr('src')
      });
    }
  });

  $filebtn.on('click', function (e) {
    $imgFile.click();
  })
  $imgFile.on('change', function (e) {
    var fsr = new FileReader()
    fsr.onload = function (e) {
      var imgUrl = e.target.result;
      $viewImg.attr('src', imgUrl);
      getParam.inpostData({
        image: imgUrl.split(',')[1]
      });
    }
    fsr.readAsDataURL(e.target.files[0]);
  })
  $fileUrl.on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var imgUrl = $inputUrl.val();
    $viewImg.attr('src', imgUrl);
    getParam.inpostData({
      image: imgUrl
    });
    return false;
  });
})
