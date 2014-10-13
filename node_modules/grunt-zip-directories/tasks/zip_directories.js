/*
 * grunt-zip-directories
 * https://github.com/alex.meah/grunt-zip-directories
 *
 * Copyright (c) 2014 Alex Meah
 * Licensed under the MIT license.
 */

 'use strict';

 module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('zip_directories', 'The best Grunt plugin ever.', function() {
    // Modules
    var async = require('async');
    var done = this.async();
    var archiver = require('archiver');
    var fs = require('fs');
    var path = require('path');
    var os = require('os');

    process.setMaxListeners(0);

    function begin(file, callback) {
      // Make folder for zips
      grunt.file.mkdir(path.dirname(file.dest));

      var folder = file.src.toString().split('/').slice(-1)[0];
      var output = fs.createWriteStream(file.dest + '.zip');
      var archive = archiver('zip');

      grunt.log.writeln('Zipping ' + folder);

      output.on('close', function() {
        callback();
      });

      archive.on('error', function(err) {
        throw err;
      });

      archive.pipe(output);

      archive.bulk([{
        expand: true,
        cwd: file.src[0],
        src: ['**'],
        dest: folder
      }]);

      archive.finalize(function(err) {
        if (err) {
          throw err;
        }
      });
    }

    // At least one file
    if (!this.filesSrc) {
      grunt.fail.fatal('No files found!');
    }

    // Iterate over all specified file groups.
    async.eachLimit(this.files, os.cpus().length, begin, function (err) {
      if (err) { return console.log(err); }

      grunt.log.ok('Zipping complete ◕ ‿ ◕');
      done();
    });
  });
};
