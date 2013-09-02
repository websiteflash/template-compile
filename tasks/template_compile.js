/*
 * template-compile
 * https://github.com/websiteflash/template-compile
 *
 * Copyright (c) 2013 jesse
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('template_compile', 'Compile html template to javascript file.', function() {
    
    /**
     * 定义基本参数
     * separator - 分隔符，只能是','
     * baseUrl - 模版目录，来确定模版生成时对应的id
     *
     * eg：
     * baseUrl = './demo/tmpl'
     * 那么路径为'./demo/tmpl/test/index.html'的模版文件生成后对应的id将是test.index
     */
    var options = this.options({
      separator: ',',
      baseUrl: ''
    });
    
    // 将模版中的单引号转义
    var process = function(src) {
      return src.replace(/\'/gm, '\\\'');
    };

    // 去掉标签间的空白
    var trim = function(src) {
      return src.replace(/^\s+|\s+$/gm, '');
    };

    // 根据文件路生成对应的id，即json对象中的key值
    // eg：
    // baseUrl = './demo/tmpl'
    // './demo/tmpl/test/index.html' ==> test.index
    var path2key = function(filepath) {
      if (options.baseUrl) {
        if(options.baseUrl.slice(-1) !== '/'){
          options.baseUrl += '/';
        }
        filepath = filepath.replace(options.baseUrl, '');
      }
      return filepath.replace(/\.html?$/, '').replace(/\//g, '.');
    };

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var output = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        var source = grunt.file.read(filepath);
        source = '"' + path2key(filepath) + '":\'' + process(trim(source)) + '\'';
        // Read file source.
        return source;
      }).join(grunt.util.normalizelf(options.separator));

      // 加上AMD包装
      output = 'define({' + output + '});';

      // Write the destination file.
      grunt.file.write(f.dest, output);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};