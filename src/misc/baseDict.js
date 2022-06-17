import { getCommonDict } from '@/misc/root-common'
import api from '@/api'
/**税种类型转文字 */
export function taxTransfer(cb){
    var taxArr = [];
    var params = {'codeArray':'TAX_TYPE'}
    getCommonDict(params,(res)=>{
        taxArr = res[params['codeArray']]
        cb(taxArr)
    })
}
/**获取公共字典 */
export const baseApi = {
    async get (funcurl,params) {
      try {
        let res = await funcurl(params)
        let result = res.data.result
        return new Promise((resolve) => {
          if (result == 'success') {
            resolve(res)
          } else {
            resolve(res)
          }
        })
      } catch (err) {
        console.log(err)
      }
    },
    async post (funcurl,params) {
        try {
          let res = await funcurl(params)
          let result = res.data.result
          return new Promise((resolve, reject) => {
            if (result == 'success') {
              resolve(res)
            } else {
              reject(res)
            }
          })
        } catch (err) {
          console.log(err)
        }
    },
}
/**转换 typeCompare，invoiceTransfer，invoiceTransferData */
export function typeCompare(type,item){
    var params = {'codeArray':type}
    if(item){
      var comparedata = item['dictCode'];var comparename = item['dictName']
      return {comparedata,comparename,params}
    }else{
      return params
    }
}
//数据转换文字
export  function dataTransferText(data,v,type) { 
    var text = ''
    $.map(data,(item,i)=>{
      const {comparedata,comparename} = typeCompare(type,item)
      if(comparedata === v){
          text = comparename
      }
    })
    return text
}
/**将字典封装成业务obj */
export function dataToObj(arr){
  for(let k in arr){
    arr[k].map(v => {
      v.value = v.dictCode
      v.name = v.dictName
    })
  }
  return arr
}
//异步请求静态字典
export async function getApiAsync(type) {
    const params = typeCompare(type)
    let res = await baseApi.get(api.commonApi.getCommonDict,params)
    return  dataToObj(res.data.data);
}
//异步请求动态字典
export async function getApiDtAsync(type) {
    const params = typeCompare(type)
    let res = await baseApi.get(api.commonApi.getCommonDtDict,params)
    return  dataToObj(res.data.data);
}
//异步请求前台用户状态
export async function getApiFrontDtAsync(type) {
  const params = typeCompare(type)
  let res = await baseApi.get(api.commonApi.getCommonFrontDict,params)
  return  dataToObj(res.data.data);
}