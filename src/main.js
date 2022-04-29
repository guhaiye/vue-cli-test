import Vue from 'vue'
import './viewDesignBabel'
import directives from './misc/directives'
import router from './routers'
import store from './store/'
import api from './api'
import loading from '@/misc/loading.js' // 引入loading

import 'babel-polyfill'

import './misc/dropdown'
import 'font-awesome/css/font-awesome.min.css'
import './assets/themify-icons/themify-icons.css'
import './assets/css/bootstrap.min.css'
import '../my-theme/index.less'
import './assets/css/plugins.scss'
import './assets/css/style.scss'
import './assets/css/fonts.scss'

import { hasPermissions} from './misc/utils'
Vue.prototype.hasPermissions = hasPermissions // 注入权限验证方法到所有组件

// register custom directives注册自定义指令
Object.keys(directives).forEach(d => Vue.directive(d, directives[d]))

Vue.prototype.globalconfig = globalconfig;
Vue.prototype.$Message = Message
Vue.prototype.globalpagesize = 10
Vue.prototype.$api = api;
Vue.use(loading) //页面loading效果
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h('router-view', {attrs: {id: 'app'}}),
  store,
  router
})
Vue.config.devtools = true
