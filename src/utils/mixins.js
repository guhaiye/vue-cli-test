import mixins from './globalMixins'
const globalMixin = {
    install:(Vue)=>{
        Object.keys(mixins).forEach(key => {
            Vue.mixin(mixins[key])
        })
    }
}
export default globalMixin