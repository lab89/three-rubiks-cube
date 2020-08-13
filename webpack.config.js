const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  entry: ['@babel/polyfill', './src/RubiksCube.js'],
  plugins : [
    new CleanWebpackPlugin(),
  ],
  devtool: 'inline-source-map',
  devServer : {
      contentBase : './dist'
  },
	externals: ['three', 'three/examples/jsm/renderers/CSS3DRenderer'],
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
