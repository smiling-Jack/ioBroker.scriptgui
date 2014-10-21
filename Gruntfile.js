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
    grunt.loadNpmTasks('grunt-exec');


    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
//        secret: grunt.file.readJSON('secret.json'),
        secret: grunt.file.readJSON("secret.json"),
//----------------------------------------------------------------------------------------------------------------------
        clean:{
            build:["build"],
            after_win:["build/win/ScriptGUI/nw.exe","build/win/ScriptGUI/nwsnapshot.exe","build/win/ScriptGUI/sg.nw"]

        },

//----------------------------------------------------------------------------------------------------------------------
        copy: {
            win_webkit: {
                files: [
                    {expand: true,cwd: 'cache/win/', src: ['*'], dest: 'build/win/ScriptGUI', filter: 'isFile'},
                ],
            },
            osx_webkit: {
                files: [
                    {expand: true,cwd: 'cache/osx/', src: ['node-webkit.app/**'], dest: 'build/osx/ScriptGUI'},
                ],
            },
            osx_src: {
                files: [
                    {expand: true,cwd: 'src', src: ['**'], dest: 'build/osx/ScriptGUI/node-webkit.app/Contents/Resources/app.nw/'},
                ],
            },
        },
//----------------------------------------------------------------------------------------------------------------------


        rename: {
           'osx.app': {
                files: [
                    {src: ['build/osx/ScriptGUI/node-webkit.app'], dest: 'build/osx/ScriptGUI/ScriptGUI.app'},
                ]
            },
        },

        zip: {
            'zip-win': {
                cwd: 'build/win',
                src: ['build/win/**'],
                dest: 'build/ScriptGUI_win.zip',
//                compression: 'DEFLATE',
//                base64: true,
//                dot: true
            },
            'zip-osx': {
                cwd: 'build/osx/ScriptGUI',
                src: ['build/osx/ScriptGUI/**'],
                dest: 'build/ScriptGUI_osx.zip',
                compression: 'DEFLATE',
                base64: true,
                dot: true
            },
            'win_nw_pack': {
                cwd: 'src/',
                src: ['src/**'],
                dest: 'build/win/Scriptgui/sg.nw',
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
        exec: {
            win_copy_b: {
                cwd: "E:/Home_Programming/ScriptGUI.app/build/win/ScriptGUI/",
                command: "copy /b nw.exe+sg.nw ScriptGUI.exe"
            }
        }
//----------------------------------------------------------------------------------------------------------------------

    });

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
    });

    grunt.registerTask('build_win', function () {
        grunt.file.mkdir("build/win/ScriptGUI/");
        grunt.task.run(["copy:win_webkit"]);
        grunt.task.run(["zip:win_nw_pack"]);
        grunt.task.run(["exec:win_copy_b"]);
        grunt.task.run(["clean:after_win"]);


    });

    grunt.registerTask('build_osx', function () {
        grunt.file.mkdir("build/osx/ScriptGUI/");
        grunt.task.run(["copy:osx_webkit"]);
        grunt.task.run(["copy:osx_src"]);
        grunt.task.run(["rename:osx.app"]);
    });


    grunt.registerTask('Build_ZIP_UP', ['clean','make_build_data','build_win','build_osx',"clean:after_win",'zip:zip-win','zip:zip-osx','sftp']);
    grunt.registerTask('Build_ZIP', ['clean','make_build_data','build_win','build_osx','zip:zip-win','zip:zip-osx']);
    grunt.registerTask('Build',['clean','make_build_data','build_win','build_osx']);



};