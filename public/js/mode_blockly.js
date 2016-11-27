/**
 * Created by Schorling on 01.11.2016.
 */

var scripts;
var systemLang = "de"
jQuery.extend(true, SGI, {
    load_blockly: function () {
        scripts = Scripts;

        SGI.blockly_rendered = true;

        var fileLang = document.createElement('script');
        fileLang.setAttribute('type', 'text/javascript');
        fileLang.setAttribute('src', '../javascript.admin/google-blockly/msg/js/' + (systemLang || 'en') + '.js');
        // most browsers
        fileLang.onload = function () {
            Scripts.languageLoaded = true;
        };
        // IE 6 & 7
        fileLang.onreadystatechange = function() {
            if (this.readyState === 'complete') {
                Scripts.languageLoaded = true;
            }
        };
        document.getElementsByTagName('head')[0].appendChild(fileLang);

        var fileCustom = document.createElement('script');
        fileCustom.setAttribute('type', 'text/javascript');
        fileCustom.setAttribute('src', '../javascript.admin/google-blockly/own/msg/' + (systemLang || 'en') + '.js');
        // most browsers
        fileCustom.onload = function () {
            Scripts.languageLoaded = true;
        };
        // IE 6 & 7
        fileCustom.onreadystatechange = function() {
            if (this.readyState === 'complete') {
                Scripts.languageLoaded = true;
            }
        };
        document.getElementsByTagName('head')[0].appendChild(fileCustom);


        $("#blockly_style").load( "../javascript.admin/tab.html style" , function( data, textStatus, jqxhr ){});
        //$("#blockly_functions").load( "../javascript.admin/scripts.js" , function( data, textStatus, jqxhr ){
        //    console.log(Scripts)
        //});
       $("#blockly_toolbox").load( "../javascript.admin/tab.html #toolbox" , function( data, textStatus, jqxhr ) {

           var toolboxText = document.getElementById('toolbox').outerHTML;
           //var toolboxText = toolboxText.replace(/{(\w+)}/g,
           //    //function(m, p1) {return MSG[p1]});

           var blocks = '';
           for (var cb = 0; cb < Blockly.CustomBlocks.length; cb++) {
               var name = Blockly.CustomBlocks[cb];
               // add blocks
               blocks += '<category name="' + Blockly.Words[name]["de"] + '" colour="' + Blockly[name].HUE + '">';
               for (var _b in Blockly[name].blocks) {
                   blocks += Blockly[name].blocks[_b];
               }
               blocks += '</category>';
           }
           toolboxText = toolboxText.replace('<category><block>%%CUSTOM_BLOCKS%%</block></category>', blocks);

           var toolboxXml = Blockly.Xml.textToDom(toolboxText);
           scripts.blocklyWorkspace = Blockly.inject(
               'main_blockly',
               {
                   media: '../javascript.admin/google-blockly/media/',
                   toolbox: toolboxXml,
                   zoom: {
                       controls:   true,
                       wheel:      false,
                       startScale: 1.0,
                       maxScale:   3,
                       minScale:   0.3,
                       scaleSpeed: 1.2
                   },
                   trashcan: true,
                   grid: {
                       spacing:    25,
                       length:     3,
                       colour:     '#ccc',
                       snap:       true
                   }
               }
           );
        });

        $("#main_blockly").show();
        $("window").trigger("resize")


    },

    show_blockly: function () {

        if (!SGI.blockly_rendered) {
            SGI.load_blockly()
        }

        $("#logo").hide();
        SGI.hide_gui();
        SGI.hide_editor();

        $(".main").css({height: 'calc(100% - ' + (61 + $('#sim_log').height())+ 'px)'});
        $(".main").css({width: 'calc(100% - ' + (7 +$('#right_panel').width())+ 'px)'});

        SGI.mode = "blockly";
        scope.setup.mode = "blockly";
        scope.$apply();
        //SGI.save_setup()

    },
    hide_blockly: function () {
        //$("#main_editor").hide();
        //$(".set_editor").hide();
    },




});

