function draw4(){
  const getArr = async (url) => {
    try {
      const arr = await fetch(url).then(responce => responce.json())
      return arr;
    } catch(err){
      console.log(err)
    }
  }
  let a = 512;
  // a = parseInt(a);
  let mas = getArr('https://raw.githubusercontent.com/rolling-scopes-school/tasks/master/tasks/stage-2/codejam-canvas/data/4x4.json')
  let canvas = document.getElementById('canvas');
  let ctx = canvas.getContext('2d');
  mas.then(data => {
    for(let i = 0; i < data.length; i++){
      for(let j = 0; j < data.length; j++){
        let res = '#';
        let x = a / data.length * i;
        let y = a / data.length * j;
        res += data[i][j];
        ctx.fillStyle = res;
        ctx.fillRect(x,y,a / data.length,a / data.length);
      }
    }
  })
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById('canvas').style.background = 'none';
}


draw4();