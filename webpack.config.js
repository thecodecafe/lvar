const webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './lib/index.js',
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'lvar.js'
    },
    resolve: {
        alias: {
            'lva': path.join(__dirname, 'libs/index.js')
        }
    },
    module: {
        rules: [
            {
                test: '/\.js$/',
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }
        ]
    },
    mode: 'production',
    plugins: [
        new webpack.ProvidePlugin({
            'lvar': 'lvar'
        }),
        new UglifyJsPlugin()
    ]
}