/**
 * Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 * Lizenz: [CC BY-NC 3.0](http://creativecommons.org/licenses/by-nc/3.0/de/)
 */

jQuery.extend(true, SGI, {

    menu_iconbar: function () {
        $("#menu.sf-menu").superclick({
            hoverClass: 'sfHover',
            uiClass: 'ui-state-hover',  // jQuery-UI modified
            pathClass: 'overideThisToUse',
            pathLevels: 1,
            disableHI: false
        });

        $('li.ui-state-default').hover(
            function () {
                $(this).addClass('ui-state-hover');
            },
            function () {
                $(this).removeClass('ui-state-hover');
            }
        );

//        $("#img_iconbar").tooltip();
//        $("#menu").menu({position: {at: "left bottom"}});
        $("#m_neu").click(function () {
            SGI.clear();
        });
        $("#m_save").click(function () {
//            if ($("body").find(".ui-dialog:not(.quick-help)").length == 0) {
            SGI.save_local();
//            }
        });
        $("#m_save_as").click(function () {
//            if ($("body").find(".ui-dialog:not(.quick-help)").length == 0) {
            SGI.save_as_local();
//            }
        });
        $("#m_open").click(function () {
//            if ($("body").find(".ui-dialog:not(.quick-help)").length == 0) {

            SGI.open_local();

//            }
        });
        $("#m_example").click(function () {
            if ($("body").find(".ui-dialog:not(.quick-help)").length == 0) {
                SGI.example_ccu_io();
            }
        });
        $("#ul_id_auswahl li a").click(function () {
            $("#id_js").remove();
            $("head").append('<script id="id_js" type="text/javascript" src="js/hmSelect_' + $(this).data('info') + '.js"></script>');

            storage.set("ScriptGUI_idjs", ($(this).data('info')));
        });
        $("#ul_theme li a").click(function () {
            $("#theme_css").remove();
            $("head").append('<link id="theme_css" rel="stylesheet" href="css/' + $(this).data('info') + '/jquery-ui.min.css"/>');
            setTimeout(function () {
                document.styleSheets[1].cssRules[0].style["background-color"] = $(".frame_color").css("background-color");
                document.styleSheets[1].cssRules[1].style["background-color"] = $(".frame_color").css("background-color");
            }, 300);


        });

        $("#m_mode_gui").click(function () {
            if (!SGI.gui_rendered) {
                SGI.load_gui()
            }
            SGI.show_gui();
            SGI.hide_editor();
            scope.setup.mode = "gui";
            scope.$apply();
            SGI.save_setup()
        });

        $("#m_mode_editor").click(function () {
            if (!SGI.editor_rendered) {
                SGI.load_editor()
            }
            SGI.show_editor();
            SGI.hide_gui();
            scope.setup.mode = "editor";
            scope.$apply();
            SGI.save_setup()
        });

        $("#m_setup").click(function () {
            $("#setup_dialog").dialog("open");
        });

        $("#m_show_script").click(function () {
//            if ($("body").find(".ui-dialog:not(.quick-help)").length == 0) {

            var script = Compiler.make_prg(false, false);
            SGI.show_Script(script)
//            }
        });
        $("#m_save_script").click(function () {
            SGI.save_Script();
        });
        $("#m_del_script").click(function () {
            SGI.del_script();
        });
        $("#m_quick-help").click(function () {
            SGI.open_quick_help_dialog()
        });
        $("#m_shortcuts").click(function () {

            if ($("body").find(".shortcuts").length < 1) {

                $("body").append('\
                   <div id="dialog_shortcuts" style="text-align: left" title="Tastenkominationen">\
                    <table>\
                        <tr>\
                            <td>Ctrl + ' + SGI.translate("links Klick") + ' </td>\
                            <td>-> ' + SGI.translate("Schnell Hilfe") + ' </td>\
                        </tr>\
                        <tr>\
                            <td>Shift + ' + SGI.translate("links Klick") + ' </td>\
                            <td>-> ' + SGI.translate("Markierung umschalten") + ' </td>\
                        </tr>\
                        <tr>\
                            <td>Ctrl + C</td>\
                            <td>-> ' + SGI.translate("Markierte Bausteine kopieren") + ' </td>\
                        </tr>\
                        <tr>\
                            <td>"Entf</td>\
                            <td>-> ' + SGI.translate("Alle markierten Bausteine löschen") + ' </td>\
                        </tr>\
                   </table>\
                   </div>');

                $("#dialog_shortcuts").dialog({
                    width: "auto",
                    dialogClass: "shortcuts",
                    close: function () {
                        $("#dialog_shortcuts").remove();
                    }
                });
            }
        });
        $("#m_video").click(function () {
            nw_gui.Shell.openItem("http://www.youtube.com/playlist?list=PLsNM5ZcvEidhmzZt_mp8cDlAVPXPychU7")
        });
        $("#m_update").click(function () {
            SGI.update(true);

        });

        $("#grid").click(function () {
            var fbs_list = $(".fbs_element");

            $.each(fbs_list, function () {
                var o_left = $(this).position().left / SGI.zoom;
                var o_top = $(this).position().top / SGI.zoom;

                var n_left = parseInt(o_left / SGI.grid + 0.5) * SGI.grid;
                var n_top = parseInt(o_top / SGI.grid + 0.5) * SGI.grid;

                $(this).css({"left": n_left + "px", "top": n_top + "px"})
            })
        });

        $("#m_mbs-image").click(function () {

            var type;
            var left = $(".mbs_element").position().left;
            var height = $(".mbs_element").height();
            var width = $(".mbs_element").width();
            var top = $(".mbs_element").position().top;

            $.each(scope.mbs, function () {
                type = this.type
            });
            $(".mbs_element, ._jsPlumb_endpoint").wrapAll('<div id="photo" style="position: relative"></div>');
            $("._jsPlumb_endpoint").wrapAll('<div id="endpoints" style="position: relative"></div>');

//          Für Trigger
            $("#endpoints").css({
                left: 0 - left + "px",
                top: -2 - top - height + "px",
                position: "relative"
            });

            $(".mbs_element").css({
                left: 0,
                top: 0,
                position: "relative"
            });
            $("#photo").css({
                height: 12 + height + "px",
                width: 3 + width + "px",
                left: "50%",
                top: "50%",
                position: "relative"
            });

//            Für Pause,Intervall,Loop
//            $("#endpoints").css({
//                left: 10 - left + "px",
//                top: 0 - top + "px",
//                position: "relative"
//
//            });

            $(".mbs_element").css({
                left: 10,
                top: 0,
                position: "relative"

            });
            $("#photo").css({
                height: 2 + height + "px",
                width: 20 + width + "px",
                left: "50%",
                top: "50%"
            });


            var data = $("#photo").html();

            data = data
                .replace("<div", '<div style="height:' + height + 'px ; width:' + width + 'px "')
                .replace(/(ng-model="|ng-style=")[A-Za-z0-9\[\].]+"/g, "")
                .replace(/(id=")[A-Za-z0-9\[\]._]+"/g, "")
                .replace(/(ng-)[A-Za-z0-9\[\].]+/g, "")
                .replace(/(_jsPlumb_endpoint_anchor_|jsplumb-draggable|jsplumb-droppable)/g, "")
                .replace(/(_jsPlumb_endpoint)/g, "html_endpoint")
                .replace(/(mbs_element )/g, "mbs_html ");

            var h = $(window).height() - 10;
            var v = $(window).width() - 10;

            $("body").append('\
                   <div id="dialog_html" style="text-align: left" title="Scriptvorschau">\
                    <textarea id="codemirror_html" name="codemirror" class="code frame_color ui-corner-all"></textarea>\
                    <button id="save_html">Save</button>\
                   </div>');
            $("#dialog_html").dialog({
                height: h,
                width: v,
                resizable: true,
                close: function () {
                    $("#dialog_html").remove();
                    SGI.clear();
                }
            });

            $("#save_html").button().click(function () {
                bausteine[type] = {};
                bausteine[type]["data"] = editor.getValue();
                bausteine[type]["h"] = height;
                bausteine[type]["w"] = width;
                fs.writeFile(nwDir + '/../../src/js/bausteine.json', JSON.stringify(bausteine), function (err) {
                    if (err) {
                        throw err;
                    } else {
                        $("#dialog_html").dialog("close");
                    }
                });
            });

            var editor = CodeMirror.fromTextArea(document.getElementById("codemirror_html"), {
                mode: "xml",
                htmlMode: true,
                lineNumbers: true,
                readOnly: false,
                theme: "monokai"
            });
            editor.setOption("value", html_beautify(data.toString(), {indent_size: 2}));

        });

        $("#m_fbs-image").click(function () {

            var type = "";
            var left = $(".fbs_element").position().left;
            var height = $(".fbs_element").height();
            var width = $(".fbs_element").width();
            var top = $(".fbs_element").position().top;

            $.each(scope.fbs, function () {
                type = this.type
            });
            $(".fbs_element, ._jsPlumb_endpoint").wrapAll('<div id="photo" style="position: relative"></div>');
            $("._jsPlumb_endpoint").wrapAll('<div id="endpoints" style="position: relative"></div>');

//            $("#endpoints").css({
//                left: 10 -  width + "px",
//                top: -4  - top -height + "px",
//                position: "relative"
//            });

            $("#endpoints").css({
                left: -0 - left + "px",
                top: -4 - top - height + "px",
                position: "relative",
                zindex: 10000
            });

            $(".fbs_element").css({
                left: 8,
                top: 0,
                position: "relative"
            });
            $("#photo").css({
                height: 2 + height + "px",
                width: 20 + width + "px",
                position: "relative"
            });

            var data = $("#photo").html();

            data = data
                .replace("<div", '<div style="height:' + height + 'px ; width:' + width + 'px "')
                .replace(/(ng-bind="fbs\[0\].name")/g, "")
                .replace(/(ng-model="|ng-style=")[A-Za-z0-9\[\].]+"/g, "")
                .replace(/(id="|ng-style=")[A-Za-z0-9\[\]._]+"/g, "")
                .replace(/(ng-)[A-Za-z0-9\[\].]+/g, "")
                .replace(/(_jsPlumb_endpoint_anchor_|jsplumb-draggable|jsplumb-droppable)/g, "")
                .replace(/(_jsPlumb_endpoint)/g, "html_endpoint")
                .replace(/(fbs_element )/g, "fbs_html ");

            var h = $(window).height() - 10;
            var v = $(window).width() - 10;

            $("body").append('\
                   <div id="dialog_html" style="text-align: left" title="Scriptvorschau">\
                    <textarea id="codemirror_html" name="codemirror" class="code frame_color ui-corner-all"></textarea>\
                    <button id="save_html">Save</button>\
                   </div>');
            $("#dialog_html").dialog({
                height: h,
                width: v,
                resizable: true,
                close: function () {

                    $("#dialog_html").remove();
                    SGI.clear();
                }
            });

            $("#save_html").button().click(function () {
                bausteine[type] = {};
                bausteine[type]["data"] = editor.getValue();
                bausteine[type]["h"] = height;
                bausteine[type]["w"] = width;
                fs.writeFile(nwDir + '/../../src/js/bausteine.json', JSON.stringify(bausteine), function (err) {
                    if (err) {
                        throw err;
                    } else {
                        $("#dialog_html").dialog("close");
                    }
                });
            });

            var editor = CodeMirror.fromTextArea(document.getElementById("codemirror_html"), {
                mode: "xml",
                htmlMode: true,
                lineNumbers: true,
                readOnly: false,
                theme: "monokai"
            });
            editor.setOption("value", html_beautify(data.toString(), {indent_size: 2}));


        });

        $("#m_show_debugscript").click(function () {


            var script = Compiler.make_prg(sim.run_type, sim.step);
            SGI.show_Script(script)

        });

// Icon Bar XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

// Local
        $("#img_save_local").click(function () {

            SGI.save_local();


            $(this).stop(true, true).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        $("#img_open_local").click(function () {
            SGI.open_last();

            $(this).stop(true, true).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

// Ordnen
        $("#img_set_left").click(function () {
            var items = $(".jsplumb-drag-selected");
            if (items.length > 1) {

                function SortByName(a, b) {
                    var aName = $(a).position().left;
                    var bName = $(b).position().left;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                items.sort(SortByName);
                var position = $(items[0]).position().left;

                $.each(items, function () {
                    $(this).css("left", position);
                });

                var codebox = $(items.parent().parent()).attr("id");
                SGI.plumb_inst["inst_" + codebox].repaintEverything();
            }
            items = $(".mbs_selected");
            if (items.length > 1) {

                function SortByName(a, b) {
                    var aName = $(a).position().left;
                    var bName = $(b).position().left;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                items.sort(SortByName);
                var position = $(items[0]).position().left;

                $.each(items, function () {
                    $(this).css("left", position);
                });

                SGI.plumb_inst["inst_mbs"].repaintEverything();
            }
            $(this).stop(true, true).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        $("#img_set_right").click(function () {
            var position;
            var items = $(".jsplumb-drag-selected");

            if (items.length > 1) {
                function SortByName(a, b) {
                    var aName = $(a).position().left + $(a).width();
                    var bName = $(b).position().left + $(b).width();
                    return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
                }

                items.sort(SortByName);
                position = $(items[0]).position().left + $(items[0]).width();

                $.each(items, function () {
                    $(this).css("left", position - $(this).width());
                });

                var codebox = $(items.parent().parent()).attr("id");
                SGI.plumb_inst["inst_" + codebox].repaintEverything();
            }
            items = $(".mbs_selected");
            if (items.length > 1) {
                function SortByName(a, b) {
                    var aName = $(a).position().left + $(a).width();
                    var bName = $(b).position().left + $(b).width();
                    return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
                }

                items.sort(SortByName);
                position = $(items[0]).position().left + $(items[0]).width();

                $.each(items, function () {
                    $(this).css("left", position - $(this).width());
                });

                SGI.plumb_inst["inst_mbs"].repaintEverything();
            }
            $(this).stop(true, true).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        $("#img_set_top").click(function () {
            var position;
            var items = $(".jsplumb-drag-selected");
            if (items.length > 1) {
                function SortByName(a, b) {
                    var aName = $(a).position().top;
                    var bName = $(b).position().top;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                items.sort(SortByName);
                position = $(items[0]).position().top;

                $.each(items, function () {
                    $(this).css("top", position);
                });
                var codebox = $(items.parent().parent()).attr("id");
                SGI.plumb_inst["inst_" + codebox].repaintEverything();
            }
            items = $(".mbs_selected");
            if (items.length > 1) {
                function SortByName(a, b) {
                    var aName = $(a).position().top;
                    var bName = $(b).position().top;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                items.sort(SortByName);
                position = $(items[0]).position().top;

                $.each(items, function () {
                    $(this).css("top", position);
                });

                SGI.plumb_inst["inst_mbs"].repaintEverything();
            }
            $(this).stop(true, true).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        $("#img_set_bottom").click(function () {
            var position;
            var items = $(".jsplumb-drag-selected");
            if (items.length > 1) {
                function SortByName(a, b) {
                    var aName = $(a).position().top;
                    var bName = $(b).position().top;
                    return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
                }

                items.sort(SortByName);
                position = $(items[0]).position().top;

                $.each(items, function () {
                    $(this).css("top", position);
                });
                var codebox = $(items.parent().parent()).attr("id");
                SGI.plumb_inst["inst_" + codebox].repaintEverything();
            }
            var items = $(".mbs_selected");
            if (items.length > 1) {
                function SortByName(a, b) {
                    var aName = $(a).position().top;
                    var bName = $(b).position().top;
                    return ((aName > bName) ? -1 : ((aName < bName) ? 1 : 0));
                }

                items.sort(SortByName);
                position = $(items[0]).position().top;

                $.each(items, function () {
                    $(this).css("top", position);
                });

                SGI.plumb_inst["inst_mbs"].repaintEverything();
            }
            $(this).stop(true, true).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        $("#img_set_steps").click(function () {

            var items = $(".jsplumb-drag-selected");
            if (items.length > 1) {
                function SortByTop(a, b) {
                    var aName = $(a).position().top;
                    var bName = $(b).position().top;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                function SortByLeft(a, b) {
                    var aName = $(a).position().left;
                    var bName = $(b).position().left;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                var top_list = items.sort(SortByTop);
                var left_list = items.sort(SortByLeft);
                var left = $(left_list[0]).position().left;
                var top = $(top_list[0]).position().top;

                var step = 0;


                $.each(items, function () {
                    $(this).css("left", left + step);
                    $(this).css("top", top + step);

                    top = top + parseInt($(this).css("height").split("px")[0]);


                    step = step + 9;
                });
                var codebox = $(items.parent().parent()).attr("id");
                SGI.plumb_inst["inst_" + codebox].repaintEverything();

            }
            var items = $(".mbs_selected");
            if (items.length > 1) {
                function SortByTop(a, b) {
                    var aName = $(a).position().top;
                    var bName = $(b).position().top;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                function SortByLeft(a, b) {
                    var aName = $(a).position().left;
                    var bName = $(b).position().left;
                    return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
                }

                var top_list = items.sort(SortByTop);
                var left_list = items.sort(SortByLeft);
                var left = $(left_list[0]).position().left;
                var top = $(top_list[0]).position().top;

                var step = 0;


                $.each(items, function () {
                    $(this).css("left", left + step);
                    $(this).css("top", top + step);

                    top = top + parseInt($(this).css("height").split("px")[0]);


                    step = step + 9;
                });

                SGI.plumb_inst["inst_mbs"].repaintEverything();
            }
            $(this).stop(true, true).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

// Scale
        $("#img_set_zoom").click(function () {
            SGI.zoom = 1;

            $.each(SGI.plumb_inst, function (idx) {
                SGI.plumb_inst[idx].setZoom(SGI.zoom);
            });


            $("#prg_panel").css({
                "transform": "scale(" + SGI.zoom + ")",
                "-ms-transform": "scale(" + SGI.zoom + ")",
                "-webkit-transform": "scale(" + SGI.zoom + ")"
            });
            $(this).stop(true, true).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );
        $("#img_set_zoom_in").click(function () {
            SGI.zoom = SGI.zoom + 0.1;
            $.each(SGI.plumb_inst, function (idx) {
                SGI.plumb_inst[idx].setZoom(SGI.zoom);
            });
            $("#prg_panel").css({
                "transform": "scale(" + SGI.zoom + ")",
                "-ms-transform": "scale(" + SGI.zoom + ")",
                "-webkit-transform": "scale(" + SGI.zoom + ")"
            });

            $(this).stop(true, true).effect("highlight")
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );
        $("#img_set_zoom_out").click(function () {
            SGI.zoom = SGI.zoom - 0.1;
            $.each(SGI.plumb_inst, function (idx) {
                SGI.plumb_inst[idx].setZoom(SGI.zoom);
            });

            $("#prg_panel").css({
                "transform": "scale(" + SGI.zoom + ")",
                "-ms-transform": "scale(" + SGI.zoom + ")",
                "-webkit-transform": "scale(" + SGI.zoom + ")"
            });

            $(this).stop(true, true).effect("highlight");
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );


        $("#img_set_code_format").click(function () {
            var curser = SGI.editor.selection.getCursor()
            SGI.editor.setValue(js_beautify(SGI.editor.getValue()), -1);
            SGI.editor.selection.moveCursorToPosition(curser)
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        $("#img_set_show_oid").click(function () {

        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        var script_engine_lock = false;
        $("#img_set_script_engine").click(function () {
            if (!script_engine_lock) {
                try {

                    SGI.socket.emit("reloadScriptEngine");


                } catch (err) {
                    alert("Keine Verbindung zu CCU.IO");
                }

                script_engine_lock = true;
                $(this).stop(true, true).effect("highlight", "linear", 6000, function () {
                    script_engine_lock = false;
                })

            }
        }).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

// Grid
        $("#img_set_grid_on").click(function () {
                if ($(this).hasClass("ui-state-focus")) {
                    scope.setup.snap_grid = false;
                } else {
                    scope.setup.snap_grid = true;
                }
                scope.$apply();
                $(this).stop(true, true).effect("highlight")
            }
        );
// Tolltip
        $("#img_set_tooltip_on").click(function () {
                if ($(this).hasClass("ui-state-focus")) {
                    scope.setup.tooltip = false;
                } else {
                    scope.setup.tooltip = true;
                }
                scope.$apply();
                $(this).stop(true, true).effect("highlight")
            }
        );
// Connection


        $("#btn_con_offline").click(function () {
            $(this).parent().stop(true, true).effect("highlight");
            if ($(this).parent().hasClass("div_img_glass_on")) {
                SGI.disconnect()
            } else {
                SGI.disconnect();
                SGI.offline()
            }
        }).hover(
            function () {
                $(this).parent().addClass("ui-state-focus");
            }, function () {
                $(this).parent().removeClass("ui-state-focus");
            }
        );
        $("#btn_con_online").click(function () {
            $(this).parent().stop(true, true).effect("highlight");
            if ($(this).parent().hasClass("div_img_glass_on")) {
                SGI.disconnect()
            } else {
                SGI.disconnect()
                SGI.online()
            }

        }).hover(
            function () {
                $(this).parent().addClass("ui-state-focus");
            }, function () {
                $(this).parent().removeClass("ui-state-focus");
            }
        );

// Live Test
        $("#img_set_script_play").button().click(function () {
                if (SGI.con_data) {
                    if (!SGI.sim_run) {
                        $("#prg_body").css("border-color", "red")
                        $("#img_set_script_play").append('<div id="play_overlay"  ></div>')
                        sim.simulate();

                    }

                } else {
                    alert("Keine Online/Offline daten")
                }
            }
        ).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );

        $("#img_set_script_stop").button().click(function () {
                sim.stopsim();
            }
        ).hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            }
        );


        $("#run_type").buttonset();


        $('.run_type').click(function (id) {

            sim.run_type = $(".run_type:checked").data("info");
        });

        $('#run_step').click(function (id) {

            $('#lba_run_step').removeClass("ui-state-focus");

            sim.step = $('#lba_run_step').attr("aria-pressed")

        });

        $("#prg_panel").on("click", ".btn_min_trigger", function () {
            if (!SGI.sim_run) {
                $($(this).parent().parent()).find(".div_hmid_trigger").toggle({
                    progress: function () {
                        SGI.plumb_inst.inst_mbs.repaintEverything();
                    }
                });
            }
            $(this).stop(true, true).effect("highlight");

        });
        $("#prg_panel").on("click", ".btn_min_obj", function () {
            $($(this).parent().parent()).find(".div_hmid_trigger").toggle();
            $(this).stop(true, true).effect("highlight");

        });
    },

    Setup_dialog: function () {
        $('.setup_cat').hover(
            function () {
                $(this).addClass('ui-state-hover');
            },
            function () {
                $(this).removeClass('ui-state-hover');
            }
        );

        $(".setup_cat").click(function () {
            $(".setup_field_content").hide();
            $("#" + $(this).data("info")).show();
        });


        $(".setup_field_content").hide();
        $("#setup_alg").show();
    },

    context_menu: function () {

        $(document).on('mouseenter', ".context-menu-item", function () {

            $(this).toggleClass("ui-state-focus")
        });
        $(document).on('mouseleave', ".context-menu-item", function () {
            $(this).toggleClass("ui-state-focus")

        });

        $(document).on('mouseenter', ".div_hmid_font", function () {

            $(this).toggleClass("ui-state-focus")
        });
        $(document).on('mouseleave', ".div_hmid_font", function () {
            $(this).toggleClass("ui-state-focus")

        });

        $(document).on('mouseenter', ".div_hmid_filter_font", function () {

            $(this).toggleClass("ui-state-focus")
        });
        $(document).on('mouseleave', ".div_hmid_filter_font", function () {
            $(this).toggleClass("ui-state-focus")

        });

        $(document).on('mouseenter', ".div_hmid_val", function () {

            $(this).toggleClass("ui-state-focus")
        });
        $(document).on('mouseleave', ".div_hmid_val", function () {
            $(this).toggleClass("ui-state-focus")

        });

// Body zum debuggen auskommentieren  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        $.contextMenu({
            selector: 'body',
            items: {
                "body": {
                    name: "body"
                }
            }
        });
        $("body").contextMenu(false);

        // Codebox  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        $.contextMenu({
            selector: '.titel_codebox',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Del": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_codebox(opt)
                    }
                }
            }
        });

        // FBS_Element   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        $.contextMenu({
            selector: '.fbs_element_varinput',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: SGI.translate("Eingang Hinzufügen"),
                    className: "item_font ",
                    callback: function (key, opt) {
                        SGI.add_input(opt)
                    }
                },
                "Del": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_fbs(opt)
                    }
                }
            }
        });
        $.contextMenu({
            selector: '.fbs_element_simpel',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Del": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_fbs(opt)
                    }
                }
            }
        });
        $.contextMenu({
            selector: '.fbs_element_onborder',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Del": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_fbs_onborder(opt)
                    }
                }
            }
        });
        $.contextMenu({
            selector: '.fbs_element_tr',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Del": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_fbs(opt)
                    }
                }
            }
        });

        $.contextMenu({
            selector: '.fbs_element_exp',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Del": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_fbs(opt)
                    }
                },
                "Save": {
                    name: SGI.translate("Save Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.expert_save(opt)
                    }
                }
            }
        });

        $.contextMenu({
            selector: '.fbs_exp_custom',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Del": {
                    name: SGI.translate("Lösche Vorlage"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.expert_del(opt)
                    }
                }
            }
        });

        // Trigger   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        $.contextMenu({
            selector: ".tr_singel",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: SGI.translate("Add ID"),
                    className: "item_font ",
                    callback: function (key, opt) {
                        SGI.add_trigger_hmid(opt.$trigger, "singel")
                    }
                },
                "Del_elm": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_mbs(opt)
                    }
                }
            }
        });
        $.contextMenu({
            selector: ".tr_vartime",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: SGI.translate("Add ID"),
                    className: "item_font ",
                    callback: function (key, opt) {
                        SGI.add_trigger_hmid(opt.$trigger, "object")
                    }
                },
                "Del_elm": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_mbs(opt)
                    }
                }
            }
        });
        $.contextMenu({
            selector: ".tr_val",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: SGI.translate("Add ID"),
                    className: "item_font ",
                    callback: function (key, opt) {
                        SGI.add_trigger_hmid(opt.$trigger, "singel", "val")
                    }
                },
                "Del_elm": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_mbs(opt)
                    }
                }
            }
        });
        $.contextMenu({
            selector: ".tr_simpel",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Del_elm": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_mbs(opt)
                    }
                }
            }
        });
        $.contextMenu({
            selector: ".tr_time",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: SGI.translate("Add Zeit"),
                    className: "item_font ",
                    callback: function (key, opt) {
                        var nr = $(opt.$trigger).data("nr");
                        scope.mbs[nr]["time"].push("00:00");
                        scope.mbs[nr]["day"].push("88");
                        scope.$apply();
                        var $this = $(opt.$trigger).find(".div_hmid_trigger");
                        $($this).children().remove();
                        SGI.add_trigger_time($(opt.$trigger));
                        SGI.plumb_inst.inst_mbs.repaintEverything()

                    }
                },
                "Del_elm": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_mbs(opt)
                    }
                }
            }
        });
        $.contextMenu({
            selector: ".tr_astro",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: SGI.translate("Add Astro"),
                    className: "item_font ",
                    callback: function (key, opt) {
                        var nr = $(opt.$trigger).data("nr");
                        scope.mbs[nr]["minuten"].push("0");
                        scope.mbs[nr]["astro"].push("sunset");
                        var $this = $(opt.$trigger).find(".div_hmid_trigger");
                        $($this).children().remove();
                        SGI.add_trigger_astro($(opt.$trigger));
                        SGI.plumb_inst.inst_mbs.repaintEverything()

                    }
                },
                "Del_elm": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_mbs(opt)
                    }
                }
            }
        });
        $.contextMenu({
            selector: ".div_hmid_font",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: SGI.translate("Add ID"),
                    className: "item_font ",
                    callback: function (key, opt) {
                        if (opt.$trigger.parent().parent().attr("id").split("_")[1] == "vartime") {
                            SGI.add_trigger_hmid(opt.$trigger.parent().parent(), "object")
                        } else {
                            SGI.add_trigger_hmid(opt.$trigger.parent().parent(), "singel")
                        }
                    }
                },
                "Del_id": {
                    name: SGI.translate("Entferne ID"),
                    className: "item_font",
                    callback: function (key, opt) {

                        SGI.del_trigger_hmid(opt)
                    }
                },
                "Del_elm": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        opt.$trigger = $(opt.$trigger).parent().parent();
                        SGI.del_mbs(opt);
                    }
                }
            }
        });
        $.contextMenu({
            selector: ".div_hmid_filter_font_device",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: SGI.translate("Add Gerät"),
                    className: "item_font ",
                    callback: function (key, opt) {

                        SGI.add_filter_device(opt.$trigger.parent().parent());

                    }
                },
                "Del_id": {
                    name: SGI.translate("Entferne Gerät"),
                    className: "item_font",
                    callback: function (key, opt) {

                        SGI.del_filter_item(opt)
                    }
                },
                "Del_elm": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        opt.$trigger = $(opt.$trigger).parent().parent();
                        SGI.del_mbs(opt);
                    }
                }
            }
        });
        $.contextMenu({
            selector: ".div_hmid_filter_font_channel",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: SGI.translate("Add Kanal"),
                    className: "item_font ",
                    callback: function (key, opt) {

                        SGI.add_filter_channel(opt.$trigger.parent().parent());

                    }
                },
                "Del_id": {
                    name: SGI.translate("Entferne Kanal"),
                    className: "item_font",
                    callback: function (key, opt) {

                        SGI.del_filter_item(opt)
                    }
                },
                "Del_elm": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        opt.$trigger = $(opt.$trigger).parent().parent();
                        SGI.del_mbs(opt);
                    }
                }
            }
        });
        $.contextMenu({
            selector: ".div_hmid_filter_font_dp",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: SGI.translate("Add Datenpunkt"),
                    className: "item_font ",
                    callback: function (key, opt) {

                        SGI.add_filter_dp(opt.$trigger.parent().parent());

                    }
                },
                "Del_id": {
                    name: SGI.translate("Entferne Datenpunkt"),
                    className: "item_font",
                    callback: function (key, opt) {

                        SGI.del_filter_item(opt)
                    }
                },
                "Del_elm": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        opt.$trigger = $(opt.$trigger).parent().parent();
                        SGI.del_mbs(opt);
                    }
                }
            }
        });
        $.contextMenu({
            selector: ".div_hmid_val",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: SGI.translate("Add ID"),
                    className: "item_font ",
                    callback: function (key, opt) {
                        opt.$trigger = $(opt.$trigger).parent().parent().parent();
//                        SGI.add_trigger_hmid(opt.$trigger, "val")
                        SGI.add_trigger_hmid(opt.$trigger, "singel", "val")
                    }
                },
                "Del_id": {
                    name: SGI.translate("Entferne ID"),
                    className: "item_font",
                    callback: function (key, opt) {

                        SGI.del_trigger_val(opt)
                    }
                },
                "Del_elm": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        opt.$trigger = $(opt.$trigger).parent().parent();
                        SGI.del_mbs(opt);
                    }
                }
            }
        });
        $.contextMenu({
            selector: ".mbs_element_kommentar",
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Del_elm": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_mbs(opt)
                    }
                },
                "background": {
                    "name": SGI.translate("Hintergrund"),
                    className: "ui-corner-all ui-widget-content",
                    "items": {
                        "back-red": {
                            className: "item_font",
                            "name": SGI.translate("Rot"),
                            callback: function (key, opt) {
                                scope.mbs[$(opt.$trigger).attr("id").split("_")[1]].style["background-color"] = "red";
                                scope.$apply();
                            }
                        },
                        "back-green": {
                            className: "item_font",
                            "name": SGI.translate("Grün"),
                            callback: function (key, opt) {
                                scope.mbs[$(opt.$trigger).attr("id").split("_")[1]].style["background-color"] = "green";
                                scope.$apply();

                            }
                        },
                        "back-yellow": {
                            className: "item_font",
                            "name": SGI.translate("Gelb"),
                            callback: function (key, opt) {
                                scope.mbs[$(opt.$trigger).attr("id").split("_")[1]].style["background-color"] = "yellow";
                                scope.$apply();

                            }
                        },
                        "back-trans": {
                            className: "item_font",
                            "name": SGI.translate("Transparent"),
                            callback: function (key, opt) {
                                scope.mbs[$(opt.$trigger).attr("id").split("_")[1]].style["background-color"] = "transparent";
                                scope.$apply();

                            }
                        }
                    }
                },
                "font": {
                    "name": SGI.translate("Schrift"),
                    className: "ui-corner-all ui-widget-content ",
                    "items": {
                        "font-red": {
                            className: "item_font",
                            "name": SGI.translate("Rot"),
                            callback: function (key, opt) {
                                scope.mbs[$(opt.$trigger).attr("id").split("_")[1]].style["color"] = "red";
                                scope.$apply();
                            }
                        },
                        "font-green": {
                            className: "item_font",
                            "name": SGI.translate("Grün"),
                            callback: function (key, opt) {
                                scope.mbs[$(opt.$trigger).attr("id").split("_")[1]].style["color"] = "green";
                                scope.$apply();
                            }
                        },
                        "font-yellow": {
                            className: "item_font",
                            "name": SGI.translate("Gelb"),
                            callback: function (key, opt) {
                                scope.mbs[$(opt.$trigger).attr("id").split("_")[1]].style["color"] = "yellow";
                                scope.$apply();
                            }
                        },
                        "font-white": {
                            className: "item_font",
                            "name": SGI.translate("Weiß"),
                            callback: function (key, opt) {
                                scope.mbs[$(opt.$trigger).attr("id").split("_")[1]].style["color"] = "white";
                                scope.$apply();
                            }
                        },
                        "font-black": {
                            className: "item_font",
                            "name": SGI.translate("Schwarz"),
                            callback: function (key, opt) {
                                scope.mbs[$(opt.$trigger).attr("id").split("_")[1]].style["color"] = "black";
                                scope.$apply();
                            }
                        }
                    }
                }
            }
        });

        $.contextMenu({
            selector: '.mbs_element_simpel',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Del": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_mbs(opt)
                    }
                }
            }
        });

