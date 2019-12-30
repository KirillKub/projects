import {color, ctx } from '../index'
import { canvasSize } from '../tools/size'
import {rgbToHex } from '../color/rgbToHex'

function paintBucket(event){
    let size = parseInt(canvas.style.width) / canvasSize;
    let x = event.offsetX;
    let y = event.offsetY;
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
        const colorPixel2 = ctx.getImageData(parseInt(xNow / (parseInt(canvas.style.width, 10) / canvasSize)),
        parseInt(yNow / (parseInt(canvas.style.height, 10) / canvasSize)), 1, 1).data;
        const rgb2 = `rgb(${colorPixel2[0]}, ${colorPixel2[1]}, ${colorPixel2[2]})`;
        const value2 = rgbToHex(rgb2);
        if (value2 === value) {
            ctx.fillRect(parseInt(xNow / (parseInt(canvas.style.width, 10) / canvasSize)),
            parseInt(yNow / (parseInt(canvas.style.height, 10) / canvasSize)), 1, 1);
            if (xNow !== canvasSize && pixelMeet[`${+xNow + size} ${yNow}`] !== true) {
                pixels.push([+xNow + size, yNow]);
            }
            if (xNow !== 0 && pixelMeet[`${+xNow - size} ${yNow}`] !== true) {
                pixels.push([+xNow - size, yNow]);
            }
            if (yNow !== canvasSize && pixelMeet[`${xNow} ${+yNow + size}`] !== true) {
                pixels.push([xNow, +yNow + size]);
            }
            if (yNow !== 0 && pixelMeet[`${xNow} ${+yNow - size}`] !== true) {
                pixels.push([xNow, +yNow - size]);
            }
        }
    }
    localStorage.setItem('canvas', canvas.toDataURL());
}

function fullBucket(color){
    ctx.fillStyle = color;
    ctx.fillRect(0,0,512,512);
    localStorage.setItem('canvas', canvas.toDataURL());
}

export { paintBucket,fullBucket}
