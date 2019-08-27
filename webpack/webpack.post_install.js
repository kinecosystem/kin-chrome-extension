const VueLoaderPlugin = require('vue-loader').VueLoaderPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const path = require('path');
const srcDir = '../src/post_install/';

module.exports = {
    entry: path.join(__dirname, srcDir + 'main.js'),
    output: {
        path: path.join(__dirname, '../dist/post_install'),
        filename: '[name].js'
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
                use: 'vue-loader'
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, srcDir + 'index.ejs')
        }),
        new CopyWebpackPlugin([{
            from: path.join(__dirname, srcDir + 'assets'),
            to: path.join(__dirname, '..dist/post_install/assets'),
            toType: 'dir'
        }]),
        new MiniCssExtractPlugin({
            path: path.join(__dirname, '../dist/post_install/main.css')
        })
    ]
}