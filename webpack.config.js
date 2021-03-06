require('dotenv').config();
const webpack = require('webpack');
const path = require('path');

module.exports = {
  entry: './client/app.js',
  mode: process.env.MODE,
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'client/dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        use: ['source-map-loader'],
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      process: 'process/browser',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'LOCAL_NODE': JSON.stringify(process.env.LOCAL_NODE),
        'REMOTE_NODE': JSON.stringify(process.env.REMOTE_NODE),
        'REMOTE_CONTRACT_ADDRESS': JSON.stringify(process.env.REMOTE_CONTRACT_ADDRESS),
        'LOCAL_CONTRACT_ADDRESS': JSON.stringify(process.env.LOCAL_CONTRACT_ADDRESS),
        'MODE': JSON.stringify(process.env.MODE),
      }
    })
  ],
  resolve: {
    fallback: {
      "url": require.resolve("url/"),
      "util": require.resolve("util/"),
      "crypto": require.resolve("crypto-browserify"),
      "os": require.resolve("os-browserify/browser"),
      "https": require.resolve("https-browserify"),
      "http": require.resolve("stream-http"),
      "stream": require.resolve("stream-browserify")
    }
  },
  externals: [{
    xmlhttprequest: '{XMLHttpRequest:XMLHttpRequest}'
  }]
};