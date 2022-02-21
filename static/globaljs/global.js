const hasportal = false;   //true代表是集成portal,false是不集成
if(hasportal){
    var  initialtoken = 'cas_access_token';  //默认获取的token的键值
}else{
    var  initialtoken = 'trm_access_token';  //默认获取的token的键值
}

var hasport = getCookie('external_port')
var isprod = 'dev'; //测试 test 预生产 pre  生产 prd 开发 dev
var squrl = '',cassqurl = '',authsqurl = '',authwebsqurl = '',reportsqurl=''
if(isprod == 'test'){
    squrl = 'https://t-tdm-web-be-fp.bigfintax.com'
    cassqurl = 'https://t-sso-fp.bigfintax.com'
    authsqurl = 'https://t-auth-be-fp.bigfintax.com'
    authwebsqurl = 'https://t-auth-fp.bigfintax.com'
    reportsqurl = 'https://t-fbr-fp.bigfintax.com'
}else if(isprod == 'pre'){
    squrl = 'https://p-tdm-web-be-fp.bigfintax.com'
    cassqurl = 'https://p-sso-fp.bigfintax.com'
    authsqurl = 'https://p-auth-be-fp.bigfintax.com'
    authwebsqurl = 'https://p-auth-fp.bigfintax.com'
    reportsqurl = 'https://p-fbr-fp.bigfintax.com'
}else if(isprod == 'prd'){
    squrl = 'https://tdm-web-be-fp.bigfintax.com'
    cassqurl = 'https://sso-fp.bigfintax.com'
    authsqurl = 'https://auth-be-fp.bigfintax.com'
    authwebsqurl = 'https://auth-fp.bigfintax.com'
    reportsqurl = 'https://fbr-fp.bigfintax.com'
}else if(isprod == 'dev'){
    squrl = 'http://172.18.0.117:8084'
    cassqurl = 'http://192.168.7.2:8080'
}
 if(!!hasport){
    squrl = squrl+':'+hasport
    cassqurl = cassqurl+':'+hasport
    authsqurl = authsqurl+':'+hasport
    authwebsqurl = authwebsqurl+':'+hasport
    reportsqurl = reportsqurl+':'+hasport
 }
const base = {    
    // sq: 'http://172.18.9.20:8081',   //纳税申报后台服务
    sq:squrl,

    version: '/api/v1',

    cassq: cassqurl+'/cas',

    authsq: authsqurl, //权限后端

    authwebsq: authwebsqurl, //权限前端

    reportsq: reportsqurl,
}
const globalconfig = {
    'hasportal':hasportal,
    'initialtoken':initialtoken,
}
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
     return (arr[2]);
    else
     return null;
}