//import path from 'path';
//import webpack from 'webpack';
//import nodeExternals from 'webpack-node-externals';

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const {
  optimize: {
    UglifyJsPlugin,
    ModuleConcatenationPlugin
  },
  IgnorePlugin
} = webpack;

const modules = options => [
  {
    test: /\.js$/,
    include: path.resolve(__dirname, '../src'),
    exclude: /(node_modules|bower_components)/,
    use: {
      loader: 'babel-loader',
      options
    }
  }
];

const isDebug = process.env.NODE_ENV !== 'production';

const config = [
  {
    name: 'client',
    entry: './src/client/index.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../dist/assets'),
    },
    module: {
      rules: [
        ...modules({
          presets: [
            [
              'env', {
                targets: {
                  browsers: [
                    'safari >= 7',
                    'last 3 Chrome versions',
                    'Firefox >= 20'
                  ]
                }
              },
            ],
            'react'
          ]
        }),
        {
          test: /\.s?css$/,
          use: [{
              loader: "style-loader" // creates style nodes from JS strings
          }, {
              loader: "css-loader" // translates CSS into CommonJS
          }, {
              loader: "sass-loader" // compiles Sass to CSS
          }]
        }
      ]
    },
    plugins: [
      ...(isDebug ? [] : [
        // Decrease script evaluation time
        // https://github.com/webpack/webpack/blob/master/examples/scope-hoisting/README.md
        new ModuleConcatenationPlugin(),

        // Minimize all JavaScript output of chunks
        // https://github.com/mishoo/UglifyJS2#compressor-options
        new UglifyJsPlugin({
          sourceMap: true,
          compress: {
            screw_ie8: true, // React doesn't support IE8
            warnings: isVerbose,
            unused: true,
            dead_code: true,
          },
          mangle: {
            screw_ie8: true,
          },
          output: {
            comments: false,
            screw_ie8: true,
          },
        }),
      ])
    ],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      publicPath: path.join(__dirname, "dist"),
      compress: true,
      port: 9000
    }
  },
  {
    name: 'server',
    target: 'node',
    node: {
      console: false,
      global: true,
      process: true,
      __filename: "mock",
      __dirname: "mock",
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
        ...modules({
          presets: [
            [
              'env', {
                targets: { node: 'current' }
              }
            ],
            'react'
          ]
        }),
        { test: /\.s?css$/, loader: 'ignore-loader' }
      ]
    },
    plugins: [
      //new IgnorePlugin(/\.s?css$/)
    ]
  }
];

module.exports = config;
