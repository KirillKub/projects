import { ctx } from '../index';
import { frameBox, drawFrame, createFrame } from './create';

let ctxValue;
const frameCanvasSize = 128;

function swapFrame(event) {
  const { target } = event;
  if (target.closest('canvas')) {
    ctxValue = target.getContext('2d');
    const dataURL = target.toDataURL();
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = dataURL;
    img.onload = function load() {
      ctx.drawImage(img, 0, 0, frameCanvasSize, frameCanvasSize);
    };
  }
}

function deleteFrame(event) {
  const { target } = event;
  if (target.classList.contains('delete')) {
    let index;
    frameBox.map((item, i) => {
      if (item.getContext('2d') === target.previousSibling.previousSibling.getContext('2d')) {
        index = i;
      }
      return index;
    });
    frameBox.splice(index, 1);
    target.closest('.frame').style.display = 'none';
    let dataURL = document.getElementsByTagName('canvas')[0].toDataURL();
    ctxValue = document.getElementsByTagName('canvas')[0].getContext('2d');
    if (index === 0) {
      dataURL = document.getElementsByTagName('canvas')[1].toDataURL();
      ctxValue = document.getElementsByTagName('canvas')[1].getContext('2d');
    }
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = dataURL;
    img.onload = function load() {
      ctx.drawImage(img, 0, 0, frameCanvasSize, frameCanvasSize);
    };
    drawFrame();
  }
}

function duplicateFrame(event) {
  const { target } = event;
  if (target.classList.contains('duplicate')) {
    createFrame();
    const dataURL = target.previousSibling.toDataURL();
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = dataURL;
    img.onload = function load() {
      ctx.drawImage(img, 0, 0, frameCanvasSize, frameCanvasSize);
    };
    localStorage.setItem('canvas', target.previousSibling.toDataURL());
    drawFrame();
    ctxValue = null;
  }
}

export {
  ctxValue, swapFrame, deleteFrame, duplicateFrame,
};
