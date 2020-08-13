const SentryWebpackPlugin = require('@sentry/webpack-plugin')

var date = new Date()
let year = date.getFullYear(),
month = date.getMonth()+1,//月份是从0开始的
day = date.getDate()

const release = `${year}-${month}-${day}`
console.log(release)

module.exports = {
    lintOnSave: false,
    productionSourceMap: true,
    outputDir: 'blog',
    publicPath: process.env.NODE_ENV === 'production' ? './': '/',
    configureWebpack: {
        plugins: [
            // new SentryWebpackPlugin({
            //     include: './blog',
            //     configFile: "sentry.properties",
            //     ignoreFile: 'test-1',
            //     urlPrefix: '~/', 
            //     release:'ha11',
            //     deleteAfterCompile: true,
            //     ignore: ['node_modules',],
            // }),
        ]
    },
    chainWebpack: config => {
        config.plugin("define").tap(args => {
            args[0]["process.env"].release =  JSON.stringify(release)
          return args;
        })
      },
}