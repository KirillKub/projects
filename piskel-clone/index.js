import { pressKeys } from './tools/checkKeys'
import { swapSize, canvasSize, makeActiveSize } from './tools/size'
import { paintBucket , fullBucket } from './canvas/paintBucket'
import { chooseColor,colorHelp } from './tools/chooseColor'
import { clearCanvas } from './canvas/clear'
import { makeActiveTool} from './tools/active'
import {createFrame,drawFrame,frameBox} from './frames/create';
import { animation, fullScreen} from './frames/animation'
import { } from './frames/GIFEncoder'
import { } from './frames/LZWEncoder'
import { } from './frames/NeuQuant'
import { } from './frames/apng-canvas.min.js';
const UPNG = require('upng-js');
const download = require('downloadjs');

let canvasData;
let ctxValue;
let isBucket = false;
let isPencil = false;
let isDraw = false;
let isPaintBucket = false;
let isChooseColor = false;
let isEraser = false;
let isStroke = false;
let isEraserDraw = false;
let color = '#ff0000';
const canvas = document.getElementById('canvas');
canvas.style.width = '512px';
canvas.style.height = '512px';
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
createFrame()
drawFrame()

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

document.getElementById('size').addEventListener('click', (event) => {
  const { target } = event;
  if (target.id === 'size32') {
    swapSize(32)
  }
  if (target.id === 'size64') {
    swapSize(64)
  }
  if (target.id === 'size128') {
    swapSize(128)
  }
});

document.getElementById('mainItems').addEventListener('click', (event) => {
  isPencil = false;
  isChooseColor = false;
  isPaintBucket = false;
  isEraser = false;
  isStroke = false;
  isBucket = false;
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
  if (element.id === 'bucket') {
    makeActiveTool('bucket')
    isBucket = true;
  }
});

document.getElementById('canvas').addEventListener('mousedown', (event) => {
  if (isPencil) {
    ctx.strokeStyle = color;
    ctx.beginPath();
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.moveTo(parseInt(x / (512 / canvasSize)), parseInt(y / (512 / canvasSize)));
    isDraw = true;
  }
});

document.getElementById('canvas').addEventListener('mousemove', (event) => {
  if (isDraw) {
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.lineTo(parseInt(x / (512 / canvasSize)), parseInt(y / (512 / canvasSize)))
    ctx.stroke();
  }
});


document.getElementById('canvas').addEventListener('mouseup', () => {
  isDraw = false;
  localStorage.setItem('canvas', canvas.toDataURL());
});

document.getElementById('canvas').addEventListener('mousemove', () => {
  drawFrame()
  ctxValue = null;
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
    ctx.fillRect(parseInt(x / (512 / canvasSize)), parseInt(y / (512 / canvasSize)), 1, 1);
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
    color = colorHelp;
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
  }
});

document.getElementById('canvas').addEventListener('mousedown', (event) => {
  if (isEraser) {
    isEraserDraw = true;
  }
});

document.getElementById('canvas').addEventListener('mousemove', (event) => {
  const x = event.offsetX;
  const y = event.offsetY;
  if (isEraserDraw) {
    ctx.clearRect(parseInt(x / (512 / canvasSize)), parseInt(y / (512 / canvasSize)), 1, 1);
    localStorage.setItem('canvas', canvas.toDataURL());
    drawFrame()
  }
})

document.getElementById('canvas').addEventListener('mouseup', () => {
  isEraserDraw = false;
});

document.getElementById('canvas').addEventListener('mouseleave', () => {
  isEraserDraw = false;
});

let posX;
let posY;
let isStrokeDown = false;
document.getElementById('canvas').addEventListener('mousedown',(event)=>{
  if(isStroke){
    posX = event.offsetX;
    posY = event.offsetY;
    isStrokeDown = true;
  }
})

document.getElementById('canvas').addEventListener('mousemove',(event)=>{
  const x = event.offsetX;
  const y = event.offsetY;
  if(isStrokeDown) {
      ctx.strokeStyle = color;
      ctx.clearRect(0,0,canvas.width,canvas.height);
      const dataURL = localStorage.getItem('canvas');
      const img = new Image();
      img.crossOrigin = 'Anonymous';
      img.src = dataURL;
      ctx.drawImage(img, 0, 0, canvasSize, canvasSize);
      ctx.beginPath();
      ctx.moveTo(parseInt(posX / (512 / canvasSize)),parseInt((posY / (512 / canvasSize))));
      ctx.lineTo(parseInt(x / (512 / canvasSize)), parseInt((y / (512 / canvasSize))));
      ctx.stroke();
  }
});

