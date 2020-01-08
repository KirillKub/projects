import { rgbToHex } from '../color/rgbToHex';
import { makeActiveTool, activeTool } from '../tools/active';
import { swapKeys } from '../tools/swapKeys';

const black = 'rgb(0, 0, 0)';
const white = 'rgb(255, 255, 255)';
let name = ['pencil','paintBucket','chooseColor','eraser','stroke','bucket']
let value = ['B','C','P','S','E','A']

for(let i = 0; i < name.length; i++){
  let div = document.createElement('div');
  div.id = name[i];
  document.body.appendChild(div);
}

let eraser = document.getElementById('eraser');

describe('color', () => {
  test('rgb(0, 0, 0) to equal #000000', () => {
    expect(rgbToHex(black)).toBe('#000000');
  });
  test('rgb(255, 255, 255) to equal #ffffff', () => {
    expect(rgbToHex(white)).toBe('#ffffff');
  });
});

let elem = document.createElement('div');
elem.id = 'pencil'
let checkPencil = {target:{
    closest: () => {
      return elem
    }
  },
}

describe('check class for active tool', () =>{
  for(let i = 0; i < name.length; i++){
    test('className contain active', () => {
      expect(makeActiveTool(`${name[i]}`).className).toBe('active');
    });
  }
  let paintBucket = makeActiveTool('paintBucket').className;
  test('className contain active', () => {
    expect(paintBucket).toBe('active');
  });
  test('className don\'t contain active', () => {
    expect(eraser.className).not.toBe('active');
  });
});

describe('active tool', () =>{
  test('active tool is pencil', () => {
    expect(activeTool(checkPencil).pencil).toBe(true);
  });
  test('inactive tool', () => {
    expect(activeTool(checkPencil).eraser).toBe(false)
  })
});

let swap = document.createElement('div')
swap.id = 'swapKeys';
document.body.append(swap);

for(let i = 0; i < value.length; i++){
  let input = document.createElement('input');
  input.classList.add('inputKey');
  input.value = value[i];
  document.body.appendChild(input);
}

describe('check keys after swap', () =>{
  test('pencil key now KeyP', () => {
    expect(swapKeys().pencil).toBe('KeyP');
  });
  let elements = document.getElementsByClassName('inputKey');
  elements[3].value = 'G';
  test('stroke key isn\'t KeyP now', () => {
    expect(swapKeys().pencil).not.toBe('KeyS');
  });
});
