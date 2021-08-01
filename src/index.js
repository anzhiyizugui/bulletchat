/* eslint-disable */

const { getRandomInt } = require('./utils/tools');
const { BulletContainer, Bullet } = require('./core/dom');

/**
 * @Author: wangzesen
 * @Description: 随机整数
 * @Date: 2021-07-14 14:48:14
 * @param {number} min 最小数
 * @param {number} max 最大数
 * @return {number} 随机整数
 */
module.exports = class BulletChat {
  constructor(parentDom, { spacing = 50, speed = 12 } = {}) {
    if (!parentDom) {
      throw new Error('需要传入一个容器节点');
    }

    // 唯一key
    this.hashKey = 'data-v-bulletChat';

    // 记录容器节点
    this.parentDom = parentDom;
    // 弹幕间隔
    this.spacing = spacing;
    // 弹幕速度
    this.speed = speed;

    // 区域外宽度
    this.offAreaWidth = 0;
    // 弹幕容器高度
    this.containerHight = 0;

    // 当前弹幕容器
    this.bulletContainer = new BulletContainer(this.hashKey).mounted(parentDom);

    // 弹幕调度中心
    this.bulletControl = new Bullet(this.hashKey);

    // 窗口尺寸变化时，进行重新计算区域外宽度
    window.addEventListener('resize', this.setOffAreaWidth.bind(this));

    // 设置区域外宽度s
    this.setOffAreaWidth();
  }

  // 设置区域外宽度
  setOffAreaWidth() {
    this.offAreaWidth = this.bulletContainer.getOffAreaWidth();
    const { height } = this.bulletContainer.getSize();
    this.containerHight = height;
  }

  // 添加一个弹幕实时
  add(payload) {
    const params = this.createBulletParams();
    const bullet = this.bulletControl.create(payload, params);
    this.bulletContainer.add(bullet);
  }

  // 设置弹幕位置
  createBulletParams() {
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
    };
  }
};
