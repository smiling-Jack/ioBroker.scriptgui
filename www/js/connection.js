/**
 * Created by jack on 17.08.2014.
 */

var objects = {};
var states = {};

var vis ={
    states: {},
}

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
        $("#img_con_state").attr("src", "img/icon/flag-red.png");
        $("#btn_con_online").parent().removeClass("div_img_glass_on");
        $("#btn_con_offline").parent().removeClass("div_img_glass_on");
        $("#img_set_script_engine").hide();
        $("#img_con_state").attr("title", "");

        $(".run_type,#run_step, #img_set_script_play ,#img_set_script_stop").button({disabled: true});
        $(".run_type").prop("checked", false);
        $("#run_type1").prop("checked", true);
        $(".run_type").button("refresh");
        sim.run_type = "sim";

//        $("#inp_con_ip").unbind("change")
    },

    offline: function (_url) {
        var url = $("#inp_con_ip").val().replace(":", "port");

        if (_url) {
            url = _url
        }


        if (scope.setup.last_con != url || scope.setup.con_type != "offline") {
            scope.setup.last_con = url;
            scope.setup.con_type = "offline";
            scope.$apply();
            SGI.save_setup()
        }
        $('body').css("cursor", "wait");
        //try {
        //
        //
        //    fs.readFile(scope.setup.datastore + '/ScriptGUI_Data/connections/' + url + '.json', function (err, data) {
        //        if (!err) {
        //            //console.log(data)
        //            homematic = JSON.parse(data);
        //            //console.log(homematic)
        //            $("#img_con_state").attr("src", "img/icon/flag-yellow.png");
        //            $("#btn_con_offline").parent().addClass("div_img_glass_on");
        //            $("#btn_con_online").parent().removeClass("div_img_glass_on");
        //            SGI.con_data = true;
        //
        //            $("#run_step, #run_type1, #img_set_script_play ,#img_set_script_stop").button({disabled: false});
        //        } else {
        //            alert(err)
        //            $("#img_con_state").attr("src", "img/icon/flag-red.png");
        //            $("#btn_con_offline").parent().removeClass("div_img_glass_on");
        //            $("#btn_con_online").parent().removeClass("div_img_glass_on");
        //            homematic = {
        //                uiState: {"_65535": {"Value": null}},
        //                regaIndex: {},
        //                regaObjects: {}
        //            };
        //
        //            SGI.con_data = false;
        //            throw err
        //        }
        //        $('body').css("cursor", "default");
        //    });
        //}
        //catch (err) {
            $('body').css("cursor", "default");
            $("#img_con_state").attr("src", "img/icon/flag-red.png");
            $("#btn_con_offline").parent().removeClass("div_img_glass_on");
            $("#btn_con_online").parent().removeClass("div_img_glass_on");

            homematic = {
                uiState: {"_65535": {"Value": null}},
                regaIndex: {},
                regaObjects: {}
            };
            SGI.con_data = false;
            throw err
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
        //$("#img_con_state").attr("src", "img/icon/flag-blue.png");
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

        SGI.backend = io.connect("127.0.0.1:3000", {'force new connection': false});
        $("#img_con_state").attr("src", "img/icon/flag-blue.png");
       SGI.backend.on("connect", function (err) {
            console.log("connect")
            $("#img_set_script_play,#run_type1,#run_type2,#run_type3,#run_step").button({disabled: false});
            $("#img_con_state").attr("src", "img/icon/flag-green.png");

           $('window').unload(function() {
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
       SGI.backend.on("connect", function (err) {})
       SGI.backend.on("connect", function (err) {})
       SGI.backend.on("connect", function (err) {})
       SGI.backend.on("connect", function (err) {})

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

        SGI.connect_iobroker();
    },

    connect_iobroker: function (){
        vis.conn = servConn;

        vis.conn.init(null, {
            mayReconnect: null,
            onConnChange: function (isConnected) {
                //console.log("onConnChange isConnected="+isConnected);
                if (isConnected) {
                    //$('#server-disconnect').dialog('close');
                    if (vis.isFirstTime) {
                        vis.conn.getVersion(function (version) {
                            if (version) {
                                if (compareVersion(version, vis.requiredServerVersion)) {
                                    vis.showMessage(_('Warning: requires Server version %s - found Server version %s - please update Server.',  vis.requiredServerVersion, version));
                                }
                            }
                            //else {
                            // Possible not authenticated, wait for request from server
                            //}
                        });


                    }


                        // Read all states from server
                        vis.conn.getStates(vis.editMode ? null: vis.IDs, function (error, data) {
                            if (error) {
                             console.log(error);
                            }
                            if (data) {
                                for (var id in data) {
                                    var obj = data[id];
                                    if (!obj) continue;

                                    try {

                                            vis.states[id + '.val'] = obj.val;
                                            vis.states[id + '.ts']  = obj.ts;
                                            vis.states[id + '.ack'] = obj.ack;
                                            vis.states[id + '.lc']  = obj.lc;
                                            if (obj.q !== undefined) vis.states[id + '.q'] = obj.q;

                                    } catch (e) {
                                      console.log('Error: can\'t create states object for ' + id + '(' + e + ')');
                                    }


                                }
                            }



                            if (error) {
                                console.log('Possibly not authenticated, wait for request from server');
                                // Possibly not authenticated, wait for request from server
                            } else {
                                // Get groups info
                                //vis.conn.getGroups(function (err, groups) {
                                //    vis.userGroups = groups || {};
                                //    // Get Server language
                                //    vis.conn.getConfig(function (err, config) {
                                //        systemLang = vis.args.lang || config.language || systemLang;
                                //        vis.language = systemLang;
                                //        vis.dateFormat = config.dateFormat;
                                //        vis.isFloatComma = config.isFloatComma;
                                //        translateAll();
                                //        if (vis.isFirstTime) {
                                //            // Init edit dialog
                                //            if (vis.editMode && vis.editInit) vis.editInit();
                                //            vis.isFirstTime = false;
                                //            vis.init();
                                //        }
                                //    });
                                //});

                                // If metaIndex required, load it
                                //if (vis.editMode) {
                                //    /* socket.io */
                                //    if (vis.isFirstTime) vis.showWaitScreen(true, _('Loading data objects...'), null, 20);

                                    // Read all data objects from server
                                    vis.conn.getObjects(function (err, data) {
                                        vis.objects = data;
                                        // Detect if objects are loaded
                                        for (var ob in data) {
                                            vis.objectSelector = true;
                                            break;
                                        }
                                        //if (vis.editMode && vis.objectSelector) {
                                        //    vis.inspectWidgets(true);
                                        //}
                                    });
                                //}

                                //console.log((new Date()) + " socket.io reconnect");
                                //if (vis.isFirstTime) {
                                //    setTimeout(function () {
                                //        if (vis.isFirstTime) {
                                //            // Init edit dialog
                                //            if (vis.editMode && vis.editInit) vis.editInit();
                                //            vis.isFirstTime = false;
                                //            vis.init();
                                //        }
                                //    }, 1000);
                                //}
                            }
                        });

                } else {
                    //console.log((new Date()) + " socket.io disconnect");
                    //$('#server-disconnect').dialog('open');
                }
            },
            onRefresh:    function () {
                window.location.reload();
            },
            onUpdate:     function (id, state) {

            },
            onAuth:       function (message, salt) {
                if (vis.authRunning) {
                    return;
                }
                vis.authRunning = true;
                var users;
                if (visConfig.auth.users && visConfig.auth.users.length) {
                    users = '<select id="login-username" value="' + visConfig.auth.users[0] + '" class="login-input-field">';
                    for (var z = 0; z < visConfig.auth.users.length; z++) {
                        users += '<option value="' + visConfig.auth.users[z] + '">' + visConfig.auth.users[z] + '</option>';
                    }
                    users += '</select>';
                } else {
                    users = '<input id="login-username" value="" type="text" autocomplete="on" class="login-input-field" placeholder="' + _('User name') + '">';
                }

                var text = '<div id="login-box" class="login-popup" style="display:none">' +
                    '<div class="login-message">' + message + '</div>' +
                    '<div class="login-input-field">' +
                    '<label class="username">' +
                    '<span class="_">' + _('User name') + '</span>' +
                    users +
                    '</label>' +
                    '<label class="password">' +
                    '<span class="_">' + _('Password') + '</span>' +
                    '<input id="login-password" value="" type="password" class="login-input-field" placeholder="' + _('Password') + '">' +
                    '</label>' +
                    '<button class="login-button" type="button"  class="_">' + _('Sign in') + '</button>' +
                    '</div>' +
                    '</div>';

                // Add the mask to body
                $('body')
                    .append(text)
                    .append('<div id="login-mask"></div>');

                var loginBox = $('#login-box');

                //Fade in the Popup
                $(loginBox).fadeIn(300);

                //Set the center alignment padding + border see css style
                var popMargTop = ($(loginBox).height() + 24) / 2;
                var popMargLeft = ($(loginBox).width() + 24) / 2;

                $(loginBox).css({
                    'margin-top': -popMargTop,
                    'margin-left': -popMargLeft
                });

                $('#login-mask').fadeIn(300);
                // When clicking on the button close or the mask layer the popup closed
                $('#login-password').keypress(function (e) {
                    if (e.which == 13) {
                        $('.login-button').trigger('click');
                    }
                });
                $('.login-button').bind('click', function () {
                    var user = $('#login-username').val();
                    var pass = $('#login-password').val();
                    $('#login_mask , .login-popup').fadeOut(300, function () {
                        $('#login-mask').remove();
                        $('#login-box').remove();
                    });
                    setTimeout(function () {
                        vis.authRunning = false;
                        console.log('user ' + user + ', ' + pass + ' ' + salt);
                        vis.conn.authenticate(user, pass, salt);
                    }, 500);
                    return true;
                });
            },
            onCommand:    function (instance, command, data) {
                var parts;
                if (!instance || (instance != vis.instance && instance != 'FFFFFFFF' && instance.indexOf('*') === -1)) return false;
                if (command) {
                    if (vis.editMode && command !== 'tts' && command !== 'playSound') return;
                    // external Commands
                    switch (command) {
                        case 'alert':
                            parts = data.split(';');
                            vis.showMessage(parts[0], parts[1], parts[2]);
                            break;
                        case 'changedView':
                            // Do nothing
                            return false;
                        case 'changeView':
                            parts = data.split('/');
                            //if (parts[1]) {
                            // Todo switch to desired project
                            //}
                            vis.changeView(parts[1] || parts[0]);
                            break;
                        case 'refresh':
                        case 'reload':
                            setTimeout(function () {
                                window.location.reload();
                            }, 1);
                            break;
                        case 'dialog':
                        case 'dialogOpen':
                            $('#' + data + '_dialog').dialog('open');
                            break;
                        case 'dialogClose':
                            $('#' + data + '_dialog').dialog('close');
                            break;
                        case 'popup':
                            window.open(data);
                            break;
                        case 'playSound':
                            setTimeout(function () {
                                var href;
                                if (data.match(/^http(s)?:\/\//)) {
                                    href = data;
                                } else {
                                    href = location.protocol + '//' + location.hostname + ':' + location.port + data;
                                }
                                // force read from server
                                href += '?' + (new Date()).getTime();

                                if (typeof Audio != 'undefined') {
                                    var snd = new Audio(href); // buffers automatically when created
                                    snd.play();
                                } else {
                                    if (!$('#external_sound').length) {
                                        $('body').append('<audio id="external_sound"></audio>');
                                    }
                                    $('#external_sound').attr('src', href);
                                    document.getElementById('external_sound').play();
                                }
                            }, 1);
                            break;
                        case 'tts':
                            if (typeof app !== 'undefined') {
                                app.tts(data);
                            }
                            break;
                        default:
                            vis.conn.logError('unknown external command ' + command);
                    }
                }

                return true;
            },
            onObjectChange: function(id, obj) {
                if (!vis.objects || !vis.editMode) return;
                if (obj) {
                    vis.objects[id] = obj;
                } else {
                    if (vis.objects[id]) delete vis.objects[id];
                }

                if ($.fn.selectId) $.fn.selectId('objectAll', id, obj);
            },
            onError:      function (err) {
                if (err.arg == 'vis.0.control.instance' || err.arg == 'vis.0.control.data' || err.arg == 'vis.0.control.command') {
                    console.warn('Cannot set ' + err.arg + ', because of insufficient permissions');
                } else {
                    vis.showMessage(_('Cannot execute %s for %s, because of insufficient permissions', err.command, err.arg), _('Insufficient permissions'), 'alert', 600);
                }
            }
        });

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

