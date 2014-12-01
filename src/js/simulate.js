/**
 * Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 * Lizenz: [CC BY-NC 3.0](http://creativecommons.org/licenses/by-nc/3.0/de/)
 */


var  cp = require('child_process');

var sim_p = cp.fork('./js/sim_process.js',[],{

    execArgv: ['--debug-brk'],
    silent:true
});



sim_p.on('close', function (code, signal) {
    console.log('close '+code+ "   "+signal);
});
sim_p.on('error', function (code, signal) {
    console.log('error '+code+ "   "+signal);
});

sim_p.on('exit', function (code, signal) {
    console.log('exit '+code+ "   "+signal);
});

sim_p.on('message', function (data) {

    if(typeof data == 'string'){
        console.log(data);
    }else if(Array.isArray(data)){
        console.log('sim.'+data[0]+'('+data[1]+','+data[2]+','+data[3]+')');
        eval('sim.'+data[0]+'('+data[1]+','+data[2]+','+data[3]+')')
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

}








