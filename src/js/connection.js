/**
 * Created by jack on 17.08.2014.
 */

var objects = {};
var states = {};

jQuery.extend(true, SGI, {

    setup_socket: function () {
        //SGI.socket = io.connect(null, {'force new connection': true});

    },

    disconnect: function () {

        if (!SGI.socket) {
            SGI.socket.disconnect()
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
        try {


            fs.readFile(scope.setup.datastore + '/ScriptGUI_Data/connections/' + url + '.json', function (err, data) {
                if (!err) {
                    //console.log(data)
                    homematic = JSON.parse(data);
                    //console.log(homematic)
                    $("#img_con_state").attr("src", "img/icon/flag-yellow.png");
                    $("#btn_con_offline").parent().addClass("div_img_glass_on");
                    $("#btn_con_online").parent().removeClass("div_img_glass_on");
                    SGI.con_data = true;

                    $("#run_step, #run_type1, #img_set_script_play ,#img_set_script_stop").button({disabled: false});
                } else {
                    alert(err)
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
                }
                $('body').css("cursor", "default");
            });
        }
        catch (err) {
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
        }

    },

    online: function (__url) {
        //try {
        var _url = $("#inp_con_ip").val();
        var url = "";
        if (__url) {
            url = __url;
        } else {
            if (_url.split(":").length < 2) {
                url = "http://" + _url + ":8080";
            } else {
                url = "http://" + _url;
            }
        }


        $("#img_con_state").attr("src", "img/icon/flag-blue.png");

        if (scope.setup.last_con != url || scope.setup.con_type != "online") {
            scope.setup.last_con = url;
            scope.setup.con_type = "online";
            scope.$apply();
            SGI.save_setup()
        }

        console.log(url)

        $.get(url + "/_socket/info.js", function (data) {
            eval(data)
            console.log(data)


            servConn.init({connLink: "http:"+ url.split(":")[1] + socketUrl }, {
                onConnChange: function (isConnected, isSecure) {
                    console.log(isConnected)
                    servConn.getVersion(function (v) {
                        console.log(v)
                    });

                    servConn.getStates("*", function (error, data) {
                        states = data;
                        servConn.getObjects(function (err, data) {
                            objects = data;


                            // make fancytree
                            //var _tree = {};
                            //                           var last ="";
                            //                           $.each(objects,function(){
                            //                               var ids = this._id.split(".")
                            //
                            //                               last ="";
                            //                               $.each(ids, function(){
                            //                                   if(eval("_tree"+last+"['"+this+"']") == undefined){
                            //                                       eval("_tree"+last+"['"+this+"'] = {}")
                            //                                   }
                            //                                   last = last + "['"+this+"']"
                            //                               });
                            //
                            //                           })
                            //
                            //                           $.each(states, function(id){
                            //                               var _id = "['"+ id.replace(/\./g,"']['") + "']"
                            //                               var that = this
                            //                              console.log(this)
                            //                               console.log()
                            //                               eval("_tree"+_id.toString()+" = that ")
                            //                           })
                            //
                            //                           console.log(_tree)


                            $.each(objects, function (id) {
                                var ids = id.split(".")
                                var last = "editor"
                                if (this.type != "enum")
                                    for (var i = 0; ids.length - 1 > i; i++) {

                                        var _id = last + "_" + ids[i];
                                        var icon= "";
                                        if(ids[1] == "adapter" && i == 2){
                                            icon ="data-icon= 'img/adapter/"+ids[i]+".png'"
                                        }

                                        if ($("#oid_" + _id).length == 0) {
                                            $("#oid_" + last + "_ul").append("<li id='oid_" + _id + "' class='folder' "+icon+">" + ids[i] + "<ul id='oid_" + _id + "_ul'></ul></li>")
                                        }
                                        last = _id;
                                    }
                            })

                            $.each(states, function (id) {
                                var ids = id.split(".")
                                var _id = ids.pop();
                                $("#oid_editor_" + ids.join("_") + "_ul").append("<li data-oid='"+id+"' id='oid_" + ids.join("_") + "_" + _id + "'><span calss='oid_titel'>" + _id + " <div data-oid='"+id+"' class='oid_add'> </div><input class='oid_val' size=10 value='" + this.val + "'/></span></li>")

                            })
                            $("#editor_oid").fancytree();

                            $("#editor_oid").on('click','.oid_add',function() {
                                $(this).parent().trigger("click")
                            });
                            $("#editor_oid").on('dblclick','.oid_add',function() {
                                SGI.editor.insert($(this).data("oid"));
                            });
                        });
                    });
                },
                onRefresh: function () {

                },
                onUpdate: function (id, state) {
                },
                onAuth: function (message, salt) {
                    console.log(message)
                    console.log(salt)
                },
                onCommand: function (instance, command, data) {

                },
                onObjectChange: function (id, obj) {

                }
            });

        })
        console.log("con1")
    },

    server_error: function (error) {
        var send_data = {
            typ: "error",
            error: error,
            user: scope.user_name,
            mail: $("#inp_error_mail").val(),
            komment: $("#txt_error_comment").val(),
            prg_data: "nicht mitgesendet",
            datapoints: "nicht mitgesendet",
            os: SGI.os
        };

        if (send_data.mail == "") {
            send_data.mail = scope.user_mail;
        }


        if ($("#inp_prg_data").val() == true || $("#inp_prg_data").val() == "true") {
            send_data.prg_data = JSON.stringify({
                version: main_manifest.version,
                mbs: scope.mbs,
                fbs: scope.fbs,
                con: scope.con
            });

            send_data.datapoints = JSON.stringify(homematic);
        }


        var client = new net.Socket();
        client.connect(SGI.HOST_PORT, SGI.HOST, function () {
            client.write(JSON.stringify(send_data));
            client.end()
        });

        client.on('data', function (data) {
            if (data != "error") {
                alert("Ticketnummer: " + data)
            } else {
                alert("Daten konnten nicht gesendet werden")
            }
            client.destroy();
        });
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

