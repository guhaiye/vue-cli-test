import Vue from 'vue'
import Vuex from 'vuex'
import user from './user'
import menu from './menu'
import linkurldata from './linkurl'
import isloadnode from './isloadnode'
import tokenarray from './token'
import tenantid from './tenant'
import setCodeParams from './code-params'
Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        user,
        menu,
        linkurldata,
        isloadnode,
        tokenarray,
        tenantid,
        setCodeParams
    }
})
export default store
