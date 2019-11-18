let isPencil = false;
let isDraw = false;
let isPaintBucket = false;
let isChooseColor = false;
let color = '#FFC107';
let colorPrev = '';
let canvasSize = 512;
const canvas = document.getElementById('canvas');
canvas.style.width = '512px';
canvas.style.height = '512px';
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
document.getElementById('swapPrevColor').style.background = '#FFEB3B';
document.getElementById('inputColor').value = '#FFC107';
let town = document.getElementById('inputTown').value;
let isImage = false;

if (localStorage.getItem('canvas')) {
  const dataURL = localStorage.getItem('canvas');
  const img = new Image();
  img.crossOrigin = "Anonymous";
  img.src = dataURL;
  img.onload = function load() {
    ctx.drawImage(img, 0, 0,512,512);
    }
  };

if(localStorage.getItem('size')){
  if(localStorage.getItem('size') === '128'){
    document.getElementById('size128').classList.add('active');
    document.getElementById('size256').classList.remove('active');
    document.getElementById('size512').classList.remove('active');
  }
  if(localStorage.getItem('size') === '256'){
    document.getElementById('size256').classList.add('active');
    document.getElementById('size128').classList.remove('active');
    document.getElementById('size512').classList.remove('active');
  }
  if(localStorage.getItem('size') === '512'){
    document.getElementById('size512').classList.add('active');
    document.getElementById('size128').classList.remove('active');
    document.getElementById('size256').classList.remove('active');
  }
}


async function searchImage(query){
    const baseUrl = `https://api.unsplash.com/photos/random?query=town,${town}&`;
    const queryString = `${query}`;
    const url = baseUrl + queryString;
    try{
        const responce = await fetch(url);
        const data = await responce.json();
        return data;
    }
    catch(err){
        console.log(err);
    }
}
let image = searchImage('client_id=ac0b1211b12e78e6cac4831942dc71d2af196faa332462c746a0a3d213383c23')

setInterval(townNow,0)

function townNow(){
  town = document.getElementById('inputTown').value;
}

document.getElementById('inputTown').addEventListener('focusout', function(){
  image = searchImage('client_id=ac0b1211b12e78e6cac4831942dc71d2af196faa332462c746a0a3d213383c23')
  document.addEventListener('keydown', keys);
})

document.getElementById('inputTown').addEventListener('focusin', function(){
  document.removeEventListener('keydown', keys);
})

document.getElementById('blackAndWhite').addEventListener('click', function(){
  if(!isImage){
    alert('Upload Image')
  }
  else{
    if(document.getElementById('canvas').style.filter == 'grayscale(1)')
     document.getElementById('canvas').style.filter = 'grayscale(0)';
    else document.getElementById('canvas').style.filter = 'grayscale(1)';
  }
})

document.getElementById('downloadImage').addEventListener('click',draw)
document.getElementById('downloadImage').addEventListener('click',function(){
    if(canvasSize === 512){
      document.getElementById('size512').classList.add('active');
      document.getElementById('size128').classList.remove('active');
      document.getElementById('size256').classList.remove('active');
    }
    if(canvasSize === 128){
      document.getElementById('size128').classList.add('active');
      document.getElementById('size256').classList.remove('active');
      document.getElementById('size512').classList.remove('active');
    }
    if(canvasSize === 256){
      document.getElementById('size256').classList.add('active');
      document.getElementById('size128').classList.remove('active');
      document.getElementById('size512').classList.remove('active');
    }
})

