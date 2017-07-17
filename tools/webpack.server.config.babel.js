const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

//import path from 'path';
//import webpack from 'webpack';

const {
  optimize: {
    UglifyJsPlugin,
    ModuleConcatenationPlugin
  }
} = webpack;

const modules = [
  {
    test: /\.js$/,
    include: path.resolve(__dirname, '../src'),
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader'
    }
  }
];

const isDebug = process.env.NODE_ENV !== 'production';

module.exports = {
  name: 'server',
  target: 'node',
  node: {
    console: false,
    global: true,
    process: true,
    __filename: 'mock',
    __dirname: 'mock',
    Buffer: true,
    setImmediate: true
  },
  externals: [nodeExternals()],
  entry: './src/server/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, '../build'),
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      ...modules,
      { test: /\.s?css$/, loader: 'ignore-loader' }
    ]
  },
  plugins: [
    //new IgnorePlugin(/\.s?css$/)
  ]
};
