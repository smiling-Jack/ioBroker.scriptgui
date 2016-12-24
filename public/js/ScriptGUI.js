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
var sim;
var engines;
var scripts;

var $dialogConfirm;


function _(data) {
    return data
}

var main = {
    objects: {},
    states: {},
    currentHost: '',
    instances: [],
    objectsLoaded: false,
    waitForRestart: false,
    selectId: null,
    watcher: {},
    initSelectId: function () {
        if (main.selectId) return main.selectId;
        main.selectId = $('#select_oid').selectId('init', {
            connCfg: {
                          socketUrl: socketUrl,
                          socketSession: socketSession,
                          socketName: 'scriptGUI',
                          upgrade: typeof socketForceWebSockets !== 'undefined' ? !socketForceWebSockets : undefined,
                          rememberUpgrade: typeof socketForceWebSockets !== 'undefined' ? socketForceWebSockets : undefined,
                          transports: typeof socketForceWebSockets !== 'undefined' ? (socketForceWebSockets ? ['websocket'] : undefined) : undefined
                      },
            noMultiselect: true,
            filter: {type: 'state'},
            name: 'admin-select-member',
            texts: {
                select: _('Select'),
                cancel: _('Cancel'),
                all: _('All'),
                id: _('ID'),
                name: _('Name'),
                role: _('Role'),
                room: _('Room'),
                value: _('Value'),
                selectid: _('Select ID'),
                from: _('From'),
                lc: _('Last changed'),
                ts: _('Time stamp'),
                wait: _('Processing...'),
                ack: _('Acknowledged')
            },
            columns: ['image', 'name', 'role', 'room', 'value']
        });
        return main.selectId;
    }
}

