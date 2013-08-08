/*
 * template-compile
 * https://github.com/websiteflash/template-compile
 *
 * Copyright (c) 2013 jesse
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('template_compile', 'Compile html template to javascript file.', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
      separator: ','
    });

    var process = function(src) {
      return src.replace(/\'/gm, '\\\'');
    };

    var trim = function(src) {
      return src.replace(/^\s+|\s+$/gm, '');
    };

    var path2key = function(filepath){
      return filepath.replace(/\.html?$/,'').replace(/\//g,'.');
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

      output = 'define({' + output + '});';

      // Write the destination file.
      grunt.file.write(f.dest, output);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};