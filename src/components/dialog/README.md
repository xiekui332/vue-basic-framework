## 通用弹出框

### 使用指南
```html
<button @click="showDialog">打开弹框</button>
···
<project-dialog
  v-show="dialogVisibility"
  :maskClosable="false"
  @closeDialog="closeDialog"
  @onDialogConfirmBtnClick="onDialogConfirmBtnClick">
  <div slot="header">提示</div>
  <div slot="body">
    <p>提示</p>
    <p>提示</p>
    <p>提示</p>
  </div>
</project-dialog>
```

```js
onDialogConfirmBtnClick(close) {
  console.log('点击了确定按钮');
  close && close();
},
showDialog() {
  this.dialogVisibility = true;
},
closeDialog() {
  this.dialogVisibility = false;
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

