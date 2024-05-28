const config = require('./webpack.config.js');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

config.mode = 'production';

config.optimization.minimizer.push(new CssMinimizerPlugin());

module.exports = config;
