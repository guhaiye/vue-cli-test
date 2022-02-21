export default {
    state: {
        codeParams:JSON.parse(localStorage.getItem('codeRules'))|| {}
    },
    mutations: {
        setCodeParams:(state,val) => {
            localStorage.setItem('codeRules', JSON.stringify(val));
            Object.assign(state,{codeParams:val})
        }
    },
    actions: {
        setCodeParams({commit},val){
            commit('setCodeParams',val)
        }
    }
}