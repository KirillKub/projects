function rgbToHex(str) {
  let rgbElements = str.slice(4, str.length - 1);
  rgbElements = rgbElements.split(', ');
  return `#${((1 << 24) + (+rgbElements[0] << 16) + (+rgbElements[1] << 8) + +rgbElements[2]).toString(16).slice(1)}`;
}
  module.exports = rgbToHex;