var SGI = {

    dev: false,
    //version: main_manifest.version,
    version: "0.8.3",

    HOST: '37.120.169.17',
    HOST_PORT: 3000,

    datePicker: false,
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

    log_nr: 0,

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
        if (parseInt(window.location.port) >= 60000) {
            SGI.local = true

        } else {
            $("#img_open_local").hide()
            $("#menu > li:nth-child(1)").hide()
        }


        $dialogConfirm = $("#dialogConfirm")

        $dialogConfirm.dialog({
            autoOpen: false,
            modal: true,
            width: 400,
            height: 200,
            buttons: [
                {
                    text: _('Ok'),
                    click: function () {
                        var cb = $(this).data('callback');
                        $(this).dialog('close');
                        if (cb) cb(true);
                    }
                },
                {
                    text: _('Cancel'),
                    click: function () {
                        var cb = $(this).data('callback');
                        $(this).dialog('close');
                        if (cb) cb(false);
                    }
                }

            ]
        });


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

        //setInterval(function () {
        //    if (sim.time_mode == "auto") {
        //        var d = new Date();
        //        $("#sim_date").val(('0' + d.getDate()).slice(-2) + "/" + ('0' + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear() + " " + ('0' + d.getHours()).slice(-2) + ':' + ('0' + (d.getMinutes())).slice(-2));
        //    }
        //},1000);
        var d = new Date();
        $("#sim_date").val(d.toLocaleDateString() + " " + d.toLocaleTimeString());

        $("#sim_date").datetimepicker({
            timeFormat: "HH:mm:ss",
            altFormat: "yy/dd/mm",
            dateFormat: "dd.mm.yy",
            beforeShow: function () {
                SGI.datePicker = true;
            },
            onClose: function (dateText) {
                var date = dateText.split(" ")[0].split(".")
                var time = dateText.split(" ")[1].split(":")
                SGI.datePicker = false;
                ;
                var d = new Date()
                d.setDate(date[0])
                d.setMonth(date[1] - 1)
                d.setFullYear(date[2])
                d.setHours(time[0] + d.getTimezoneOffset())
                d.setMinutes(time[1])
                d.setSeconds(time[2])

                sim.time_mode = "manual";
                sim.set_time(d.valueOf());
            }
        });


        $("#btn_sim_time_auto").button().click(function () {
            sim.time_mode = "auto";
            var d = new Date();
            $("#sim_date").val(d.toLocaleDateString() + " " + d.toLocaleTimeString());
            sim.set_time(d.valueOf());
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
                SGI.log_nr = 0
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
                    $("#right_panel").css({height: 'calc(100% - ' + (65 + 10) + 'px)'});
                } else {
                    $("#sim_log").css({height: "" + log_h + "px"});
                    $("#right_panel ").css({height: 'calc(100% - ' + (65 + log_h) + 'px)'});
                }
                SGI.setMain();
            })

            .drag("init", function () {
                start_h = $("#sim_log").height();
            })

            .drag("start", function (ev, dd) {

            })

            .drag(function (ev, dd) {
                if (start_h - dd.deltaY < 130) {
                    $("#sim_log").css({height: "130px"});
                    $("#right_panel").css({height: 'calc(100% - ' + (62 + 130) + 'px)'});
                    SGI.setMain();
                } else {
                    $("#sim_log").css({height: start_h - dd.deltaY + "px"});
                    SGI.setMain();
                }

            });

        if (scope.setup.LT_open == false) {
            $("#sim_log").css({
                height: "10px",
                "min-height": "10px"
            });
            $("#right_panel").css({height: 'calc(100% - ' + (58 + 10) + 'px)'});
            SGI.setMain();
        }


        $("#right_panel_head")
            .hover(
                function () {
                    $(this).addClass("ui-state-focus");
                }, function () {
                    $(this).removeClass("ui-state-focus");
                })
            .dblclick(function () {
                $(this).removeClass("ui-state-focus");
                if ($("#right_panel").width() > 13) {
                    $("#right_panel").css({
                        width: "10px",
                    });
                } else {
                    $("#right_panel").css({
                        width: "400px"
                    });
                }
                SGI.setMain();
            })


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

        $(window).resize(function () {
            SGI.set_Rightpanel()
        });
        SGI.set_Rightpanel();

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
            } else if (SGI.key == 83 && event.ctrlKey == true) {
                //SGI.save_Script();
                $("#img_save_local").trigger("click")
                return false;
            }
            else if (SGI.key == 68 && event.altKey == true) {
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
                backend.emit("next", function (err) {
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
            $("#m_file").val("neu");
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

    get_name: function (id) {
        var _name;
        if (id == undefined) {
            return ["Rechtsklick"];
        } else {
            if (main.objects[id] == undefined) {
                return "UNGÜLTIGE ID !!!";
            } else {

                try {
                    if (main.objects[id]["TypeName"] == "VARDP" || main.objects[id]["TypeName"] == "PROGRAM") {
                        _name = main.objects[id]["Name"].split(".").pop();

                    } else if (main.objects[id]["TypeName"].match(/ENUM/)) {
                        _name = SGI.translate(main.objects[id]["TypeName"].split("ENUM_")[1]) + " > " + main.objects[id]["Name"];
                    } else if (main.objects[id]["TypeName"] == "FAVORITE") {
                        _name = SGI.translate("FAVORITE") + " > " + main.objects[id]["Name"];
                    } else {
                        var parent = main.objects[id]["Parent"];
                        var parent_data = main.objects[parent];
                        _name = parent_data.Name + " > " + main.objects[id]["Name"].split(".").pop();
                    }
                    return [_name];
                } catch (err) {
                    return "UNGÜLTIGE ID !!!";
                }
            }
        }
    },

    confirmMessage: function (message, title, icon, buttons, callback) {
        //from Blufox
        if (typeof buttons === 'function') {
            callback = buttons;
            $dialogConfirm.dialog('option', 'buttons', [
                {
                    text: _('Ok'),
                    click: function () {
                        var cb = $(this).data('callback');
                        $(this).dialog('close');
                        if (cb) cb(true);
                    }
                },
                {
                    text: _('Cancel'),
                    click: function () {
                        var cb = $(this).data('callback');
                        $(this).dialog('close');
                        if (cb) cb(false);
                    }
                }

            ]);
        } else if (typeof buttons === 'object') {
            for (var b = 0; b < buttons.length; b++) {
                buttons[b] = {
                    text: buttons[b],
                    id: 'dialog-confirm-button-' + b,
                    click: function (e) {
                        var id = parseInt(e.currentTarget.id.substring('dialog-confirm-button-'.length), 10);
                        var cb = $(this).data('callback');
                        $(this).dialog('close');
                        if (cb) cb(id);
                    }
                }
            }
            $dialogConfirm.dialog('option', 'buttons', buttons);
        }

        $dialogConfirm.dialog('option', 'title', title || _('Message'));
        $('#dialog-confirm-text').html(message);
        if (icon) {
            $('#dialog-confirm-icon').show();
            $('#dialog-confirm-icon').attr('class', '');
            $('#dialog-confirm-icon').addClass('ui-icon ui-icon-' + icon);
        } else {
            $('#dialog-confirm-icon').hide();
        }
        $dialogConfirm.data('callback', callback);
        $dialogConfirm.dialog('open');
    },

    open: function (id) {

        main.currentId = id;
        if (main.objects[id].type == "script") {
            var script = main.objects[id]

            $("#wait_div").show();
            if (script) {
                if (script.common.engineType == "Blockly") {

                    SGI.show_blockly(function () {


                            scripts.blocklyWorkspace.clear();
                                try {
                                    var xml = scripts.jsCode2Blockly(script.common.source) || '<xml xmlns="http://www.w3.org/1999/xhtml"></xml>';
                                    var dom = Blockly.Xml.textToDom(xml);
                                    Blockly.Xml.domToWorkspace(dom, scripts.blocklyWorkspace);
                                } catch (e) {
                                    console.error(e);
                                    window.alert('Cannot extract Blockly code!');
                                }


                        }
                    )
                } else if (script.native && script.native.editor == "ScriptGUI") {

                    if (SGI.mode == "gui") {
                        SGI.clear();

                    } else {
                        SGI.show_gui();
                        SGI.clear();
                    }

                    SGI.load_prg(script);
                    scope.$apply();

                } else {
                    SGI.show_editor();
                    SGI.editor.setValue(script.common.source)
                    SGI.editor.navigateFileEnd()

                }
                SGI.file_name = script.common.name;
                main.currentId = id;

                $("#m_file").val(SGI.file_name)
                $("#m_engine").val(script.common.engine.replace("system.adapter.javascript.", ""))
            }


            $("#wait_div").hide();
        }
    },

    set_Rightpanel: function () {
        var h = $(window).height()
        $("#right_panel_head").css({
            width: h - 70 + "px",
            left: parseInt(h / -2) + 37 + "px",
            top: parseInt(h / 2) - 41 + "px"
        });
    },

    add_subscribe: function (data) {
        var _data = JSON.parse(data)
        var name = _data.pattern.id.replace(/\./g, "").replace(/\-/g, "")
        $('#toolbox_sim_param').append('<div style="width: 100%" class="subscriber"><button class="subscriber_btn" onclick="SGI.play_subscribe(\'' + _data.pattern.id + '\')"  id="btn_play_' + name + '"></button><span class="subscribe_pattern">' + _data.pattern.id + '</span><input style="width: 60px" id="ino_play_' + name + '" val="0"></div>');
        $("#btn_play_" + name).button()


    },

    play_subscribe: function (id) {
        backend.emit("play_subscribe", id)
    },

    log: function (type, data) {
        SGI.log_nr++;
        $("#sim_output").prepend("<tr id='log_nr" + SGI.log_nr + "'><td style='width: 100px'>" + sim.gettime_m() + "</td><td class='log_" + type + "'>" + type + ": " + data + "</td></tr>")

        if (SGI.log_nr >= 100) {
            $("#log_nr" + (SGI.log_nr - 100)).remove();
        }
    },

    setMain: function () {
        $(".main").css({height: 'calc(100% - ' + (61 + $('#sim_log').height()) + 'px)'});
        $(".main").css({width: 'calc(100% - ' + (3 + $('#right_panel').width()) + 'px)'});


    }


};


function error_box(data) {
    var _data = data.toString().split("\n").join("<br>").replace(/file:\/\/\//g, "").replace(/at HTMLDocument./g, "");

    var mail = "";


    $("body").append('\
                   <div id="dialog_info"  title="Info">\
                   <div class="ui-state-error">' + SGI.translate("Es ist ein Fehler aufgetreten") + '</div>\
                   <hr>\
                   <div class="err_text">' + _data + '</div>\
                   <hr>\
                   <span>' + SGI.translate("Die Folgenden angaben sind optional:") + '</span><br><br>\
                   <span style="width: 150px; display: inline-block">' + SGI.translate("E-Mail Adresse : ") + '</span><input id="inp_error_mail" value="' + mail + '" style="width: 317px; "type="email"/><br>\
                   <div style="display: flex; align-items: center"><span style="width: 150px ; display: inline-block">' + SGI.translate("Kommentar : ") + '</span><textarea id="txt_error_comment" style="width: 315px; height: 60px; max-width: 315px"></textarea></div>\
                   <br><br>\
                   <div style="text-align: center">\
                   <button id="btn_info_send" >' + SGI.translate("Senden") + '</button>\
                   <button style="margin-left: 20px" id="btn_info_close" >' + SGI.translate("Schliesen") + '</button>\
        </div>\
        </div>');

    $("#dialog_info").dialog({
        dialogClass: "error_box",
        maxWidth: "90%",
        width: "auto",
        close: function () {
            $("#dialog_info").remove();
        }
    });
    $("#btn_info_close").button().click(function () {
        $("#dialog_info").remove();
    });

    $("#btn_info_send").button().click(function () {

        var mail = $("#inp_error_mail").val();
        var komment = $("#txt_error_comment").val();

        var send_data = {
            subject: data.toString().split("\n")[0],
            text: data + "\n\nKommentar: " + komment + "\n\nE-mail: " + mail

        };
        console.log(send_data)
        $.get("http://37.120.169.17:3500/send", send_data, function (data) {
        });
        $("#dialog_info").remove();

    });
}


window.onerror = function (messageOrEvent, source, lineno, colno, error) {
    error_box(error.stack)
    return true
}

// Prototypes  todo make more

String.prototype.contains = function (it) {
    return this.indexOf(it) != -1;
};

