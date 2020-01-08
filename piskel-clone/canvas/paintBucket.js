import { ctx } from '../index';
import { canvasSize } from '../tools/size';
import rgbToHex from '../color/rgbToHex';
import { color } from '../color/active';

const canvas = document.getElementById('canvas');
const mainCanvasSize = 512;

function paintBucket(event) {
  const size = parseInt(canvas.style.width) / canvasSize;
  const x = event.offsetX;
  const y = event.offsetY;
  const colorPixel = ctx.getImageData(parseInt(x / (parseInt(canvas.style.width, 10) / canvasSize)),
    parseInt(y / (parseInt(canvas.style.height, 10) / canvasSize)), 1, 1).data;
  const rgb = `rgb(${colorPixel[0]}, ${colorPixel[1]}, ${colorPixel[2]})`;
  const value = rgbToHex(rgb);
  const pixels = [];
  const pixelMeet = {};
  pixels.push([x, y]);
  ctx.fillStyle = color;
  while (pixels.length > 0) {
    const pixel = pixels.pop();
    const xNow = pixel[0];
    const yNow = pixel[1];
    if (pixelMeet[`${xNow} ${yNow}`] === true) {
      continue;
    }
    pixelMeet[`${xNow} ${yNow}`] = true;
    // eslint-disable-next-line
    const colorPixel2 = ctx.getImageData(parseInt(xNow / (parseInt(canvas.style.width, 10) / canvasSize)),
      parseInt(yNow / (parseInt(canvas.style.height, 10) / canvasSize)), 1, 1).data;
    const rgb2 = `rgb(${colorPixel2[0]}, ${colorPixel2[1]}, ${colorPixel2[2]})`;
    const value2 = rgbToHex(rgb2);
    if (value2 === value) {
      ctx.fillRect(parseInt(xNow / (parseInt(canvas.style.width, 10) / canvasSize)),
        parseInt(yNow / (parseInt(canvas.style.height, 10) / canvasSize)), 1, 1);
      if (xNow !== mainCanvasSize && pixelMeet[`${+xNow + size} ${yNow}`] !== true) {
        pixels.push([+xNow + size, yNow]);
      }
      if (xNow !== 0 && pixelMeet[`${+xNow - size} ${yNow}`] !== true) {
        pixels.push([+xNow - size, yNow]);
      }
      if (yNow !== mainCanvasSize && pixelMeet[`${xNow} ${+yNow + size}`] !== true) {
        pixels.push([xNow, +yNow + size]);
      }
      if (yNow !== 0 && pixelMeet[`${xNow} ${+yNow - size}`] !== true) {
        pixels.push([xNow, +yNow - size]);
      }
    }
  }
  localStorage.setItem('canvas', canvas.toDataURL());
}

function fullBucket(colorNow) {
  ctx.fillStyle = colorNow;
  ctx.fillRect(0, 0, mainCanvasSize, mainCanvasSize);
  localStorage.setItem('canvas', canvas.toDataURL());
}

export { paintBucket, fullBucket };