document.getElementById('canvas').addEventListener('mouseup',(event)=>{
  if(isStroke){
    isStrokeDown = false;
  }
})

document.getElementById('addNewFrame').addEventListener('click',()=>{
  createFrame();
  clearCanvas();
  localStorage.setItem('canvas', canvas.toDataURL());
});

document.getElementById('addFrames').addEventListener('click', (event)=>{
  let target = event.target;
  if(target.closest('canvas')){
    ctxValue = target.getContext('2d');
    const dataURL = target.toDataURL()
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = dataURL;
    img.onload = function load() {
      ctx.drawImage(img, 0, 0, 128, 128);
    };
  }
})

document.getElementById('addFrames').addEventListener('click',(event)=>{
  let target = event.target
  if(target.classList.contains('delete')){
    frameBox.splice(frameBox.filter(item => item.getContext('2d') === target.previousSibling.previousSibling.getContext('2d')),1);
    target.closest('.frame').style.display = 'none'
    const dataURL = document.getElementsByTagName('canvas')[0].toDataURL();
    ctxValue = document.getElementsByTagName('canvas')[0].getContext('2d');
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = dataURL;
    img.onload = function load() {
      ctx.strokeStyle = color;
      ctx.drawImage(img, 0, 0, 128, 128);
    };
    drawFrame()
  }
  if(target.classList.contains('duplicate')){
    createFrame()
    const dataURL = target.previousSibling.toDataURL()
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = dataURL;
    img.onload = function load() {
      ctx.strokeStyle = color;
      ctx.drawImage(img, 0, 0, 128, 128);
    };
    localStorage.setItem('canvas', canvas.toDataURL());
    drawFrame()
    ctxValue = null;
    canvasData = null;
  }
});

document.getElementById('canvas').addEventListener('mousedown',()=>{
  if(isBucket){
    fullBucket(color);
    drawFrame();
  }
})
let fps = 12;
document.getElementById('value').value = `12 fps`;
let interval = 1000 / fps;
let animate = setInterval(animation,interval);

document.getElementById('range').addEventListener('input',()=>{
  document.getElementById('value').value = `${document.getElementById('range').value} fps`;
  fps = document.getElementById('range').value;
  interval = 1000 / fps;
  clearInterval(animate);
  if(fps != 0){
    animate = setInterval(animation,interval);
  }
})

document.getElementById('animation').addEventListener('click',fullScreen)

document.getElementById('gif').addEventListener('click',()=>{
  let encoder = new GIFEncoder();
  encoder.setRepeat(0);
  encoder.setDelay(interval);
  encoder.start();
  for(let i = 0; i < frameBox.length; i++){
      encoder.addFrame(frameBox[i].getContext('2d'));
  }
  encoder.finish();
  encoder.download("picture");
})

document.getElementById('apng').addEventListener('click',()=>{
  let wait = Array.of(frameBox.length).fill(interval)
  let img = UPNG.encode(frameBox,512,512,0,wait)
  download(img,'picture.apng','apng')
})

// document.getElementById('login').addEventListener('click', ()=>{
//   window.location = 'https://oauth.vk.com/authorize?client_id=7270443&display=popup&redirect_uri=http://127.0.0.1:5500/kirillkub-RS2019Q3/piskel-clone/dist/index.html&scope=friends&response_type=code&v=5.103'
// })

// setTimeout(()=>{
//   let strGET = window.location.search.replace( '?code=', '');
//   let x = fetch(`https://oauth.vk.com/access_token?client_id=7270443&client_secret=p1cfXcpXLKpJlJrJFsYA&redirect_uri=http://127.0.0.1:5500/kirillkub-RS2019Q3/piskel-clone/dist/index.html&code=${strGET}`)
//   console.log(x);
// },4000) 

document.getElementById('apng').addEventListener('click',()=>{
  APNG.ifNeeded().then(function() {
    for (var i = 0; i < frameBox.length; i++) APNG.animateImage(frameBox[i]);
});
})

window.onunload = () => {
  localStorage.setItem('canvas', canvas.toDataURL());
};

export {color, ctx, ctxValue,canvasData}