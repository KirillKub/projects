import {ctxValue,canvasData} from '../index';

let ctx1;
function createFrame(){
    let canvas1 = document.createElement('canvas');
    ctx1 = canvas1.getContext('2d');
    if(canvasData) ctx1 = canvasData;
    let div = document.createElement('div');
    let button = document.createElement('button');
    let button2 = document.createElement('button');
    div.classList.add('frame');
    button.textContent = 'duplicate'
    button.classList.add('duplicate')
    button2.textContent = 'delete'
    button2.classList.add('delete')
    canvas1.style.width = '128px';
    canvas1.style.height = '128px';
    canvas1.width = '128';
    canvas1.height = '128';
    div.appendChild(canvas1);
    div.appendChild(button);
    div.appendChild(button2);
    document.getElementById('addFrames').append(div);
}

function drawFrame(){
    if(ctxValue) ctx1 = ctxValue;
    const dataURL = localStorage.getItem('canvas');
    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.src = dataURL;
    ctx1.drawImage(img, 0, 0,128,128);
}

export {createFrame,drawFrame}