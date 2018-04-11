import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';
import getters from './getters';
import home from './modules/home';
import city from './modules/city';

Vue.use(Vuex);

const state = {
    count: 0,
    anotherIncrement: 0
};

export default new Vuex.Store({
    modules: {
        home,
        city
    },
    state,
    getters,
    actions,
    mutations,
});
