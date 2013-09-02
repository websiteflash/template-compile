# template-compile

> 将html模版编译生成requirejs支持的amd模块

## Getting Started
This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install template-compile --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('template-compile');
```

## The "template_compile" task

### Overview
In your project's Gruntfile, add a section named `template_compile` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  template_compile: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
})
```

### Options参数

#### options.baseUrl
类型: `String`
默认值: `''`

模版目录，来确定模版生成时对应的id

### 示例

#### 
下面这个示例将tmpl目录下的index.html和main.html编译，生成到dest目录下，生成文件default.js

```js
grunt.initConfig({
  template_compile: {
    options: {},
    files: {
      src:['tmpl/index.html', 'tmpl/main.html'],
      dest:'dest/default.js'
    },
  },
})
```

生成模版js文件后，就可以通过requirejs引用

```js
define(['default'], function(template){
  var indexTpl = template['tmpl.index'];
  var mainTpl = template['tmpl.main'];
    ...
})
```

#### 设置options参数
在这个示例中将演示options.baseUrl的使用，当我们设置baseUrl后，在最终生成的模版js对象中，key值将去掉baseUrl部分

```js
grunt.initConfig({
  template_compile: {
    options: {
      baseUrl:'tmpl/'
    },
    files: {
      src:['tmpl/index.html', 'tmpl/main.html'],
      dest:'dest/default.js'
    },
  },
})
```

生成模版js文件后，就可以通过requirejs引用

```js
define(['default'], function(template){
  var indexTpl = template['index'];
  var mainTpl = template['main'];
    ...
})
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
* 0.1.1 初始版本
* 0.1.2 更新生成文件路径
