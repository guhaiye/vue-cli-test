import Vue from 'vue'
// export const Set_LoadNode = 'Set_LoadNode' //登录成功
// export const Out_LoadNode = 'Out_LoadNode' //退出登录

export default {
    state: JSON.parse(localStorage.getItem('isloadnode')) || {},
    mutations: {
       Set_LoadNode:(state) => {
          localStorage.setItem('isloadnode', true)
       },
       Out_LoadNode:(state) => {
          localStorage.removeItem('isloadnode')
       }
    },
    actions: {
       Set_LoadNode({commit}) {
          commit('Set_LoadNode')
       },
       Out_LoadNode({commit}) {
          commit('Out_LoadNode')
       }   
    }
}