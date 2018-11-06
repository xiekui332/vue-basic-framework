/**
 * 通用全局事件管理器 单例模式
 */
let instance;

class EventManager {
  constructor() {
    if (!instance) {
      this.onObj = {};
      this.oneObj = {};
      instance = this;
    }
    return instance;
  }

  /**
   * 使用 on 进行订阅的函数，每次事件发生响应时都会被触发
   */
  on(key, fun) {
    if (key && fun && typeof key === 'string' && typeof fun === 'function') {
      this.onObj[key] = this.onObj[key] || [];
      this.onObj[key].push(fun);
    } else {
      console.error('incorrect parameters: the type of parameter key must be string, and the type of parameter fun must be function');
    }
  }

  /**
   * 使用 one 进行订阅的函数，只会触发一次
   */
  one(key, fun) {
    if (key && fun && typeof key === 'string' && typeof fun === 'function') {
      this.oneObj[key] = this.oneObj[key] || [];
      this.oneObj[key].push(fun);
    } else {
      console.error('incorrect parameters: the type of parameter key must be string, and the type of parameter fun must be function');
    }
  }

  /**
   * 解除所有订阅了某个事件的所有函数
   */
  off(key) {
    if (key && typeof key === 'string') {
      this.oneObj[key] = [];
      this.onObj[key] = [];
    } else {
      console.error('incorrect parameters: the type of parameter key must be string');
    }
  }

  /**
   * 解除所有
   */
  offAll() {
    this.oneObj = {};
    this.onObj = {};
  }

  /**
   * 用于发布者发布事件，将除第一参数（事件名）的其他参数，作为新的参数，触发使用 one 与 on 进行订阅的函数
   */
  trigger(key, ...args) {
    if (key && typeof key === 'string') {
      if (this.onObj[key] !== undefined && this.onObj[key].length > 0) {
        this.onObj[key].forEach(v => {
          v.apply(null, args);
        });
      }
      if (this.oneObj[key] !== undefined && this.oneObj[key].length > 0) {
        this.oneObj[key].forEach(v => {
          v.apply(null, args);
        });
        this.oneObj[key] = [];
      }
    } else {
      console.error('incorrect parameters: the type of parameter key must be string');
    }
  }
}

export default EventManager;
