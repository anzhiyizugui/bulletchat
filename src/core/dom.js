/* eslint-disable */

const { initStyle } = require('./style');

// 需要初始化css状态
let initStyletate = true;

const positionList = ['relative', 'absolute', 'fixed'];

exports.createContainer = function (parentDom, hashKey) {
  if (initStyletate) {
    initStyle(hashKey);
    initStyletate = false;
  }

  const panel = document.createElement('div');
  panel.classList.add('bulletChatPanel');
  panel.setAttribute(hashKey, '');

  parentDom.append(panel);

  const parentCss = window.getComputedStyle(parentDom);
  parentDom.style.overflow = 'hidden';

  if (!positionList.includes(parentCss.position)) {
    parentDom.style.position = 'relative';
  }

  return panel;
};

exports.createBullet = function (payload, hashKey, params) {
  const bullet = document.createElement('div');

  bullet.classList.add('bullet');
  bullet.setAttribute(hashKey, '');

  const nickName = document.createElement('span');
  nickName.innerText = payload.nickName + '：';

  const content = document.createElement('span');
  content.innerText = payload.content;

  bullet.append(nickName);
  bullet.append(content);

  const {
    top,
    dt,
    offAreaWidth,
    events: { animationend },
  } = params;

  const styles = {
    top: top + 'px',
    animationDuration: dt + 's',
  };

  for (const key in styles) {
    bullet.style[key] = styles[key];
  }

  bullet.style.setProperty(`--bulletStart-${hashKey}`, `calc(100vw - ${offAreaWidth}px)`);

  bullet.addEventListener('animationend', () => {
    if (animationend) {
      animationend({
        type: 'animationend',
        id: payload.id,
        // dom: bullet
      });
    }
    bullet.remove();
  });

  return bullet;
};
