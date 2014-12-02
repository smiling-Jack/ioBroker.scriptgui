/**
 * Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 * Lizenz: [CC BY-NC 3.0](http://creativecommons.org/licenses/by-nc/3.0/de/)
 */


var cp = require('child_process');

var sim_p;

function start_sim_p(sim_script) {
    sim_p = cp.fork('./js/sim_process.js', [homematic,sim_script], {

        execArgv: ['--debug-brk'],
        silent: true
    });
    sim_p.on('close', function (code, signal) {
        console.log('close ' + code + "   " + signal);
    });
    sim_p.on('error', function (code, signal) {
        console.log('error ' + code + "   " + signal);
    });

    sim_p.on('exit', function (code, signal) {
        console.log('exit ' + code + "   " + signal);
        $("#prg_panel").find("select, input:not(.force_input)").each(function () {
            $(this).removeAttr('disabled');
        });
        $(".error_fbs").removeClass("error_fbs");

        $("#img_set_script_play").attr("src", "img/icon/play.png");

        $(".btn_min_trigger").unbind("click");
        $(document).unbind("new_data");

        $(".btn_min_trigger").attr("src", "img/icon/bullet_toggle_minus.png");
        $(".btn_min_trigger").css({
            height: "10px",
            top: 3,
            width: "10px"
        });


        $(".fbs, .mbs").show();
        SGI.sim_run = false
    });

    sim_p.on('message', function (data) {

        if (typeof data == 'string') {
            console.log("message: " + data);
        } else if (Array.isArray(data)) {
            if (data[0] == "logger") {
                sim.logger(data[1])
            } else if (data[0] == "log") {
                sim.log(data[1])
            } else if (data[0] == "simout") {
                sim.simout(data[1], data[2])
            }else if(data[0] == "script_err"){
                sim.script_err(data[1])
            }else if(data[0] == "running"){
                sim.running();
            }  else {

                console.log(data);

            }

        } else {
            console.log(data);
        }

    });
}


