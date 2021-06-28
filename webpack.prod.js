// webpack.prod.js
const webpackCommon = require('./webpack.base');

module.exports = {
    ...webpackCommon,
    mode: 'production',
};
