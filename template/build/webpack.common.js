/**
 * @file webpack
 */
const webpack = require('webpack');
const path = require('path');

const vendors = [
    'react',
    'react-dom',
    'react-router',
    'redux',
    'react-redux',
    'redux-saga'
];

const index = path.join(__dirname, '../src/index');

module.exports = {
    entry: {
        vendors: vendors,
        index: [index]
    },
    output: {
        path: path.join(__dirname, '../dist'),
        publicPath: '/',
        filename: '[name]-[hash:5].js',
        chunkFilename: 'js/[name]-[hash:5].chunk.js'
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            exclude: /node_modules/,
            loader: 'babel-loader?cacheDirectory'
        },
        {
            test: /\.less$/,
            use: [{
                loader: 'style-loader'
            },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            require('autoprefixer')({
                                browsers: [
                                    '>1%',
                                    'last 4 versions',
                                    'Firefox ESR',
                                    'not ie < 9' // React doesn't support IE8 anyway
                                ]
                            })
                        ]
                    }
                },
                {
                    loader: 'less-loader'
                }
            ],
            exclude: /node_modules/
        },
        {
            test: /\.s[c|a]ss/,
            use: [{
                loader: 'style-loader'
            },
                {
                    loader: 'css-loader'
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        plugins: [
                            require('autoprefixer')({
                                browsers: [
                                    '>1%',
                                    'last 4 versions',
                                    'Firefox ESR',
                                    'not ie < 9' // React doesn't support IE8 anyway
                                ]
                            })
                        ]
                    }
                },
                {
                    loader: 'sass-loader'
                }
            ],
            exclude: /node_modules/
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: 'img/[name].[hash:5].[ext]'
                }
            }]
        },
        {
            test: /\.(woff|svg|eot|ttf)\??.*$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 1024,
                    name: 'name=font/[name].[ext]'
                }
            }]
        }]
    }
};
