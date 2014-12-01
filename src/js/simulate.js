/**
 * Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 * Lizenz: [CC BY-NC 3.0](http://creativecommons.org/licenses/by-nc/3.0/de/)
 */


var cp = require('child_process');

var sim_p = cp.fork('./js/sim_process.js', [], {

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
});

sim_p.on('message', function (data) {

    if (typeof data == 'string') {
        console.log(data);
    } else if (Array.isArray(data)) {
        console.log('sim.' + data[0] + '(' + data[1] + ',' + data[2] + ',' + data[3] + ')');
        eval('sim.' + data[0] + '(' + data[1] + ',' + data[2] + ',' + data[3] + ')')
    }

});


var sim = {
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
//----------------------------------------------------------------------------------------------------------------------
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
        process.send(["step_fbs_highlight", id]);
        $(id).find(".fbs_shadow").effect("highlight", {color: "green"}, 800);
    },


    simulate: function (target) {
        if (!SGI.sim_run) {
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

            try {

                var sim_script = js_beautify(Compiler.make_prg(sim.run_type).toString());
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


            sim_p.send(["run",sim_script,homematic])

        }

    };








