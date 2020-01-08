import rgbToHex from '../color/rgbToHex';
import { ctx } from '../index';
import { canvasSize } from './size';


let colorHelp;
function chooseColor(event) {
  const canvas = document.getElementById('canvas');
  const x = event.offsetX;
  const y = event.offsetY;
  const colorPixel = ctx.getImageData(x / (parseInt(canvas.style.width, 10) / canvasSize),
    y / (parseInt(canvas.style.height, 10) / canvasSize), 1, 1).data;
  const rgb = `rgb(${colorPixel[0]}, ${colorPixel[1]}, ${colorPixel[2]})`;
  const colorNow = rgbToHex(rgb);
  if (document.getElementById('primaryColor').classList.contains('active')) { document.getElementById('inputColorPrimary').value = colorNow; } else document.getElementById('inputColorSecondary').value = colorNow;
  colorHelp = colorNow;
}

export { chooseColor, colorHelp };
