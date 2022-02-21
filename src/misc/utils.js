export function hasPermissions (value) {
  var permissLower = [];
  for(var ind = 0;ind < permissions.length;ind ++){
    permissLower.push(permissions[ind].toLowerCase());
  }
  var logicAnd = value.indexOf(',') != -1 // 与逻辑
  var logicOr = value.indexOf('|') != -1  // 或逻辑
  var perms
  if (logicAnd) {
    perms = value.split(',')
    for (let i = 0, len = perms.length; i < len; i++) {
      if (!permissLower.includes(perms[i]).toLowerCase()) {
        return false
      }
    }
    return true
  } else if (logicOr) {
    perms = value.split('|')
    for (let i = 0, len = perms.length; i < len; i++) {
      if (permissLower.includes(perms[i]).toLowerCase()) {
        return true
      }
    }
  } else {
    return permissLower.includes(value.toLowerCase())
  }
}

export function iframeWidth(){
    const oIframe = $('#iframeid');
    const deviceWidth = $(".app-content").width();
    const deviceHeight = $(".app-content").height();
    oIframe.css({'width':deviceWidth + 'px','height':deviceHeight + 'px'});
}

export const removeNodeInTree = function (treenodes, id) {
  treenodes.forEach((n, i) => {
    if (n.id == id) {
      treenodes.splice(i, 1)
    }
    if (n.children && n.children.length) {
      removeNodeInTree(n.children, id)
    }
  })
}

/* 展开/收缩子元素 */
export const toggleNode = function (e, node, expanded) {
  var parent = closest(e.target, 'li')
  if (!parent.classList.contains('parent')) return
  if (parent.classList.contains('open')) {
    parent.classList.remove('open')
    delete expanded[node.id]
  } else {
    parent.classList.add('open')
    expanded[node.id] = 1
  }
}

/* 生成当前时间戳对应的62进制形式短链接 */
export const shorten = function () {
  var DIGITS = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
  var seq = new Date().getTime()
  var len = DIGITS.length
  var arr = []
  do {
    arr.unshift(DIGITS.charAt(seq % len))
    seq = parseInt(seq / len)
  } while (seq !== 0)
  return arr.join('')
}

// 按size拆分数组
export const chunk = function (array, size) {
  var arr = []
  for (var i = 0; i < array.length; i += size) {
    arr.push(array.slice(i, i + size))
  }
  return arr
}

/* 格式化文件大小 */
export const filesize = function (bytes) {
  var unit = 'B'
  if (bytes > 1024) {
    bytes /= 1024
    unit = 'KB'
  }
  if (bytes > 1024) {
    bytes /= 1024
    unit = ' MB'
  }
  return Number(bytes.toFixed(1)) + ' ' + unit
}
/* 格式化数字 */
export const formatMoney = function (s, type) {
  if (/[^0-9\.]/.test(s))
  return "0.00";
  if (s == null || s == "null" || s == "")
    return "0.00";
  s = s.toString().replace(/^(\d*)$/, "$1.");
  s = (s + "00").replace(/(\d*\.\d\d)\d*/, "$1");
  s = s.replace(".", ",");
  var re = /(\d)(\d{3},)/;
  while (re.test(s))
   s = s.replace(re, "$1,$2");
   s = s.replace(/,(\d\d)$/, ".$1");
  if (type == 0) {
   var a = s.split(".");
   if (a[1] == "00") {
    s = a[0];
   }
  }
  return s;
}
  
/* returns duration from millisecends in hh:mm:ss format */
export const newformat= function (fmt,date) { //author: meizz   
  var o = {   
    "M+" : date.getMonth()+1,                 //月份   
    "d+" : date.getDate(),                    //日   
    "h+" : date.getHours(),                   //小时   
    "m+" : date.getMinutes(),                 //分   
    "s+" : date.getSeconds(),                 //秒   
    "q+" : Math.floor((date.getMonth()+3)/3), //季度   
    "S"  : date.getMilliseconds()             //毫秒   
  };
  if (date == null) {
    return ''
  }
  if(/(y+)/.test(fmt))   
    fmt=fmt.replace(RegExp.$1, (date.getFullYear()+"").substr(4 - RegExp.$1.length));   
  for(var k in o)   
    if(new RegExp("("+ k +")").test(fmt))   
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
  return fmt;   
}
export const format = function (secends, millis) {
  if (!secends) return ''
  secends = millis ? Math.floor(secends / 1000) : secends
  var hou = Math.floor(secends / 3600),
    min = Math.floor(secends % 3600 / 60),
    sec = Math.floor(secends % 60)
  
  hou = hou ? hou + ':' : ''
  return hou + hou ? pad(min) : min + ':' + pad(sec)
}

