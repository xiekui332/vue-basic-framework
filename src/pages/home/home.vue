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
      this.initWXShare();
    },
    mounted() {
    },
    beforeDestroy() {
    },
    methods: {
      ...mapActions(['setUserSubscribe', 'setLoading', 'setFirstGame']),
      // fixme 用 checkUnionId 装饰的组件会自动调用 requestData 用于获取初始数据。
      async requestData() {
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
      initWXShare() {
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
