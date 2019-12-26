import { pressKeys } from './tools/checkKeys'
import { swapSize, canvasSize, makeActiveSize } from './tools/size'
import { paintBucket } from './canvas/paintBucket'
import {rgbToHex } from './color/rgbToHex'
import { chooseColor,colorHelp } from './tools/chooseColor'
import { clearCanvas } from './canvas/clear'
import { makeActiveTool} from './tools/active'

let isPencil = false;
let isDraw = false;
let isPaintBucket = false;
let isChooseColor = false;
let isEraser = false;
const black = '#000000';
const white = '#FFFFFF';
let color = black;
const canvas = document.getElementById('canvas');
canvas.style.width = '512px';
canvas.style.height = '512px';
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
// document.getElementById('inputColorPrimary').value = black;
// document.getElementById('inputColorSecondary').value = white;

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
    makeActiveSize('128')
  }
  if (localStorage.getItem('size') === '256') {
    makeActiveSize('256')
  }
  if (localStorage.getItem('size') === '512') {
    makeActiveSize('512')
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
  isPencil = false;
  isChooseColor = false;
  isPaintBucket = false;
  isEraser = false;
  const { target } = event;
  const element = target.closest('div');
  if (element.className === 'main__items') { return; }
  if (element.id === 'pencil') {
    makeActiveTool('pencil')
    isPencil = true;
  }
  if (element.id === 'paintBucket') {
    makeActiveTool('paintBucket')
    isPaintBucket = true;
  }
  if (element.id === 'chooseColor') {
    makeActiveTool('chooseColor')
    isChooseColor = true;
  }
  if (element.id === 'eraser') {
    makeActiveTool('eraser')
    isEraser = true;
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
  element.classList.add('active');
  if(element.id === 'primaryColor'){
    document.getElementById('secondaryColor').classList.remove('active');
    color = document.getElementById('inputColorPrimary').value;
  }
  if(element.id === 'secondaryColor'){
    document.getElementById('primaryColor').classList.remove('active');
    color = document.getElementById('inputColorSecondary').value;
  }
});

document.getElementById('canvas').addEventListener('click', (event) => {
  if (isChooseColor) {
    chooseColor(event);
  }
});

document.getElementById('inputColorPrimary').addEventListener('input', () => {
  color = document.getElementById('inputColorPrimary').value;
});

document.getElementById('inputColorSecondary').addEventListener('input', () => {
  color = document.getElementById('inputColorSecondary').value;
})

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

window.onunload = () => {
  localStorage.setItem('canvas', canvas.toDataURL());
};

export {color, ctx }