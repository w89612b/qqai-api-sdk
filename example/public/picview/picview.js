(function ($) {
  'use strict';
  // 全局变量声明
  var name = 'PicView'; // modal name
  var globalId = 0; // 实例初始ID
  var viewMode_html = '<div id="{0}" class="PicViewBox" style="height:{2}px">\
  <div class="imgBox">\
      <figure class="figure">\
        <img class="imgView" src="{1}" style="max-height: {2}px;">\
      </figure>\
  </div>\
  <!--<div class="loader--audioWave"></div>-->\
  <button title="关闭" class="imgViewbtn close" type="button"></button>\
  <button title="上一张" class="imgViewbtn prev" type="button"></button>\
  <button title="下一张" class="imgViewbtn next" type="button"></button>\
</div>'; // 模板

  // The PicView modal class
  var PicView = function (element) {
    // 当前实例的名称
    this._name = name + globalId;
    // 当前实例的ID
    this._id = globalId;
    // 当前实例的DOM对象
    this._$ = $(element);
    // 当前实例的图片数量
    this._imgMaxLength = 0;
    // 当前实例的图片数据 Array
    this._imgData = null;
    // 当前实例打开图片预览的位置
    this._viewIndex = 0;
    // 当前实例图片预览的DOM对象
    this._$viewBox = null;
    // 当前实例图片预览的DOM对象是否显示
    this._viewBoxIsDisplay = false;
    // 当前实例的图片容器DOM
    this._$img = null;
    // 当前实例的图片是否会变化
    this._dataIsChange = false;
    // 当前实例的排除显示图片路径; 用于处理以图片触发上传的情况
    this._defaultImgSrc = '';
    // 公用初始化
    this.init();
  };

  // 添加原型方法
  PicView.prototype = {
    // 上一张控制器
    prev: function () {
      this._viewIndex > 0 ? this._viewIndex-- : (this._viewIndex = this._imgMaxLength);
      this.view();
      return this;
    },
    // 下一张控制器
    next: function () {
      this._viewIndex < this._imgMaxLength ? this._viewIndex++ : (this._viewIndex = 0);
      this.view();
      return this;
    },
    // 显示
    view: function (path) {
      this._$img.attr('src', path ? path : this._imgData[this._viewIndex]);
      return this;
    },
    // 格式化
    format: function () {
      if (arguments.length == 0){
        return null;
      }
      var str = arguments[0],
        params = arguments[1],
        al = params.length - 1;
      do {
        var re = new RegExp('\\{' + al + '\\}', 'gm');
        str = str.replace(re, params[al]);
        al--;
      } while (al > -1);
      return str;
    },
    // 初始化
    init: function () {
      var _this = this,
        view_HTML;
      // 初始化图片数据
      this.setData()
      // 初始化HTML标签
      view_HTML = this.format(viewMode_html, ['PicViewBox' + globalId, '/', window.innerHeight]);
      this._$viewBox = $(view_HTML);
      this._$img = this._$viewBox.find('img');
      $('body').append(this._$viewBox);
      // 图片点击事件
      this._$.on('click', 'img', function (e) {
        e.preventDefault();
        e.stopPropagation();
        // 获取当前图片的资源路径
        var imgPath = $(this).attr('src');
        if (imgPath !== _this.getDefaultImg()) {
          $('body').addClass('body_overflow');
          // 如果图片数据是变化的，重新设置展示图片数据
          _this.getDataIsChange() ? _this.setData() : '';
          // 设置当前展示图片的下标
          _this.setViewIndex($.inArray(imgPath, _this.getData()));
          // 展示图片
          _this.view(imgPath);
          // 如果图片展示DOM是隐藏的， 显示图片展示DOM
          if (!_this._viewBoxIsDisplay) {
            _this._$viewBox.css({
              'display': 'table',
              'top': window.scrollY
            }) //show(300);
            _this._viewBoxIsDisplay = true;
          }
        }
      })
      // 事件代理
      this._$viewBox.on('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var className = e.target.className;
        switch (className) {
          // 上一图
          case 'imgViewbtn prev':
            _this.prev();
            break;
            // 下一图
          case 'imgViewbtn next':
            _this.next();
            break;
          case 'imgView':
            // 图片是下一图 
            _this.next();
            break;
            // 窗口点击
          default:
            $(this).hide(300);
            $('body').removeClass('body_overflow');
            _this._viewBoxIsDisplay = false;
            break;
        }
      });
      // 移动端支持
      var startPosition = {},
        deltaY, deltaX, endPosition = {};
      this._$viewBox.on('touchstart touchend', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'touchstart') {
          // 如果是开始事件 记录当前点的位置
          startPosition = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
          }
        } else {
          // 否者记录结束位置的点
          endPosition = {
            x: e.changedTouches[0].pageX,
            y: e.changedTouches[0].pageY
          };
          var className = e.target.className;
          // 如果是图片
          if (className === 'imgView') {
            // 计算移动距离
            deltaY = endPosition.y - startPosition.y;
            deltaX = endPosition.x - startPosition.x;
            // 根据距离判断如何移动图片
            if (deltaX < 0) {
              _this.next();
            } else if (deltaX > 0) {
              _this.prev();
            } else {
              _this.next();
            }
          } else if (className === 'imgViewbtn prev') {
            _this.prev();
          } else if (className === 'imgViewbtn next') {
            _this.next();
          } else {
            $(this).hide(300);
            $('body').removeClass('body_overflow');
            _this._viewBoxIsDisplay = false;
          }
        }
      });
    },
    // 设置图片数据
    setData: function () {
      var _this = this;
      this._imgData = $.map(this._$.find('img'), function (item) {
        var src = $(item).attr('src'),
          className = $(item).attr('class');
        // 排除默认图片 和 模态内容展示图片
        if (src !== _this._defaultImgSrc && className !== 'imgView') {
          return src;
        }
      });
      // 设置图片数量
      this._imgMaxLength = this._imgData.length - 1;
      return this;
    },
    // 获取数据
    getData: function () {
      return this._imgData;
    },
    // 设置当前显示图片
    setViewIndex: function (index) {
      this._viewIndex = index;
      return this;
    },
    setDataIsChange: function (state) {
      this._dataIsChange = state;
      return this;
    },
    getDataIsChange: function () {
      return this._dataIsChange;
    },
    getDefaultImg: function () {
      return this._defaultImgSrc;
    },
    setDefaultImg: function (src) {
      this._defaultImgSrc = src;
      return this;
    },
    destroy: function () {
      this._$.off('click').removeData(name);
      this._$viewBox.off('click').off('touchstart touchend').remove();
      delete this;
      $('body').removeClass('body_overflow');
      return 'destroy'
    }
  }

  // 绑定图片展示插件
  $.fn.PicView = function () {
    // 循环初始化
    return this.each(function () {
      // 设置当前图片区域DOM
      var $this = $(this);
      // 获取当前DOM元素绑定的图片展示实例
      var data = $this.data(name);
      if (!data) {
        // 如果实例不存在，创建实例并保存到当前图片区域DOM
        $this.data(name, (data = new PicView(this)));
        // 实例ID增加
        globalId++;
      };
      return data;
    });
  };
  // 让图片展示插件构造函数指向图片展示类
  $.fn.PicView.Constructor = PicView;
  // 初始化
  $(function () {
    $('[data-ui="picview"]').PicView();
  });
})(jQuery);
