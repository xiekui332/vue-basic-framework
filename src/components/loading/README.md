## 未关注公众号弹框

### 使用指南
```html
<unconcerned-dialog @onMaskClick="setUnconcernedDialogVisibility" v-if="showUnconcernedDialog"></unconcerned-dialog>
```

```js
data() {
  return {
    showUnconcernedDialog: false
  };
},
setUnconcernedDialogVisibility(showUnconcernedDialog) {
  this.showUnconcernedDialog = !!showUnconcernedDialog;
}
```

### 具体参数
| 参数       | 说明      | 类型       | 默认值       | 必须      |
|-----------|-----------|-----------|-------------|-------------|
| title | 弹窗标题 | String  | 分享到 | |
| maskClosable | 点击朦层是否允许关闭弹窗 | Boolean | false | |
| cancelButtonText | 取消按钮文案 | String  | 取消 | |
| confirmButtonText | 确定按钮文案 | String  | 确定 | |
| hideTitle | 是否隐藏标题 | Boolean  | false | |
| hideCancelButton | 是否隐藏取消按钮 | Boolean  | false | |
| hideFooter | 是否隐藏底部按钮 | Boolean  | false | |

