const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');
const LibraryPackage = require('../../package.json');

const DevMode = process.env.NODE_ENV !== "production";

const getDotEnvConfig = () => {
  return new Dotenv({
    path: path.resolve(__dirname, DevMode ? '../../.env' : '../../.env.prod')
  });
}

const BUILD_FOLDER_NAME = 'distApp';
const ROOT_DIRECTORY = path.join(__dirname, '../..');
const BUILD_DIRECTORY = path.join(ROOT_DIRECTORY, BUILD_FOLDER_NAME);
const SRC_DIRECTORY = path.join(ROOT_DIRECTORY, 'src');
const ASSETS_PREFIX = 'petsure-ui-library-';

const config = {
  entry: {
    app: {
      import: path.resolve(SRC_DIRECTORY, 'index.jsx')
    }
  },
  output: {
    filename: `app/${ASSETS_PREFIX}[name]/index.js`,
    path: BUILD_DIRECTORY,
    publicPath: '/',
    compareBeforeEmit: true,
    clean: true
  },
  optimization: {
    runtimeChunk: 'single',
    minimizer: []
  },
  mode: 'development',
  target: 'web',
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: ['src', 'node_modules'],
    fallback: {
      "os": false,
      "fs": false,
      "tls": false,
      "net": false,
      "path": false,
      "zlib": false,
      "http": false,
      "https": false,
      "stream": false,
      "buffer": require.resolve("buffer/"),
      "crypto": require.resolve('crypto-browserify'),
      "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify
    }
  },
  performance: {
    hints: false
  },
  plugins: [
    getDotEnvConfig(),
    new HtmlWebpackPlugin({
      template: path.join(SRC_DIRECTORY, 'index.html')
    })
  ],
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true
          }
        }
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 2
            }
          },
          {
            loader: 'resolve-url-loader',
            options: {
              sourceMap: true,
              root: ROOT_DIRECTORY
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          outputPath: `../${BUILD_FOLDER_NAME}`,
          filename: `static/images/[name][ext][query]`
        }
      },
      {
        test: /\.(pdf)$/,
        type: 'asset/resource',
        generator: {
          outputPath: `../${BUILD_FOLDER_NAME}`,
          filename: `static/docs/[name][ext][query]`
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        type: 'asset/resource',
        generator: {
          outputPath: `../${BUILD_FOLDER_NAME}`,
          filename: `fonts/[name][ext][query]`
        }
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
      }
    ]
  }
};

module.exports = config;
