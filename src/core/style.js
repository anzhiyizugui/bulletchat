/* eslint-disable */

exports.initStyle = function initStyle(hashKey) {
  if (document.querySelector(`style[${hashKey}]`)) {
    return;
  }

  const style = document.createElement('style');
  style.setAttribute(hashKey, '');

  style.innerHTML = `
    @keyframes bulletChatAnim-${hashKey} {
      0% {
        transform: translateX(var(--bulletStart-${hashKey}));
      }
    
      100% {
        transform: translateX(-100%);
      }
    }

    .bulletChatPanel[${hashKey}] {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
    }

    .bullet[${hashKey}] {
      --bulletStart-${hashKey}: calc(100vw);
    
      display: inline-block;
      pointer-events: auto;
    
      position: absolute;
      left: 0;
    
      animation-name: bulletChatAnim-${hashKey};
      animation-timing-function: linear;
      animation-fill-mode: forwards;
    
      max-width: 1000px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    
      font-size: 16px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: #fff;
      line-height: 22px;
      text-shadow: 0px 1px 1px rgba(0, 0, 0, 0.5);
      -webkit-text-stroke: 1px rgba(0, 0, 0, 0.8);
      text-stroke: 1px rgba(0, 0, 0, 0.8);
    
      user-select: none;
    }
    
    .bullet[${hashKey}]:hover {
      cursor: pointer;
      animation-play-state: paused;
    }
  `;

  document.head.append(style);
};
