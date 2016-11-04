/**
 * Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 * Lizenz: [CC BY-NC 3.0](http://creativecommons.org/licenses/by-nc/3.0/de/)
 */

var start_win;
var bausteine;
var scope;
var Range = ace.require("ace/range").Range
var PRG = {
    struck: {
        codebox: {},
        trigger: [],
        control: []
    }
};

var systemLang
var SGI;
var sim;
SGI = {

    dev: false,
    //version: main_manifest.version,
    version: 0,

    HOST: '37.120.169.17',
    HOST_PORT: 3000,

    //os: "win",
    copy_data: [],
    socket: {},
    con_files: [],
    con_data: false,
    settings: {},
    zoom: 1,
    theme: "",
    fbs_n: 0,
    mbs_n: 0,
    scope_init: {},
    experts: {},
    grid: 9,

    gui_rendered: false,
    editor_rendered: false,
    blockly_rendered: false,


    drop_block: false,
    sim_run: false,
    file_name: "",
    key: "",
    plumb_inst: {
        inst_mbs: undefined
    },

    start_data: {
        id: 0,
        name: "Sim_Data",
        newState: {
            value: 0,
            timestamp: 0,
            ack: 0,
            lastchange: 0
        },
        oldState: {
            value: 0,
            timestamp: 0,
            ack: 0,
            lastchange: 0
        },
        channel: {
            id: 0,
            name: "Sim_Data",
            type: "Sim_Data",
            funcIds: "Sim_Data",
            roomIds: "Sim_Data",
            funcNames: "Sim_Data",
            roomNames: "Sim_Data"
        },
        device: {
            id: 0,
            name: "Sim_Data",
            type: "Sim_Data"
        }
    },

    Setup: function () {

        //SGI.dev = true;

        $.ajax({
            'async': false,
            'global': false,
            'url': "./js/bausteine.json",
            'dataType': "json",
            'success': function (data) {
                bausteine = data;
            }
        });

        scope = angular.element($('body')).scope();
        scope.$apply();


        // Setze Sprache XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        SGI.language = scope.setup.lang;


        // translate XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        $.each($(".translate"), function () {
            var $this = this;
            $($this).text(SGI.translate($($this).text()))

        });
        $.each($(".title_translate"), function () {
            var $this = this;
            $($this).attr("title", (SGI.translate($($this).attr("title"))))

        });

        // Sim Date  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        ////var rule = new schedule.RecurrenceRule();
        //rule.second = 0;
        //schedule.scheduleJob(rule, function () {
        //    if (sim.time_mode == "auto") {
        //        var d = new Date();
        //        $("#sim_date").val(('0' + d.getDate()).slice(-2) + "/" + ('0' + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear() + " " + ('0' + d.getHours()).slice(-2) + ':' + ('0' + (d.getMinutes())).slice(-2));
        //    }
        //});
        //var d = new Date();
        //$("#sim_date").val(('0' + d.getDate()).slice(-2) + "/" + ('0' + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear() + " " + ('0' + d.getHours()).slice(-2) + ':' + ('0' + (d.getMinutes())).slice(-2));

        $("#sim_date").datetimepicker({
            timeFormat: "HH:mm",
            altFormat: "dd/mm/yy",
            dateFormat: "dd/mm/yy"

        });

        $("#sim_date").change(function () {
            sim.time_mode = "manual";
            sim.set_time($("#sim_date").val());
        });

        $("#btn_sim_time_auto").button().click(function () {
            sim.time_mode = "auto";
            var d = new Date();
            $("#sim_date").val(('0' + d.getDate()).slice(-2) + "/" + ('0' + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear() + " " + ('0' + d.getHours()).slice(-2) + ':' + ('0' + (d.getMinutes())).slice(-2));
            sim_p.send(["time", sim.time_mode])
        });

        // Minimap XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        // todo Später mal
        //setInterval(function () {
        //
        //    $("#minimap_cont").empty();
        //    var prev = $("#prg_panel").html().toString();
        //
        //    prev = prev.replace(/(ng-model="|ng-style=")[A-Za-z0-9\[\].]+"/g, "")
        //        .replace(/(id=")[A-Za-z0-9\[\]._]+"/g, "")
        //        .replace(/(<svg)[/\s/\S]+?(svg>)/g, "")
        //        .replace(/(<a)[/\s/\S]+?(a>)/g, "")
        //        .replace(/(<input)[/\s/\S]+?(\/>)/g, "")
        //        .replace(/(<div class="_jsPlumb_endpoint)[/\s/\S]+?(<\/div>)/g, "")
        //        .replace(/(ng-)[A-Za-z0-9\[\].]+/g, "")
        //        .replace(/(mbs_shadow)/g, "")
        //        .replace(/(fbs_shadow)/g, "")
        //        .replace(/(_jsPlumb_endpoint_anchor_|jsplumb-draggable|jsplumb-droppable)/g, "");
        //
        //
        //    $("#minimap_cont").append(prev);
        //
        //}, 1000);


        // Live Test XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        $("#clear_force").button()
            .click(function () {
                $(this).removeClass("ui-state-focus");
                SGI.del_all_force();
            });

        $("#clear_log").button()
            .click(function () {
                $("#sim_output").children().remove();
                $("#sim_output").prepend("<tr><td style='width: 100px'>Script Log</td><td></td></tr>");
            });


        var start_h;
        var log_h = 130;
        $("#sim_log_head")
            .hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            })
            .dblclick(function () {

                if ($("#sim_log").height() > 129) {
                    log_h = $("#sim_log").height();

                    $("#sim_log").css({
                        height: "10px",
                        "min-height": "10px"
                    });
                    $(".main").css({height: 'calc(100% - ' + (58 + 10) + 'px)'});
                } else {
                    $("#sim_log").css({height: "" + log_h + "px"});
                    $(".main").css({height: 'calc(100% - ' + (58 + log_h) + 'px)'});
                }
            })

            .drag("init", function () {
                start_h = $("#sim_log").height();
            })

            .drag("start", function (ev, dd) {

            })

            .drag(function (ev, dd) {
                if (start_h - dd.deltaY < 130) {
                    $("#sim_log").css({height: "130px"});
                    $(".main").css({height: 'calc(100% - ' + (58 + 130) + 'px)'});
                } else {
                    $("#sim_log").css({height: start_h - dd.deltaY + "px"});
                    $(".main").css({height: 'calc(100% - ' + (58 + start_h - dd.deltaY) + 'px)'});
                }

            });

        if (scope.setup.LT_open == false) {
            $("#sim_log").css({
                height: "10px",
                "min-height": "10px"
            });
            $(".main").css({height: 'calc(100% - ' + (58 + 10) + 'px)'});
        }


        //if (scope.setup.mode == "gui") {
        //    SGI.load_gui();
        //    SGI.show_gui();
        //
        //} else {
        //    SGI.load_editor();
        //    SGI.show_editor();
        //}

        //

        SGI.menu_iconbar();
        SGI.context_menu();
        SGI.quick_help();
        SGI.setup_socket();
        SGI.global_event();
        //SGI.check_fs(function () {
        //    //SGI.read_experts();
        //    //SGI.make_conpanel();
        //});


        //  Setup XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        $("#setup_dialog").dialog({
            modal: false,
            width: 600,
            maxWidth: "80%",
            height: 400,
            maxHeight: "80%",
            autoOpen: false,
            open: function () {
                SGI.Setup_dialog()
            },
            close: function () {
                scope.$apply();
                SGI.save_setup();
            }
        });

        scope.save_scope_watchers();

        SGI.connect_backend()

        $("body").css({
            "visibility": "visible"
        })
        console.log("Start finish");
        // Auto Connect
        //if (scope.setup.auto_con) {
        //    if (scope.setup.con_type == "connect_backend") {
        //        SGI.connect_backend(scope.setup.last_con)
        //    }
        //    if (scope.setup.con_type == "offline") {
        //        SGI.offline(scope.setup.last_con)
        //    }
        //
        //}

    },

    global_event: function () {
        $('#body').on('click', function (event) {
            if ($(event.target).hasClass("prg_panel")) {
                $(".codebox_active").removeClass("codebox_active");
            }
            if (!$(event.target).hasClass("dot") && $(event.target).parent().prop("tagName") != "svg") {
                $(".dot").remove();
            }
        });

        //todo umstellung auf node-webkit shortcuts
        // | backspace 	 8    |   e 	            69   |    numpad 8          104
        // | tab 	     9    |   f 	            70   |    numpad 9          105
        // | enter 	     13   |   g 	            71   |    multiply          106
        // | shift 	     16   |   h 	            72   |    add           	107
        // | ctrl 	     17   |   i 	            73   |    subtract          109
        // | alt 	     18   |   j 	            74   |    decimal point     110
        // | pause/break 19   |   k 	            75   |    divide            111
        // | caps lock 	 20   |   l 	            76   |    f1            	112
        // | escape 	 27   |   m 	            77   |    f2            	113
        // | page up 	 33   |   n 	            78   |    f3            	114
        // | page down 	 34   |   o 	            79   |    f4            	115
        // | end 	     35   |   p 	            80   |    f5            	116
        // | home 	     36   |   q 	            81   |    f6            	117
        // | left arrow  37   |   r 	            82   |    f7            	118
        // | up arrow 	 38   |   s 	            83   |    f8            	119
        // | right arrow 39   |   t	                84   |    f9            	120
        // | down arrow  40   |   u 	            85   |    f10           	121
        // | insert 	 45   |   v 	            86   |    f11           	122
        // | delete 	 46   |   w 	            87   |    f12           	123
        // | 0 	         48   |   x 	            88   |    num lock          144
        // | 1 	         49   |   y 	            89   |    scroll lock      	145
        // | 2 	         50   |   z 	            90   |    semi-colon       	186
        // | 3 	         51   |   left window key   91   |    equal sign       	187
        // | 4 	         52   |   right window key  92   |    comma             188
        // | 5 	         53   |   select key 	    93   |    dash          	189
        // | 6 	         54   |   numpad 0 	        96   |    period            190
        // | 7 	         55   |   numpad 1 	        97   |    forward slash     191
        // | 8 	         56   |   numpad 2 	        98   |    grave accent      192
        // | 9 	         57   |   numpad 3 	        99   |    open bracket      219
        // | a 	         65   |   numpad 4 	        100  |    back slash        220
        // | b 	         66   |   numpad 5 	        101  |    close braket      221
        // | c 	         67   |   numpad 6 	        102  |    single quote 	    222
        // | d 	         68   |   numpad 7 	        103  |

        $(document).keydown(function (event) {
            SGI.key = event.keyCode;

            if (SGI.key == 46 && SGI.mode == "gui") {
                SGI.del_selected()
            } else if (SGI.key == 67 && event.ctrlKey == true && SGI.mode == "gui") {
                SGI.copy_selected();
                $("body").css({cursor: "default"});
            } else if (SGI.key == 86 && event.ctrlKey == true && SGI.mode == "gui") {
                SGI.paste_selected();
                $("body").css({cursor: "default"});
            } else if (SGI.key == 68 && event.altKey == true) {
                $("#develop_menu").show()
            } else if (SGI.key == 89 && event.altKey == true) {
                //main_win.showDevTools();
            } else if (SGI.key == 88 && event.altKey == true) {
////                main_win.close();
//                main_win.reload();
            } else if (SGI.key == 70 && event.altKey == true) {
                var test = test_fehler;
            } else if ((SGI.key == 17 || SGI.key == 91 || SGI.key == 93 || event.ctrlKey == true) && SGI.mode == "gui") {
                $("body").css({cursor: "help"});
                SGI.key = 17;
            } else if (SGI.key == 81 && event.altKey == true) {
                SGI.backend.emit("next", function (err) {
                    console.log(err)

                });

            }
        });

        $(document).on('click', ".fbs_element", function (target) {
            if (SGI.key == 16) {
                if ($(this).hasClass("fbs_element")) {

                    if ($(this).hasClass("jsplumb-drag-selected")) {
                        SGI.plumb_inst["inst_" + $(this).parent().parent().attr("id")].removeFromDragSelection($(this));
                    } else {
                        SGI.plumb_inst["inst_" + $(this).parent().parent().attr("id")].addToDragSelection($(this));
                    }

                } else {
                    $.each($(target.target).parents(), function () {

                        if ($(this).hasClass("fbs_element")) {
                            if ($(this).hasClass("jsplumb-drag-selected")) {
                                SGI.plumb_inst["inst_" + $(this).parent().parent().attr("id")].removeFromDragSelection($(this));
                            } else {
                                SGI.plumb_inst["inst_" + $(this).parent().parent().attr("id")].addToDragSelection($(this));
                            }
                        }

                    });
                }
            }
        });


        $(document).on('click', ".mbs_element", function (target) {
            if (SGI.key == 16) {
                if ($(this).hasClass("mbs_element")) {
                    if ($(this).hasClass("jsplumb-drag-selected")) {
                        SGI.plumb_inst.inst_mbs.removeFromDragSelection($(this));
                    } else {
                        SGI.plumb_inst.inst_mbs.addToDragSelection($(this));
                    }
                } else {
                    $.each($(target.target).parents(), function () {

                        if ($(this).hasClass("mbs_element")) {
                            if ($(this).hasClass("jsplumb-drag-selected")) {
                                SGI.plumb_inst.inst_mbs.removeFromDragSelection($(this));
                            } else {
                                SGI.plumb_inst.inst_mbs.addToDragSelection($(this));
                            }
                        }
                    });
                }
            }
        });

        $(document).keyup(function () {
            if (SGI.key == 17) {
                $("body").css({cursor: "default"});
            }
            SGI.key = "";
        });

    },

    save_setup: function () {
        localStorage.setup = JSON.stringify(scope.setup)
    },

    clear: function () {
        if (SGI.mode == "gui") {
            SGI.plumb_inst.inst_mbs.cleanupListeners();
//    SGI.plumb_inst.inst_mbs.reset();
//        SGI.plumb_inst.inst_fbs.reset();
            $("#prg_panel").children().remove();
            SGI.mbs_n = 0;
            SGI.fbs_n = 0;
            $("#m_file").text("neu");
            SGI.file_name = "";

            PRG = {
                struck: {
                    codebox: {},
                    trigger: [],
                    control: []
                }
            };
            scope.mbs = {};
            scope.fbs = {};
            scope.con = {
                mbs: {},
                fbs: {}
            };

            scope.reset_scope_watchers();
            scope.$apply();
            SGI.mbs_inst();
        } else if (SGI.mode == "blockly") {

        } else if (SGI.mode == "editor") {
            SGI.editor.setValue("")
        }


        $("#sim_output").children().remove();
        $("#sim_output").prepend("<tr><td style='width: 100px'>Script Log</td><td></td></tr>");
    },

    get_name: function (hmid) {
        var _name;
        if (hmid == undefined) {
            return ["Rechtsklick"];
        } else {
            if (homematic.regaObjects[hmid] == undefined) {
                return "UNGÜLTIGE ID !!!";
            } else {

                try {
                    if (homematic.regaObjects[hmid]["TypeName"] == "VARDP" || homematic.regaObjects[hmid]["TypeName"] == "PROGRAM") {
                        _name = homematic.regaObjects[hmid]["Name"].split(".").pop();

                    } else if (homematic.regaObjects[hmid]["TypeName"].match(/ENUM/)) {
                        _name = SGI.translate(homematic.regaObjects[hmid]["TypeName"].split("ENUM_")[1]) + " > " + homematic.regaObjects[hmid]["Name"];
                    } else if (homematic.regaObjects[hmid]["TypeName"] == "FAVORITE") {
                        _name = SGI.translate("FAVORITE") + " > " + homematic.regaObjects[hmid]["Name"];
                    } else {
                        var parent = homematic.regaObjects[hmid]["Parent"];
                        var parent_data = homematic.regaObjects[parent];
                        _name = parent_data.Name + " > " + homematic.regaObjects[hmid]["Name"].split(".").pop();
                    }
                    return [_name];
                } catch (err) {
                    return "UNGÜLTIGE ID !!!";
                }
            }
        }
    },

    get_id_by_name: function (name) {
        var id = 0;
        $.each(homematic.regaObjects, function (key) {

            if (key > 99999) {
                if (this.Name == name) {
                    id = key;
                    return false
                }
            }
        });
        return id
    },

    get_lowest_obj_id: function (name, cb) {

        if (SGI.con_data) {
            var last_id = 100000;
            var id_by_name = SGI.get_id_by_name(name);
            if (id_by_name == 0) {
                $.each(Object.keys(homematic.regaObjects).sort(), function () {

                    var id = parseInt(this);
                    if (id > 99999) {
                        if (id == last_id) {
                            last_id++;
                        } else {
                            return false
                        }
                    }
                });
                return cb(last_id)

            } else {
                return cb(id_by_name)
            }
        } else {
            return cb("undefined")
        }
    },

};


// Prototypes  todo make more

String.prototype.contains = function (it) {
    return this.indexOf(it) != -1;
};

