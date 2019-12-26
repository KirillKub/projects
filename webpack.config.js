const path = require('path');

module.exports = {
  entry: {
    index: './piskel-clone/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'piskel-clone/dist'),
    filename: 'main.js',
  },
  devtool: "source-map",
  watch: true,
};