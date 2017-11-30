"use strict";

require('shelljs/global')
let shell = require('shelljs');
let chalk = require('chalk');
let configBuild = require('../config/index.js');
let path = require('path');
let argv = process.argv[2]

let configBuildPath = path.resolve(__dirname, '../config/index.js');
let outputPath = path.resolve(configBuild.pro)
let staticRootPath = path.resolve(outputPath, configBuild.staticRoot);
let tplRootPath = path.resolve(outputPath, configBuild.tplRoot);

if (argv == 'all') {
  shell.rm('-rf', outputPath)
  shell.exec('fis3 release prod -cd ' + outputPath);
} else {
  shell.rm('-rf', `dist/page/${argv}`)
  shell.rm('-rf', `dist/static/page/${argv}`)
  shell.exec(`cd src/page/${argv} && fis3 release prod -d ` + outputPath)
  return;
}
