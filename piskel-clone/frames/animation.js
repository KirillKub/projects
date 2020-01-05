import {frameBox } from '../frames/create'

let count = 0;
function animation(){
    const canvas = document.getElementById('animation');
    const ctx = canvas.getContext('2d');
    let dataURL;
    try{
    dataURL = frameBox[count].toDataURL()
    }
    catch{
      count = 0;
    }
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = dataURL;
    img.onload = function load() {
    ctx.drawImage(img, 0, 0, 256, 256);
    count += 1;
    if(count === frameBox.length || count > frameBox.length) {
      count = 0
    }
  }
}

function fullScreen()
{
  if("fullscreenEnabled" in document) {
    if(document.fullscreenEnabled) {
      let element = document.getElementById("animation");
      if("requestFullscreen" in element) {
        element.requestFullscreen();
        }
      }
    }
  else {
    alert("User doesn't allow full screen");
  }
}

export { animation, fullScreen }