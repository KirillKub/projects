import { chooseColor, colorHelp } from '../tools/chooseColor';
import { tool } from '../tools/active';

let color = '#ff0000';

function colorActive(event) {
  const { target } = event;
  const element = target.closest('div');
  if (element.className === 'main__colors') {
    return;
  }
  if (element.id === 'primaryColor') {
    element.classList.add('active');
    document.getElementById('secondaryColor').classList.remove('active');
    color = document.getElementById('inputColorPrimary').value;
  }
  if (element.id === 'secondaryColor') {
    element.classList.add('active');
    document.getElementById('primaryColor').classList.remove('active');
    color = document.getElementById('inputColorSecondary').value;
  }
}

function colorPrimary() {
  color = document.getElementById('inputColorPrimary').value;
}

function colorSecondary() {
  color = document.getElementById('inputColorSecondary').value;
}

function swapColor(event) {
  if (tool.chooseColor) {
    chooseColor(event);
    color = colorHelp;
  }
}

export {
  color, colorActive, colorPrimary, colorSecondary, swapColor,
};
