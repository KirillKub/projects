import { ctx } from '../index';

let canvasSize = 128;

function makeActiveSize(size) {
  document.getElementById('size32').classList.remove('active');
  document.getElementById('size64').classList.remove('active');
  document.getElementById('size128').classList.remove('active');
  document.getElementById(`size${size}`).classList.add('active');
}

function swapSize(size) {
  const canvas = document.getElementById('canvas');
  canvasSize = size;
  canvas.height = size;
  canvas.width = size;
  makeActiveSize(size);
  const dataURL = localStorage.getItem('canvas');
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = dataURL;
  img.onload = function load() {
    ctx.drawImage(img, 0, 0, canvasSize, canvasSize);
  };
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


export { size, canvasSize, makeActiveSize };
