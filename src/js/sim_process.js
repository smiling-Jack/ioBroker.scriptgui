/**
 * Created by jack on 29.11.2014.
 */


//var vm = require('vm');


process.on("uncaughtException", function (e) {
    process.send(["script_err", e.stack]);
    process.exit(9990)
});


var sim = {
    time_mode: "auto",
    run_type: process.argv[3],
    regaObjects: [],
    regaIndex: [],
    datapoints: [],
    util: require('util'),
    scheduler: require('node-schedule'),
    suncalc: require('suncalc'),
    subscribers: [],
    schedules: []
};


var old_date = Date;

var sd = []
//
Date = function () {
    if (sim.time_mode == "auto") {
        return new old_date
    } else {
        return new old_date(sd[0], sd[1], sd[2], sd[3], sd[4])
    }
};


var script = process.argv[2];

process.on('message', function (data) {
    if (data[0] == "home") {
        sim.regaObjects = data[1].regaObjects;
        sim.regaIndex = data[1].regaIndex;
        sim.datapoints = data[1].uiState;

        try {
            run(script);
        } catch (err) {
            process.send(["script_err", err.stack]);
            process.exit(9999)
        }
    } else if (data[0] == "exit") {
        process.exit(1000)
    } else if (data[0] == "time") {
        if (data[1] == "manual") {
            sim.time_mode = "manual";
            var d = data[2].split(" ")[0].split("/");
            var t = data[2].split(" ")[1].split(":");

            sd = [parseInt(d[2]), parseInt(d[1]) - 1, parseInt(d[0]), parseInt(t[0]), parseInt(t[1])]

        } else {
            sim.time_mode = "auto"
        }
    }
});
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

function run(script) {


    function step_fbs_highlight(id) {
        var d = (new Date).valueOf() + 800;
        process.send(["step_fbs_highlight", id]);
        while (d > (new Date).valueOf()) {
        }
    }

    function step_mbs_highlight_in(id) {
        var d = (new Date).valueOf() + 600;
        process.send(["step_mbs_highlight_in", id]);
        while (d > (new Date).valueOf()) {
        }
    }

    function step_mbs_highlight_out(id) {
        var d = (new Date).valueOf() + 600;
        process.send(["step_mbs_highlight_out", id]);
        while (d > (new Date).valueOf()) {
        }

    }

    function step_mbs_highlight_reset(id) {
        var d = (new Date).valueOf() + 1000;
        process.send(["step_mbs_highlight_reset", id]);
        while (d > (new Date).valueOf()) {
        }
    }

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

        return sim.datapoints["_" + id]["Value"]


    }

    function setState(id, val, callback) {
        if (sim.run_type == "hotrun") {
            SGI.socket.emit("setState", [id, val], function () {
                if (callback) {
                    callback();
                }
            });
        } else {
            sim.datapoints["_" + id]["Value"] = val;
        }
    }

    function setObject(id, data) {
        if (sim.datapoints["_" + id] == undefined) {
            sim.datapoints.attr("_" + id, {Value: 0, Timestamp: "", LastChange: ""});
        }
    }

    function schedule(data) {
    }

    function subscribe(pattern, callbackOrId, value, mbs) {

        if (sim.run_type == "trigger" || sim.run_type == "hotrun") {
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
            if (Array.isArray(value)) {
                mbs_nr = value[0];
            } else {
                mbs_nr = mbs[0];
            }
            sim.subscribers.push({
                pattern: pattern,
                callback: callb,
                mbs_nr: mbs_nr
            });
        }

    }

    function execCmd(data) {
    }

    function log(data) {
        process.send(["log", data]);
    }

    function pushover(data) {
        process.send(["log", "<b style='color: blue'>Pushover: </b>" + data.message + ""]);
    }

    function email(data) {
        process.send(["log", "<b style='color: blue'>E-Mail: </b>" + data.to + '<br>' + data.subject + '<br>' + data.text + ""]);
    }

    function simout(key, data) {
        process.send(["simout", key, data]);
    }

    log("start");
//    vm.runInThisContext(script, "s_engine")
    eval(script);
    process.on('message', function (data) {
        if (data[0] == "trigger") {
            eval(data[1])

        }
        else if (data[0] == "new_data") {
            var obj = [data[1].id, data[1].value, data[1].timestamp, data[1].certain, data[1].lasttimestamp];

            var o = {
                Value: data[1].value,
                Timestamp: data[1].timestamp,
                Certain: data[1].certain
            };


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


            var length = sim.subscribers.length;
            for (var i = 0; i < length; i++) {
                //
                if (patternMatching(eventObj, sim.subscribers[i].pattern)) {
                    //$("#" + scope.mbs[sim.subscribers[i].mbs_nr].mbs_id).children().effect("highlight", {color: "green"}, 800);
                    process.send(["trigger_highlight", sim.subscribers[i].mbs_nr]);
                    sim.subscribers[i].callback(eventObj);

                }
            }
        }
        else if (data[0] == "force") {
            var x = data[2];
            var force = data[1];
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


        }
    });

    process.send(["running"]);

}








