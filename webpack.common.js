const path = require('path');
const env = require("./utils/env");
const fileSystem = require("fs");

const alias = {};
const secretsPath = path.join(__dirname, ("secrets." + env.NODE_ENV + ".js"));

if (fileSystem.existsSync(secretsPath)) {
  alias["secrets"] = secretsPath;
}      

const fileExtensions = ["jpg", "jpeg", "png", "gif", "eot", "otf", "svg", "ttf", "woff", "woff2"];
      
module.exports = {
    entry: {
      popup: path.join(__dirname, 'src', 'js', 'popup.js'),
      popup: path.join(__dirname, 'src', 'js', 'index.js')
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.css$/,
          loader: "style-loader!css-loader",
          exclude: /node_modules/
        },
        {
          test: new RegExp('\.(' + fileExtensions.join('|') + ')$'),
          loader: "file-loader?name=[name].[ext]",
          exclude: /node_modules/
        },
        {
          test: /\.html$/,
          loader: "html-loader",
          exclude: /node_modules/
        }
      ]
    }
  };