<template>
  <!--未关注公众号弹框-->
  <transition name="unconcerned-dialog-fade">
    <div class="unconcerned-dialog-container" @click="onMashClick" @touchstart="onTouchStart" @touchend="onTouchEnd">
      <div class="dialog-content" @click.stop="onQrCodeClick">
        <!--fixme 替换为你的二维码-->
        <!--<img class="qr-code" src="../../assets/image/公众号二维码.png" alt="">-->
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'unconcernedDialog',
    props: {
    },
    data() {
      return {};
    },
    methods: {
      onMashClick() {
        this.$emit('onMaskClick', false);
      },
      onTouchStart() {
        this.touchStartTime = Date.now();
      },
      onTouchEnd() {
        const touchDuration = (Date.now() - this.touchStartTime) / 1000;
        if (touchDuration > 2) {
          // fixme 检测用户长按动作
        }
      },
      onQrCodeClick() {
        let self = this;
        wx.miniProgram.getEnv((res) => {
          if (res.miniprogram) {
            self.$toast('小程序环境');
            wx.miniProgram.switchTab({url: '/pages/home/home'});
          }
        });
      }
    }
  };
</script>

<style scoped lang="less">
  @import "../../style/base";
  .unconcerned-dialog-fade-enter, .unconcerned-dialog-fade-leave-active {
    opacity: 0;
  }
  .unconcerned-dialog-fade-enter-active, .unconcerned-dialog-fade-leave-active {
    transition: opacity .5s ease
  }
  .unconcerned-dialog-container {
    &:extend(.flex-column-center);
    width: @mb-content-width;
    height: @mb-content-height;
    position: fixed;
    left: 0;
    top: 0;
    overflow: hidden;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.6);
    .dialog-content {
      &:extend(.flex-column-around);
      width: 78vw;
      height: 82vw;
      border-radius: 5px;
      background-color: #fff;
      text-align: center;
      .qr-code {
        width: 100%;
        height: 100%;
        border: none;
        -webkit-user-select: none;
      }
    }
  }
</style>
