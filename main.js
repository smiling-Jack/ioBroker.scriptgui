var net = require('net');
var utils = require(__dirname + '/lib/utils');
var adapter = utils.adapter('scriptgui');

//var back = require(__dirname +'/js/backend.js');
var back = require(__dirname +'/js/backend.js');

var main = {}

function init (){
   adapter.getForeignObject('*', function (err, obj) {
       main.objects = obj;
   });
    main.instances = adapter.getInstances();
    adapter.subscribeStates('*');
    back.intio();
}

if(process.argv[2] == "local"){
    console.log("--------Local--------")
    back.intio();
}else{



    adapter.on('ready', function () {
        console.log("--------ioBroker--------")
        init();
    });
}

