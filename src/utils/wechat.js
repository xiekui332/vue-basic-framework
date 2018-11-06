import Vue from 'vue';

import store from '../store/store';
import user from '../store/module/user';
import http from '../store/module/http';
import Util from './util';
import EventManager from './event-manager';
import axiosInstance from './axios-instance';
import Url from './url';

const APP_ID = '你的 appid';

const DEFAULT_DATA = {
  appId: APP_ID,
  apiList: [
    'onMenuShareTimeline',
    'onMenuShareAppMessage',
    'chooseImage',
    'uploadImage',
    'previewImage',
    'downloadImage',
    'checkJsApi'
  ],
  errorType: [
    {code: '1', msg: '分享成功'},
    {code: '2', msg: '微信客户端版本过低，请升级最新版本'},
    {code: '3', msg: '获取接口的签名失效，请重新调用方法获取API授权签名'},
    {code: '4', msg: '微信分享失败，请重新分享'},
    {code: '5', msg: '接口访问失败'},
    {code: '6', msg: 'jsApi配置成功'}
  ]
};

/**
 * 微信 api 全局管理器
 */
let instance;
class WeChat {
  constructor() {
    if (!instance) {
      instance = this;
    }
    return instance;
  }

  /**
   * [wxConfig wx jsAPI 配置]
   * @debug  {[type]} data [开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。]
   * @appId  {[type]} data [必填，公众号的唯一标识]
   * @timestamp  {[type]} data [必填，生成签名的时间戳]
   * @nonceStr  {[type]} data [必填，生成签名的随机串]
   * @signature  {[type]} data [必填，签名，见附录1]
   * @jsApiList  {[Array]} data [必填，需要使用的JS接口列表，所有JS接口列表见附录2]
   */
  init(config = {}) {
    let registerData = {
      debug: false,
      appId: DEFAULT_DATA.appId,
      timestamp: config.timestamp,
      nonceStr: config.noncestr,
      signature: config.signature,
      jsApiList: DEFAULT_DATA.apiList
    };
    wx.config(registerData);
    wx.error(res => {
      console.error('wx error' + JSON.stringify(res));
    });
  }

  /**
   * 配置微信分享
   * @param title
   * @param desc
   * @param imgUrl
   * @param link
   * @param from
   */
  share(title, desc, imgUrl, link) {
    wx.ready(() => {
      let data = {
        title,
        desc,
        link,
        imgUrl
      };
      wx.onMenuShareTimeline({
        ...data,
        success: function () {
          // fixme 分享到朋友圈回调
        }});
      wx.onMenuShareAppMessage({
        ...data,
        success: function () {
          // fixme 分享给朋友回调
        }});
    });
  }

  /**
   * 微信的上传相片 api
   * @param config
   * @returns {Promise<any>}
   */
  chooseImage(config) {
    config = config || {
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera']
    };
    return new Promise((resolve, reject) => {
      wx.ready(() => {
        wx.chooseImage({
          ...config,
          success: function (res) {
            let localId = res.localIds[0];
            wx.uploadImage({
              localId: localId,
              isShowProgressTips: 1,
              success: function (res) {
                resolve(localId, res.serverId);
              }
            });
          },
          fail: function (res) {
            reject(res);
          }
        });
      });
    });
  }

  /**
   * 微信的下载图片 api
   * @param config
   * @returns {Promise<any>}
   */
  downloadImage(config) {
    config = config || {
      count: 1,
      sizeType: ['compressed'],
      sourceType: ['album', 'camera']
    };
    return new Promise((resolve, reject) => {
      wx.ready(() => {
        wx.chooseImage({
          ...config,
          success: function (res) {
            wx.uploadImage({
              localId: res.localIds,
              isShowProgressTips: 1,
              success: function (res) {
                resolve(res.serverId);
              }
            });
          },
          fail: function (res) {
            reject(res);
          }
        });
      });
    });
  }

  /**
   * 预览图片接口
   * @param config
   */
  previewImage(config) {
    config = config || {
      current: '',
      urls: []
    };
    wx.previewImage(config);
  }
}

/**
 * 获取 code
 * @param routePath
 * @param queryParam
 */
function getCodeUrl(routePath = '', queryParam) {
  let url = `${location.protocol}//${location.host}/`;
  url += routePath ? `#/${routePath}` : '';
  url += queryParam ? `?${queryParam}` : '';
  console.log('url:', url);
  url = encodeURIComponent(url);
  window.location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APP_ID}&redirect_uri=${url}&response_type=code&scope=snsapi_userinfo&connect_redirect=1&state=${Math.random().toString(16).substr(-6)}#wechat_redirect`;
}

/**
 * 获取 user openId
 * @param routePath
 * @param queryParam
 * @param reRequest
 */
function getUserOpenId(routePath, queryParam, reRequest) {
  const existedUnionId = localStorage.getItem('userUnionId');
  if (existedUnionId) {
    console.log('缓存中的 union_id:', existedUnionId, ', 不发请求');
    http.actions.setLoading(store, {status: false});
    user.actions.setUnionId(store, existedUnionId);
    new EventManager().trigger('onUserInfoReady');
    return;
  }
  const code = Util.getUrlSearchParameter().code;
  console.log('code', code);
  if (code && !reRequest) {
    axiosInstance.post(Url.USER_INFO, {code}).then(res => {
      console.log('用户信息 data', res);
      (!res.unionid || !res.openid) && console.error('返回的用户信息不完整：', res);
      res.telephone != null && user.actions.setTelephoneNumber(store, res.telephone);
      res.openid && user.actions.setOpenId(store, res.openid);
      res.unionid && user.actions.setUnionId(store, res.unionid);
      res.nickname != null && user.actions.setNickname(store, res.nickname);
      res.headimgurl && user.actions.setHeadImgUrl(store, res.headimgurl);
      new EventManager().trigger('onUserInfoReady');
    }).catch((res) => {
      console.error('获取用户信息出错,', res);
      Vue.prototype.$toast((res && res.msg) || '您的授权信息有误，请退出之后重新进入');
    });
  } else {
    console.log('没有 code 或者 code 被使用过，微信即将重定向');
    getCodeUrl(routePath, queryParam);
  }
}

export {
  WeChat,
  getUserOpenId
};
