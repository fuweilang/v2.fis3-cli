# 基于fis3的纯静态解决方案

## 采用fis3-hook-node_modules的组件方案

[fis3-hook-node_modules](https://github.com/fex-team/fis3-hook-node_modules)

## 准备

    $ npm install -g fis3
    $ npm install

## 开始开发

    $ npm run dev 或者 npm run dev all : 会跑整个项目
    $ npm run dev [name] : 会在'src/page'下新建一个[name]的文件项目，并跑整个项目

## 打包prod版资源

    $ npm run prod all : 打包整个项目到dist
    $ npm run prod [name] : 打包'src/page'下的[name]项目到dist

## 删除资源

    $ npm run rm all : 删除整个dist目录
    $ npm run rm [name] : 打包dist下的[name]项目

## 构建说明
   1. 全局安装[fis3](http://fex-team.github.io/fis3/index.html) `npm install -g fis3`
   2. 执行 `npm install` 安装依赖
   3. 资源文件采取百度的[fis3](https://github.com/fex-team/fis3)构建，维护之前请参考相关资料
   4. npm run dev 输出目录为根目录下的**dev**目录
   5. npm run prod 和 npm run prod-with-hash 输出目录为根目录下的**dist**目录，用于发布
