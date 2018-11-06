
/**
 * 倒计时类
 *
 * 用法：
 * 1、在需要的地方初始化倒计时：
 *    let self = this;
 *    self.countDown = self.countDown || new CountDown();
 *    // 99990 即为倒计时时间
 *    self.countDown.end().updateConfig({diffTime: 9990}).start((res) => {
 *       // res 为 null 代表倒计时结束
 *       self.setData({countDownData: res || null});
 *       !res && self.requestData();  // 倒计时结束应该刷新页面
 *    });
 * 2、需要的地方清除定时器：this.countDown && this.countDown.end();
 * 3、beforeDestroy 里面清除引用：this.countDown = null;
 */
export default class CountDown {
  /**
   * 配置显示的选项，目前有 天、时、分、秒 4 项。
   * config.day           是否显示 天，默认显示，设置为 false 不显示
   * config.hour          是否显示 时，默认显示，设置为 false 不显示
   * config.minute        是否显示 分，默认显示，设置为 false 不显示
   * config.second        是否显示 秒，默认显示，设置为 false 不显示
   * @param config
   */
  constructor(config) {
    config = typeof config === 'object' ? {...config} : {
      day: true,
      hour: true,
      minute: true,
      second: true
    };
    config.day = config.day || true;
    config.hour = config.hour || true;
    config.minute = config.minute || true;
    config.second = config.second || true;
    this.config = config;
  }

  /**
   * 更新配置，一般用于更新倒计时时间（一般为秒），也可更新显示的选项。
   * config.diffTime，        倒计时秒数，必填，其他配置同 constructor。
   * @param config
   */
  updateConfig(config) {
    if (typeof config !== 'object') {
      console.error('Incorrect parameters!');
      return this;
    }
    Object.assign(this.config, config);
    if (typeof config.diffTime !== 'number' || !config.diffTime) console.error('the parameter diffTime must be number');
    return this;
  }

  startInterval(callback) {
    let self = this;
    self.config.diffTime = self.config.diffTime || 0;
    let diffTime = self.config.diffTime;
    diffTime -= 1;
    if (diffTime <= 0) {
      self.end();
      if (diffTime < 0) return;
      callback();
      return;
    }
    self.config.diffTime = diffTime;
    let d = Math.floor(diffTime / 60 / 60 / 24);
    let h = Math.floor((diffTime / 60 / 60) % 24);
    let m = Math.floor((diffTime / 60) % 60);
    let s = Math.floor(diffTime % 60);
    // d = d < 10 ? `0${d}` : d;
    h = h < 10 ? `0${h}` : h;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    let countDownData = {};
    self.config.day && Object.assign(countDownData, {day: d});
    self.config.hour && Object.assign(countDownData, {hour: h});
    self.config.minute && Object.assign(countDownData, {minute: m});
    self.config.second && Object.assign(countDownData, {second: s});
    callback(countDownData);
  }

  start(callback = () => {}) {
    this.timer = setInterval(() => this.startInterval(callback), 1000);
  }

  end() {
    this.timer != null && clearInterval(this.timer);
    return this;
  }
}
