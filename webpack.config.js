const path = require('path');

module.exports = {
  entry: './fancy-weather/src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './fancy-weather/dist'),
  },
  watch: true,
};