$(document).ready(function ($) {
  var $imgFile = $('#imgFile'),
    $imglist = $('.imglist'),
    $tips = $('.tips'),
    $viewImg = $('#viewImg'),
    $fileUrl = $('.fileUrl'),
    $inputUrl = $('#inputUrl'),
    $resBox = $('.resBox'),
    $resText = $('.resText')
  $filebtn = $('.filebtn'),
    data = {},
    getParam = {
      getData: function (index) {
        this.getExample(index)
        this.setTips(this.getTips(index))
        return {
          url: '/visionimgidy',
          postData: this.getPostData(index)
        }
      },
      getPostData: function (index) {
        var data;
        switch (index) {
          case 2:
            data = {
              image: '',
              topk: 5,
              index: index
            }
            break;
          case 3:
            data = {
              image: '',
              topk: 5,
              index: index
            }
            break;
          case 5:
            data = {
              image: '',
              scene: 2,
              index: index
            }
            break;
          case 6:
            data = {
              image: '',
              scene: 1,
              index: index
            }
            break;
          case 7:
            data = {
              image: '',
              sessionId: 'jswebtest',
              index: index
            }
            break;
          default:
            data = {
              image: '',
              index: index
            }
            break;
        }
        return data;
      },
      getTips: function (index) {
        var tips = '';
        switch (index) {
          case 2:
            tips = '提示：仅支持JPG、JPEG图片文件，图片大小不超过1M，请保证需要识别部分为图片主体部分';
            break;
          case 5:
          case 6:
            tips = '提示：仅支持JPG、JPEG图片文件，图片大小不超过1M，请保证需要识别部分为图片主体部分';
            break
          default:
            tips = '提示：图片大小不超过1M，请保证需要识别部分为图片主体部分';
            break;
        }
        return tips;
      },
      getExample: function (index) {
        var uri = '/getExample';
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
              $resBox.html('<label>RESPONSE JSON</label><code><pre>' + JSON.stringify(res, null, 2) + '</pre></code>')
              var tag_list = res.data.tag_list,
                l = tag_list.length,
                hot = tag_list[1].tag_confidence,
                normal = tag_list[0].tag_confidence,
                noraml_hot_porn = tag_list[l - 1].tag_confidence;
              $resText.text('色情图片: ' + (noraml_hot_porn > 86 ? '是' : '否') + ', 性感图片: ' + (hot > normal ? '是' : '否') + ' 性感值: ' + hot);
              $resText.show();
              break;
            case 1:
              $resBox.html('<label>RESPONSE JSON</label><code><pre>' + (JSON.stringify(res, null, 2)) + '</pre></code>')
              $resText.text('性质: ' + res.data.tag_list[0].tag_name + ', 可信度: ' + res.data.tag_list[0].tag_confidence + '%');
              $resText.show();
              break;
            case 2:
              res.data.scene_list.map(function (item) {
                var val = (Number(item.label_confd) * 100).toFixed(0);
                html += '<div class="item">\
                  <div class="clearfix">\
                    <i class="float-left">' + item.label_id + '</i>\
                    <i class="float-right">' + val + '%</i>\
                  </div>\
                  <div class="progress">\
                    <div class="progress-bar" role="progressbar" style="width: ' + val + '%" aria-valuenow="' + val + '" aria-valuemin="0" aria-valuemax="100"></div>\
                  </div>\
                </div>'
              });
              $resBox.html('<label>识别结果</label>' + html)
              $resText.hide();
              break;
            case 3:
              res.data.object_list.map(function (item) {
                var val = (Number(item.label_confd) * 100).toFixed(0);
                html += '<div class="item">\
                  <div class="clearfix">\
                    <i class="float-left">' + item.label_id + '</i>\
                    <i class="float-right">' + val + '%</i>\
                  </div>\
                  <div class="progress">\
                    <div class="progress-bar" role="progressbar" style="width: ' + val + '%" aria-valuenow="' + val + '" aria-valuemin="0" aria-valuemax="100"></div>\
                  </div>\
                </div>'
              });
              $resBox.html('<label>识别结果</label>' + html)
              $resText.hide();
              break;
            case 4:
              res.data.tag_list.map(function (item) {
                var val = item.tag_confidence;
                html += '<div class="item">\
                  <div class="clearfix">\
                    <i class="float-left">' + item.tag_name + '</i>\
                    <i class="float-right">' + val + '%</i>\
                  </div>\
                  <div class="progress">\
                    <div class="progress-bar" role="progressbar" style="width: ' + val + '%" aria-valuenow="' + val + '" aria-valuemin="0" aria-valuemax="100"></div>\
                  </div>\
                </div>'
              });
              $resBox.html('<label>识别结果</label>' + html)
              $resText.hide();
              break;
            case 5:
            case 6:
              res.ret !== 0 ? (html = `<div class="alert alert-warning" role="alert">${res.retMsg}</div>`) : res.data.tag_list.map(function (item) {
                var val = (Number(item.label_confd) * 100).toFixed(0);
                html += '<div class="item">\
                  <div class="clearfix">\
                    <i class="float-left">' + item.label_id + '-' + item.label_name + '</i>\
                    <i class="float-right">' + val + '%</i>\
                  </div>\
                  <div class="progress">\
                    <div class="progress-bar" role="progressbar" style="width: ' + val + '%" aria-valuenow="' + val + '" aria-valuemin="0" aria-valuemax="100"></div>\
                  </div>\
                </div>'
              });
              $resBox.html('<label>识别结果</label>' + (html || res))
              $resText.hide();
              break;
            case 7:
              res.ret !== 0 ? (html = '<div class="alert alert-warning" role="alert">' + res.retMsg + '</div>') : (html = '<div class="alert alert-success" role="alert">' + res.data.text + '</div>')
              $resBox.html('<label>识别结果</label>' + (html || ('<div class="alert alert-warning" role="alert">' + JSON.stringify(res, null, 2) + '</div>')))
              $resText.hide();
              break;
            case 8:
              $resBox.html('<label>RESPONSE JSON</label><code><pre>' + JSON.stringify(res, null, 2) + '</pre></code>')
              $resText.text('模糊: ' + (res.data.fuzzy ? '是' : '否') + ', 可信度: ' + (Number(res.data.confidence) * 100).toFixed(0) + '%');
              $resText.show();
              break;
            case 9:
              $resBox.html('<label>RESPONSE JSON</label><code><pre>' + JSON.stringify(res, null, 2) + '</pre></code>')
              $resText.text('美食: ' + (res.data.food ? '是' : '否') + ', 可信度: ' + (Number(res.data.confidence) * 100).toFixed(0) + '%');
              $resText.show();
              break;
          }

        });
      }
    };
  data = getParam.getData(0);
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
