const webpackCommon = require('./webpack.base');
const path = require('path');

module.exports = {
    ...webpackCommon,
    devtool: 'inline-source-map',
    mode: 'development',
    devServer: {
        compress: true,
        port: 8080,
        hot: true,
        open: true,
    },
};
