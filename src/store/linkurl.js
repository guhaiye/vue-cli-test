import Vue from 'vue'
export default {
    state: {
        urllink:''
    },
    mutations: {
        SET_URLLINK:(state, val) => {
           state.urllink = val;
        },
    },
    actions: {
        SET_URLLINK({ commit }, val) {
          commit('SET_URLLINK', val)
        },
    }
}