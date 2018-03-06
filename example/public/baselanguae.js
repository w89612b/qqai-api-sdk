$(document).ready(function ($) {
  $('#textchatForm').on('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var postData = {},
      $textchatBox = $('.textchatBox');
    $(this).serializeArray().map((item, index) => {
      postData[item.name] = item.value.replace(/\s/g, '');
    });
    $textchatBox.append('<div class="text"> ' + postData.question + ' :我</div>')
    $.post('/textchat', JSON.stringify(postData), function (res) {
      if (res.ret === 0) {
        $textchatBox.append('<div class="text">她: ' + res.data.answer + '</div>')
      } else {
        $textchatBox.append('<div class="text">她: ' + res.retMsg + ' </div>')
      }
      $textchatBox[0].scrollTop = $textchatBox[0].scrollHeight;
    });
    return false;
  });

  $('#textForm button').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var postData = {},
      text = $(e.target).text(),
      postURI = '';
    $('#textForm').serializeArray().map((item, index) => {
      postData[item.name] = item.value.replace(/\s/g, '');
    });
    switch (text) {
      case '分词':
        postURI = '/wordseg';
        break;
      case '词性标注':
        postURI = '/wordpos';
        break;
      case '专有名词识别':
        postURI = '/wordner';
        break;
      default:
        postURI = '/wordsyn';
        break;
    }
    $.post(postURI, JSON.stringify(postData), function (res) {
      var html = ''
      switch (text) {
        case '分词':
          html += '<text class="main">分词</text>';
          res.data.base_tokens.map(item => {
            html += '<text>' + item.word + '</text>';
          });
          break;
        case '词性标注':
          html += '<text class="main">词性标注</text>';
          res.data.base_tokens.map(item => {
            html += '<text>' + item.word + '' + item.pos_code + '</text>';
          });
          break;
        case '专有名词识别':
          html += '<text class="main">专有名词识别</text>';
          res.data.ner_tokens.map(item => {
            html += '<text>' + item.word + '--' + item.types[0] + '--' + item.weights[0] + '</text>';
          });
          break;
        default:
          html += '<text class="main">同义词识别</text>';
          res.data.syn_tokens.map(item => {
            html += '<text>' + item.ori_word.word + '--' + item.syn_words[0].word + '--' + item.syn_words[0].weight + '</text>';
          });
          break;
      }
      $('.textCallback').html(html)
    });
    return false;
  });
  $('#wordcomForm').on('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var postData = {};
    $('#wordcomForm').serializeArray().map((item, index) => {
      postData[item.name] = item.value.replace(/\s/g, '');
    });
    $.post('/wordcom', JSON.stringify(postData), function (res) {
      var html = ''
      html += '<h5>意图</h5><div class="textBox"><text>' + res.data.intent + '</text></div><h5>成分</h5>'
      res.data.com_tokens.map(item => {
        let wordhtml = '';
        item.com_words.map(word => {
          wordhtml += '<text>' + word + '</text>'
        });
        html += '<div class="textBox pt30"><label> ' + item.com_name + ' </label>' + wordhtml + '</div>'
      })
      $('.wordcomBox').html(html)
    });
    return false;
  });

  $('#textpolarForm').on('submit', function (e) {
    e.preventDefault();
    e.stopPropagation();
    var postData = {};
    $('#textpolarForm').serializeArray().map((item, index) => {
      postData[item.name] = item.value.replace(/\s/g, '');
    });
    $.post('/textpolar', JSON.stringify(postData), function (res) {
      var html = '情感: ' + res.data.polar + '<br><br>置信度: ' + res.data.confd;
      $('.textpolarBox').html(html)
    });
    return false;
  });
})
