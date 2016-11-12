/**
 * Created by jack on 17.08.2014.
 */

var web;
var backend;
var $newGroupDialog;
//var groups = {'script.js': 'script.js', 'script.js.common': 'script.js.common', 'script.js.global': 'script.js.global'};

jQuery.extend(true, SGI, {


//    disconnect: function () {
//
//        if (!SGI.socket) {
//            backend.disconnect()
//        }
//
//        SGI.con_data = false;
//
//        homematic = {
//            uiState: {"_65535": {"Value": null}},
//            regaIndex: {},
//            regaObjects: {}
//        };
//        $("#img_con_backend").attr("src", "img/icon/flag-red.png");
//        $("#btn_con_online").parent().removeClass("div_img_glass_on");
//        $("#btn_con_offline").parent().removeClass("div_img_glass_on");
//        $("#img_set_script_engine").hide();
//
//
//        $(".run_type,#run_step, #img_set_script_play ,#img_set_script_stop").button({disabled: true});
//        $(".run_type").prop("checked", false);
//        $("#run_type1").prop("checked", true);
//        $(".run_type").button("refresh");
//        sim.run_type = "sim";
//
////        $("#inp_con_ip").unbind("change")
//    },

    //offline: function () {


        //if (scope.setup.last_con != url || scope.setup.con_type != "offline") {
        //    scope.setup.last_con = url;
        //    scope.setup.con_type = "offline";
        //    scope.$apply();
        //    SGI.save_setup()
        //}
        //$('body').css("cursor", "wait");
        ////try {
        ////
        ////
        ////    fs.readFile(scope.setup.datastore + '/ScriptGUI_Data/connections/' + url + '.json', function (err, data) {
        ////        if (!err) {
        ////            //console.log(data)
        ////            homematic = JSON.parse(data);
        ////            //console.log(homematic)
        ////            $("#img_con_backend").attr("src", "img/icon/flag-yellow.png");
        ////            $("#btn_con_offline").parent().addClass("div_img_glass_on");
        ////            $("#btn_con_online").parent().removeClass("div_img_glass_on");
        ////            SGI.con_data = true;
        ////
        ////            $("#run_step, #run_type1, #img_set_script_play ,#img_set_script_stop").button({disabled: false});
        ////        } else {
        ////            alert(err)
        ////            $("#img_con_backend").attr("src", "img/icon/flag-red.png");
        ////            $("#btn_con_offline").parent().removeClass("div_img_glass_on");
        ////            $("#btn_con_online").parent().removeClass("div_img_glass_on");
        ////            homematic = {
        ////                uiState: {"_65535": {"Value": null}},
        ////                regaIndex: {},
        ////                regaObjects: {}
        ////            };
        ////
        ////            SGI.con_data = false;
        ////            throw err
        ////        }
        ////        $('body').css("cursor", "default");
        ////    });
        ////}
        ////catch (err) {
        //$('body').css("cursor", "default");
        //$("#img_con_backend").attr("src", "img/icon/flag-red.png");
        //$("#btn_con_offline").parent().removeClass("div_img_glass_on");
        //$("#btn_con_online").parent().removeClass("div_img_glass_on");
        //
        //SGI.con_data = false;
        //throw err
        //}

    //},

    connect_backend: function (__url) {
        if (!$.fn.selectId) {
            $("head").append('<script type="text/javascript" src="js/lib/socket.io_10.js"></script>');
        }
        $("#img_con_backend").attr("src", "img/icon/flag-blue.png");

        backend = io.connect(window.location.hostname + ":" + 3000, {'force new connection': false});

        backend.on("connect", function (err) {
            $("#img_set_script_play,#run_type1,#run_type2,#run_type3,#run_step").button({disabled: false});
            $("#img_con_backend").attr("src", "img/icon/flag-green.png");

            $('window').unload(function () {
                backend.disconnect()
            });
        });

        backend.on('disconnect', function () {
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
            console.log(data.sourceLine)

            SGI.set_mark(data.sourceLine)

            $(".img_debug").button({disabled: false});
        })

        backend.on("scopes", function (data) {
            console.log(data)

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
                        if (this.value.value) {
                            tree[scope][this.name] = this.value.value
                        } else if (this.value.type == "function") {
                            tree[scope][this.name] = "function()..."
                        } else {
                            tree[scope][this.name] = "§§" + this.value.ref
                        }
                        tree[scope][this.name]["value"] = this.value.value;
                        tree[scope][this.name]["type"] = this.value.type;
                    })
                }

            })
            console.log(tree)
            const formatter = new JSONFormatter(tree);
            $("#editor_deb_scopes").html(
                formatter.render()
            );
            formatter.openAtDepth(1);
            $("#editor_deb_scopes > div > a").hide()


        });

        backend.on("????", function (err) {
        })

        backend.on("sim_exit", function (err) {
            sim_exit();
        });

        backend.on("message", function (data) {
            console.log(data)
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
        })

        backend.on("_log", function (data) {
            console.log("---------- Log from backend -----------");
            console.log(data);
        })

        backend.on("_jlog", function (data) {
            console.log("---------- jLog from backend -----------");
            try {
                console.log(JSON.parse(data));
            } catch (err) {
                console.log(data)
            }

        })

        SGI.connect_iobroker();
    },

    connect_iobroker: function () {

        // web ? or Local ?
        if ($.fn.selectId) {
            $('#select_oid').selectId('init', {
                filter: {
                    _id: "javascript"
                },
                noMultiselect: true,
                connCfg: {
                    socketUrl: socketUrl,
                    socketSession: socketSession,
                    socketName: 'scriptGUI',
                    upgrade: typeof socketForceWebSockets !== 'undefined' ? !socketForceWebSockets : undefined,
                    rememberUpgrade: typeof socketForceWebSockets !== 'undefined' ? socketForceWebSockets : undefined,
                    transports: typeof socketForceWebSockets !== 'undefined' ? (socketForceWebSockets ? ['websocket'] : undefined) : undefined
                },
                columns: ['name', 'role', 'room', 'value'],
                texts: {
                    select: ('Select'),
                    cancel: ('Cancel'),
                    all: ('All'),
                    id: ('ID'),
                    name: ('Name'),
                    role: ('Role'),
                    room: ('Room'),
                    value: ('Value'),
                    selectid: ('Select ID'),
                    from: ('From'),
                    lc: ('Last changed'),
                    ts: ('Time stamp'),
                    wait: ('Processing...'),
                    ack: ('Acknowledged')
                }
            });

            web = io.connect(socketUrl, {
                query: 'key=' + socketSession,
                'reconnection limit': 10000,
                'max reconnection attempts': Infinity,
                upgrade: typeof socketForceWebSockets !== 'undefined' ? !socketForceWebSockets : undefined,
                rememberUpgrade: typeof socketForceWebSockets !== 'undefined' ? socketForceWebSockets : undefined,
                transports: typeof socketForceWebSockets !== 'undefined' ? (socketForceWebSockets ? ['websocket'] : undefined) : undefined
            });

            web.on('connect', function () {
                this.emit('name', 'Scriptgui');
                $("#img_con_web").attr("src", "img/icon/flag-green.png");


                web.emit("getObjects", function (err, data) {

                    main.objects = data

                    web.emit('getObjectView', 'script', 'javascript', {}, function (err, doc) {

                        web.emit('getObjectView', 'system', 'instance', {
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

                        })


                        // assemble global script
                        console.log(doc)
                        for (var g = 0; g < doc.rows.length; g++) {
                            var group = doc.rows[g].value._id.split(".");
                            group.pop()
                            group = group.join(".")
                            groups[group] = group;

                            main.objects[doc.rows[g].value._id] = doc.rows[g].value;
                        }


                        function getGroup(id) {
                            var parts = id.split('.');
                            parts.pop();
                            return parts.join('.');
                        }

                        function addScript(group) {
                            group = group || 'script.js';
                            // Find new unique name
                            var newText = _('Script');
                            var idx = 1;
                            var name = newText + idx;

                            while (main.objects[group + '.' + name]) {
                                if (idx === '') idx = 0;
                                idx++;
                                name = newText + idx;
                            }
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
                                '<span>Name </span><input type="text" id="new_name" value="' + name + '"></div> '

                            $("body").append(x)

                            function add() {
                                name = $("#new_name").val();
                                $("#dialog_neu").remove();
                                idx = 1
                                while (main.objects[group + '.' + name]) {
                                    if (idx === '') idx = 0;
                                    idx++;
                                    name = name + idx;
                                }

                                data.common.name = name;
                                var id = group + '.' + name.replace(/[\s"']/g, '_');

                                web.emit('setObject', id, data, function (err) {
                                    if (err) {
                                        main.showError(err);
                                        that.init(true);
                                    } else {

                                        main.objects[id] = data;
                                        main.objects[id]._id = id;

                                        $("#btn_refresh_1").trigger("click")
                                        setTimeout(function () {
                                            console.log("--------OK")
                                            //SGI.open(id);
                                        }, 500);
                                    }
                                });
                            }


                            $(".btn_new").button().click(function (ev) {
                                if (ev.currentTarget.id == "new_gui") {
                                    data.common.engineType = "Javascript/js";
                                    data.native = {
                                        editor: 'ScriptGUI',
                                        prg: {}
                                    }
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
                            var groups = ['script.js', 'script.js.common', 'script.js.global'];

                            //for (var i = 0; i < that.list.length; i++) {
                            //    var g = getGroup(that.list[i]);
                            //    if (groups.indexOf(g) === -1) groups.push(g);
                            //}
                            //for (var j = 0; j < that.groups.length; j++) {
                            //    if (groups.indexOf(that.groups[j]) === -1) groups.push(that.groups[j]);
                            //}
                            var text = '';

                            for (g = 0; g < groups.length; g++) {
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
                                    web.emit('setObject', groups[g], {
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

                            if (main.objects[_group] && that.main.objects[_group].type === 'script') {
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
                                                    that.main.showError(_('No group name'));
                                                    that.$newGroupDialog.dialog('close');
                                                    return;
                                                }
                                                group += '.' + name.replace(/["'\s.]+/g, '_');

                                                $('#script-group-button-save').button('disable');
                                                $('#script-group-button-cancel').button('disable');

                                                // check if object with such name exists
                                                if (main.objects[group]) {
                                                    SGI.showMessage(_('Object %s yet exists', group));
                                                    $newGroupDialog.dialog('close');
                                                } else {
                                                    web.emit('setObject', group, {
                                                        common: {
                                                            name: name
                                                        },
                                                        type: 'channel'
                                                    }, function (err) {
                                                        $newGroupDialog.dialog('close');
                                                        if (err) {
                                                            that.main.showError(err);
                                                            that.init(true);
                                                        } else {
                                                            setTimeout(function () {
                                                                that.$grid.selectId('show', group);
                                                                editScript(group);
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
                                                that.$newGroupDialog.dialog('close');
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
                                    name: 'x',
                                    data: function (id, name) {
                                        if (data[id]) {
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
                                        if (this.length == 1) this.button('disable');
                                        // toggle state
                                        main.socket.emit('extendObject', id, {
                                            common: {
                                                enabled: !(data[id] && data[id].common && data[id].common.enabled)
                                            }
                                        }, function (err) {
                                            if (err) {
                                                main.showError(err);
                                                that.init(true);
                                            }
                                        });
                                    },
                                    match: function (id) {
                                        if (data[id] && data[id].type === 'script') {
                                            if (data[id] && data[id].common && data[id].common.enabled) {
                                                this.button('option', 'icons', {
                                                    primary: 'ui-icon-pause'
                                                }).attr('title', ('Activated. Click to stop.')).css({'background-color': 'lightgreen'});
                                            } else {
                                                this.button('option', 'icons', {
                                                    primary: 'ui-icon-play'
                                                }).attr('title', ('Deactivated. Click to start.')).css({'background-color': '#FF9999'});
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
                                        console.log(id)
                                        SGI.confirmMessage(('Are you sure to delete script ' + main.objects[id].common.name) + ' ?', null, 'help', function (result) {
                                            if (result) {
                                                backend.emit('delObject', id);
                                                delete main.objects[id]
                                                $("#btn_refresh_1").trigger("click");
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
                                            } while (that.list.indexOf(newId) != -1);

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
                                        var group = main.currentId || 'script.js';
                                        if (data[group] && data[group].type === 'script') group = getGroup(group);

                                        addScript(group);
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
                                console.log(id)
                                if (id !== oldId) {
                                    SGI.open(id)
                                }
                            },
                            quickEdit: [{
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
                            }],
                            quickEditCallback: function (id, attr, newValue, oldValue) {
                                main.socket.emit('getObject', id, function (err, _obj) {
                                    if (err) return main.showError(err);

                                    _obj.common.engine = 'system.adapter.javascript.' + newValue;
                                    main.socket.emit('setObject', _obj._id, _obj, function (err) {
                                        if (err) main.showError(err);
                                    });
                                });
                            }
                        }).selectId('show');


                        $("#1-div > div:nth-child(2)").addClass("script_list")
                    })

                });


            });

            web.on('disconnect', function () {
                $("#img_con_web").attr("src", "img/icon/flag-red.png");
            });
        }


        //iob.conn = servConn;
        //
        //iob.conn.init(null, {
        //    mayReconnect: null,
        //    onConnChange: function (isConnected) {
        //        //console.log("onConnChange isConnected="+isConnected);
        //        if (isConnected) {
        //            //$('#server-disconnect').dialog('close');
        //            if (iob.isFirstTime) {
        //                iob.conn.getVersion(function (version) {
        //                    if (version) {
        //                        if (compareVersion(version, iob.requiredServerVersion)) {
        //                            iob.showMessage(('Warning: requires Server version %s - found Server version %s - please update Server.',  iob.requiredServerVersion, version));
        //                        }
        //                    }
        //                    //else {
        //                    // Possible not authenticated, wait for request from server
        //                    //}
        //                });
        //
        //
        //            }
        //
        //
        //                // Read all states from server
        //                iob.conn.getStates(iob.editMode ? null: iob.IDs, function (error, data) {
        //                    if (error) {
        //                     console.log(error);
        //                    }
        //                    if (data) {
        //                        for (var id in data) {
        //                            var obj = data[id];
        //                            if (!obj) continue;
        //
        //                            try {
        //
        //                                    iob.states[id + '.val'] = obj.val;
        //                                    iob.states[id + '.ts']  = obj.ts;
        //                                    iob.states[id + '.ack'] = obj.ack;
        //                                    iob.states[id + '.lc']  = obj.lc;
        //                                    if (obj.q !== undefined) iob.states[id + '.q'] = obj.q;
        //
        //                            } catch (e) {
        //                              console.log('Error: can\'t create states object for ' + id + '(' + e + ')');
        //                            }
        //
        //
        //                        }
        //                    }
        //
        //
        //
        //                    if (error) {
        //                        console.log('Possibly not authenticated, wait for request from server');
        //                        // Possibly not authenticated, wait for request from server
        //                    } else {
        //                        // Get groups info
        //                        //iob.conn.getGroups(function (err, groups) {
        //                        //    iob.userGroups = groups || {};
        //                        //    // Get Server language
        //                        //    iob.conn.getConfig(function (err, config) {
        //                        //        systemLang = iob.args.lang || config.language || systemLang;
        //                        //        iob.language = systemLang;
        //                        //        iob.dateFormat = config.dateFormat;
        //                        //        iob.isFloatComma = config.isFloatComma;
        //                        //        translateAll();
        //                        //        if (iob.isFirstTime) {
        //                        //            // Init edit dialog
        //                        //            if (iob.editMode && iob.editInit) iob.editInit();
        //                        //            iob.isFirstTime = false;
        //                        //            iob.init();
        //                        //        }
        //                        //    });
        //                        //});
        //
        //                        // If metaIndex required, load it
        //                        //if (iob.editMode) {
        //                        //    /* socket.io */
        //                        //    if (iob.isFirstTime) iob.showWaitScreen(true, ('Loading data objects...'), null, 20);
        //
        //                            // Read all data objects from server
        //                            iob.conn.getObjects(function (err, data) {
        //                                iob.objects = data;
        //                                // Detect if objects are loaded
        //                                for (var ob in data) {
        //                                    iob.objectSelector = true;
        //                                    break;
        //                                }
        //                                //if (iob.editMode && iob.objectSelector) {
        //                                //    iob.inspectWidgets(true);
        //                                //}
        //                            });
        //                        //}
        //
        //                        //console.log((new Date()) + " socket.io reconnect");
        //                        //if (iob.isFirstTime) {
        //                        //    setTimeout(function () {
        //                        //        if (iob.isFirstTime) {
        //                        //            // Init edit dialog
        //                        //            if (iob.editMode && iob.editInit) iob.editInit();
        //                        //            iob.isFirstTime = false;
        //                        //            iob.init();
        //                        //        }
        //                        //    }, 1000);
        //                        //}
        //                    }
        //                });
        //
        //        } else {
        //            //console.log((new Date()) + " socket.io disconnect");
        //            //$('#server-disconnect').dialog('open');
        //        }
        //    },
        //    onRefresh:    function () {
        //        window.location.reload();
        //    },
        //    onUpdate:     function (id, state) {
        //
        //    },
        //    onAuth:       function (message, salt) {
        //        if (iob.authRunning) {
        //            return;
        //        }
        //        iob.authRunning = true;
        //        var users;
        //        if (visConfig.auth.users && visConfig.auth.users.length) {
        //            users = '<select id="login-username" value="' + visConfig.auth.users[0] + '" class="login-input-field">';
        //            for (var z = 0; z < visConfig.auth.users.length; z++) {
        //                users += '<option value="' + visConfig.auth.users[z] + '">' + visConfig.auth.users[z] + '</option>';
        //            }
        //            users += '</select>';
        //        } else {
        //            users = '<input id="login-username" value="" type="text" autocomplete="on" class="login-input-field" placeholder="' + ('User name') + '">';
        //        }
        //
        //        var text = '<div id="login-box" class="login-popup" style="display:none">' +
        //            '<div class="login-message">' + message + '</div>' +
        //            '<div class="login-input-field">' +
        //            '<label class="username">' +
        //            '<span class="_">' + ('User name') + '</span>' +
        //            users +
        //            '</label>' +
        //            '<label class="password">' +
        //            '<span class="_">' + ('Password') + '</span>' +
        //            '<input id="login-password" value="" type="password" class="login-input-field" placeholder="' + ('Password') + '">' +
        //            '</label>' +
        //            '<button class="login-button" type="button"  class="_">' + ('Sign in') + '</button>' +
        //            '</div>' +
        //            '</div>';
        //
        //        // Add the mask to body
        //        $('body')
        //            .append(text)
        //            .append('<div id="login-mask"></div>');
        //
        //        var loginBox = $('#login-box');
        //
        //        //Fade in the Popup
        //        $(loginBox).fadeIn(300);
        //
        //        //Set the center alignment padding + border see css style
        //        var popMargTop = ($(loginBox).height() + 24) / 2;
        //        var popMargLeft = ($(loginBox).width() + 24) / 2;
        //
        //        $(loginBox).css({
        //            'margin-top': -popMargTop,
        //            'margin-left': -popMargLeft
        //        });
        //
        //        $('#login-mask').fadeIn(300);
        //        // When clicking on the button close or the mask layer the popup closed
        //        $('#login-password').keypress(function (e) {
        //            if (e.which == 13) {
        //                $('.login-button').trigger('click');
        //            }
        //        });
        //        $('.login-button').bind('click', function () {
        //            var user = $('#login-username').val();
        //            var pass = $('#login-password').val();
        //            $('#login_mask , .login-popup').fadeOut(300, function () {
        //                $('#login-mask').remove();
        //                $('#login-box').remove();
        //            });
        //            setTimeout(function () {
        //                iob.authRunning = false;
        //                console.log('user ' + user + ', ' + pass + ' ' + salt);
        //                iob.conn.authenticate(user, pass, salt);
        //            }, 500);
        //            return true;
        //        });
        //    },
        //    onCommand:    function (instance, command, data) {
        //        var parts;
        //        if (!instance || (instance != iob.instance && instance != 'FFFFFFFF' && instance.indexOf('*') === -1)) return false;
        //        if (command) {
        //            if (iob.editMode && command !== 'tts' && command !== 'playSound') return;
        //            // external Commands
        //            switch (command) {
        //                case 'alert':
        //                    parts = data.split(';');
        //                    iob.showMessage(parts[0], parts[1], parts[2]);
        //                    break;
        //                case 'changedView':
        //                    // Do nothing
        //                    return false;
        //                case 'changeView':
        //                    parts = data.split('/');
        //                    //if (parts[1]) {
        //                    // Todo switch to desired project
        //                    //}
        //                    iob.changeView(parts[1] || parts[0]);
        //                    break;
        //                case 'refresh':
        //                case 'reload':
        //                    setTimeout(function () {
        //                        window.location.reload();
        //                    }, 1);
        //                    break;
        //                case 'dialog':
        //                case 'dialogOpen':
        //                    $('#' + data + '_dialog').dialog('open');
        //                    break;
        //                case 'dialogClose':
        //                    $('#' + data + '_dialog').dialog('close');
        //                    break;
        //                case 'popup':
        //                    window.open(data);
        //                    break;
        //                case 'playSound':
        //                    setTimeout(function () {
        //                        var href;
        //                        if (data.match(/^http(s)?:\/\//)) {
        //                            href = data;
        //                        } else {
        //                            href = location.protocol + '//' + location.hostname + ':' + location.port + data;
        //                        }
        //                        // force read from server
        //                        href += '?' + (new Date()).getTime();
        //
        //                        if (typeof Audio != 'undefined') {
        //                            var snd = new Audio(href); // buffers automatically when created
        //                            snd.play();
        //                        } else {
        //                            if (!$('#external_sound').length) {
        //                                $('body').append('<audio id="external_sound"></audio>');
        //                            }
        //                            $('#external_sound').attr('src', href);
        //                            document.getElementById('external_sound').play();
        //                        }
        //                    }, 1);
        //                    break;
        //                case 'tts':
        //                    if (typeof app !== 'undefined') {
        //                        app.tts(data);
        //                    }
        //                    break;
        //                default:
        //                    iob.conn.logError('unknown external command ' + command);
        //            }
        //        }
        //
        //        return true;
        //    },
        //    onObjectChange: function(id, obj) {
        //        if (!iob.objects || !iob.editMode) return;
        //        if (obj) {
        //            iob.objects[id] = obj;
        //        } else {
        //            if (iob.objects[id]) delete iob.objects[id];
        //        }
        //
        //        if ($.fn.selectId) $.fn.selectId('objectAll', id, obj);
        //    },
        //    onError:      function (err) {
        //        if (err.arg == 'iob.0.control.instance' || err.arg == 'iob.0.control.data' || err.arg == 'iob.0.control.command') {
        //            console.warn('Cannot set ' + err.arg + ', because of insufficient permissions');
        //        } else {
        //            iob.showMessage(('Cannot execute %s for %s, because of insufficient permissions', err.command, err.arg), ('Insufficient permissions'), 'alert', 600);
        //        }
        //    }
        //});

    },

    //server_error: function (error) {
    //    //todo speicher error in log datei
    //    //var send_data = {
    //    //    typ: "error",
    //    //    error: error,
    //    //    user: scope.user_name,
    //    //    mail: $("#inp_error_mail").val(),
    //    //    komment: $("#txt_error_comment").val(),
    //    //    prg_data: "nicht mitgesendet",
    //    //    datapoints: "nicht mitgesendet",
    //    //    os: SGI.os
    //    //};
    //    //
    //    //if (send_data.mail == "") {
    //    //    send_data.mail = scope.user_mail;
    //    //}
    //    //
    //    //
    //    //if ($("#inp_prg_data").val() == true || $("#inp_prg_data").val() == "true") {
    //    //    send_data.prg_data = JSON.stringify({
    //    //        version: main_manifest.version,
    //    //        mbs: scope.mbs,
    //    //        fbs: scope.fbs,
    //    //        con: scope.con
    //    //    });
    //    //
    //    //    send_data.datapoints = JSON.stringify(homematic);
    //    //}
    //    //
    //    //
    //    //var client = new net.Socket();
    //    //client.connect(SGI.HOST_PORT, SGI.HOST, function () {
    //    //    client.write(JSON.stringify(send_data));
    //    //    client.end()
    //    //});
    //    //
    //    //client.on('data', function (data) {
    //    //    if (data != "error") {
    //    //        alert("Ticketnummer: " + data)
    //    //    } else {
    //    //        alert("Daten konnten nicht gesendet werden")
    //    //    }
    //    //    client.destroy();
    //    //});
    //},
    //
    //server_register: function () {
    //    try {
    //        if (scope.setup.user_mail == "" || scope.setup.user_mail == undefined) {
    //            $("body").append('\
    //            <div id="dialog_register" style="text-align: center" title="' + SGI.translate("Register") + '">\
    //            <img src="./img/logo.png" style="width: 300px"/><br><br>\
    //            <div style="font-size: 20px; font-weight: 900;">' + SGI.translate("register_info") + '</div><br><br>\
    //            <div style="width: 80px; display: inline-block;text-align: left">' + SGI.translate("Name:") + '  </div><input id="inp_register_name" style="width: 300px" type="text"/><br>\
    //            <div style="width: 80px; display: inline-block;text-align: left">' + SGI.translate("E-Mail:") + '</div><input id="inp_register_mail" style="width: 300px" type="text"/><br><br>\
    //            <button id="btn_register">' + SGI.translate("register") + '</button>\
    //               </div>');
    //
    //            $("#dialog_register").dialog({
    //                width: "auto",
    //                dialogClass: "update",
    //                modal: true,
    //                close: function () {
    //                    $("#dialog_register").remove();
    //                }
    //            });
    //
    //            $("#btn_register").button().click(function () {
    //
    //                var send_data = {
    //                    typ: "register",
    //                    data: {
    //                        name: $("#inp_register_name").val(),
    //                        mail: $("#inp_register_mail").val(),
    //                        os: SGI.os
    //                    }
    //                };
    //
    //                function send_to_server(data) {
    //
    //                    var client = new net.Socket();
    //                    client.connect(SGI.HOST_PORT, SGI.HOST, function () {
    //                        client.write(JSON.stringify(send_data));
    //
    //                    });
    //
    //                    client.on('data', function (data) {
    //                        if (data != "error") {
    //                            scope.setup.user_name = send_data.data.name;
    //                            scope.setup.user_mail = send_data.data.mail;
    //                            scope.$apply();
    //                            $("#dialog_register").dialog("close")
    //                        } else {
    //                            alert("Daten konnten nicht gesendet werden. Bitte überprüfen sie ihre Internetverbindung")
    //                        }
    //                        client.destroy();
    //                    });
    //                }
    //
    //                if (send_data.data.mail == "" || send_data.data.mail == undefined) {
    //                    getmac.getMac(function (err, macAddress) {
    //                        if (err)  throw err;
    //                        send_data.data.mail = macAddress;
    //                        send_to_server(send_data)
    //                    })
    //                } else {
    //                    send_to_server(send_data)
    //                }
    //            });
    //        }
    //    } catch (err) {
    //        console.log("register nicht möglich");
    //    }
    //
    //},
    //
    //server_homecall: function () {
    //    //
    //    //var send_data = {
    //    //    typ: 'statistik',
    //    //    data: {
    //    //        user: scope.setup.user_id,
    //    //        os: SGI.os
    //    //    }
    //    //};
    //    //
    //    //var client = new net.Socket();
    //    //client.connect(SGI.HOST_PORT, SGI.HOST, function () {
    //    //    client.write(JSON.stringify(send_data));
    //    //    client.end()
    //    //});
    //    //
    //    //client.on('data', function (data) {
    //    //    if (data != "error") {
    //    //
    //    //        scope.setup.last_open = (new Date).toLocaleDateString();
    //    //        scope.$apply();
    //    //        SGI.save_setup();
    //    //
    //    //    }
    //    //    client.destroy();
    //    //});
    //
    //
    //}
});

