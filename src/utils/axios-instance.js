import Vue from 'vue';
import axios from 'axios';

import http from '../store/module/http';
import store from '../store/store';

let axiosInstance = axios.create({
  // 请求时间超过10秒视为超时
  timeout: 10000
});

// 请求拦截
axiosInstance.interceptors.request.use((config) => {
  config.data = config.data || {};
  if (config.data.hideLoading === true) {
    delete config.data.hideLoading;
  } else {
    http.actions.setLoading(store, {status: true, text: config.data.loadingText});
    delete config.data.loadingText;
  }
  return config;
}, function (error) {
  Vue.prototype.$toast('网络请求错误');
  return Promise.reject(error);
});
// 回应拦截
axiosInstance.interceptors.response.use((response) => {
  http.actions.setLoading(store, {status: false});
  if (response.data.status === true) {
    return Promise.resolve(response.data.data);
  }
  let hideToast = JSON.parse(response.config.data).hideToast || false;
  if (!hideToast) {
    Vue.prototype.$toast(response.data.msg || '网络回应错误');
  }
  return Promise.reject(response.data);
}, (error) => {
  http.actions.setLoading(store, false);
  const response = error.response;
  const msg = (response && response.data && response.data.message) || error.message;
  Vue.prototype.$toast(msg || '服务器出错');
  if (response) {
    return Promise.reject(response);
  } else {
    return Promise.reject(error.message);
  }
});

export default axiosInstance;
