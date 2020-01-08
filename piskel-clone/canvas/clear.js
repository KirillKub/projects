import { ctx } from '../index';
import { ctx1 } from '../frames/create';

function clearCanvas() {
  const canvas = document.getElementById('canvas');
  ctx.clearRect(0, 0, 512, 512);
  ctx1.clearRect(0, 0, 128, 128);
  ctx.fillStyle = 'lightgrey';
  ctx.fillRect(0, 0, 512, 512);
  localStorage.setItem('canvas', canvas.toDataURL());
}

export { clearCanvas };
