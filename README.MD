# vue-basic-framework

> 通用公众号网页开发 vue 项目框架

## 目录结构
```
├── build                  webpack 配置文件目录
├── config                 vue 配置文件目录
├── dist                   生产环境下最终生成的文件目录
├── node_modules           项目依赖目录
├── src                    开发目录
|   ├── assets             资源目录
|   ├── components         组件
|   |   └── com_a.vue      可复用的组件 a
|   ├── pages              页面目录
|   |   └── MainView.vue   主页面
|   ├── router             路由
|   ├── style              全局样式目录
|   ├── utils              常用工具类封装
|   ├── App.vue            主组件
|   └── main.js            入口文件，引入 vue 框架，根组件及路由设置，初始化 Vue
├── static                 静态资源目录，会直接复制到 dist 目录下，使用时需要绝对路径引入
|── .babelrc               babel 配置文件
|── .editorconfig          IDE 配置文件
|── .eslintignore          
|── .eslintrc.js           eslint 配置文件
|── .gitignore
|── .npmrc                 npm 配置文件
|── .postcssrc.js          postcss 配置文件
|── index.ejs              html 模板文件
|── package.json           项目的 package 配置
└── README.md              说明文档
```

## 可执行脚本
``` bash
npm install               # 安装项目所需依赖
npm run dll               # 将第三方依赖打为 vendor.dll.js，之后无需再次编译，仅用于开发环境中
npm start                 # 启动项目
npm run lintfix           # 自动修复 lint 出的错误，比如语句末尾的分号
npm run build             # 打包项目
npm run build --report    # 生成打包之后的分析页面
```
ps：第一次启动之前或者依赖变化之后，都需要运行 `npm run dll`

## 内置的功能
- 微信 js-sdk 的 api
- 静默检测用户是否已关注公众号，未关注会重定向，然后重新获取授权
- 内置组件（已全局注册）
  a. 通用 dialog
  b. 通用 loading
  c. 通用 toast
  d. 通用公众号未关注弹框
- 内置工具类
  a. axios Ajax 请求类
  b. 通用倒计时类
  a. 通用事件管理类
  a. wx 封装类
  a. 其他 Util
  
## webpack 配置说明
1. 开发阶段使用 dll 加速
2. 使用 happypack 开启多线程编译
3. 跨域：设置 config/index/dev.proxyTable

## 用法说明
- dialog
  详见[用法说明](./src/components/dialog/README.md)
- 公众号弹框
  详见[用法说明](./src/components/unconcerned-dialog/README.md)
- toast
  ```js
  this.$toast('message', duration, callback);
  ```
- loading
  ```js
  import {mapActions, mapGetters} from 'vuex';

  methods: {
    ...mapActions([ 'setLoading'])
  }

  // text 提示信息，默认为'加载中···'，选填
  this.setLoading({status: true, text: '获取信息中···'});
  this.setLoading({status: false});
  ```
- checkUnionId 高阶组件，校验 unionId 是否为 null
  ```js
  // router 里面
  import HomeView from '@/pages/home/home';
  // ps: 使用这个的组件不能为动态加载
  import {checkUnionId} from '@/hoc';

  const OtherView = () => import('@/pages/home/other');

  const router = new Router({
    routes: [
      {
        path: '/home',
        name: 'home',
        component: checkUnionId(HomeView),
        meta: {
          title: '万圣节',       // 页面标题
          keepAlive: true
        }
      },
      {
        path: '/other',
        name: 'other',
        component: OtherView,
        meta: {
          needSubscribe: true,  // 进入之前是否需要检测是否是已关注用户
          targetUrl: '/home'    // 如果不是已关注用户，需要跳转的页面路径
        }
      }
    ]
  });
  ```
- axios
  ```js
  // hideLoading 是否隐藏 loading，默认为 false，选填
  // loadingText 提示信息，默认为 '加载中···'，选填
  // hideToast   请求成功之后是否隐藏 toast，默认为 false，选填
  // 内部做了处理，返回数据的格式必须为 {status: true, data: {}, msg: 'message'}
  this.$http.get(url, {...param, hideLoading: false, loadingText: '', hideToast: false});
  // this.$http.post
  ```
- 倒计时类
  ```js
  import {CountDown} from '@/utils';

  // 1、在需要的地方初始化倒计时：
  let self = this;
  self.countDown = self.countDown || new CountDown();
  // 99990 即为倒计时时间
  self.countDown.end().updateConfig({diffTime: 9990}).start((res) => {
    // res 为 null 代表倒计时结束，倒计时结束应该刷新页面
    res ? (self.countDownData = res) : self.requestData();
  });
  // 2、需要的地方清除定时器：
  this.countDown && this.countDown.end();
  // 3、beforeDestroy 里面清除引用
  this.countDown = null;
  ```
- 事件管理类（一般用于跨组件通信）
  ```js
  import {EventManager} from '@/utils';

  // 1、在需要的地方通过唯一的事件 key 注册回调
  new EventManager().on('onUserInfoReady', callback);
  // 3、beforeDestroy 里面清除对应的事件 key
  new EventManager().off('onUserInfoReady');
  // 2、需要的地方触发事件 key
  new EventManager().trigger('onUserInfoReady');
  ```
- static 文件夹
  js 下面存放一些第三方依赖库，会自动添加到 html 里面，可以数字开头给文件设定添加顺序
  image 下存放不需要 webpack 处理的图片

## 编辑器支持 IDEA

Setting -> Languages -> JavaScript -> 修改为 **ECMAScript 6**

