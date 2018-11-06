<template>
  <!--通用弹框-->
  <transition name="project-dialog-fade">
    <div class="flex-row-center container" @touchmove.stop @click="onMaskClick">
      <div class="flex-column content" @click.stop>
        <div v-if="!hideTitle" class="dialog-header">
          <slot name="header"><p>{{title}}</p></slot>
        </div>
        <div class="flex-column-start dialog-body">
          <slot name="body"></slot>
        </div>
        <div v-if="!hideFooter" class="flex-row-around dialog-footer">
          <slot name="footer">
            <button v-if="!hideCancelButton" class="dialog-footer-btn cancel-btn" @click.stop="onBtnClick('cancel')">{{cancelButtonText}}</button>
            <button class="dialog-footer-btn confirm-btn"  @click.stop="onBtnClick('confirm')">{{confirmButtonText}}</button>
          </slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    props: {
      title: {
        type: String,
        default: '提示'
      },
      hideTitle: {
        type: Boolean,
        default: false
      },
      maskClosable: {
        type: Boolean,
        default: true
      },
      hideCancelButton: {
        type: Boolean,
        default: false
      },
      cancelButtonText: {
        type: String,
        default: '取消'
      },
      hideFooter: {
        type: Boolean,
        default: false
      },
      confirmButtonText: {
        type: String,
        default: '确定'
      }
    },
    data() {
      return {};
    },
    methods: {
      onBtnClick(key) {
        if (key === 'cancel') {
          this.closeDialog();
        } else {
          this.$emit('onDialogConfirmBtnClick', this.closeDialog);
        }
      },
      onMaskClick() {
        this.$props.maskClosable && this.closeDialog();
      },
      closeDialog() {
        this.$emit('closeDialog');
      }
    }
  };
</script>

<style lang="less" scoped>
  .project-dialog-fade-enter, .project-dialog-fade-leave-active {
    opacity: 0;
  }
  .project-dialog-fade-enter-active, .project-dialog-fade-leave-active {
    transition: opacity .5s ease
  }

  .container {
    position: fixed;
    left: 0;
    top: 0;
    height: 100vh;
    overflow: hidden;
    background: rgba(0, 0, 0, .6);
    z-index: 100;
    .content {
      width: 80vw;
      height: auto;
      box-sizing: border-box;
      padding: 15px 5%;
      max-width: 100%;
      max-height: 100%;
      overflow: hidden;
      border-radius: 5px;
      background-color: #fff;
      position: relative;
      .dialog-header {
        width: 100%;
        color: #333;
        font-size: 22px;
        font-weight: bold;
      }
      .dialog-body {
        width: 100%;
        margin: 10px 0;
        color: #333;
        font-size: 15px;
        align-items: flex-start;
      }
      .dialog-footer {
        width: 100%;
        text-align: right;
        padding-top: 8px;
        border-top: 1px solid #eee;
        .dialog-footer-btn {
          width: 50%;
          background: none;
          outline: none;
          margin-top: 10px;
          padding: 5px 0;
          font-weight: bold;
          font-size: 15px;
          border: none;
          &:not(:last-child) {
            border-right: 1px solid #eee;
          }
        }
        .cancel-btn {
          color: #a9a9a9;
        }
        .confirm-btn {
          color: #FC627A;
        }
      }
    }
  }

</style>
