'use strict';

const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

module.exports = [
  {
    devtool: 'source-map',
    entry: {
      javascript: './js/app.js',
      html: './index.html',
      csv: './data.csv',
      css: '../node_modules/nvd3/build/nv.d3.css'
    },
    output: {
      filename: '/js/trunk-charts.js',
      path: __dirname + '/build',
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loaders: [
            "react-hot",
            "babel",
          ],
        },
        {
          test: /\.(html|csv)$/,
          exclude: /node_modules/,
          loader: "file?name=[name].[ext]",
        },
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        },
      ],
    },
    plugins: [
        new ExtractTextPlugin("styles.css"),
    ],
    resolve: {
      root: [
        __dirname + '/../src/js',
        __dirname + '/../node_modules',
      ],
    }
  },
]
