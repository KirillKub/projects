import { animation } from './animation';

let fps = 12;
const sec = 1000;
let interval = sec / fps;
let animate = setInterval(animation, interval);

function swapFps() {
  document.getElementById('value').value = `${document.getElementById('range').value} fps`;
  fps = document.getElementById('range').value;
  interval = sec / fps;
  clearInterval(animate);
  if (+fps !== 0) {
    animate = setInterval(animation, interval);
  }
}

export { swapFps, interval };
