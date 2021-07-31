/* eslint-disable */

const { getRandomInt } = require('./utils/tools');
const { createContainer, createBullet } = require('./core/dom');

/**
 * @Author: wangzesen
 * @Description: 随机整数
 * @Date: 2021-07-14 14:48:14
 * @param {number} min 最小数
 * @param {number} max 最大数
 * @return {number} 随机整数
 */
module.exports = class BulletChat {
  constructor(parentDom) {
    if (!parentDom) {
      throw new Error('需要传入一个容器节点');
    }

    // 唯一key
    this.hashKey = 'data-v-bulletChat';

    // 区域外宽度
    this.offAreaWidth = 0;

    // 弹幕容器高度
    this.containerHight = 0;
    // 弹幕间隔
    this.spacing = 50;
    // 弹幕速度
    this.speed = 12;

    // 记录容器节点
    this.parentDom = parentDom;

    // 当前弹幕容器
    this.container = createContainer(parentDom, this.hashKey);

    // 窗口尺寸变化时，进行重新计算区域外宽度
    window.addEventListener('resize', this.setOffAreaWidth.bind(this));

    // 设置区域外宽度s
    this.setOffAreaWidth();
  }

  // 设置区域外宽度
  setOffAreaWidth() {
    if (this.container) {
      const { offsetWidth, offsetHeight } = this.container;
      // 计算区域外的宽度，用于弹幕起始位置
      this.offAreaWidth = document.body.offsetWidth - offsetWidth;
      this.containerHight = offsetHeight;
    }
  }

  // 添加一个弹幕实时
  add(payload) {
    const params = this.createBulletParams(payload);
    const bullet = createBullet(payload, this.hashKey, params);
    this.container.append(bullet);
  }

  // 设置弹幕位置
  createBulletParams(payload) {
    // 随机时间差距
    const dt = Math.random();

    // 随机将窗口分割成多少行
    const sum = getRandomInt(1, 20);
    // 随机取一行
    const ix = getRandomInt(1, sum);

    // 弹幕显示区域
    const panelHeight = this.containerHight - this.spacing;

    return {
      // 弹幕时间
      dt: (dt > 0.45 ? this.speed : this.speed - 1) + dt,
      // 设置弹幕位置
      top: (panelHeight / sum) * ix - 1,
      // 偏移值
      offAreaWidth: this.offAreaWidth,
      // 事件集
      events: {
        animationend: typeof payload.animationend === 'function' ? payload.animationend : null,
      },
    };
  }
};
