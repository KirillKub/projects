import { tool } from './active';
import { key } from './swapKeys';

function pressKeys(event) {
  if (event.code === key.paintBucket) {
    clear();
    document.getElementById('paintBucket').classList.add('active');
    tool.paintBucket = true;
  }
  if (event.code === key.chooseColor) {
    clear();
    document.getElementById('chooseColor').classList.add('active');
    tool.chooseColor = true;
  }
  if (event.code === key.pencil) {
    clear();
    document.getElementById('pencil').classList.add('active');
    tool.pencil = true;
  }
  if (event.code === key.stroke) {
    clear();
    document.getElementById('stroke').classList.add('active');
    tool.stroke = true;
  }
  if (event.code === key.eraser) {
    clear();
    document.getElementById('eraser').classList.add('active');
    tool.eraser = true;
  }
  if (event.code === key.bucket) {
    clear();
    document.getElementById('bucket').classList.add('active');
    tool.bucket = true;
  }
}

function clear() {
  tool.pencil = false;
  tool.chooseColor = false;
  tool.paintBucket = false;
  tool.eraser = false;
  tool.stroke = false;
  tool.bucket = false;
  document.getElementById('paintBucket').classList.remove('active');
  document.getElementById('chooseColor').classList.remove('active');
  document.getElementById('pencil').classList.remove('active');
  document.getElementById('stroke').classList.remove('active');
  document.getElementById('eraser').classList.remove('active');
  document.getElementById('bucket').classList.remove('active');
}

export { pressKeys };
