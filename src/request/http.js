/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios'
import { logout } from '@/misc/root-common'

export const baseURL = process.env.NODE_ENV === 'production' ? '' : ''  // 所有请求的根路径

axios.defaults.withCredentials = true;

const http = axios.create({
  baseURL: baseURL,
  timeout: 15000,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})
// Add a response interceptor handing global errors
http.interceptors.request.use(config => {
    var tokenarray = localStorage.getItem('tokenarray');
    var hrefurl = window.location.href;
    var urlsplit = hrefurl.split('/');
    var syschar = urlsplit[3];
    if (tokenarray) {
      var tokenarrayjson = JSON.parse(tokenarray);
      if(globalconfig.hasportal){
        var  syschar = 'cas'
      }else{
        if(syschar == 'indexlogin'){
          var syschar = 'trm'
        }
      }
      var syskey = syschar+'_access_token';
      config.headers['X-Requested-With'] = 'XMLHttpRequest';
      config.headers[syskey] = tokenarrayjson[syskey];
    }
    return config;
  },
  error => {
    // 错误处理代码

    return Promise.reject(error)
  })
var count = 0;
http.interceptors.response.use(response => {
  // response.headers.cookies = getCookie('JSESSIONID');
  let _authortoken = response.headers.authorization
  if(_authortoken){
    if(globalconfig.hasportal){
      window.localStorage.removeItem('tokenarray');
      var json = {
        'cas_access_token':_authortoken
      }
      window.localStorage.setItem('tokenarray',JSON.stringify(json))
      /**如果有新的token 需要传给父框架权限，通知父级有新token，父级接受新token，然后传给所有的子级*/
      if (top != window) {
        window.parent.postMessage({'casTokenChange':_authortoken},'*');
      }
      /**如果有新的token end */
    }
  }
  return response
}, error => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    // toastr.error(error.response.data.msg || errors[error.response.status] || errors.default)
    if (error.response.status == 999) {
      if(count == 0){
        logout(0);
        count = 1;
      }
    }
    // console.log(error.response)
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser
    // and an instance of http.ClientRequest in node.js
    // toastr.error(errors.busy)
    // console.log(error.request)
  } else {
    // Something happened in setting up the request that triggered an Error
    // toastr.error(error.message)
  }
  return Promise.reject(error)

})
export default http;