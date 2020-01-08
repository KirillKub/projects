const key = {
  paintBucket: 'KeyB',
  chooseColor: 'KeyC',
  pencil: 'KeyP',
  stroke: 'KeyS',
  eraser: 'KeyE',
  bucket: 'KeyA',
};

function swapKeys() {
  const elements = document.getElementsByClassName('inputKey');
  const keyNow = Object.keys(key);
  for (let i = 0; i < elements.length; i += 1) {
    if (elements[i].value > 0 && elements[i].value < 10) key[keyNow[i]] = `Digit${elements[i].value}`;
    else key[keyNow[i]] = `Key${elements[i].value}`;
  }
  document.getElementById('swapKeys').style.display = 'none';
  return key;
}


export { swapKeys, key };
