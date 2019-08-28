const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
const srcDir = '../src/app/';

module.exports = {
    entry: {
        setup: path.join(__dirname, srcDir + 'setup.js'),
        options: path.join(__dirname, srcDir + 'options.js'),
        popup: path.join(__dirname, srcDir + 'popup.js'),
    },
    output: {
        path: path.join(__dirname, '../dist/app/js'),
        filename: '[name].js'
    },
    optimization: {
        splitChunks: {
            name: 'vendor',
            chunks: "initial"
        }
    },
    module: {
        rules: [{
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader'
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ]
            }, {
                test: /\.vue$/,
                use: 'vue-loader',
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            inject: 'body',
            chunks: ['setup'],
            title: ['Kin Extension Setup'],
            template: path.join(__dirname, srcDir + 'index.ejs'),
            filename: path.join(__dirname, '../dist/app/pages/setup.html'),
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            chunks: ['options'],
            title: ['Kin Extension Options'],
            template: path.join(__dirname, srcDir + 'index.ejs'),
            filename: path.join(__dirname, '../dist/app/pages/options.html'),
        }),
        new HtmlWebpackPlugin({
            inject: 'body',
            chunks: ['popup'],
            template: path.join(__dirname, srcDir + 'index.ejs'),
            title: ['Kin Extension Popup'],
            filename: path.join(__dirname, '../dist/app/pages/popup.html'),
        }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, srcDir + 'assets'),
            to: path.join(__dirname, '../dist/app/assets'),
            toType: 'dir'
        }]),
        new MiniCssExtractPlugin()
    ]
}