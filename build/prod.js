"use strict";

var shell = require('shelljs')
let fs = require('fs')
let argv = process.argv[2]
let reg = /[^\w\/]/

if (!shell.which('fis3')) {
  console.log(chalk.red('请先安装fis3'));
  return;
}

if (!argv) {
  console.log(`
    npm run dev all: all compile
    npm run dev [name]: [name] is the path whose is compiled
  `)
  return
}

if (argv.match(reg)) {
  console.log('warning: type the right src argument')
  return
}

if (argv == 'all') {
  console.log(`build all`)
  require('./product.js')
} else {
  var src = `./src/page/${argv}`
  fs.exists(src, function (exists) {
    if (!exists) {
      console.log(`please create ${argv} first`)
      return
    } else {
      console.log(`build ${argv}`)
      require('./product.js')
    }
  })
}
