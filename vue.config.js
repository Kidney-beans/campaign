const path = require('path');

function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: true,
  publicPath:'./',
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src'))
      .set('assets',resolve('src/assets'))
      .set('views',resolve('src/views'))
      .set('css',resolve('src/css'))
      .set('js',resolve('src/js'))
      .set('components',resolve('src/components'))
      .set('store',resolve('src/store'))
      .set('router',resolve('src/router'))
  }
};