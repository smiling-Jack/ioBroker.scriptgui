/**
 * Created by Schorling on 07.10.2016.
 */



var io = require('socket.io')();
var path = require('path');
var fs = require('fs');


var cp = require('child_process');
var pDebug = require('../js/pDebug.js').pDebug;
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

function addScript(group) {
    group = group || 'script.js.common';
    // Find new unique name
    var newText = _('Script');
    var idx     = 1;
    var name    = newText + idx;

    while (that.main.objects[group + '.' + name]) {
        if (idx === '') idx = 0;
        idx++;
        name = newText + idx;
    }
    var instance = '';
    var engineType = '';

    // find first instance
    for (var i = 0; i < that.main.instances.length; i++) {
        if (that.main.objects[that.main.instances[i]] && that.main.objects[that.main.instances[i]] && that.main.objects[that.main.instances[i]].common.engineTypes) {
            instance = that.main.instances[i];
            if (typeof that.main.objects[main.instances[i]].common.engineTypes === 'string') {
                engineType = that.main.objects[that.main.instances[i]].common.engineTypes;
            } else {
                engineType = that.main.objects[that.main.instances[i]].common.engineTypes[0];
            }
            break;
        }
    }

    var id = group + '.' + name.replace(/[\s"']/g, '_');
    that.main.socket.emit('setObject', id, {
        common: {
            name:       name,
            engineType: engineType,
            source:     '',
            enabled:    false,
            engine:     instance
        },
        type: 'script'
    }, function (err) {
        if (err) {
            that.main.showError(err);
            that.init(true);
        } else {
            setTimeout(function () {
                that.$grid.selectId('show', id);
                editScript(id);
            }, 500);
        }
    });
}

module.exports = {

    debug: undefined,
    mode: undefined,


    intio: function () {
        io.listen(3000);
        io.on('connection', function (web) {
            console.log("connect");
            function l(data){
                web.emit("_log", data);
            };
            web.on("start", function (script) {
                //console.log(script);
                mode = script[2];

                console.log("Runtype: " + script[1] + " Mode: " + script[2] + " Script: " + script[0]);

                sim.stepSpeed = script[2] + 100;
                sim_p = cp.fork(__dirname +'/engine/sim_process.js', [script[0], script[1]], {execArgv: ['--debug-brk']});


                sim.split_script = script.toString().split("\n");

                var first_break = false;
                debug = new pDebug({

                    eventHandler: function (event) {
                        //console.log('Event: ' + event.event + " seq: " + event.seq + " Script: "+event.body.script.name + " Line: " + event.body.sourceLine + " Column: " + event.body.sourceColumn + " Text: " + event.body.sourceLineText);


                        if (event.event == "break") {
                            //console.log(event)
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
                            if(first_break && event.body.script.name != "s_engine.js" ){
                                console.log(event.body.script.name)
                                debug.send({
                                    command: 'continue',
                                    arguments: {"stepaction": "next"}
                                }, function (req, resp) {
                                });

                            }else if (!first_break) {
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
                                            }, function (req, resp) {
                                                console.log(resp)
                                                i++;
                                                a()
                                            });

                                        } else {
                                            i++;
                                            a()
                                        }

                                    } else {
                                        debug.send({command: 'continue'}, function (req, resp) {
                                            first_break = true;
                                        });
                                    }
                                }

                                a();
                            } else {
                                if (mode == "gui") {
                                    var debug_info = sim.split_script[event.body.sourceLine - 2].split("//")[1];
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
                                        "command":"scope",
                                        "arguments" : {number: 1}
                                    }, function (req, resp) {
                                        l(req);
                                        l(resp);
                                    });


                                }

                            }

                        }


                    }
                });


                debug.connect(function () {

                    console.log("Debugger connect")

                    debug.send({command: 'continue'}, function (req, resp) {});

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
                    debug.send({command: 'continue'}, function (req, resp) {
                    });
                });

                web.on("deb_step", function () {
                    //console.log("step")
                    debug.send({
                        command: 'continue',
                        arguments: {"stepaction": "next"}
                    }, function (req, resp) {
                    });
                });


            });

        });


    }
}

