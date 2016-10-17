var net = require('net');


//var back = require(__dirname +'/js/backend.js');
var back = require(__dirname +'/js/backend.js');

function main (){
    adapter.subscribeStates('*');
    back.intio();
}

if(process.argv[2] == "local"){
    console.log("--------Local--------")
    back.intio();
}else{
    var utils = require(__dirname + '/lib/utils');
    var adapter = utils.adapter('scriptgui');


    adapter.on('ready', function () {
        console.log("--------ioBroker--------")
        main();
    });
}

