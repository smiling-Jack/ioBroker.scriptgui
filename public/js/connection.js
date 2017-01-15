/**
 * Created by jack on 17.08.2014.
 */

var web;
var backend;
var $newGroupDialog;
var groups = {'script.js': 'script.js', 'script.js.common': 'script.js.common', 'script.js.global': 'script.js.global'};
var open_timeout;
var list;
var oid_dialog
jQuery.extend(true, SGI, {


    connect_backend: function (__url) {
        // if (!$.fn.selectId) {
        //     $("head").append('<script type="text/javascript" src="js/lib/socket.io_10.js"></script>');
        // }
        $("#img_con_backend").attr("src", "img/icon/flag-blue.png");





      // $('#select_oid').selectId('init', {
      //       filter: {
      //           _id: "javascript"
      //       },
      //       noMultiselect: true,
      //       connCfg: {
      //           socketUrl: socketUrl,
      //           socketSession: socketSession,
      //           socketName: 'scriptGUI',
      //           upgrade: typeof socketForceWebSockets !== 'undefined' ? !socketForceWebSockets : undefined,
      //           rememberUpgrade: typeof socketForceWebSockets !== 'undefined' ? socketForceWebSockets : undefined,
      //           transports: typeof socketForceWebSockets !== 'undefined' ? (socketForceWebSockets ? ['websocket'] : undefined) : undefined
      //       },
      //       columns: ['name', 'role', 'room', 'value'],
      //       texts: {
      //           select: ('Select'),
      //           cancel: ('Cancel'),
      //           all: ('All'),
      //           id: ('ID'),
      //           name: ('Name'),
      //           role: ('Role'),
      //           room: ('Room'),
      //           value: ('Value'),
      //           selectid: ('Select ID'),
      //           from: ('From'),
      //           lc: ('Last changed'),
      //           ts: ('Time stamp'),
      //           wait: ('Processing...'),
      //           ack: ('Acknowledged')
      //       }
      //   });

        backend = io.connect(socketUrl, {
            query: 'key=' + socketSession,
            'reconnection limit': 10000,
            'max reconnection attempts': Infinity,
            upgrade: typeof socketForceWebSockets !== 'undefined' ? !socketForceWebSockets : undefined,
            rememberUpgrade: typeof socketForceWebSockets !== 'undefined' ? socketForceWebSockets : undefined,
            transports: typeof socketForceWebSockets !== 'undefined' ? (socketForceWebSockets ? ['websocket'] : undefined) : undefined
        });

        backend.on('connect', function () {
            $("#img_set_script_play,#run_type1,#run_type2,#run_type3,#run_step").button({disabled: false});
            $("#flag_red").hide()
            $("#flag_green").show()

            $('window').unload(function () {
                backend.disconnect()
            });

            backend.emit("getStates",function (err, data) {
                main.states = data;
            });

            backend.emit("gui_version",function (ver) {
                $("#version").html(ver)
                SGI.version = ver;

            });

            backend.emit("getObjectList", function (data) {
                main.objects = data


                backend.emit('getObjectView', 'system', 'instance', {
                    startkey: 'system.adapter.javascript',
                    endkey: 'system.adapter.javascript.\u9999'
                }, function (err, doc) {
                    main.instances = doc.rows
                    main.first_inst = 999;
                    for (var i in main.instances) {

                        var x = parseInt(main.instances[i].id.split(".").pop());
                        if (x < main.first_inst) {
                            main.first_inst = x;
                        }
                    }
                    main.initSelectId();
                })

                // assemble global script
                for (var g in main.objects) {
                    if (main.objects[g].type == "channel" && main.objects[g]._id.contains("script.js.")) {
                        var group = main.objects[g]._id;
                        groups[group] = group;

                    }
                }


                function getGroup(id) {
                    var parts = id.split('.');
                    parts.pop();
                    return parts.join('.');
                }

                function addScript() {
                    var group = 'script.js';
                    // Find new unique name
                    var newText = _('Script');
                    var idx = 1;
                    var name = newText;


                    var instance = 'system.adapter.javascript.' + main.first_inst;
                    var engineType = "Blockly";


                    var data = {
                        common: {
                            name: name,
                            engineType: engineType,
                            source: '',
                            enabled: false,
                            engine: instance
                        },
                        type: 'script'
                    }

                    var x = '<div id="dialog_neu" style="" title="New Script">' +
                        '<button id="new_gui" style="width: 100px" class="btn_new"><img src="img/cube256.png" style="height: 50px; width: 50px" alt="">GUI </button>' +
                        '<button id="new_js" style="width: 100px" class="btn_new"><img src="img/js.jpeg" style="height: 50px; width: 50px" alt="">EDITOR</button>' +
                        '<button id="new_bl" style="width: 100px" class="btn_new"><img src="img/blockly.png" style="height: 50px; width: 50px" alt="">BLOCKLY</button><br><br>' +
                        '<span style="display: inline-block; width: 60px">Group</span><select style="width: 208px" id="add_in_group"></select><br><br>' +
                        '<span style="display: inline-block; width: 60px">Name </span><input type="text" id="new_name" value="' + name + '"></div> '

                    $("body").append(x)

                    fillGroups("add_in_group")

                    function add() {
                        newText = $("#new_name").val();
                        var _newText = $("#new_name").val();
                        group = $("#add_in_group").val() || "script.js";
                        $("#dialog_neu").remove();
                        idx = 1;


                        while (main.objects[group + '.' + newText]) {
                            if (idx === '') idx = 0;
                            idx++;
                            newText = _newText + idx;
                        }

                        data.common.name = newText;
                        var id = group + '.' + newText.replace(/[\s"']/g, '_');

                        backend.emit('setObject', id, data, function (err) {
                            if (err) {
                                main.showError(err);
                                that.init(true);
                            } else {

                                main.objects[id] = data;
                                main.objects[id]._id = id;
                                $('#grid-scripts').selectId('reinit');
                                open_timeout = setTimeout(function () {
                                    SGI.open(id);
                                }, 500);
                            }
                        });
                    }


                    $(".btn_new").button().click(function (ev) {
                        if (ev.currentTarget.id == "new_gui") {
                            data.common.engineType = "Javascript/js";
                            data.native = {
                                editor: 'ScriptGUI',
                                version: SGI.version || "new",
                                prg: {
                                    mbs: {},
                                    fbs: {},
                                    con: {}
                                }
                            };
                            add()

                        }
                        if (ev.currentTarget.id == "new_js") {
                            data.common.engineType = "Javascript/js";
                            add()
                        }
                        if (ev.currentTarget.id == "new_bl") {
                            data.common.engineType = "Blockly";
                            add()
                        }
                    });

                    $("#dialog_neu").dialog({
                        width: "350px",
                        dialogClass: "shortcuts",
                        modal: true,
                        close: function () {
                            $("#dialog_neu").remove();
                        },
                        open: function () {
                        }
                    });


                }

                function fillGroups(elemName) {
                    console.log(groups)
                    // groups = ['script.js', 'script.js.common', 'script.js.global'];

                    //for (var i = 0; i < that.list.length; i++) {
                    //    var g = getGroup(that.list[i]);
                    //    if (groups.indexOf(g) === -1) groups.push(g);
                    //}
                    //for (var j = 0; j < that.groups.length; j++) {
                    //    if (groups.indexOf(that.groups[j]) === -1) groups.push(that.groups[j]);
                    //}
                    var text = '';

                    for (var g in  groups) {
                        var name = groups[g].substring('script.js.'.length);
                        if (name === 'global' || name === 'common') {
                            name = _(name);
                        }

                        if (!name) name = _('no group');

                        if (main.objects[groups[g]] && main.objects[groups[g]].common && main.objects[groups[g]].common.name) {
                            name = main.objects[groups[g]].common.name;
                        }

                        text += '<option value="' + groups[g] + '">' + name + '</option>\n';
                        // create group if not exists
                        if (groups[g] !== 'script.js' && groups[g] !== 'script' && (!main.objects[groups[g]] || !main.objects[groups[g]].common)) {
                            backend.emit('setObject', groups[g], {
                                common: {
                                    name: groups[g].split('.').pop()
                                },
                                type: 'channel'
                            }, function (err) {
                                if (err) {
                                    main.showError(err);
                                    that.init(true);
                                }
                            });
                        }
                    }

                    if (elemName) {
                        var val = $('#' + elemName).val();
                        $('#' + elemName).html(text).val(val);
                    }
                }

                function addScriptInGroup(_group) {
                    fillGroups('edit-new-group-group');

                    if (main.objects[_group] && main.objects[_group].type === 'script') {
                        _group = getGroup(_group);
                    }
                    $('#edit-new-group-group').val(_group || 'script.js');

                    if (!$newGroupDialog) {
                        $newGroupDialog = $('#dialog-new-group').dialog({
                            autoOpen: false,
                            modal: true,
                            width: 400,
                            height: 220,
                            resizable: false,
                            title: _('Create new group'),
                            buttons: [
                                {
                                    id: 'script-group-button-save',
                                    text: _('Ok'),
                                    click: function () {
                                        var group = $('#edit-new-group-group').val() || 'script.js';
                                        var name = $('#edit-new-group-name').val();
                                        if (!name) {
                                            main.showError(_('No group name'));
                                            $newGroupDialog.dialog('close');
                                            return;
                                        }
                                        group += '.' + name.replace(/["'\s.]+/g, '_');

                                        $('#script-group-button-save').button('disable');
                                        $('#script-group-button-cancel').button('disable');

                                        // check if object with such name exists
                                        console.log(group)
                                        if (main.objects[group]) {
                                            SGI.showMessage(_('Object %s yet exists', group));
                                            $newGroupDialog.dialog('close');
                                        } else {
                                            backend.emit('setObject', group, {
                                                common: {
                                                    name: name
                                                },
                                                type: 'channel'
                                            }, function (err) {

                                                $newGroupDialog.dialog('close');
                                                if (err) {
                                                    main.showError(err);
                                                    init(true);
                                                } else {
                                                    setTimeout(function () {
                                                        $('#grid-scripts').selectId('show', group);
                                                        //SGI.editScript(group);
                                                    }, 500);
                                                }
                                            });
                                        }
                                    }
                                },
                                {
                                    id: 'script-group-button-cancel',
                                    text: _('Cancel'),
                                    click: function () {
                                        $newGroupDialog.dialog('close');
                                    }
                                }
                            ],
                            open: function () {
                                $(event.target).parent().find('.ui-dialog-titlebar-close .ui-button-text').html('');
                                $('#script-group-button-save').button('disable');
                                $('#script-group-button-cancel').button('enable');
                                $('#edit-new-group-name').val('');
                            }
                        });

                        $('#edit-new-group-name').change(function () {
                            if ($(this).val()) {
                                $('#script-group-button-save').button('enable');
                            } else {
                                $('#script-group-button-save').button('disable');
                            }
                        }).keyup(function (e) {
                            $(this).trigger('change');
                            if (e.keyCode == 13) $('#script-group-button-save').trigger('click');
                        });
                    }

                    $newGroupDialog.dialog('open');
                }


                $('#grid-scripts').selectId('init', {
                    objects: main.objects,
                    noDialog: true,
                    texts: {
                        select: ('Select'),
                        cancel: ('Cancel'),
                        all: ('All'),
                        id: ('Scripts'),
                        name: ('Name'),
                        role: ('Role'),
                        room: ('Room'),
                        value: ('Value'),
                        type: ('Type'),
                        selectid: ('Select ID'),
                        from: ('From'),
                        lc: ('Last changed'),
                        ts: ('Time stamp'),
                        wait: ('Processing...'),
                        ack: ('Acknowledged'),
                        edit: ('Edit'),
                        ok: ('Ok'),
                        enum: ('Members')
                    },
                    noCopyToClipboard: true,
                    root: 'script.js.',
                    useNameAsId: true,
                    noColumnResize: true,
                    firstMinWidth: '*',
                    columns: [
                        {
                            name: 'instance',
                            data: function (id, name) {

                                return data[id] && data[id].common && data[id].common.engine ? data[id].common.engine.substring('system.adapter.javascript.'.length) : '';
                            },
                            title: function (id, name) {
                                return data[id] && data[id].common && data[id].common.engine ? ('Instance') + ' ' + data[id].common.engine : '';
                            },
                        },
                        {
                            name: 'icon',
                            data: function (id, name) {
                                if (data[id] && data[id].type == "script") {
                                    if (data[id].common.engineType == "Blockly") {
                                        return '<img src="img/blockly.png" style="height: 18px; width: 18px" alt="">'
                                    } else if (data[id].native && data[id].native.editor == "ScriptGUI") {
                                        return '<img src="img/cube32.png" style="height: 18px; width: 18px" alt="">'
                                    } else {
                                        return '<img src="img/js.jpeg" style="height: 18px; width: 18px" alt="">'
                                    }
                                }

                                else {
                                    return ""
                                }
                            },
                            title: function (id, name) {
                                return data[id] && data[id].common && data[id].common.engine ? ('Instance') + ' ' + data[id].common.engine : '';
                            },
                        },
                        'button'
                    ],
                    widths: ['30px', '30px', '150px'],
                    buttons: [
                        {
                            text: false,
                            icons: {
                                primary: 'ui-icon-play'
                            },
                            click: function (id) {
                                clearTimeout(open_timeout);
                                if (this.length == 1) this.button('disable');
                                // toggle state

                                main.objects[id].common.enabled = !(data[id] && data[id].common && data[id].common.enabled)

                                backend.emit('setObject', id, main.objects[id], function (err) {
                                    if (err) {
                                        main.showError(err);
                                        init(true);
                                    }
                                    $('#grid-scripts').selectId('reinit');
                                });
                            },
                            match: function (id) {
                                if (data[id] && data[id].type === 'script') {
                                    if (data[id] && data[id].common && data[id].common.enabled) {
                                        this.button('option', 'icons', {
                                            primary: 'ui-icon-pause'
                                            //}).attr('title', ('Activated. Click to stop.')).addClass("ui-state-highlight").first().addClass("ui-icon-info");
                                        }).attr('title', ('Activated. Click to stop.')).css({
                                            'background-color': 'lightgreen',
                                            'background-image': "none"
                                        });
                                    } else {
                                        this.button('option', 'icons', {
                                            primary: 'ui-icon-play'
                                        }).attr('title', ('Deactivated. Click to start.')).css({
                                            'background-color': '#FF9999',
                                            'background-image': "none"
                                        });
                                    }
                                } else {
                                    this.hide();
                                }
                            },
                            width: 26,
                            height: 20
                        },
                        {
                            text: false,
                            icons: {
                                primary: 'ui-icon-trash'
                            },
                            click: function (id) {
                                clearTimeout(open_timeout)
                                SGI.confirmMessage(('Are you sure to delete script ' + main.objects[id].common.name) + ' ?', null, 'help', function (result) {
                                    if (result) {
                                        backend.emit('delObject', id);
                                        delete main.objects[id]
                                        $('#grid-scripts').selectId('reinit');
                                    }
                                });

                            },
                            match: function (id) {
                                if (!main.objects[id] || !main.objects[id].common || main.objects[id].common.nondeletable) this.hide();
                            },
                            width: 26,
                            height: 20
                        },
                        {
                            text: false,
                            icons: {
                                primary: 'ui-icon-copy'
                            },
                            click: function (id) {
                                clearTimeout(open_timeout)
                                main.socket.emit('getObject', id, function (err, obj) {
                                    if (err) {
                                        main.showError(err);
                                        return;
                                    }
                                    // find new name
                                    var i = 0;
                                    //build name
                                    var newId;
                                    do {
                                        i++;
                                        if (obj._id.match(/\(\d+\)/)) {
                                            newId = obj._id.replace(/\(\d+\)/, '(' + i + ')');
                                        } else {
                                            newId = obj._id + '(' + i + ')';
                                        }
                                    } while (list.indexOf(newId) != -1);

                                    obj._id = newId;
                                    main.socket.emit('setObject', newId, obj, function (err, obj) {
                                        if (err) {
                                            main.showError(err);
                                            return;
                                        }
                                    });
                                });
                            },
                            match: function (id) {
                                if (!data[id] || data[id].type !== 'script') this.hide();
                            },
                            width: 26,
                            height: 20
                        },

                    ],
                    panelButtons: [
                        {
                            text: false,
                            title: 'New script',
                            icons: {
                                primary: 'ui-icon-document'
                            },
                            click: function () {
                                addScript();
                            }
                        },
                        {
                            text: false,
                            title: 'New group',
                            icons: {
                                primary: 'ui-icon-circle-plus'
                            },
                            click: function () {
                                addScriptInGroup(main.currentId);
                            }
                        },
                        {
                            text: false,
                            title: 'Export',
                            icons: {
                                primary: 'ui-icon-arrowthickstop-1-s'
                            },
                            click: function () {
                                exportScripts();
                            }
                        },
                        {
                            text: false,
                            title: 'Import',
                            icons: {
                                primary: 'ui-icon-arrowthickstop-1-n'
                            },
                            click: function () {
                                importScripts();
                            }
                        }
                    ],
                    onChange: function (id, oldId) {
                        if (id !== oldId) {
                            open_timeout = setTimeout(function () {
                                SGI.open(id);
                            }, 100);
                        }
                    },
                    quickEdit: [/*{
                     name: 'instance',
                     options: function (id, name) {
                     var ins = {};
                     if (data[id].type !== 'script') {
                     return false;
                     }
                     for (var i = 0; i < main.instances.length; i++) {
                     if (main.instances[i].substring(0, 'system.adapter.javascript.'.length) === 'system.adapter.javascript.') {
                     var inst = main.instances[i].substring('system.adapter.javascript.'.length);
                     ins[inst] = inst;
                     }
                     }
                     return ins;
                     }
                     }*/],
                    quickEditCallback: function (id, attr, newValue, oldValue) {
                        /*   main.socket.emit('getObject', id, function (err, _obj) {
                         if (err) return main.showError(err);

                         _obj.common.engine = 'system.adapter.javascript.' + newValue;
                         main.socket.emit('setObject', _obj._id, _obj, function (err) {
                         if (err) main.showError(err);
                         });
                         });*/
                    }
                }).selectId('show');


                $("#1-div > div:nth-child(2)").addClass("script_list")
            })
        });


        backend.on('disconnect', function () {
            $("#flag_green").hide()
            $("#flag_red").show()

            sim_exit()
        });

        backend.on('reconnect_failed', function () {
            $("#img_con_backend").attr("src", "img/icon/flag-red.png");
            sim_exit()
        });


        backend.on("trigger_highlight", function (baustein) {
            sim.trigger_highlight(baustein);
            //backend.emit("next");
        })

        backend.on("step_fbs_highlight", function (baustein) {
            sim.step_fbs_highlight(baustein)
            //backend.emit("next");
        })

        backend.on("step_mbs_highlight_in", function (baustein) {
            sim.step_mbs_highlight_in(baustein)
            //backend.emit("next");
        })

        backend.on("step_mbs_highlight_out", function (baustein) {
            sim.step_mbs_highlight_out(baustein)
            //backend.emit("next");
        })

        backend.on("step_mbs_highlight_reset", function (baustein) {
            sim.step_mbs_highlight_reset(baustein)
            //backend.emit("next");
        })

        backend.on("brake", function (data) {
            SGI.set_mark(data.sourceLine - 1)
            $(".img_debug").button({disabled: false});
        });

        backend.on("scopes", function (data) {
            console.log("scope")
            var scopes = {
                0: "Global",
                1: "Local",
                2: "With",
                3: "Closure",
                4: "Catch",
                5: "?",
                6: "??",
                7: "???"
            }

            var tree = {}

            $.each(data.body.scopes, function () {
                var scope = scopes[this.type]
                if (this.object.properties.length > 0) {
                    if (tree[scope]) {
                        function _x(i) {
                            if (tree[scope + " " + i]) {
                                _x(i + 1)
                            } else {
                                scope = scope + " " + i;
                                tree[scope] = {};
                            }
                        }

                        _x(1)
                    } else {
                        scope = scope;
                        tree[scope] = {};
                    }


                    $.each(this.object.properties, function (e) {
                        var name = this.name + "§§§" + this.value.ref;
                        if (this.value.value) {
                            tree[scope][name] = this.value.value
                        } else if (this.value.type == "function") {
                            tree[scope][name] = "func."
                        } else {
                            tree[scope][name] = "§§" + this.value.ref
                        }
                        tree[scope][name]["value"] = this.value.value;
                        tree[scope][name]["type"] = this.value.type;
                    })
                }

            })
            const formatter = new JSONFormatter(tree);
            $("#editor_deb_scopes").html(
                formatter.render()
            );
            formatter.openAtDepth(1);
            $("#editor_deb_scopes > div > a").hide()


        });

        backend.on("????", function (err) {
        });

        backend.on("sim_exit", function (err) {
            sim_exit();
        });

        backend.on("message", function (data) {
            if (typeof data == 'string') {
                console.log("message: " + data);
            } else if (Array.isArray(data)) {
                console.log("message: " + data[0]);
                if (data[0] == "logger") {
                    sim.logger(data[1])
                } else if (data[0] == "log") {
                    sim.log(data[1])
                } else if (data[0] == "simout") {
                    sim.simout(data[1], data[2])
                } else if (data[0] == "script_err") {
                    sim.script_err(data[1])
                } else if (data[0] == "running") {
                    sim.running();
                } else {
                    sim.script_err(data)
                }
            } else {
                console.log(data);
            }
        });
        backend.on("sim_Time", function (data) {
            if (!SGI.datePicker) {
                var d = new Date(data)
                $("#sim_date").val(d.toLocaleDateString() + " " + d.toLocaleTimeString())
            }

        });

        backend.on("log_log", function (data) {
                SGI.log("log", data);
        });
        backend.on("log_info", function (data) {
            SGI.log("info", data);
        });
        backend.on("log_warn", function (data) {
            SGI.log("warn", data);
        });
        backend.on("log_error", function (data) {
            SGI.log("error", data);
        });
        backend.on("log_debug", function (data) {
            SGI.log("debug", data);
        });
        backend.on("add_subscribe", function (data) {
           sim.add_subscribe(data)
        });

        backend.on("_log", function (data) {
            console.log("---------- Log from backend -----------");
            console.log(data);
        });

        backend.on("_jlog", function (data) {
            console.log("---------- jLog from backend -----------");
            try {
                console.log(JSON.parse(data));
            } catch (err) {
                console.log(data)
            }

        });
        backend.on("already_running", function (data) {
            console.log("already_running")
            SGI.confirmMessage("<div style='width: 100%; text-align: center; font-weight: bold; font-size: 14px'><p style='color: red; font-size: 22px'>Es wurde bereits eine Simulation gestartet </p><br> eventual durch einen anderen Browser ?</div>", "info", false, {})
            sim_exit()
        });

        backend.on("new_state",function (data) {
       main.states[data[0]] = data[1];
            if(sim.sim_pattern[data[0]]){
            $("#ino_play_"+data[0].replace(/\./g, "").replace(/\-/g, "")).val(data[1].val)
            }

        })

    },


});

