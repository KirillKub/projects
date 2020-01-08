import { ctx } from '../index';
import clearCanvas from '../canvas/clear';

let canvasSize = 128;

function makeActiveSize(sizeNow) {
  document.getElementById('size32').classList.remove('active');
  document.getElementById('size64').classList.remove('active');
  document.getElementById('size128').classList.remove('active');
  document.getElementById(`size${sizeNow}`).classList.add('active');
}

function swapSize(sizeSwap) {
  const canvas = document.getElementById('canvas');
  canvasSize = sizeSwap;
  canvas.height = sizeSwap;
  canvas.width = sizeSwap;
  makeActiveSize(sizeSwap);
  const dataURL = canvas;
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = dataURL;
  img.onload = function load() {
    ctx.drawImage(img, 0, 0, canvasSize, canvasSize);
  };
  clearCanvas();
}

function size(event) {
  const { target } = event;
  if (target.id === 'size32') {
    swapSize(32);
  }
  if (target.id === 'size64') {
    swapSize(64);
  }
  if (target.id === 'size128') {
    swapSize(128);
  }
}

function penSize(event) {
  const { target } = event;
  if (target.id === 'size1') {
    ctx.lineWidth = 1;
  }
  if (target.id === 'size2') {
    ctx.lineWidth = 2;
  }
  if (target.id === 'size3') {
    ctx.lineWidth = 3;
  }
  if (target.id === 'size4') {
    ctx.lineWidth = 4;
  }
}

export {
  size, canvasSize, makeActiveSize, penSize,
};
