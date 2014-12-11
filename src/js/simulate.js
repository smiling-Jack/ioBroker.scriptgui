/**
 * Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 * Lizenz: [CC BY-NC 3.0](http://creativecommons.org/licenses/by-nc/3.0/de/)
 */


var cp = require('child_process');
var stacktrace = require('stack-trace');

var sim_p;

function sim_exit(){
    console.log("exit")
    $('#play_overlay').remove();
    $("#prg_panel").find("select, input:not(.force_input)").each(function () {
        $(this).removeAttr('disabled');
    });


    $("#prg_body").css("border-color","transparent")

    $(".btn_min_trigger").unbind("click");
    $(document).unbind("new_data");
    $('.force_input').unbind("change");

    $(".btn_min_trigger").attr("src", "img/icon/bullet_toggle_minus.png");
    $(".btn_min_trigger").css({
        height: "10px",
        top: 3,
        width: "10px"
    });


    $("#toolbox_sim_param").hide();
    SGI.sim_run = false
}

function start_sim_p() {
    sim_p = cp.fork('./js/sim_process.js', [sim.script, sim.run_type]);
    sim_p.on('close', function (code, signal) {
        console.log('close ' + code + "   " + signal);
    });
    sim_p.on('error', function (code, signal) {
        console.log('error ' + code + "   " + signal);
    });
    sim_p.on('exit', function (code, signal) {
        console.log('exit ' + code + "   " + signal);

sim_exit()

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
            }else if(data[0] == "trigger_highlight"){
                sim.trigger_highlight(data[1]);
            }else if(data[0] == "step_fbs_highlight"){
                sim.step_fbs_highlight(data[1]);
            }else if(data[0] == "step_mbs_highlight_in"){
                sim.step_mbs_highlight_in(data[1]);
            }else if(data[0] == "step_mbs_highlight_out"){
                sim.step_mbs_highlight_out(data[1]);
            }else if(data[0] == "step_mbs_highlight_reset"){
                sim.step_mbs_highlight_reset(data[1]);
            }  else {
                sim.script_err(data)
            }
        } else {
            console.log(data);
        }
    });
    sim_p.send(["home", homematic])
}

