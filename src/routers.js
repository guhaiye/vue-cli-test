import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/'
import MenuUtils from '@/misc/MenuUtils.js'
import { logout } from '@/misc/root-common'
Vue.use(VueRouter)


const login = r => require.ensure([], () => r(require('@/components/login/login.vue')), 'login')
const forget = r => require.ensure([], () => r(require('@/components/login/forgetpwd.vue')), 'forget')
const index = r => require.ensure([], () => r(require('@/components/index.vue')), 'index')
const indexout = r => require.ensure([], () => r(require('@/components/indexout.vue')), 'indexout')
let routes = [
  {path: '/forgetPwd',ishidden:true, meta: {title:'忘记密码'}, component: forget},
  {path: '/login',ishidden:true, meta: {title:'登录'}, component: login},
  {path: '/indexlogin',ishidden:false, meta: {title:'首页'}, component: index,children:[]},
  {path: '/indexOut',ishidden:false, meta: {title:'首页'}, component: indexout,children:[]},
]

var router = new VueRouter({
//   linkActiveClass: 'item-active',
//   linkExactActiveClass: 'item-active',
  routes: routes,
  mode: 'history',
  base: '/'
})
let menudata = JSON.parse(window.localStorage.getItem('menu'));
if(menudata){
   if (window != top){
      menudata[0].path = '/indexOut';
      menudata[0].component = 'indexout'
   }else{
      menudata[0].path = '/index';
      menudata[0].component = 'index'
   }
   let route = [];
   MenuUtils(route,menudata);
   store.dispatch('SET_ROUTERS',menudata)
   router.addRoutes(route);
   window.localStorage.removeItem('isloadnode');
}
router.beforeEach((route, redirect, next) => {
    var  isportal = globalconfig.hasportal;
    Vue.$loading.show()
    document.title = '财云通';
    if(!isportal){
      let token = JSON.parse(window.localStorage.getItem('tokenarray'));
      if(token && route.path !== '/login'  && route.path !== '/forgetPwd'){
          if (route.path === '/login' || route.path === '/forgetPwd' || route.path === '/') {
              next({ path: '/index' })
          }else{
              next()
          }
      }else{
         store.dispatch('OUT_ROUTERS');
         store.dispatch('Out_LoadNode');
         store.dispatch('USER_SIGNOUT');
         store.dispatch('TOKEN_SIGNOUT');
         if(route.path !== '/login' && route.path !== '/forgetPwd'){
           next('/login');
         }else{
           next();
         }
      }

    }else{
      let token = JSON.parse(window.localStorage.getItem('tokenarray'));
      if(token){
         if (route.path === '/login' || route.path === '/forgetPwd' || route.path === '/') {
              next({ path: '/index' })
         }else{
              next()
         }
      }else{
         if(route.path !== '/login' && route.path !== '/indexlogin' && route.path !== '/indexOut' && route.path !== '/redirect' && route.path !== '/forgetPwd'){
            logout(1)
         }else{
            if(route.path === '/login'){
               logout(1);
            }else{
               next();
            }
           
         }
      }
      
    }
})
 // 路由跳转后的钩子
 router.afterEach(function (to) {
   Vue.$loading.hide()
 })
export default router
