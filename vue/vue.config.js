
module.exports = {
    lintOnSave: false,
    productionSourceMap: false,
    outputDir: 'blog',
    publicPath: process.env.NODE_ENV === 'production' ? './': '/'
}