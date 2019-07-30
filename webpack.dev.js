const path = require('path');
const merge = require("webpack-merge");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require("write-file-webpack-plugin");

module.exports = merge(common, {
    mode: 'development',
    devtool: 'cheap-module-eval-source-map', 
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "build")
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "src", "index.html"),
        filename: "index.html",
        chunks: ["index"]
      }),
      new WriteFilePlugin()
    ],
    devServer: {
        contentBase: './build',
        hot: true,
        port: 8081,
        open: true,
        proxy: {
            "/create": "http://localhost:8080"
        }
    }
  });