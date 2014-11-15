/**
 * Created by jack on 17.08.2014.
 */

var homematic = {
    uiState: {"_65535": {"Value": null}},
    regaIndex: {},
    regaObjects: {}
};

jQuery.extend(true, SGI, {

    setup_socket: function () {
        SGI.socket = io.connect(null, {'force new connection': true});

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
//        $("#inp_con_ip").unbind("change")
    },

    offline: function () {
        try {

            var name = $("#inp_con_ip").val().replace(":", "port");

            fs.readFile(scope.setup.datastore + '/ScriptGUI_Data/connections/' + name + '.json', function (err, data) {
                if (!err) {

                    homematic = JSON.parse(data);
                    $("#img_con_state").attr("src", "img/icon/flag-yellow.png");
                    $("#btn_con_offline").parent().addClass("div_img_glass_on");
                    $("#btn_con_online").parent().removeClass("div_img_glass_on");
                    SGI.con_data = true;
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
            });
        }
        catch (err) {

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

    online: function () {
        try {
            var _url = $("#inp_con_ip").val();
            var url = "";
            if ( _url.split(".")[0] == "s" || _url.split(".")[0] == "S" ){
                if (_url.split(":").length < 2) {
                    url = "https://" + _url.replace("s.","") + ":8443";
                } else {
                    url = "https://" + _url.replace("s.","") ;
                }
            }else{
                if (_url.split(":").length < 2) {
                    url = "http://" + _url + ":8080";
                } else {
                    url = "http://" + _url;
                }
            }


            $("#img_con_state").attr("src", "img/icon/flag-blue.png");

             $.ajax({
                url: url + "/auth/auth.js",
                type: "GET",
                dataType: "text"
            })
            .done(function( data ) {
                console.log( data );
            })
            .fail(function( jqXHR, textStatus ) {
                console.log( textStatus);
            });

            $.get(url + "/auth/auth.js", function (data) {
                var socketSession_id = data.split('\'')[1];

                SGI.socket = io.connect(url + "?key=" + socketSession_id, {'force new connection': true});

                SGI.socket.on("connect", function (err) {

                    SGI.socket.emit("getSettings", function (data) {
                        if (data.basedir.split("/")[2] == "ccu.io") {
                            $("#img_set_script_engine").show();
                            $("#img_con_state").attr("title", "CCU.IO<br> Version: " + data.version + "<br>Scriptengine: " + data.scriptEngineEnabled);
                        }
                        SGI.socket.emit("getIndex", function (index) {
                            homematic.regaIndex = index;
                            SGI.socket.emit("getObjects", function (obj) {
                                homematic.regaObjects = obj;
                                SGI.socket.emit("getDatapoints", function (data) {

                                    for (var dp in data) {
                                        homematic.uiState["_" + dp] = { Value: data[dp][0], Timestamp: data[dp][1], LastChange: data[dp][3]};
                                    }

                                    // TODO Ist das hier wirklich richtig oder doch eher direkt nach dem laden ?
                                    var name = $("#inp_con_ip").val().replace(":", "port");
                                    fs.writeFile(scope.setup.datastore + '/ScriptGUI_Data/connections/' + name + '.json', JSON.stringify(homematic), function (err) {
                                        if (err){
                                            throw err;
                                        }else{
                                            SGI.con_files = [];
                                            try {
                                                $.each(fs.readdirSync(scope.setup.datastore + '/ScriptGUI_Data/connections/'), function () {
                                                    var con_name = this.split(".json")[0];
                                                    con_name = con_name.replace("port", ":");
                                                    SGI.con_files.push(con_name)
                                                });
                                            }
                                            catch (e) {
                                            }
                                            $("#inp_con_ip").xs_combo("setData", SGI.con_files);
                                            $("#btn_con_offline").parent().show()
                                        }
                                    });

                                    SGI.socket.on('event', function (obj) {
                                        if (homematic.uiState["_" + obj[0]] !== undefined) {
                                            var o = {};
                                            o["_" + obj[0] + ".Value"] = obj[1];
                                            o["_" + obj[0] + ".Timestamp"] = obj[2];
                                            o["_" + obj[0] + ".Certain"] = obj[3];
                                            homematic.uiState["_" + obj[0]] = o;

                                        }
                                        $(document).triggerHandler("new_data",{id:obj[0],value:obj[1],timestamp:obj[2],certain:obj[3],lasttimestamp:obj[4]});

                                    });


                                    SGI.con_data = true;
                                    $("#img_con_state").attr("src", "img/icon/flag-green.png");

                                });
                            });
                        });
                    });
                });
                SGI.socket.on("error", function (err) {
                    alert("fehler");
                    SGI.disconnect();
                    SGI.offline();
                });

                SGI.socket.on('disconnect', function () {
                    $("#img_con_state").attr("src", "img/icon/flag-red.png");
                    $("#img_set_script_engine").hide();
                    $("#img_con_state").attr(" ");

                });


                $("#btn_con_online").parent().addClass("div_img_glass_on");
                $("#btn_con_offline").parent().removeClass("div_img_glass_on")
            })

                .fail(function (err) {
                    throw err
                });


        }
        catch (err) {
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

    server_error: function(error){
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

    server_register: function(){
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
            console.log(err)
        }

    },

    server_homecall: function(){

        var send_data = {
            typ: 'statistik',
            data: {
                user: scope.setup.user_id,
                os: SGI.os
            }
        };

        var client = new net.Socket();
        client.connect(SGI.HOST_PORT, SGI.HOST, function () {
            client.write(JSON.stringify(send_data));
            client.end()
        });

        client.on('data', function (data) {
            if (data != "error") {

                scope.setup.last_open = (new Date).toLocaleDateString();
                scope.$apply();
                SGI.save_setup();

            }
            client.destroy();
        });


    },
});

