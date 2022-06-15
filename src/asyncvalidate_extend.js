import {getFilterRule} from './misc/root-common.js'
import api from '@/api'
export const validSpecialChar = (rule, value, callback) => {
     var patten = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]");
     if (patten.test(value)) {
         callback('不能包含特殊字符');
     }else{
         callback();
     }
};
export const validFormatAccount = (rule, value, callback) => {
   var patten = /^[0-9a-zA-Z-_.]+$/;
   if(patten.test(value)){
      callback();
   }else{
      callback('输入的账号不符合规范');
   }
};


/**租户自定义 */
export const checkCodeRule = (rule,value,callback) => {
  var checkcodenew = getFilterRule();
  var checkcodearr = checkcodenew.filter(function(item){
      if(item.type == 1){
        return item;
      }
  });

  var checkcode = checkcodearr[0];
  var patten = eval(checkcode.regex);
  var message = checkcode.hint;
  if(!checkcode.required && $.trim(value) == ''){
      callback();
      return;
  }
  if (patten.test($.trim(value))) {
    callback();
  } else {
    callback(message);
  }
}
export const validFormatCode = (rule, value, callback) => {
    var code = /^[A-Z]{1}\d{1,3}$/;
    if(code.test(value)){
    	callback();
    }else{
    	callback('输入的编码不符合规范');
    }
};
export const validCheckName = (rule,value,callback) => {
    var patten = /^[\u4E00-\u9FA5A-Za-z0-9_. -()（）]+$/;
      if(patten.test(value)){
      callback();
    }else{
      callback('输入的名称不符合规范');
    }
    
};
export const validFormatNum = (rule, value, callback) => {
  if (value != '') {
    var code = /^[0-9]+$/;
  if(code.test(value)){
    callback();
  }else{
    callback('输入的格式不符合规范');
  }
  } else {
    callback();
  }
  
}; 
export const validFormatSZ = (rule, value, callback) => {
    var code = /^\d{0,2}$/;
    if(code.test(value)){
      callback();
    }else{
      callback('0-2位有效数字');
    }
  }; 