var sim = {
    run_type: "sim",
    time_mode : "auto",
    time:"",
    step: "false",
    script:"",
    script_err: function (err) {

        console.log(err)

        try{
            sim_p.send(["exit"])
        }
       catch (e){}


        var line_number;

        //if(err.split(":")[0] == "s_engine"){
        //line_number = parseInt(err.split(":")[1].split("=")[0]);
        //
        //}else{
        //line_number = parseInt(err.split("s_engine:")[1].split(":")[0]);
        //}



        var real_script = js_beautify(Compiler.make_prg().toString());
        var _sim_script = sim.script.split(/\n/);
        var _real_script = real_script.split(/\n/)
        var sim_error_line_text = _sim_script[line_number];
        var sim_error_line = _sim_script.indexOf(sim_error_line_text);
        var real_error_line = _real_script.indexOf(sim_error_line_text);
        var real_error_line_text = _real_script[real_error_line-1];

        console.log(sim_error_line)

        for (var i = sim_error_line; i > 1; i--) {
            if (_sim_script[i].split("xxxxxxxxxxxxxxxxxxxx ").length > 1) {
                $("#" + _sim_script[i].split(" xxxxxxxxxxxxxxxxxxxx ")[1]).addClass("error_fbs");
                $("#" + _sim_script[i].split(" xxxxxxxxxxxxxxxxxxxx ")[1]).effect("bounce");
                i = 0;

            }
        }



        $("#sim_output").prepend("<tr><td  style='width: 100px'></td><td style='color: red'>" + err + "</td></tr>");
        $("#sim_output").prepend("<tr><td  style='width: 100px'></td><td><b>Fehler in Zeile:</b> " + real_error_line + "</td></tr>");
        $("#sim_output").prepend("<tr><td  style='width: 100px'>" + sim.gettime_m() + "</td><td><b>Zeilentext:</b>" + real_error_line_text + "</td></tr>");

//       sim.stopsim()

    },
    set_time: function(time){
        sim_p.send(["time",sim.time_mode,time])
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

        //$("#"+key.replace("_out","")).stop().animate({boxShadow: '0 0 30px #f00'},400).animate({boxShadow: '0 0 0px transparent'},400);
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


        function add_overlay (_this, data, id){

            _this.addOverlay(
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
                    $(_this).addClass("overlay_expand")
                        .parent().css({"z-index": 2000});
                })
                .mouseleave(function () {
                    $(_this).removeClass("overlay_expand")
                        .parent().css({"z-index": 1000});
                });
        }


        $.each(cons, function () {
            var id = this.id;
            this.removeOverlay("sim");
            var _this = this
            if(sim.step == "true"){
                setTimeout(function(){
                    add_overlay(_this, data, id)
                },500);

            }else{
                add_overlay(_this, data, id)
            }

        });
    },
    log: function (data) {
        $("#sim_output").prepend("<tr><td style='width: 100px'>" + sim.gettime_m() + "</td><td>" + data + "</td></tr>");
    },
    trigger_highlight: function (id) {
        console.log(id)
        $("#"+id).stop().animate({boxShadow: '0 0 30px 10px #0f0'},400).animate({boxShadow: '0 0 0px 0px transparent'},400);
    },
    step_fbs_highlight: function (id) {
        console.log(id)
        $("#"+id).stop().animate({boxShadow: '0 0 30px 10px #f00'},400).animate({boxShadow: '0 0 0px 0px transparent'},400);
    },
    step_mbs_highlight_in: function (id) {
        console.log(id)
        $("#"+id).stop().animate({boxShadow: '0 0 30px 10px #00f'},300).animate({boxShadow: '0 0 0px 0px transparent'},300);
    },
    step_mbs_highlight_out: function (id) {
        console.log(id)
        $("#"+id).stop().animate({boxShadow: '0 0 30px 10px #f00'},300).animate({boxShadow: '0 0 0px 0px transparent'},300);
    },
    step_mbs_highlight_reset: function (id) {
        console.log(id)
        $("#"+id).stop().animate({boxShadow: '0 0 30px 10px #ff0'},400).animate({boxShadow: '0 0 0px 0px transparent'},400);
    },
    logger: function (data) {
        console.log("logger-------------------------------");
        console.log(data);
        console.log("logger-------------------------------");
    },
    stopsim: function () {
        $(".error_fbs").removeClass("error_fbs");
        if (SGI.sim_run == true) {


            $("#img_set_script_stop").stop(true, true).effect({
                effect: "highlight",
                complete: function () {
                    $("*").finish();

                }
            });
            sim_p.send(["exit"]);
        }
    },
    running: function(){
        console.log("running")
        SGI.sim_run = true;
        var scope = angular.element($('body')).scope();
        var that = this;


        $("#toolbox_sim_param").show();


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

    },

    simulate: function () {
        if (!SGI.sim_run) {
            try {
                sim.script = js_beautify(Compiler.make_prg(sim.run_type,sim.step).toString());
                start_sim_p();

                $(document).bind("new_data", function (event, data) {
                    if(SGI.sim_run){
                        sim_p.send(["new_data",data])
                    }
                });
            }
            catch (err) {
                var err_text = "";

                if (err.message == "Cannot read property 'ausgang' of undefined") {
                    err_text = " <b style='color: red'>Error:</b> Offenen Ausgang gefunden"
                } else if (err.message == "Cannot read property 'herkunft' of undefined") {
                    err_text = " <b style='color: red'>Error:</b> Offenen Eingang gefunden"
                } else {
                    err_text = err.message
                }

                //sim.script_err(err.stack)
                console.log(err)
                $("#sim_output").prepend("<tr><td  style='width: 100px'>" + sim.gettime_m() + "</td><td>" + err_text + "</td></tr>");
//                $("#sim_output").prepend("<tr><td  style='width: 100px'></td><td style='color: red'>" + err + "</td></tr>");
//                $("#sim_output").prepend("<tr><td  style='width: 100px'></td><td><b>Fehler in Zeile:</b> " + real_error_line + "</td></tr>");
//                $("#sim_output").prepend("<tr><td  style='width: 100px'>" + sim.gettime_m() + "</td><td><b>Zeilentext:</b>" + real_error_line_text + "</td></tr>");

                $("#" + Compiler.last_fbs).addClass("error_fbs");
                $("#" + Compiler.last_fbs).effect("bounce");
                sim_exit()
            }
        }
    }
};



$(document).on("change",'.force_input',function (e) {
    var x = $(e.target).data("info").toString();
    var force = $(e.target).val();
    if (SGI.sim_run) {
        sim_p.send(["force", force, x])
    }
});




