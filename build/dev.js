"use strict";

let shell = require('shelljs');
let path = require('path');
let argv = process.argv[2] || 'all'
let reg = /[^\w\/]/

if (!shell.which('fis3')) {
  console.log(chalk.red('请先安装fis3'));
  return;
}

if (!argv) {
  console.log(`
    npm run dev all | npm run dev: all compile
    npm run dev [name]: [name] is the path whose is chosed to compile
  `)
  return
}

if (argv.match(reg)) {
  console.log('warning: type the right src argument')
  return
}

if (argv == 'all') {
  console.log(`run all`)
  require('./dev-server.js')
} else {
  var src = path.resolve(__dirname, `../src/page/${argv}`);
  if (shell.test('-d', src)) {
    console.log(`has ${src} in directory and run all`)
    require('./dev-server.js')
  } else {
    shell.mkdir('-p', src)
    shell.cp('-R', './src/widget/layout/', src)
    console.log(`create ${src} and run all`)
    require('./dev-server.js')
  }
}
