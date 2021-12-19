let win = window;
let doc = document;

const getDpr = function () {
  return parseInt(window.devicePixelRatio);
}

const getSize = function (win, doc) {
  let clientWidth = win.innerWidth // visual viewport
  || doc.documentElement.clientWidth // layout viewport
  || doc.body.clientWidth;
  if (!clientWidth) {
    console.warn('cannot get client width');
    return;
  }
  return {
    baseWidth: 375,
    clientWidth
  }
}
let refreshRem = function () {
  let docEl = win.document.documentElement;
  let metaEl = doc.querySelector('meta[name="viewport"]');
  let dpr = getDpr();
  let scale = 1 / dpr;
  docEl.setAttribute('data-dpr', dpr);
  if (!metaEl) {
    metaEl = doc.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'width=device-width, initial-scale=' + 
      + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    document.documentElement.firstElementChild.appendChild(metaEl);
  } else {
    metaEl.setAttribute('content', 'width=device-width, initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
  }
  let { clientWidth, baseWidth } = getSize(win, doc);
  let fz = 100 * clientWidth / baseWidth;
  docEl.style.fontSize = fz + 'px';
};

if (doc.addEventListener) {
  let resizeEvt = 'orientationchange' in win ? 'orientationchange' : 'resize';
  win.addEventListener(resizeEvt, refreshRem, false);
  doc.addEventListener('DOMContentLoaded', refreshRem, false);
  refreshRem();
}
