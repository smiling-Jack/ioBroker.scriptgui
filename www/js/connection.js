/**
 * Created by jack on 17.08.2014.
 */

var objects = {};
var states = {};
var web;
var iob = {
    states: {},
};

jQuery.extend(true, SGI, {

    setup_socket: function () {
        //SGI.socket = io.connect(null, {'force new connection': true});

    },

    disconnect: function () {

        if (!SGI.socket) {
            SGI.backend.disconnect()
        }

        SGI.con_data = false;

        homematic = {
            uiState: {"_65535": {"Value": null}},
            regaIndex: {},
            regaObjects: {}
        };
        $("#img_con_backend").attr("src", "img/icon/flag-red.png");
        $("#btn_con_online").parent().removeClass("div_img_glass_on");
        $("#btn_con_offline").parent().removeClass("div_img_glass_on");
        $("#img_set_script_engine").hide();


        $(".run_type,#run_step, #img_set_script_play ,#img_set_script_stop").button({disabled: true});
        $(".run_type").prop("checked", false);
        $("#run_type1").prop("checked", true);
        $(".run_type").button("refresh");
        sim.run_type = "sim";

//        $("#inp_con_ip").unbind("change")
    },

    offline: function () {


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

    },

    connect_backend: function (__url) {



        ////try {
        //var _url = $("#inp_con_ip").val();
        //var url = "";
        //if (__url) {
        //    url = __url;
        //} else {
        //    if (_url.split(":").length < 2) {
        //        url = "http://" + _url + ":8080";
        //    } else {
        //        url = "http://" + _url;
        //    }
        //}
        //
        //
        //$("#img_con_backend").attr("src", "img/icon/flag-blue.png");
        //
        //if (scope.setup.last_con != url || scope.setup.con_type != "connect_backend") {
        //    scope.setup.last_con = url;
        //    scope.setup.con_type = "connect_backend";
        //    scope.$apply();
        //    SGI.save_setup()
        //}
        //
        //console.log(url)
        //
        //$.get(url + "/_socket/info.js", function (data) {
        //    eval(data)
        //    console.log(data)
        //
        //
        //    servConn.init({connLink: "http:"+ url.split(":")[1] + socketUrl }, {
        //        onConnChange: function (isConnected, isSecure) {
        //            console.log(isConnected)
        //            servConn.getVersion(function (v) {
        //                console.log(v)
        //            });
        //
        //            servConn.getStates("*", function (error, data) {
        //                states = data;
        //                servConn.getObjects(function (err, data) {
        //                    objects = data;
        //
        //
        //                    // make fancytree
        //                    //var _tree = {};
        //                    //                           var last ="";
        //                    //                           $.each(objects,function(){
        //                    //                               var ids = this._id.split(".")
        //                    //
        //                    //                               last ="";
        //                    //                               $.each(ids, function(){
        //                    //                                   if(eval("_tree"+last+"['"+this+"']") == undefined){
        //                    //                                       eval("_tree"+last+"['"+this+"'] = {}")
        //                    //                                   }
        //                    //                                   last = last + "['"+this+"']"
        //                    //                               });
        //                    //
        //                    //                           })
        //                    //
        //                    //                           $.each(states, function(id){
        //                    //                               var _id = "['"+ id.replace(/\./g,"']['") + "']"
        //                    //                               var that = this
        //                    //                              console.log(this)
        //                    //                               console.log()
        //                    //                               eval("_tree"+_id.toString()+" = that ")
        //                    //                           })
        //                    //
        //                    //                           console.log(_tree)
        //
        //
        //                    $.each(objects, function (id) {
        //                        var ids = id.split(".")
        //                        var last = "editor"
        //                        if (this.type != "enum")
        //                            for (var i = 0; ids.length - 1 > i; i++) {
        //
        //                                var _id = last + "_" + ids[i];
        //                                var icon= "";
        //                                if(ids[1] == "adapter" && i == 2){
        //                                    icon ="data-icon= 'img/adapter/"+ids[i]+".png'"
        //                                }
        //
        //                                if ($("#oid_" + _id).length == 0) {
        //                                    $("#oid_" + last + "_ul").append("<li id='oid_" + _id + "' class='folder' "+icon+">" + ids[i] + "<ul id='oid_" + _id + "_ul'></ul></li>")
        //                                }
        //                                last = _id;
        //                            }
        //                    })
        //
        //                    $.each(states, function (id) {
        //                        var ids = id.split(".")
        //                        var _id = ids.pop();
        //                        $("#oid_editor_" + ids.join("_") + "_ul").append("<li data-oid='"+id+"' id='oid_" + ids.join("_") + "_" + _id + "'><span calss='oid_titel'>" + _id + " <div data-oid='"+id+"' class='oid_add'> </div><input class='oid_val' size=10 value='" + this.val + "'/></span></li>")
        //
        //                    })
        //                    $("#editor_oid").fancytree();
        //
        //                    $("#editor_oid").on('click','.oid_add',function() {
        //                        $(this).parent().trigger("click")
        //                    });
        //                    $("#editor_oid").on('dblclick','.oid_add',function() {
        //                        SGI.editor.insert($(this).data("oid"));
        //                    });
        //                });
        //            });
        //        },
        //        onRefresh: function () {
        //
        //        },
        //        onUpdate: function (id, state) {
        //        },
        //        onAuth: function (message, salt) {
        //            console.log(message)
        //            console.log(salt)
        //        },
        //        onCommand: function (instance, command, data) {
        //
        //        },
        //        onObjectChange: function (id, obj) {
        //
        //        }
        //    });
        //
        //})
        console.log("con1")

        if (!$.fn.selectId) {
            $("head").append('<script type="text/javascript" src="js/lib/socket.io_10.js"></script>');
        }


        SGI.backend = io.connect("127.0.0.1:3000", {'force new connection': false});
        $("#img_con_backend").attr("src", "img/icon/flag-blue.png");
        SGI.backend.on("connect", function (err) {
            console.log("connect")
            $("#img_set_script_play,#run_type1,#run_type2,#run_type3,#run_step").button({disabled: false});
            $("#img_con_backend").attr("src", "img/icon/flag-green.png");

            $('window').unload(function () {
                SGI.backend.disconnect()
            });


        });
        SGI.backend.on('disconnect', function () {
            SGI.offline()
        });


        //SGI.backend.emit("next");


        SGI.backend.on("trigger_highlight", function (baustein) {
            sim.trigger_highlight(baustein);
            //SGI.backend.emit("next");
        })
        SGI.backend.on("step_fbs_highlight", function (baustein) {
            sim.step_fbs_highlight(baustein)
            //SGI.backend.emit("next");
        })
        SGI.backend.on("step_mbs_highlight_in", function (baustein) {
            sim.step_mbs_highlight_in(baustein)
            //SGI.backend.emit("next");
        })
        SGI.backend.on("step_mbs_highlight_out", function (baustein) {
            sim.step_mbs_highlight_out(baustein)
            //SGI.backend.emit("next");
        })
        SGI.backend.on("step_mbs_highlight_reset", function (baustein) {
            sim.step_mbs_highlight_reset(baustein)
            //SGI.backend.emit("next");
        })
        SGI.backend.on("brake", function (data) {
            console.log(data.sourceLine)

            SGI.set_mark(data.sourceLine)

            $(".img_debug").button({disabled: false});
        })
        SGI.backend.on("connect", function (err) {
        })
        SGI.backend.on("connect", function (err) {
        })
        SGI.backend.on("connect", function (err) {
        })
        SGI.backend.on("connect", function (err) {
        })

        SGI.backend.on("sim_exit", function (err) {
            sim_exit();
        });
        SGI.backend.on("message", function (data) {
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

        SGI.backend.on("_log", function (data) {
            console.log("---------- Log from backend -----------");
            console.log(data);
        })
        SGI.backend.on("_jlog", function (data) {
            console.log("---------- jLog from backend -----------");
            try {
                console.log(JSON.parse(data));
            } catch (err) {
                console.log(err)
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

                        console.log(doc)
                        // assemble global script
                        for (var g = 0; g < doc.rows.length; g++) {
                            main.objects[doc.rows[g].value._id] = doc.rows[g].value;
                        }


                        console.log(main.objects)
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
                                            } else if (data[id].common.engineType == "GUI") {
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
                                        that.main.socket.emit('extendObject', id, {
                                            common: {
                                                enabled: !(data[id] && data[id].common && data[id].common.enabled)
                                            }
                                        }, function (err) {
                                            if (err) {
                                                that.main.showError(err);
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
                                        if (!data[id] || data[id].type !== 'script') {
                                            deleteId(id);
                                        } else {
                                            that.main.confirmMessage(('Are you sure to delete script %s?', data[id].common.name), null, 'help', function (result) {
                                                if (result) that.main.socket.emit('delObject', id);
                                            });
                                        }
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
                                        that.main.socket.emit('getObject', id, function (err, obj) {
                                            if (err) {
                                                that.main.showError(err);
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
                                            that.main.socket.emit('setObject', newId, obj, function (err, obj) {
                                                if (err) {
                                                    that.main.showError(err);
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
                                        var group = that.currentId || 'script.js';
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
                                        addScriptInGroup(that.currentId);
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
                                    if (err) return that.main.showError(err);

                                    _obj.common.engine = 'system.adapter.javascript.' + newValue;
                                    main.socket.emit('setObject', _obj._id, _obj, function (err) {
                                        if (err) that.main.showError(err);
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

    server_error: function (error) {
        //todo speicher error in log datei
        //var send_data = {
        //    typ: "error",
        //    error: error,
        //    user: scope.user_name,
        //    mail: $("#inp_error_mail").val(),
        //    komment: $("#txt_error_comment").val(),
        //    prg_data: "nicht mitgesendet",
        //    datapoints: "nicht mitgesendet",
        //    os: SGI.os
        //};
        //
        //if (send_data.mail == "") {
        //    send_data.mail = scope.user_mail;
        //}
        //
        //
        //if ($("#inp_prg_data").val() == true || $("#inp_prg_data").val() == "true") {
        //    send_data.prg_data = JSON.stringify({
        //        version: main_manifest.version,
        //        mbs: scope.mbs,
        //        fbs: scope.fbs,
        //        con: scope.con
        //    });
        //
        //    send_data.datapoints = JSON.stringify(homematic);
        //}
        //
        //
        //var client = new net.Socket();
        //client.connect(SGI.HOST_PORT, SGI.HOST, function () {
        //    client.write(JSON.stringify(send_data));
        //    client.end()
        //});
        //
        //client.on('data', function (data) {
        //    if (data != "error") {
        //        alert("Ticketnummer: " + data)
        //    } else {
        //        alert("Daten konnten nicht gesendet werden")
        //    }
        //    client.destroy();
        //});
    },

    server_register: function () {
        try {
            if (scope.setup.user_mail == "" || scope.setup.user_mail == undefined) {
                $("body").append('\
                <div id="dialog_register" style="text-align: center" title="' + SGI.translate("Register") + '">\
                <img src="./img/logo.png" style="width: 300px"/><br><br>\
                <div style="font-size: 20px; font-weight: 900;">' + SGI.translate("register_info") + '</div><br><br>\
                <div style="width: 80px; display: inline-block;text-align: left">' + SGI.translate("Name:") + '  </div><input id="inp_register_name" style="width: 300px" type="text"/><br>\
                <div style="width: 80px; display: inline-block;text-align: left">' + SGI.translate("E-Mail:") + '</div><input id="inp_register_mail" style="width: 300px" type="text"/><br><br>\
                <button id="btn_register">' + SGI.translate("register") + '</button>\
                   </div>');

                $("#dialog_register").dialog({
                    width: "auto",
                    dialogClass: "update",
                    modal: true,
                    close: function () {
                        $("#dialog_register").remove();
                    }
                });

                $("#btn_register").button().click(function () {

                    var send_data = {
                        typ: "register",
                        data: {
                            name: $("#inp_register_name").val(),
                            mail: $("#inp_register_mail").val(),
                            os: SGI.os
                        }
                    };

                    function send_to_server(data) {

                        var client = new net.Socket();
                        client.connect(SGI.HOST_PORT, SGI.HOST, function () {
                            client.write(JSON.stringify(send_data));

                        });

                        client.on('data', function (data) {
                            if (data != "error") {
                                scope.setup.user_name = send_data.data.name;
                                scope.setup.user_mail = send_data.data.mail;
                                scope.$apply();
                                $("#dialog_register").dialog("close")
                            } else {
                                alert("Daten konnten nicht gesendet werden. Bitte überprüfen sie ihre Internetverbindung")
                            }
                            client.destroy();
                        });
                    }

                    if (send_data.data.mail == "" || send_data.data.mail == undefined) {
                        getmac.getMac(function (err, macAddress) {
                            if (err)  throw err;
                            send_data.data.mail = macAddress;
                            send_to_server(send_data)
                        })
                    } else {
                        send_to_server(send_data)
                    }
                });
            }
        } catch (err) {
            console.log("register nicht möglich");
        }

    },

    server_homecall: function () {
        //
        //var send_data = {
        //    typ: 'statistik',
        //    data: {
        //        user: scope.setup.user_id,
        //        os: SGI.os
        //    }
        //};
        //
        //var client = new net.Socket();
        //client.connect(SGI.HOST_PORT, SGI.HOST, function () {
        //    client.write(JSON.stringify(send_data));
        //    client.end()
        //});
        //
        //client.on('data', function (data) {
        //    if (data != "error") {
        //
        //        scope.setup.last_open = (new Date).toLocaleDateString();
        //        scope.$apply();
        //        SGI.save_setup();
        //
        //    }
        //    client.destroy();
        //});


    }
});

