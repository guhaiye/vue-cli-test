import { delCookie } from '@/misc/utils'
import {Modal} from 'view-design'
import api from '@/api'
import store from '@/store/'
/*表格选中初始化*/
export function gettableCheck(data) {
  var json = {};
  json['hascheck'] = [], json['tabledata'] = [];
  $(data).each(function (i, v) {
    var checkcode = data[i].checkcode;
    var id = data[i].id;
    if (checkcode == 0) {
      var hascheck = false;
    } else {
      var hascheck = true;
      json['hascheck'].push(id);
    }
    data[i]['_checked'] = hascheck;
  });
  json['tabledata'] = data;
  return json
}
//将多个对象中值为空(null)的数据转为空字符串('')
export function nullToEmptyString(json) {
  var objectmap = Object.keys(json);
  objectmap.map((v, i) => {
    if (json[v] === null) { json[v] = '' }
    var onjlen = Object.keys(json[v]);
    if (onjlen.length > 0) {
      onjlen.map((v1, i1) => {
        if (json[v][v1] === null) {
          json[v][v1] = '';
        }
      })
    } else {
      if (json[v] === null) {
        json[v] = '';
      }
    }
  })
  return json;
}
/**按钮权限的隐藏 */
export function styleVisible(code) {
  var menuarr = store.state.menu[0].children;
  var haspermisson = 'hidden';
  $(menuarr).each(function (i, v) {
    var funccode = menuarr[i].funccode;
    if (funccode == code) {
      haspermisson = 'visible';
      return;
    }
  });
  return haspermisson;
}
/*退出*/
export function logout(type) {
  if (type == 0) {//999退出
    Modal.warning({
      title: '提示',
      width: '300',
      content: '登录超时，请重新登录！',
      'class-name': 'vertical-center-modal',
      onOk: () => {
        commonLogout()
      },
    });
  } else if (type == 1) {//按钮退出或者直接退出
    commonLogout()
  }
}
export function commonLogout() {
    var hasSysParam = localStorage.getItem('user');
    var logouturl = ''
    localStorage.clear();
    delCookie('JSESSIONID');
    if (!globalconfig.hasportal) {
      window.location.href = '/login';
    } else {
      var _data = !!hasSysParam && hasSysParam.value || '';
      if(!!_data){
         logouturl = _data
      }else{
         logouturl = base.sq;
      }
      var windowhref = '' + base.cassq + '/logout?service=' + logouturl + '';
      getWindowTop(windowhref);
    }
}
export function getWindowTop(windowhref) {
  if (window != top) {
    windowhref = '' + base.cassq + '/logout?service=' + base.authsq + '';
    top.location.href = windowhref;
  } else {
    window.location.href = windowhref;
  }
}
/**退出end */
/**将数字每3位加上. */
export function regularNum(num) {
  var result = '';
  if (typeof (num) != 'object') {
    if (num != null) {
      if (num.toString().indexOf(',') > -1) {
        return num;
      }
      num = Number(num.toString() || 0).toFixed(2);
      var numAry = num.toString().split(".");
      var preNum = numAry[0];
      var lastNum = numAry[1];
      var haslow = preNum.indexOf('-');
      var firstunit = '';
      if (haslow >= 0) {
        var haslownum = preNum.split('-');
        preNum = haslownum[1];
        firstunit = '-'
      } else {
        preNum = preNum;
        firstunit = '';
      }
      while (preNum.length > 3) {
        result = ',' + preNum.slice(-3) + result;
        preNum = preNum.slice(0, preNum.length - 3);
      }
      if (preNum) {
        result = preNum + result;
      }
      result = firstunit + result + "." + lastNum;
    }
  } else {
    if (num !== null) {
      result = 0 + '.' + '00';
    }else{
      result = num
    }
  }
  return result;
}
/**获取name */
/**
 * 
 * @param {array} arr:对比数据源 
 * @param {int/str} val:比对的值
 * @param {str} key:数组的比对键值 
 * @returns 
 */
