var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
//------------------------------------------------------------------------------
// Plugins
//------------------------------------------------------------------------------
var plugins = [
    new ExtractTextPlugin("static/build/css/main.css", {
        allChunks: true
    })
];
//------------------------------------------------------------------------------
// Module definition
//------------------------------------------------------------------------------
module.exports = {
    entry: "./static/js/main.jsx",
    output: {
        filename: "static/build/js/bundle.js",
        path: __dirname
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['babel-loader?stage=1'],
            exclude: /node_modules/
        }, {
            test: /\.css$/,
            loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        }, {
            test: /\.scss$/,
            loader: ExtractTextPlugin.extract('css!sass')
        }]
    },
    plugins: plugins
};
