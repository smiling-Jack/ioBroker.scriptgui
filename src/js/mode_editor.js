/**
 * Created by schorling on 25.06.15.
 */

jQuery.extend(true, SGI, {
    load_editor: function () {

        SGI.editor_rendered = true;

        SGI.editor = ace.edit("main_editor");
        var editor = SGI.editor;

        editor.getSession().setMode("ace/mode/javascript")
        editor.setTheme("ace/theme/monokai");
        editor.setOptions({
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            showPrintMargin: false,
        });

        editor.$blockScrolling = Infinity;
        editor.getSession().setUseWrapMode(true);
        editor.on("guttermousedown", function (e) {
            var target = e.domEvent.target;
            if (target.className.indexOf("ace_gutter-cell") == -1)
                return;
            if (!editor.isFocused())
                return;
            if (e.clientX > 25 + target.getBoundingClientRect().left)
                return;

            var row = e.getDocumentPosition().row
            e.editor.session.setBreakpoint(row)
            e.stop()
        })
    },

    show_editor: function () {

        $("#main_editor").show();
        SGI.mode = "editor";
    },
    hide_editor: function () {
        $("#main_editor").hide();
    },

});