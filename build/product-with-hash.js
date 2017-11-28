"use strict";
let shell = require('shelljs');
let chalk = require('chalk');
let configBuild = require('../config/index.js');
let path = require('path');

let configBuildPath = path.resolve(__dirname, '../config/index.js');
let outputPath = path.resolve(configBuildPath, configBuild.pro);
let staticRootPath = path.resolve(outputPath, configBuild.staticRoot);
let tplRootPath = path.resolve(outputPath, configBuild.tplRoot);

if (!shell.which('fis3')) {
    console.log(chalk.red('请先安装fis3'));
    return;
}
if (shell.test('-d', staticRootPath)) {
    shell.rm('-rf', staticRootPath + '/*');
}
if (shell.test('-d', tplRootPath)) {
    shell.rm('-rf', tplRootPath + '/*');
}
shell.exec('fis3 release prod-with-hash -cd ' + outputPath);
