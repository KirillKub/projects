function pressKeys(event) {
    if (event.code === 'KeyB') {
      document.getElementById('paintBucket').classList.add('active');
      document.getElementById('pencil').classList.remove('active');
      document.getElementById('chooseColor').classList.remove('active');
      document.getElementById('canvas').classList.remove('pencil');
      document.getElementById('canvas').classList.remove('choose-color');
      document.getElementById('canvas').classList.add('paint-bucket');
    }
    if (event.code === 'KeyC') {
      document.getElementById('chooseColor').classList.add('active');
      document.getElementById('canvas').classList.add('choose-color');
      document.getElementById('paintBucket').classList.remove('active');
      document.getElementById('pencil').classList.remove('active');
      document.getElementById('canvas').classList.remove('pencil');
      document.getElementById('canvas').classList.remove('paint-bucket');
    }
    if (event.code === 'KeyP') {
      document.getElementById('pencil').classList.add('active');
      document.getElementById('canvas').classList.add('pencil');
      document.getElementById('paintBucket').classList.remove('active');
      document.getElementById('chooseColor').classList.remove('active');
      document.getElementById('canvas').classList.remove('choose-color');
      document.getElementById('canvas').classList.remove('paint-bucket');
    }
  }
  
  // document.addEventListener('keydown', pressKeys);

  export { pressKeys }