var sim = {
    run_type: "sim",
    script:"",
    script_err: function (err) {
        var real_script = js_beautify(Compiler.make_prg().toString());
        var _sim_script = sim.script.split(/\n/);
        var _real_script = real_script.split(/\n/)
        var sim_error_line_text = _sim_script[err.lineNumber - 1];
        var sim_error_line = _sim_script.indexOf(sim_error_line_text) + 1;
        var real_error_line = _real_script.indexOf(sim_error_line_text) + 1;


        for (var i = sim_error_line; i > 1; i--) {
            if (_sim_script[i].split("xxxxxxxxxxxxxxxxxxxx ").length > 1) {
                $("#" + _sim_script[i].split(" xxxxxxxxxxxxxxxxxxxx ")[1]).addClass("error_fbs");
                $("#" + _sim_script[i].split(" xxxxxxxxxxxxxxxxxxxx ")[1]).effect("bounce");
                i = 0;
            }
        }

        $("#sim_output").prepend("<tr><td  style='width: 100px'></td><td><b>Zeilentext:</b>" + sim_error_line_text + "</td></tr>");
        $("#sim_output").prepend("<tr><td  style='width: 100px'></td><td><b>Fehler in Zeile:</b> " + real_error_line + "</td></tr>");
        $("#sim_output").prepend("<tr><td  style='width: 100px'>" + sim.gettime_m() + "</td><td style='color: red'>" + err + "</td></tr>");
    },
    gettime: function () {

        var _time = new Date();
        var time = _time.toLocaleTimeString();
        return time
    },
    gettime_m: function () {

        var _time = new Date();
        var time = _time.toLocaleTimeString() + "." + _time.getMilliseconds();
        return time
    },
    simout: function (key, data) {

        var nr = key.split("_")[1];

        var codebox = $("#" + scope.fbs[nr]["parent"]).parent().attr("id");
        var cons = SGI.plumb_inst["inst_" + codebox].getConnections({source: key, scope: "*"});


        if (cons.length < 1) {
            cons = SGI.plumb_inst.inst_mbs.getConnections({source: key})
        }
        if (cons.length < 1) {
            cons = SGI.plumb_inst["inst_" + codebox].getConnections({source: key, scope: "liste_ch"});
        }
        if (cons.length < 1) {
            cons = SGI.plumb_inst["inst_" + codebox].getConnections({source: key, scope: "liste_dp"});
        }
        if (cons.length < 1) {
            cons = SGI.plumb_inst["inst_" + codebox].getConnections({source: key, scope: "liste_var"});
        }
        if (cons.length < 1) {
            cons = SGI.plumb_inst["inst_" + codebox].getConnections({source: key, scope: "expert"});
        }

        if (data == "run") {

            data = "Start um \n" + sim.gettime()
        } else if ($.isArray(data)) {
            var _data = "";
            $.each(data, function () {
                _data += this + "\n";
            });
            data = _data
        }

        $.each(cons, function () {
            var id = this.id;
            this.removeOverlay("sim");
            this.addOverlay(
                ["Custom", {
                    create: function () {
                        return $('<div>\
                    <p id="overlay_' + id + '" class="sim_overlay ui-corner-all">' + data + '</p>\
                    </div>');
                    },
                    id: "sim"
                }]
            );

            $("#overlay_" + id)
                .mouseenter(function () {
                    $(this).addClass("overlay_expand")
                        .parent().css({"z-index": 2000});
                })
                .mouseleave(function () {
                    $(this).removeClass("overlay_expand")
                        .parent().css({"z-index": 1000});
                });
        });
    },
    log: function (data) {
        $("#sim_output").prepend("<tr><td style='width: 100px'>" + sim.gettime_m() + "</td><td>" + data + "</td></tr>");
    },
    step_fbs_highlight: function (id) {
        $(id).find(".fbs_shadow").effect("highlight", {color: "green"}, 800);
    },
    logger: function (data) {
        console.log("logger-------------------------------");
        console.log(data);
        console.log("logger-------------------------------");
    },
    stopsim: function () {
        if (SGI.sim_run == true) {
            $('#play_overlay').remove();

            $("#img_set_script_stop").stop(true, true).effect({
                effect: "highlight",
                complete: function () {
                    $("*").finish();

                    $.each($("#sim_output").children(), function () {
                        $(this).remove();
                    });
                    $.each(SGI.plumb_inst, function () {

                        var con = this.getAllConnections();

                        $.each(con, function () {
                            this.removeOverlay("sim")
                        });
                    });
                    sim_p.send(["exit"])
                }
            });


        }

    },
    running: function(){
        SGI.sim_run = true;
        var scope = angular.element($('body')).scope();
        var that = this;
        $(".fbs, .mbs").hide();
        $("#img_set_script_play").attr("src", "img/icon/playing.png");
        $(".btn_min_trigger").attr("src", "img/icon/start.png");
        $(".btn_min_trigger").css({
            height: "15px",
            top: 0,
            width: "15px"
        });

        $("#prg_panel").find("select,button, input:not(.force_input)").each(function () {
            $(this).attr({
                'disabled': 'disabled'
            });
        });
        $(".btn_min_trigger").bind("click", function () {
            if (SGI.sim_run) {

                var trigger = $(this).parent().parent().attr("id");
                $.each(PRG.struck.trigger, function () {
                    if (this.mbs_id == trigger) {
                        $.each(this.target, function () {
                            sim_p.send(["trigger", this + "(" + JSON.stringify(SGI.start_data.valueOf()) + ")"]);
                        });
                        return false
                    }
                })
            }
        });
        $(document).css('cursor', 'pointer' );
    },
    simulate: function () {
        if (!SGI.sim_run) {


            try {

                sim.script = js_beautify(Compiler.make_prg(sim.run_type).toString());
                start_sim_p(sim.script);
                $(document).bind("new_data", function (event, data) {
                    if(SGI.sim_run){
                        sim_p.send(["new_data",data]);
                        console.log(data)
                    }

                });
            }
            catch (err) {
                var err_text = "";

                if (err == "TypeError: this.output[0] is undefined") {
                    err_text = " <b style='color: red'>Error:</b> Offenen Ausgang gefunden"
                } else if (err == "TypeError: this.input[0] is undefined") {
                    err_text = " <b style='color: red'>Error:</b> Offenen Eingang gefunden"
                } else {
                    err_text = err
                }

                $("#sim_output").prepend("<tr><td  style='width: 100px'>" + sim.gettime_m() + "</td><td>" + err_text + "</td></tr>");

                $("#" + Compiler.last_fbs).addClass("error_fbs");
                $("#" + Compiler.last_fbs).effect("bounce");
            }







        }
    }
};








