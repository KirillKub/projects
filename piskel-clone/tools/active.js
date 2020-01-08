const tool = {
  pencil: false,
  chooseColor: false,
  paintBucket: false,
  eraser: false,
  stroke: false,
  bucket: false,
};

function makeActiveTool(name) {
  document.getElementById('pencil').classList.remove('active');
  document.getElementById('paintBucket').classList.remove('active');
  document.getElementById('chooseColor').classList.remove('active');
  document.getElementById('eraser').classList.remove('active');
  document.getElementById('stroke').classList.remove('active');
  document.getElementById('bucket').classList.remove('active');
  document.getElementById(`${name}`).classList.add('active');
  return document.getElementById(`${name}`);
}

function activeTool(event) {
  const { target } = event;
  const element = target.closest('div');
  tool.pencil = false;
  tool.chooseColor = false;
  tool.paintBucket = false;
  tool.eraser = false;
  tool.stroke = false;
  tool.bucket = false;
  if (element.className === 'main__items') { return; }
  if (element.id === 'pencil') {
    makeActiveTool('pencil');
    tool.pencil = true;
  }
  if (element.id === 'paintBucket') {
    makeActiveTool('paintBucket');
    tool.paintBucket = true;
  }
  if (element.id === 'chooseColor') {
    makeActiveTool('chooseColor');
    tool.chooseColor = true;
  }
  if (element.id === 'eraser') {
    makeActiveTool('eraser');
    tool.eraser = true;
  }
  if (element.id === 'stroke') {
    makeActiveTool('stroke');
    tool.stroke = true;
  }
  if (element.id === 'bucket') {
    makeActiveTool('bucket');
    tool.bucket = true;
  }
  return tool;
}

export { activeTool, makeActiveTool, tool };
