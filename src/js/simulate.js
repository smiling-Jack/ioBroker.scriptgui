/**
 * Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 * Lizenz: [CC BY-NC 3.0](http://creativecommons.org/licenses/by-nc/3.0/de/)
 */

var sim = {
    regaObjects: [],
    regaIndex: [],
    datapoints: [],
    util:           require('util'),
    scheduler:      require('node-schedule'),
    suncalc:        require('suncalc'),
    subscribers: [],
    schedules: [],



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

    stopsim: function () {
        if (SGI.sim_run == true) {


            $("#img_set_script_stop").stop(true, true).effect({
                effect: "highlight",
                complete: function () {


                    $("*").finish();

                    window.clearAllTimeouts();
                    window.clearAllIntervals();

                    $.each($("#sim_output").children(), function () {
                        $(this).remove();
                    });
                    $.each(SGI.plumb_inst, function () {

                        var con = this.getAllConnections();

                        $.each(con, function () {
                            this.removeOverlay("sim")
                        });
                    });


                    SGI.sim_run = false;

                }
            });

            $("#prg_panel").find("select, input:not(.force_input)").each(function () {
                $(this).removeAttr('disabled');
            });
            $(".error_fbs").removeClass("error_fbs");

            $("#img_set_script_play").attr("src", "img/icon/play.png");

            $(".btn_min_trigger").unbind("click");
            $(".btn_min_trigger").attr("src", "img/icon/bullet_toggle_minus.png");
            $(".btn_min_trigger").css({
                height: "10px",
                top: 3,
                width: "10px"
            });
            $(document).unbind("new_data");
            $(".fbs, .mbs").show();
        }
    },

    simulate: function (target) {

        if (!SGI.sim_run) {
            var scope = angular.element($('body')).scope();
            var that = this;
            sim.regaObjects = homematic.regaObjects;
            sim.regaIndex = homematic.regaIndex;
            sim.datapoints = homematic.uiState;


            $(document).bind("new_data", function (event, data) {
                var obj = [data.id, data.value, data.timestamp, data.certain, data.lasttimestamp];

                var o = {};
                o["_" + data.id + ".Value"] = data.value;
                o["_" + data.id + ".Timestamp"] = data.timestamp;
                o["_" + data.id + ".Certain"] = data.certain;
                sim.datapoints["_" + data.id] = o;


                if (!obj) {
                    return;
                }
                var id = obj[0];

                var name,
                    parent,
                    channelName,
                    deviceName,
                    channelType,
                    deviceType,
                    rooms = [],
                    funcs = [],
                    roomNames = [],
                    funcNames = [];


                if (sim.regaObjects[id]) {
                    name = sim.regaObjects[id].Name;
                    parent = sim.regaObjects[id].Parent;
                }

                if (parent) {

                    channelName = sim.regaObjects[parent].Name;
                    channelType = sim.regaObjects[parent].HssType;

                    // Räume finden
                    var roomIndex = sim.regaIndex.ENUM_ROOMS;
                    for (var i = 0; i < roomIndex.length; i++) {
                        var room = roomIndex[i];
                        if (sim.regaObjects[room].Channels.indexOf(parent) != -1) {
                            rooms.push(room);
                            roomNames.push(sim.regaObjects[room].Name);
                        }
                    }

                    // Gewerke finden
                    var funcIndex = sim.regaIndex.ENUM_FUNCTIONS;
                    for (var i = 0; i < funcIndex.length; i++) {
                        var func = funcIndex[i];
                        if (sim.regaObjects[func].Channels.indexOf(parent) != -1) {
                            funcs.push(func);
                            funcNames.push(sim.regaObjects[func].Name);
                        }
                    }

                    // Gerät
                    var device = sim.regaObjects[parent].Parent;
                    deviceName = (sim.regaObjects[device] ? sim.regaObjects[device].Name : undefined);
                    deviceType = (sim.regaObjects[device] ? sim.regaObjects[device].HssType : undefined);

                }


                var oldObj = sim.datapoints[id];

                if (!oldObj) {
                    oldObj = [];
                }

                sim.datapoints[id] = [obj[1], obj[2], obj[3], obj[4]];

                var eventObj = {
                    id: id,
                    name: name,
                    newState: {
                        value: obj[1],
                        timestamp: obj[2],
                        ack: obj[3],
                        lastchange: obj[4]
                    },
                    oldState: {
                        value: oldObj[0],
                        timestamp: oldObj[1],
                        ack: oldObj[2],
                        lastchange: oldObj[3]
                    },
                    channel: {
                        id: parent,
                        name: channelName,
                        type: channelType,
                        funcIds: funcs,
                        roomIds: rooms,
                        funcNames: funcNames,
                        roomNames: roomNames
                    },
                    device: {
                        id: device,
                        name: deviceName,
                        type: deviceType
                    }

                };


                var length = that.subscribers.length;

                for (var i = 0; i < length; i++) {

                    if (patternMatching(eventObj, sim.subscribers[i].pattern)) {
                        console.log("x")
                        //$("#" + scope.mbs[sim.subscribers[i].mbs_nr].mbs_id).children().effect("highlight", {color: "green"}, 800);
                        sim.subscribers[i].callback(eventObj);
                    }

                }

            });

            $(".fbs, .mbs").hide();
            $("#img_set_script_play").attr("src", "img/icon/playing.png");
            $(".btn_min_trigger").attr("src", "img/icon/start.png");
            $(".btn_min_trigger").css({
                height: "15px",
                top: 0,
                width: "15px"
            });

            $("#prg_panel").find("select,button, input:not(.force_input)").each(function () {
                $(this).attr({
                    'disabled': 'disabled'
                });
            });

            function patternMatching(event, pattern) {
                if (!pattern.logic) {
                    pattern.logic = "and";
                }

                var matched = false;

                // Datapoint id matching
                if (pattern.id && pattern.id == event.id) {
                    //console.log("matched id!");
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.id) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }

                // change matching
                if (pattern.change) {
                    switch (pattern.change) {
                        case "eq":
                            if (event.newState.value == event.oldState.value) {
                                if (pattern.logic == "or") {
                                    return true;
                                }
                                matched = true;
                            } else {
                                if (pattern.logic == "and") {
                                    return false;
                                }
                            }
                            break;
                        case "ne":
                            if (event.newState.value != event.oldState.value) {
                                if (pattern.logic == "or") {
                                    return true;
                                }
                                matched = true;
                            } else {
                                if (pattern.logic == "and") {
                                    return false;
                                }
                            }
                            break;

                        case "gt":
                            if (event.newState.value > event.oldState.value) {
                                if (pattern.logic == "or") {
                                    return true;
                                }
                                matched = true;
                            } else {
                                if (pattern.logic == "and") {
                                    return false;
                                }
                            }
                            break;
                        case "ge":
                            if (event.newState.value >= event.oldState.value) {
                                if (pattern.logic == "or") {
                                    return true;
                                }
                                matched = true;
                            } else {
                                if (pattern.logic == "and") {
                                    return false;
                                }
                            }
                            break;
                        case "lt":
                            if (event.newState.value < event.oldState.value) {
                                if (pattern.logic == "or") {
                                    return true;
                                }
                                matched = true;
                            } else {
                                if (pattern.logic == "and") {
                                    return false;
                                }
                            }
                            break;
                        case "le":
                            if (event.newState.value <= event.oldState.value) {
                                if (pattern.logic == "or") {
                                    return true;
                                }
                                matched = true;
                            } else {
                                if (pattern.logic == "and") {
                                    return false;
                                }
                            }
                            break;
                    }
                }

                // Value Matching
                if (pattern.val !== undefined && pattern.val == event.newState.value) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.val !== undefined) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.valGt !== undefined && event.newState.value > pattern.valGt) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.valGt !== undefined) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.valGe !== undefined && event.newState.value >= pattern.valGe) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.valGe !== undefined) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.valLt !== undefined && event.newState.value < pattern.valLt) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.valLt !== undefined) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.valLe !== undefined && event.newState.value <= pattern.valLe) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.valLe !== undefined) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.valNe !== undefined && event.newState.value != pattern.valNe) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.valNe !== undefined) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }

                // Old-Value matching
                if (pattern.oldVal !== undefined && pattern.oldVal == event.oldState.value) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.oldVal !== undefined) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.oldValGt !== undefined && event.oldState.value > pattern.oldValGt) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.oldValGt !== undefined) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.oldValGe !== undefined && event.oldState.value >= pattern.oldValGe) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.oldValGe !== undefined) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.oldValLt !== undefined && event.oldState.value < pattern.oldValLt) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.oldValLt !== undefined) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.oldValLe !== undefined && event.oldState.value <= pattern.oldValLe) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.oldValLe !== undefined) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.oldValNe !== undefined && event.oldState.value != pattern.oldValNe) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.oldValNe !== undefined) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }

                // newState.timestamp matching
                if (pattern.ts && pattern.ts == event.newState.timestamp) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.ts) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.tsGt && event.newState.timestamp > pattern.tsGt) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.tsGt) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.tsGe && event.newState.timestamp >= pattern.tsGe) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.tsGe) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.tsLt && event.newState.timestamp < pattern.tsLt) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.tsLt) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.tsLe && event.newState.timestamp <= pattern.tsLe) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.tsLe) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }

                // oldState.timestamp matching
                if (pattern.oldTs && pattern.oldTs == event.oldState.timestamp) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.oldTs) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.oldTsGt && event.oldState.timestamp > pattern.oldTsGt) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.oldTsGt) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.oldTsGe && event.oldState.timestamp >= pattern.oldTsGe) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.oldTsGe) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.oldTsLt && event.oldState.timestamp < pattern.oldTsLt) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.oldTsLt) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.oldTsLe && event.oldState.timestamp <= pattern.oldTsLe) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.oldTsLe) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }


                // newState.lastchange matching
                if (pattern.lc && pattern.lc == event.newState.lastchange) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.lc) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.lcGt && event.newState.lastchange > pattern.lcGt) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.lcGt) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.lcGe && event.newState.lastchange >= pattern.lcGe) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.lcGe) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.lcLt && event.newState.lastchange < pattern.lcLt) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.lcLt) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.lcLe && event.newState.lastchange <= pattern.lcLe) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.lcLe) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }

                // oldState.lastchange matching
                if (pattern.oldLc && pattern.oldLc == event.oldState.lastchange) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.oldLc) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.oldLcGt && event.oldState.lastchange > pattern.oldLcGt) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.oldLcGt) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.oldLcGe && event.oldState.lastchange >= pattern.oldLcGe) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.oldLcGe) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.oldLcLt && event.oldState.lastchange < pattern.oldLcLt) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.oldLcLt) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }
                if (pattern.oldLcLe && event.oldState.lastchange <= pattern.oldLcLe) {
                    if (pattern.logic == "or") {
                        return true;
                    }
                    matched = true;
                } else if (pattern.oldLcLe) {
                    if (pattern.logic == "and") {
                        return false;
                    }
                }

                // Datapoint Name matching
                if (pattern.name) {
                    if (pattern.name instanceof RegExp) {
                        if (event.name && event.name.match(pattern.name)) {
                            if (pattern.logic == "or") {
                                return true;
                            }
                            matched = true;
                        } else {
                            if (pattern.logic == "and") {
                                return false;
                            }
                        }
                    } else {
                        if (event.name && pattern.name == event.name) {
                            if (pattern.logic == "or") {
                                return true;
                            }
                            matched = true;
                        } else {
                            if (pattern.logic == "and") {
                                return false;
                            }
                        }
                    }
                }

                // Room id/name matching
                if (pattern.room) {
                    if (pattern.room instanceof RegExp) {
                        var submatch = false;
                        for (var j = 0; j < event.channel.roomNames.length; j++) {
                            if (event.channel.roomNames[j].match(pattern.room)) {
                                submatch = true;
                                break;
                            }
                        }
                        if (submatch) {
                            if (pattern.logic == "or") {
                                return true;
                            }
                            matched = true;
                        } else {
                            if (pattern.logic == "and") {
                                return false;
                            }
                        }
                    } else if (typeof pattern.room == "number") {
                        if (event.channel.roomNames.indexOf(pattern.room) != -1) {
                            if (pattern.logic == "or") {
                                return true;
                            }
                            matched = true;
                        } else {
                            if (pattern.logic == "and") {
                                return false;
                            }
                        }
                    } else {
                        if (event.channel.roomNames.indexOf(pattern.room) != -1) {
                            if (pattern.logic == "or") {
                                return true;
                            }
                            matched = true;
                        } else {
                            if (pattern.logic == "and") {
                                return false;
                            }
                        }
                    }
                }

                // function (Gewerk) id/name matching
                if (pattern.func) {
                    if (pattern.func instanceof RegExp) {
                        var submatch = false;
                        for (var j = 0; j < event.channel.funcNames.length; j++) {
                            if (event.channel.funcNames[j].match(pattern.func)) {
                                submatch = true;
                                break;
                            }
                        }
                        if (submatch) {
                            if (pattern.logic == "or") {
                                return true;
                            }
                            matched = true;
                        } else {
                            if (pattern.logic == "and") {
                                return false;
                            }
                        }
                    } else if (typeof pattern.func == "number") {
                        if (event.channel.func.indexOf(pattern.func) != -1) {
                            if (pattern.logic == "or") {
                                return true;
                            }
                            matched = true;
                        } else {
                            if (pattern.logic == "and") {
                                return false;
                            }
                        }
                    } else {
                        if (event.channel.funcNames.indexOf(pattern.func) != -1) {
                            if (pattern.logic == "or") {
                                return true;
                            }
                            matched = true;
                        } else {
                            if (pattern.logic == "and") {
                                return false;
                            }
                        }
                    }

                }

                // channel id/name matching
                if (pattern.channel) {
                    if (pattern.channel instanceof RegExp) {
                        if (event.channel.name && event.channel.name.match(pattern.channel)) {
                            if (pattern.logic == "or") {
                                return true;
                            }
                            matched = true;
                        } else {
                            if (pattern.logic == "and") {
                                return false;
                            }
                        }
                    } else if (typeof pattern.channel == "number") {
                        if (event.channel.id && event.channel.id == pattern.channel) {
                            if (pattern.logic == "or") {
                                return true;
                            }
                            matched = true;
                        } else {
                            if (pattern.logic == "and") {
                                return false;
                            }
                        }
                    } else {
                        if (event.channel.name && event.channel.name == pattern.channel) {
                            if (pattern.logic == "or") {
                                return true;
                            }
                            matched = true;
                        } else {
                            if (pattern.logic == "and") {
                                return false;
                            }
                        }
                    }
                }

                // channelType (HssType) matching
                if (pattern.channelType) {
                    if (pattern.channelType instanceof RegExp) {
                        if (event.channel.type && event.channel.type.match(pattern.channelType)) {
                            if (pattern.logic == "or") {
                                return true;
                            }
                            matched = true;
                        } else {
                            if (pattern.logic == "and") {
                                return false;
                            }
                        }
                    } else {
                        if (event.channel.type && pattern.channelType == event.channel.type) {
                            if (pattern.logic == "or") {
                                return true;
                            }
                            matched = true;
                        } else {
                            if (pattern.logic == "and") {
                                return false;
                            }
                        }
                    }
                }

                // device id/name matching
                if (pattern.device) {
                    if (pattern.device instanceof RegExp) {
                        if (event.device.name && event.device.name.match(pattern.device)) {
                            if (pattern.logic == "or") {
                                return true;
                            }
                            matched = true;
                        } else {
                            if (pattern.logic == "and") {
                                return false;
                            }
                        }
                    } else if (typeof pattern.device == "number") {
                        if (event.device.id && event.device.id == pattern.device) {
                            if (pattern.logic == "or") {
                                return true;
                            }
                            matched = true;
                        } else {
                            if (pattern.logic == "and") {
                                return false;
                            }
                        }
                    } else {
                        if (event.device.name && event.device.name == pattern.device) {
                            if (pattern.logic == "or") {
                                return true;
                            }
                            matched = true;
                        } else {
                            if (pattern.logic == "and") {
                                return false;
                            }
                        }
                    }
                }

                // device type (HssType) matching
                if (pattern.deviceType) {
                    if (pattern.deviceType instanceof RegExp) {
                        if (event.device.type && event.device.type.match(pattern.deviceType)) {
                            if (pattern.logic == "or") {
                                return true;
                            }
                            matched = true;
                        } else {
                            if (pattern.logic == "and") {
                                return false;
                            }
                        }
                    } else {
                        if (event.device.type && pattern.deviceType == event.device.type) {
                            if (pattern.logic == "or") {
                                return true;
                            }
                            matched = true;
                        } else {
                            if (pattern.logic == "and") {
                                return false;
                            }
                        }
                    }
                }

                return matched;

            }

            function getState(id) {
                if (sim.datapoints["_" + id]["Value"] != undefined) {
                    return sim.datapoints["_" + id]["Value"]

                } else {

                }

            }

            function setState(id, data) {
                sim.datapoints["_" + id]["Value"] = data;
            }

            function setObject(id, data) {
                if (sim.datapoints["_" + id] == undefined) {
                    sim.datapoints.attr("_" + id, {Value: 0, Timestamp: "", LastChange: ""});
                }
            }

            function schedule(data) {
            }

            function subscribe(pattern, callbackOrId, value, mbs) {

                if (typeof pattern != "object") {
                    pattern = {id: pattern, change: "ne"};
                }
                // enable calls like: on("ADAPTER.LIGHT.SWITCH.STATE", "ADAPTER.LIGHT.RELAY.STATE"); // Set state of SWITCH to RELAY if state of SWITCH changes
                // and
                // on("ADAPTER.LIGHT.SWITCH.STATE", "ADAPTER.LIGHT.RELAY.STATE", 1); // Set 1 to RELAY if state of SWITCH changes
                var callb = null;
                if (typeof callbackOrId != "function") {
                    if (typeof value != 'undefined') {
                        callb = function (obj) {
                            setState(callbackOrId, value);
                        }
                    } else {
                        callb = function (obj) {
                            setState(callbackOrId, getState(obj.id));
                        }
                    }
                } else {
                    callb = callbackOrId;
                }
                var mbs_nr;
                console.log(typeof value)
                if ($.isArray(value)){
                    mbs_nr = value[0];
                }else{
                    mbs_nr = mbs[0];
                }
                sim.subscribers.push({
                    pattern: pattern,
                    callback: callb,
                    mbs_nr:mbs_nr,
                });
            }

            function execCmd(data) {
            }

            function log(data) {
                $("#sim_output").prepend("<tr><td style='width: 100px'>" + sim.gettime_m() + "</td><td>" + data + "</td></tr>");
            }

            function pushover(data) {
                $("#sim_output").prepend("<tr><td style='width: 100px'>" + sim.gettime_m() + "</td><td><b style='color: blue'>Pushover: </b>" + data.message + "</td></tr>");
            }

            function email(data) {
                $("#sim_output").prepend("<tr><td style='width: 100px'>" + sim.gettime_m() + "</td><td><b style='color: blue'>E-Mail: </b>" + data.to + '<br>' + data.subject + '<br>' + data.text + "</td></tr>");
            }

            function simout(key, data) {

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
            }

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

            try {

                var sim_script = js_beautify(Compiler.make_prg(true).toString());
            }
            catch (err) {
                var err_text = "";

                if (err == "TypeError: this.output[0] is undefined") {
                    err_text = " <b style='color: red'>Error:</b> Offenen Ausgang gefunden"
                } else if (err == "TypeError: this.input[0] is undefined") {
                    err_text = " <b style='color: red'>Error:</b> Offenen Eingang gefunden"
                } else {
                    err_text = err
                }

                $("#sim_output").prepend("<tr><td  style='width: 100px'>" + sim.gettime_m() + "</td><td>" + err_text + "</td></tr>");


                $("#" + Compiler.last_fbs).addClass("error_fbs");
                $("#" + Compiler.last_fbs).effect("bounce");
            }

