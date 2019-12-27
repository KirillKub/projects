import { pressKeys } from './tools/checkKeys'
import { swapSize, canvasSize, makeActiveSize } from './tools/size'
import { paintBucket } from './canvas/paintBucket'
import { chooseColor,colorHelp } from './tools/chooseColor'
import { clearCanvas } from './canvas/clear'
import { makeActiveTool} from './tools/active'

let isPencil = false;
let isDraw = false;
let isPaintBucket = false;
let isChooseColor = false;
let isEraser = false;
let isStroke = false;
let color = '#ff0000';
const canvas = document.getElementById('canvas');
canvas.style.width = '512px';
canvas.style.height = '512px';
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

if (localStorage.getItem('canvas')) {
  const dataURL = localStorage.getItem('canvas');
  const img = new Image();
  img.crossOrigin = 'Anonymous';
  img.src = dataURL;
  img.onload = function load() {
    ctx.strokeStyle = color;
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
  isStroke = false;
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
  if (element.id === 'stroke') {
    makeActiveTool('stroke')
    isStroke = true;
  }
});

document.getElementById('canvas').addEventListener('mousedown', (event) => {
  if (isPencil) {
    ctx.strokeStyle = color;
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
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fillRect(x / (512 / canvasSize), y / (512 / canvasSize), 1, 1);
    localStorage.setItem('canvas', canvas.toDataURL());
  }
});

document.addEventListener('keydown', pressKeys);

document.getElementById('clear').addEventListener('click', clearCanvas)

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

document.getElementById('canvas').addEventListener('click', (event) => {
  if (isPaintBucket) {
    paintBucket(event);
    color = colorHelp;
  }
});

let isEraserDraw = false;

document.getElementById('canvas').addEventListener('mousemove', (event) => {
  if (isEraserDraw) {
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.lineWidth = 5;
    ctx.lineTo(x / (parseInt(canvas.style.width, 10) / canvasSize),
    y / (parseInt(canvas.style.height, 10) / canvasSize),5,5);
    ctx.stroke();
  }
});

document.getElementById('canvas').addEventListener('mouseup', () => {
  isEraserDraw = false;
});

document.getElementById('canvas').addEventListener('mouseleave', () => {
  isEraserDraw = false;
});

document.getElementById('canvas').addEventListener('mousedown', (event) => {
  if (isEraser) {
    ctx.strokeStyle = 'lightgrey';
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.beginPath();
    ctx.moveTo(x / (parseInt(canvas.style.width, 10) / canvasSize),
  y / (parseInt(canvas.style.height, 10) / canvasSize));
    ctx.fillStyle = 'lightgrey';
    ctx.fillRect(x / (512 / canvasSize), y / (512 / canvasSize), 5, 5);
    isEraserDraw = true;
    localStorage.setItem('canvas', canvas.toDataURL());
  }
});


document.getElementById('canvas').addEventListener('mousedown',(event)=>{
  if(isStroke){
    ctx.strokeStyle = color;
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.beginPath();
    ctx.moveTo(x / (parseInt(canvas.style.width, 10) / canvasSize),
    y / (parseInt(canvas.style.height, 10) / canvasSize));
  }
})
document.getElementById('canvas').addEventListener('mouseup',(event)=>{
  if(isStroke){
    ctx.strokeStyle = color;
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.lineTo(x / (parseInt(canvas.style.width, 10) / canvasSize),
    y / (parseInt(canvas.style.height, 10) / canvasSize),1,1);
    ctx.stroke();
  }
})

window.onunload = () => {
  localStorage.setItem('canvas', canvas.toDataURL());
  localStorage.setItem('sizeCanvas', canvasSize);
};

export {color, ctx }