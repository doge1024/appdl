// Learn more on how to config.
// - https://github.com/ant-tool/atool-build#配置扩展

var webpack = require('atool-build/lib/webpack');

module.exports = function(webpackConfig){
    webpackConfig.babel.plugins.push('transform-runtime');
    webpackConfig.babel.plugins.push(['import', {
        libraryName: 'antd',
        style: 'css',
    }]);

    webpackConfig.devServer = {
        proxy: {
            '/api/**': {
                target: 'http://localhost:5000',
                secure: false
                // changeOrigin: true
            },
        }
    };

    webpackConfig.plugins.push(
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'true')),
            __PRERELEASE__: JSON.stringify(JSON.parse(process.env.BUILD_PRERELEASE || 'false'))
        })
    );

    return webpackConfig;
};
