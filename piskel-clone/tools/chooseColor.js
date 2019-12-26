import {rgbToHex } from '../color/rgbToHex'
import { ctx } from '../index'
import { canvasSize,color } from './size'


let colorHelp;
function chooseColor(event){
      const x = event.offsetX;
      const y = event.offsetY;
      const colorPixel = ctx.getImageData(x / (parseInt(canvas.style.width, 10) / canvasSize),
        y / (parseInt(canvas.style.height, 10) / canvasSize), 1, 1).data;
      const rgb = `rgb(${colorPixel[0]}, ${colorPixel[1]}, ${colorPixel[2]})`;
      document.getElementById('swapPrevColor').style.background = color;
      let colorNow = rgbToHex(rgb);
      document.getElementById('swapCurrentColor').style.background = colorNow;
      document.getElementById('inputColor').value = colorNow;
      colorHelp = colorNow;
}


export { chooseColor, colorHelp } 