const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: '/anime-hunt/',
  css: {
    extract: false,
  },
})
