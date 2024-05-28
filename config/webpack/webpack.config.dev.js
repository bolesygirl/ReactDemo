const config = require('./webpack.config.js');

config.devServer = {
  historyApiFallback: true,
  hot: true,
  port: 6100
};

config.devtool = 'inline-source-map';

module.exports = config;