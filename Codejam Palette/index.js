let isPencil = false;
let isDraw = false;
let isPaintBucket = false; 
let isChooseColor = false;
let color = '#FFC107';
let colorPrev = '';
document.getElementById('swapPrevColor').style.background = '#FFEB3B'
document.getElementById('inputColor').value = '#FFC107';
function draw(){
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
   if(localStorage.getItem('canvas')){
    let dataURL = localStorage.getItem('canvas');
    let img = new Image;
    img.src = dataURL;
    img.onload = function () {
      ctx.drawImage(img, 0, 0);
  };
  }
  else {
    const getArr = async (url) => {
      try {
        const arr = await fetch(url).then(responce => responce.json())
        return arr;
      } catch(err){
        console.log(err)
      }
    }
    let canvasSize = 512;
    let mas = getArr('https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/4x4.json')
    mas.then(data => {
      for(let i = 0; i < data.length; i++){
        for(let j = 0; j < data.length; j++){
          let x = canvasSize / data.length * i;
          let y = canvasSize / data.length * j;
          let res = `#${data[i][j]}`;
          ctx.fillStyle = res;
          ctx.fillRect(x, y, canvasSize / data.length, canvasSize / data.length);
        }
      }
    })
  }
}

document.getElementById('mainItems').addEventListener('click', function(event){
  let target = event.target
  let element = target.closest('div');
  if(element.className === 'main__items' || element.id === 'transform')
    return;
  element.classList.add('active');
  if(element.id === 'pencil'){
    isPencil = true;
    isPaintBucket = false;
    isChooseColor = false;
    document.getElementById('paintBucket').classList.remove('active');
    document.getElementById('chooseColor').classList.remove('active');
  }
  if(element.id === 'paintBucket'){
    isPencil = false;
    isChooseColor = false;
    isPaintBucket = true;
    document.getElementById('chooseColor').classList.remove('active');
    document.getElementById('pencil').classList.remove('active');
  }
  if(element.id === 'chooseColor'){
    isPencil = false;
    isChooseColor = true;
    isPaintBucket = false;
    document.getElementById('pencil').classList.remove('active');
    document.getElementById('paintBucket').classList.remove('active');
  }
})

let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');
document.getElementById('canvas').addEventListener('mousedown', function(event){
  if(isPencil)
  { 
    ctx.beginPath();
    let x = event.offsetX;
    let y = event.offsetY;
    ctx.moveTo(x,y);
    isDraw = true
  }
})

document.getElementById('canvas').addEventListener('mousemove', function(event){
  if(isDraw){
    // let x = event.offsetX;
    // let y = event.offsetY;
    // ctx.lineWidth = 128;
    // ctx.lineTo(x,y)
    // ctx.stroke();
    let x = event.offsetX;
    let y = event.offsetY;
    for(let i = 1; i <= 4; i++){
      if(x < 128 * i){
        x = 128 * (i - 1);
        break;
      }
    }
    for(let i = 1; i <= 4; i++){
      if(y < 128 * i){
        y = 128 * (i - 1);
        break;
      }
    }
    ctx.fillStyle = color;
    ctx.fillRect(x,y,128,128);
  }
})

document.getElementById('canvas').addEventListener('mouseup', function(){
  isDraw = false;
  localStorage.setItem('canvas', canvas.toDataURL());
})

document.getElementById('canvas').addEventListener('mousedown',function(event){
  if(isPencil)
  { 
    let x = event.offsetX;
    let y = event.offsetY;
    for(let i = 1; i <= 4; i++){
      if(x < 128 * i){
        x = 128 * (i - 1);
        break;
      }
    }
    for(let i = 1; i <= 4; i++){
      if(y < 128 * i){
        y = 128 * (i - 1);
        break;
      }
    }
    ctx.fillStyle = color;
    ctx.fillRect(x,y,128,128);
    localStorage.setItem('canvas', canvas.toDataURL());
  }
})

document.getElementById('canvas').addEventListener('click',function(){
  if(isPaintBucket){
    ctx.fillStyle = color;
    ctx.fillRect(0,0,512,512);
    localStorage.setItem('canvas', canvas.toDataURL());
  }
})

document.getElementById('mainColors').addEventListener('click', function(event){
  let target = event.target
  let element = target.closest('div');
  if(element.className === 'main__colors'){
    return;
  }
  colorPrev = document.getElementById('swapPrevColor').style.background;
  colorPrev = rgbToHex(colorPrev);
  document.getElementById('swapPrevColor').style.background = color;
  if(element.id == 'red' || element.className == 'circle-red'){
    color = '#F74141';
  }
  if(element.id === 'blue' || element.className == 'circle-blue'){
    color = '#0088ff';
  }
  if(element.id === 'prevColor' || element.className == 'circle-prev'){
    document.getElementById('swapCurrentColor').style.background = colorPrev;
    document.getElementById('inputColor').value = colorPrev;
    color = colorPrev;
    return;
  }
  document.getElementById('swapCurrentColor').style.background = color;
  document.getElementById('inputColor').value = color;
  color = color;
})

document.getElementById('canvas').addEventListener('click', function(event){
  if(isChooseColor){
    let x = event.offsetX;
    let y = event.offsetY;
    let test = ctx.getImageData(x, y, 1, 1).data;
    rgb = `rgb(${test[0]}, ${test[1]}, ${test[2]})`;
    document.getElementById('swapPrevColor').style.background = color;
    color = rgbToHex(rgb);
    document.getElementById('swapCurrentColor').style.background = color;
    document.getElementById('inputColor').value = color;
  }
})

document.getElementById('inputColor').addEventListener('input',function(){
  document.getElementById('swapPrevColor').style.background = color;
  color = document.getElementById('inputColor').value;
  document.getElementById('swapCurrentColor').style.background = color;
})


function rgbToHex(str) {
  str = str.slice(4,str.length-1);
  str = str.split(', ');
  return "#" + ((1 << 24) + (+str[0] << 16) + (+str[1] << 8) + +str[2]).toString(16).slice(1);
}

setInterval(colorNow,0);

function colorNow(){
  ctx.strokeStyle = color;
}

document.addEventListener('keydown',function(event){
  if(event.code === 'KeyB'){
    document.getElementById('paintBucket').classList.add('active');
    isPencil = false;
    isChooseColor = false;
    isPaintBucket = true;
    document.getElementById('pencil').classList.remove('active');
    document.getElementById('chooseColor').classList.remove('active');
  }
  if(event.code === 'KeyC'){
    document.getElementById('chooseColor').classList.add('active');
    isPencil = false;
    isChooseColor = true;
    isPaintBucket = false;
    document.getElementById('paintBucket').classList.remove('active');
    document.getElementById('pencil').classList.remove('active');
  }
  if(event.code === 'KeyP'){
    document.getElementById('pencil').classList.add('active');
    isPencil = true;
    isChooseColor = false;
    isPaintBucket = false;
    document.getElementById('paintBucket').classList.remove('active');
    document.getElementById('chooseColor').classList.remove('active');
  }
})

draw();