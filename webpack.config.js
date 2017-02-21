var webpack = require('webpack');

var config = {
  entry: ['./src/js/app.jsx'],
  output: {
    path: './dist/js/',
    filename: 'app.js'
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: "file?name=[name].[ext]"} ,
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.js$/, loader: "babel-loader?stage=0", exclude: '/node_modules/' },
      { test: /\.jsx$/, loaders: ['jsx-loader', "babel-loader?stage=0"] }
    ]
  },
    plugins: [],
    devServer: {
        historyApiFallback: true,
        contentBase: './',
        inline: true,
        port : 3000
}
};

module.exports = config;