import Vue from 'vue'

// export const USER_SIGNIN = 'USER_SIGNIN' //登录成功
// export const USER_SIGNOUT = 'USER_SIGNOUT' //退出登录

export default {
    state: JSON.parse(localStorage.getItem('tenantid')) || {},
    mutations: {
        TENANT_SIGNIN: (state, tenantid) => {
            localStorage.setItem('tenantid', JSON.stringify(tenantid));
            Object.assign(state, tenantid)
        },
        TENANT_SIGNOUT: (state) => {
            localStorage.removeItem('tenantid');
            Object.keys(state).forEach(k => Vue.delete(state, k))
        }
    },
    actions: {
        TENANT_SIGNIN({commit}, tenantid) {
            commit('TENANT_SIGNIN', tenantid)
        },
        TENANT_SIGNOUT({commit}) {
            commit('TENANT_SIGNOUT')
        }
    }
}