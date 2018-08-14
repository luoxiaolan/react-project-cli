/**
 * @file webpack config
 */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;

// 配置线上目录
const staticRoute = '/';

const commonWebpack = require('./webpack.common');

module.exports = Object.assign({}, commonWebpack, {
    mode: 'production',
    devtool: false,
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: staticRoute,
        filename: '[name]-[chunkhash:5].js',
        chunkFilename: 'js/[name]-[chunkhash:5].chunk.js'
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                cache: true,
                parallel: true,
                sourceMap: false,
                uglifyOptions: {
                    compress: {
                        /* eslint-disable */
                        drop_console: true,
                        /* eslint-enable */
                    }
                }
            }),
            new OptimizeCSSAssetsPlugin({
                cssProcessor: require('cssnano')({
                    reduceIdents: false,
                    autoprefixer: {
                        remove: false
                    }
                })
            })
        ],
        splitChunks: {
            chunks: 'all',
            name: 'vendor'
        },
        runtimeChunk: {
            name: 'runtime'
        }
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new MiniCssExtractPlugin({
            filename: 'assets/fdi-fe/css/[name].[contenthash:8].css',
            chunkFilename: 'assets/fdi-fe/css/[id].[contenthash:8].css'
        }),
        new CSSSplitWebpackPlugin({
            size: 4000,
            filename: 'assets/fdi-fe/css/[name]-[part].[ext]'
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: './template/fdi-fe/index.html'
        }),
        new webpack.HashedModuleIdsPlugin()
    ]
});
