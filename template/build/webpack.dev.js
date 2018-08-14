/**
 * @file webpack config
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack');

const commonWebpack = require('./webpack.common');

/**
 * 输出本地 ip
 * @return {string} 输出 ip 地址
 */
const ip = () => {
    const ifaces = require('os').networkInterfaces();
    const defultAddress = '127.0.0.1';
    let ip = defultAddress;

    function x(details) {
        if (ip === defultAddress && details.family === 'IPv4') {
            ip = details.address;
        }
    }

    for (let dev in ifaces) {
        ifaces[dev].forEach(x);
    }

    return ip;
};

module.exports = Object.assign({}, commonWebpack, {
    devtool: 'eval-source-map',
    mode: 'development',
    devServer: {
        contentBase: './dist',
        port: 8080,
        hot: true,
        historyApiFallback: true,
        host: ip(),
        disableHostCheck: true,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        proxy: {
            '/ajax/*': {
                target: 'http://localhost:3000',
                changeOrigin: true,
                secure: false
            }
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HtmlWebpackPlugin({
            favicon: path.join(__dirname, '../favicon.ico'),
            title: 'react demo',
            inject: true,
            filename: 'index.html',
            template: path.join(__dirname, '../public/index.html'),
            chunks: ['vendors', 'index']
        }),
        new webpack.NamedModulesPlugin(), //作用？
        // new ExtractTextPlugin('css/[name].[chunkhash:5].css', {allChunks: true}),
    ],
    // optimization: {
    //     splitChunks: {
    //         chunks: 'all',
    //         name: 'vendor'
    //     },
    //     runtimeChunk: {
    //         name: 'runtime'
    //     }
    // }
});