async function draw(){
  isImage = true;
  let img = new Image();
  img.crossOrigin = "Anonymous";
  try{
  let { urls } = await image;
  img.src = urls.small;
  img.onload = function(){
      ctx.drawImage(img,((512 - img.width) / 2) / (512 / canvasSize) ,((512 - img.height) / 2) / (512 / canvasSize),
      img.width / (512 / canvasSize), img.height / (512 / canvasSize));
    }
  }
  catch(err){
    console.log(err)
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  localStorage.setItem('canvas', canvas.toDataURL());
}

document.getElementById('size').addEventListener('click',function(event){
  let target = event.target;
  if(target.id === 'size128'){
    canvasSize = 128;
    canvas.height = 128;
    canvas.width = 128;
    target.classList.add('active');
    document.getElementById('size256').classList.remove('active');
    document.getElementById('size512').classList.remove('active');
    localStorage.setItem('size', canvasSize);
        let dataURL = localStorage.getItem('canvas');
        let img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = dataURL;
        img.onload = function load() {
          ctx.drawImage(img,0,0, 
          512 / (512 / canvasSize), 512 / (512 / canvasSize));
    }
  }
  if(target.id === 'size256'){
    canvasSize = 256;
    canvas.height = 256;
    canvas.width = 256;
    target.classList.add('active');
    document.getElementById('size128').classList.remove('active');
    document.getElementById('size512').classList.remove('active');
    localStorage.setItem('size', canvasSize);
        let dataURL = localStorage.getItem('canvas');
        let img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = dataURL;
        img.onload = function load() {
          ctx.drawImage(img,0 ,0, 
          512 / (512 / canvasSize), 512 / (512 / canvasSize));
    }
  }
  if(target.id === 'size512'){
    canvasSize = 512;
    canvas.height = 512;
    canvas.width = 512;
    target.classList.add('active');
    document.getElementById('size128').classList.remove('active');
    document.getElementById('size256').classList.remove('active');
    localStorage.setItem('size', canvasSize);
        let dataURL = localStorage.getItem('canvas');
        let img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = dataURL;
        img.onload = function load() {
          ctx.drawImage(img,0,0, 
          512 / (512 / canvasSize), 512 / (512 / canvasSize));
    }
  }
})

function rgbToHex(str) {
  let rgbElements = str.slice(4, str.length - 1);
  rgbElements = rgbElements.split(', ');
  return `#${((1 << 24) + (+rgbElements[0] << 16) + (+rgbElements[1] << 8) + +rgbElements[2]).toString(16).slice(1)}`;
}

document.getElementById('mainItems').addEventListener('click', (event) => {
  const { target } = event;
  const element = target.closest('div');
  if (element.className === 'main__items' || element.id === 'transform') { return; }
  element.classList.add('active');
  if (element.id === 'pencil') {
    isPencil = true;
    isPaintBucket = false;
    isChooseColor = false;
    document.getElementById('paintBucket').classList.remove('active');
    document.getElementById('chooseColor').classList.remove('active');
  }
  if (element.id === 'paintBucket') {
    isPencil = false;
    isChooseColor = false;
    isPaintBucket = true;
    document.getElementById('chooseColor').classList.remove('active');
    document.getElementById('pencil').classList.remove('active');
  }
  if (element.id === 'chooseColor') {
    isPencil = false;
    isChooseColor = true;
    isPaintBucket = false;
    document.getElementById('pencil').classList.remove('active');
    document.getElementById('paintBucket').classList.remove('active');
  }
});
document.getElementById('canvas').addEventListener('mousedown', (event) => {
  if (isPencil) {
    ctx.beginPath();
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.moveTo(x / (parseInt(canvas.style.width) / canvasSize) , y / (parseInt(canvas.style.height) / canvasSize));
    isDraw = true;
  }
});

document.getElementById('canvas').addEventListener('mousemove', (event) => {
  if (isDraw) {
    let x = event.offsetX;
    let y = event.offsetY;
    ctx.lineTo(x / (parseInt(canvas.style.width) / canvasSize) , y / (parseInt(canvas.style.height) / canvasSize));
    ctx.stroke();
  }
});

document.getElementById('canvas').addEventListener('mouseup', () => {
  isDraw = false;
  localStorage.setItem('canvas', canvas.toDataURL());
});

document.getElementById('canvas').addEventListener('mouseleave', () => {
  isDraw = false;
  localStorage.setItem('canvas', canvas.toDataURL());
});

document.getElementById('canvas').addEventListener('mousedown', (event) => {
  if (isPencil) {
    let x = event.offsetX;
    let y = event.offsetY;
    ctx.fillStyle = color;
    ctx.fillRect(x / (512 / canvasSize) , y / (512 / canvasSize), 1,1);
    localStorage.setItem('canvas', canvas.toDataURL());
  }
});

document.getElementById('mainColors').addEventListener('click', (event) => {
  const { target } = event;
  const element = target.closest('div');
  if (element.className === 'main__colors') {
    return;
  }
  colorPrev = document.getElementById('swapPrevColor').style.background;
  colorPrev = rgbToHex(colorPrev);
  document.getElementById('swapPrevColor').style.background = color;
  if (element.id === 'red' || element.className === 'circle-red') {
    color = '#F74141';
  }
  if (element.id === 'blue' || element.className === 'circle-blue') {
    color = '#0088ff';
  }
  if (element.id === 'prevColor' || element.className === 'circle-prev') {
    document.getElementById('swapCurrentColor').style.background = colorPrev;
    document.getElementById('inputColor').value = colorPrev;
    color = colorPrev;
    return;
  }
  document.getElementById('swapCurrentColor').style.background = color;
  document.getElementById('inputColor').value = color;
});

document.getElementById('canvas').addEventListener('click', (event) => {
  if (isChooseColor) {
    const x = event.offsetX;
    const y = event.offsetY;
    const colorPixel = ctx.getImageData(x / (parseInt(canvas.style.width) / canvasSize) , y / (parseInt(canvas.style.height) / canvasSize) , 1, 1).data;
    const rgb = `rgb(${colorPixel[0]}, ${colorPixel[1]}, ${colorPixel[2]})`;
    document.getElementById('swapPrevColor').style.background = color;
    color = rgbToHex(rgb);
    document.getElementById('swapCurrentColor').style.background = color;
    document.getElementById('inputColor').value = color;
  }
});

document.getElementById('inputColor').addEventListener('input', () => {
  document.getElementById('swapPrevColor').style.background = color;
  color = document.getElementById('inputColor').value;
  document.getElementById('swapCurrentColor').style.background = color;
});

function colorNow() {
  ctx.strokeStyle = color;
}

setInterval(colorNow, 0);

document.addEventListener('keydown', keys);

function keys(event){
  if (event.code === 'KeyB') {
    document.getElementById('paintBucket').classList.add('active');
    isPencil = false;
    isChooseColor = false;
    isPaintBucket = true;
    document.getElementById('pencil').classList.remove('active');
    document.getElementById('chooseColor').classList.remove('active');
    document.getElementById('canvas').classList.remove('pencil');
    document.getElementById('canvas').classList.remove('choose-color');
    document.getElementById('canvas').classList.add('paint-bucket');
  }
  if (event.code === 'KeyC') {
    document.getElementById('chooseColor').classList.add('active');
    isPencil = false;
    isChooseColor = true;
    isPaintBucket = false;
    document.getElementById('canvas').classList.add('choose-color');
    document.getElementById('paintBucket').classList.remove('active');
    document.getElementById('pencil').classList.remove('active');
    document.getElementById('canvas').classList.remove('pencil');
    document.getElementById('canvas').classList.remove('paint-bucket');
  }
  if (event.code === 'KeyP') {
    document.getElementById('pencil').classList.add('active');
    isPencil = true;
    isChooseColor = false;
    isPaintBucket = false;
    document.getElementById('canvas').classList.add('pencil');
    document.getElementById('paintBucket').classList.remove('active');
    document.getElementById('chooseColor').classList.remove('active');
    document.getElementById('canvas').classList.remove('choose-color');
    document.getElementById('canvas').classList.remove('paint-bucket');
  }
}

document.getElementById('canvas').addEventListener('click', (event) => {
  if (isPaintBucket) {
    let x = event.offsetX;
    let y = event.offsetY;
    const colorPixel = ctx.getImageData(x / (parseInt(canvas.style.width) / canvasSize) , y / (parseInt(canvas.style.height) / canvasSize) , 1, 1).data;
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
        ctx.fillRect(xNow / (parseInt(canvas.style.width) / canvasSize), yNow / (parseInt(canvas.style.height) / canvasSize), 1, 1);
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
});

document.getElementById('canvas').addEventListener('mouseover', () => {
  if (isPencil) {
    document.getElementById('canvas').classList.add('pencil');
  }
  if (isChooseColor) {
    document.getElementById('canvas').classList.add('choose-color');
  }
  if (isPaintBucket) {
    document.getElementById('canvas').classList.add('paint-bucket');
  }
});

document.getElementById('canvas').addEventListener('mouseleave', () => {
  document.getElementById('canvas').classList.remove('pencil');
  document.getElementById('canvas').classList.remove('choose-color');
  document.getElementById('canvas').classList.remove('paint-bucket');
});

