const path = require('path');
const Dotenv = require('dotenv-webpack');
module.exports = {
  entry: './fancy-weather/src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './fancy-weather/dist'),
  },
  module:{
    rules: [
        {
            test: /\.(gif|png|jpe?g|svg)$/i,
            use: [
            'file-loader',
            {
                loader: 'image-webpack-loader',
                options: {
                bypassOnDebug: true, // webpack@1.x
                disable: true, // webpack@2.x and newer
                },
            },
        ],
    }]
  },
  plugins: [
    new Dotenv()
  ],
  watch: true,
};