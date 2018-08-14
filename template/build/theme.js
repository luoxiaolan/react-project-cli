/**
 * @file theme
 */
const publicPath = process.env.NODE_ENV === 'production' ? '/static/exchange-center/' : '';

module.exports = {
    '@icon-url': '"' + publicPath + 'iconfont' + '"'
};
