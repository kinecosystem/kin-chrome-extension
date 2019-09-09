const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

module.exports = {
  context: __dirname + '/src',
  entry: {
    setup: './setup/index.js',
    options: './options/index.js',
    popup: './popup/index.js',
    'session-popup': './session-popup/index.js',
    background: './background.ts'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name]/index.js'
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    },
    extensions: ['.js', '.ts', '.vue', '.json']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        // vendor chunk
        vendor: {
          name: 'vendor',
          // sync + async chunks
          chunks: 'all',
          // import file path containing node_modules
          test: /node_modules/
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: './assets/',
          emitFile: false
        }
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      global: 'window'
    }),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name]/style.css'
    }),
    new CopyWebpackPlugin([
      {
        from: 'assets',
        to: 'assets'
      },
      {
        from: 'manifest.json',
        to: 'manifest.json'
      },
      {
        from: 'popup/index.html',
        to: 'popup/index.html'
      },
      {
        from: 'options/index.html',
        to: 'options/index.html'
      },
      {
        from: 'setup/index.html',
        to: 'setup/index.html'
      }
    ]),

    new ChromeExtensionReloader()
  ]
};
