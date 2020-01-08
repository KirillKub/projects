import { frameBox } from './create';
import { interval } from './interval';
import { canvasSize } from '../tools/size';
import { } from './GIFEncoder';
import { } from './LZWEncoder';
import { } from './NeuQuant';

const UPNG = require('upng-js');
const download = require('downloadjs');

let count = 0;
const animationCanvasSize = 256;

function animation() {
  const canvas = document.getElementById('animation');
  const ctx = canvas.getContext('2d');
  let dataURL;
  try {
    dataURL = frameBox[count].toDataURL();
  } catch (e) {
    count = 0;
  }
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = dataURL;
  img.onload = function load() {
    ctx.drawImage(img, 0, 0, animationCanvasSize, animationCanvasSize);
    count += 1;
    if (count === frameBox.length || count > frameBox.length) {
      count = 0;
    }
  };
}

function fullScreen() {
  if ('fullscreenEnabled' in document) {
    if (document.fullscreenEnabled) {
      const element = document.getElementById('animation');
      if ('requestFullscreen' in element) {
        element.requestFullscreen();
      }
    }
  } else {
    // eslint-disable-next-line
    alert("User doesn't allow full screen");
  }
}

function saveAsGif() {
  // eslint-disable-next-line
  const encoder = new GIFEncoder();
  encoder.setRepeat(0);
  encoder.setDelay(interval);
  encoder.start();
  for (let i = 0; i < frameBox.length; i += 1) {
    encoder.addFrame(frameBox[i].getContext('2d'));
  }
  encoder.finish();
  encoder.download('picture');
}

function saveAsApng() {
  const wait = Array.of(frameBox.length).fill(interval);
  const arrayBuffer = frameBox.map((item) => item.getContext('2d').getImageData(0, 0, canvasSize, canvasSize).data.buffer);
  const img = UPNG.encode(arrayBuffer, canvasSize, canvasSize, 0, wait);
  download(img, 'picture.png', 'apng');
}

export {
  animation, fullScreen, saveAsGif, saveAsApng,
};
