const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  entry: ['./src/main.js'],
  plugins : [
    new HtmlWebpackPlugin({
        template : './example.html'
    }),
    new CleanWebpackPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer : {
      contentBase : './dist'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    libraryTarget : 'umd',
  },
  module: {},
  devtool: 'source-map',
  // https://webpack.js.org/concepts/mode/#mode-development
  mode: 'development'
};
