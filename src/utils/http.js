import axios from "axios";
 
let baseURL="http://139.155.252.3/earthquake"
//let baseURL="http://localhost:8081/dev"

axios.defaults.baseURL = baseURL;
 
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
 
var instance = axios.create({
  headers: {'content-type':'multipart/form-data'}
});
 
//http request 拦截器
axios.interceptors.request.use((config) => {
  if(config.method  === 'post'){
    config.data = JSON.stringify(config.data);
  }
  return config;
},(error) =>{
  return Promise.reject(error);
});
 
/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */
export function get(url,params={}){
  return new Promise((resolve,reject) => {
    axios.get(url,{
      params:params
    })
    .then(response => {
      resolve(response.data);
    })
    .catch(err => {
      reject(err)
    })
  })
}
 
  /**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */
 
export function post(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.post(url,data)
    .then(response => {
      resolve(response.data);
    },err => {
      reject(err)
    })
  })
}
 
  /**
 * 封装post请求 FormData方式
 * @param url
 * @param data
 * @returns {Promise}
 */
 
export function postform(url,data = {}){
  debugger
  return new Promise((resolve,reject) => {
    instance.post(url,data)
    .then(response => {
      debugger
      resolve(response.data);
    },err => {
      debugger
      reject(err)
    })
  })
}



// import axios from "axios";
 
// let baseURL="http://localhost:8080/dev"



//  let config = {
//     baseURL: baseURL,
//     timeout: 30000     //设置最大请求时间
//   }

  

// const _axios = axios.create(config)

// var instance = _axios.create({
//   headers: {'content-type':'multipart/form-data'}
// });
 
 
 
// /* 请求拦截器（请求之前的操作） */
// // _axios.interceptors.request.use(
// //   config => {
// //       //如果有需要在这里开启请求时的loading动画效果
// //       config.headers.Authorization = getToken;  //添加token,需要结合自己的实际情况添加，
// //     return config;
// //   },
// //   err => Promise.reject(err)
// // );
 
// /* 请求之后的操作 */
// _axios.interceptors.response.use(
//   res => {
//     //在这里关闭请求时的loading动画效果
//     //这里用于处理返回的结果，比如如果是返回401无权限，可能会是跳回到登录页的操作，结合自己的业务逻辑写
//     if (res.data.code === 401 ) {
//         alert("无权限操作")
//     }
// 	if (res.data.code === 400 ) {
// 	    alert("400请求网络失败")
// 	}
// 	if (res.data.code === 404 ) {
// 	   alert("404请求网络失败")
// 	}
//     return res;
//   },
//   err => {
//     if (err) {
//       //在这里关闭请求时的loading动画效果
// 	    alert("请求网络失败"+err)
//     }
//     return Promise.reject(err);
//   }
// );

// //封装post,get方法
// const http = {
//     get(url='',params={}){
//       return new Promise((resolve, reject) => {
//         _axios({
//           url,
//           params,
//           headers:{'Content-Type': 'application/json;charset=UTF-8'},
//           method: 'GET'
//         }).then(res => {
//           resolve(res.data)
//           return res
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },
//     post(url='',data={},headers={}){
//       return new Promise((resolve, reject) => {
//         debugger
//         _axios({
//           url,
//           data:data,
//           headers:{'Content-Type': 'multipart/form-data'},
//           method: 'POST'
//         }).then(res => {
//           resolve(res.data)
//           return res
//         }).catch(error => {
//           reject(error)
//         })
//       })
//     },

//   }
  
  
//   export default http