export function getDictName(arr,val,key){
  var text = ''
   $(arr).each((i,v)=>{
      if(v.toString() == val.toString()){
        text = arr[key]
      }
   })
   return text
}
/**获取url的参数 */
export function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return unescape(r[2]);
  return null;
}
/**将数据转成=》id组成的数组 */
export function getIdArr(data) {
  var checkarr = [];
  $(data).each(function (i, v) {
    checkarr.push(data[i].id);
  });
  return checkarr;
}
/**将数据转成=》ind_code组成的数组 */
export function getIndicateArr(data) {
  var checkarr = [];
  $(data).each(function (i, v) {
    checkarr.push(data[i].ind_code);
  });
  return checkarr;
}
/*数据唯一性*/
export function uniqArr(array) {
  var temp = [];
  for (var i = 0; i < array.length; i++) {
    if (temp.indexOf(array[i]) == -1) {
      temp.push(array[i]);
    }
  }
  return temp;
}
/**获取数据的索引 */
export function getjsonIndex(data, filter) {
  var dataindex = '';
  $(data).each(function (i, v) {
    if (data[i].f == filter) {
      dataindex = i;
    }
  });
  return dataindex;
}
/**分页楼梯数组 */
export function getPageArr(total) {
  var pagesizearr = [];
  // if (total <= 10) {
  //   pagesizearr = [10]
  // } else if (total > 10 && total <= 20) {
  //   pagesizearr = [10, 20]
  // } else if (total > 20 && total <= 50) {
  //   pagesizearr = [10, 20, 50]
  // } else if (total > 50) {
  //   pagesizearr = [10, 20, 50, 100]
  // }
  pagesizearr = [10, 20, 50, 100]
  return pagesizearr;
}
/*获取url上的id参数，用于校验*/
export function getUrl() {
  var href = window.location.href;
  if (href.indexOf('?')) {
    var searchurl = href.split("?")[0];
    var arrUrl = searchurl.split("/");
  } else {
    var arrUrl = href.split("/");
  }
  var strPage = arrUrl[arrUrl.length - 1];
  var id = strPage.replace(/[^0-9]/ig, "");
  return id;
}
/**分拣上传 */
export function handleFormatError() {
  Message.error('文件只能是xlsx格式');
}
export function handleExceedSizeError() {
  Message.error('文件大小不能超过5M');
}
export function handlefileSuccess(res, file) {
  var data = res;
  var result = res.result;
  var Messages = res.infos
  //  if(result=='success'){
  // var code = '000'
  // var errorData = data.infos;
  if (result == "success") {
    $("#importModelBottom1").show();
    $("#showtip1").hide();
    $("#showtip2").show();
  } else if (result == "error") {
    var code = data.code;
    if (code == null) {
      $("#importModelBottom1").show();
      $("#showtip1").show()
      $("#showtip2").hide()
    } else if (code == "001") {
      Message.error('导入内容有误，请查看返回的错误内容表格');
      var blob = new Blob(['\ufeff' + Messages], {
        type: "text/csv;charset=utf-8;"
      });
      var objectUrl = URL.createObjectURL(blob);
      var a = document.createElement('a');
      let body = document.getElementsByTagName('body')[0];
      body.appendChild(a);
      a.setAttribute('style', 'display:none');
      a.setAttribute('href', objectUrl);
      //var filename=file.name 
      var filename = "上传结果.csv"
      a.setAttribute('download', filename);
      a.click();
      URL.revokeObjectURL(objectUrl);
      body.removeChild(a);
    } else {
      Message.error(Messages);
    }
  }
}
export function DownFile(blob, filename, type = 'application/vnd.ms-excel') {
  let newblob = new Blob([blob], {
    type: type + ';charset=utf-8'
  });
  var objectUrl = URL.createObjectURL(newblob);
  if (objectUrl) {
    var a = document.createElement('a');
    a.setAttribute('id', 'downloadfile');
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(a);
    a.setAttribute('style', 'display:none');
    a.setAttribute('href', objectUrl);
    a.setAttribute('download', filename);
    a.click();
    URL.revokeObjectURL(objectUrl);
    $("#downloadfile").remove();
  }
}
export function DownFileZip(blob, filename, type = 'application/zip') {
  let newblob = new Blob([blob], {
    type: type + ';charset=utf-8'
  });
  var objectUrl = URL.createObjectURL(newblob);
  if (objectUrl) {
    var a = document.createElement('a');
    a.setAttribute('id', 'downloadfile');
    let body = document.getElementsByTagName('body')[0];
    body.appendChild(a);
    a.setAttribute('style', 'display:none');
    a.setAttribute('href', objectUrl);
    a.setAttribute('download', filename);
    a.click();
    URL.revokeObjectURL(objectUrl);
    $("#downloadfile").remove();
  }
}
export function DownFileHref(href, filename) {
  var a = document.createElement('a');
  a.setAttribute('id', 'downloadfile');
  let body = document.getElementsByTagName('body')[0];
  body.appendChild(a);
  a.setAttribute('style', 'display:none');
  a.setAttribute('href', href);
  a.setAttribute('download', !!filename ? filename : '模板');
  a.click();
  $("#downloadfile").remove();
}
/**文件上传end */
/**表格排序初始化 */
export function initialHeader(vm) {
  var datakey = '';
  var _data = vm.columnsTable;
  var sortkey = vm.sortfield;
  $(_data).each(function (i, v) {
    var key = _data[i].key;
    if (key != undefined && key == sortkey) {
      datakey = i;
    }
  });
  var hassort = vm.$refs.tablecon._data.cloneColumns[datakey];
  if (hassort !== undefined && hassort._sortType !== undefined) {
    hassort._sortType = 'normal'
  }
}
export function initialHeaders(vm) {
  var datakey = '';
  var _data = vm.columnsTable;
  var sortkey = vm.$refs.tablecon.sortfield;
  $(_data).each(function (i, v) {
    var key = _data[i].key;
    if (key != undefined && key == sortkey) {
      datakey = i;
    }
  });
  var hassort = vm.$refs.tablecon.$refs.tablecon._data.cloneColumns[datakey];
  if (hassort !== undefined && hassort._sortType !== undefined) {
    hassort._sortType = 'normal'
  }
}



