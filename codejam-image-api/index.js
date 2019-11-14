let isPencil = false;
let isDraw = false;
let isPaintBucket = false;
let isChooseColor = false;
let color = '#FFC107';
let colorPrev = '';
document.getElementById('swapPrevColor').style.background = '#FFEB3B';
document.getElementById('inputColor').value = '#FFC107';

// if (localStorage.getItem('canvas')) {
//     const dataURL = localStorage.getItem('canvas');
//     const img = new Image();
//     img.src = dataURL;
//     img.onload = function load() {
//       ctx.drawImage(img, 0, 0);
//     };
//   }

async function searchImage(query){
    const baseUrl = 'https://api.unsplash.com/photos/';
    const queryString = `?${query}`;
    const url = baseUrl + queryString;
    try{
        const responce = await fetch(url);
        const data = await responce.json();
        return data[0].urls.small;
    }
    catch(err){
        console.log(err);
    }
}

document.getElementById('downloadImage').addEventListener('click',function(){
    let image = searchImage('client_id=27cbaaa385dfdfd21301a5372e2aed7b0b3756e5bd9d222b2dac2ba201b0fe0d')
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');
    let img = new Image();
    image.then(function(data){
        img.src = data;
        img.onload = function(){
            ctx.drawImage(img,0,0,512,512);
            }
            //ctx.clearRect(0, 0, canvas.width, canvas.height);
    })
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

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
document.getElementById('canvas').addEventListener('mousedown', (event) => {
  if (isPencil) {
    ctx.beginPath();
    const x = event.offsetX;
    const y = event.offsetY;
    ctx.moveTo(x, y);
    isDraw = true;
  }
});

document.getElementById('canvas').addEventListener('mousemove', (event) => {
  if (isDraw) {
    let x = event.offsetX;
    let y = event.offsetY;
    ctx.lineTo(x,y)	
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
    ctx.fillRect(x, y, 2, 2);
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
    const colorPixel = ctx.getImageData(x, y, 1, 1).data;
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

document.addEventListener('keydown', (event) => {
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
});
document.getElementById('canvas').addEventListener('click', (event) => {
  if (isPaintBucket) {
    let x = event.offsetX;
    let y = event.offsetY;
    const colorPixel = ctx.getImageData(x, y, 1, 1).data;
    const rgb = `rgb(${colorPixel[0]}, ${colorPixel[1]}, ${colorPixel[2]})`;
    const value = rgbToHex(rgb);
    for (let i = 1; i <= 4; i += 1) {
      if (x < 128 * i) {
        x = 128 * (i - 1);
        break;
      }
    }
    for (let i = 1; i <= 4; i += 1) {
      if (y < 128 * i) {
        y = 128 * (i - 1);
        break;
      }
    }
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
        ctx.fillRect(xNow, yNow, 128, 128);
        if (xNow !== 384 && pixelMeet[`${+xNow + +128} ${yNow}`] !== true) {
          pixels.push([xNow + 128, yNow]);
        }
        if (xNow !== 0 && pixelMeet[`${+xNow - +128} ${yNow}`] !== true) {
          pixels.push([xNow - 128, yNow]);
        }
        if (yNow !== 384 && pixelMeet[`${xNow} ${+yNow + +128}`] !== true) {
          pixels.push([xNow, yNow + 128]);
        }
        if (yNow !== 0 && pixelMeet[`${xNow} ${+yNow - +128}`] !== true) {
          pixels.push([xNow, yNow - 128]);
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

