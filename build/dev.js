"use strict";

require('shelljs/global')
let shell = require('shelljs');
let fs = require('fs')
let src = process.argv[2]
let reg = /[^\w\/]/

if (!shell.which('fis3')) {
  console.log(chalk.red('请先安装fis3'));
  return;
}

if (!src) {
  console.log(`
    npm run dev all: all compile
    npm run dev [name]: [name] is the path whose is compiled
  `)
  return
}

if (src.match(reg)) {
  console.log('warning: type the right src argument')
  return
}

if (src == 'all') {
  console.log(`run all`)
  
  require('./dev-server.js')
} else {
  src = `./src/page/${src}`
  fs.exists(src, function (exists) {
    if (!exists) {
      shell.mkdir('-p', src)
      shell.cp('-R', './src/widget/layout/', src)
      console.log(`create ${src} and run ${src}`)

      require('./dev-server.js')
    } else {
      console.log(`run ${src}`)

      require('./dev-server.js')
    }
  })
}