/**表格排序初始化end */
/**租户自定义参数 */
export function getFilterRule() {
  var initial_USER = [{ "regex": "/^[0-9a-zA-Z-_.]{1,20}$/", "type": "1", "isrequire": true, "hint": "输入账号不符合规范" }]
  var initial_ROLE = [{ "regex": "/^[A-Z]{1}\\d{1,3}$/", "type": "1", "isrequire": true, "hint": "大写首字母+1-3位数字 例：A001" }]
  var initial_POS = [{ "regex": "/^[A-Z]{1}\\d{1,3}$/", "type": "1", "isrequire": true, "hint": "大写首字母+1-3位数字 例：A001" }]
  var initial_ORG = [{ "regex": "/^[0-9]{1,30}$/", "type": "1", "isrequire": true, "hint": "请输入数字，长度不超过30" }]
  var initial_FUNC_NODE = [{ "regex": "/^[0-9a-zA-Z-_.]+$/", "type": "1", "isrequire": true, "hint": "输入编码不符合规范" }]
  var initial_CORP = [{ "regex": "/^[^\\u4e00-\\u9fa5]{0,80}$/", "type": "1", "isrequire": true, "hint": "编码不能是汉字" }]
  var initial_UP = [{ "regex": "/^[^\\u4e00-\\u9fa5]{0,80}$/", "type": "1", "isrequire": true, "hint": "编码不能是汉字" }]
  var initial_DOWN = [{ "regex": "/^[^\\u4e00-\\u9fa5]{0,80}$/", "type": "1", "isrequire": true, "hint": "编码不能是汉字" }]
  var initial_UP_DOWN_GRP = [{ "regex": "/^[^\\u4e00-\\u9fa5]{0,80}$/", "type": "1", "isrequire": true, "hint": "编码不能是汉字" }]
  var initial_DSI_SERVICE = [{ "regex": "/^[0-9a-zA-Z-_]+$/", "type": "1", "isrequire": true, "hint": "输入编码不符合规范" }]
  var initial_DSI = [{ "regex": "/^[0-9a-zA-Z-_]+$/", "type": "1", "isrequire": true, "hint": "输入编码不符合规范" }]

  var checkname = $("#codecheck_type").val().toUpperCase();
  var state_rule = [];
  if (store.state.setCodeParams.codeParams) {
    state_rule = store.state.setCodeParams.codeParams;
  }
  var checktype = 'CODE_CHECK_RULE_' + checkname;
  var type_initial = eval('initial_' + checkname);
  var checkinitial = 'CODE_CHECK_RULE_GENERAL';
  var checkbreak = 0;
  var coderule = [];
  if (state_rule.length > 0) {
    coderule = state_rule.filter(function (item) {
      if (item[checkinitial]) {
        if (checkname !== 'USER' && checkname !== 'ORG' && checkname !== 'FUNC_NODE') {
          checkbreak = 1;
          return item[checkinitial];
        }
      }
    })
    if (checkbreak == 0) {
      coderule = state_rule.filter(function (item) {
        if (item[checktype]) {
          return item[checktype];
        }
      })
    }
  } else {
    coderule = type_initial;
  }
  if (coderule.length > 0) {
    if (coderule[0][checktype]) {
      return JSON.parse(coderule[0][checktype]);
    } else if (coderule[0][checkinitial]) {
      return JSON.parse(coderule[0][checkinitial]);
    }
  } else {
    return type_initial;
  }

}
/*提示弹窗 */
export function alertEffect(flag, content) {
  if (flag) {
    var div = $("<div id='shadeBox' class='shadowBox'>" + content + "</div>");
    $('body', document).prepend(div);
  } else {
    $('#shadeBox', document).remove();
  }
}
/**
 * 格式化金额 带四舍五入
 * @param s 金额
 * @param n 格式化长度
 * @returns {String}
 */
