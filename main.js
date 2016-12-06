var express = require('express');


var net = require('net');
var utils = require(__dirname + '/lib/utils');
var adapter = utils.adapter('scriptgui');
var LE = require(utils.controllerDir + '/lib/letsencrypt.js');
var path = require('path');
var fs = require('fs');
var cp = require('child_process');
//var back = require(__dirname +'/js/backend.js');
//var back = require(__dirname +'/js/backend.js');

var main = {
    objects: {},
    states: {}
};
var web;
var debug;
var running_id;
var sim = {
    run_type: "sim",
    time_mode: "auto",
    time: "",
    step: "false",
    stepSpeed: 900,
    script: ""
};
var sim_p;
var mode;

var bp = {};
var webServer;
var socketUrl = ":8088";

process.on("uncaughtException", function (err) {

    console.error(err);

    //debug.disconnect(function(){
    //    sim_p.kill('SIGINT');
    //});
});

var getMimeType = function (ext) {
    if (ext instanceof Array) ext = ext[0];
    var _mimeType = 'text/javascript';
    var isBinary = false;

    if (ext === '.css') {
        _mimeType = 'text/css';
    } else if (ext === '.bmp') {
        _mimeType = 'image/bmp';
        isBinary = true;
    } else if (ext === '.png') {
        isBinary = true;
        _mimeType = 'image/png';
    } else if (ext === '.jpg') {
        isBinary = true;
        _mimeType = 'image/jpeg';
    } else if (ext === '.jpeg') {
        isBinary = true;
        _mimeType = 'image/jpeg';
    } else if (ext === '.gif') {
        isBinary = true;
        _mimeType = 'image/gif';
    } else if (ext === '.tif') {
        isBinary = true;
        _mimeType = 'image/tiff';
    } else if (ext === '.js') {
        _mimeType = 'application/javascript';
    } else if (ext === '.html') {
        _mimeType = 'text/html';
    } else if (ext === '.htm') {
        _mimeType = 'text/html';
    } else if (ext === '.json') {
        _mimeType = 'application/json';
    } else if (ext === '.xml') {
        _mimeType = 'text/xml';
    } else if (ext === '.svg') {
        _mimeType = 'image/svg+xml';
    } else if (ext === '.eot') {
        isBinary = true;
        _mimeType = 'application/vnd.ms-fontobject';
    } else if (ext === '.ttf') {
        isBinary = true;
        _mimeType = 'application/font-sfnt';
    } else if (ext === '.cur') {
        isBinary = true;
        _mimeType = 'application/x-win-bitmap';
    } else if (ext === '.woff') {
        isBinary = true;
        _mimeType = 'application/font-woff';
    } else if (ext === '.wav') {
        isBinary = true;
        _mimeType = 'audio/wav';
    } else if (ext === '.mp3') {
        isBinary = true;
        _mimeType = 'audio/mpeg3';
    } else if (ext === '.avi') {
        isBinary = true;
        _mimeType = 'video/avi';
    } else if (ext === '.mp4') {
        isBinary = true;
        _mimeType = 'video/mp4';
    } else if (ext === '.mkv') {
        isBinary = true;
        _mimeType = 'video/mkv';
    } else if (ext === '.zip') {
        isBinary = true;
        _mimeType = 'application/zip';
    } else if (ext === '.ogg') {
        isBinary = true;
        _mimeType = 'audio/ogg';
    } else if (ext === '.manifest') {
        _mimeType = 'text/cache-manifest';
    } else {
        _mimeType = 'text/javascript';
    }

    return {mimeType: _mimeType, isBinary: isBinary};
};


function readDirs(dirs, cb, result) {
    result = result || [];
    if (!dirs || !dirs.length) {
        return cb && cb(result);
    }
    var dir = dirs.shift();
    adapter.readDir(dir, '', function (err, files) {
        if (!err && files && files.length) {
            for (var f = 0; f < files.length; f++) {
                if (files[f].file.match(/\.html$/)) {
                    result.push(dir + '/' + files[f].file);
                }
            }
        }
        setTimeout(function () {
            readDirs(dirs, cb, result);
        }, 0);
    });
}

