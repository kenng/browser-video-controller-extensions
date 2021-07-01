var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: path.join(__dirname, 'src', 'index.ts'),

    module: {
        rules: [
            {
                test: /\.(m?js|ts)$/,
                exclude: /(node_modules)/,
                use: [`swc-loader`],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'bundle.[fullhash].js', // <- ensure unique bundle name
        path: path.resolve(__dirname, 'build'),
        // clean: true,
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(
                __dirname,
                './src/templates/index.template.html',
            ),
        }),
    ],
};
