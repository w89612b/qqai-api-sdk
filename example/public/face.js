$(document).ready(function ($) {
  var $imgFile = $('#imgFile'),
    $imglist = $('.imglist'),
    $tips = $('.tips'),
    $viewImg = $('#viewImg'),
    $fileUrl = $('.fileUrl'),
    $inputUrl = $('#inputUrl'),
    $resBox = $('.resBox'),
    $imgbox = $('.img_box'),
    $resText = $('.resText'),
    $resTips = $('.resTips'),
    $rightinput = $('.rightinput'),
    $filebtn = $('.filebtn'),
    $targetviewImg = '',
    $idresTips = '',
    $rinputUrl = $('#rinputUrl'),
    data = {},
    getParam = {
      getData: function (index) {
        this.getExample(index)
        this.setTips(this.getTips(index))
        return {
          imgboxW: $imgbox.innerWidth(),
          imgboxH: $imgbox.innerHeight(),
          postData: this.getPostData(index)
        }
      },
      getPostData: function (index) {
        var data;
        switch (index) {
          case 3:
          case 4:
            data = {
              url: '/facetow',
              source_image: '',
              target_image: '',
              index: index
            }
            break;
          default:
            data = {
              url: '/face',
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
          case 4:
            tips = '提示：可上传不同年龄段的照片，图片大小不超过1M，请保证需要识别部分为图片主体部分';
            break;
          case 3:
            tips = '提示：图片大小不超过500K，请保证需要识别部分为图片主体部分';
            break
          default:
            tips = '提示：图片大小不超过1M，请保证需要识别部分为图片主体部分';
            break;
        }
        return tips;
      },
      getExample: function (index) {
        if (3 > index) {
          var uri = '/getFaceExample';
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
          $viewImg.attr('src', '')
          $resTips.html('')
          $resBox.css({
            'height': 436,
            'padding-top': 30
          })
          $rightinput.hide(100)
          $resBox.html('<label>RESPONSE JSON</label>')
        } else {
          $imglist.empty();
          $viewImg.attr('src', '')
          $resTips.html('')
          $resBox.css({
            'height': 352,
            'padding': 0
          })
          $rightinput.css({
            'display': 'flex',
            'margin-top': '25px'
          })
          $resBox.html('<label>目标文件</label><img id="targetviewImg" style="height: 100%;max-width: 100%;" src="" alt=""> <div id="idresTips" class="resTips"></div>');
          $targetviewImg = $('#targetviewImg');
          $idresTips = $('#idresTips');
        }
      },
      setTips: function (text) {
        $tips.text(text)
      },
      inpostData: function (postData) {
        if (data.postData.index < 3) {
          data.postData.image = postData.image
        }
        $.post(data.postData.url, JSON.stringify(data.postData), function (res) {
          var html = '';
          switch (data.postData.index) {
            case 0:
              $resBox.html('<label>RESPONSE JSON</label><code><pre>' + JSON.stringify(res, null, 2) + '</pre></code>')
              var face_data = res.data.face_list[0],
                img = new Image(),
                vw = $viewImg.innerWidth(),
                xh = $viewImg.innerHeight(),
                h_ratio = 0,
                w_ratio = 0,
                ys = (data.imgboxH - xh) / 2,
                xs = (data.imgboxW - vw) / 2;
              img.src = $viewImg.attr('src');
              h_ratio = xh / img.height;
              w_ratio = vw / img.width;
              $resTips.html('<div class="face_box" style="top: ' + Math.floor(face_data.y * w_ratio) + 'px; left: ' + Math.floor(xs + face_data.x * h_ratio) + 'px;height: ' + Math.floor(face_data.height * h_ratio) + 'px; width: ' + Math.floor(face_data.width * w_ratio) + 'px;">\
              <label class="label_sex" style="left: ' + Math.floor(face_data.width * w_ratio) + 'px">性别：' + (face_data.gender > 50 ? '男' : '女') + '</label>\
              <label class="label_age" style="left: ' + Math.floor(face_data.width * w_ratio) + 'px">年龄：' + face_data.age + '</label>\
              <label class="label_faceExpression" style="left: ' + Math.floor(face_data.width * w_ratio) + 'px">表情：' + (["黯然伤神", "半嗔半喜", "似笑非笑", "笑逐颜开", "莞尔一笑", "喜上眉梢", "眉开眼笑", "笑尽妖娆", "心花怒放", "一笑倾城"][face_data.expression < 10 ? 0 : Math.floor(face_data.expression / 10)]) + '</label>\
              <label class="label_beauty" style="left: ' + Math.floor(face_data.width * w_ratio) + 'px">魅力：' + face_data.beauty + '</label>\
              <label class="label_glass" style="left: ' + Math.floor(face_data.width * w_ratio) + 'px">眼镜：' + (face_data.glass ? '有' : '无') + '</label>\
            </div>')
              break;
            case 1:
              $resBox.html('<label>RESPONSE JSON</label><code><pre>' + JSON.stringify(res, null, 2) + '</pre></code>')
              var face_data = res.data.face_list,
                img = new Image(),
                vw = $viewImg.innerWidth(),
                xh = $viewImg.innerHeight(),
                h_ratio = 0,
                w_ratio = 0,
                ys = (data.imgboxH - xh) / 2,
                xs = (data.imgboxW - vw) / 2;
              img.src = $viewImg.attr('src');
              h_ratio = xh / img.height;
              w_ratio = vw / img.width;
              face_data.map(function (item) {
                html += '<div class="face_box" style="top: ' + Math.floor(item.y1 * w_ratio) + 'px; left: ' + Math.floor(xs + item.x1 * h_ratio) + 'px;height: ' + Math.floor((item.y2 - item.y1) * h_ratio) + 'px; width: ' + Math.floor((item.x2 - item.x1) * w_ratio) + 'px;"></div>'
              })
              $resTips.html(html)
              break;
            case 2:
              $resBox.html('<label>RESPONSE JSON</label><code><pre>' + JSON.stringify(res, null, 2) + '</pre></code>')
              var face_data = res.data.face_shape_list[0],
                img = new Image(),
                vw = $viewImg.innerWidth(),
                xh = $viewImg.innerHeight(),
                h_ratio = 0,
                w_ratio = 0,
                ys = (data.imgboxH - xh) / 2,
                xs = (data.imgboxW - vw) / 2;
              img.src = $viewImg.attr('src');
              h_ratio = xh / img.height;
              w_ratio = vw / img.width;
              face_data.face_profile.map(function (item) {
                html += '<i data-name="face_profile" style="top: ' + Math.floor(item.y * w_ratio) + '; left: ' + Math.floor(xs + item.x * h_ratio) + ';"></i>'
              })
              face_data.left_eye.map(function (item) {
                html += '<i data-name="left_eye" style="top: ' + Math.floor(item.y * w_ratio) + '; left: ' + Math.floor(xs + item.x * h_ratio) + ';"></i>'
              })
              face_data.left_eyebrow.map(function (item) {
                html += '<i data-name="left_eyebrow" style="top: ' + Math.floor(item.y * w_ratio) + '; left: ' + Math.floor(xs + item.x * h_ratio) + ';"></i>'
              })
              face_data.mouth.map(function (item) {
                html += '<i data-name="mouth" style="top: ' + Math.floor(item.y * w_ratio) + '; left: ' + Math.floor(xs + item.x * h_ratio) + ';"></i>'
              })
              face_data.nose.map(function (item) {
                html += '<i data-name="nose" style="top: ' + Math.floor(item.y * w_ratio) + '; left: ' + Math.floor(xs + item.x * h_ratio) + ';"></i>'
              })
              face_data.right_eye.map(function (item) {
                html += '<i data-name="right_eye" style="top: ' + Math.floor(item.y * w_ratio) + '; left: ' + Math.floor(xs + item.x * h_ratio) + ';"></i>'
              })
              face_data.right_eyebrow.map(function (item) {
                html += '<i data-name="right_eyebrow" style="top: ' + Math.floor(item.y * w_ratio) + '; left: ' + Math.floor(xs + item.x * h_ratio) + ';"></i>'
              })
              $resTips.html(html)
              break;
            case 3:
              if (!res.ret) {
                alert('相识度：' + res.data.similarity + '% ' + (res.data.fail_flag === 0 ? '' : res.data.fail_flag === 1 ? '失败图片第一张' : '失败图片第二张') + '}')
              } else {
                alert(res.retMsg)
              }
              break;
            case 4:
              if (!res.ret) {
                var source_face = res.data.source_face,
                  target_face = res.data.target_face,
                  img = new Image(),
                  rimg = new Image(),
                  vw = $viewImg.innerWidth(),
                  xh = $viewImg.innerHeight(),
                  rvw = $targetviewImg.innerWidth(),
                  rxh = $targetviewImg.innerHeight(),
                  h_ratio = 0,
                  w_ratio = 0,
                  rh_ratio = 0,
                  rw_ratio = 0,
                  ys = (data.imgboxH - xh) / 2,
                  xs = (data.imgboxW - vw) / 2,
                  rys = (data.imgboxH - rxh) / 2,
                  rxs = (data.imgboxW - rvw) / 2;
                img.src = $viewImg.attr('src');
                rimg.src = $targetviewImg.attr('src');
                h_ratio = xh / img.height;
                w_ratio = vw / img.width;
                rh_ratio = rxh / rimg.height;
                rw_ratio = rvw / rimg.width;
                $resTips.html('<div class="face_box" style="top: ' + Math.floor(source_face.y1 * w_ratio) + '; left: ' + Math.floor(xs + source_face.x1 * h_ratio) + ';height: ' + Math.floor((source_face.y2 - source_face.y1) * h_ratio) + '; width: ' + Math.floor((source_face.x2 - source_face.x1) * w_ratio) + ';"></div>')
                $idresTips.html('<div class="face_box" style="top: ' + Math.floor(target_face.y1 * rw_ratio) + '; left: ' + Math.floor(rxs + target_face.x1 * rh_ratio) + ';height: ' + Math.floor((target_face.y2 - target_face.y1) * rh_ratio) + '; width: ' + Math.floor((target_face.x2 - target_face.x1) * rw_ratio) + ';"></div>')
                res.data.fail_flag === 0 ? '' : res.data.fail_flag === 1 ? alert('失败图片第一张') : alert('失败图片第二张')
              } else {
                alert(res.retMsg)
              }
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
    $resTips.html('')
  });

  $filebtn.on('click', function (e) {
    $imgFile.click();
  })
  $imgFile.on('change', function (e) {
    var fsr = new FileReader()
    fsr.onload = function (e) {
      var imgUrl = e.target.result;
      $viewImg.attr('src', imgUrl);
      if (data.postData.index < 3) {
        getParam.inpostData({
          image: imgUrl.split(',')[1]
        });
      } else {
        if (data.postData.target_image !== '') {
          data.postData.source_image = imgUrl.split(',')[1];
          getParam.inpostData()
        } else {
          data.postData.source_image = imgUrl.split(',')[1];
          alert('请选择目标文件')
        }
      }
    }
    fsr.readAsDataURL(e.target.files[0]);
  })
  $fileUrl.on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var imgUrl = $inputUrl.val();
    $viewImg.attr('src', imgUrl);
    if (data.postData.index < 3) {
      getParam.inpostData({
        image: imgUrl
      });
    } else {
      if (data.postData.target_image !== '') {
        data.postData.source_image = imgUrl;
        getParam.inpostData()
      } else {
        data.postData.source_image = imgUrl
        alert('请选择目标文件')
      }
    }
    return false;
  });
  $('.rfilebtn').on('click', function (e) {
    $('#rimgFile').click();
  });
  $('#rimgFile').on('change', function (e) {
    var fsr = new FileReader()
    fsr.onload = function (e) {
      var imgUrl = e.target.result;
      $targetviewImg.attr('src', imgUrl);
      if (data.postData.index < 3) {
        getParam.inpostData({
          image: imgUrl.split(',')[1]
        });
      } else {
        if (data.postData.source_image !== '') {
          data.postData.target_image = imgUrl.split(',')[1];
          getParam.inpostData()
        } else {
          data.postData.target_image = imgUrl.split(',')[1];
          alert('请选择源文件')
        }
      }
    }
    fsr.readAsDataURL(e.target.files[0]);
  })
  $('.rfileUrl').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var imgUrl = $rinputUrl.val();
    $targetviewImg.attr('src', imgUrl);
    if (data.postData.index < 3) {
      getParam.inpostData({
        image: imgUrl
      });
    } else {
      if (data.postData.source_image !== '') {
        data.postData.target_image = imgUrl;
        getParam.inpostData()
      } else {
        data.postData.target_image = imgUrl;
        alert('请选择源文件')
      }
    }
    return false;
  })
})
