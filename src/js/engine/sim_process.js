
var run_type = process.argv[3];
var _time_mode = "auto";

process.send(__dirname)
var mods = {
    //'vm':               require('vm'),
    //'fs': require('fs'),
    //'dgram':            require('dgram'),
    //'crypto':           require('crypto'),
    //'dns':              require('dns'),
    //'events':           require('events'),
    //'http': require('http'),
    //'https': require('https'),
    //'net': require('net'),
    //'os': require('os'),
    //'path': require('path'),
    //'util':             require('util'),
    //'child_process': require('child_process'),

    //'coffee-compiler':  require('coffee-compiler'),

    'node-schedule': require('node-schedule'),
    //'suncalc': require('suncalc'),
    //'request': require('request'),
    //'wake_on_lan': require('wake_on_lan')
};

var objects = {};
var states = {};
var script =    {
    subscriptions: [],
    schedules: []
};
var subscriptions = [];
var isEnums = false; // If some subscription wants enum
var enums = [];
var cacheObjectEnums = {};
var channels = null;
var devices = null;
var fs = null;
var attempts = {};
var globalScript = '';
var names = {};
var timers = {};
var timerId = 0;

var __engine = {
        __subscriptions: 0,
        __schedules: 0
    };


var  _script = process.argv[2];

process.on('message', function (data) {
    if (data[0] == "home") {
        objects = data[1].regaObjects;
        //sim.regaIndex = data[1].regaIndex;
        states = data[1].uiState;

            run(script);

    } else if (data[0] == "exit") {
        //process.exit(1000)
        eventEmitter.emit('stoppen');
    } else if (data[0] == "time") {
        if (data[1] == "manual") {
            _time_mode = "manual";
            var d = data[2].split(" ")[0].split("/");
            var t = data[2].split(" ")[1].split(":");

            sd = [parseInt(d[2]), parseInt(d[1]) - 1, parseInt(d[0]), parseInt(t[0]), parseInt(t[1])]

        } else {
            _time_mode = "auto"
        }
    }
});

process.on("uncaughtException", function (e) {
    process.send(["script_err", e.stack]);
    process.exit(9990)
});

var old_date = Date;

var sd = [];
//
Date = function () {
    if (_time_mode == "auto") {
        return new old_date
    } else {
        return new old_date(sd[0], sd[1], sd[2], sd[3], sd[4])
    }
};
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

