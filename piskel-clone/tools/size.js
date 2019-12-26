import {ctx} from '../index'

let canvasSize = 512;

function swapSize(size){
    canvasSize = size;
    canvas.height = size;
    canvas.width = size;
    document.getElementById('size128').classList.remove('active');
    document.getElementById('size256').classList.remove('active');
    document.getElementById('size512').classList.remove('active');
    document.getElementById(`size${size}`).classList.add('active');
    localStorage.setItem('size', canvasSize);
    const dataURL = localStorage.getItem('canvas');
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = dataURL;
    img.onload = function load() {
      ctx.drawImage(img, 0, 0,
        512 / (512 / canvasSize), 512 / (512 / canvasSize));
    };
  }

  export { swapSize,canvasSize }