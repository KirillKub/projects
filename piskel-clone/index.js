import { pressKeys } from './tools/checkKeys'
import { size, canvasSize, makeActiveSize } from './tools/size'
import { paintBucket , fullBucket } from './canvas/paintBucket'
import { chooseColor,colorHelp } from './tools/chooseColor'
import { clearCanvas } from './canvas/clear'
import { activeTool} from './tools/active'
import {createFrame,drawFrame,frameBox} from './frames/create';
import { animation, fullScreen , saveAsGif,saveAsApng} from './frames/animation'
import { swapFrame, deleteFrame, duplicateFrame } from '../piskel-clone/frames/actions'

let tool = {
  pencil:false,
  chooseColor:false,
  paintBucket: false,
  eraser: false,
  stroke: false,
  bucket: false,
  }
let isDraw = false;
let isEraserDraw = false;
let isStrokeDown = false;
let color = '#ff0000';
const canvas = document.getElementById('canvas');
canvas.style.width = '512px';
canvas.style.height = '512px';
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
let fps = 12;
let interval = 1000 / fps;
let animate = setInterval(animation,interval);
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

document.getElementById('size').addEventListener('click', size);

document.getElementById('mainItems').addEventListener('click', activeTool);

// let oldX = null
// let oldY = null


// canvas.addEventListener('mousemove', function(e) {
//   if (!(e.buttons & 1)) {
//     oldX = oldY = null;
//     return;
//   }
//   let
//     x = parseInt(e.offsetX / (512 / canvasSize)),
//     y = parseInt(e.offsetY / (512 / canvasSize));
//   if (oldX !== null) {
//     getLineCoord({ x, y }, { x: oldX, y: oldY }).forEach(({ x, y }) => {
//       ctx.beginPath();
//       ctx.arc(x, y, 1, 0, 2 * Math.PI, false);
//       ctx.fill();
//     });
//   }
//   oldX = x;
//   oldY = y;
// });

// function getLineCoord(p0, p1) {
//   let
//     { x, y } = p0,
//     dx = Math.abs(x - p1.x),
//     dy = Math.abs(y - p1.y),
//     sx = (x < p1.x) ? 1 : -1,
//     sy = (y < p1.y) ? 1 : -1,
//     error = dx - dy,
//     coord = [];
//   while (true) {
//     coord.push({ x, y });
//     if ((x === p1.x) && (y === p1.y)) {
//       break;
//     }
//     const e2 = error * 2;
//     if (e2 > -dy) {
//       error -= dy;
//       x += sx;
//     }
//     if (e2 < dx) {
//       error += dx;
//       y += sy;
//     }
//   }
//   return coord;
// }

document.getElementById('canvas').addEventListener('mousedown', (event) => {
  if (tool.pencil) {
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
    // ctx.fillRect(parseInt(x / (512 / canvasSize)), parseInt(y / (512 / canvasSize)), 1, 1);
    ctx.stroke();
  }
});

document.getElementById('canvas').addEventListener('mousedown', (event) => {
  if (tool.pencil) {
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.fillRect(parseInt(x / (512 / canvasSize)), parseInt(y / (512 / canvasSize)), 1, 1);
    localStorage.setItem('canvas', canvas.toDataURL());
  }
});

document.getElementById('canvas').addEventListener('mouseup', () => {
  isDraw = false;
  isEraserDraw = false;
  localStorage.setItem('canvas', canvas.toDataURL());
});

document.getElementById('canvas').addEventListener('mousemove', () => {
  if(!isStrokeDown) drawFrame()
  localStorage.setItem('canvas', canvas.toDataURL());
});

document.getElementById('canvas').addEventListener('mouseleave', () => {
  isDraw = false;
  isEraserDraw = false;
  localStorage.setItem('canvas', canvas.toDataURL());
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
  if (tool.chooseColor) {
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
  if (tool.paintBucket) {
    paintBucket(event);
  }
});

document.getElementById('canvas').addEventListener('mousedown', (event) => {
  if (tool.eraser) {
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

document.getElementById('canvas').addEventListener('mousedown',(event)=>{
  if(tool.stroke){
    const x  = event.offsetX;
    const y  = event.offsetY;
    isStrokeDown = true;
    ctx.strokeStyle = color;
    ctx.beginPath();
    ctx.moveTo(parseInt(x / (512 / canvasSize)),parseInt((y / (512 / canvasSize))));
  }
})

document.getElementById('canvas').addEventListener('mouseup',(event)=>{
  const x = event.offsetX;
  const y = event.offsetY;
  if(tool.stroke){
    isStrokeDown = false;
    ctx.lineTo(parseInt(x / (512 / canvasSize)), parseInt((y / (512 / canvasSize))));
    ctx.stroke();
  }
})

document.getElementById('addNewFrame').addEventListener('click',()=>{
  createFrame();
  clearCanvas();
  localStorage.setItem('canvas', canvas.toDataURL());
});

document.getElementById('addFrames').addEventListener('click', swapFrame)
document.getElementById('addFrames').addEventListener('click', deleteFrame)
document.getElementById('addFrames').addEventListener('click', duplicateFrame)


document.getElementById('canvas').addEventListener('mousedown',()=>{
  if(tool.bucket){
    fullBucket(color);
    drawFrame();
  }
})

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
document.getElementById('gif').addEventListener('click',saveAsGif)
document.getElementById('apng').addEventListener('click', saveAsApng)

window.onunload = () => {
  localStorage.setItem('canvas', canvas.toDataURL());
};

export {color, ctx , interval, tool }