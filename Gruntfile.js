/**
 * Created by jack on 10.07.2014.
 */
module.exports = function (grunt) {
var ops = grunt.file.readJSON("package.json");
    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        nodewebkit: {
            options: {
                buildDir: './build',
                winIco:  './src/img/icon/favicon.png',
                macIcns:  './src/img/icon/favicon.png',
            },
            src: './src/**/*'
        },
        compress: {
            win: {
                options: {
                    archive: 'build/ScriptGUI_<%= pkg.version %>_win.zip'
                },
                files: [
                    {expand: true, cwd: 'build/ScriptGUI/win/', src: ['**'], dest: 'ScriptGUI/'},
                ]
            },
            osx: {
                options: {
                    archive: 'build/ScriptGUI_<%= pkg.version %>_osx.zip'
                },
                files: [
                    {expand: true, cwd: 'build/ScriptGUI/osx/', src: ['**'], dest: 'ScriptGUI/'},
                ]
            }
        },
    });


    // Actually load this plugin's task(s)1
    grunt.loadTasks('tasks');

    // By default, lint and run all tests.
    grunt.registerTask('Build', ['nodewebkit','compress']);
};