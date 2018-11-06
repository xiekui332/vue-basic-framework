import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store/store';

import showToast from './components/toast';
import dialog from './components/dialog/dialog';
import unconcernedDialog from './components/unconcerned-dialog/unconcerned-dialog';
import axiosInstance from './utils/axios-instance';

window.Promise = Promise;

Vue.prototype.$toast = showToast;
Vue.prototype.$http = axiosInstance;

const isDebugMode = process.env.NODE_ENV !== 'production';

Vue.config.debug = isDebugMode;
Vue.config.devtools = isDebugMode;
Vue.config.productionTip = false;

// 全局注册公共组件，打包到 app.js 里面，优化体积
Vue.component('project-dialog', dialog);
Vue.component('unconcerned-dialog', unconcernedDialog);

new Vue({  // eslint-disable-line
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
});