//    console.log(script);
            try {
                log("Start");
                eval(sim_script);
                $(".btn_min_trigger").bind("click", function () {
                    if (SGI.sim_run) {

                        var trigger = $(this).parent().parent().attr("id");
                        $.each(PRG.struck.trigger, function () {
                            if (this.mbs_id == trigger) {
                                $.each(this.target, function () {
                                    eval(this + "(" + JSON.stringify(SGI.start_data.valueOf()) + ")");
                                });
                                return false
                            }
                        })
                    }
                });

                $(document).on("change", '.force_input', "", function (e) {
                    var x = $(e.target).data("info").toString();
                    var force = $(e.target).val();
                    if (force == "" || force == undefined || force == "undefined" || force == NaN) {
                        eval(x + "_force = undefined ;");
                    } else if (force == "true") {
                        eval(x + "_force = 1 ;");
                    } else if (force == "false") {
                        eval(x + "_force = 0 ;");
                    } else if (isNaN(force)) {
                        eval(x + "_force = '" + force.toString() + "';");
                    } else {
                        eval(x + "_force = " + force + ";");
                    }
                });

                SGI.sim_run = true;
                $("#img_set_script_play").finish().effect("highlight");
            }
            catch (err) {
                console.log(err)
                var real_script = js_beautify(Compiler.make_prg().toString());
                var _sim_script = sim_script.split(/\n/);
                var _real_script = real_script.split(/\n/)
                var sim_error_line_text = _sim_script[err.lineNumber - 1];
                var sim_error_line = _sim_script.indexOf(sim_error_line_text) + 1;
                var real_error_line = _real_script.indexOf(sim_error_line_text) + 1;


                for (var i = sim_error_line; i > 1; i--) {
                    if (_sim_script[i].split("xxxxxxxxxxxxxxxxxxxx ").length > 1) {
                        $("#" + _sim_script[i].split(" xxxxxxxxxxxxxxxxxxxx ")[1]).addClass("error_fbs");
                        $("#" + _sim_script[i].split(" xxxxxxxxxxxxxxxxxxxx ")[1]).effect("bounce");
                        i = 0;
                    }
                }

                $("#sim_output").prepend("<tr><td  style='width: 100px'></td><td><b>Zeilentext:</b>" + sim_error_line_text + "</td></tr>");
                $("#sim_output").prepend("<tr><td  style='width: 100px'></td><td><b>Fehler in Zeile:</b> " + real_error_line + "</td></tr>");
                $("#sim_output").prepend("<tr><td  style='width: 100px'>" + sim.gettime_m() + "</td><td style='color: red'>" + err + "</td></tr>");

                SGI.sim_run = true;
//            sim.stopsim();
            }
        }


    }

};








