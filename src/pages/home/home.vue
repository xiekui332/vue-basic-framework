<template>
  <div class="container flex-column-center">
    <div>home</div>
    <!--未关注公众号弹框-->
    <unconcerned-dialog @onMaskClick="setUnconcernedDialogVisibility" v-if="showUnconcernedDialog"></unconcerned-dialog>
  </div>
</template>

<script>
  import {mapActions, mapGetters} from 'vuex';
  import {Url, WeChat} from '../../utils';

  export default {
    name: 'home',
    data() {
      return {
        showUnconcernedDialog: false
      };
    },
    computed: {
      ...mapGetters(['unionId', 'userHadSubscribed'])
    },
    created() {
      this.initWXSahre();
    },
    mounted() {
      this.requestData();
    },
    beforeDestroy() {
    },
    methods: {
      ...mapActions(['setUserSubscribe', 'setLoading', 'setFirstGame']),
      async requestData() {
        if (!this.unionId) {
          this.setLoading({status: true, text: '获取信息中···'});
          this.$parent.getUserInfo(true);
        }
        if (!this.unionId) {
          this.$toast('请允许授权');
          this.setLoading({status: false});
          return;
        }
        if (this.userHadSubscribed) {
          this.start();
          return;
        }
        const res = await this.$http.post(Url.IS_USER_SUBSCRIBE, {union_id: this.unionId});
        this.setUserSubscribe(res.subscribe);
        if (res.subscribe) {
          this.start();
        } else {
          this.setUnconcernedDialogVisibility(true);
        }
      },
      start() {
      },
      setUnconcernedDialogVisibility(showUnconcernedDialog) {
        this.showUnconcernedDialog = !!showUnconcernedDialog;
      },
      initWXSahre() {
        let title = '分享标题';
        let link = `${location.protocol}//${location.host}`;
        let desc = '分享描述';
        let image = '分享出去的图片链接';
        new WeChat().share(title, desc, image, link);
      }
    }
  };
</script>

<style scoped lang="less">
  .container {
    overflow: hidden;
  }
</style>
