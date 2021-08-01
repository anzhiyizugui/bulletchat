/* eslint-disable */

const { initStyle } = require('./style');

// 用于判断是否有定位状态
const positionList = ['relative', 'absolute', 'fixed'];

/**
 * @Author: SAM
 * @Description: 弹幕容器
 * @Date: 2021-08-01 02:25:54
 */
class BulletContainer {
  // 是否已经进行初始化过样式
  static initStyletate = false;

  constructor(hashKey = 'data-v-bulletChat') {
    if (!BulletContainer.initStyletate) {
      // 如果没有创建过样式，进行样式初始化
      initStyle(hashKey);
      // 修改状态为已初始化
      BulletContainer.initStyletate = true;
    }

    // 创建一个容器
    this.dom = document.createElement('div');

    // 添加容器class
    this.dom.classList.add('bulletChatPanel');

    // 添加唯一标识
    this.dom.setAttribute(hashKey, '');

    // 记录唯一标识
    this.key = hashKey;
  }

  /**
   * @Author: SAM
   * @Description: 将弹幕挂载到容器
   * @Date: 2021-08-01 02:41:57
   * @param {HTMLElement} parentDom 容器节点
   * @return {this} 当前实例
   */
  mounted(parentDom) {
    // 取外部容器样式
    const parentCss = window.getComputedStyle(parentDom);

    // 如果不是定位模式
    if (!positionList.includes(parentCss.position)) {
      // 添加个相对定位
      parentDom.style.position = 'relative';
    }

    // 添加到外部容器
    parentDom.appendChild(this.dom);

    return this;
  }

  /**
   * @Author: SAM
   * @Description: 获取屏幕中除当前弹幕容器外的宽度
   * @Date: 2021-08-01 02:46:25
   * @param {viod} 无
   * @return {number} 自己宽度以外的像素值
   */
  getOffAreaWidth() {
    return document.body.offsetWidth - this.dom.offsetWidth;
  }

  /**
   * @Author: SAM
   * @Description: 返回容器宽度
   * @Date: 2021-08-01 02:52:59
   * @param {viod} 无
   * @return {object} 宽度对象
   */
  getSize() {
    return {
      height: this.dom.offsetHeight,
      width: this.dom.offsetWidth,
    };
  }

  /**
   * @Author: SAM
   * @Description: 新增弹幕
   * @Date: 2021-08-01 02:55:44
   * @param {object} payload
   * @return {this} 当实例
   */
  add(bullet) {
    bullet.on('animationend', () => bullet.remove());
    this.dom.appendChild(bullet.dom);
    return this;
  }
}

/**
 * @Author: SAM
 * @Description: 弹幕项
 * @Date: 2021-08-01 03:12:05
 */
class Bullet {
  constructor(hashKey) {
    // 创建弹幕节点
    const domBullet = document.createElement('div');
    // 增加弹幕class
    domBullet.classList.add('bullet');
    // 设置唯一标识
    domBullet.setAttribute(hashKey, '');

    // 名称
    const domNickName = document.createElement('span');
    domNickName.className = 'nickName';

    // 内容
    const domContent = document.createElement('span');
    domContent.className = 'content';

    // 插入弹幕
    domBullet.appendChild(domNickName);
    domBullet.appendChild(domContent);

    // 记录唯一key
    this.key = hashKey;

    // 把节点记录起来做为模板使用
    this.template = domBullet;

    // 定义一个克隆方法
    this.template.clone = function () {
      const dom = this.cloneNode(true);
      dom.domNickName = dom.querySelector('.nickName');
      dom.domContent = dom.querySelector('.content');
      Object.defineProperty(dom, 'nickName', {
        enumerable: true,
        configurable: true,
        get() {
          return this.domNickName.innerText;
        },
        set(newVal) {
          this.domNickName.innerText = newVal;
          return this;
        },
      });

      Object.defineProperty(dom, 'content', {
        enumerable: true,
        configurable: true,
        get() {
          return dom.domContent.innerText;
        },
        set(newVal) {
          this.domContent.innerText = newVal;
          return this;
        },
      });

      return dom;
    };
  }

  /**
   * @Author: SAM
   * @Description: 创建一个弹幕
   * @Date: 2021-08-01 17:16:44
   * @param {object} payload 弹幕数据
   * @param {object} params 弹幕等相关参数
   * @return {HTMLElement} dom对象
   */
  create(payload, params) {
    // 从模板克隆节点
    const domBullet = this.template.clone();

    // 设置名称
    domBullet.nickName = payload.nickName + '：';
    // 设置内容
    domBullet.content = payload.content;

    // 上下距离
    domBullet.style.top = params.top + 'px';
    // 弹幕时间（决定弹幕速度）
    domBullet.style.animationDuration = params.dt + 's';
    // 区域外宽度（决定起始位置）
    domBullet.style.setProperty(`--bulletStart-${this.key}`, `calc(100vw - ${params.offAreaWidth}px)`);

    return {
      // 记录弹幕数据
      payload,
      // 记录dom节点
      dom: domBullet,
      // 绑定on方法
      on: this.on,
      // 绑定remove方法
      remove: this.remove,
    };
  }

  /**
   * @Author: SAM
   * @Description: 监听事件
   * @Date: 2021-08-01 03:31:22
   * @param {string} event 事件名称
   * @param {function} callback 回调
   * @return {this} 当前实例
   */
  on(event, callback) {
    this.dom.addEventListener(event, (e) =>
      callback({
        event,
        id: this.payload.id,
      })
    );
  }

  /**
   * @Author: SAM
   * @Description: 删除当前弹幕
   * @Date: 2021-08-01 03:34:51
   * @param {viod} 无
   * @return {viod} 无
   */
  remove() {
    this.dom.remove();
  }
}

exports.BulletContainer = BulletContainer;
exports.Bullet = Bullet;
