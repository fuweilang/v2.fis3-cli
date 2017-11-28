let shell = require('shelljs');
let chalk = require('chalk');
let configBuild = require('../config/index.js');
let path = require('path');
let src = process.argv[2]

let configBuildPath = path.resolve(__dirname, '../config/index.js');
let outputPath = path.resolve(configBuildPath, configBuild.dev);


if (shell.test('-d', outputPath)) {
  shell.rm('-rf', outputPath);
} else {
  shell.mkdir(outputPath);
}

console.log('localhost:' + configBuild.port)

shell.exec('fis3 server stop -p ' + configBuild.port);
shell.exec('fis3 server start --no-browse --root ' + outputPath + ' -p ' + configBuild.port);
shell.exec('fis3 release -wLcd ' + outputPath);


