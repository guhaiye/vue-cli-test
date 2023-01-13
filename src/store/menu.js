// export const SET_ROUTERS = 'SET_ROUTERS' //登录成功
// export const OUT_ROUTERS = 'OUT_ROUTERS' //退出登录

export default {
    state: JSON.parse(localStorage.getItem('menu')) || {},
    mutations: {
       SET_ROUTERS:(state, routers) => {
          localStorage.setItem('menu', JSON.stringify(routers));
          Object.assign(state, routers);
       },
       OUT_ROUTERS:(state) => {
          localStorage.removeItem('menu')
       }
    },
    actions: {
       SET_ROUTERS({commit}, routers) {
          commit('SET_ROUTERS',routers)
       },
       OUT_ROUTERS({commit}) {
          commit('OUT_ROUTERS')
       }   
    }
}