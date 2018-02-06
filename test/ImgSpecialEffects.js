const { APP, fsReadSync } = require('./util');
const randomString = require('randomstring')
const fs = require('fs');
const process = require('process');
const { ImgSpecialEffects } = require('../');
const imgSpecialEffects = new ImgSpecialEffects(APP.appkey, APP.appid);
/**
 * 计算机视觉-图片特效类 API 测试文件
 * @author wubo  2018-02-06
 * @version 1.1.2
 */
// 人脸美妆编码
const cosmetic = {"1":{"type":"日系妆","name":"芭比粉","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/1.png"},"2":{"type":"日系妆","name":"清透","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/2.png"},"3":{"type":"日系妆","name":"烟灰","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/3.png"},"4":{"type":"日系妆","name":"自然","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/4.png"},"5":{"type":"日系妆","name":"樱花粉","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/5.png"},"6":{"type":"日系妆","name":"原宿红","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/6.png"},"7":{"type":"韩妆","name":"闪亮","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/7.png"},"8":{"type":"韩妆","name":"粉紫","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/8.png"},"9":{"type":"韩妆","name":"粉嫩","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/9.png"},"10":{"type":"韩妆","name":"自然","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/10.png"},"11":{"type":"韩妆","name":"清透","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/11.png"},"12":{"type":"韩妆","name":"大地色","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/12.png"},"13":{"type":"韩妆","name":"玫瑰","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/13.png"},"14":{"type":"裸妆","name":"自然","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/14.png"},"15":{"type":"裸妆","name":"清透","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/15.png"},"16":{"type":"裸妆","name":"桃粉","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/16.png"},"17":{"type":"裸妆","name":"橘粉","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/17.png"},"18":{"type":"裸妆","name":"春夏","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/18.png"},"19":{"type":"裸妆","name":"秋冬","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/19.png"},"20":{"type":"主题妆","name":"经典复古","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/20.png"},"21":{"type":"主题妆","name":"性感混血","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/21.png"},"22":{"type":"主题妆","name":"炫彩明眸","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/22.png"},"23":{"type":"主题妆","name":"紫色魅惑","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facecosmetic/23.png"}};
imgSpecialEffects.facecosmetic(
  fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\人脸美妆.jpg` : `${__dirname}/file/人脸美妆.jpg`),
  22
).then((res) => {
  if(res.ret === 0){
    let newtiem = Date.now();
    let dir = !!process.platform.match(/^win/) ? `${__dirname}\\outFile\\facecosmetic_${newtiem}.jpg` : `${__dirname}/outFile/facecosmetic_${newtiem}.jpg`
    fs.writeFileSync(dir, res.data.image, {encoding: 'base64'});
    console.log('人脸美妆', `存放地址为: ${dir}`);
  }else {
    console.log('ERROR人脸美妆', JSON.stringify(res));
  }
}, (e) => {
  console.log('人脸美妆', JSON.stringify(e));
});
// 人脸变妆编码
const decoration = {"1":{"name":"埃及妆","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/1.jpg"},"2":{"name":"巴西土著妆","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/2.jpg"},"3":{"name":"灰姑娘妆","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/3.jpg"},"4":{"name":"恶魔妆","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/4.jpg"},"5":{"name":"武媚娘妆","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/5.jpg"},"6":{"name":"星光薰衣草","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/6.jpg"},"7":{"name":"花千骨","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/7.jpg"},"8":{"name":"僵尸妆","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/8.jpg"},"9":{"name":"爱国妆","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/9.jpg"},"10":{"name":"小胡子妆","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/10.jpg"},"11":{"name":"美羊羊妆","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/11.jpg"},"12":{"name":"火影鸣人妆","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/12.jpg"},"13":{"name":"刀马旦妆","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/13.jpg"},"14":{"name":"泡泡妆","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/14.jpg"},"15":{"name":"桃花妆","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/15.jpg"},"16":{"name":"女皇妆","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/16.jpg"},"17":{"name":"权志龙","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/17.jpg"},"18":{"name":"撩妹妆","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/18.jpg"},"19":{"name":"印第安妆","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/19.jpg"},"20":{"name":"印度妆","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/20.jpg"},"21":{"name":"萌兔妆","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/21.jpg"},"22":{"name":"大圣妆","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facedecoration/22.jpg"}};
imgSpecialEffects.facedecoration(
  fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\人脸美妆.jpg` : `${__dirname}/file/人脸美妆.jpg`),
  22
).then((res) => {
  if(res.ret === 0){
    let newtiem = Date.now();
    let dir = !!process.platform.match(/^win/) ? `${__dirname}\\outFile\\facedecoration_${newtiem}.jpg` : `${__dirname}/outFile/facedecoration_${newtiem}.jpg`
    fs.writeFileSync(dir, res.data.image, {encoding: 'base64'});
    console.log('人脸变妆', `存放地址为: ${dir}`);
  }else {
    console.log('ERROR人脸变妆', JSON.stringify(res));
  }
}, (e) => {
  console.log('人脸变妆', JSON.stringify(e));
});
// 天天P图 filter
const ttptFilter = {"1":{"name":"黛紫","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/1.png"},"2":{"name":"岩井","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/2.png"},"3":{"name":"粉嫩","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/3.png"},"4":{"name":"错觉","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/4.png"},"5":{"name":"暖阳","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/5.png"},"6":{"name":"浪漫","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/6.png"},"7":{"name":"蔷薇","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/7.gif"},"8":{"name":"睡莲","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/8.gif"},"9":{"name":"糖果玫瑰","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/9.gif"},"10":{"name":"新叶","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/10.gif"},"11":{"name":"尤加利","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/11.gif"},"12":{"name":"墨","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/12.png"},"13":{"name":"玫瑰初雪","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/13.png"},"14":{"name":"樱桃布丁","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/14.png"},"15":{"name":"白茶","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/15.png"},"16":{"name":"甜薄荷","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/16.png"},"17":{"name":"樱红","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/17.png"},"18":{"name":"圣代","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/18.png"},"19":{"name":"莫斯科","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/19.png"},"20":{"name":"冲绳","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/20.png"},"21":{"name":"粉碧","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/21.png"},"22":{"name":"地中海","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/22.png"},"23":{"name":"首尔","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/23.png"},"24":{"name":"佛罗伦萨","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/24.png"},"25":{"name":"札幌","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/25.png"},"26":{"name":"栀子","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/26.png"},"27":{"name":"东京","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/27.png"},"28":{"name":"昭和","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/28.png"},"29":{"name":"自然","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/29.gif"},"30":{"name":"清逸","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/30.png"},"31":{"name":"染","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/31.png"},"32":{"name":"甜美","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter/32.png"},"":{"name":""}};
imgSpecialEffects.ptuimgfilter(
  fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\人脸美妆.jpg` : `${__dirname}/file/人脸美妆.jpg`),
  5
).then((res) => {
  if(res.ret === 0){
    let newtiem = Date.now();
    let dir = !!process.platform.match(/^win/) ? `${__dirname}\\outFile\\ptuimgfilter_${newtiem}.jpg` : `${__dirname}/outFile/ptuimgfilter_${newtiem}.jpg`
    fs.writeFileSync(dir, res.data.image, {encoding: 'base64'});
    console.log('天天P图', `存放地址为: ${dir}`);
  }else {
    console.log('ERROR天天P图', JSON.stringify(res));
  }
}, (e) => {
  console.log('天天P图', JSON.stringify(e));
});
// 图片滤镜（AI Lab）
const AILabFilter = {"1":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/1-01.jpg"},"2":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/2-03.jpg"},"3":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/3-04.jpg"},"4":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/4-07.jpg"},"5":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/5-08.jpg"},"6":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/6-09.jpg"},"7":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/7-11.jpg"},"8":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/8-12.jpg"},"9":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/9-13.jpg"},"10":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/10-16.jpg"},"11":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/11-17.jpg"},"12":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/12-19.jpg"},"13":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/13-28.jpg"},"14":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/14-30.jpg"},"15":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/15-65.jpg"},"16":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/16-80.jpg"},"17":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/17-87.jpg"},"18":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/18-125.jpg"},"19":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/19-149.jpg"},"20":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/20-154.jpg"},"21":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/21-172.jpg"},"22":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/22-176.jpg"},"23":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/23-206.jpg"},"24":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/24-207.jpg"},"25":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/25-215.jpg"},"26":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/26-225.jpg"},"27":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/27-226.jpg"},"28":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/28-239.jpg"},"29":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/29-246.jpg"},"30":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/30-326.jpg"},"31":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/31-334.jpg"},"32":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/32-340.jpg"},"33":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/33-348.jpg"},"34":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/34-350.jpg"},"35":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/35-356.jpg"},"36":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/36-357.jpg"},"37":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/37-359.jpg"},"38":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/38-391.jpg"},"39":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/39-394.jpg"},"40":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/40-418.jpg"},"41":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/41-420.jpg"},"42":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/42-430.jpg"},"43":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/43-451.jpg"},"44":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/44-453.jpg"},"45":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/45-727.jpg"},"46":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/46-10044.jpg"},"47":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/47-10046.jpg"},"48":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/48-10047.jpg"},"49":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/49-10048.jpg"},"50":{"effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/imgfilter-ailab/50-10059.jpg"}};
imgSpecialEffects.visionimgfilter(
  fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\人脸美妆.jpg` : `${__dirname}/file/人脸美妆.jpg`),
  26,
  randomString.generate({
    length: 16,
    charset: 'alphanumeric',
    capitalization: 'uppercase'
  })
).then((res) => {
  if(res.ret === 0){
    let newtiem = Date.now();
    let dir = !!process.platform.match(/^win/) ? `${__dirname}\\outFile\\visionimgfilter_${newtiem}.jpg` : `${__dirname}/outFile/visionimgfilter_${newtiem}.jpg`
    fs.writeFileSync(dir, res.data.image, {encoding: 'base64'});
    console.log('图片滤镜', `存放地址为: ${dir}`);
  }else {
    console.log('ERROR图片滤镜', JSON.stringify(res));
  }
}, (e) => {
  console.log('图片滤镜', JSON.stringify(e));
});
// 人脸融合
const models = {"1":{"name":"奇迹","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/1.png"},"2":{"name":"压岁钱","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/2.png"},"3":{"name":"范蠡","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/3.png"},"4":{"name":"李白","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/4.png"},"5":{"name":"孙尚香","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/5.png"},"6":{"name":"花无缺","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/6.png"},"7":{"name":"西施","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/7.png"},"8":{"name":"杨玉环","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/8.png"},"9":{"name":"白浅","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/9.png"},"10":{"name":"凤九","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/10.png"},"11":{"name":"夜华","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/11.png"},"12":{"name":"年年有余","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/12.png"},"13":{"name":"新年萌萌哒","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/13.png"},"14":{"name":"王者荣耀荆轲","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/14.png"},"15":{"name":"王者荣耀李白","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/15.png"},"16":{"name":"王者荣耀哪吒","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/16.png"},"17":{"name":"王者荣耀王昭君","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/17.png"},"18":{"name":"王者荣耀甄姬","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/18.png"},"19":{"name":"王者荣耀诸葛亮","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/19.png"},"20":{"name":"赵灵儿","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/20.png"},"21":{"name":"李逍遥","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/21.png"},"22":{"name":"爆炸头","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/22.png"},"23":{"name":"村姑","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/23.png"},"24":{"name":"光头","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/24.png"},"25":{"name":"呵呵哒","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/25.png"},"26":{"name":"肌肉","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/26.png"},"27":{"name":"肉山","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/27.png"},"28":{"name":"机智","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/28.png"},"29":{"name":"1927年军装（男）","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/29.png"},"30":{"name":"1927年军装（女）","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/30.png"},"31":{"name":"1929年军装（男）","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/31.png"},"32":{"name":"1929年军装（女）","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/32.png"},"33":{"name":"1937年军装（男）","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facemerge/33.png"}};
imgSpecialEffects.facemerge(
  fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\人脸美妆.jpg` : `${__dirname}/file/人脸美妆.jpg`),
  26
).then((res) => {
  if(res.ret === 0){
    let newtiem = Date.now();
    let dir = !!process.platform.match(/^win/) ? `${__dirname}\\outFile\\facemerge_${newtiem}.jpg` : `${__dirname}/outFile/facemerge_${newtiem}.jpg`
    fs.writeFileSync(dir, res.data.image, {encoding: 'base64'});
    console.log('人脸融合', `存放地址为: ${dir}`);
  }else {
    console.log('ERROR人脸融合', JSON.stringify(res));
  }
}, (e) => {
  console.log('人脸融合', JSON.stringify(e));
});
// 大头贴
const sticker = {"1":{"name":"NewDay","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/1.png"},"2":{"name":"欢乐球吃球1","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/2.png"},"3":{"name":"Bonvoyage","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/3.jpg"},"4":{"name":"Enjoy","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/4.png"},"5":{"name":"ChickenSpring","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/5.png"},"6":{"name":"ChristmasShow","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/6.png"},"7":{"name":"ChristmasSnow","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/7.png"},"8":{"name":"CircleCat","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/8.jpg"},"9":{"name":"CircleMouse","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/9.jpg"},"10":{"name":"CirclePig","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/10.jpg"},"11":{"name":"Comicmn","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/11.png"},"12":{"name":"CuteBaby","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/12.jpg"},"13":{"name":"Envolope","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/13.jpg"},"14":{"name":"Fairytale","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/14.jpg"},"15":{"name":"GoodNight","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/15.jpg"},"16":{"name":"HalloweenNight","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/16.jpg"},"17":{"name":"LovelyDay","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/17.jpg"},"18":{"name":"Newyear2017","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/18.png"},"19":{"name":"PinkSunny","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/19.png"},"20":{"name":"KIRAKIRA","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/20.jpg"},"21":{"name":"欢乐球吃球2","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/21.jpg"},"22":{"name":"SnowWhite","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/22.png"},"23":{"name":"SuperStar","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/23.png"},"24":{"name":"WonderfulWork","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/24.png"},"25":{"name":"Cold","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/25.png"},"26":{"name":"狼人杀守卫","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/26.png"},"27":{"name":"狼人杀猎人","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/27.png"},"28":{"name":"狼人杀预言家","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/28.png"},"29":{"name":"狼人杀村民","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/29.png"},"30":{"name":"狼人杀女巫","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/30.png"},"31":{"name":"狼人杀狼人","effectImg":"//yyb.gtimg.com/aiplat/ai/upload/doc/facesticker/31.png"}};
imgSpecialEffects.facesticker(
  fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\人脸美妆.jpg` : `${__dirname}/file/人脸美妆.jpg`),
  26
).then((res) => {
  if(res.ret === 0){
    let newtiem = Date.now();
    let dir = !!process.platform.match(/^win/) ? `${__dirname}\\outFile\\facesticker_${newtiem}.jpg` : `${__dirname}/outFile/facesticker_${newtiem}.jpg`
    fs.writeFileSync(dir, res.data.image, {encoding: 'base64'});
    console.log('大头贴', `存放地址为: ${dir}`);
  }else {
    console.log('ERROR大头贴', JSON.stringify(res));
  }
}, (e) => {
  console.log('大头贴', JSON.stringify(e));
});
// 颜龄检测
imgSpecialEffects.faceage(fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\人脸美妆.jpg` : `${__dirname}/file/人脸美妆.jpg`)).then((res) => {
  if(res.ret === 0){
    let newtiem = Date.now();
    let dir = !!process.platform.match(/^win/) ? `${__dirname}\\outFile\\faceage_${newtiem}.jpg` : `${__dirname}/outFile/faceage_${newtiem}.jpg`
    fs.writeFileSync(dir, res.data.image, {encoding: 'base64'});
    res.data.image = '';
    console.log('颜龄检测', `存放地址为: ${dir}`);
  }else {
    console.log('ERROR颜龄检测', JSON.stringify(res));
  }
}, (e) => {
  console.log('颜龄检测', JSON.stringify(e));
});
