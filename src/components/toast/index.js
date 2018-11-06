import Vue from 'vue';

import toastComponent from './toast.vue';

const ToastConstructor = Vue.extend(toastComponent);

/**
 * toast function
 * @param text
 * @param duration
 * @param callback
 */
export default function showToast(text, duration = 3000, callback) {
  duration += 1250;
  const toastDom = new ToastConstructor({
    el: document.createElement('div'),
    data() {
      return {
        text: text,
        showWrap: true,
        showContent: true
      };
    }
  });
  document.body.appendChild(toastDom.$el);
  setTimeout(() => { toastDom.showContent = false; }, duration - 1250);
  setTimeout(() => {
    toastDom.showWrap = false;
    callback && callback();
  }, duration);
}
