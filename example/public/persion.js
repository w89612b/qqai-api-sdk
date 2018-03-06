$(document).ready(function ($) {

  /** 保证摄像头和相册能够调起 */
  var $file = $("#file"),
    browser = {  
      versions: function () {    
        var u = navigator.userAgent,
                app = navigator.appVersion;    
        return {      
          trident: u.indexOf('Trident') > -1, //IE内核
                presto: u.indexOf('Presto') > -1, //opera内核
                webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
                gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
                mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
                ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
                android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
                iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
                iPad: u.indexOf('iPad') > -1, //是否iPad
                webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
                weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
                qq: u.match(/\sQQ/i) == " qq" //是否QQ
              
        };  
      }(),
        language: (navigator.browserLanguage || navigator.language).toLowerCase()
    },
    imgLength = 0,
    edit_face_Pid = '',
    dataList = {},
    Persion = {
      init: function () {
        $.post('/getgroupids', {}, function (res) {
          var html = '<option value="">请选择</option>'
          res.data.group_ids.map(function (item) {
            html += '<option value="' + item + '">' + item + '</option>'
          })
          $('#depGroups').html(html)
          $('#recipient-groups').html(html)
        })
      },
      getpersonids: function (group_id) {
        $.post('/getpersonids', JSON.stringify({
          group_id: group_id
        }), function (res) {
          var html = ''
          res.data.person_ids.map(function (item) {
            dataList[item] = '';
            html += '<tr data-id="' + item + '"><th scope="row">' + item +
              '</th><td></td><td></td><td><button class="btn btn-outline-info btn-sm" type="button">信息</button> <button class="btn btn-outline-primary btn-sm" type="button">设置</button> <button class="btn btn-outline-danger btn-sm" type="button">删除</button> <button class="btn btn-outline-dark btn-sm" type="button">编辑人脸</button></td></tr>';
          })
          $('.ptable tbody').html(html)
        })
      },
      getinfo: function (person_id, $tr) {
        $.post('/getinfo', JSON.stringify({
          person_id: person_id
        }), function (res) {
          dataList[res.data.person_id] = res.data;
          if ($tr) {
            var $tdlist = $tr.find('td');
            $tdlist[0].innerText = res.data.person_name;
            $tdlist[1].innerText = res.data.tag;
          }
        })
      },
      delperson: function (person_id, $tr) {
        $.post('/delperson', JSON.stringify({
          person_id: person_id
        }), function (res) {
          if (!res.ret) {
            $tr.remove();
            delete dataList[person_id]
          }
        })
      },
      addface: function (image) {
        $.post('/addface', JSON.stringify({
          person_id: edit_face_Pid,
          images: image,
          tag: '统一的'
        }), function (res) {
          if (!res.ret) {
            PersionSet.set_face(res.data.face_ids[0])
          } else {
            alert(res.retMsg || res.msg)
          }
        })
      },
      delface: function (fid) {
        $.post('/delface', JSON.stringify({
          person_id: edit_face_Pid,
          face_ids: fid
        }), function (res) {
          if (!res.ret) {
            alert('删除成功！')
          } else {
            alert(res.retMsg || res.msg)
          }
        })
      },
      setinfo: function (postData) {
        $.post('/setinfo', JSON.stringify(postData), function (res) {
          if (!res.ret) {
            alert('设置成功！')
            $('#edit_persion_model').modal('hide');
          } else {
            alert(res.retMsg || res.msg)
          }
        })
      }
    },
    PersionSet = {
      edit_set: function (data) {
        var $form = $('#edit_persion');
        $form.find('[name="person_id"]').val(data.person_id)
        $form.find('[name="person_name"]').val(data.person_name)
        $form.find('[name="tag"]').val(data.tag)
      },
      edit_set_face: function (data) {
        data.face_ids.map(function (item) {
          PersionSet.set_face(item);
        })
        imgLength = data.face_ids.length;
        edit_face_Pid = data.person_id;
      },
      set_face: function (face_id) {
        $('.addbtn').before('<li><span data-faceId="' + face_id + '" class="del"></span><img src="/image/face/' + face_id + '.jpg"></li>');
      },
      add_face: function (image) {
        imgLength++;
        if (imgLength === 20) {
          $('.addbtn').hide();
        }
        Persion.addface(image)
      },
      random_string: function (len) {　　
        len = len || 32;　　
        var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';　　
        var maxPos = chars.length;　　
        var pwd = '';　　
        for (i = 0; i < len; i++) {　　
          pwd += chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
      }
    },
    filezip = function (opt) {
      try {
        // var fr = new FileReader();
        //fr.onload = function () {
        var image = new Image();
        image.onload = function () {
          var square = opt.square,
            canvas = document.createElement('canvas'),
            context = canvas.getContext('2d'),
            imageWidth = 0,
            imageHeight = 0,
            offsetX = 0,
            offsetY = 0,
            data = '',
            quality = opt.quality;

          canvas.width = square;
          canvas.height = square;
          context.clearRect(0, 0, square, square);

          if (this.width > this.height) {
            imageWidth = Math.round(square * this.width / this.height);
            imageHeight = square;
            offsetX = -Math.round((imageWidth - square) / 2);
          } else {
            imageHeight = Math.round(square * this.height / this.width);
            imageWidth = square;
            offsetY = -Math.round((imageHeight - square) / 2);
          }
          context.drawImage(this, offsetX, offsetY, imageWidth, imageHeight);
          data = canvas.toDataURL(file.type, quality);
          opt.success(data)
        }
        image.src = window.URL.createObjectURL(opt.file)
        //image.src = this.result;
        //};
        //fr.readAsDataURL(opt.file);
      } catch (e) {
        alert("压缩失败!" + e.message)
      }
    };

  Persion.init();
  $('#depGroups').on('input', function (e) {
    var val = $(this).val();
    if (val !== '') {
      Persion.getpersonids(val);
    }
  })
  $('.ptable tbody').on('click', function (e) {
    var $target = $(e.target),
      isbtn = $target.is('.btn'),
      $tr = '',
      trId = '',
      className = '';
    if (isbtn) {
      $tr = $target.parents('tr');
      trId = $tr.data('id');
      className = $target[0].className;
      switch (true) {
        case className.indexOf('info') > -1:
          Persion.getinfo(trId, $tr);
          break;
        case className.indexOf('primary') > -1:
          if ($tr.find('td')[0].innerText === '') {
            alert('请先获取用户信息')
          } else {
            PersionSet.edit_set(dataList[trId])
            $('#edit_persion_model').modal('show');
          }
          break;
        case className.indexOf('danger') > -1:
          Persion.delperson(trId, $tr);
          break;
        case className.indexOf('dark') > -1:
          if ($tr.find('td')[0].innerText === '') {
            alert('请先获取用户信息')
          } else {
            PersionSet.edit_set_face(dataList[trId])
            $('#edit_persion_face_model').modal('show');
          }
          break;
      }
    }
  })

  $('.file_btn').on('click', function () {
    $(this).siblings('input[type="file"]').click();
  })
  $('.file_btn').siblings('input[type="file"]').on('change', function () {
    var $this = $(this),
      fr = typeof (FileReader) !== 'undefined' && new FileReader(),
      $val = $this.next(),
      $img = $this.prev().find('.face_image'),
      file = this.files[0];
    if (!fr) {
      alert("当前浏览器内核不支持base64")
    } else if (file.size < 1048576) {
      fr.onload = function () {
        $val.val(this.result.split(',')[1]);
        $img.attr('src', this.result)
      }
      fr.readAsDataURL(file)
    } else {
      filezip({
        square: 1024,
        quality: .5,
        file: file,
        success: function (data) {
          $val.val(data.split(',')[1]);
          $img.attr('src', data)
        }
      })
    }
  })
  $('.addPersion').on('click', function () {
    var postData = {};
    $('#persion').serializeArray().map(function (item, index) {
      postData[item.name] = item.value;
    });
    delete postData.face_image;
    postData.person_id = PersionSet.random_string(10);
    $.post('/newperson', JSON.stringify(postData), function (res) {
      if (!res.ret) {
        $('.ptable tbody').append('<tr data-id="' + res.data.person_id + '"><th scope="row">' + res.data.person_id +
          '</th><td></td><td></td><td><button class="btn btn-outline-info btn-sm" type="button">信息</button> <button class="btn btn-outline-primary btn-sm" type="button">设置</button> <button class="btn btn-outline-danger btn-sm" type="button">删除</button> <button class="btn btn-outline-dark btn-sm" type="button">编辑人脸</button></td></tr>'
        );
        $('#exampleModal').modal('hide');
      } else {
        alert(res.retMsg || res.msg)
      }
    })
  });
  $('.setPersion').on('click', function () {
    var postData = {};
    $('#edit_persion').serializeArray().map(function (item, index) {
      postData[item.name] = item.value;
    });
    Persion.setinfo(postData)
  })
  $('#exampleModal').on('hide.bs.modal', function () {
    $('#persion')[0].reset();
    $('.face_image').attr('src', '');
  })

  $('#edit_persion_model').on('hide.bs.modal', function () {
    var $form = $('#edit_persion');
    $form[0].reset();
    $form.find('[name="person_id"]').val('')
  })
  $('#edit_persion_face_model').on('hide.bs.modal', function () {
    $('.addbtn').siblings().remove();
    Persion.getinfo(edit_face_Pid)
    imgLength = 0;
    edit_face_Pid = '';
  });
  if (browser.versions.android || browser.versions.weixin) {
    $file.attr("capture", "camera");
  } else {
    $file.removeAttr("capture");
  }
  // 文件类型
  $file.attr("accept", "image/png,image/jpeg,image/bmp");
  // 是否多选 true 为多选   false 不允许多选
  $file.prop("multiple", false);
  // 注册事件
  $file.on('change', function (e) {
    var $this = $(this),
      fr = typeof (FileReader) !== 'undefined' && new FileReader(),
      file = this.files[0];
    if (!fr) {
      alert("当前浏览器内核不支持base64")
    } else if (file.size < 1048576) {
      fr.onload = function () {
        PersionSet.add_face(this.result.split(',')[1])
      }
      fr.readAsDataURL(file)
    } else {
      filezip({
        square: 1024,
        quality: .5,
        file: file,
        success: function (data) {
          var base64Str = data.split(',')[1];
          l = base64Str.replace(/=/g, '').length;
          if (parseInt(l - (l / 8) * 2) < 1048576) {
            PersionSet.add_face(data.split(',')[1])
          } else {
            alert('图片太大，请保证图片小于1M')
          }
        }
      })
    }
  })

  $('.viewImg').on('click', function (e) {
    var $target = $(e.target),
      className = e.target.className,
      $li = '',
      index = '';
    switch (className) {
      case 'del':
        $li = $target.parent();
        imgLength--;
        Persion.delface($target.data('faceid'))
        $li.remove();
        $('.addbtn').show();
        break;
      case 'addbtn':
        $file.click()
        break;
      default:
        break;
    }
  })
  $('.viewImg').PicView()
  var elPicView = $('.viewImg').data('PicView');
  elPicView.setDataIsChange(true)
});
