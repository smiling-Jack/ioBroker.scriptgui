/**
 * Created by Schorling on 07.10.2016.
 */

var web;
function l(data) {
    web.emit("_log", data);
};

function jl(data){
    web.emit("_jlog", data);
};
var io = require('socket.io')();
var path = require('path');
var fs = require('fs');


var cp = require('child_process');

var debug;
sim = {
    run_type: "sim",
    time_mode: "auto",
    time: "",
    step: "false",
    stepSpeed: 900,
    script: "",
};
var sim_p;
var mode;

var pDebug = function(obj) {
    this.port = obj && obj.port || 5858;
    this.host = obj && obj.host || 'localhost';
    this.seq  = 0;
    this.outstandingRequests = {};
    this.eventHandler = obj && obj.eventHandler;
};


pDebug.prototype = {
    connect: function(callback) {

        var net             = require('net');
        var  inHeader      = true;
        var  body          = '';
        var  currentLength = 0;
        var  _this         = this;


        this.client = net.connect(this.port, this.host, callback);


        this.client.on('data', function(data0) {

            var data1 = data0.toString().split('Content-Length:')

            data1.forEach(function(data){
                if(data == "") return;

                data = 'Content-Length:'+data;


                var lines = data.toString().replace('"success":true,"running":true}', '"success":true,"running":true}\r\n').split('\r\n');
                var response;
                var requestSeq;
                var req;


                lines.forEach(function (line) {
                    var vals;

                    try {
                        response = JSON.parse(line);
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
                            var requestSeq = response.request_seq;

                            if (_this.outstandingRequests[requestSeq]) {
                                var cb = _this.outstandingRequests[requestSeq];
                                if (cb) {
                                    cb.call();
                                }
                                delete _this.outstandingRequests[requestSeq];
                            }
                        } else {
                            _this.eventHandler.call(_this, response);
                        }





                    } catch (err) {

                    }


                });


                //if (body.length === currentLength) {
                //    inHeader = true;
                //    if (body) {
                //        response = JSON.parse(body);
                //        l(response)
                //        requestSeq = response.request_seq;
                //        if (_this.outstandingRequests[requestSeq]) {
                //            req = _this.outstandingRequests[requestSeq];
                //            if (req.callback) {
                //                req.callback.call(req.thisp || _this, req, response);
                //            }
                //            delete _this.outstandingRequests[requestSeq];
                //        } else {
                //            if (response.type === 'event' && _this.eventHandler) {
                //                _this.eventHandler.call(_this, response);
                //            } else if (response.type !== 'event') {
                //                console.log('unknown/unexpected message from server!');
                //                console.log(response);
                //            } else {
                //                // an event w/no event listener - eat it
                //            }
                //        }
                //        body = '';
                //    }
                //}
            });
        });


        this.client.on('end', function() {
            console.log('client disconnected');
        });
    }
    , disconnect: function() {
        this.client.end();
    }
    , send: function(obj, callback, thisp) {
        var str
            , cL = "Content-Length:"
            ;

        obj.seq = ++this.seq;
        obj.type = 'request';

        str = JSON.stringify(obj);
        this.client.write(cL + str.length + "\r\n\r\n" + str);

        this.outstandingRequests[this.seq] = callback;

    }
};


module.exports = {

    debug: undefined,
    mode: undefined,


    intio: function () {
        io.listen(3000);
        io.on('connection', function (w) {
            web = w;
            console.log("connect");

            web.on("start", function (script) {
                //console.log(script);
                mode = script[2];

                console.log("Runtype: " + script[1] + " Mode: " + script[2] + " Script: " + script[0]);

                sim.stepSpeed = script[2] + 100;
                sim_p = cp.fork(__dirname + '/engine/sim_process.js', [script[0], script[1]], {execArgv: ['--debug-brk']});


                sim.split_script = script.toString().split("\n");
                var first_break = false;
                debug = new pDebug({

                    eventHandler: function (event) {
                        console.log('Event: ' + event.event + " seq: " + event.seq + " Script: "+event.body.script.name + " Line: " + event.body.sourceLine + " Column: " + event.body.sourceColumn + " Text: " + event.body.sourceLineText);


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

                            if (!first_break) {
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
                                        first_break = true;
                                        debug.send({command: 'continue'}, function () {
                                 
                                        });
                                    }
                                }

                                if (script[3]) {
                                    a();
                                } else {
                                    first_break = true;
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
                                } else {
                                    web.emit("brake", event.body);
                                    debug.send({
                                        "command": "scope",
                                        "arguments": {number: 1}
                                    }, function () {
                          
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
                        //console.log(data);
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
                    //console.log("next")
                    debug.send({command: 'continue'}, function () {
      
                    });
                });

                web.on("deb_step", function () {
                    //console.log("step")
                    debug.send({
                        command: 'continue',
                        arguments: {"stepaction": "next"}
                    }, function () {
     
                    });
                });


            });

        });


    }
}

