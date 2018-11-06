import Vue from 'vue';
import Vuex from 'vuex';
import modules from './module';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: modules,
  strict: process.env.NODE_ENV !== 'production'
});
