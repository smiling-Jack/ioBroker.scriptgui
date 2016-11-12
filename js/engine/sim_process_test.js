var xxx = 1

function a (){
    var hallo = 2;
    setTimeout(function(){
        xxx++;
        hallo ++;
        debugger
        xxx++;
        a()
    },1)
}

a();









