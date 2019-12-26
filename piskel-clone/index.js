import { pressKeys } from './tools/checkKeys'
import { swapSize, canvasSize } from './tools/size'
import { paintBucket } from './canvas/paintBucket'
import {rgbToHex } from './color/rgbToHex'
import { chooseColor,colorHelp } from './tools/chooseColor'
import { clearCanvas } from './canvas/clear'

let isPencil = false;
let isDraw = false;
let isPaintBucket = false;
let isChooseColor = false;
const amber = '#FFC107';
const gorse = '#FFEB3B';
const sunsetOrange = '#F74141'
const azureRadiance = '#0088ff'
let color = amber;
let colorPrev = '';
const canvas = document.getElementById('canvas');
canvas.style.width = '512px';
canvas.style.height = '512px';
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
document.getElementById('swapPrevColor').style.background = gorse;
document.getElementById('inputColor').value = amber;

if (localStorage.getItem('canvas')) {
  const dataURL = localStorage.getItem('canvas');
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = dataURL;
  img.onload = function load() {
    ctx.drawImage(img, 0, 0, 512, 512);
  };
}

if (localStorage.getItem('size')) {
  if (localStorage.getItem('size') === '128') {
    document.getElementById('size128').classList.add('active');
    document.getElementById('size256').classList.remove('active');
    document.getElementById('size512').classList.remove('active');
  }
  if (localStorage.getItem('size') === '256') {
    document.getElementById('size256').classList.add('active');
    document.getElementById('size128').classList.remove('active');
    document.getElementById('size512').classList.remove('active');
  }
  if (localStorage.getItem('size') === '512') {
    document.getElementById('size512').classList.add('active');
    document.getElementById('size128').classList.remove('active');
    document.getElementById('size256').classList.remove('active');
  }
}

document.getElementById('size').addEventListener('click', (event) => {
  const { target } = event;
  if (target.id === 'size128') {
    swapSize(128)
  }
  if (target.id === 'size256') {
    swapSize(256)
  }
  if (target.id === 'size512') {
    swapSize(512)
  }
});

document.getElementById('mainItems').addEventListener('click', (event) => {
  const { target } = event;
  const element = target.closest('div');
  if (element.className === 'main__items' || element.id === 'transform') { return; }
  element.classList.add('active');
  if (element.id === 'pencil') {
    isPencil = true;
    isPaintBucket = false;
    isChooseColor = false;
    document.getElementById('paintBucket').classList.remove('active');
    document.getElementById('chooseColor').classList.remove('active');
  }
  if (element.id === 'paintBucket') {
    isPencil = false;
    isChooseColor = false;
    isPaintBucket = true;
    document.getElementById('chooseColor').classList.remove('active');
    document.getElementById('pencil').classList.remove('active');
  }
  if (element.id === 'chooseColor') {
    isPencil = false;
    isChooseColor = true;
    isPaintBucket = false;
    document.getElementById('pencil').classList.remove('active');
    document.getElementById('paintBucket').classList.remove('active');
  }
});

document.getElementById('canvas').addEventListener('mousedown', (event) => {
  if (isPencil) {
    ctx.beginPath();
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.moveTo(x / (parseInt(canvas.style.width, 10) / canvasSize),
      y / (parseInt(canvas.style.height, 10) / canvasSize));
    isDraw = true;
  }
});

document.getElementById('canvas').addEventListener('mousemove', (event) => {
  if (isDraw) {
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.lineTo(x / (parseInt(canvas.style.width, 10) / canvasSize),
      y / (parseInt(canvas.style.height, 10) / canvasSize));
    ctx.stroke();
  }
});

document.addEventListener('keydown', pressKeys);

document.getElementById('clear').addEventListener('click', clearCanvas)

document.getElementById('canvas').addEventListener('mouseup', () => {
  isDraw = false;
  localStorage.setItem('canvas', canvas.toDataURL());
});

document.getElementById('canvas').addEventListener('mouseleave', () => {
  isDraw = false;
  localStorage.setItem('canvas', canvas.toDataURL());
});

document.getElementById('canvas').addEventListener('mousedown', (event) => {
  if (isPencil) {
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.fillStyle = color;
    ctx.fillRect(x / (512 / canvasSize), y / (512 / canvasSize), 1, 1);
    localStorage.setItem('canvas', canvas.toDataURL());
  }
});

document.getElementById('mainColors').addEventListener('click', (event) => {
  const { target } = event;
  const element = target.closest('div');
  if (element.className === 'main__colors') {
    return;
  }
  colorPrev = document.getElementById('swapPrevColor').style.background;
  colorPrev = rgbToHex(colorPrev);
  document.getElementById('swapPrevColor').style.background = color;
  if (element.id === 'red' || element.className === 'circle-red') {
    color = sunsetOrange;
  }
  if (element.id === 'blue' || element.className === 'circle-blue') {
    color = azureRadiance;
  }
  if (element.id === 'prevColor' || element.className === 'circle-prev') {
    document.getElementById('swapCurrentColor').style.background = colorPrev;
    document.getElementById('inputColor').value = colorPrev;
    color = colorPrev;
    return;
  }
  document.getElementById('swapCurrentColor').style.background = color;
  document.getElementById('inputColor').value = color;
});

document.getElementById('canvas').addEventListener('click', (event) => {
  if (isChooseColor) {
    chooseColor(event);
  }
});

document.getElementById('inputColor').addEventListener('input', () => {
  document.getElementById('swapPrevColor').style.background = color;
  color = document.getElementById('inputColor').value;
  document.getElementById('swapCurrentColor').style.background = color;
});

function colorNow() {
  ctx.strokeStyle = color;
}

setInterval(colorNow, 0);

document.getElementById('canvas').addEventListener('click', (event) => {
  if (isPaintBucket) {
    paintBucket(event);
    color = colorHelp;
  }
});

export {color, ctx }