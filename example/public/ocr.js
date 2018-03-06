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
        return {
          url: '/ocr',
          postData: this.getPostData(index)
        }
      },
      getPostData: function (index) {
        return {
          image: '',
          index: index
        };
      },
      getTips: function (index) {
        return '提示：图片大小不超过1M，请保证需要识别部分为图片主体部分';
      },
      getExample: function (index) {
        var uri = '/getOCRExample';
        $.post(uri, JSON.stringify({
          index: index
        }), function (data) {
          var html = '';
          $imglist.empty();
          data.imglist.map(function (item) {
            html += '<div class="imglist-item"><img class="rounded" src="' + item.imgStr + '"></div>';
          });
          $imglist.append(html);
          $imglist.find('.imglist-item:first').addClass('active').click();
        });
      },
      setTips: function (text) {
        $tips.text(text)
      },
      inpostData: function (postData) {
        data.postData.image = postData.image
        $.post(data.url, JSON.stringify(data.postData), function (res) {
          var html = '';
          switch (data.postData.index) {
            case 0:
              res.ret !== 0 ? (html = '<div class="alert alert-warning" role="alert">' + res.retMsg + '</div>') : (html = '<div class="alert alert-success" role="alert">\
            <ul class="list-group">\
              <li class="list-group-item">姓名：' + res.data.name + '</li>\
              <li class="list-group-item">性别：' + res.data.sex + '</li>\
              <li class="list-group-item">民族：' + res.data.nation + '</li>\
              <li class="list-group-item">生日：' + res.data.birth + '</li>\
              <li class="list-group-item">地址：' + res.data.address + '</li>\
              <li class="list-group-item">身份号码：' + res.data.id + '</li>\
            </ul>\
            </div>');
              break;
            default:
              if (res.ret !== 0) {
                html = '<div class="alert alert-warning" role="alert">' + res.retMsg + '</div>'
              } else {
                res.data.item_list.map(function (item) {
                  html += '<li class="list-group-item">' + (item.item ? item.item : '文') + '：' + item.itemstring + '</li>'
                })
                html = '<div class="alert alert-success" role="alert"><ul class="list-group">' + html + '</ul></div>'
              }
              break;
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
      imgUrl = location.origin + $this.find('img').attr('src');
    $this.addClass('active').siblings().removeClass('active');
    $viewImg.attr('src', imgUrl);
    getParam.inpostData({
      image: imgUrl
    });
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
