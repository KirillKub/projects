import { ctx } from '../index';
import { ctx1 } from '../frames/create';

export default function clearCanvas() {
  const mainCanvasSize = 512;
  const frameCanvasSize = 128;
  const canvas = document.getElementById('canvas');
  ctx.clearRect(0, 0, mainCanvasSize, mainCanvasSize);
  ctx1.clearRect(0, 0, frameCanvasSize, frameCanvasSize);
  ctx.fillStyle = 'lightgrey';
  ctx.fillRect(0, 0, mainCanvasSize, mainCanvasSize);
  localStorage.setItem('canvas', canvas.toDataURL());
}
