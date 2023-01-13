import loading from '@/misc/loading.js' // 引入loading
import 'babel-polyfill'
import 'font-awesome/css/font-awesome.min.css'
import DatePickers from 'szyh-date-picker'
import Vue from 'vue'
import api from './api'
import './assets/css/bootstrap.min.css'
import '../new-theme/index.less'
import './assets/css/fonts.scss'
import './assets/css/plugins.scss'
import './assets/css/style.scss'
import './assets/themify-icons/themify-icons.css'
import './assets/css/fonts.scss'
import directives from './misc/directives'
import './misc/dropdown'
import {hasPermissions} from './misc/utils'
import globalVue from './resetViewDesign'
import router from './routers'
import store from './store/'
import './viewDesignBabel'
import './vxeTable'
import { initTheme } from '../new-theme/theme'
// require('./mock/mock.js')
Vue.prototype.hasPermissions = hasPermissions // 注入权限验证方法到所有组件

// register custom directives注册自定义指令
Object.keys(directives).forEach(d => Vue.directive(d, directives[d]))

Vue.prototype.globalconfig = globalconfig;
Vue.prototype.globalpagesize = 10
Vue.prototype.$api = api;
Vue.use(loading) //页面loading效果
Vue.use(globalVue)
Vue.use(DatePickers)
initTheme()
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h('router-view', {attrs: {id: 'app'}}),
  store,
  router
})
Vue.config.devtools = true
