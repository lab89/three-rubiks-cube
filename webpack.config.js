const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  entry: ['@babel/polyfill', './src/RubiksCube.js'],
  plugins : [
    new HtmlWebpackPlugin({
        title : 'output'
    }),
    new CleanWebpackPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer : {
      contentBase : './dist'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'RubiksCube.js',
    libraryTarget : 'umd',
    library : "RubiksCube"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-proposal-class-properties']
          }
        }
      }
    ]
  },
  devtool: 'source-map',
  // https://webpack.js.org/concepts/mode/#mode-development
  mode: 'development'
};
