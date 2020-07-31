const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
    
    entry: {
       app: './src/js/index.js', 
       sass: './src/sass/main.scss',
       header: './src/js/models/header.js'
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/[name].js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new webpack.ProgressPlugin(),
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html',            
        }),
        new HTMLWebpackPlugin({
            filename: 'registration.html',
            template: './src/registration.html',
            chunks: ['sass', 'header']
        }),
        new HTMLWebpackPlugin({
            filename: '404.html',
            template: './src/404.html',
            chunks: ['sass','header']
        }),
        new HTMLWebpackPlugin({
            filename: 'dashboard.html',
            template: './src/dashboard.html',
            chunks: ['sass', 'header']
        }),
        new MiniCSSExtractPlugin({
            filename: '[name].[hash:8].css'
        }),
        new CleanWebpackPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            }, 
            {
               test: /\.scss$/,
               exclude: /node_modules/,
               use: [
              {
                  loader: MiniCSSExtractPlugin.loader,
                  options: {
                      reloadAll: true
                  }
              },  
               "css-loader",  
               "postcss-loader",            
               "sass-loader"
            ] 
            }
        ]
    }
}