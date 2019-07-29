const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin');
const merge = require("webpack-merge");
const common = require("./webpack.common");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
       
module.exports = merge(common, {
    mode: "production",
    output: {
        filename: "[name].[contentHash].bundle.js",
        path: path.resolve(__dirname, "build")
    },
    plugins: [
      new CleanWebpackPlugin(),
      new CopyWebpackPlugin([
        { from: './src/manifest.json', to: 'manifest.json'},
        { from: './src/img'}
      ])
    ]
  });