// I/O´s   XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        $.contextMenu({
            selector: '.fbs_element_io',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: SGI.translate("ID Auswahl"),
                    className: "item_font ",
                    callback: function (key, opt) {
                        SGI.change_id(opt)
                    }
                },
                "Del": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_fbs(opt)
                    }
                }
            }
        });
        $.contextMenu({
            selector: '.fbs_element_io_fix',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Del": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_fbs(opt)
                    }
                }
            }
        });

        $.contextMenu({
            selector: '.fbs_element_i_liste',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: SGI.translate("ID Auswahl"),
                    className: "item_font ",
                    callback: function (key, opt) {
                        SGI.change_i_liste(opt)
                    }
                },
                "Del": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_fbs(opt)
                    }
                }
            }
        });

        $.contextMenu({
            selector: '.fbs_element_io_local',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            items: {
                "Add Input": {
                    name: SGI.translate("ID Auswahl"),
                    className: "item_font ",
                    callback: function (key, opt) {
                        SGI.change_local(opt)
                    }
                },
                "Del": {
                    name: SGI.translate("Entferne Element"),
                    className: "item_font",
                    callback: function (key, opt) {
                        SGI.del_fbs(opt)
                    }
                }
            }
        });

        //TODO REMOVE
        $.contextMenu({
            selector: '._jsPlumb_connector',
            zIndex: 9999,
            className: "ui-widget-content ui-corner-all",
            build: function ($trigger) {
                if ($trigger.parent().attr("id") == "prg_panel") {
                    return {
                        className: "ui-widget-content ui-corner-all",
                        items: {
                            "auto_route": {
                                name: SGI.translate("Auto route"),
                                className: "item_font ",
                                callback: function () {
                                    $(".dot").remove();
                                    scope.con.mbs[SGI.con.id].connector.stub = [30, 30];
                                    scope.con.mbs[SGI.con.id].connector.midpoint = 0.5;
                                    SGI.con.setConnector(["Flowchart", {
                                        stub: [30, 30],
                                        alwaysRespectStubs: true,
                                        midpoint: 0.5
                                    }]);
                                    scope.$apply();
                                }
                            }
                        }
                    }
                }

                return {
                    className: "ui-widget-content ui-corner-all",
                    items: {
                        "add_Force": {
                            name: SGI.translate("Add Force"),
                            className: "item_font ",
                            callback: function () {
                                SGI.add_force(SGI.con);
                            }
                        },
                        "del_Force": {
                            name: SGI.translate("Del Force"),
                            className: "item_font ",
                            callback: function () {

                                SGI.del_force(SGI.con);

                            }
                        },
                        "auto_route": {
                            name: SGI.translate("Auto route"),
                            className: "item_font ",
                            callback: function () {
                                $(".dot").remove();
                                scope.con.fbs[$trigger.parent().attr("id")][SGI.con.id].connector.stub = [30, 30];
                                scope.con.fbs[$trigger.parent().attr("id")][SGI.con.id].connector.midpoint = 0.5;
                                SGI.con.setConnector(["Flowchart", {
                                    stub: [30, 30],
                                    alwaysRespectStubs: true,
                                    midpoint: 0.5
                                }]);
                                scope.$apply();
                            }
                        }
                    }
                }
            }

        });

    },

    save_as_local: function () {
        if (SGI.mode == "gui") {
            var data = SGI.make_savedata();
            var chooser = $('#prgsaveas');
            chooser.change(function () {
                var filep = $(this).val();
                fs.writeFile(filep, JSON.stringify(data), function (err) {
                    if (err) {
                        throw err;
                    } else {
                        SGI.prg_store = path.dirname(filep);
                        SGI.file_name = path.basename(filep);
                        $("#m_file").text(SGI.file_name);
                        scope.setup.last_prg = filep;
                        scope.$apply()
                    }
                });
            });
            chooser.trigger('click');
        } else {
            var data = SGI.editor.getValue();
            var chooser = $('#scriptsaveas');
            chooser.change(function () {
                var filep = $(this).val();
                fs.writeFile(filep, data, function (err) {
                    if (err) {
                        throw err;
                    } else {
                        SGI.prg_store = path.dirname(filep);
                        SGI.file_name = path.basename(filep);
                        $("#m_file").text(SGI.file_name);
                        scope.setup.last_script = filep;
                        scope.$apply()
                    }
                });
            });
            chooser.trigger('click');
        }
    },

    save_local: function () {
        if (SGI.file_name == "") {
            SGI.save_as_local()
        } else {
            if (SGI.mode == "gui") {
                var data = JSON.stringify(SGI.make_savedata());

            } else {
                var data = SGI.editor.getValue();

            }
            try {
                console.log(SGI.file_name)
                fs.writeFile(path.resolve(scope.setup.datastore + "/ScriptGUI_Data/programms/" + SGI.file_name), data, function (err) {
                    if (err) {
                        throw err;
                    } else {


                    }
                });
            } catch (err) {
                alert("Speichern nicht möglich")
            }
        }
    },

    open_local: function () {
        if (SGI.mode == "gui") {
            var chooser = $('#prgopen');
            chooser.val("");
            chooser.change(function (evt) {
                var filep = $(this).val();
                $("#wait_div").show();
                try {

                    fs.readFile(filep, function (err, data) {
                        if (err) {
                            $("#wait_div").hide();
                            throw err;
                        } else {
                            SGI.clear();
                            SGI.load_prg(JSON.parse(data));

                            SGI.prg_store = path.dirname(filep);
                            SGI.file_name = path.basename(filep);
                            $("#m_file").text(SGI.file_name);
                            scope.setup.last_prg = filep;
                            scope.$apply();
                            $("#wait_div").hide();
                        }
                    });
                }
                catch (err) {
                    $("#wait_div").hide();
                    throw err
                }
            });

            chooser.trigger('click');
        } else {
            var chooser = $('#scriptopen');
            chooser.val("");
            chooser.change(function (evt) {
                var filep = $(this).val();
                $("#wait_div").show();
                try {

                    fs.readFile(filep, function (err, data) {
                        if (err) {
                            $("#wait_div").hide();
                            throw err;
                        } else {

                            SGI.editor.setValue(data.toString(), -1);

                            SGI.prg_store = path.dirname(filep);
                            SGI.file_name = path.basename(filep);
                            $("#m_file").text(SGI.file_name);
                            scope.setup.last_script = filep;
                            scope.$apply();
                            $("#wait_div").hide();
                        }
                    });
                }
                catch (err) {
                    $("#wait_div").hide();
                    throw err
                }
            });
            chooser.trigger('click');
        }
    },

    open_last: function () {
        if (SGI.mode == "gui") {
            if (scope.setup.last_prg != "") {
                try {
                    $("#wait_div").show();
                    fs.readFile(scope.setup.last_prg, function (err, data) {
                        if (err) {
                            $("#wait_div").hide();
                            alert("Datei kann nicht gelesen werden")
                        } else {
                            SGI.clear();
                            SGI.load_prg(JSON.parse(data));
                            SGI.prg_store = path.dirname(scope.setup.last_prg);
                            SGI.file_name = path.basename(scope.setup.last_prg);
                            $("#m_file").text(SGI.file_name);
                            $("#wait_div").hide();
                        }
                    });
                }
                catch (err) {
                    $("#wait_div").hide();
                    throw err
                }
            }
        } else {
            if (scope.setup.last_script != "") {
                try {
                    $("#wait_div").show();
                    fs.readFile(scope.setup.last_script, function (err, data) {
                        if (err) {
                            $("#wait_div").hide();
                            alert("Datei kann nicht gelesen werden")
                        } else {

                            SGI.editor.setValue(data.toString());
                            SGI.editor.gotoLine(0);

                            SGI.prg_store = path.dirname(scope.setup.last_script);
                            SGI.file_name = path.basename(scope.setup.last_script);
                            $("#m_file").text(SGI.file_name);
                            $("#wait_div").hide();
                        }
                    });
                }
                catch (err) {
                    $("#wait_div").hide();
                    throw err
                }
            }
        }

    },

    example_ccu_io: function () {
        $.fm({
            lang: SGI.language,
            path: "www/ScriptGUI/example/",
            file_filter: ["prg"],
            folder_filter: true,
            mode: "open"

        }, function (_data) {
            SGI.socket.emit("readJsonFile", _data.path + _data.file, function (data) {
                SGI.clear();
                SGI.load_prg(data);
                SGI.file_name = _data.file;
                $("#m_file").text(SGI.file_name);
            });
        });
    },

    save_Script: function () {
        if (SGI.file_name == undefined || SGI.file_name == "Neu" || SGI.file_name == "") {
            alert("Bitte erst local Speichern");

        } else {
            var script;

            if (SGI.mode == "gui") {
                script = Compiler.make_prg(false, false);
            } else {
                script = SGI.editor.getValue();

            }

            try {
                var name = SGI.file_name.replace('.prg', '.js');
                SGI.socket.emit("writeRawFile", "scripts/" + name, script);
            } catch (err) {
                alert("Keine Verbindung zu CCU.IO")
            }
        }
    },

    del_script: function () {
        $.fm({
            lang: SGI.language,
            path: "scripts/",
            file_filter: ["js", "js_"],
            folder_filter: true,
            mode: "show"
        });
    },

    show_Script: function (data) {

        var h = $(window).height() - 200;
        var v = $(window).width() - 400;

        $("body").append('\
                   <div id="dialog_code" style="text-align: left" title="Scriptvorschau">\
                   <div id="code_prev" style="width: 100%; height: 100%"></div>\
                   </div>');
        $("#dialog_code").dialog({
            height: h,
            width: v,
            resizable: true,
            close: function () {
                $("#dialog_code").remove();
            }
        });

        var editor = ace.edit("code_prev");


        editor.getSession().setMode("ace/mode/javascript")
        editor.setTheme("ace/theme/monokai");
        editor.setOptions({
            showPrintMargin: false,
        });

        editor.$blockScrolling = Infinity;
        editor.getSession().setUseWrapMode(true);


        if (SGI.mode == "gui") {
            editor.setValue(js_beautify(data.toString(), {indent_size: 2}), -1);
        } else {
            editor.setValue(SGI.editor.getValue(), -1);
        }

        editor.setReadOnly(true)

    },

    error_box: function (data) {
        console.log(data)
        var _data = data.split("\n").join("<br>").replace(/file:\/\/\//g, "").replace(/at HTMLDocument./g, "");

        var mail = "";
        if (scope.setup.user_mail.split("@").length > 1) {
            mail = scope.setup.user_mail;
        }

        $("body").append('\
                   <div id="dialog_info"  title="Info">\
                   <div class="ui-state-error">' + SGI.translate("Es ist ein Fehler aufgetreten") + '</div>\
                   <hr>\
                   <div class="err_text">' + _data + '</div>\
                   <hr>\
                   <span>' + SGI.translate("Die Folgenden angaben sind optional:") + '</span><br><br>\
                   <span style="width: 150px; display: inline-block">' + SGI.translate("E-Mail Adresse : ") + '</span><input id="inp_error_mail" value="' + mail + '" style="width: 317px; "type="email"/><br>\
                   <div style="display: flex; align-items: center"><span style="width: 150px ; display: inline-block">' + SGI.translate("Kommentar : ") + '</span><textarea id="txt_error_comment" style="width: 315px; height: 60px; max-width: 315px"></textarea></div>\
                   <span style="width: 150px; display: inline-block">' + SGI.translate("Programm Daten: ") + '</span></span><input id="inp_prg_data" style="height:20px; width:20px; margin-left: 0; vertical-align: middle;" checked value="true" type="checkbox"/><br>\
                   <br><br>\
                   <div style="text-align: center">\
                   <button id="btn_info_send" >' + SGI.translate("Senden") + '</button>\
                   <button style="margin-left: 20px" id="btn_info_close" >' + SGI.translate("Schliesen") + '</button>\
        </div>\
        </div>');

        $("#dialog_info").dialog({
            dialogClass: "error_box",
            maxWidth: "90%",
            width: "auto",
            close: function () {
                $("#dialog_info").remove();
            }
        });
        $("#btn_info_close").button().click(function () {
            $("#dialog_info").remove();
        });

        $("#btn_info_send").button().click(function () {
            SGI.server_error(_data);
            $("#dialog_info").remove();
        });
    },

    update: function (show) {
        $("#dialog_update").remove();

        upd.checkNewVersion(function (error, newVersionExists, manifest) {

            if (!error && newVersionExists || show) {


                $("body").append('\
                    <div id="dialog_update" style="width: 438px; height:428px; text-align: center" title="' + SGI.translate("Update") + '">\
                    <img src="./img/logo.png" style="width: 300px"/>\
                    <br><br><br>\
                    <div style="width: 200px; display: inline-block;text-align: left">' + SGI.translate("Version ist:") + '</div><div style="width: 250px; display: inline-block;text-align: left">' + up_pkg.version + '</div>\
                    <br><br>\
                    <div style="width: 200px; display: inline-block;text-align: left">' + SGI.translate("erstellung") + '</div><div style="width: 250px; display: inline-block;text-align: left">' + up_pkg.build_date + ' ' + up_pkg.build_time + '</div>\
                    <br><br><hr><br>\
                    <div style="width: 200px; display: inline-block;text-align: left">' + SGI.translate("Neuste Version: ") + '</div><div style="width: 250px; display: inline-block;text-align: left">' + manifest.version + '</div>\
                    <br><br>\
                    <div style="width: 200px; display: inline-block;text-align: left">' + SGI.translate("erstellung") + '</div><div style="width: 250px; display: inline-block;text-align: left">' + manifest.build_date + ' ' + manifest.build_time + '</div>\
                    <br><br><br>\
                    <button id="btn_update">' + SGI.translate("Update") + '</button>\
                    </div>');

                $("#dialog_update").dialog({
                    width: "auto",
                    height: 500,
                    dialogClass: "update",
                    modal: true,
                    close: function () {
                        $("#dialog_update").remove();
                    }
                });
                $("#btn_update").button()
                    .click(function () {
                        $("#btn_update").remove();
                        $("#dialog_update").append('<div style="width: 100%; height: 33px; line-height: 33px" class="ui-state-default ui-corner-all" id="update_info"></div>');
                        $('#update_info').text("Downloading");

                        upd.download(function (error, filename) {
                            if (!error) {
                                $('#update_info').text("Unzip");

                                upd.unpack(filename, function (error, newAppPath) {
                                    if (!error) {
                                        $('#update_info').text("Restart");
                                        var _np = newAppPath.split("ScriptGUI.");
                                        var np;
                                        if (SGI.os == "osx_32" || SGI.os == "osx_64") {
                                            np = newAppPath
                                        } else {
                                            np = _np[0] + "ScriptGUI/ScriptGUI." + _np[1];
                                        }
                                        upd.runInstaller(np, [upd.getAppPath(), upd.getAppExec()], {});
                                        main_win.close()

                                    } else {
                                        throw error
                                    }
                                }, manifest);
                            }
                        }, manifest);
                    });


                if (!newVersionExists) {
                    $("#btn_update").button("disable")
                }
            }
        });
    },

});

