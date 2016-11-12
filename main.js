var net = require('net');
var utils = require(__dirname + '/lib/utils');
var adapter = utils.adapter('scriptgui');
var io = require('socket.io')();
var path = require('path');
var fs = require('fs');
var cp = require('child_process');
//var back = require(__dirname +'/js/backend.js');
//var back = require(__dirname +'/js/backend.js');

var main = {}
var web;
var debug;
var sim = {
    run_type: "sim",
    time_mode: "auto",
    time: "",
    step: "false",
    stepSpeed: 900,
    script: "",
};
var sim_p;
var mode;

var bp = {}

process.on("uncaughtException", function (e) {
    sim_p.kill('SIGINT');
});

console.log('%c Oh my heavens! ', 'background: #222; color: #bada55');
function l(data) {
    web.emit("_log", data);
};

function jl(data) {
    web.emit("_jlog", data);
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
                    console.log('Respoce: ' + response.command + " seq: " + response.seq + "\n");
                    cb.call(_this, response);
                }
                delete _this.outstandingRequests[requestSeq];
            }
        } else {

            _this.eventHandler.call(_this, response);
        }
    } catch (err) {

        console.log("parse error")
        console.log(err)
        jl(data)
    }
}

pDebug.prototype = {
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
            console.log("data_len: " + data0.length)

            var data1 = data0.toString().split('Content-Length:')

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
                    console.log("len: " + len + " buffer: " + buffer.length)


                    if (len <= buffer.length) {
                        parse_data(_this, buffer)

                    }
                }
            });
        });

        this.client.on('end', function () {
            console.log('client disconnected');
        });
    },
    disconnect: function () {
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


function intio() {
    adapter
    io.listen(3000);
    io.on('connection', function (w) {
        web = w;
        console.log("connect");

        web.on("start", function (script) {
            bp = {};
            mode = script[2];

            sim.stepSpeed = script[2] + 100;
            sim_p = cp.fork(__dirname + '/js/engine/sim_process.js', [script[0], script[1]], {execArgv: ['--debug-brk']});
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
                                    web.emit("trigger_highlight", baustein);
                                } else if (step == "step_fbs_highlight") {
                                    web.emit("step_fbs_highlight", baustein);
                                } else if (step == "step_mbs_highlight_in") {
                                    web.emit("step_mbs_highlight_in", baustein);
                                } else if (step == "step_mbs_highlight_out") {
                                    web.emit("step_mbs_highlight_out", baustein);
                                } else if (step == "step_mbs_highlight_reset") {
                                    web.emit("step_mbs_highlight_reset", baustein);
                                } else {
                                    //client.continue(function (err, doneOrNot) {
                                    //    console.log(err)
                                    //    sim_p.send(["home", homematic])
                                    //});
                                }
                            } else if (mode == "editor" && event.body.script.name != "s_engine.js") {

                                debug.send({
                                    command: 'continue',
                                    arguments: {"stepaction": "next"}
                                }, function () {
                                });

                            } else {
                                web.emit("brake", event.body);

                                debug.send({
                                    "command": "scopes",
                                    "arguments": {
                                        frameNumber: 0,
                                        inlineRefs: true
                                    }
                                }, function (data) {

                                    web.emit("scopes", data)
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

                debug.send({command: 'continue'}, function () {

                });

                sim_p.on('close', function (code, signal) {
                    console.log('close ' + code + "   " + signal);
                });
                sim_p.on('error', function (code, signal) {
                    console.log('error ' + code + "   " + signal);
                });
                sim_p.on('exit', function (code, signal) {
                    console.log('exit ' + code + "   " + signal);
                    web.emit("sim_exit");
                });

                sim_p.on('message', function (data) {
                    if (data[0] == "init") {

                        sim_p.send(["home", "data"]);


                    } else {
                        web.emit("message", data);
                    }


                });
                //sim_p.send(["home", "homematic"])


            });

            web.on("kill", function () {
                debug.disconnect()
                setTimeout(function () {
                    sim_p.kill('SIGINT');
                }, 500)
            });

            web.on("disconnect", function () {
                debug.disconnect()
                setTimeout(function () {
                    sim_p.kill('SIGINT');
                }, 500)
                //sim_p.kill('SIGINT');
            });

            web.on("trigger", function (data) {
                sim_p.send(["trigger", data]);
            });

            web.on("next", function () {
                debug.send({command: 'continue'}, function () {

                });
            });

            web.on("deb_step", function () {
                debug.send({
                    command: 'continue',
                    arguments: {"stepaction": "next"}
                }, function () {

                });
            });

            web.on("deb_lookup", function (data, callback) {

                debug.send({
                    "command": "lookup",
                    "arguments": {
                        handles: [data],
                        inlineRefs: true
                    }
                }, function (data) {
                    callback(data)
                });
            })
            web.on("clearBP", function (data, callback) {

                debug.send({
                    "command": "clearbreakpoint",
                    "arguments": {
                        "breakpoint": bp[data]
                    }
                }, function (data) {
                    delete (data.body.line)
                    callback(data)
                });
            })
            web.on("setBP", function (data, callback) {
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
            })


        });
        web.on("delObject", function (id) {
            adapter.delForeignObject(id, "", function (err, data) {
            })
        })

    });


};

function init() {
    adapter.getForeignObject('*', function (err, obj) {
        main.objects = obj;
    });
    adapter.subscribeStates('*');
    intio();
}

if (process.argv[2] == "local") {
    console.log("--------Local--------")
    intio();
} else {


    adapter.on('ready', function () {
        console.log("--------ioBroker--------")
        init();
    });
}

