<style lang="less">
  @import "./style/reset.css";
  @import "./style/base";
</style>
<template>
  <div id="app">
    <keep-alive>
      <router-view v-if="$route.meta.isKeepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.isKeepAlive"></router-view>
    <loading></loading>
  </div>
</template>

<script>
  import fastClick from 'fastclick';

  import {Util, WeChat, getUserOpenId, Url} from './utils';
  import loading from './components/loading/loading';

  export default {
    name: 'app',
    data() {
      return {
      };
    },
    computed: {
    },
    components: {
      loading
    },
    created() {
      // this.getSignature(); // fixme 用于请求微信签名，设置 wx-js-sdk
      // this.getUserInfo();  // fixme 用于请求用户信息（unionId、nickname、telephone···）
    },
    mounted() {
      fastClick.attach(document.body);
      // fixme 全局参数 1rem = 37.5px
      let screenHeight = document.body.clientHeight;
      let u = navigator.userAgent;
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1;
      if (isAndroid) {
        document.body.style.height = screenHeight + 'px';
      }
    },
    methods: {
      async getSignature() {
        let domainUrl = location.href.split('#')[0];
        const res = await this.$http.post(Url.SIGNATURE, {url: domainUrl});
        res && new WeChat().init(res);
      },
      getUserInfo(reRequest = false) {
        console.log('search 参数', this.$route.query);
        // getUserOpenId('home', '', reRequest); // fixme 项目部署在服务器之后，请打开
      }
    }
  };
</script>
