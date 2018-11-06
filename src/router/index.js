import Vue from 'vue';
import Router from 'vue-router';

import {Util} from '../utils';
import store from '../store/store';
import http from '../store/module/http';
import HomeView from '../pages/home/home';
import {checkUnionId} from '../hoc';

const NotFoundView = () => import('../pages/not-found/not-found-view');
const OtherView = () => import('../pages/home/other');
const prodMode = process.env.NODE_ENV === 'production';

Vue.use(Router);

/**
 * 设置项：
 *
 * checkUnionId: 如果需要在开始之前需要获取用户的 unionId，则接入 checkUnionId
 * meta:
 *    title:
 *    needSubscribe:  进入之前是否需要检测是否是已关注用户
 *    targetUrl:      如果不是已关注用户，需要跳转的页面路径
 */
const router = new Router({
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      // component: checkUnionId(HomeView), // fixme 如果前置条件是需要关注公众号才能继续下一步，则用这个
      component: HomeView,
      meta: {
        title: '万圣节',
        keepAlive: true
      }
    },
    {
      path: '/other',
      name: 'other',
      component: OtherView,
      meta: {
        needSubscribe: true,
        targetUrl: '/home'
      }
    },
    {
      path: '*',
      name: 'NotFoundView',
      component: NotFoundView
    }
  ]
});

router.beforeEach((to, from, next) => {
  http.actions.setLoading(store, {status: true});
  const metaData = to.meta || {};
  metaData.title && Util.setDocumentTitle(metaData.title);
  if (prodMode && metaData.needSubscribe && metaData.targetUrl) {
    store.getters.userHadSubscribed ? next() : next({path: metaData.targetUrl});
  } else {
    next();
  }
});
router.afterEach(route => {
  http.actions.setLoading(store, {status: false});
});

export default router;
