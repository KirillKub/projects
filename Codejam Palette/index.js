let isPencil = false;
let isDraw = false;
let isPaintBucket = false; 
let isChooseColor = false;
let color = '#FFC107';
let colorPrev = ''
document.getElementById('swapPrevColor').style.background = '#FFEB3B'
document.getElementById('inputColor').value = '#FFC107';

function draw(){
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
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
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

document.getElementById('mainItems').addEventListener('click', function(event){
  let target = event.target
  let element = target.closest('div');
  if(element.className === 'main__items')
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
    let x = event.offsetX;
    let y = event.offsetY;
    ctx.lineTo(x,y)
    ctx.stroke();
  }
})

document.getElementById('canvas').addEventListener('mouseup', function(event){
  isDraw = false;
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
    let a = 128
    for(let i = 0; i < 4; i++){
          if(x <= a){ 
            x = a;
            a = 128;
            break;
          }
          a += 128;
      }
    for(let i = 0; i < 4; i++){
        if(y <= a){
          y = a;
          break
        }
        a += 128;
      }
      const getArr = async (url) => {
        try {
          const arr = await fetch(url).then(responce => responce.json())
          return arr;
        } catch(err){
          console.log(err)
        }
      }
      let mas = getArr('https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/4x4.json')
      mas.then(data => {
            document.getElementById('swapPrevColor').style.background = color;
            color = `#${data[x/128 - 1][y/128 - 1]}`;
            document.getElementById('swapCurrentColor').style.background = color;
            document.getElementById('inputColor').value = color;
      })
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

draw();