process.send(["init"]);
function run(script) {
    var adapter = {
        log: {
            info: function (text) {
            },
            warn: function (text) {
            },
            error: function (text) {
            },
        },
        setForeignState: function () {
        },
        sendTo: function (adapter, msg) {

            if (adapter == "email") {
                process.send(["log", "<b style='color: blue'>E-Mail: </b>" + msg.to + '<br>' + msg.subject + '<br>' + msg.text + ""]);
            } else if (adapter == "pushover") {
                process.send(["log", "<b style='color: blue'>Pushover: </b>" + msg.message + ""]);
            }
        }
    }

    //function patternMatching(event, pattern) {
    //    if (!pattern.logic) {
    //        pattern.logic = "and";
    //    }
    //    var matched = false;
    //
    //    // Datapoint id matching
    //    if (pattern.id && pattern.id == event.id) {
    //        //console.log("matched id!");
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.id) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //
    //    // change matching
    //    if (pattern.change) {
    //        switch (pattern.change) {
    //            case "eq":
    //                if (event.newState.value == event.oldState.value) {
    //                    if (pattern.logic == "or") {
    //                        return true;
    //                    }
    //                    matched = true;
    //                } else {
    //                    if (pattern.logic == "and") {
    //                        return false;
    //                    }
    //                }
    //                break;
    //            case "ne":
    //                if (event.newState.value != event.oldState.value) {
    //                    if (pattern.logic == "or") {
    //                        return true;
    //                    }
    //                    matched = true;
    //                } else {
    //                    if (pattern.logic == "and") {
    //                        return false;
    //                    }
    //                }
    //                break;
    //
    //            case "gt":
    //                if (event.newState.value > event.oldState.value) {
    //                    if (pattern.logic == "or") {
    //                        return true;
    //                    }
    //                    matched = true;
    //                } else {
    //                    if (pattern.logic == "and") {
    //                        return false;
    //                    }
    //                }
    //                break;
    //            case "ge":
    //                if (event.newState.value >= event.oldState.value) {
    //                    if (pattern.logic == "or") {
    //                        return true;
    //                    }
    //                    matched = true;
    //                } else {
    //                    if (pattern.logic == "and") {
    //                        return false;
    //                    }
    //                }
    //                break;
    //            case "lt":
    //                if (event.newState.value < event.oldState.value) {
    //                    if (pattern.logic == "or") {
    //                        return true;
    //                    }
    //                    matched = true;
    //                } else {
    //                    if (pattern.logic == "and") {
    //                        return false;
    //                    }
    //                }
    //                break;
    //            case "le":
    //                if (event.newState.value <= event.oldState.value) {
    //                    if (pattern.logic == "or") {
    //                        return true;
    //                    }
    //                    matched = true;
    //                } else {
    //                    if (pattern.logic == "and") {
    //                        return false;
    //                    }
    //                }
    //                break;
    //        }
    //    }
    //
    //    // Value Matching
    //    if (pattern.val !== undefined && pattern.val == event.newState.value) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.val !== undefined) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.valGt !== undefined && event.newState.value > pattern.valGt) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.valGt !== undefined) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.valGe !== undefined && event.newState.value >= pattern.valGe) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.valGe !== undefined) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.valLt !== undefined && event.newState.value < pattern.valLt) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.valLt !== undefined) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.valLe !== undefined && event.newState.value <= pattern.valLe) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.valLe !== undefined) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.valNe !== undefined && event.newState.value != pattern.valNe) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.valNe !== undefined) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //
    //    // Old-Value matching
    //    if (pattern.oldVal !== undefined && pattern.oldVal == event.oldState.value) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.oldVal !== undefined) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.oldValGt !== undefined && event.oldState.value > pattern.oldValGt) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.oldValGt !== undefined) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.oldValGe !== undefined && event.oldState.value >= pattern.oldValGe) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.oldValGe !== undefined) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.oldValLt !== undefined && event.oldState.value < pattern.oldValLt) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.oldValLt !== undefined) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.oldValLe !== undefined && event.oldState.value <= pattern.oldValLe) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.oldValLe !== undefined) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.oldValNe !== undefined && event.oldState.value != pattern.oldValNe) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.oldValNe !== undefined) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //
    //    // newState.timestamp matching
    //    if (pattern.ts && pattern.ts == event.newState.timestamp) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.ts) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.tsGt && event.newState.timestamp > pattern.tsGt) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.tsGt) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.tsGe && event.newState.timestamp >= pattern.tsGe) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.tsGe) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.tsLt && event.newState.timestamp < pattern.tsLt) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.tsLt) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.tsLe && event.newState.timestamp <= pattern.tsLe) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.tsLe) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //
    //    // oldState.timestamp matching
    //    if (pattern.oldTs && pattern.oldTs == event.oldState.timestamp) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.oldTs) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.oldTsGt && event.oldState.timestamp > pattern.oldTsGt) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.oldTsGt) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.oldTsGe && event.oldState.timestamp >= pattern.oldTsGe) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.oldTsGe) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.oldTsLt && event.oldState.timestamp < pattern.oldTsLt) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.oldTsLt) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.oldTsLe && event.oldState.timestamp <= pattern.oldTsLe) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.oldTsLe) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //
    //
    //    // newState.lastchange matching
    //    if (pattern.lc && pattern.lc == event.newState.lastchange) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.lc) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.lcGt && event.newState.lastchange > pattern.lcGt) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.lcGt) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.lcGe && event.newState.lastchange >= pattern.lcGe) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.lcGe) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.lcLt && event.newState.lastchange < pattern.lcLt) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.lcLt) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.lcLe && event.newState.lastchange <= pattern.lcLe) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.lcLe) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //
    //    // oldState.lastchange matching
    //    if (pattern.oldLc && pattern.oldLc == event.oldState.lastchange) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.oldLc) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.oldLcGt && event.oldState.lastchange > pattern.oldLcGt) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.oldLcGt) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.oldLcGe && event.oldState.lastchange >= pattern.oldLcGe) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.oldLcGe) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.oldLcLt && event.oldState.lastchange < pattern.oldLcLt) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.oldLcLt) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //    if (pattern.oldLcLe && event.oldState.lastchange <= pattern.oldLcLe) {
    //        if (pattern.logic == "or") {
    //            return true;
    //        }
    //        matched = true;
    //    } else if (pattern.oldLcLe) {
    //        if (pattern.logic == "and") {
    //            return false;
    //        }
    //    }
    //
    //    // Datapoint Name matching
    //    if (pattern.name) {
    //        if (pattern.name instanceof RegExp) {
    //            if (event.name && event.name.match(pattern.name)) {
    //                if (pattern.logic == "or") {
    //                    return true;
    //                }
    //                matched = true;
    //            } else {
    //                if (pattern.logic == "and") {
    //                    return false;
    //                }
    //            }
    //        } else {
    //            if (event.name && pattern.name == event.name) {
    //                if (pattern.logic == "or") {
    //                    return true;
    //                }
    //                matched = true;
    //            } else {
    //                if (pattern.logic == "and") {
    //                    return false;
    //                }
    //            }
    //        }
    //    }
    //
    //    // Room id/name matching
    //    if (pattern.room) {
    //        if (pattern.room instanceof RegExp) {
    //            var submatch = false;
    //            for (var j = 0; j < event.channel.roomNames.length; j++) {
    //                if (event.channel.roomNames[j].match(pattern.room)) {
    //                    submatch = true;
    //                    break;
    //                }
    //            }
    //            if (submatch) {
    //                if (pattern.logic == "or") {
    //                    return true;
    //                }
    //                matched = true;
    //            } else {
    //                if (pattern.logic == "and") {
    //                    return false;
    //                }
    //            }
    //        } else if (typeof pattern.room == "number") {
    //            if (event.channel.roomNames.indexOf(pattern.room) != -1) {
    //                if (pattern.logic == "or") {
    //                    return true;
    //                }
    //                matched = true;
    //            } else {
    //                if (pattern.logic == "and") {
    //                    return false;
    //                }
    //            }
    //        } else {
    //            if (event.channel.roomNames.indexOf(pattern.room) != -1) {
    //                if (pattern.logic == "or") {
    //                    return true;
    //                }
    //                matched = true;
    //            } else {
    //                if (pattern.logic == "and") {
    //                    return false;
    //                }
    //            }
    //        }
    //    }
    //
    //    // function (Gewerk) id/name matching
    //    if (pattern.func) {
    //        if (pattern.func instanceof RegExp) {
    //            var submatch = false;
    //            for (var j = 0; j < event.channel.funcNames.length; j++) {
    //                if (event.channel.funcNames[j].match(pattern.func)) {
    //                    submatch = true;
    //                    break;
    //                }
    //            }
    //            if (submatch) {
    //                if (pattern.logic == "or") {
    //                    return true;
    //                }
    //                matched = true;
    //            } else {
    //                if (pattern.logic == "and") {
    //                    return false;
    //                }
    //            }
    //        } else if (typeof pattern.func == "number") {
    //            if (event.channel.func.indexOf(pattern.func) != -1) {
    //                if (pattern.logic == "or") {
    //                    return true;
    //                }
    //                matched = true;
    //            } else {
    //                if (pattern.logic == "and") {
    //                    return false;
    //                }
    //            }
    //        } else {
    //            if (event.channel.funcNames.indexOf(pattern.func) != -1) {
    //                if (pattern.logic == "or") {
    //                    return true;
    //                }
    //                matched = true;
    //            } else {
    //                if (pattern.logic == "and") {
    //                    return false;
    //                }
    //            }
    //        }
    //
    //    }
    //
    //    // channel id/name matching
    //    if (pattern.channel) {
    //        if (pattern.channel instanceof RegExp) {
    //            if (event.channel.name && event.channel.name.match(pattern.channel)) {
    //                if (pattern.logic == "or") {
    //                    return true;
    //                }
    //                matched = true;
    //            } else {
    //                if (pattern.logic == "and") {
    //                    return false;
    //                }
    //            }
    //        } else if (typeof pattern.channel == "number") {
    //            if (event.channel.id && event.channel.id == pattern.channel) {
    //                if (pattern.logic == "or") {
    //                    return true;
    //                }
    //                matched = true;
    //            } else {
    //                if (pattern.logic == "and") {
    //                    return false;
    //                }
    //            }
    //        } else {
    //            if (event.channel.name && event.channel.name == pattern.channel) {
    //                if (pattern.logic == "or") {
    //                    return true;
    //                }
    //                matched = true;
    //            } else {
    //                if (pattern.logic == "and") {
    //                    return false;
    //                }
    //            }
    //        }
    //    }
    //
    //    // channelType (HssType) matching
    //    if (pattern.channelType) {
    //        if (pattern.channelType instanceof RegExp) {
    //            if (event.channel.type && event.channel.type.match(pattern.channelType)) {
    //                if (pattern.logic == "or") {
    //                    return true;
    //                }
    //                matched = true;
    //            } else {
    //                if (pattern.logic == "and") {
    //                    return false;
    //                }
    //            }
    //        } else {
    //            if (event.channel.type && pattern.channelType == event.channel.type) {
    //                if (pattern.logic == "or") {
    //                    return true;
    //                }
    //                matched = true;
    //            } else {
    //                if (pattern.logic == "and") {
    //                    return false;
    //                }
    //            }
    //        }
    //    }
    //
    //    // device id/name matching
    //    if (pattern.device) {
    //        if (pattern.device instanceof RegExp) {
    //            if (event.device.name && event.device.name.match(pattern.device)) {
    //                if (pattern.logic == "or") {
    //                    return true;
    //                }
    //                matched = true;
    //            } else {
    //                if (pattern.logic == "and") {
    //                    return false;
    //                }
    //            }
    //        } else if (typeof pattern.device == "number") {
    //            if (event.device.id && event.device.id == pattern.device) {
    //                if (pattern.logic == "or") {
    //                    return true;
    //                }
    //                matched = true;
    //            } else {
    //                if (pattern.logic == "and") {
    //                    return false;
    //                }
    //            }
    //        } else {
    //            if (event.device.name && event.device.name == pattern.device) {
    //                if (pattern.logic == "or") {
    //                    return true;
    //                }
    //                matched = true;
    //            } else {
    //                if (pattern.logic == "and") {
    //                    return false;
    //                }
    //            }
    //        }
    //    }
    //
    //    // device type (HssType) matching
    //    if (pattern.deviceType) {
    //        if (pattern.deviceType instanceof RegExp) {
    //            if (event.device.type && event.device.type.match(pattern.deviceType)) {
    //                if (pattern.logic == "or") {
    //                    return true;
    //                }
    //                matched = true;
    //            } else {
    //                if (pattern.logic == "and") {
    //                    return false;
    //                }
    //            }
    //        } else {
    //            if (event.device.type && pattern.deviceType == event.device.type) {
    //                if (pattern.logic == "or") {
    //                    return true;
    //                }
    //                matched = true;
    //            } else {
    //                if (pattern.logic == "and") {
    //                    return false;
    //                }
    //            }
    //        }
    //    }
    //
    //    return matched;
    //
    //}
    //
    //function getState(id) {
    //
    //    return states["_" + id]["Value"]
    //
    //
    //}
    //
    //function setState(id, val, callback) {
    //    if (run_type == "hotrun") {
    //        SGI.socket.emit("setState", [id, val], function () {
    //            if (callback) {
    //                callback();
    //            }
    //        });
    //    } else {
    //        states["_" + id]["Value"] = val;
    //    }
    //}
    //
    //function request(data) {
    //    if (run_type == "hotrun") {
    //        _reguest(data)
    //        process.send(["log", "<b style='color: blue'>Request: </b>" + data + ""]);
    //    } else {
    //        process.send(["log", "<b style='color: blue'>Request: </b>" + data + ""]);
    //    }
    //}
    //
    //function setObject(id, data) {
    //    if (states["_" + id] == undefined) {
    //        states.attr("_" + id, {Value: 0, Timestamp: "", LastChange: ""});
    //    }
    //}
    //
    //function schedule(data) {
    //}
    //
    //function execCmd(data) {
    //}
    //
    //



    //todo -------------------------------------------------------------
    function simout(key, data) {
        process.send(["simout", key, data]);
    }
    //todo -------------------------------------------------------------
    //todo -------------------------------------------------------------

    function patternMatching(event, pattern) {

        if (!pattern.logic) {
            pattern.logic = "and";
        }

        var matched = false;

        // state id matching
        if (pattern.id) {
            if (pattern.id instanceof RegExp || pattern.id.source) {
                if (event.id && event.id.match(pattern.id)) {
                    if (pattern.logic === "or") return true;
                    matched = true;
                } else {
                    if (pattern.logic === "and") return false;
                }
            } else {
                if (event.id && pattern.id === event.id) {
                    if (pattern.logic === "or") return true;
                    matched = true;
                } else {
                    if (pattern.logic === "and") return false;
                }
            }
        }

        // state name matching
        if (pattern.name) {
            if (pattern.name instanceof RegExp || pattern.name.source) {
                if (event.common.name && event.common.name.match(pattern.name)) {
                    if (pattern.logic === "or") return true;
                    matched = true;
                } else {
                    if (pattern.logic === "and") return false;
                }
            } else {
                if (event.common.name && pattern.name === event.common.name) {
                    if (pattern.logic === "or") return true;
                    matched = true;
                } else {
                    if (pattern.logic === "and") return false;
                }
            }
        }

        // todo anchestor name matching

        // change matching
        if (pattern.change) {
            switch (pattern.change) {
                case "eq":
                    if (event.newState.val === event.oldState.val) {
                        if (pattern.logic === "or") return true;
                        matched = true;
                    } else {
                        if (pattern.logic === "and") return false;
                    }
                    break;
                case "ne":
                    if (event.newState.val !== event.oldState.val) {
                        if (pattern.logic === "or") return true;
                        matched = true;
                    } else {
                        if (pattern.logic === "and") return false;
                    }
                    break;
                case "gt":
                    if (event.newState.val > event.oldState.val) {
                        if (pattern.logic === "or") return true;
                        matched = true;
                    } else {
                        if (pattern.logic === "and") return false;
                    }
                    break;
                case "ge":
                    if (event.newState.val >= event.oldState.val) {
                        if (pattern.logic === "or") return true;
                        matched = true;
                    } else {
                        if (pattern.logic === "and") return false;
                    }
                    break;
                case "lt":
                    if (event.newState.val < event.oldState.val) {
                        if (pattern.logic === "or") return true;
                        matched = true;
                    } else {
                        if (pattern.logic === "and") return false;
                    }
                    break;
                case "le":
                    if (event.newState.val <= event.oldState.val) {
                        if (pattern.logic === "or") return true;
                        matched = true;
                    } else {
                        if (pattern.logic === "and") return false;
                    }
                    break;
                default:
                    // on any other logic, just signal about message
                    if (pattern.logic === "or") return true;
                    matched = true;
                    break;
            }
        }

        // Ack Matching
        if (pattern.ack !== undefined) {
            if (((pattern.ack === 'true'  || pattern.ack === true)  && (event.newState.ack === true  || event.newState.ack === 'true')) ||
                ((pattern.ack === 'false' || pattern.ack === false) && (event.newState.ack === false || event.newState.ack === 'false'))) {
                if (pattern.logic === "or") return true;
                matched = true;
            } else {
                if (pattern.logic === "and") return false;
            }
        }

        // oldAck Matching
        if (pattern.oldAck !== undefined) {
            if (((pattern.oldAck === 'true'  || pattern.oldAck === true)  && (event.oldState.ack === true  || event.oldState.ack === 'true')) ||
                ((pattern.oldAck === 'false' || pattern.oldAck === false) && (event.oldState.ack === false || event.oldState.ack === 'false'))) {
                if (pattern.logic === "or") return true;
                matched = true;
            } else {
                if (pattern.logic === "and") return false;
            }
        }

        // Value Matching
        if (pattern.val !== undefined && pattern.val === event.newState.val) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.val !== undefined) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.valGt !== undefined && event.newState.val > pattern.valGt) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.valGt !== undefined) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.valGe !== undefined && event.newState.val >= pattern.valGe) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.valGe !== undefined) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.valLt !== undefined && event.newState.val < pattern.valLt) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.valLt !== undefined) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.valLe !== undefined && event.newState.val <= pattern.valLe) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.valLe !== undefined) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.valNe !== undefined && event.newState.val !== pattern.valNe) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.valNe !== undefined) {
            if (pattern.logic === "and") return false;
        }

        // Old-Value matching
        if (pattern.oldVal !== undefined && pattern.oldVal === event.oldState.val) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.oldVal !== undefined) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.oldValGt !== undefined && event.oldState.val > pattern.oldValGt) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.oldValGt !== undefined) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.oldValGe !== undefined && event.oldState.val >= pattern.oldValGe) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.oldValGe !== undefined) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.oldValLt !== undefined && event.oldState.val < pattern.oldValLt) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.oldValLt !== undefined) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.oldValLe !== undefined && event.oldState.val <= pattern.oldValLe) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.oldValLe !== undefined) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.oldValNe !== undefined && event.oldState.val !== pattern.oldValNe) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.oldValNe !== undefined) {
            if (pattern.logic === "and") return false;
        }

        // newState.ts matching
        if (pattern.ts && pattern.ts === event.newState.ts) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.ts) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.tsGt && event.newState.ts > pattern.tsGt) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.tsGt) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.tsGe && event.newState.ts >= pattern.tsGe) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.tsGe) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.tsLt && event.newState.ts < pattern.tsLt) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.tsLt) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.tsLe && event.newState.ts <= pattern.tsLe) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.tsLe) {
            if (pattern.logic === "and") return false;
        }

        // oldState.ts matching
        if (pattern.oldTs && pattern.oldTs === event.oldState.ts) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.oldTs) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.oldTsGt && event.oldState.ts > pattern.oldTsGt) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.oldTsGt) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.oldTsGe && event.oldState.ts >= pattern.oldTsGe) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.oldTsGe) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.oldTsLt && event.oldState.ts < pattern.oldTsLt) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.oldTsLt) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.oldTsLe && event.oldState.ts <= pattern.oldTsLe) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.oldTsLe) {
            if (pattern.logic === "and") return false;
        }

        // newState.lc matching
        if (pattern.lc && pattern.lc === event.newState.lc) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.lc) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.lcGt && event.newState.lc > pattern.lcGt) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.lcGt) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.lcGe && event.newState.lc >= pattern.lcGe) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.lcGe) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.lcLt && event.newState.lc < pattern.lcLt) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.lcLt) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.lcLe && event.newState.lc <= pattern.lcLe) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.lcLe) {
            if (pattern.logic === "and") return false;
        }

        // oldState.lc matching
        if (pattern.oldLc && pattern.oldLc === event.oldState.lc) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.oldLc) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.oldLcGt && event.oldState.lc > pattern.oldLcGt) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.oldLcGt) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.oldLcGe && event.oldState.lc >= pattern.oldLcGe) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.oldLcGe) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.oldLcLt && event.oldState.lc < pattern.oldLcLt) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.oldLcLt) {
            if (pattern.logic === "and") return false;
        }
        if (pattern.oldLcLe && event.oldState.lc <= pattern.oldLcLe) {
            if (pattern.logic === "or") return true;
            matched = true;
        } else if (pattern.oldLcLe) {
            if (pattern.logic === "and") return false;
        }

        // newState.from matching
        if (pattern.from && pattern.from === event.newState.from) {
            if (pattern.logic == "or") return true;
            matched = true;
        } else if (pattern.from) {
            if (pattern.logic == "and") return false;
        }

        if (pattern.fromNe && pattern.fromNe !== event.newState.from) {
            if (pattern.logic == "or") return true;
            matched = true;
        } else if (pattern.fromNe) {
            if (pattern.logic == "and") return false;
        }

        // oldState.from matching
        if (pattern.oldFrom && pattern.oldFrom === event.oldState.from) {
            if (pattern.logic == "or") return true;
            matched = true;
        } else if (pattern.oldFrom) {
            if (pattern.logic == "and") return false;
        }

        if (pattern.oldFromNe && pattern.oldFromNe !== event.oldState.from) {
            if (pattern.logic == "or") return true;
            matched = true;
        } else if (pattern.oldFromNe) {
            if (pattern.logic == "and") return false;
        }

        // channelId matching
        if (pattern.channelId) {
            if (pattern.channelId instanceof RegExp) {
                if (event.channelId && event.channelId.match(pattern.channelId)) {
                    if (pattern.logic === "or") return true;
                    matched = true;
                } else {
                    if (pattern.logic === "and") return false;
                }
            } else {
                if (event.channelId && pattern.channelId === event.channelId) {
                    if (pattern.logic === "or") return true;
                    matched = true;
                } else {
                    if (pattern.logic === "and") return false;
                }
            }
        }

        // channelName matching
        if (pattern.channelName) {
            if (pattern.channelName instanceof RegExp) {
                if (event.channelName && event.channelName.match(pattern.channelName)) {
                    if (pattern.logic === "or") return true;
                    matched = true;
                } else {
                    if (pattern.logic === "and") return false;
                }
            } else {
                if (event.channelName && pattern.channelName === event.channelName) {
                    if (pattern.logic === "or") return true;
                    matched = true;
                } else {
                    if (pattern.logic === "and") return false;
                }
            }
        }

        // deviceId matching
        if (pattern.deviceId) {
            if (pattern.deviceId instanceof RegExp) {
                if (event.deviceId && event.deviceId.match(pattern.deviceId)) {
                    if (pattern.logic === "or") return true;
                    matched = true;
                } else {
                    if (pattern.logic === "and") return false;
                }
            } else {
                if (event.deviceId && pattern.deviceId === event.deviceId) {
                    if (pattern.logic === "or") return true;
                    matched = true;
                } else {
                    if (pattern.logic === "and") return false;
                }
            }
        }

        // deviceName matching
        if (pattern.deviceName) {
            if (pattern.deviceName instanceof RegExp) {
                if (event.deviceName && event.deviceName.match(pattern.deviceName)) {
                    if (pattern.logic === "or") return true;
                    matched = true;
                } else {
                    if (pattern.logic === "and") return false;
                }
            } else {
                if (event.deviceName && pattern.deviceName === event.deviceName) {
                    if (pattern.logic === "or") return true;
                    matched = true;
                } else {
                    if (pattern.logic === "and") return false;
                }
            }
        }
        var subMatched;

        // enumIds matching
        if (pattern.enumId) {
            if (pattern.enumId instanceof RegExp) {
                subMatched = false;
                for (var i = 0; i < event.enumIds.length; i++) {
                    if (event.enumIds[i].match(pattern.enumId)) {
                        subMatched = true;
                        break;
                    }
                }
                if (subMatched) {
                    if (pattern.logic === "or") return true;
                    matched = true;
                } else {
                    if (pattern.logic === "and") return false;
                }
            } else {
                if (event.enumIds && event.enumIds.indexOf(pattern.enumId) !== -1) {
                    if (pattern.logic === "or") return true;
                    matched = true;
                } else {
                    if (pattern.logic === "and") return false;
                }
            }
        }

        // enumNames matching
        if (pattern.enumName) {
            if (pattern.enumName instanceof RegExp) {
                subMatched = false;
                for (var j = 0; j < event.enumNames.length; j++) {
                    if (event.enumNames[j].match(pattern.enumName)) {
                        subMatched = true;
                        break;
                    }
                }
                if (subMatched) {
                    if (pattern.logic === "or") return true;
                    matched = true;
                } else {
                    if (pattern.logic === "and") return false;
                }
            } else {
                if (event.enumNames && event.enumNames.indexOf(pattern.enumName) !== -1) {
                    if (pattern.logic === "or") return true;
                    matched = true;
                } else {
                    if (pattern.logic === "and") return false;
                }
            }
        }


        return matched;

    }

    function getData(callback) {
        var statesReady;
        var objectsReady;
        adapter.log.info('requesting all states');
        adapter.getForeignStates('*', function (err, res) {
            states = res;
            statesReady = true;
            adapter.log.info('received all states');
            if (objectsReady && typeof callback === 'function') callback();
        });
        adapter.log.info('requesting all objects');

        adapter.objects.getObjectList({include_docs: true}, function (err, res) {
            res = res.rows;
            objects = {};
            for (var i = 0; i < res.length; i++) {
                objects[res[i].doc._id] = res[i].doc;
                if (res[i].doc.type === 'enum') enums.push(res[i].doc._id);

                // Collect all names
                addToNames(objects[res[i].doc._id]);
            }

            objectsReady = true;
            adapter.log.info('received all objects');
            if (statesReady && typeof callback === 'function') callback();
        });
    }

    function getObjectEnums(idObj, callback, enumIds, enumNames) {
        if (!enumIds)   enumIds   = [];
        if (!enumNames) enumNames = [];

        if (cacheObjectEnums[idObj]) {
            if (typeof callback === 'function') {
                for (var j = 0; j < cacheObjectEnums[idObj].enumIds.length; j++) {
                    if (enumIds.indexOf(cacheObjectEnums[idObj].enumIds[j]) == -1) enumIds.push(cacheObjectEnums[idObj].enumIds[j]);
                }
                for (j = 0; j < cacheObjectEnums[idObj].enumNames.length; j++) {
                    if (enumNames.indexOf(cacheObjectEnums[idObj].enumNames[j]) == -1) enumNames.push(cacheObjectEnums[idObj].enumNames[j]);
                }

                callback(cacheObjectEnums[idObj].enumIds, cacheObjectEnums[idObj].enumNames);
            }
            return;
        }

        for (var i = 0, l = enums.length; i < l; i++) {
            if (objects[enums[i]] &&
                objects[enums[i]].common &&
                objects[enums[i]].common.members &&
                objects[enums[i]].common.members.indexOf(idObj) !== -1) {
                if (enumIds.indexOf(enums[i]) == -1) enumIds.push(enums[i]);
                if (enumNames.indexOf(objects[enums[i]].common.name) == -1) enumNames.push(objects[enums[i]].common.name);
            }
        }
        if (objects[idObj]) {
            var pos = idObj.lastIndexOf('.');
            if (pos != -1) {
                var parent = idObj.substring(0, pos);
                if (parent && objects[parent]) {
                    return getObjectEnums(parent, callback, enumIds, enumNames);
                }
            }
        }

        cacheObjectEnums[idObj] = {enumIds: enumIds, enumNames: enumNames};
        if (typeof callback === 'function') callback(enumIds, enumNames);
    }

    function getObjectEnumsSync(idObj, enumIds, enumNames) {
        if (!enumIds)   enumIds   = [];
        if (!enumNames) enumNames = [];

        if (cacheObjectEnums[idObj]) {
            for (var j = 0; j < cacheObjectEnums[idObj].enumIds.length; j++) {
                if (enumIds.indexOf(cacheObjectEnums[idObj].enumIds[j]) == -1) enumIds.push(cacheObjectEnums[idObj].enumIds[j]);
            }
            for (j = 0; j < cacheObjectEnums[idObj].enumNames.length; j++) {
                if (enumNames.indexOf(cacheObjectEnums[idObj].enumNames[j]) == -1) enumNames.push(cacheObjectEnums[idObj].enumNames[j]);
            }
            return {enumIds: enumIds, enumNames: enumNames};
        }


        for (var i = 0, l = enums.length; i < l; i++) {
            if (objects[enums[i]] &&
                objects[enums[i]].common &&
                objects[enums[i]].common.members &&
                objects[enums[i]].common.members.indexOf(idObj) !== -1) {
                if (enumIds.indexOf(enums[i]) == -1) enumIds.push(enums[i]);
                if (enumNames.indexOf(objects[enums[i]].common.name) == -1) enumNames.push(objects[enums[i]].common.name);
            }
        }

        if (objects[idObj]) {
            var pos = idObj.lastIndexOf('.');
            if (pos != -1) {
                var parent = idObj.substring(0, pos);
                if (parent && objects[parent]) {
                    return getObjectEnumsSync(parent, enumIds, enumNames);
                }
            }
        }

        cacheObjectEnums[idObj] = {enumIds: enumIds, enumNames: enumNames};
        return cacheObjectEnums[idObj];
    }
    //todo -------------------------------------------------------------

    function $(selector) {
        // following is supported
        // 'type[commonAttr=something]', 'id[commonAttr=something]', id(enumName="something")', id{nativeName="something"}
        // Type can be state, channel or device
        // Attr can be any of the common attributes and can have wildcards *
        // E.g. "state[id='hm-rpc.0.*]" or "hm-rpc.0.*" returns all states of adapter instance hm-rpc.0
        // channel(room="Living room") => all states in room "Living room"
        // channel{TYPE=BLIND}[state.id=*.LEVEL]
        // Switch all states with .STATE of channels with role "switch" in "Wohnzimmer" to false
        // $('channel[role=switch][state.id=*.STATE](rooms=Wohnzimmer)').setState(false);
        //
        // Following functions are possible, setValue, getValue (only from first), on, each

        // Todo CACHE!!!

        var result = {};

        var name = '';
        var commons = [];
        var _enums = [];
        var natives = [];
        var isName = true;
        var isCommons = false;
        var isEnums = false;
        var isNatives = false;
        var common = '';
        var native = '';
        var _enum = '';
        var parts;
        var len;

        // parse string
        for (var i = 0; i < selector.length; i++) {
            if (selector[i] == '{') {
                isName = false;
                if (isCommons || isEnums || isNatives) {
                    // Error
                    return [];
                }
                isNatives = true;
            } else if (selector[i] == '}') {
                isNatives = false;
                natives.push(native);
                native = '';
            } else if (selector[i] == '[') {
                isName = false;
                if (isCommons || isEnums || isNatives) {
                    // Error
                    return [];
                }
                isCommons = true;
            } else if (selector[i] == ']') {
                isCommons = false;
                commons.push(common);
                common = '';
            } else if (selector[i] == '(') {
                isName = false;
                if (isCommons || isEnums || isNatives) {
                    // Error
                    return [];
                }
                isEnums = true;
            } else if (selector[i] == ')') {
                isEnums = false;
                _enums.push(_enum);
                _enum = '';
            } else if (isName) {
                name += selector[i];
            } else if (isCommons) {
                common += selector[i];
            } else if (isEnums) {
                _enum += selector[i];
            } else if (isNatives) {
                native += selector[i];
            } //else {
            // some error
            //}
        }

        // If some error in the selector
        if (isEnums || isCommons || isNatives) {
            result.length = 0;
            result.each = function () {
                return this;
            };
            result.getState = function () {
                return null;
            };
            result.setState = function () {
                return this;
            };
            result.on = function () {
            };
        }

        if (isEnums) {
            adapter.log.warn('Invalid selector: enum close bracket cannot be found in "' + selector + '"');
            result.error = 'Invalid selector: enum close bracket cannot be found';
            return result;
        } else if (isCommons) {
            adapter.log.warn('Invalid selector: common close bracket cannot be found in "' + selector + '"');
            result.error = 'Invalid selector: common close bracket cannot be found';
            return result;
        } else if (isNatives) {
            adapter.log.warn('Invalid selector: native close bracket cannot be found in "' + selector + '"');
            result.error = 'Invalid selector: native close bracket cannot be found';
            return result;
        }

        var filterStates = [];

        for (i = 0; i < commons.length; i++) {
            parts = commons[i].split('=', 2);
            if (parts[1] && parts[1][0] == '"') {
                parts[1] = parts[1].substring(1);
                len = parts[1].length;
                if (parts[1] && parts[1][len - 1] == '"') parts[1] = parts[1].substring(0, len - 1);
            }
            if (parts[1] && parts[1][0] == "'") {
                parts[1] = parts[1].substring(1);
                len = parts[1].length;
                if (parts[1] && parts[1][len - 1] == "'") parts[1] = parts[1].substring(0, len - 1);
            }

            if (parts[1]) parts[1] = parts[1].trim();
            parts[0] = parts[0].trim();

            if (parts[0] == 'state.id') {
                filterStates.push({attr: parts[0], value: parts[1].trim()});
                commons[i] = null;
            } else {
                commons[i] = {attr: parts[0], value: parts[1].trim()};
            }
        }

        for (i = 0; i < natives.length; i++) {
            parts = natives[i].split('=', 2);
            if (parts[1] && parts[1][0] == '"') {
                parts[1] = parts[1].substring(1);
                len = parts[1].length;
                if (parts[1] && parts[1][len - 1] == '"') parts[1] = parts[1].substring(0, len - 1);
            }
            if (parts[1] && parts[1][0] == "'") {
                parts[1] = parts[1].substring(1);
                len = parts[1].length;
                if (parts[1] && parts[1][len - 1] == "'") parts[1] = parts[1].substring(0, len - 1);
            }

            if (parts[1]) parts[1] = parts[1].trim();
            parts[0] = parts[0].trim();
            if (parts[0] == 'state.id') {
                filterStates.push({attr: parts[0], value: parts[1].trim()});
                natives[i] = null;
            } else {
                natives[i] = {attr: parts[0].trim(), value: parts[1].trim()};
            }
        }

        for (i = 0; i < _enums.length; i++) {
            parts = _enums[i].split('=', 2);
            if (parts[1] && parts[1][0] == '"') {
                parts[1] = parts[1].substring(1);
                len = parts[1].length;
                if (parts[1] && parts[1][len - 1] == '"') parts[1] = parts[1].substring(0, len - 1);
            }
            if (parts[1] && parts[1][0] == "'") {
                parts[1] = parts[1].substring(1);
                len = parts[1].length;
                if (parts[1] && parts[1][len - 1] == "'") parts[1] = parts[1].substring(0, len - 1);
            }

            if (parts[1]) parts[1] = parts[1].trim();
            parts[0] = parts[0].trim();
            if (parts[0] == 'state.id') {
                filterStates.push({attr: parts[0], value: parts[1].trim()});
                _enums[i] = null;
            } else {
                _enums[i] = 'enum.' + parts[0].trim() + '.' + parts[1].trim();
            }
        }

        name = name.trim();
        if (name == 'channel' || name == 'device') {
            // Fill channels
            if (!channels || !devices) {
                channels = {};
                devices = {};
                for (var _id in objects) {
                    if (objects[_id].type == 'state') {
                        parts = _id.split('.');
                        parts.pop();
                        var chn = parts.join('.');

                        parts.pop();
                        var dev = parts.join('.');

                        devices[dev] = devices[dev] || [];
                        devices[dev].push(_id);

                        channels[chn] = channels[chn] || [];
                        channels[chn].push(_id);
                    }
                }
            }
        }

        var res = [];
        var resIndex = 0;
        var id;
        var s;
        var pass;
        if (name == 'channel') {
            for (id in channels) {
                if (!objects[id]) {
                    continue;
                }
                pass = true;
                for (var c = 0; c < commons.length; c++) {
                    if (!commons[c]) continue;
                    if (commons[c].attr == 'id') {
                        if (!commons[c].r && commons[c].value) commons[c].r = new RegExp('^' + commons[c].value.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
                        if (!commons[c].r || commons[c].r.test(id)) continue;
                    } else if (objects[id].common) {
                        if (commons[c].value === undefined && objects[id].common[commons[c].attr] !== undefined) continue;
                        if (objects[id].common[commons[c].attr] == commons[c].value) continue;
                    }
                    pass = false;
                    break;
                }
                if (!pass) continue;
                for (var n = 0; n < natives.length; n++) {
                    if (!natives[n]) continue;
                    if (natives[n].attr == 'id') {
                        if (!natives[n].r && natives[n].value) natives[n].r = new RegExp('^' + natives[n].value.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
                        if (!natives[n].r || natives[n].r.test(id)) continue;
                    } else if (objects[id].native) {
                        if (natives[n].value === undefined && objects[id].native[natives[n].attr] !== undefined) continue;
                        if (objects[id].native[natives[n].attr] == natives[n].value) continue;
                    }
                    pass = false;
                    break;
                }
                if (!pass) continue;

                if (_enums.length) {
                    var enumIds = [];
                    getObjectEnumsSync(id, enumIds);

                    for (var m = 0; m < _enums.length; m++) {
                        if (!_enums[m]) continue;
                        if (enumIds.indexOf(_enums[m]) != -1) continue;
                        pass = false;
                        break;
                    }
                    if (!pass) continue;
                }

                // Add all states of this channel to list
                for (s = 0; s < channels[id].length; s++) {
                    if (filterStates.length) {
                        pass = true;
                        for (var st = 0; st < filterStates.length; st++) {
                            if (!filterStates[st].r && filterStates[st].value) {
                                if (filterStates[st].value[0] == '*') {
                                    filterStates[st].r = new RegExp(filterStates[st].value.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
                                } else if (filterStates[st].value[filterStates[st].value - 1] == '*') {
                                    filterStates[st].r = new RegExp('^' + filterStates[st].value.replace(/\./g, '\\.').replace(/\*/g, '.*'));
                                } else {
                                    filterStates[st].r = new RegExp(filterStates[st].value.replace(/\./g, '\\.').replace(/\*/g, '.*'));
                                }
                            }
                            if (!filterStates[st].r || filterStates[st].r.test(channels[id][s])) continue;
                            pass = false;
                            break;
                        }
                        if (!pass) continue;
                    }
                    res.push(channels[id][s]);
                }
            }
        } else if (name == 'device') {
            for (id in devices) {
                if (!objects[id]) {
                    console.log(id);
                    continue;
                }
                pass = true;
                for (var _c = 0; _c < commons.length; _c++) {
                    if (!commons[_c]) continue;
                    if (commons[_c].attr == 'id') {
                        if (!commons[_c].r && commons[_c].value) commons[_c].r = new RegExp('^' + commons[_c].value.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
                        if (!commons[_c].r || commons[_c].r.test(id)) continue;
                    } else if (objects[id].common) {
                        if (commons[_c].value === undefined && objects[id].common[commons[_c].attr] !== undefined) continue;
                        if (objects[id].common[commons[_c].attr] == commons[_c].value) continue;
                    }
                    pass = false;
                    break;
                }
                if (!pass) continue;
                for (var n = 0; n < natives.length; n++) {
                    if (!natives[n]) continue;
                    if (natives[n].attr == 'id') {
                        if (!natives[n].r && natives[n].value) natives[n].r = new RegExp('^' + natives[n].value.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
                        if (!natives[n].r || natives[n].r.test(id)) continue;
                    } else if (objects[id].native) {
                        if (natives[n].value === undefined && objects[id].native[natives[n].attr] !== undefined) continue;
                        if (objects[i].native[natives[n].attr] == natives[n].value) continue;
                    }
                    pass = false;
                    break;
                }
                if (!pass) continue;

                if (_enums.length) {
                    var enumIds = [];
                    getObjectEnumsSync(id, enumIds);

                    for (var n = 0; n < _enums.length; n++) {
                        if (!_enums[n]) continue;
                        if (enumIds.indexOf(_enums[n]) != -1) continue;
                        pass = false;
                        break;
                    }
                    if (!pass) continue;
                }

                // Add all states of this channel to list
                for (s = 0; s < devices[id].length; s++) {
                    if (filterStates.length) {
                        pass = true;
                        for (var st = 0; st < filterStates.length; st++) {
                            if (!filterStates[st].r && filterStates[st].value) {
                                if (filterStates[st].value[0] == '*') {
                                    filterStates[st].r = new RegExp(filterStates[st].value.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
                                } else if (filterStates[st].value[filterStates[st].value - 1] == '*') {
                                    filterStates[st].r = new RegExp('^' + filterStates[st].value.replace(/\./g, '\\.').replace(/\*/g, '.*'));
                                } else {
                                    filterStates[st].r = new RegExp(filterStates[st].value.replace(/\./g, '\\.').replace(/\*/g, '.*'));
                                }
                            }
                            if (!filterStates[st].r || filterStates[st].r.test(devices[id][s])) continue;
                            pass = false;
                            break;
                        }
                        if (!pass) continue;
                    }
                    res.push(devices[id][s]);
                }
            }
        } else {
            var r = (name && name != 'state') ? new RegExp('^' + name.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$') : null;

            // state
            for (id in states) {
                if (r && !r.test(id)) continue;
                pass = true;

                if (commons.length) {
                    for (var c = 0; c < commons.length; c++) {
                        if (!commons[c]) continue;
                        if (commons[c].attr == 'id') {
                            if (!commons[c].r && commons[c].value) commons[c].r = new RegExp(commons[c].value.replace(/\./g, '\\.').replace(/\*/g, '.*'));
                            if (!commons[c].r || commons[c].r.test(id)) continue;
                        } else if (objects[id].common) {
                            if (commons[c].value === undefined && objects[id].common[commons[c].attr] !== undefined) continue;
                            if (objects[id].common[commons[c].attr] == commons[c].value) continue;
                        }
                        pass = false;
                        break;
                    }
                    if (!pass) continue;
                }
                if (natives.length) {
                    for (var n = 0; n < natives.length; n++) {
                        if (!natives[n]) continue;
                        if (natives[n].attr == 'id') {
                            if (!natives[n].r && natives[n].value) natives[id].r = new RegExp(natives[n].value.replace(/\./g, '\\.').replace(/\*/g, '.*'));
                            if (!natives[n].r || natives[n].r.test(id)) continue;
                        } else if (objects[id].native) {
                            if (natives[n].value === undefined && objects[id].native[natives[n].attr] !== undefined) continue;
                            if (objects[id].native[natives[n].attr] == natives[n].value) continue;
                        }
                        pass = false;
                        break;
                    }
                    if (!pass) continue;
                }

                if (filterStates.length) {
                    for (var st = 0; st < filterStates.length; st++) {
                        if (!filterStates[st].r && filterStates[st].value) {
                            if (filterStates[st].value[0] == '*') {
                                filterStates[st].r = new RegExp(filterStates[st].value.replace(/\./g, '\\.').replace(/\*/g, '.*') + '$');
                            } else if (filterStates[st].value[filterStates[st].value - 1] == '*') {
                                filterStates[st].r = new RegExp('^' + filterStates[st].value.replace(/\./g, '\\.').replace(/\*/g, '.*'));
                            } else {
                                filterStates[st].r = new RegExp(filterStates[st].value.replace(/\./g, '\\.').replace(/\*/g, '.*'));
                            }
                        }
                        if (!filterStates[st].r || filterStates[st].r.test(id)) continue;
                        pass = false;
                        break;
                    }
                    if (!pass) continue;
                }

                if (_enums.length) {
                    var enumIds = [];
                    getObjectEnumsSync(id, enumIds);

                    for (var n = 0; n < _enums.length; n++) {
                        if (!_enums[n]) continue;
                        if (enumIds.indexOf(_enums[n]) != -1) continue;
                        pass = false;
                        break;
                    }
                    if (!pass) continue;
                }
                // Add all states of this channel to list
                res.push(id);
            }

            // Now filter away by name
        }

        for (i = 0; i < res.length; i++) {
            result[i] = res[i];
        }
        result.length = res.length;
        result.each = function (callback) {
            if (typeof callback == 'function') {
                var r;
                for (var i = 0; i < this.length; i++) {
                    r = callback(result[i], i);
                    if (r === false) break;
                }
            }
            return this;
        };
        result.getState = function () {
            if (this[0]) return states[this[0]];

            return null;
        };
        result.setState = function (state, isAck, callback) {
            if (typeof isAck == 'function') {
                callback = isAck;
                isAck = undefined;
            }

            if (isAck === true || isAck === false || isAck === 'true' || isAck === 'false') {
                if (typeof state == 'object') {
                    state.ack = isAck;
                } else {
                    state = {val: state, ack: isAck};
                }
            }
            var cnt = 0;
            for (var i = 0; i < this.length; i++) {
                cnt++;
                adapter.setForeignState(this[i], state, function () {
                    cnt--;
                    if (!cnt && typeof callback === 'function') callback();
                });
            }
            return this;
        };
        result.on = function (callbackOrId, value) {
            for (var i = 0; i < this.length; i++) {
                subscribe(this[i], callbackOrId, value);
            }
            return this;
        };
        return result;
    }

    function log(msg, sev) {
        if (!sev) sev = 'info';
        if (!adapter.log[sev]) {
            msg = 'Unknown severity level "' + sev + '" by log of [' + msg + ']';
            sev = 'warn';
        }
        adapter.log[sev](msg);
    }

    function exec(cmd, callback) {
        //return mods.child_process.exec(cmd, callback);
    }

    function email(msg) {
        adapter.sendTo('email', msg);
    }

    function pushover(msg) {
        adapter.sendTo('pushover', msg);
    }

    function subscribe(pattern, callbackOrId, value) {
        if (typeof pattern == 'object') {
            if (pattern.astro) {
                return schedule(pattern, callbackOrId, value);
            } else if (pattern.time) {
                return schedule(pattern.time, callbackOrId, value);
            }
        }

        var callback;

        __engine.__subscriptions += 1;

        if (typeof pattern !== 'object' || pattern instanceof RegExp || pattern.source) {
            pattern = {id: pattern, change: 'ne'};
        }

        // add adapter namespace if nothing given
        if (pattern.id && typeof pattern.id == 'string' && pattern.id.indexOf('.') == -1) {
            pattern.id = adapter.namespace + '.' + pattern.id;
        }

        if (typeof callbackOrId === 'function') {
            callback = callbackOrId;
        } else {
            var that = this;
            if (typeof value === 'undefined') {
                callback = function (obj) {
                    that.setState(callbackOrId, obj.newState.val);
                };
            } else {
                callback = function (obj) {
                    that.setState(callbackOrId, value);
                };
            }
        }

        var subs = {
            pattern: pattern,
            callback: function (obj) {
                if (callback) callback.call( obj);
            },
            name: name
        };

        subscriptions.push(subs);
        if (pattern.enumName || pattern.enumId) isEnums = true;
        return subs;
    }

    function unsubscribe(idOrObject) {
        var i;
        if (typeof idOrObject === 'object') {
            for (i = subscriptions.length - 1; i >= 0; i--) {
                if (subscriptions[i] == idOrObject) {
                    subscriptions.splice(i, 1);
                    __engine.__subscriptions -= 1;
                    return true;
                }
            }
        } else {
            var deleted = 0;
            for (i = subscriptions.length - 1; i >= 0; i--) {
                if (subscriptions[i].name == name && subscriptions[i].pattern.id == idOrObject) {
                    deleted++;
                    subscriptions.splice(i, 1);
                    __engine.__subscriptions -= 1;
                }
            }
            return !!deleted;
        }
    }

    function on(pattern, callbackOrId, value) {
        return subscribe(pattern, callbackOrId, value);
    }

    function schedule(pattern, callback) {

        if (typeof callback !== 'function') {
            adapter.log.error(name + ': schedule callback missing');
            return;
        }

        __engine.__schedules += 1;

        if (pattern.astro) {

            var nowdate = new Date();

            if (adapter.config.latitude === undefined || adapter.config.longitude === undefined) {
                adapter.log.error('Longitude or latitude does not set. Cannot use astro.');
                return;
            }

            var ts = mods.suncalc.getTimes(nowdate, adapter.config.latitude, adapter.config.longitude)[pattern.astro];

            if (ts.getTime().toString() === 'NaN') {
                adapter.log.warn('Cannot calculate "' + pattern.astro + '" for ' + adapter.config.latitude + ', ' + adapter.config.longitude);
                ts = new Date(nowdate.getTime());

                if (pattern.astro == 'sunriseEnd' ||
                    pattern.astro == 'goldenHourEnd' ||
                    pattern.astro == 'sunset' ||
                    pattern.astro == 'nightEnd' ||
                    pattern.astro == 'nauticalDusk') {
                    ts.setMinutes(59);
                    ts.setHours(23);
                    ts.setSeconds(59);
                } else {
                    ts.setMinutes(59);
                    ts.setHours(23);
                    ts.setSeconds(58);
                }
            }

            if (ts && pattern.shift) {
                ts = new Date(ts.getTime() + (pattern.shift * 60000));
            }

            if (!ts || ts < nowdate) {
                var date = new Date(nowdate);
                // Event doesn't occur today - try again tomorrow
                // Calculate time till 24:00 and set timeout
                date.setDate(date.getDate() + 1);
                date.setMinutes(1); // Somtimes timer fires at 23:59:59
                date.setHours(0);
                date.setSeconds(0);
                date.setMilliseconds(0);
                date.setMinutes(-date.getTimezoneOffset());


                // Calculate new schedule in the next day
                setTimeout(function () {
                    if (__engine.__schedules > 0) __engine.__schedules--;

                    schedule(pattern, callback);
                }, date.getTime() - nowdate.getTime());

                return;
            }

            setTimeout(function () {
                //callback.call(sandbox);
                // Reschedule in 2 seconds
                setTimeout(function () {
                    if (__engine.__schedules > 0) __engine.__schedules--;
                    schedule(pattern, callback);
                }, 2000);

            }, ts.getTime() - nowdate.getTime());
        } else {
            // fix problem with sunday and 7
            if (typeof pattern == 'string') {
                var parts = pattern.replace(/\s+/g, ' ').split(' ');
                if (parts.length >= 5 && parts[5] >= 7) parts[5] = 0;
                pattern = parts.join(' ');
            }
            var schedule = mods['node-schedule'].scheduleJob(pattern, function () {
                //callback.call(sandbox);
            });

            script.schedules.push(schedule);
            return schedule;
        }
    }

    function getAstroDate(pattern, date) {
        if (date === undefined)
            date = new Date();

        if (typeof adapter.config.latitude === 'undefined' || typeof adapter.config.longitude === 'undefined') {
            adapter.log.error('Longitude or latitude does not set. Cannot use astro.');
            return;
        }

        var ts = mods.suncalc.getTimes(date, adapter.config.latitude, adapter.config.longitude)[pattern];

        if (ts === undefined || ts.getTime().toString() === 'NaN') {
            adapter.log.error('Cannot get astro date for "' + pattern + '"');
        }

        return ts;
    }

    function isAstroDay() {
        var nowDate = new Date();
        var dayBegin = getAstroDate('sunrise');
        var dayEnd = getAstroDate('sunset');
        if (dayBegin === undefined || dayEnd === undefined) {
            return;
        }

        return (nowDate >= dayBegin && nowDate <= dayEnd);
    }

    function clearSchedule(schedule) {
        for (var i = 0; i < script.schedules.length; i++) {
            if (script.schedules[i] == schedule) {
                if (!mods['node-schedule'].cancelJob(script.schedules[i])) {
                    adapter.log.error('Error by canceling scheduled job');
                }
                delete script.schedules[i];
                script.schedules.splice(i, 1);
                return true;
            }
        }
        return false;
    }

    function setState(id, state, isAck, callback) {
        if (typeof isAck == 'function') {
            callback = isAck;
            isAck = undefined;
        }

        if (isAck === true || isAck === false || isAck === 'true' || isAck === 'false') {
            if (typeof state == 'object') {
                state.ack = isAck;
            } else {
                state = {val: state, ack: isAck};
            }
        }

        if (states[id]) {
            adapter.setForeignState(id, state, function () {
                if (typeof callback === 'function') callback();
            });
        } else if (states[adapter.namespace + '.' + id]) {
            adapter.setState(id, state, function () {
                if (typeof callback === 'function') callback();
            });
        } else {
            if (objects[id]) {
                if (objects[id].type == 'state') {
                    adapter.setForeignState(id, state, function () {
                        if (typeof callback === 'function') callback();
                    });
                } else {
                    adapter.log.warn('Cannot set value of non-state object "' + id + '"');
                    if (typeof callback === 'function') callback('Cannot set value of non-state object "' + id + '"');
                }
            } else if (objects[adapter.namespace + '.' + id]) {
                if (objects[adapter.namespace + '.' + id].type == 'state') {
                    adapter.setState(id, state, function () {
                        if (typeof callback === 'function') callback();
                    });
                } else {
                    adapter.log.warn('Cannot set value of non-state object "' + adapter.namespace + '.' + id + '"');
                    if (typeof callback === 'function') callback('Cannot set value of non-state object "' + adapter.namespace + '.' + id + '"');
                }
            } else {
                adapter.log.warn('State "' + id + '" not found');
                if (typeof callback === 'function') callback('State "' + id + '" not found');
            }
        }
    }

    function setStateDelayed(id, state, isAck, delay, clearRunning, callback) {
        // find arguments
        if (typeof isAck != 'boolean') {
            callback = clearRunning;
            clearRunning = delay;
            delay = isAck;
            isAck = false;
        }
        if (typeof delay != 'number') {
            callback = clearRunning;
            clearRunning = delay;
            delay = 0
        }
        if (typeof clearRunning != 'boolean') {
            callback = clearRunning;
            clearRunning = true;
        }

        if (clearRunning === undefined) clearRunning = true;

        if (clearRunning) {
            if (timers[id]) {
                for (var i = 0; i < timers[id].length; i++) {
                    clearTimeout(timers[id][i]);
                }
                delete timers[id];
            }
        }
        // If no delay => start immediately
        if (!delay) {
            setState(id, state, isAck, callback);
        } else {
            // If delay
            timers[id] = timers[id] || [];

            // calculate timerId
            timerId++;
            if (timerId > 0xFFFFFFFE) timerId = 0;

            // Start timeout
            var timer = setTimeout(function (_timerId) {
                setState(id, state, isAck, callback);
                // delete timer handler
                if (timers[id]) {
                    for (var t = 0; t < timers[id].length; t++) {
                        if (timers[id][t].id == _timerId) {
                            timers[id].splice(t, 1);
                            break;
                        }
                    }
                    if (!timers[id].length) delete timers[id];
                }
            }, delay, timerId);

            // add timer handler
            timers[id].push({t: timer, id: timerId});
        }
    }

    function getState(id) {
        if (states[id]) return states[id];
        if (states[adapter.namespace + '.' + id]) return states[adapter.namespace + '.' + id];
        adapter.log.warn('State "' + id + '" not found');
        return null;
    }

    function getIdByName(name, alwaysArray) {
        if (alwaysArray) {
            if (typeof names[name] === 'string') return [names[name]];
            return names[name];
        } else {
            return names[name];
        }
    }

    function getObject(id, enumName) {
        if (enumName) {
            var e = getObjectEnumsSync(id);
            var obj = JSON.parse(JSON.stringify(objects[id]));
            obj.enumIds = JSON.parse(JSON.stringify(e.enumIds));
            obj.enumNames = JSON.parse(JSON.stringify(e.enumNames));
            if (typeof enumName == 'string') {
                var r = new RegExp('^enum\.' + enumName + '\.');
                for (var i = obj.enumIds.length - 1; i >= 0; i--) {
                    if (!r.test(obj.enumIds[i])) {
                        obj.enumIds.splice(i, 1);
                        obj.enumNames.splice(i, 1);
                    }
                }
            }

            return obj;
        } else {
            return JSON.parse(JSON.stringify(objects[id]));
        }
    }

    function setObject(id, obj, callback) {
        adapter.log.error('Function "setObject" is not allowed. Use adapter settings to allow it.');
        if (callback) callback('Function "setObject" is not allowed. Use adapter settings to allow it.');

    }

    function getEnums(enumName) {
        var result = [];
        var r = enumName ? new RegExp('^enum\.' + enumName + '\.') : false;
        for (var i = 0; i < enums.length; i++) {
            if (!r || r.test(enums[i])) {
                result.push({
                    id: enums[i],
                    members: (objects[enums[i]].common) ? objects[enums[i]].common.members : [],
                    name: objects[enums[i]].common.name
                });
            }
        }
        return JSON.parse(JSON.stringify(result));
    }

    function createState(name, initValue, forceCreation, common, native, callback) {
        if (typeof native == 'function') {
            callback = native;
            native = {};
        }
        if (typeof common == 'function') {
            callback = common;
            common = undefined;
        }
        if (typeof initValue == 'function') {
            callback = initValue;
            initValue = undefined;
        }
        if (typeof forceCreation == 'function') {
            callback = forceCreation;
            forceCreation = undefined;
        }
        if (typeof initValue == 'object') {
            common = initValue;
            native = forceCreation
            forceCreation = undefined;
            initValue = undefined;
        }
        if (typeof forceCreation == 'object') {
            common = forceCreation;
            native = common
            forceCreation = undefined;
        }
        common = common || {};
        common.name = common.name || name;
        common.role = common.role || 'javascript';
        common.type = common.type || 'mixed';
        if (initValue === undefined) initValue = common.def;

        native = native || {}

        if (forceCreation) {
            adapter.setObject(name, {
                common: common,
                native: native,
                type: 'state'
            }, function () {
                if (initValue !== undefined) {
                    adapter.setState(name, initValue, callback);
                } else {
                    if (callback) callback(name);
                }
            });
        } else {
            adapter.getObject(name, function (err, obj) {
                if (err || !obj) {
                    adapter.setObject(name, {
                        common: common,
                        native: native,
                        type: 'state'
                    }, function () {
                        if (initValue !== undefined) {
                            adapter.setState(name, initValue, callback);
                        } else {
                            adapter.setState(name, null, callback);
                        }
                    });
                } else {
                    // state yet exists
                    if (callback) callback(name);
                }
            });
        }
    }

    function sendTo(_adapter, cmd, msg, callback) {
        adapter.sendTo(_adapter, cmd, msg, callback);

    }

    function sendto(_adapter, cmd, msg, callback) {
        return sendTo(_adapter, cmd, msg, callback);

    }


    function formatDate(date, format, isDataObject) {
        if (typeof format == 'boolean') {
            isDataObject = format;
            format = null;
        }

        if (!format) {
            format = objects['system.config'] ? (objects['system.config'].common.dateFormat || 'DD.MM.YYYY') : 'DD.MM.YYYY';
        }

        return adapter.formatDate(date, !isDataObject, format);
    }

    function writeFile(fileName, data, callback) {
        adapter.writeFile(null, fileName, data, callback);
    }

    function readFile(fileName, callback) {
        adapter.readFile(null, fileName, callback);
    }

    function toInt(val) {
        if (val === true || val === 'true')  val = 1;
        if (val === false || val === 'false') val = 0;
        val = parseInt(val) || 0;
        return val;
    }

    function toFloat(val) {
        if (val === true || val === 'true')  val = 1;
        if (val === false || val === 'false') val = 0;
        val = parseFloat(val) || 0;
        return val;
    }

    function toBoolean(val) {
        if (val === '1' || val === 'true')  val = true;
        if (val === '0' || val === 'false') val = false;
        return !!val;
    }


    //todo -------------------------------------------------------------
    //todo -------------------------------------------------------------
    //todo -------------------------------------------------------------
    //todo -------------------------------------------------------------


    log("start");
    //vm.runInThisContext(script, "s_engine")
    eval("//@ sourceURL=s_engine\n" + _script);
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


            if (objects[id]) {
                name = objects[id].Name;
                parent = objects[id].Parent;
            }

            if (parent) {

                channelName = objects[parent].Name;
                channelType = objects[parent].HssType;

                // Räume finden
                var roomIndex = sim.regaIndex.ENUM_ROOMS;
                for (var i = 0; i < roomIndex.length; i++) {
                    var room = roomIndex[i];
                    if (objects[room].Channels.indexOf(parent) != -1) {
                        rooms.push(room);
                        roomNames.push(objects[room].Name);
                    }
                }

                // Gewerke finden
                var funcIndex = sim.regaIndex.ENUM_FUNCTIONS;
                for (var i = 0; i < funcIndex.length; i++) {
                    var func = funcIndex[i];
                    if (objects[func].Channels.indexOf(parent) != -1) {
                        funcs.push(func);
                        funcNames.push(objects[func].Name);
                    }
                }

                // Gerät
                var device = objects[parent].Parent;
                deviceName = (objects[device] ? objects[device].Name : undefined);
                deviceType = (objects[device] ? objects[device].HssType : undefined);

            }


            var oldObj = states[id];

            if (!oldObj) {
                oldObj = [];
            }

            states[id] = [obj[1], obj[2], obj[3], obj[4]];

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


            var length = subscribers.length;
            for (var i = 0; i < length; i++) {
                //
                if (patternMatching(eventObj, subscribers[i].pattern)) {
                    //$("#" + scope.mbs[subscribers[i].mbs_nr].mbs_id).children().effect("highlight", {color: "green"}, 800);
                    process.send(["trigger_highlight", subscribers[i].mbs_nr]);
                    subscribers[i].callback(eventObj);

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












