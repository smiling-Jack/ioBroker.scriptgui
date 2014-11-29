/**
 * Created by jack on 29.11.2014.
 */

process.on('message', function(m) {
    // Do work  (in this case just up-case the string
    m = m.toUpperCase();

    // Pass results back to parent process
    process.send(m.toUpperCase(m));
});

setInterval(function(){
    process.send($('body').toString());
    console.log("hallo")
},1000);






