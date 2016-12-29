/**
 * Created by schorling on 25.06.15.
 */

jQuery.extend(true, SGI, {
    load_editor: function () {
        //
        SGI.editor_rendered = true;
        //
        SGI.editor = ace.edit("editor_code");

        var editor = SGI.editor;

        SGI.editor.session.setMode("ace/mode/javascript")
        editor.setTheme("ace/theme/monokai");
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            showPrintMargin: false,
        });

        editor.$blockScrolling = Infinity;
        SGI.editor.session.setUseWrapMode(true);
        editor.session.on('changeBackMarker', function () {

        })
        editor.on("guttermousedown", function (e) {
            var target = e.domEvent.target;
            if (target.className.indexOf("ace_gutter-cell") == -1)
                return;
            if (!editor.isFocused())
                return;
            if (e.clientX > 25 + target.getBoundingClientRect().left)
                return;


            var row = e.getDocumentPosition().row;


            if (editor.session.getBreakpoints()[row]) {
                SGI.clearBP(row);
                e.editor.session.clearBreakpoint(row)
            } else {
                SGI.setBP(row);
                e.editor.session.setBreakpoint(row)
            }

            e.stop()
        });


        editor.on("change", function (e) {
            var breakpointsArray = editor.session.getBreakpoints();
            if (Object.keys(editor.session.getBreakpoints()).length > 0) {
                if (e.lines.length > 1) {
                    var breakpoint = parseInt(Object.keys(breakpointsArray)[0]);
                    var lines = e.lines.length - 1;
                    var start = e.start.row;
                    var end = e.end.row;
                    if (e.action === 'insert') {
                        if (breakpoint > start) {
                            editor.session.clearBreakpoint(breakpoint);
                            editor.session.setBreakpoint(breakpoint + lines);
                        }
                    } else if (e.action === 'remove') {
                        if (breakpoint > start && breakpoint < end) {
                            editor.session.clearBreakpoint(breakpoint);
                        }
                        if (breakpoint >= end) {
                            editor.session.clearBreakpoint(breakpoint);
                            editor.session.setBreakpoint(breakpoint - lines);
                        }
                    }
                }
            }
        });


        $('#img_set_editor_deb_play').click(function () {
            try {
                $(".img_debug").button({disabled: true});

                SGI.clear_mark();
                backend.emit("next", function (err) {

                });
            }
            catch (err) {
            }
        });
        $('#img_set_editor_deb_next_step').click(function () {
            try {
                SGI.clear_mark();
                $(".img_debug").button({disabled: true});
                backend.emit("deb_step")

            }
            catch (err) {
            }
        });
        $('#img_set_editor_deb_into').click(function () {
            try {
                SGI.clear_mark();
                $(".img_debug").button({disabled: true});
                backend.emit("deb_into")

            }
            catch (err) {
            }
        });
        $('#img_set_editor_deb_out').click(function () {
            try {
                SGI.clear_mark();
                $(".img_debug").button({disabled: true});
                backend.emit("deb_out")

            }
            catch (err) {
            }
        });
        $('#img_set_editor_deb_over').click(function () {
            try {
                SGI.clear_mark();
                $(".img_debug").button({disabled: true});
                backend.emit("deb_over")

            }
            catch (err) {
            }
        });


        $(".img_debug").click(function () {


                $("#editor_deb_scopes").html("")
            }
        )


    },

    show_editor: function () {

        if (!SGI.editor_rendered) {
            SGI.load_editor()
        }

        SGI.hide_gui();
        SGI.hide_blockly();

SGI.setMain();
        $("#lba_run_step").hide();
        $('#stepSpeed').hide()
        $("#lba_run_type1").trigger("click");
        $("#main_editor").show();
        $(".set_editor").show();


        SGI.mode = "editor";
        scope.setup.mode = "editor";
        scope.$apply();
        //SGI.save_setup()

    },
    hide_editor: function () {
        $("#main_editor").hide();
        $(".set_editor").hide();
    },
    clear_mark: function () {
        var m = SGI.editor.getSession().getMarkers()
        $.each(m, function (marker) {
            if (this.clazz == "ace-related-code-highlight") {
                SGI.editor.getSession().removeMarker(this.id)
            }
        });

    },
    set_mark: function (line) {
        SGI.clear_mark();
        var range = new Range(line, 1, line, 0);
        SGI.editor.getSession().addMarker(range, "ace-related-code-highlight", "fullLine");
        setTimeout(function () {
            $(".ace-related-code-highlight").effect("highlight", 250)
        }, 100)
    },

    deb_lookup: function (ref) {
        var handel = parseInt(ref.replace("§§", ""));
        console.log("deb_lookup")
        backend.emit("deb_lookup", handel, function (data) {
            var obj = {};

            $.each(data.body[handel].properties, function () {
                if (this.value.value) {
                    obj[this.name] = this.value.value
                } else if (this.value.type == "function") {
                    obj[this.name] = "function()..."
                } else {
                    obj[this.name] = "§§" + this.value.ref
                }

                obj[this.name]["value"] = this.value.value;
                obj[this.name]["type"] = this.value.type;
            })

            const formatter = new JSONFormatter(obj);
            $("#" + ref).html(
                formatter.render()
            ).removeAttr("onclick").removeAttr("id");
        })
    },

    clearBP: function (row) {
        if (SGI.sim_run) {
            backend.emit("clearBP", row)
        }
    },
    setBP: function (row) {
        if (SGI.sim_run) {
            backend.emit("setBP", row)
        }
    }


});

