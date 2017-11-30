"use strict";

let shell = require('shelljs');
let path = require('path');
var argv = process.argv[2]
var reg = /[^\w\/]/

if (!shell.which('fis3')) {
  console.log(chalk.red('请先安装fis3'));
  return;
}

shell.exec('fis3 server stop');

if (!argv) {
  console.log(`
    npm run rm all: all are removed
    npm run rm [name]: [name] is the path whose is chosed to be removed
  `)
  return
}
if (argv.match(reg)) {
  console.log('warning: type the right src argument')
  return
}

if (argv == 'all' || argv == 'dist') {
  console.log(`romove all`)
  shell.rm('-rf', 'dist')
} else {
  var buildsrc = `./dist/page/${argv}`
  var buildjs = `./dist/static/page/${argv}`
  var buildpkg = `./dist/static/pkg/page/${argv}`

  if (shell.test('-d', buildsrc)) {
    console.log(`${buildsrc} is removed`)
    shell.rm('-rf', buildsrc)
    shell.rm('-rf', buildjs)
    shell.rm('-rf', buildpkg)
  } else {
    console.log(`${buildsrc} is not existed`)
    return
  }
}