function l(data) {
    console.log("-------- l ----------");
    console.log(data);
    //web.emit("_log", data);
};

function jl(data) {
    console.log("-------- jl ----------");
    console.log(data);
    //socket.emit("_jlog", data);
};

var pDebug = function (obj) {
    this.port = obj && obj.port || 5858;
    this.host = obj && obj.host || 'localhost';
    this.seq = 0;
    this.outstandingRequests = {};
    this.eventHandler = obj && obj.eventHandler;
};

function parse_data(_this, data) {
    try {
        var response = JSON.parse(data);
        //{
        //    seq: 8,
        //    type: 'event',
        //    event: 'break',
        //    body: {
        //        invocationText: '[anonymous](//@ sourceURL=s_engine\nvar a = 0\n\nfor (var i = 0; i < 10; i++){\n debugger;\n log(... (length: 1111))',
        //        sourceLine: 4,
        //        sourceColumn: 1,
        //        sourceLineText: ' debugger;',
        //        script: {
        //            id: 103,
        //            name: 's_engine',
        //            lineOffset: 0,
        //            columnOffset: 0,
        //            lineCount: 45
        //        }
        //    }
        //};


        if (response.type == "response") {

            requestSeq = response.request_seq;

            if (_this.outstandingRequests[requestSeq]) {
                var cb = _this.outstandingRequests[requestSeq];
                if (cb) {
                    console.log('Responce: ' + response.command + " seq: " + response.seq + "\n");
                    cb.call(_this, response);
                }
                delete _this.outstandingRequests[requestSeq];
            }
        } else {

            _this.eventHandler.call(_this, response);
        }
    } catch (err) {

        console.log("parse error");
        console.log(err);
        jl(data);
    }
}

pDebug.prototype = {
    end_cb: "",
    connect: function (callback) {

        var net = require('net');
        var inHeader = true;
        var body = '';
        var currentLength = 0;
        var _this = this;
        var buffer;
        var len;

        this.client = net.connect(this.port, this.host, callback);


        this.client.on('data', function (data0) {
            console.log("data_len: " + data0.length);

            var data1 = data0.toString().split('Content-Length:');

            //if (data1.length > 1) {
            //    data1.shift();
            //}


            data1.forEach(function (data) {
                if (data == "") return;

                var _data = data.split("\r\n\r\n")


                if (!isNaN(_data[0])) {

                    if (parseInt(_data[0]) == _data[1].length) {
                        len = parseInt(_data[0]) - 4;
                        buffer = ""
                        var line = _data[1]
                        var response;
                        var requestSeq;
                        var req;
                        var vals;

                        if (line != null && line != "") {
                            parse_data(_this, line)
                        }
                    } else {

                        buffer = _data[1].toString();
                        len = parseInt(_data[0]) - 4;

                    }
                } else {

                    buffer = buffer + _data[0].toString();
                    console.log("len: " + len + " buffer: " + buffer.length);


                    if (len <= buffer.length + 40) {
                        parse_data(_this, buffer)

                    }
                }
            });
        });

        this.client.on('end', function () {
            if (typeof(end_cb) == 'function') {
                end_cb();
            }
            console.log('client disconnected');
        });
    },
    disconnect: function (callback) {
        end_cb = callback
        this.client.end();

    },
    send: function (obj, callback, thisp) {
        var str;
        var cL = "Content-Length:";


        obj.seq = ++this.seq;
        obj.type = 'request';

        str = JSON.stringify(obj);
        this.client.write(cL + str.length + "\r\n\r\n" + str);

        this.outstandingRequests[this.seq] = callback;

    }
};