export function formatMoney(s, n) {
  if (s < 0) {
    s = Math.abs(s);
    s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    if (isNaN(s) || ((s + "").replace(/\s/g, "")) == "") {
      return "";
    }
    n = n > 0 && n <= 20 ? n : 2;
    var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    var t = "";
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    return "-" + t.split("").reverse().join("") + "." + r;
  } else {
    if(!!n){
      n = n > 0 && n <= 20 ? n : 2;
      s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + "";
    }else{
      s = parseFloat((s + "").replace(/[^\d\.-]/g, "")) + "";
    }
    if (isNaN(s) || ((s + "").replace(/\s/g, "")) == "") {
      return "";
    }
    if(s.indexOf('.') >= 0){
     var l = s.split(".")[0].split("").reverse(), r = s.split(".")[1];
    }else{
     var l = s.split("").reverse()
    }
    var t = "";
    for (let i = 0; i < l.length; i++) {
      t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
    }
    if(s.indexOf('.') >= 0){
       return t.split("").reverse().join("") + "." + r;
    }else{
       return t.split("").reverse().join("")
    }
  }
}
/**
 * 时间补零
 * @param s
 * @returns
 */
export function p(s) {
  return s < 10 ? '0' + s : s;
}

/**
 * 格式化时间戳YYYY-MM-DD
 * @param data
 * @returns
 */
export function formatDate(data) {
  if (data) {
    var da = new Date(data.replace(/-/g, '/'));
    var year = da.getFullYear();
    var month = p(da.getMonth() + 1);
    var date = p(da.getDate());
    return year + "-" + month + "-" + date;
  } else {
    return "";
  }
}
/**将日期减少一月 */
export function formatDateParam(data, type) {
  if (data) {
    if (data.toString().indexOf('-') > 0) {
      var da = new Date(data.replace(/-/g, '/'));
    } else {
      var da = new Date(data);
    }
    var year = da.getFullYear();
    var month = p(da.getMonth());
    if (da.getMonth() == 0) {
      var month = 12;
      var year = year - 1
    }
    var date = p(da.getDate());
    if (type == 'month') {
      return year + "-" + month
    } else {
      return year + "-" + month + "-" + date;
    }
  } else {
    return "";
  }
}
/**
 * 格式化时间戳YYYY-MM
 * @param data
 * @returns
 */
export function formatMonthDate(data) {
  if (data) {
    var da = new Date(data.replace(/-/g, '/'));
    var year = da.getFullYear();
    var month = p(da.getMonth() + 1);
    //		return [year,month].join('-');
    return year + "-" + month
  } else {
    return "";
  }

}
/**
 * 格式化时间戳YYYY-MM
 * @param 20201122
 * @returns 2020-11-22
 *  */
