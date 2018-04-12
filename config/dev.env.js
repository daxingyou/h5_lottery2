'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL : {
        picurl: '"http://admin.baochiapi.com/photo/pic/"',
        forseti: '"http://121.58.234.210:19093/forseti/"', // 测试环境
        uaa: '"http://121.58.234.210:19093/uaa/"', // 测试环境
        hermes: '"http://121.58.234.210:19093/hermes/"', // 测试环境
  }
})
