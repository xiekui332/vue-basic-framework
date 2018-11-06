/**
 * 常用工具类封装
 */
export default class Util {
  /**
   * 设置 document title
   * @param title
   */
  static setDocumentTitle(title) {
    document.title = title && Object.prototype.toString.call(title) === '[object String]' ? title : '';
  }

  /**
   * 返回 兼容的frame
   * @name animationFrame
   * @return {Function}
   */
  static animationFrame() {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) { return setTimeout(callback, 1000 / 60); };
  }

  static cancelAnimationFrame() {
    return window.cancelAnimationFrame ||
      window.webkitCancelAnimationFrame ||
      window.mozCancelAnimationFrame ||
      window.oCancelAnimationFrame ||
      window.msCancelAnimationFrame ||
      clearTimeout;
  }

  /**
   * 获取浏览器版本信息
   * @returns {*}
   */
  static getBrowser() {
    let sys = {};
    const ua = navigator.userAgent.toLowerCase();
    let s;
    (s = ua.match(/edge\/([\d.]+)/)) ? sys.edge = s[1]
      : (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys.ie = s[1]
      : (s = ua.match(/msie ([\d.]+)/)) ? sys.ie = s[1]
        : (s = ua.match(/firefox\/([\d.]+)/)) ? sys.firefox = s[1]
          : (s = ua.match(/chrome\/([\d.]+)/)) ? sys.chrome = s[1]
            : (s = ua.match(/opera.([\d.]+)/)) ? sys.opera = s[1]
              : (s = ua.match(/version\/([\d.]+).*safari/)) ? sys.safari = s[1] : 0;

    if (sys.edge) return {browser: 'Edge', version: sys.edge};
    if (sys.ie) return {browser: 'IE', version: sys.ie};
    if (sys.firefox) return {browser: 'Firefox', version: sys.firefox};
    if (sys.chrome) return {browser: 'Chrome', version: sys.chrome};
    if (sys.opera) return {browser: 'Opera', version: sys.opera};
    if (sys.safari) return {browser: 'Safari', version: sys.safari};
    return {browser: '', version: '0'};
  }

  /**
   * 获取 hash 中的参数
   * @param key
   */
  static getURLHashParameter() {
    window.location.hash = window.location.hash.replace('#//', '#/');
    const hash = window.location.hash || '';
    const hashArray = hash.split('?');
    const hashSearchParamStr = hashArray[1];
    let hashObj = {};
    hashSearchParamStr && hashSearchParamStr.split('&').forEach(v => {
      const list = v.split('=');
      if (list.length === 2) {
        hashObj[list[0]] = list[1];
      }
    });
    return hashObj;
  }

  /**
   * 获取 URL 的 search 参数值
   * @param key
   * @returns {any}
   */
  static getUrlSearchParameter() {
    const search = window.location.search.replace('?', '');
    const searchList = search.split('&');
    let searchObj = {};
    searchList.length > 0 && searchList.forEach(v => {
      const list = v.split('=');
      if (list.length === 2) {
        searchObj[list[0]] = list[1];
      }
    });
    return searchObj;
  }

  /**
   * 生成唯一的 key
   */
  static getRandomKey(len = 6) {
    return Math.random().toString(16).substr(-len);
  }

  /**
   * 生成模拟的 uuid
   */
  static uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}
