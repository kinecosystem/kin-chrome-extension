const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');

module.exports = {
    context: __dirname + '/src',
    entry: {
        'setup/setup': './setup/setup.js',
        'options/options': './options/options.js',
        'popup/popup': './popup/popup.js',
        background: './background.ts',
        content_script: './content_script.ts'
    },
    output: {
        path: __dirname + '/dist',
        filename: '[name].js'
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json', '.ts']
    },
    module: {
        rules: [{
                test: /\.vue$/,
                use: 'vue-loader'
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
            filename: '[name].css'
        }),
        new CopyWebpackPlugin([{
                from: 'assets',
                to: 'assets',
            },
            {
                from: 'manifest.json',
                to: 'manifest.json'
            },
            {
                from: 'assets',
                to: 'assets'
            },
            {
                from: 'popup/popup.html',
                to: 'popup/popup.html'
            },
            {
                from: 'options/options.html',
                to: 'options/options.html'
            },
            {
                from: 'setup/setup.html',
                to: 'setup/setup.html'
            }
        ])
    ]
};