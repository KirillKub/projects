import {color, ctx } from '../index'
import { canvasSize } from '../tools/size'
import {rgbToHex } from '../color/rgbToHex'

function paintBucket(event){
    const x = event.offsetX;
    const y = event.offsetY;
    const colorPixel = ctx.getImageData(x / (parseInt(canvas.style.width, 10) / canvasSize),
         y / (parseInt(canvas.style.height, 10) / canvasSize), 1, 1).data;
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
        const colorPixel2 = ctx.getImageData(xNow, yNow, 1, 1).data;
        const rgb2 = `rgb(${colorPixel2[0]}, ${colorPixel2[1]}, ${colorPixel2[2]})`;
        const value2 = rgbToHex(rgb2);
        if (value2 === value) {
            ctx.fillRect(xNow / (parseInt(canvas.style.width, 10) / canvasSize),
                yNow / (parseInt(canvas.style.height, 10) / canvasSize), 1, 1);
            if (xNow !== 512 && pixelMeet[`${+xNow + +1} ${yNow}`] !== true) {
                pixels.push([xNow + 1, yNow]);
            }
            if (xNow !== 0 && pixelMeet[`${+xNow - +1} ${yNow}`] !== true) {
                pixels.push([xNow - 1, yNow]);
            }
            if (yNow !== 512 && pixelMeet[`${xNow} ${+yNow + +1}`] !== true) {
                pixels.push([xNow, yNow + 1]);
            }
            if (yNow !== 0 && pixelMeet[`${xNow} ${+yNow - +1}`] !== true) {
                pixels.push([xNow, yNow - 1]);
            }
        }
    }
    localStorage.setItem('canvas', canvas.toDataURL());
}

export { paintBucket }