const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {    
    entry: {
       app: './src/js/index.js', 
       sass: './src/sass/main.scss'    
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/[name].bundle.js'
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
        new MiniCSSExtractPlugin({
            filename: '[name].css'
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
               "sass-loader"
            ] 
            }
        ]
    }
}