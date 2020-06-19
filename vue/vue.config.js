const SentryWebpackPlugin = require('@sentry/webpack-plugin')


module.exports = {
    lintOnSave: false,
    productionSourceMap: true,
    outputDir: 'blog',
    publicPath: process.env.NODE_ENV === 'production' ? './': '/',
    configureWebpack: {
        plugins: [
            new SentryWebpackPlugin({
                include: './blog',
                configFile: "sentry.properties",
                ignoreFile: 'test-1',
                urlPrefix: '~/', 
                release:'ha11',
                deleteAfterCompile: true,
                ignore: ['node_modules',],
            }),
        ]
    }
}