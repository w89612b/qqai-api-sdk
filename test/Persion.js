const {
  APP,
  fsReadSync
} = require('./util');
const {
  Person
} = require('../');
const person = new Person(APP.appkey, APP.appid);
/**
 * 人体管理API 测试类
 * @author wubo 2018-02-07
 * @version 1.1.3 
 */
// 个体创建
// const persons = [4, 9, 2, 7, 12];
// var folder = 96;
// for (let z = 0; z < 5; z++) {
//   folder++;
//   let param = {
//     image: fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\ones\\${String.fromCharCode(folder)}\\1.jpg` : `${__dirname}/file/ones/${String.fromCharCode(folder)}/1.jpg`),
//     person_name: `王小二${z}`,
//     group_ids: 'group1',
//     person_id: `1509333186${z}`,
//     tag: '备注信息'
//   };
//   (function (param, folder, l) {
//     person.newperson(param).then((res) => {
//       if (res.ret === 0) {
//         console.log('个体创建', JSON.stringify(res));
//         let person_id = res.data.person_id;
//         // 增加人脸
//         for (let i = 1; i < l; i++) {
//           person.addface(
//             fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\ones\\${String.fromCharCode(folder)}\\${i+1}.jpg` : `${__dirname}/file/ones/${String.fromCharCode(folder)}/${i+1}.jpg`),
//             person_id,
//             '备注信息'
//           ).then((res) => {
//             if (res.ret === 0) {
//               console.log('增加人脸', JSON.stringify(res));
//             } else {
//               console.log('ERROR增加人脸', JSON.stringify(res));
//             }
//           }, (e) => {
//             console.log('增加人脸', JSON.stringify(e));
//           });
//         }
//       } else {
//         console.log('ERROR个体创建', JSON.stringify(res));
//       }
//     }, (e) => {
//       console.log('个体创建', JSON.stringify(e));
//     });
//   })(param, folder, persons[z])
// }


// // 获取组列表
// person.getgroupids().then((res) => {
//   if (res.ret === 0) {
//     console.log('获取组列表', JSON.stringify(res));
//     res.data.group_ids.map(getgroupid=>{
//       // 获取个体列表
//       person.getpersonids(getgroupid).then((res) => {
//         if (res.ret === 0) {
//           console.log('获取个体列表', JSON.stringify(res));
//           res.data.person_ids.map(getpersonid=>{
//             // 获取人脸列表
//             person.getfaceids(getpersonid).then((res) => {
//               if (res.ret === 0) {
//                 console.log('获取人脸列表', JSON.stringify(res));
//                 res.data.face_ids.map(face_id=>{
//                   // 获取人脸信息
//                   person.getfaceinfo(face_id).then((res) => {
//                     if(res.ret === 0){
//                       console.log('获取人脸信息', JSON.stringify(res));
//                     }else {
//                       console.log('ERROR获取人脸信息', JSON.stringify(res));
//                     }
//                   }, (e) => {
//                     console.log('获取人脸信息', JSON.stringify(e));
//                   });
//                 });
//               } else {
//                 console.log('ERROR获取人脸列表', JSON.stringify(res));
//               }
//             }, (e) => {
//               console.log('获取人脸列表', JSON.stringify(e));
//             });
//             // 获取信息
//             person.getinfo(getpersonid).then((res) => {
//               if(res.ret === 0){
//                 console.log('获取信息', JSON.stringify(res));
//                 // 设置信息
//                 person.setinfo(
//                   res.data.person_id,
//                   `${res.data.person_name}${res.data.person_id}`,
//                   `备注修改由${res.data.person_name}改为${res.data.person_name}${res.data.person_id}`
//                 ).then((res) => {
//                   if(res.ret === 0){
//                     console.log('设置信息', JSON.stringify(res));
//                   }else {
//                     console.log('ERROR设置信息', JSON.stringify(res));
//                   }
//                 }, (e) => {
//                   console.log('设置信息', JSON.stringify(e));
//                 });
//               }else {
//                 console.log('ERROR获取信息', JSON.stringify(res));
//               }
//             }, (e) => {
//               console.log('获取信息', JSON.stringify(e));
//             });

//           });
//         } else {
//           console.log('ERROR获取个体列表', JSON.stringify(res));
//         }
//       }, (e) => {
//         console.log('获取个体列表', JSON.stringify(e));
//       });
//     });
//   } else {
//     console.log('ERROR获取组列表', JSON.stringify(res));
//   }
// }, (e) => {
//   console.log('获取组列表', JSON.stringify(e));
// });


// person.getpersonids('group1').then(res => {
//   if (res.ret === 0) {
//     res.data.person_ids.map(personid => {
//       (function (personid) {
//         person.getinfo(personid).then(res => {
//           res.data.face_ids.map(faceid => {
//             // 删除人脸
//             person.delface(
//               personid,
//               faceid
//             ).then((res) => {
//               if (res.ret === 0) {
//                 console.log('删除人脸', JSON.stringify(res));
//               } else {
//                 console.log('ERROR删除人脸', JSON.stringify(res));
//               }
//             }, (e) => {
//               console.log('删除人脸', JSON.stringify(e));
//             });
//           })
//         }, e => {})
//       })(personid)
//     })
//   }
// }, e => {})
// person.getpersonids('group1').then(res => {
//   if (res.ret === 0) {
//     // // console.log(JSON.stringify(res))
//     // res.data.person_ids.map(personid => {
//     //   // 删除个体
//     //   person.delperson(personid).then((res) => {
//     //     if(res.ret === 0){
//     //       console.log('删除个体', JSON.stringify(res));
//     //     }else {
//     //       console.log('ERROR删除个体', JSON.stringify(res));
//     //     }
//     //   }, (e) => {
//     //     console.log('删除个体', JSON.stringify(e));
//     //   });
//     // })
//   }
// }, e => {})








// 人脸识别
// person.faceidentify(
//   fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\ones\\a\\1.jpg` : `${__dirname}/file/ones/a/1.jpg`),
//   'group1',
//   9
// ).then((res) => {
//   if(res.ret === 0){
//     console.log('人脸识别', JSON.stringify(res));
//   }else {
//     console.log('ERROR人脸识别', JSON.stringify(res));
//   }
// }, (e) => {
//   console.log('人脸识别', JSON.stringify(e));
// });
// 人脸验证
// person.faceverify(
//   fsReadSync(!!process.platform.match(/^win/) ? `${__dirname}\\file\\ones\\b\\2.jpg` : `${__dirname}/file/ones/b/2.jpg`),
//   '15093331864'
// ).then((res) => {
//   if(res.ret === 0){
//     console.log('人脸验证', JSON.stringify(res));
//   }else {
//     console.log('ERROR人脸验证', JSON.stringify(res));
//   }
// }, (e) => {
//   console.log('人脸验证', JSON.stringify(e));
// });
