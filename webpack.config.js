const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    entry: ['./src/js/index.js', './src/sass/main.scss'],
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'js/bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    plugins: [
        new HTMLWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        }),
        new MiniCSSExtractPlugin({
            filename: "[name].css"
        })
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