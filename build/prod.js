"use strict";

var shell = require('shelljs')
let path = require('path');
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
  var src = path.resolve(__dirname, `../src/page/${argv}`);
  if (shell.test('-d', src)) {
    console.log(`build ${argv}`)
    require('./product.js')
  } else {
    console.log(`please create ${argv} first`)
    return
  }
}