export function formatMonthDateSeamless(data) {
  if (data.length == 8 && data) {
    let yy = data.slice(0, 4);
    let MM = data.slice(4, 6);
    let dd = data.slice(6, 8);
    return `${yy}-${MM}-${dd}`
  } else {
    return '--';
  }
}
/**
 * 
 * @param {h} createElement 
 * @param {code}  编码
 * @param {name}  名称
 * @return  1234/xxx公司 || 1234 || xxx公司 || ""
 */
export const CusInfoTooltip = (h, code, name) => {
  let _des =
    code != null && name != null
      ? code + "/" + name
      : code != null && name == null
        ? code
        : code == null && name != null
          ? name
          : "";
  if (_des == '') return h('span', '');
  return h(
    "Tooltip",
    {
      class: "cus-tooltip_st",
      props: {
        content: _des,
        transfer: true,
        placement: "bottom",
        maxWidth: "300px"
      }
    },
    _des
  );
}
/* 节流防抖 */
export const Debounce = (fn, t, _this) => {
  let delay = t || 500;
  if (_this.timer) {
    clearTimeout(_this.timer);
  }
  _this.timer = setTimeout(() => {
    _this.timer = null;
    fn();
  }, delay);
};

/**格式化searchFiled  by guhaiye*/
export function searchFieldFormat(arr, searchfiled) {
  var conarr = [];
  $.map(arr, (v, i) => {
    if (searchfiled[v.f] === undefined) {
      searchfiled[v.f] = ''
    }
    if ($.trim(searchfiled[v.f]) != '' || searchfiled[v.f] === 0) {
      var formjson = {
        "f": v.f,
        "v": searchfiled[v.f],
        "op": v.op,
        "t": v.t
      }
      conarr.push(formjson)
    }
  })
  return conarr;
}

