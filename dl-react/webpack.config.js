// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展

var webpack = require('atool-build/lib/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRootPlugin = require('html-webpack-react-root-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const path = require('path');

module.exports = function(webpackConfig){
    webpackConfig.babel.plugins.push('transform-runtime');
    webpackConfig.babel.plugins.push(['import', {
        libraryName: 'antd',
        style: 'css',
    }]);

    webpackConfig.plugins.push(
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            title: 'pp助手-越狱App下载',
            filename: '../templates/index.html'
        }),
        new ReactRootPlugin(),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify('true')
        }),
    );

    appExport = {
        devServer: {
            proxy: 'http://127.0.0.1:5000'
        },
        output: {
            path: path.resolve(__dirname, './dist/static/')
        }
    };

    let finalWebpackConfig = merge(webpackConfig, appExport)
    return finalWebpackConfig;
};
