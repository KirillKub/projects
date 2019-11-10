let isPencil = false;
let isDraw = false;
let isPaintBucket = false;
let isChooseColor = false;
let color = '#FFC107';
let colorPrev = '';
document.getElementById('swapPrevColor').style.background = '#FFEB3B';
document.getElementById('inputColor').value = '#FFC107';
function draw() {
  const canvas = document.getElementById('canvas');
  const ctx = canvas.getContext('2d');
  if (localStorage.getItem('canvas')) {
    const dataURL = localStorage.getItem('canvas');
    const img = new Image();
    img.src = dataURL;
    img.onload = function load() {
      ctx.drawImage(img, 0, 0);
    };
  } else {
    const getArr = async (url) => {
      try {
        const arr = await fetch(url).then((responce) => responce.json());
        return arr;
      } catch (err) {
        return err;
      }
    };
    const canvasSize = 512;
    const mas = getArr('https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/4x4.json');
    mas.then((data) => {
      for (let i = 0; i < data.length; i += 1) {
        for (let j = 0; j < data.length; j += 1) {
          const x = canvasSize / (data.length * i);
          const y = canvasSize / (data.length * j);
          const res = `#${data[i][j]}`;
          ctx.fillStyle = res;
          ctx.fillRect(x, y, canvasSize / data.length, canvasSize / data.length);
        }
      }
    });
  }
}

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
    // let x = event.offsetX;
    // let y = event.offsetY;
    // ctx.lineWidth = 128;
    // ctx.lineTo(x,y)
    // ctx.stroke();
    let x = event.offsetX;
    let y = event.offsetY;
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
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 128, 128);
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
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 128, 128);
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
  }
  if (event.code === 'KeyC') {
    document.getElementById('chooseColor').classList.add('active');
    isPencil = false;
    isChooseColor = true;
    isPaintBucket = false;
    document.getElementById('paintBucket').classList.remove('active');
    document.getElementById('pencil').classList.remove('active');
  }
  if (event.code === 'KeyP') {
    document.getElementById('pencil').classList.add('active');
    isPencil = true;
    isChooseColor = false;
    isPaintBucket = false;
    document.getElementById('paintBucket').classList.remove('active');
    document.getElementById('chooseColor').classList.remove('active');
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
    pixelMeet[`${x} ${y}`] = true;
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 128, 128);

    if (x !== 384) {
      pixels.push([x + 128, y]);
    }
    if (x !== 0) {
      pixels.push([x - 128, y]);
    }
    if (y !== 384) {
      pixels.push([x, y + 128]);
    }
    if (y !== 0) {
      pixels.push([x, y - 128]);
    }
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

draw();
