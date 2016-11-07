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
        editor.session.on('changeBackMarker', function(){

        })
        editor.on("guttermousedown", function (e) {
            var target = e.domEvent.target;
            if (target.className.indexOf("ace_gutter-cell") == -1)
                return;
            if (!editor.isFocused())
                return;
            if (e.clientX > 25 + target.getBoundingClientRect().left)
                return;


            var row = e.getDocumentPosition().row


            if (editor.session.getBreakpoints()[row]) {
                e.editor.session.clearBreakpoint(row)
            } else {


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
                            console.log('new lines', breakpoint, start, end);
                            if (breakpoint > start) {
                                console.log('breakpoint forward');
                                editor.session.clearBreakpoint(breakpoint);
                                editor.session.setBreakpoint(breakpoint + lines);
                            }
                        } else if (e.action === 'remove') {
                            console.log('removed lines', breakpoint, start, end);
                            if (breakpoint > start && breakpoint < end) {
                                console.log('breakpoint remove');
                                editor.session.clearBreakpoint(breakpoint);
                            }
                            if (breakpoint >= end) {
                                console.log('breakpoint behind');
                                editor.session.clearBreakpoint(breakpoint);
                                editor.session.setBreakpoint(breakpoint - lines);
                            }
                        }
                    }
                }
            });








    },

    show_editor: function () {

        if (!SGI.editor_rendered) {
            SGI.load_editor()
        }

        SGI.hide_gui();
        $(".main").css({height: 'calc(100% - ' + (61 + $('#sim_log').height())+ 'px)'});
        $(".main").css({width: 'calc(100% - ' + (2 + $('#right_panel').width())+ 'px)'});

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
    clear_mark: function(){
        var m =  SGI.editor.getSession().getMarkers()
        $.each(m, function(marker){
            if(this.clazz == "ace-related-code-highlight" ){
                SGI.editor.getSession().removeMarker(this.id)
            }
        });

    },
    set_mark: function(line){
        SGI.clear_mark();
        var range = new Range(line,1,line,0);
        SGI.editor.getSession().addMarker(range, "ace-related-code-highlight", "fullLine");
        setTimeout(function(){
            $(".ace-related-code-highlight").effect("highlight", 250)
        },100)
    }


});