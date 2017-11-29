"use strict"
let configBuild = require('./config/index.js')

let staticRoot = configBuild.staticRoot //实际静态资源根目录
let tplRoot = configBuild.tplRoot //模版根目录

fis.hook('commonjs')

//排除不需要产出的目录
fis.set('project.ignore', fis.get('project.ignore').concat([
  'doc/**',
  'config/**',
  'build/**',
  'component.json',
  'package.json',
  'package-lock.json',
  '*.iml',
  'test/**',
  'dev/**',
  'dist/**',
  '.gitignore',
  'README.md'
]))

// 所有的文件产出到 {staticRoot} 目录下
fis.match('*', {
  release: function(data) {
    var str = data[0].replace(/\/src/, '')
    return staticRoot + '/' + str
  },
  useHash : false
})

//排除不需要产出的文件
fis.match('*.{sh,md,log}', {
        release: false
    })
    .match('.gitignore', {
        release: false
    })
    .match('README.md', {
        release: false
    })

//npm 组件
fis.match('/{node_modules,src/widget}/**.js', {
    isMod: true,
    useSameNameRequire: true
})

// 所有static目录下的资源放到 {staticRoot} 目录下
fis.match('src/static/**', {
    release: function(data) {
      return staticRoot + data[0].replace(/src\/static/gi, '')
    },
    isMod: false,
    useSameNameRequire: false
})

// 所有page目录下的es6文件夹下的js都被isMod
fis.match(/^\/src\/page\/([\w\/]+)\/es6\/\w+.js$/, {
    isMod: true,
    useSameNameRequire: true
})

// 所有模板放到 {tplRoot} 目录下
fis.match(/^\/src\/page\/([\w\/]+)\/\w+\.html$/, {
    release: function (data) {
      var str = data[0].replace(/\/src\/page/, '')
      return tplRoot + '/' + str
    },
    parser: fis.plugin('html-uri')
})

fis.match('*.scss', {
  rExt: '.css',
  parser: fis.plugin('node-sass'),
  useSprite: true
})

fis.match('**.css', {
    parser: fis.plugin('css-url-hash'),
    useSprite: true,
    postprocessor: fis.plugin('autoprefixer', {
        "browsers": ["last 2 versions","Android >= 4.0"]
    })
})

fis.match('/node_modules/**.css', {
    parser: null,
    useSprite: true,
    postprocessor: null
})

// 添加css和image加载支持
fis.match('*.js', {
    preprocessor: [
        fis.plugin('js-require-css'),
        fis.plugin('js-require-file', {
            useEmbedWhenSizeLessThan: 10 * 1024 // 小于10k用base64
        })
    ]
})

//babel
fis.match('/{src/page,src/widget}/**.js', {
    parser: fis.plugin('babel-6.x')
})

fis.match('*.{es6, es}', {
    isJsLike: true,
    rExt : 'js',
    isMod: true,
    useSameNameRequire: true,
    parser: fis.plugin('babel-6.x')
})

fis.match('::packager', {
    // npm install [-g] fis3-postpackager-loader
    // 分析 __RESOURCE_MAP__ 结构，来解决资源加载问题
    postpackager: fis.plugin('loader', {
        resourceType: 'mod',
        useInlineMap: true // 资源映射表内嵌
    }),
    packager: fis.plugin('map'),
    spriter: fis.plugin('csssprites', {
        layout: 'matrix',
        margin: '15'
    })
})

// 禁用components
fis.unhook('components')
fis.hook('node_modules', {
    ignoreDevDependencies: true,
    shimProcess : false
})

let currentMedia = fis.project.currentMedia()
if (currentMedia !== 'prod') {
    return
}

// optimize
fis.media('prod')
    .match('*.{js,jsx,ts,tsx,es6,es}', {
        useHash : true,
        optimizer: fis.plugin('uglify-js', {
            mangle: {
                expect: ['require', 'define'] //不想被压的
            }
        })
    })
    .match('*.{scss,sass,less,css}', {
        useHash : true,
        useSprite: true,
        optimizer: fis.plugin('clean-css', {
            'keepSpecialComments': 0
        })
    })
    .match('*.png', {
        optimizer: fis.plugin('png-compressor') // 用 fis-optimizer-png-compressor 压缩 png 图片
    })
    .match('*.{png,gif,jpg,jpeg,eot,ttf,woff,svg}', { //静态资源引用增加url前缀
        useHash : true,
        // url : configBuild.staticUrlPrefix  + '/' + staticRoot + '$0'
    })

// pack
fis.media('prod')
    // 启用打包插件，必须匹配 ::packager
    .match('::packager', {
        postpackager: fis.plugin('loader', {
            allInOne: {
                ignore: ['src/static/lib/**', 'node_modules/jquery/**']
            }
        }),
        packager: fis.plugin('map'),
        spriter: fis.plugin('csssprites', {
            layout: 'matrix',
            margin: '15'
        })
    })
