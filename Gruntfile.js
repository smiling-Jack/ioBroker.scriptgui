/**
 * Created by jack on 10.07.2014.
 */


module.exports = function (grunt) {
    var ops = grunt.file.readJSON("package.json");
    var _dir = process.cwd()
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-rename');
    grunt.loadNpmTasks('grunt-zip');
    grunt.loadNpmTasks('grunt-ssh');
    grunt.loadNpmTasks('grunt-exec');


    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        secret: grunt.file.readJSON("secret.json"),

//----------------------------------------------------------------------------------------------------------------------
        clean:{
            build:["build","cache/win_32/setup.json","cache/win_64/setup.json"],
            after_win32:["build/win_32/ScriptGUI/nw.exe","build/win_32/ScriptGUI/nwsnapshot.exe","build/win_32/ScriptGUI/sg.nw"],
            after_win64:["build/win_64/ScriptGUI/nw.exe","build/win_64/ScriptGUI/nwsnapshot.exe","build/win_64/ScriptGUI/sg.nw"]

        },

//----------------------------------------------------------------------------------------------------------------------
        copy: {
            win32_webkit: {
                files: [
                    {expand: true,cwd: 'cache/win_32/', src: ['*'], dest: 'build/win_32/ScriptGUI', filter: 'isFile'},
                ]
            },
            win64_webkit: {
                files: [
                    {expand: true,cwd: 'cache/win_64/', src: ['*'], dest: 'build/win_64/ScriptGUI', filter: 'isFile'},
                ]
            },
            osx32_webkit: {
                files: [
                    {expand: true,cwd: 'cache/osx_32/', src: ['node-webkit.app/**'], dest: 'build/osx_32/ScriptGUI'},
                ]
            },
            osx64_webkit: {
                files: [
                    {expand: true,cwd: 'cache/osx_64/', src: ['node-webkit.app/**'], dest: 'build/osx_64/ScriptGUI'},
                ]
            },
            osx32_src: {
                files: [
                    {expand: true,cwd: 'src', src: ['**'], dest: 'build/osx_32/ScriptGUI/node-webkit.app/Contents/Resources/app.nw/'},
                ]
            },
            osx64_src: {
                files: [
                    {expand: true,cwd: 'src', src: ['**'], dest: 'build/osx_64/ScriptGUI/node-webkit.app/Contents/Resources/app.nw/'},
                ]
            }
        },
//----------------------------------------------------------------------------------------------------------------------


        rename: {
           'osx_32': {
                files: [
                    {src: ['build/osx_32/ScriptGUI/node-webkit.app'], dest: 'build/osx_32/ScriptGUI/ScriptGUI.app'},
                ]
            },
            'osx_64': {
                files: [
                    {src: ['build/osx_64/ScriptGUI/node-webkit.app'], dest: 'build/osx_64/ScriptGUI/ScriptGUI.app'},
                ]
            },
        },

        zip: {
            'zip-win32': {
                cwd: 'build/win_32',
                src: ['build/win_32/**'],
                dest: 'build/ScriptGUI_win32.zip',
//                compression: 'DEFLATE',
//                base64: true,
//                dot: true
            },
            'zip-win64': {
                cwd: 'build/win_64',
                src: ['build/win_64/**'],
                dest: 'build/ScriptGUI_win64.zip',
//                compression: 'DEFLATE',
//                base64: true,
//                dot: true
            },
            'zip-osx32': {
                cwd: 'build/osx_32/ScriptGUI',
                src: ['build/osx_32/ScriptGUI/**'],
                dest: 'build/ScriptGUI_osx32.zip',
                compression: 'DEFLATE',
                base64: true,
                dot: true
            },
            'zip-osx64': {
                cwd: 'build/osx_64/ScriptGUI',
                src: ['build/osx_64/ScriptGUI/**'],
                dest: 'build/ScriptGUI_osx64.zip',
                compression: 'DEFLATE',
                base64: true,
                dot: true
            },
            'win32_nw_pack': {
                cwd: 'src/',
                src: ['src/**'],
                dest: 'build/win_32/ScriptGUI/sg.nw',
//                compression: 'DEFLATE',
//                base64: true,
//                dot: true
            },
            'win64_nw_pack': {
                cwd: 'src/',
                src: ['src/**'],
                dest: 'build/win_64/ScriptGUI/sg.nw',
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
            win32_copy_b: {
                cwd: _dir + "/build/win_32/ScriptGUI/",
                command: "copy /b nw.exe+sg.nw ScriptGUI.exe"
            },
            win64_copy_b: {
                cwd:  _dir + "/build/win_64/ScriptGUI/",
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
                    "url": "http://37.120.169.17/jdownloads/ScriptGUI/ScriptGUI_osx32.zip"
                },
                "win": {
                    "url": "http://37.120.169.17/jdownloads/ScriptGUI/ScriptGUI_win32.zip"
                },
                "linux32": {
                    "url": "http://37.120.169.17/jdownloads/ScriptGUI/ScriptGUI_linux.tar.gz"
                }
            }
        };
        grunt.file.write("src/update.json", JSON.stringify(update));
    });

    grunt.registerTask('build_win32', function () {
        grunt.file.mkdir("build/win_32/ScriptGUI/");
        grunt.task.run(["copy:win32_webkit"]);
        grunt.task.run(["zip:win32_nw_pack"]);
        grunt.task.run(["exec:win32_copy_b"]);
        grunt.task.run(["clean:after_win32"]);
    });
    grunt.registerTask('build_win64', function () {
        grunt.file.mkdir("build/win_64/ScriptGUI/");
        grunt.task.run(["copy:win64_webkit"]);
        grunt.task.run(["zip:win64_nw_pack"]);
        grunt.task.run(["exec:win64_copy_b"]);
        grunt.task.run(["clean:after_win64"]);
    });

    grunt.registerTask('build_osx32', function () {
        grunt.file.mkdir("build/osx_32/ScriptGUI/");
        grunt.task.run(["copy:osx32_webkit"]);
        grunt.task.run(["copy:osx32_src"]);
        grunt.task.run(["rename:osx_32"]);
    });
    grunt.registerTask('build_osx64', function () {
        grunt.file.mkdir("build/osx_64/ScriptGUI/");
        grunt.task.run(["copy:osx64_webkit"]);
        grunt.task.run(["copy:osx64_src"]);
        grunt.task.run(["rename:osx_64"]);
    });


    grunt.registerTask('Build_ZIP_UP', [
        'clean',
        'make_build_data',
        'build_win32',
        'build_win64',
        'build_osx32',
        'build_osx64',
        "clean:after_win32",
        "clean:after_win64",
        'zip:zip-win32',
        'zip:zip-win64',
        'zip:zip-osx32',
        'zip:zip-osx64',
        'sftp'
    ]);
    grunt.registerTask('Build_ZIP', [
        'clean',
        'make_build_data',
        'build_win32',
        'build_win64',
        'build_osx32',
        'build_osx64',
        "clean:after_win32",
        "clean:after_win64",
        'zip:zip-win32',
        'zip:zip-win64',
        'zip:zip-osx32',
        'zip:zip-osx64',
    ]);
    grunt.registerTask('Build',[
        'clean',
        'make_build_data',
        'build_win32',
        'build_win64',
        'build_osx32',
        'build_osx64',
        "clean:after_win32",
        "clean:after_win64",
    ]);



};