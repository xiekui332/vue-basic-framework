<template>
  <!--404页面-->
  <div class="flex-column-center container">
    <div class="not-found-desc">您访问的页面不存在！</div>
    <router-link to="/" class="back-to-home">回到首页</router-link>
  </div>
</template>

<script>
  export default {
    name: 'NotFoundView',
    data() {
      return {};
    }
  };
</script>

<style scoped lang="less">
  @import "../../style/base";
  .container {
    padding: 0 5vw;
    .not-found-desc {
      font-size: 30px;
      font-weight: bold;
      color: @color-text-disabled;
    }
    .back-to-home {
      margin-top: 7px;
      color: #333;
      font-weight: bold;
      font-size: 15px;
    }
  }
</style>
