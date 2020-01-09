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
  mode: 'development',
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
    },
    {
      // HTML LOADER
      test: /\.html$/,
      loader: 'html-loader'
    },
  ]
  },
};