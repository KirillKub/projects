function makeActiveTool(name){
    document.getElementById('pencil').classList.remove('active');
    document.getElementById('paintBucket').classList.remove('active');
    document.getElementById('chooseColor').classList.remove('active');
    document.getElementById('eraser').classList.remove('active');
    document.getElementById('stroke').classList.remove('active');
    document.getElementById(`${name}`).classList.add('active');
  }

  export{makeActiveTool}