/* 个位前补零 */
export const pad = function (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/* 计算已过去的时间 */
export const timepast = function (timestamp) {
  var uminute = 60,
    uhour = uminute * 60,
    uday = uhour * 24,
    umonth = uday * 30,
    uyear = umonth * 12,
    diff = (new Date().getTime() - timestamp) / 1000
  if (diff < 60) return Math.abs(Math.ceil(diff)) + '秒前'
  var year = parseInt(diff / uyear)
  if (year > 0) return year + '年前'
  var month = parseInt(diff / umonth)
  if (month > 0) return month + '个月前'
  var week = parseInt(diff / (uday * 7))
  if (week > 0) return week + '周前'
  var days = parseInt(diff / uday)
  if (days > 0) return days + '天前'
  var hours = parseInt(diff / uhour)
  if (hours > 0) return hours + '小时前'
  var minites = parseInt(diff / uminute)
  if (minites > 0) return minites + '分钟前'
}

export const elementIndex = function (el) {
  var i = 0
  while ((el = el.previousSibling) !== null) {
    i++
  }
  return i
}

/* 触发DOM事件 */
export const triggerEvent = function (el, name, data) {
  var evt = document.createEvent('Event')
  evt.initEvent(name, true, true)
  data && Object.assign(evt, data)
  el.dispatchEvent(evt)
}

export const siblings = function (elem) {
  var n = (elem.parentNode || {}).firstChild
  var matched = []
  
  for (; n; n = n.nextSibling) {
    if (n.node_type === 1 && n !== elem) {
      matched.push(n)
    }
  }
  
  return matched
}

/* 匹配最近的祖先节点 (使用原生方法) */
export const closest = function (el, selector, ctx = document) {
  var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector
  if (!matchesSelector) {
    return _closest(el, selector, ctx)
  }
  do {
    if (el === ctx || matchesSelector.call(el, selector)) {
      return el
    }
  } while (el = el.parentElement)
}

/* 判断元素是否匹配给定的CSS选择器 (使用原生方法) */
export const matches = function (el, selector) {
  var matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector
  if (!matchesSelector) {
    return _matches(el, selector)
  }
  return matchesSelector.call(el, selector)
}

/* 匹配最近的祖先节点 */
export const _closest = function (el, selector, ctx = document) {
  if (!el) return
  do {
    if (el === ctx || _matches(el, selector)) {
      return el
    }
  } while (el = el.parentNode)
}

/* 判断元素是否匹配给定的CSS选择器 */
export const _matches = function (el, selector) {
  if (!el) return false
  selector = selector.split('.')
  var tag = selector.shift().toUpperCase(),
    re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g')
  return (
    (tag === '' || el.nodeName.toUpperCase() === tag) &&
    (!selector.length || ((' ' + el.className + ' ').match(re) || []).length === selector.length)
  )
}

// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.
export const debounce = function (func, wait, immediate) {
  var timeout, args, context, timestamp, result
  
  var later = function () {
    var last = Date.now() - timestamp
    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function () {
    context = this
    args = arguments
    timestamp = Date.now()
    var callnow = immediate && !timeout
    if (!timeout) timeout = setTimeout(later, wait)
    if (callnow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}

//获取cookie、
export function getCookie(name) {
 var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
 if (arr = document.cookie.match(reg))
  return (arr[2]);
 else
  return null;
}
 
//设置cookie,增加到vue实例方便全局调用
export function setCookie (c_name, value, expiredays,path,domain) {
 var exdate = new Date();
 exdate.setDate(exdate.getDate() + expiredays);
 document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())+";domain=bigfintax.com;path = /;";
}
 
//删除cookie
export function delCookie (name) {
 var exp = new Date();
 exp.setTime(exp.getTime() - 1);
 var cval = getCookie(name);
 if (cval != null)
  document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString()+";path = /;";
}
