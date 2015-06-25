/**
 * Created by Schorling on 15.10.2014.
 */
(function () {
    $(document).ready(function () {
        var nw_gui = require('nw.gui');
        var path = require('path');
        var start_win = nw_gui.Window.get();
        var pkg = require('./update.json');
        var updater = require('node-webkit-updater');
        var upd = new updater(pkg);
        var copyPath;
        var execPath;


        var options = {
            "title": "ScriptGUI",
            "icon": "img/cube256.png",
            "toolbar": true,
            "frame": true,
            "width": 800,
            "height": 600,
            "min_width": 800,
            "min_height": 600,
            "max_width": "100%",
            "max_height": "100%",
            "resizable": true,
            "show": true
        };

        setTimeout(function () {
            start_win.show();
            if (nw_gui.App.argv.length) {
//            if (nw_gui.App.argv.length == 0) {
                //Updater----------------------------------------------------------------------
                $("#start_massage").text("Update");
                copyPath = nw_gui.App.argv[0];
                execPath = nw_gui.App.argv[1];

                upd.install(copyPath, function (err) {
                    if (!err) {
                        setTimeout(function(){
                            upd.run(execPath, [], {});
                            nw_gui.App.quit();
                        },500)
                    }
                });
            } else {
                //Starter-----------------------------------------------------------------------
                $("#start_massage").text("Start");
                var main_win = nw_gui.Window.open('index.html', options);

                main_win.on('document-end', function () {
                    main_win.window.haveParent(start_win);
                });

            }
        }, 20);
    });
})(jQuery);

