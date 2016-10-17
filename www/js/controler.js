angular.module('tutorialApp', [])
    .controller('GUICtrl', function ($scope, $compile) {

        var setup_default = {
            "mode":"gui",
            "user_id": "",
            "lang": "de",
            "theme": "dark-hive",
            "snap_grid": "",
            "tooltip": "",
            "fbs_wrap": true,
            "LT_open": false,
            "last_prg": "",
            "last_script": "",
            "last_open": "",
            "update": false,
            "user_name": "",
            "user_mail": "",
            "datastore": "",
            "last_start": "",
            "last_con": false,
            "auto_con": false,
            "con_type": "",
            "toolbox":"alg"
        };




        try {

                    var load = JSON.parse(localStorage.setup.split("}")[0] + "}");
                    $scope.setup = {
                        "mode" : load.mode || setup_default.mode,
                        "user_id": load.user_id || get_userid(),
                        "lang": load.lang || setup_default.lang,
                        "theme": load.theme || setup_default.theme,
                        "snap_grid": load.snap_grid || setup_default.snap_grid,
                        "tooltip": load.tooltip || setup_default.tooltip,
                        "fbs_wrap": load.fbs_wrap || setup_default.fbs_wrap,
                        "LT_open": load.LT_open || setup_default.LT_open,
                        "last_prg": load.last_prg || setup_default.last_prg,
                        "last_open": load.last_open || setup_default.last_open,
                        "last_script": load.last_script || setup_default.last_script,
                        "update": load.update || setup_default.update,
                        "user_name": load.user_name || setup_default.user_name,
                        "user_mail": load.user_mail || setup_default.user_mail,
                        "datastore": load.datastore || setup_default.datastore,
                        "last_start": load.last_start || setup_default.last_start,
                        "last_con": load.last_con || setup_default.last_con,
                        "auto_con": load.auto_con || setup_default.auto_con,
                        "con_type": load.con_type || setup_default.con_type,
                        "toolbox": load.toolbox || setup_default.toolbox,
                    };
            setTimeout(function(){
                angular_init()
            },0);



        } catch (err) {
            setup_default.user_id = get_userid();
            localStorage.setup = JSON.stringify(setup_default);
                $scope.setup = setup_default;
            setTimeout(function(){
                angular_init()
            },0);
        }


        function angular_init() {

            $scope.mbs = {};
            $scope.fbs = {};
            $scope.con = {
                mbs: {},
                fbs: {}
            };

            $scope.$apply();
            $scope.save_scope_watchers = function () {
                $scope.orig = angular.copy($scope.$$watchers);
            };

            $scope.reset_scope_watchers = function () {
                $scope.$$watchers = angular.copy($scope.orig);
            };

            $scope.add_mbs = function (id, data) {

                $scope.mbs[id] = data;
                $scope.$apply();
                console.log($scope)

            };

            $scope.append = function (wo, was) {
                var data = $compile(was);
                angular.element(wo).append(data($scope));
                $scope.$apply();
            };

//        $scope.$watch("mbs", function (newValue, oldValue) {
//            console.log("change mbs")
//
//        }, true);

//        $scope.$watch("fbs", function (newValue, oldValue) {
//            console.log("change fbs")
//        }, true);


//SETUP WATCHER ------------------------------------------------------------------------------------
            $scope.$watch("setup.snap_grid", function (newValue) {
                if (newValue) {
                    $("#img_set_grid_on").addClass("ui-state-focus")
                } else {
                    $("#img_set_grid_on").removeClass("ui-state-focus")
                }
            });
//-------------------------------------------------------------------------------------------------
            $(document).tooltip({
                content: function () {
                    return $(this).attr('title');
                }
            });
            $scope.$watch("setup.tooltip", function (newValue) {
                if (newValue) {
                    $("#img_set_tooltip_on").addClass("ui-state-focus");
                    $(document).tooltip("enable");

                } else {
                    $("#img_set_tooltip_on").removeClass("ui-state-focus");
                    var collection = $("[title]");
                    $(document).tooltip("disable");
                    collection.attr("title", "");
                }
            });
//-------------------------------------------------------------------------------------------------
            function set_theme(theme) {
                $("#theme_css").remove();
                $("head").append('<link id="theme_css" rel="stylesheet" href="css/' + theme + '/jquery-ui.min.css"/>');
                setTimeout(function () {
                    document.styleSheets[1].cssRules[3].style["background-color"] = $(".frame_color").css("background-color");
                    document.styleSheets[1].cssRules[4].style["background-color"] = $(".frame_color").css("background-color");
                }, 500);
            }

            set_theme($scope.setup.theme);

            $scope.$watch("setup.theme", function () {
                set_theme($scope.setup.theme)
            });
//-------------------------------------------------------------------------------------------------
            $scope.$watch("setup.last_prg", function (newValue, oldValue) {

                if (SGI.language && newValue != oldValue) {
                    SGI.save_setup()
                }
            });
//-------------------------------------------------------------------------------------------------

            //if (nw_gui.App.argv.length == 0) {
                $(document).ready(function () {
                    SGI.Setup();
                });
            //}

        }
    });


