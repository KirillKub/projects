import { pressKeys } from './tools/checkKeys';
import { size, canvasSize, penSize } from './tools/size';
import { paintBucket, fullBucket } from './canvas/paintBucket';
import clearCanvas from './canvas/clear';
import { activeTool, tool } from './tools/active';
import { createFrame, drawFrame, frameBox } from './frames/create';
import {
  fullScreen, saveAsGif, saveAsApng,
} from './frames/animation';
import { swapFrame, deleteFrame, duplicateFrame } from './frames/actions';
import {
  colorActive, color, colorPrimary, colorSecondary, swapColor,
} from './color/active';
import { swapKeys } from './tools/swapKeys';
import { swapFps } from './frames/interval';
import signIn from './signIn/signIn';

const canvasWidth = 512;
const canvasHeight = 512;
let isDraw = false;
let isEraserDraw = false;
let isStrokeDown = false;
const canvas = document.getElementById('canvas');
canvas.style.width = '512px';
canvas.style.height = '512px';
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
createFrame();
drawFrame();

if (localStorage.getItem('canvas')) {
  const dataURL = localStorage.getItem('canvas');
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = dataURL;
  img.onload = function load() {
    ctx.strokeStyle = color;
    ctx.drawImage(img, 0, 0, 128, 128);
  };
}

document.getElementById('login').addEventListener('click', signIn);

document.getElementById('changeSize').addEventListener('click', penSize);

document.getElementById('keys').addEventListener('click', () => {
  document.getElementById('swapKeys').style.display = 'block';
});

document.getElementById('continue').addEventListener('click', swapKeys);

document.getElementById('canvas').addEventListener('mousedown', (event) => {
  if (tool.pencil) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.moveTo(parseInt(x / (canvasWidth / canvasSize)), parseInt(y / (canvasHeight / canvasSize)));
    isDraw = true;
  }
});

document.getElementById('canvas').addEventListener('mousemove', (event) => {
  if (isDraw) {
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.lineTo(parseInt(x / (canvasWidth / canvasSize)), parseInt(y / (canvasHeight / canvasSize)));
    ctx.stroke();
  }
});

document.getElementById('canvas').addEventListener('mousedown', (event) => {
  if (tool.pencil) {
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fillRect(parseInt(x / (canvasWidth / canvasSize)),
      parseInt(y / (canvasHeight / canvasSize)), 1, 1);
    localStorage.setItem('canvas', canvas.toDataURL());
  }
});

document.getElementById('canvas').addEventListener('mouseup', () => {
  isDraw = false;
  isEraserDraw = false;
  localStorage.setItem('canvas', canvas.toDataURL());
});

document.addEventListener('mousemove', () => {
  if (!isStrokeDown) drawFrame();
  localStorage.setItem('canvas', canvas.toDataURL());
});

document.getElementById('canvas').addEventListener('mouseleave', () => {
  isDraw = false;
  isEraserDraw = false;
  localStorage.setItem('canvas', canvas.toDataURL());
});

document.getElementById('canvas').addEventListener('click', (event) => {
  if (tool.paintBucket) {
    paintBucket(event);
  }
});

document.getElementById('canvas').addEventListener('mousedown', () => {
  if (tool.eraser) {
    isEraserDraw = true;
  }
});

document.getElementById('canvas').addEventListener('mousemove', (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  if (isEraserDraw) {
    ctx.clearRect(parseInt(x / (canvasWidth / canvasSize)),
      parseInt(y / (canvasHeight / canvasSize)), 1, 1);
    localStorage.setItem('canvas', canvas.toDataURL());
    drawFrame();
  }
});

document.getElementById('canvas').addEventListener('mousedown', (event) => {
  if (tool.stroke) {
    const x = event.offsetX;
    const y = event.offsetY;
    isStrokeDown = true;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(parseInt(x / (canvasWidth / canvasSize)),
      parseInt((y / (canvasHeight / canvasSize))));
  }
});

document.getElementById('canvas').addEventListener('mouseup', (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  if (tool.stroke) {
    isStrokeDown = false;
    ctx.lineTo(parseInt(x / (canvasWidth / canvasSize)),
      parseInt((y / (canvasHeight / canvasSize))));
    ctx.stroke();
  }
});

document.getElementById('addNewFrame').addEventListener('click', () => {
  createFrame();
  clearCanvas();
  localStorage.setItem('canvas', canvas.toDataURL());
});

document.getElementById('canvas').addEventListener('mousedown', () => {
  if (tool.bucket) {
    fullBucket(color);
    drawFrame();
  }
});

document.getElementById('range').addEventListener('input', swapFps);
document.getElementById('canvas').addEventListener('click', swapColor);
document.getElementById('mainColors').addEventListener('click', colorActive);
document.getElementById('inputColorPrimary').addEventListener('input', colorPrimary);
document.getElementById('inputColorSecondary').addEventListener('input', colorSecondary);
document.getElementById('size').addEventListener('click', size);
document.getElementById('mainItems').addEventListener('click', activeTool);
document.addEventListener('keydown', pressKeys);
document.getElementById('clear').addEventListener('click', clearCanvas);
document.getElementById('addFrames').addEventListener('click', swapFrame);
document.getElementById('addFrames').addEventListener('click', deleteFrame);
document.getElementById('addFrames').addEventListener('click', duplicateFrame);
document.getElementById('animation').addEventListener('click', fullScreen);
document.getElementById('gif').addEventListener('click', saveAsGif);
document.getElementById('apng').addEventListener('click', saveAsApng);

window.onunload = () => {
  localStorage.setItem('canvas', canvas.toDataURL());
  localStorage.setItem('frameBox', JSON.stringify(frameBox.map((item) => item.toDataURL())));
};

export {
  ctx, tool,
};
