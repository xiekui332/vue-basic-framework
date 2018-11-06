import {mapActions, mapGetters} from 'vuex';

import {EventManager} from '../utils';

/**
 * 校验 unionId 是否为 null
 */
export default (component) => ({
  computed: {
    ...mapGetters(['unionId'])
  },
  created() {
    let self = this;
    new EventManager().on('onUserInfoReady', () => {
      if (!self.unionId && self.$parent.getUserInfo) {
        self.setLoading({status: true, text: '获取信息中···'});
        self.$parent.getUserInfo(true);
      }
    });
  },
  render(h) {
    return h(component, {});
  },
  beforeDestroy() {
    new EventManager().off('onUserInfoReady');
  },
  methods: {
    ...mapActions(['setLoading']),
    getUserInfo(param) {
      this.$parent.getUserInfo && this.$parent.getUserInfo(param);
    }
  }
});
