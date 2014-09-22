/**
 * Created by jack on 10.07.2014.
 */
module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-node-webkit-builder');
    grunt.loadNpmTasks('grunt-contrib-compress');

    // Project configuration.
    grunt.initConfig({
        nodewebkit: {
            options: {
                buildDir: './build',
//                version: 'v0.10.2',
                winIco:  './src/img/icon/favicon.png',
                macIcns:  './src/img/icon/favicon.png',

            },
            src: './src/**/*'
        }
    });

    grunt.initConfig({
        compress: {
            win: {
                options: {
                    archive: 'build/ScriptGUI_win.zip'
                },
                files: [
//                    {src: ['path/*'], dest: 'internal_folder/', filter: 'isFile'}, // includes files in path
//                    {src: ['build/ScriptGUI/win/**'], dest: 'ScriptGUI'}, // includes files in path and its subdirs
                    {expand: true, cwd: 'build/ScriptGUI/win/', src: ['**'], dest: 'ScriptGUI/'},
                ]
            },
            osx: {
                options: {
                    archive: 'build/ScriptGUI_osx.zip'
                },
                files: [
//                    {src: ['path/*'], dest: 'internal_folder/', filter: 'isFile'}, // includes files in path
//                    {src: ['build/ScriptGUI/win/**'], dest: 'ScriptGUI'}, // includes files in path and its subdirs
                    {expand: true, cwd: 'build/ScriptGUI/osx/', src: ['**'], dest: 'ScriptGUI/'},
                ]
            }
        }
    });


    // Actually load this plugin's task(s)1
    grunt.loadTasks('tasks');

    // By default, lint and run all tests.
    grunt.registerTask('default', ['nodewebkit']);
};