export const validFormatYear = (rule, value, callback) => {
  var code = /^\d{0,4}$/;
  if(code.test(value)){
    callback();
  }else{
    callback('0-4位有效数字');
  }
}; 
export const validFormatPerNum = (rule, value, callback) => {
  if (value != '') {
    var code = /^100$|^(\d|[1-9]\d)(\.\d+)*$/;
    if(code.test(value)){
      callback();
    }else{
      callback('大于0小于等于100的实数');
    }
  } else {
    callback();
  }
 
};
export const validFormatCodefunc = (rule, value, callback) => {
    var code = /^[0-9]+$/;
    if(code.test(value)){
    	callback();
    }else{
    	callback('输入的编码不符合规范');
    }
};
export const validFormatCodefuncnode = (rule, value, callback) => {
  var code = /^[0-9a-zA-Z-_]+$/;
  if(code.test(value)){
    callback();
  }else{
    callback('输入的编码不符合规范');
  }
};
export const validPhone = (rule, value, callback) => {
  var testmobile = /^((0\d{2,3}-\d{7,8})|(1[3758964]\d{9}))$/;
  if(value === '' || value === null || value === undefined){
    callback();
  }else{
    if(testmobile.test(value)){
      callback();
    }else{
      callback('输入的不是手机号码');
    };   
  }
};
export const validMobblePhone = (rule, value, callback) => {
  var testmobile = /^1[3758964]\d{9}$/;
  if(value === '' || value === null || value === undefined){
    callback();
  }else{
    if(testmobile.test(value)){
      callback();
    }else{
      callback('输入的不是手机号码');
    };   
  }
};
export const validFixPhone = (rule, value, callback) => {
  var tel = /^\d{3,4}-?\d{7,9}$/;  
  if (value != '') {
    if(tel.test(value)){
      callback();
    }else{
      callback('输入的不是固定电话号码');
    };   
  } else {
    callback();
  } 
};
export const validEmail = (rule, value, callback) => {
  if(value!=''){
  var mail =/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;  
    if(mail.test(value)){
      callback();
    }else{
      callback('输入的不是邮箱');
    };
  } else {
    callback();
  }
};
export const validFormatName = (rule, value, callback) => {
  var patten = /^[\u4E00-\u9FA5A-Za-z.（）()]+$/;
  if(patten.test(value)){
    callback()
  }else{
    callback('输入的姓名不符合规范');
  }
};
export const validIdCard = (rule, value, callback) => {
  var IDcard = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
  if (value != '') {
    if (IDcard.test(value)) {
      callback();
    } else {
      callback('输入的不是身份证号码');
    }
  }else {
      callback();
     }
}
export const IndexStandardValue = (rule, value, callback)=>{
    var value = $.trim(value);
    // var patter = /^[0-9]{1,}$/;
    var patter = /^(-?\d+)(\.\d+)?$/;
    if(!patter.test(value)||value.length>20){
        callback(new Error('指标标准值必须是数字')) 
    }else{
        callback()
    }
};
export const IndexUperValue = (rule, value, callback)=>{
    var value = $.trim(value);
    var patter = /^(-?\d+)(\.\d+)?$/;
    if(!patter.test(value)){
        callback('上限值必须是数字') 
    }else{
        callback()
    } 
};
export const checkNum  = (rule, value, callback) => {
  var str =  $.trim(value);
  var patter = /^[0-9]+([.]{1}[0-9]+){0,1}$/
  if(!patter.test(str)){
   callback("请输入金额"); 
  } else{
   callback();
  }
} 
export const IndexLimtValue = (rule, value, callback)=>{
    if(!!value){
      var value = $.trim(value);
      var patter = /^(-?\d+)(\.\d+)?$/;
      if(!patter.test(value)){
          callback('下限值必须是数字') 
      }else{
          callback()
      }
    }else{
      callback()
    }
};
export const Int=(rule,value,callback)=>{
    var value = $.trim(value);
    var parseInt = /^(([^0][0-9]+|0)$)|^(([1-9]+)$)/;
    var parseInts = /[1-9].(0)/;
      if(!parseInt.test(value)||parseInts.test(value)){
        callback(new Error('请填写整数'))  
      }else{
        callback()  
      }   
};
export const Float=(rule,value,callback)=>{
    var value = $.trim(value);
    var parseFloat=/^((([^0][0-9]+|0)\.([0-9]{1,100}))$)|^(([1-9]+)\.([0-9]{1,2})$)/;
    if(!parseFloat.test(value)){
        callback(new Error('请填写小数')) 
    }else{
        callback()
    }   
};
export const Str = (rule, value, callback) => {
    var value = $.trim(value);
    var patten = /^[\u4E00-\u9FA5A-Za-z.]+$/;
    if(patten.test(value)){
      callback()
    }else{
      callback('请输入文字');
    }
};
export const validateUppercase=(rule, value, callback) => {
    var value = $.trim(value);
    var patter=/^[A-Z]{1,100}$/;
    var value =  patter.test(value);
    if(value){
        callback();
    }else{
        callback(new Error('格式为大写字母'));
    }
}
export const validateList=(rule, value, callback) => {
    var value = $.trim(value);
    var patter=/[^,][,][^,]*/;
    var patters = /\s[,][^,]*/;
    // 验证逗号前面是空格
    var valuess = !patters.test(value);
    // 验证以逗号格式分开
    var values =  patter.test(value);
    if(valuess&&values){
         value = value.split(',')
        for(var i=0;i<value.length;i++){
            if(value[i]==""){
              callback(new Error('格式不正确'));
            }
           
        }
      callback()       
    }else{
        
        callback(new Error('格式不正确'));
    }
}

export const validateagcode=(rule, value, callback) => {
    var value = $.trim(value);
    var patter=/^[A-Z]{1}\d{1,5}$/;
    var value =  patter.test(value);
    if(value){
        callback();
    }else{
        callback(new Error('格式不正确'));
    }
}

//发票代码校验
export const validateInvoiceCode = (rule, value, callback)=>{
   var id = $("#checkid").val();
   var params = {}
   if(rule.fullField == 'invoiceCode'){
       params = {'id':id,'invoiceCode':value}
   }else if(rule.fullField == 'invoiceNumeric'){
       params = {'id':id,'invoiceNumeric':value}
   }
   api.farmProInvoice.checkFarmProRepeat(params).then((res)=>{
     var result = res.data.result;
     if (result == 'error') {
      callback(new Error('发票代码不能为空'));
     } else {
      callback();
     }
   })
}
/**合同编码校验唯一性 */
export const validateContractCode = (rule, value, callback,source,options)=>{
  let contract_id = $("#contract_id").val()
  var params = {
    id:contract_id,
    contractCode:value
  }
  api.yhsContractManage.checkContractCode(params).then((res)=>{
    const {result} = res.data
    if (result == 'error') {
     callback(new Error('合同编号不能重复'));
    } else {
     callback();
    }
  })
}
export const money = (rule, value, callback)=>{
  var value = $.trim(value);
  if (value!="") {
    var patter = /((^[1-9]\d*)|^0)(\.\d{0,2}){0,1}$/;
    if(!patter.test(value)){
        callback(new Error('格式错误')) 
    }else{
        callback()
    }
  } else {
    callback()
  }
};
