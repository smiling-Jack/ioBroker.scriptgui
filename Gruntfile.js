/**
 * Created by jack on 10.07.2014.
 */


module.exports = function (grunt) {
    var ops = grunt.file.readJSON("package.json");
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-ssh');



    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
//        secret: grunt.file.readJSON('secret.json'),
        secret: "",

        clean: ["build"],

//----------------------------------------------------------------------------------------------------------------------
        copy: {
            win_webkit: {
                files: [
                    {expand: true, src: ['cache/win/**'], dest: 'build/win/ScriptGUI'},
                ],
            },
        },
//----------------------------------------------------------------------------------------------------------------------


        rename: {
           'rn-win': {
                files: [
                    {src: ['build/win/ScriptGUI/win'], dest: 'build/win/ScriptGUI/ScriptGUI'},
                ]
            },
            'rn-osw': {
                files: [
                    {src: ['build/osx/ScriptGUI/osx'], dest: 'build/osx/ScriptGUI/ScriptGUI'},
                ]
            }
        },

        zip: {
            'zip-win': {
                cwd: 'build/win/ScriptGUI',
                src: ['build/win/ScriptGUI/**'],
                dest: 'build/ScriptGUI_win.zip',
//                compression: 'DEFLATE',
//                base64: true,
//                dot: true
            },
            'zip-osx': {
                cwd: 'build/osx/ScriptGUI',
                src: ['build/osx/ScriptGUI/**'],
                dest: 'build/ScriptGUI_osx.zip',
//                compression: 'DEFLATE',
//                base64: true,
//                dot: true
            },
            'win-nw': {
                cwd: 'build/osx/ScriptGUI',
                src: ['build/osx/ScriptGUI/**'],
                dest: 'build/ScriptGUI_osx.zip',
//                compression: 'DEFLATE',
//                base64: true,
//                dot: true
            }
        },
//----------------------------------------------------------------------------------------------------------------------
        sftp: {
            update_json: {
                files: {
                    "./": ["src/update.json"]
                },
                options: {
                    srcBasePath: "src/",
                    path: '/var/www/jdownloads/ScriptGUI',
                    host: '<%= secret.host %>',
                    username: '<%= secret.username %>',
                    password: '<%= secret.password %>',
                    showProgress: true
                }
            },
            data_zips: {
                files: {
                    "./": ["build/*zip"]

                },
                options: {
                    srcBasePath: "build/",
                    path: '/var/www/jdownloads/ScriptGUI',
                    host: '<%= secret.host %>',
                    username: '<%= secret.username %>',
                    password: '<%= secret.password %>',
                    showProgress: true
                }
            }
        },

//----------------------------------------------------------------------------------------------------------------------

    });


    // Actually load this plugin's task(s)1
//    grunt.loadTasks('tasks');

    // By default, lint and run all tests.
//    grunt.registerTask('Build', ['nodewebkit',c,'make_build_data','upload']);

    grunt.registerTask('make_build_data', function () {

        var manifest = grunt.file.readJSON('src/package.json');
        var d = new Date();

        var update = {
            "name": "ScriptGUI",
            "version": manifest.version,
            "build_time": d.toLocaleTimeString(),
            "build_date": d.getDate() + "." + parseInt(d.getMonth() + 1) + "." + d.getFullYear(),
            "manifestUrl": "http://37.120.169.17/jdownloads/ScriptGUI/update.json",
            "packages": {
                "mac": {
                    "url": "http://37.120.169.17/jdownloads/ScriptGUI/ScriptGUI_osx.zip"
                },
                "win": {
                    "url": "http://37.120.169.17/jdownloads/ScriptGUI/ScriptGUI_win.zip"
                },
                "linux32": {
                    "url": "http://37.120.169.17/jdownloads/ScriptGUI/ScriptGUI_linux.tar.gz"
                }
            }
        };


        grunt.file.write("src/update.json", JSON.stringify(update));
        console.log('finish_make_build_data')
    });

    grunt.registerTask('build_win', function () {
        grunt.file.mkdir("build/win/ScripGUI/");
        grunt.file.mkdir("build/osx/ScripGUI/");


        grunt.task.run(["copy"]);

        grunt.log.ok("hallo")
    });


    grunt.registerTask('Build_ZIP_UP', ['clean','make_build_data','nodewebkit','rename','zip','sftp:data_zips']);
    grunt.registerTask('Build_ZIP', ['clean','make_build_data','nodewebkit','rename','zip']);
    grunt.registerTask('Build', ['clean','make_build_data','nodewebkit']);



};