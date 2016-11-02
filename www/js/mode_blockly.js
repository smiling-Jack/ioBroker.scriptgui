/**
 * Created by Schorling on 01.11.2016.
 */
jQuery.extend(true, SGI, {
    load_blockly: function () {


        SGI.blockly_rendered = true;
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
           var blocklyWorkspace = Blockly.inject(
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


    },

    show_blockly: function () {

        if (!SGI.blockly_rendered) {
            SGI.load_blockly()
        }


        SGI.mode = "blockly";
        scope.setup.mode = "blockly";
        scope.$apply();
        SGI.save_setup()

    },
    hide_blockly: function () {
        //$("#main_editor").hide();
        //$(".set_editor").hide();
    },




});