/**税局列表 */
export function areaList(cb) {
  api.commonApi.getAreaList().then((res) => {
    var result = res.data.result;
    if (result == 'success') {
      cb(res.data.data);
    }
  })
}
//农产品收购发票获取公司数据(购方纳税人)列表
export function OrgList(cb,params) {
  api.commonApi.getOrgList(params).then((res) => {
    var result = res.data.result;
    if (result == 'success') {
      cb(res.data.data);
    }
  })
}
/**
 * 金额转大写
 * @param n
 * @returns
 */
 export function formatMoneyDx(n) {
  if (!/^(0|[1-9]\d*)(\.\d+)?$/.test(n))
    return "";
  var unit = "仟佰拾亿仟佰拾万仟佰拾元角分", str = "";
  if (n == 0)
    return '零元零角零分'
  if (n > 0)
    n += "00";
  var p = n.indexOf('.');
  if (p >= 0)
    n = n.substring(0, p) + n.substr(p + 1, 2);
  unit = unit.substr(unit.length - n.length);
  for (var i = 0; i < n.length; i++)
    str += '零壹贰叁肆伍陆柒捌玖'.charAt(n.charAt(i)) + unit.charAt(i);
  return str.replace(/零(仟|佰|拾|角)/g, "零").replace(/(零)+/g, "零").replace(/零(万|亿|元)/g, "$1").replace(/(亿)万|壹(拾)/g, "$1$2").replace(/^元零?|零分/g, "").replace(/元$/g, "元整");
}
/**字典查询 */
export function getCommonDict(params, cb) {
  api.commonApi.getCommonDict(params).then((res) => {
    var result = res.data.result;
    if (result == 'success') {
      cb(nullToEmptyString(res.data.data));
    }
  })
}
/**动态字典查询 */
export function getCommonDtDict(params, cb) {
  api.commonApi.getCommonDtDict(params).then((res) => {
    var result = res.data.result;
    if (result == 'success') {
      cb(nullToEmptyString(res.data.data));
    }
  })
}
/**前台用户状态 字典查询 */
export function getCommonFrontDict(params, cb) {
  api.commonApi.getCommonFrontDict(params).then((res) => {
    var result = res.data.result;
    if (result == 'success') {
      cb(nullToEmptyString(res.data.data));
    }
  })
}
/**格式化显示更多里面的checkbox的数据 */
export function formatCheckBoxData(data) {
  let newdata = [], choicedata = [];
  data.map((v, i) => {
    const { dictCode, dictName, typeClass, id } = v
    let ischecked = false, isdisabled = false
    if (typeClass == '1') {
      ischecked = true; isdisabled = true
      choicedata.push(v.dictCode)
    } else if (typeClass == '2') {
      ischecked = true; isdisabled = false
      choicedata.push(v.dictCode)
    } else if (typeClass == '3') {
      ischecked = false; isdisabled = false
    }
    newdata.push({
      id,
      dictCode,
      dictName,
      ischecked,
      isdisabled
    })
  })
  return {
    newdata,
    choicedata
  }
}
/**格式化季报，年报，半年报，月报 */
export function formatReportTime(data) {
  let newarr = {}
  if (Object.keys(data).length > 0) {
    $(data).each((i, v) => {
      for (let k in v) {
        newarr[k] = v[k]
      }
    })
  }
  return newarr;
}
/**数字转换 小写 ==> 大写  */
export function DX(money) {
  //汉字的数字
  var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
  //基本单位
  var cnIntRadice = new Array('', '拾', '佰', '仟');
  //对应整数部分扩展单位
  var cnIntUnits = new Array('', '万', '亿', '兆');
  //对应小数部分单位
  var cnDecUnits = new Array('角', '分');
  //整数金额时后面跟的字符
  var cnInteger = '整';
  //整型完以后的单位
  var cnIntLast = '元';
  // 如果为负数
  var cnIntMinus = '负';
  // 负号处理后的数字
  var cash;
  //分离金额后用的数组，预定义
  var parts;
  //金额整数部分
  var integerNum;
  //金额小数部分
  var decimalNum;
  //输出的中文金额字符串
  var chineseStr = '';

  // 判断空
  if (money == "") {
    return "";
  }
  // 判断正负
  if (money.charAt(0) === "-") {
    // chineseStr += cnIntMinus;
    cash = money.slice(1);
  } else {
    cash = money;
  }
  // 转换为浮点数类型,会自动去掉首尾的0
  cash = parseFloat(cash);
  if (cash == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger;
    return chineseStr;
  }

  // 转换为字符串
  cash = cash.toString();
  if (cash.indexOf('.') == -1) {
    integerNum = cash;              //金额整数部分
    decimalNum = '';                //金额小数部分
  } else {
    parts = cash.split(".");
    integerNum = parts[0];                      //金额整数部分
    decimalNum = parts[1].substr(0, 2);         //金额小数部分
  }

  // 转换整数部分
  if (integerNum != '-' && parseInt(integerNum, 10) > 0) {
    var intLen = integerNum.length;
    var zero = 0; //标记零出现次数
    for (let i = 0; i < intLen; i++) {
      var intChar = integerNum.substr(i, 1);
      var intSlen = intLen - i - 1;
      var divided = intSlen / 4;
      var remain = intSlen % 4;

      if (intChar == "0") {
        zero++;
      } else {
        if (zero > 0) {
          chineseStr += cnNums[0];
        }
        zero = 0;
        chineseStr += cnNums[parseInt(intChar)] + cnIntRadice[remain];
      }
      if (remain === 0 && divided > 0) {
        chineseStr += cnIntUnits[divided];
      }
    }
    chineseStr += cnIntLast; //加上'元'字
  }

  if (decimalNum != '') {      // 小数部分存在时
    var decLen = decimalNum.length;
    for (let i = 0; i < decLen; i++) {
      var decChar = decimalNum.substr(i, 1);
      if (decChar != '0') {
        chineseStr += cnNums[parseInt(decChar)] + cnDecUnits[i];
      }
      if (decChar == '0' && parseInt(integerNum, 10) > 0) {
        chineseStr += cnNums[parseInt(decChar)] + cnDecUnits[i];
      }
    }
  } else {
    chineseStr += cnInteger;
  }
  return chineseStr;
}


export function sorTable(a,b,type){
  a = a == null ? '' : a ;
  b = b == null ? '' : b ;
  if (type == 'asc') {
    return a.localeCompare(b,'zh');
  } else {
    return b.localeCompare(a,'zh');
  }

}
/**封装condition */
export function getSearchField(condition,form) {
    var arr = condition
    let searchfiled = form;
    let conarr = searchFieldFormat(arr, searchfiled);
    return conarr;
}