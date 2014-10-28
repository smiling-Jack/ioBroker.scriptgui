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

            fs.readFile(nwDir + '/datastore/connections/' + name + '.json', function (err, data) {
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

                                    // TODO Ist da hier wirklich richtig oder doch eher direkt nach dem laden ?
                                    var name = $("#inp_con_ip").val().replace(":", "port");
                                    fs.writeFile(nwDir + '/datastore/connections/' + name + '.json', JSON.stringify(homematic), function (err) {
                                        if (err){
                                            throw err;
                                        }else{
                                            SGI.con_files = [];
                                            try {
                                                $.each(fs.readdirSync(nwDir + '/datastore/connections/'), function () {
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
    }
});

