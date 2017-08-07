import Vue  from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        loginID: 0,
        check:0,
        checkid:0
    },
    mutations: {
        changeState(state, json) {
            for (var key in json) {
                state[key] = json[key];
            }
        }

    }
})