function init() {
    adapter.getForeignObjects('*', function (err, obj) {
        main.objects = obj;
        adapter.getForeignStates('*', function (err, obj) {
            main.states = obj;

            adapter.subscribeForeignObjects('*');
            adapter.subscribeForeignStates('*');

            adapter.on('stateChange', function (id, state) {
                main.states[id] = state;
                if(debug){
                    sim_p.send(["stateChange",id, state])
                }
            });
            adapter.on('objectChange', function (id, obj) {
                main.objects[id] = obj;
                if(debug){
                    sim_p.send(["objectChange",id, obj])
                }
            });

        });
    });

}

function init_web(settings) {

    var server = {
        app: null,
        server: null,
        io: null,
        settings: settings
    };
    //adapter.subscribeForeignObjects('system.config');

    settings.ttl = parseInt(settings.ttl, 10) || 3600;
    //if (!settings.whiteListEnabled && settings.whiteListSettings) delete settings.whiteListSettings;


    if (settings.port) {
        if (settings.secure) {
            if (!settings.certificates) {
                return null;
            }
        }
        server.app = express();
        if (settings.auth) {
            var session = require('express-session');
            var cookieParser = require('cookie-parser');
            var bodyParser = require('body-parser');
            var AdapterStore = require(utils.controllerDir + '/lib/session.js')(session, settings.ttl);
            var passportSocketIo = require('passport.socketio');
            var password = require(utils.controllerDir + '/lib/password.js');
            var passport = require('passport');
            var LocalStrategy = require('passport-local').Strategy;
            var flash = require('connect-flash'); // TODO report error to user

            var store = new AdapterStore({adapter: adapter});

            passport.use(new LocalStrategy(
                function (username, password, done) {
                    adapter.checkPassword(username, password, function (res) {
                        if (res) {
                            return done(null, username);
                        } else {
                            return done(null, false);
                        }
                    });
                }
            ));
            passport.serializeUser(function (user, done) {
                done(null, user);
            });

            passport.deserializeUser(function (user, done) {
                done(null, user);
            });

            server.app.use(cookieParser());
            server.app.use(bodyParser.urlencoded({
                extended: true
            }));
            server.app.use(bodyParser.json());
            server.app.use(bodyParser.text());
            server.app.use(session({
                secret: secret,
                saveUninitialized: true,
                resave: true,
                store: store
            }));
            server.app.use(passport.initialize());
            server.app.use(passport.session());
            server.app.use(flash());

            var autoLogonOrRedirectToLogin = function (req, res, next, redirect) {
                if (!settings.whiteListSettings) {
                    if (/\.js$/.test(req.originalUrl)) {
                        // return always valid js file for js, because if cache is active it leads to errors
                        var parts = req.originalUrl.split('/');
                        // if request for web/lib, ignore it, because no redirect information
                        if (parts[1] === 'lib') return res.status(200).send('');
                        return res.status(200).send('document.location="/login/index.html?href=/' + parts[1] + '/";');
                    } else {
                        return res.redirect(redirect);
                    }
                }
                var remoteIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
                var whiteListIp = server.io.getWhiteListIpForAddress(remoteIp, settings.whiteListSettings);
                adapter.log.info('whiteListIp ' + whiteListIp);
                if (!whiteListIp || settings.whiteListSettings[whiteListIp].user === 'auth') {
                    if (/\.js$/.test(req.originalUrl)) {
                        // return always valid js file for js, because if cache is active it leads to errors
                        var parts = req.originalUrl.split('/');
                        if (parts[1] === 'lib') return res.status(200).send('');
                        return res.status(200).send('document.location="/login/index.html?href=/' + parts[1] + '/";');
                    } else {
                        return res.redirect(redirect);
                    }
                }
                req.logIn(settings.whiteListSettings[whiteListIp].user, function (err) {
                    return next(err);
                });
            };

            server.app.post('/login', function (req, res) {
                var redirect = '/';
                var parts;
                if (req.body.origin) {
                    parts = req.body.origin.split('=');
                    if (parts[1]) redirect = decodeURIComponent(parts[1]);
                }
                if (req.body && req.body.username && settings.addUserName && redirect.indexOf('?') === -1) {
                    parts = redirect.split('#');
                    parts[0] += '?' + req.body.username;
                    redirect = parts.join('#');
                }
                var authenticate = passport.authenticate('local', {
                    successRedirect: redirect,
                    failureRedirect: '/login/index.html' + req.body.origin + (req.body.origin ? '&error' : '?error'),
                    failureFlash: 'Invalid username or password.'
                })(req, res);
            });

            server.app.get('/logout', function (req, res) {
                req.logout();
                res.redirect('/login/index.html');
            });

            // route middleware to make sure a user is logged in
            server.app.use(function (req, res, next) {
                // if cache.manifes got back not 200 it makes an error
                if (req.isAuthenticated() ||
                    /cache\.manifest$/.test(req.originalUrl) ||
                    /^\/login\//.test(req.originalUrl) ||
                    /\.ico$/.test(req.originalUrl)
                ) return next();

                autoLogonOrRedirectToLogin(req, res, next, '/login/index.html?href=' + encodeURIComponent(req.originalUrl));
            });
        } else {
            server.app.get('/login', function (req, res) {
                res.redirect('/');
            });
            server.app.get('/logout', function (req, res) {
                res.redirect('/');
            });

        }
        server.app.get('*/_socket/info.js', function (req, res) {
            var lang = "de"; //todo
            res.set('Content-Type', 'application/javascript');
            res.status(200).send('var socketUrl = "' + socketUrl + '"; var socketSession = "' + '' + '"; sysLang = "' + lang + '"; socketForceWebSockets = ' + (settings.forceWebSockets ? 'true' : 'false') + ';');
        });

        // Init read from states

        var appOptions = {};
        if (settings.cache) appOptions.maxAge = 30758400000;


        server.app.use(express.static(__dirname + '/public'));
        server.app.use(express.static(__dirname + '/../../iobroker-data/files'));

        server.server = LE.createServer(server.app, settings, settings.certificates, settings.leConfig, adapter.log);
        server.server.__server = server;
    } else {
        adapter.log.error('port missing');
        process.exit(1);
    }

    if (server.server) {
        adapter.getPort(settings.port, function (port) {
            if (port != settings.port && !settings.findNextPort) {
                adapter.log.error('port ' + settings.port + ' already in use');
                process.exit(1);
            }
            server.server.listen(port, (!settings.bind || settings.bind === '0.0.0.0') ? undefined : settings.bind || undefined);
            adapter.log.info('http' + (settings.secure ? 's' : '') + ' server listening on port ' + port);
        });
    }

    // Activate integrated simple API


    // Activate integrated socket

    var IOSocket = require(utils.appName + '.socketio/lib/socket.js');
    var socketSettings = JSON.parse(JSON.stringify(settings));
    // Authentication checked by server itself
    socketSettings.auth = false;
    socketSettings.ttl = settings.ttl || 3600;
    socketSettings.forceWebSockets = settings.forceWebSockets || false;

    socketSettings.extensions = function (socket) {
        socket.on("start", function (script, callback) {
            if (debug) {
                socket.emit("already_running")
            } else {


                bp = {};
                mode = script[2];

                sim.stepSpeed = script[2] + 100;
                sim_p = cp.fork(__dirname + '/js/engine/sim_engine.js', [script[0], script[1]], {execArgv: ['--debug-brk']});
                //sim_p = cp.fork(__dirname + '/js/engine/sim_process_test.js', [script[0], script[1]], {execArgv: ['--debug-brk']});


                sim.split_script = script.toString().split("\n");
                var first_break = true;
                debug = new pDebug({

                    eventHandler: function (event) {
                        console.log('Event: ' + event.event + " seq: " + event.seq + " Script: " + event.body.script.name + " Line: " + event.body.sourceLine + " Column: " + event.body.sourceColumn + " Text: " + event.body.sourceLineText + "\n");

                        if (event.event == "break") {
                            //{
                            //    seq: 8,
                            //    type: 'event',
                            //    event: 'break',
                            //    body: {
                            //        invocationText: '[anonymous](//@ sourceURL=s_engine\nvar a = 0\n\nfor (var i = 0; i < 10; i++){\n debugger;\n log(... (length: 1111))',
                            //        sourceLine: 4,
                            //        sourceColumn: 1,
                            //        sourceLineText: ' debugger;',
                            //        script: {
                            //            id: 103,
                            //            name: 's_engine',
                            //            lineOffset: 0,
                            //            columnOffset: 0,
                            //            lineCount: 45
                            //        }
                            //    }
                            //};

                            if (first_break) {
                                var i = 0;

                                function a() {
                                    if (i < script[3].length) {
                                        if (script[3][i]) {
                                            debug.send({
                                                "command": "setbreakpoint",
                                                "arguments": {
                                                    "type": "script",
                                                    "target": "s_engine.js",
                                                    "line": i,
                                                    "column": 0,
                                                }
                                            }, function () {

                                                i++;
                                                a()
                                            });

                                        } else {
                                            i++;

                                            a()
                                        }

                                    } else {
                                        first_break = false;
                                        debug.send({command: 'continue'}, function () {

                                        });
                                    }
                                }

                                if (script[3]) {
                                    a();
                                } else {
                                    first_break = false;
                                    debug.send({command: 'continue'}, function () {

                                    });
                                }

                            } else {
                                if (mode == "gui") {
                                    var debug_info = sim.split_script[event.body.sourceLine - 1].split("//")[1];
                                    var step = debug_info.split("--")[0];
                                    var baustein = debug_info.split("--")[1];
                                    if (step == "trigger_highlight") {
                                        socket.emit("trigger_highlight", baustein);
                                    } else if (step == "step_fbs_highlight") {
                                        socket.emit("step_fbs_highlight", baustein);
                                    } else if (step == "step_mbs_highlight_in") {
                                        socket.emit("step_mbs_highlight_in", baustein);
                                    } else if (step == "step_mbs_highlight_out") {
                                        socket.emit("step_mbs_highlight_out", baustein);
                                    } else if (step == "step_mbs_highlight_reset") {
                                        socket.emit("step_mbs_highlight_reset", baustein);
                                    } else {
                                        //client.continue(function (err, doneOrNot) {
                                        //    console.log(err)
                                        //    sim_p.send(["home", homematic])
                                        //});
                                    }
                                } else if (mode == "editor" && event.body.script.name != "s_engine.js") {
                                    console.log("---------------AUTO CONTINUE-----------------")
                                    debug.send({
                                        command: 'continue',
                                        arguments: {"stepaction": "next"}
                                    }, function () {
                                    });

                                } else {
                                    socket.emit("brake", event.body);
                                    console.log("emit scope")
                                    debug.send({
                                        "command": "scopes",
                                        "arguments": {
                                            frameNumber: 0,
                                            inlineRefs: true
                                        }
                                    }, function (data) {
                                        console.log("scope")
                                        socket.emit("scopes", data)
                                        //console.dir(data, {depth: null})

                                        //debug.send({
                                        //    "command": "lookup",
                                        //    "arguments": {
                                        //        handles: [11],
                                        //        inlineRefs: true
                                        //    }
                                        //}, function (data) {
                                        //    jl(data)
                                        //});
                                    });
                                }
                            }
                        }
                    }
                });


                debug.connect(function () {

                    console.log("Debugger connect")
                    running_id = socket.id;
                    debug.send({command: 'continue'}, function () {

                    });

                    sim_p.on('close', function (code, signal) {
                        console.log('close ' + code + "   " + signal);
                        socket.emit("sim_exit");
                    });
                    sim_p.on('error', function (code, signal) {
                        console.log('error ' + code + "   " + signal);
                    });
                    sim_p.on('exit', function (code, signal) {
                        console.log('exit ' + code + "   " + signal);

                    });

                    sim_p.on('message', function (data) {
                        if (data[0] == "init") {
                            sim_p.send(["iobroker", main.objects, main.states]);
                        } else if (data[0] == "log") {
                            //console.log(data[1])
                            socket.emit("log_log", data[1])
                        } else if (data[0] == "info") {
                            //console.info(data[1])
                            socket.emit("log_info", data[1])
                        } else if (data[0] == "warn") {
                            //console.warn(data[1])
                            socket.emit("log_warn", data[1])
                        } else if (data[0] == "error") {
                            //console.error(data[1])
                            socket.emit("log_error", data[1])
                        } else if (data[0] == "debug") {
                            //console.debug(data[1])
                            socket.emit("log_debug", data[1])
                        } else if (data[0] == "sim_Time") {
                            socket.emit("sim_Time", data[1])
                        } else if (data[0] == "add_subscribe") {
                            socket.emit("add_subscribe", data[1])
                        } else {

                            socket.emit("message", data);
                        }


                    });


                    //sim_p.send(["home", "homematic"])


                });

            }
        });
        socket.on("delObject", function (id) {
            adapter.delForeignObject(id, "", function (err, data) {
            })
        });
        socket.on("kill", function () {
            if (debug && running_id == socket.id) {
                debug.disconnect(function () {
                    sim_p.kill('SIGINT');
                    debug = undefined;
                });
            }

        });
        socket.on("disconnect", function () {
            if (debug && running_id == socket.id) {
                debug.disconnect(function () {
                    sim_p.kill('SIGINT');
                    debug = undefined;
                });
            }
        });
        socket.on("trigger", function (data) {
            sim_p.send(["trigger", data]);
        });
        socket.on("next", function () {
            console.log("---------------NEXT CONTINUE-----------------");
            debug.send({command: 'continue'}, function () {

            });
        });
        socket.on("deb_step", function () {
            debug.send({
                command: 'continue',
                arguments: {"stepaction": "next"}
            }, function () {

            });
        });
        socket.on("deb_lookup", function (data, callback) {

            debug.send({
                "command": "lookup",
                "arguments": {
                    handles: [data],
                    inlineRefs: true
                }
            }, function (data) {
                callback(data)
            });
        });
        socket.on("clearBP", function (data, callback) {

            debug.send({
                "command": "clearbreakpoint",
                "arguments": {
                    "breakpoint": bp[data]
                }
            }, function (data) {
                delete (data.body.line);
                callback(data)
            });
        });
        socket.on("setBP", function (data, callback) {
            console.log(data)
            debug.send({
                "command": "setbreakpoint",
                "arguments": {
                    "type": "script",
                    "target": "s_engine.js",
                    "line": data,
                    "column": 0,
                }
            }, function (data) {
                bp[data.body.line] = data.body.breakpoint
                jl(data)

            });
        });
        socket.on("time", function (data, callback) {
            console.log(data);
            sim_p.send(["time", data])
        });
        socket.on("play_subscribe", function (data) {
            sim_p.send(["play_subscribe", data])
        })
    };

    server.io = new IOSocket(server.server, socketSettings, adapter);


    if (server.server) {
        return server;
    } else {
        return null;
    }


}

if (process.argv[2] == "local") {
    console.log("--------Local--------")
} else {


    adapter.on('ready', function () {
        console.log("--------ioBroker--------")
        //init();

        socketUrl = ":" + (adapter.config.port || 8088);

        if (adapter.config.secure) {
            // Load certificates
            adapter.getCertificates(function (err, certificates, leConfig) {
                adapter.config.certificates = certificates;
                adapter.config.leConfig = leConfig;
                webServer = init_web(adapter.config);
            });
        } else {
            webServer = init_web(adapter.config);
        }
        init();


    });
}


