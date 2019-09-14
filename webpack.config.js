const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

module.exports = {
  context: __dirname + '/src',
  entry: {
    setup: './setup/index.tsx',
    options: './options/index.tsx',
    popup: './popup/index.tsx',
    'session-popup': './session-popup/index.tsx',
    background: './background/index.ts'
  },
  output: {
    path: __dirname + '/dist',
    filename: '[name]/index.js'
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts']
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: false,
        vendors: false,
        vendor: {
          name: 'vendor',
          chunks: 'all',
          test: /node_modules/
        }
      }
    }
  },

  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['css-loader']
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['css-loader', 'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|ico)$/,
        loader: 'file-loader',
        exclude: /node_modules/,
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
