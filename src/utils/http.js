import axios from "axios";
 
let baseURL="http://139.155.252.3/earthquake"
//let baseURL="http://localhost:8081/dev"

axios.defaults.baseURL = baseURL;
 
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
 
var instance = axios.create({
  headers: {'content-type':'multipart/form-data'}
});
 
axios.interceptors.request.use((config) => {
  if(config.method  === 'post'){
    config.data = JSON.stringify(config.data);
  }
  return config;
},(error) =>{
  return Promise.reject(error);
});
 
/**
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



