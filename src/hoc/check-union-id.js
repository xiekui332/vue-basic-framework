import {mapActions, mapGetters} from 'vuex';

import EventManager from '../utils/event-manager';

/**
 * 校验 unionId 是否为 null
 */
export default (component) => ({
  computed: {
    ...mapGetters(['unionId'])
  },
  render(h) {
    return h(component, {});
  },
  mounted() {
    new EventManager().on('onUserInfoReady', this.onUserInfoReady);
    this.requestUnionId();
  },
  beforeDestroy() {
    new EventManager().off('onUserInfoReady');
  },
  methods: {
    ...mapActions(['setLoading']),
    onUserInfoReady() {
      this.$children.forEach(v => {
        if (!v.requestData) {
          console.error('用 checkUnionId 装饰的页面的 methods 中必须有 requestData function 用于获取初始数据。');
        } else {
          v.requestData();
        }
      });
    },
    getUserInfo() {
      this.$parent.getUserInfo && this.$parent.getUserInfo();
    },
    requestUnionId() {
      if (this.unionId) return;
      this.$toast('获取信息中');
      this.getUserInfo();
    }
  }
});
