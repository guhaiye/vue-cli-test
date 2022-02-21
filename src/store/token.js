import Vue from 'vue'

// export const USER_SIGNIN = 'USER_SIGNIN' //登录成功
// export const USER_SIGNOUT = 'USER_SIGNOUT' //退出登录

export default {
    state: JSON.parse(localStorage.getItem('tokenarray')) || {},
    mutations: {
        TOKEN_SIGNIN: (state, tokenarray) => {
            localStorage.setItem('tokenarray', JSON.stringify(tokenarray))
            Object.assign(state, tokenarray)
        },
        TOKEN_SIGNOUT: (state) => {
            localStorage.removeItem('tokenarray')
            Object.keys(state).forEach(k => Vue.delete(state, k))
        }
    },
    actions: {
        TOKEN_SIGNIN({commit}, tokenarray) {
            commit('TOKEN_SIGNIN', tokenarray)
        },
        TOKEN_SIGNOUT({commit}) {
            commit('TOKEN_SIGNOUT')
        }
    }
}