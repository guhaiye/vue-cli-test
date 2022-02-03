import zypcInput from './Input/input.vue'
import Banner from './Banner/banner.vue'
const componnetsAll = {
    zypcInput,Banner
}
const components = {
   install(Vue){
       Object.keys(componnetsAll).forEach(name=>{
          Vue.component(name,componnetsAll[name])
       })
   } 
}
/* 支持使用标签的方式引入 */
if(typeof window !== 'undefined' && window.Vue){
    window.Vue.use(components);
}
export default components;