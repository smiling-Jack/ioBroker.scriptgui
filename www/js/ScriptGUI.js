/**
 * Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 * Lizenz: [CC BY-NC 3.0](http://creativecommons.org/licenses/by-nc/3.0/de/)
 */
//
//var os = require('os');

//var nw_gui = require('nw.gui');
//var schedule = require('./js/engine/node_modules/node-schedule');
//var js_beautify = require('js-beautify');
//var html_beautify = require('js-beautify').html;
//
var start_win;
//var main_win = nw_gui.Window.get();
//var main_manifest = nw_gui.App.manifest;
//
//var request = require("request");
//var ncp = require('ncp');
//var up_pkg = require('./update.json');
//var updater = require('node-webkit-updater');
//var upd = new updater(up_pkg);
//
//var bausteine = require('js/bausteine.json');
var bausteine = {
        "und": {
            "data": "<div style=\"height:54px; width:60px \" class=\"fbs_html fbs_element_varinput \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: green\"> <a class=\"head_font\">and</a> </div>\n <div class=\"div_left\">\n <div class=\"div_input und_0_in \"><a class=\"input_font\">IN 1</a>\n </div>\n <div class=\"div_input und_0_in \"><a class=\"input_font\">IN 2</a>\n </div>\n </div>\n <div class=\"div_right\">\n <div class=\"div_output1 und_0_out \"><a class=\"output_font\">OUT</a>\n </div>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -108px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 91px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 103px; top: 82px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 54,
            "w": 60
        },
        "wenn": {
            "data": "<div style=\"height:72px; width:60px \" class=\"fbs_html fbs_element_simpel \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: green\"> <a class=\"head_font\">IF</a> </div>\n <select class=\"inp_if \" title=\"Vergleichsoperator\">\n <option value=\"==\">=</option>\n <option value=\"!=\">!=</option>\n <option value=\"<\">&lt;</option>\n <option value=\">\">&gt;</option>\n <option value=\"<=\">&lt;=</option>\n <option value=\">=\">&gt;=</option>\n </select>\n <div class=\"div_left\">\n <div class=\"div_input wenn_0_in \"><a class=\"input_font\">IN</a>\n </div>\n <div class=\"div_input wenn_0_in \"><a class=\"input_font\">REV</a>\n </div>\n </div>\n <div class=\"div_right_if\">\n <div class=\"div_output1 wenn_0_out \"><a class=\"output_font\">OUT</a>\n </div>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -126px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 91px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 109px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 103px; top: 100px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 72,
            "w": 60
        },
        "oder": {
            "data": "<div style=\"height:54px; width:60px \" class=\"fbs_html fbs_element_varinput \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: green\"> <a class=\"head_font\">or</a> </div>\n <div class=\"div_left\">\n <div class=\"div_input oder_0_in \"><a class=\"input_font\">IN 1</a>\n </div>\n <div class=\"div_input oder_0_in \"><a class=\"input_font\">IN 2</a>\n </div>\n </div>\n <div class=\"div_right\">\n <div class=\"div_output1 oder_0_out \"><a class=\"output_font\">OUT</a>\n </div>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -108px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 91px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 103px; top: 82px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 54,
            "w": 60
        },
        "not": {
            "data": "<div style=\"height:36px; width:60px \" class=\"fbs_html fbs_element_simpel \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: green\"> <a class=\"head_font\">not</a> </div>\n <div class=\"div_left\">\n <div class=\"div_input not_0_in \"><a class=\"input_font\">IN</a>\n </div>\n </div>\n <div class=\"div_right\">\n <div class=\"div_output1 not_0_out \"><a class=\"output_font\">OUT</a>\n </div>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -88px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 103px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 36,
            "w": 60
        },
        "timespan": {
            "data": "<div style=\"height:54px; width:60px \" class=\"fbs_html fbs_element_simpel \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: green\"> <a style=\"font-size: 12px\" class=\"head_font\">Timespan</a> </div>\n <div class=\"div_left\">\n <div class=\"div_input timespan_0_in \"><a class=\"input_font\">Start</a>\n </div>\n <div class=\"div_input timespan_0_in \"><a class=\"input_font\">Stop</a>\n </div>\n </div>\n <div class=\"div_right\">\n <div class=\"div_output1 timespan_0_out \"><a class=\"output_font\">OUT</a>\n </div>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -106px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 91px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 103px; top: 82px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 54,
            "w": 60
        },
        "verketten": {
            "data": "<div style=\"height:54px; width:60px \" class=\"fbs_html fbs_element_varinput \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: orange\"> <a class=\"head_font\">Concate</a> </div>\n <div class=\"div_left\">\n <div class=\"div_input verketten_0_in \"><a class=\"input_font\">IN 1</a>\n </div>\n <div class=\"div_input verketten_0_in \"><a class=\"input_font\">IN 2</a>\n </div>\n </div>\n <div class=\"div_right\">\n <div class=\"div_output1 verketten_0_out \"><a class=\"output_font\">OUT</a>\n </div>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -108px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 91px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 103px; top: 82px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 54,
            "w": 60
        },
        "input": {
            "data": "<div style=\"height:17px; width:96px \" class=\"fbs_html fbs_element_io \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_right_io\">\n <div class=\"div_io_in input_0_out \"></div>\n </div>\n <div class=\"div_hmid \">Rechtsklick</div>\n <div class=\"div_head_right \" style=\"background-color: yellow\">\n <p class=\"head_font_io\">Get</p>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -71px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 138px; top: 57px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 17,
            "w": 96
        },
        "linput": {
            "data": "<div style=\"height:17px; width:96px \" class=\"fbs_html fbs_element_i_liste \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_right_io\">\n <div class=\"div_io_in linput_0_out \"></div>\n </div>\n <div class=\"div_hmid \">Rechtsklick</div>\n <div class=\"div_head_right \" style=\"background-color: yellow\">\n <p style=\"color: #660066!important;\" class=\"head_font_io\">List</p>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -71px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 138px; top: 57px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"#882288\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 17,
            "w": 96
        },
        "inputlocal": {
            "data": "<div style=\"height:17px; width:96px \" class=\"fbs_html fbs_element_io_local \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_right_io\">\n <div class=\"div_io_in inputlocal_0_out \"></div>\n </div>\n <div class=\"div_hmid \">Rechtsklick</div>\n <div class=\"div_head_right \" style=\"background-color: yellow\">\n <p style=\"color: red!important;\" class=\"head_font_io\">Local</p>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -71px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 138px; top: 57px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 17,
            "w": 96
        },
        "output": {
            "data": "<div style=\"height:17px; width:91px \" class=\"fbs_html fbs_element_io fbs_out \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_output_left\">\n <div class=\"div_io_out output_0_in \"></div>\n </div>\n <div class=\"div_right_io\"></div>\n <div class=\"div_head_left \" style=\"background-color: yellow\">\n <p class=\"head_font_io\">Set</p>\n </div>\n <div class=\"div_hmid \">Rechtsklick</div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -71px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 42px; top: 57px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 17,
            "w": 91
        },
        "true": {
            "data": "<div style=\"height:17px; width:76px \" class=\"fbs_html fbs_element_io_fix \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_right_io\">\n <div class=\"div_io_in true_0_out \"></div>\n </div>\n <div class=\"div_konst\">true</div>\n <div class=\"div_head_right \" style=\"background-color: orange\">\n <p class=\"head_font_io\">1</p>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -71px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 118px; top: 57px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 17,
            "w": 76
        },
        "zahl": {
            "data": "<div style=\"height:17px; width:118px \" class=\"fbs_html fbs_element_io_fix \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_right_io\">\n <div class=\"div_io_in zahl_0_out \"></div>\n </div>\n <input class=\"inp_var \" type=\"int\">\n <div class=\"div_head_right \" style=\"background-color: orange\" title=\"Zahl\">\n <p class=\"head_font_io\">No.</p>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -71px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 160px; top: 57px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 17,
            "w": 118
        },
        "vartime": {
            "data": "<div style=\"height:17px; width:115px \" class=\"fbs_html fbs_element_io_fix fbs_element_simpel jsplumb-drag\" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_right_io\">\n <div class=\"div_right_io vartime_0_out \"></div>\n </div>\n <select class=\"inp_vartime \" style=\"\n width: 80;\n width: 80px;\n\">\n <option value=\"zeit_k\">hh:mm</option>\n <option value=\"zeit_l\">hh:mm:ss</option>\n <option value=\"date_k\">TT:MM:JJ</option>\n <option value=\"date_l\">TT:MM:JJ hh:mm</option>\n <option value=\"mm\">Minute</option>\n <option value=\"hh\">Stunde</option>\n <!--<option value=\"DD\">Tag</option>-->\n <option value=\"KW\">KW</option>\n <option value=\"WD\">Wochentag (Text)</option>\n <option value=\"MM\">Monat (Text)</option>\n <option value=\"roh\">roh</option>\n </select>\n <div class=\"div_head_right \" style=\"background-color: orange\">\n <div class=\"head_font_io\">Time</div>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -66px; top: -68px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 173px; top: 54px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 17,
            "w": 115
        },
        "mail": {
            "data": "<div style=\"height:72px; width:60px \" class=\"fbs_html fbs_element_varinput fbs_out \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: yellow\"> <a class=\"head_font\">Mail</a> </div>\n <div class=\"div_left\">\n <div style=\"height:18px\" class=\"div_input mail_0_in \"><a class=\"input_font_big\">Empfänger</a>\n </div>\n <div style=\"height:18px\" class=\"div_input mail_0_in \"><a class=\"input_font_big\">Betreff</a>\n </div>\n <div style=\"height:18px\" class=\"div_input mail_0_in \"><a class=\"input_font_big\">Text</a>\n </div>\n </div>\n <div class=\"div_right\"> </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -126px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 91px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 109px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 72,
            "w": 60
        },
        "pushover": {
            "data": "<div style=\"height:18px; width:90px \" class=\"fbs_html fbs_element_tr fbs_out \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_output_left\">\n <div class=\"div_io_out pushover_0_in \"></div>\n </div>\n <div class=\"div_right_io\"></div>\n <div class=\"div_head_left \" style=\"background-color: yellow\">\n <p class=\"head_font_io\">Send</p>\n </div>\n <div class=\"div_hmid\">Pushover</div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -72px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 42px; top: 57px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 18,
            "w": 90
        },
        "debugout": {
            "data": "<div style=\"height:18px; width:99px \" class=\"fbs_html fbs_element_tr fbs_out \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_output_left\">\n <div class=\"div_io_out debugout_0_in \"></div>\n </div>\n <div class=\"div_right_io\"></div>\n <div class=\"div_head_left \" style=\"background-color: yellow\">\n <p class=\"head_font_io\">LOG</p>\n </div>\n <div class=\"div_hmid\">CCU.IO LOG</div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -72px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 42px; top: 57px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 18,
            "w": 99
        },
        "outputlocal": {
            "data": "<div style=\"height:17px; width:91px \" class=\"fbs_html fbs_element_io_local fbs_out \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_output_left\">\n <div class=\"div_io_out outputlocal_0_in \"></div>\n </div>\n <div class=\"div_right_io\"></div>\n <div class=\"div_head_left \" style=\"background-color: yellow\">\n <p style=\"color: red!important;\" class=\"head_font_io\">Local</p>\n </div>\n <div class=\"div_hmid \">Rechtsklick</div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -71px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 42px; top: 57px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 17,
            "w": 91
        },
        "false": {
            "data": "<div style=\"height:17px; width:76px \" class=\"fbs_html fbs_element_io_fix \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_right_io\">\n <div class=\"div_io_in false_0_out \"></div>\n </div>\n <div class=\"div_konst\">false</div>\n <div class=\"div_head_right \" style=\"background-color: orange\">\n <p class=\"head_font_io\">0</p>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -71px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 118px; top: 57px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 17,
            "w": 76
        },
        "string": {
            "data": "<div style=\"height:19px; width:119px \" class=\"fbs_html fbs_element_string fbs_element_simpel \" style=\"width: 100px; height: auto; left: 8px; top: 0px; position: relative;\">\n <div class=\"div_right_string\">\n <div class=\"div_io_out_string string_0_out \"></div>\n </div>\n <textarea class=\"inp_text \" style=\"overflow: hidden; word-wrap: break-word; resize: horizontal; height: 16px;\"></textarea>\n <div class=\"div_head_right_string \" style=\"background-color: orange\">\n <div class=\"head_font_io_string\">Text</div>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -73px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 159px; top: 57.5px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 19,
            "w": 119
        },
        "trigvalue": {
            "data": "<div style=\"height:18px; width:76px \" class=\"fbs_html fbs_element_tr \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_right_io\">\n <div class=\"div_io_in trigvalue_0_out \"></div>\n </div>\n <div class=\"div_konst\">Value</div>\n <div class=\"div_head_right \" style=\"background-color: red\">\n <p class=\"head_font_io\">Tr.</p>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -72px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 118px; top: 57px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 18,
            "w": 76
        },
        "trigtime": {
            "data": "<div style=\"height:18px; width:76px \" class=\"fbs_html fbs_element_tr \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_right_io\">\n <div class=\"div_io_in trigtime_0_out \"></div>\n </div>\n <div class=\"div_konst\">Time</div>\n <div class=\"div_head_right \" style=\"background-color: red\">\n <p class=\"head_font_io\">Tr.</p>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -72px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 118px; top: 57px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 18,
            "w": 76
        },
        "trigoldvalue": {
            "data": "<div style=\"height:18px; width:94px \" class=\"fbs_html fbs_element_tr \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_right_io\">\n <div class=\"div_io_in trigoldvalue_0_out \"></div>\n </div>\n <div class=\"div_konst\">old Value</div>\n <div class=\"div_head_right \" style=\"background-color: red\">\n <p class=\"head_font_io\">Tr.</p>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -72px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 136px; top: 57px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 18,
            "w": 94
        },
        "trigoldtime": {
            "data": "<div style=\"height:18px; width:90px \" class=\"fbs_html fbs_element_tr \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_right_io\">\n <div class=\"div_io_in trigoldtime_0_out \"></div>\n </div>\n <div class=\"div_konst\">old Time</div>\n <div class=\"div_head_right \" style=\"background-color: red\">\n <p class=\"head_font_io\">Tr.</p>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -72px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 132px; top: 57px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 18,
            "w": 90
        },
        "trigid": {
            "data": "<div style=\"height:18px; width:76px \" class=\"fbs_html fbs_element_tr \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_right_io\">\n <div class=\"div_io_in trigid_0_out \"></div>\n </div>\n <div class=\"div_konst\"> ID </div>\n <div class=\"div_head_right \" style=\"background-color: red\">\n <p class=\"head_font_io\">Tr.</p>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -72px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 118px; top: 57px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 18,
            "w": 76
        },
        "trigname": {
            "data": "<div style=\"height:18px; width:76px \" class=\"fbs_html fbs_element_tr \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_right_io\">\n <div class=\"div_io_in trigname_0_out \"></div>\n </div>\n <div class=\"div_konst\">Name</div>\n <div class=\"div_head_right \" style=\"background-color: red\">\n <p class=\"head_font_io\">Tr.</p>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -72px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 118px; top: 57px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 18,
            "w": 76
        },
        "trigchid": {
            "data": "<div style=\"height:18px ; width:76px \" data-nr=\"0\" class=\"fbs_html fbs_element_tr  \" style=\"left: 8px; top: 0px; position: relative;\">\n  <div class=\"div_right_io\">\n    <div class=\"div_io_in trigchid_0_out \"></div>\n  </div>\n  <div class=\"div_konst\">Ch. ID</div>\n  <div class=\"div_head_right \" style=\"background-color: red\">\n    <p class=\"head_font_io\">Tr.</p>\n  </div>\n  <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -72px; position: relative;\">\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 118px; top: 57px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n</div>",
            "h": 18,
            "w": 76
        },
        "trigchtype": {
            "data": "<div style=\"height:18px ; width:92px \" data-nr=\"0\" class=\"fbs_html fbs_element_tr  \" style=\"left: 8px; top: 0px; position: relative;\">\n  <div class=\"div_right_io\">\n    <div class=\"div_io_in trigchtype_0_out \"></div>\n  </div>\n  <div class=\"div_konst\">Ch. Type</div>\n  <div class=\"div_head_right \" style=\"background-color: red\">\n    <p class=\"head_font_io\">Tr.</p>\n  </div>\n  <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -72px; position: relative;\">\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 134px; top: 57px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n</div>",
            "h": 18,
            "w": 92
        },
        "trigchroomIds": {
            "data": "<div style=\"height:18px ; width:116px \" data-nr=\"0\" class=\"fbs_html fbs_element_tr  \" style=\"left: 8px; top: 0px; position: relative;\">\n  <div class=\"div_right_io\">\n    <div class=\"div_io_in trigchroomIds_0_out \"></div>\n  </div>\n  <div class=\"div_konst\">Ch. room IDs</div>\n  <div class=\"div_head_right \" style=\"background-color: red\">\n    <p class=\"head_font_io\">Tr.</p>\n  </div>\n  <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -72px; position: relative;\">\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 158px; top: 57px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n</div>",
            "h": 18,
            "w": 116
        },
        "trigchroomNames": {
            "data": "<div style=\"height:18px ; width:135px \" data-nr=\"0\" class=\"fbs_html fbs_element_tr  \" style=\"left: 8px; top: 0px; position: relative;\">\n  <div class=\"div_right_io\">\n    <div class=\"div_io_in trigchroomNames_0_out \"></div>\n  </div>\n  <div class=\"div_konst\">Ch. room names</div>\n  <div class=\"div_head_right \" style=\"background-color: red\">\n    <p class=\"head_font_io\">Tr.</p>\n  </div>\n  <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -72px; position: relative;\">\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 177px; top: 57px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n</div>",
            "h": 18,
            "w": 135
        },
        "inc": {
            "data": "<div style=\"height:36px; width:60px \" class=\"fbs_html fbs_element_simpel \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: green\"> <a class=\"head_font\">+1</a> </div>\n <div class=\"div_left\">\n <div class=\"div_input inc_0_in \"><a class=\"input_font\">IN</a>\n </div>\n </div>\n <div class=\"div_right\">\n <div class=\"div_output1 inc_0_out \"><a class=\"output_font\">OUT</a>\n </div>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -90px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 103px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 36,
            "w": 60
        },
        "dec": {
            "data": "<div style=\"height:36px; width:60px \" class=\"fbs_html fbs_element_simpel \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: green\"> <a class=\"head_font\">-1</a> </div>\n <div class=\"div_left\">\n <div class=\"div_input dec_0_in \"><a class=\"input_font\">IN</a>\n </div>\n </div>\n <div class=\"div_right\">\n <div class=\"div_output1 dec_0_out \"><a class=\"output_font\">OUT</a>\n </div>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -90px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 103px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 36,
            "w": 60
        },
        "summe": {
            "data": "<div style=\"height:54px; width:60px \" class=\"fbs_html fbs_element_varinput \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: green\"> <a class=\"head_font\">Sum</a> </div>\n <div class=\"div_left\">\n <div class=\"div_input summe_0_in \"><a class=\"input_font\">IN 1</a>\n </div>\n <div class=\"div_input summe_0_in \"><a class=\"input_font\">IN 2</a>\n </div>\n </div>\n <div class=\"div_right\">\n <div class=\"div_output1 summe_0_out \"><a class=\"output_font\">OUT</a>\n </div>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -108px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 91px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 103px; top: 82px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 54,
            "w": 60
        },
        "differenz": {
            "data": "<div style=\"height:54px; width:60px \" class=\"fbs_html fbs_element_varinput \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: green\"> <a class=\"head_font\">Difference</a> </div>\n <div class=\"div_left\">\n <div class=\"div_input differenz_0_in \"><a class=\"input_font\">IN 1</a>\n </div>\n <div class=\"div_input differenz_0_in \"><a class=\"input_font\">IN 2</a>\n </div>\n </div>\n <div class=\"div_right\">\n <div class=\"div_output1 differenz_0_out \"><a class=\"output_font\">OUT</a>\n </div>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -108px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 91px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 103px; top: 82px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 54,
            "w": 60
        },
        "round": {
            "data": "<div style=\"height:36px; width:60px \" class=\"fbs_html fbs_element_simpel \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: green\"> <a class=\"head_font\">Round</a> </div>\n <input value=\"0\" class=\"inp_round\" type=\"text\" title=\"Anzahl Nachkommastellen\">\n <div class=\"div_left\">\n <div class=\"div_input round_0_in \">\n <a class=\"input_font\"></a>\n </div>\n </div>\n <div class=\"div_right\">\n <div class=\"div_output1 round_0_out \">\n <a class=\"output_font\"></a>\n </div>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -90px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 103px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 36,
            "w": 60
        },
        "toint": {
            "data": "<div style=\"height:36px; width:60px \" class=\"fbs_html fbs_element_simpel \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: green\"> <a class=\"head_font\">INT</a> </div>\n <div class=\"div_left\">\n <div class=\"div_input toint_0_in \"><a class=\"input_font\">IN</a>\n </div>\n </div>\n <div class=\"div_right\">\n <div class=\"div_output1 toint_0_out \"><a class=\"output_font\">OUT</a>\n </div>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -90px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 103px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 36,
            "w": 60
        },
        "tofloat": {
            "data": "<div style=\"height:36px; width:60px \" class=\"fbs_html fbs_element_simpel \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: green\"> <a class=\"head_font\">Float</a> </div>\n <div class=\"div_left\">\n <div class=\"div_input tofloat_0_in \"><a class=\"input_font\">IN</a>\n </div>\n </div>\n <div class=\"div_right\">\n <div class=\"div_output1 tofloat_0_out \"><a class=\"output_font\">OUT</a>\n </div>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -90px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 103px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 36,
            "w": 60
        },
        "tostring": {
            "data": "<div style=\"height:36px; width:60px \" class=\"fbs_html fbs_element_simpel \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: green\"> <a class=\"head_font\">String</a> </div>\n <div class=\"div_left\">\n <div class=\"div_input tostring_0_in \"><a class=\"input_font\">IN</a>\n </div>\n </div>\n <div class=\"div_right\">\n <div class=\"div_output1 tostring_0_out \"><a class=\"output_font\">OUT</a>\n </div>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -90px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 103px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 36,
            "w": 60
        },
        "toh": {
            "data": "<div style=\"height:36px; width:60px \" class=\"fbs_html fbs_element_simpel \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: green\"> <a class=\"head_font\">ms to h</a> </div>\n <div class=\"div_left\">\n <div class=\"div_input toh_0_in \"><a class=\"input_font\">IN</a>\n </div>\n </div>\n <div class=\"div_right\">\n <div class=\"div_output1 toh_0_out \"><a class=\"output_font\">OUT</a>\n </div>\n </div>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -90px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 40px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 10px; width: 20px; left: 103px; top: 73px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 36,
            "w": 60
        },
        "trigchname": {
            "data": "<div style=\"height:18px ; width:96px \" data-nr=\"0\" class=\"fbs_html fbs_element_tr  \" style=\"left: 8px; top: 0px; position: relative;\">\n  <div class=\"div_right_io\">\n    <div class=\"div_io_in trigchname_0_out \"></div>\n  </div>\n  <div class=\"div_konst\">Ch. Name</div>\n  <div class=\"div_head_right \" style=\"background-color: red\">\n    <p class=\"head_font_io\">Tr.</p>\n  </div>\n  <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -72px; position: relative;\">\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 138px; top: 57px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n</div>",
            "h": 18,
            "w": 96
        },
        "trigchfuncIds": {
            "data": "<div style=\"height:18px ; width:111px \" data-nr=\"0\" class=\"fbs_html fbs_element_tr  \" style=\"left: 8px; top: 0px; position: relative;\">\n  <div class=\"div_right_io\">\n    <div class=\"div_io_in trigchfuncIds_0_out \"></div>\n  </div>\n  <div class=\"div_konst\">Ch. func IDs</div>\n  <div class=\"div_head_right \" style=\"background-color: red\">\n    <p class=\"head_font_io\">Tr.</p>\n  </div>\n  <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -72px; position: relative;\">\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 153px; top: 57px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n</div>",
            "h": 18,
            "w": 111
        },
        "trigchfuncNames": {
            "data": "<div style=\"height:18px ; width:130px \" data-nr=\"0\" class=\"fbs_html fbs_element_tr  \" style=\"left: 8px; top: 0px; position: relative;\">\n  <div class=\"div_right_io\">\n    <div class=\"div_io_in trigchfuncNames_0_out \"></div>\n  </div>\n  <div class=\"div_konst\">Ch. func names</div>\n  <div class=\"div_head_right \" style=\"background-color: red\">\n    <p class=\"head_font_io\">Tr.</p>\n  </div>\n  <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -72px; position: relative;\">\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 172px; top: 57px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"green\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n</div>",
            "h": 18,
            "w": 130
        },
        "ccuobj": {
            "data": "<div style=\"height:64px; width:154px \" style=\"min-width: 150px; left: 10px; top: 0px; position: relative;\" class=\"mbs_html mbs_element_trigger tr_simpel \">\n <div class=\"div_head\" style=\"background-color: yellow\">\n <p class=\"head_font\">CCU.IO Objekt</p> <img src=\"img/icon/bullet_toggle_minus.png\" class=\"btn_min_obj\"> </div>\n <div class=\"div_hmid_trigger\" style=\"text-align:left\">\n <label style=\"position: relative;z-index: 1; background-color: transparent;display:inline-block; font-size: 13px;color: #000000;width: 45px; margin-left: 4px; \"> Name: </label>\n <input class=\"inp_obj_name \" data- style=\"\n width: 80px;\n\">\n <br>\n <label style=\"position: relative;z-index: 1; background-color: transparent;display:inline-block; font-size: 13px;color: #000000;width: 45px; margin-left: 4px; \"> ID: </label><span style=\"min-width: 91px;color: black;display: inline-block;\" class=\"ccuobj_id \"=\"mbs[0].hmid\">undefined</span><img data- class=\"btn_ccuobj_update\" src=\"img/icon/update.png\"> </div>\n <div class=\"mbs_shadow\"></div>\n</div>",
            "h": 64,
            "w": 154
        },
        "ccuobjpersi": {
            "data": "<div style=\"height:64px; width:154px \" style=\"min-width: 150px; left: 10px; top: 0px; position: relative;\" class=\"mbs_html mbs_element_trigger tr_simpel \">\n <div class=\"div_head\" style=\"background-color: yellow\">\n <p style=\"color: #008000!important\" class=\"head_font\">CCU.IO Objekt persistent</p> <img src=\"img/icon/bullet_toggle_minus.png\" class=\"btn_min_obj\"> </div>\n <div class=\"div_hmid_trigger\" style=\"text-align:left\">\n <label style=\"position: relative;z-index: 1; background-color: transparent;display:inline-block; font-size: 13px;color: #000000;width: 45px; margin-left: 4px; \"> Name: </label>\n <input class=\"inp_obj_name \" data- style=\"\n width: 80px;\n\">\n <br>\n <label style=\"position: relative;z-index: 1; background-color: transparent;display:inline-block; font-size: 13px;color: #000000;width: 45px; margin-left: 4px; \"> ID: </label><span style=\"min-width: 91px;color: black;display: inline-block;\" class=\"ccuobj_id \"=\"mbs[0].hmid\">undefined</span><img data- class=\"btn_ccuobj_update\" src=\"img/icon/update.png\"> </div>\n <div class=\"mbs_shadow\"></div>\n</div>",
            "h": 64,
            "w": 154
        },
        "trigger_event": {
            "data": "<div style=\"height:38px; width:126px \" class=\"mbs_html mbs_element_trigger tr_singel \" style=\"left: 0px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: red\">\n <p class=\"head_font\">Trigger -- &nbsp;</p> <img src=\"img/icon/bullet_toggle_minus.png\" class=\"btn_min_trigger\"> </div>\n <div class=\"div_hmid_trigger\">\n <div data-info=\"trigger_event_0\" class=\"div_hmid_font\">Rechtsklick</div>\n </div>\n <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1745px; top: -914px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 20px; width: 20px; left: 1799px; top: 904px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n </svg>\n </div>\n</div>",
            "h": 38,
            "w": 126
        },
        "trigger_EQ": {
            "data": "<div style=\"height:38px; width:126px \" class=\"mbs_html mbs_element_trigger tr_singel \" style=\"left: 0px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: red\">\n <p class=\"head_font\">Trigger EQ &nbsp;</p> <img src=\"img/icon/bullet_toggle_minus.png\" class=\"btn_min_trigger\"> </div>\n <div class=\"div_hmid_trigger\">\n <div data-info=\"trigger_EQ_0\" class=\"div_hmid_font\">Rechtsklick</div>\n </div>\n <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1726px; top: -958px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 20px; width: 20px; left: 1780px; top: 948px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n </svg>\n </div>\n</div>",
            "h": 38,
            "w": 126
        },
        "trigger_NE": {
            "data": "<div style=\"height:38px; width:126px \" class=\"mbs_html mbs_element_trigger tr_singel \" style=\"left: 0px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: red\">\n <p class=\"head_font\">Trigger NE &nbsp;</p> <img src=\"img/icon/bullet_toggle_minus.png\" class=\"btn_min_trigger\"> </div>\n <div class=\"div_hmid_trigger\">\n <div data-info=\"trigger_NE_0\" class=\"div_hmid_font\">Rechtsklick</div>\n </div>\n <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1656px; top: -1033px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 20px; width: 20px; left: 1710px; top: 1023px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n </svg>\n </div>\n</div>",
            "h": 38,
            "w": 126
        },
        "trigger_GT": {
            "data": "<div style=\"height:38px; width:126px \" class=\"mbs_html mbs_element_trigger tr_singel \" style=\"left: 0px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: red\">\n <p class=\"head_font\">Trigger GT &nbsp;</p> <img src=\"img/icon/bullet_toggle_minus.png\" class=\"btn_min_trigger\"> </div>\n <div class=\"div_hmid_trigger\">\n <div data-info=\"trigger_GT_0\" class=\"div_hmid_font\">Rechtsklick</div>\n </div>\n <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1773px; top: -1048px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 20px; width: 20px; left: 1827px; top: 1038px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n </svg>\n </div>\n</div>",
            "h": 38,
            "w": 126
        },
        "trigger_GE": {
            "data": "<div style=\"height:38px; width:126px \" class=\"mbs_html mbs_element_trigger tr_singel \" style=\"left: 0px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: red\">\n <p class=\"head_font\">Trigger GE &nbsp;</p> <img src=\"img/icon/bullet_toggle_minus.png\" class=\"btn_min_trigger\"> </div>\n <div class=\"div_hmid_trigger\">\n <div data-info=\"trigger_GE_0\" class=\"div_hmid_font\">Rechtsklick</div>\n </div>\n <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1947px; top: -1211px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 20px; width: 20px; left: 2001px; top: 1201px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n </svg>\n </div>\n</div>",
            "h": 38,
            "w": 126
        },
        "trigger_LT": {
            "data": "<div style=\"height:38px; width:126px \" class=\"mbs_html mbs_element_trigger tr_singel \" style=\"left: 0px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: red\">\n <p class=\"head_font\">Trigger LT &nbsp;</p> <img src=\"img/icon/bullet_toggle_minus.png\" class=\"btn_min_trigger\"> </div>\n <div class=\"div_hmid_trigger\">\n <div data-info=\"trigger_LT_0\" class=\"div_hmid_font\">Rechtsklick</div>\n </div>\n <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1754px; top: -1300px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 20px; width: 20px; left: 1808px; top: 1290px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n </svg>\n </div>\n</div>",
            "h": 38,
            "w": 126
        },
        "trigger_LE": {
            "data": "<div style=\"height:38px; width:126px \" class=\"mbs_html mbs_element_trigger tr_singel \" style=\"left: 0px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: red\">\n <p class=\"head_font\">Trigger LE &nbsp;</p> <img src=\"img/icon/bullet_toggle_minus.png\" class=\"btn_min_trigger\"> </div>\n <div class=\"div_hmid_trigger\">\n <div data-info=\"trigger_LE_0\" class=\"div_hmid_font\">Rechtsklick</div>\n </div>\n <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1716px; top: -1332px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 20px; width: 20px; left: 1770px; top: 1322px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n </svg>\n </div>\n</div>",
            "h": 38,
            "w": 126
        },
        "trigger_val": {
            "data": "<div style=\"height:36px; width:162px \" class=\"mbs_html mbs_element_trigger tr_val jsplumb-drag\" style=\"left: 0px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: red\">\n <p class=\"head_font\">Trigger Value</p> <img src=\"img/icon/bullet_toggle_minus.png\" class=\"btn_min_trigger\"> </div>\n <div class=\"div_hmid_trigger\">\n <div style=\"min-width: 100%\" class=\"div_hmid_val_body \">\n <div data-info=\"trigger_val_0\" style=\"display:inline-block;float: left;width: 50px;\" class=\"div_hmid_val \">Rechtsklick</div>\n <div style=\"margin-top: -18px; float: right; margin-left:5px; display: inline-block\">\n <select class=\"inp_val \" style=\"\n width: 50px;\n\">\n <option value=\"? undefined:undefined ?\"></option>\n <option value=\"val\">Gleich</option>\n <option value=\"valNe\">Ungleich</option>\n <option value=\"valGt\">Größer</option>\n <option value=\"valGe\">Größer =</option>\n <option value=\"valLt\">Kleiner</option>\n <option value=\"valLe\">Kleiner =</option>\n </select>\n <input class=\"inp_wert \" type=\"int\" style=\"\n width: 30px;\n\">\n </div>\n </div>\n </div>\n <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1950px; top: -1388px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 20px; width: 20px; left: 2024.5px; top: 1378px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n </svg>\n </div>\n</div>",
            "h": 36,
            "w": 162
        },
        "trigger_start": {
            "data": "<div style=\"height:34px; width:126px \" class=\"mbs_html mbs_element_trigger tr_simpel \" style=\"left: 0px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: red\">\n <p class=\"head_font\">Trigger Start</p> <img src=\"img/icon/bullet_toggle_minus.png\" class=\"btn_min_trigger\"> </div>\n <div class=\"div_hmid_trigger\" style=\"color: black; font-size: 12px; text-align: center\">Scriptengine start </div>\n <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -2017px; top: -835px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 20px; width: 20px; left: 2071px; top: 825px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n </svg>\n </div>\n</div>",
            "h": 34,
            "w": 126
        },
        "trigger_time": {
            "data": "<div style=\"height:37px; width:132px \" class=\"mbs_html mbs_element_trigger tr_time \" style=\"left: 0px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: red\">\n <p class=\"head_font\">Trigger Time</p> <img src=\"img/icon/bullet_toggle_minus.png\" class=\"btn_min_trigger\"> </div>\n <div class=\"div_hmid_trigger\">\n <div class=\"tr_ch_body \">\n <input class=\"inp_time \">\n <select class=\"inp_day \">\n <option value=\"88\">*</option>\n <option value=\"1\">Mo</option>\n <option value=\"2\">Di</option>\n <option value=\"3\">Mi</option>\n <option value=\"4\">Do</option>\n <option value=\"5\">Fr</option>\n <option value=\"6\">Sa</option>\n <option value=\"7\">So</option>\n <option value=\"8\">MO-FR</option>\n <option value=\"9\">SA-SO</option>\n </select>\n </div>\n </div>\n <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1752px; top: -994px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 20px; width: 20px; left: 1809px; top: 984px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n </svg>\n </div>\n</div>",
            "h": 37,
            "w": 132
        },
        "trigger_vartime": {
            "data": "<div style=\"height:38px; width:126px \" class=\"mbs_html mbs_element_trigger tr_vartime \" style=\"left: 0px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: red\">\n <p class=\"head_font\">Trigger var Time &nbsp; &nbsp;</p> <img src=\"img/icon/bullet_toggle_minus.png\" class=\"btn_min_trigger\"> </div>\n <div class=\"div_hmid_trigger\">\n <div data-info=\"trigger_vartime_0\" class=\"div_hmid_font\">Rechtsklick</div>\n </div>\n <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1720px; top: -1055px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 20px; width: 20px; left: 1774px; top: 1045px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n </svg>\n </div>\n</div>",
            "h": 38,
            "w": 126
        },
        "trigger_zykm": {
            "data": "<div style=\"height:37px; width:126px \" class=\"mbs_html mbs_element_trigger tr_simpel \" style=\"left: 0px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: red\">\n <p class=\"head_font\">Trigger Zyklus M &nbsp;&nbsp;&nbsp;</p> <img src=\"img/icon/bullet_toggle_minus.png\" class=\"btn_min_trigger\"> </div>\n <div class=\"div_hmid_trigger\">\n <div class=\"tr_ch_body\">\n <input class=\"inp_peri \"> <a style=\"position: relative;z-index: 1; background-color: transparent;margin-left: 4px; font-size: 13px;color: #676767\">Minutes</a> </div>\n </div>\n <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1918px; top: -1081px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 20px; width: 20px; left: 1972px; top: 1071px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n </svg>\n </div>\n</div>",
            "h": 37,
            "w": 126
        },
        "trigger_astro": {
            "data": "<div style=\"height:37px; width:132px \" class=\"mbs_html mbs_element_trigger tr_astro jsplumb-drag\" style=\"left: 0px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: red\">\n <p class=\"head_font\">Trigger Astro</p> <img src=\"img/icon/bullet_toggle_minus.png\" class=\"btn_min_trigger\"> </div>\n <div class=\"div_hmid_trigger\">\n <div class=\"tr_ch_body \">\n <select class=\"inp_astro \" style=\"\n width: 50px;\n\">\n <option value=\"sunrise\">Sonnenaufgang Start</option>\n <option value=\"sunriseEnd\">Sonnenaufgang Ende</option>\n <option value=\"solarNoon\">Höchster Sonnenstand</option>\n <option value=\"sunsetStart\">Sonnenuntergang Start</option>\n <option value=\"sunset\">Sonnenuntergang Ende</option>\n <option value=\"night\">Nacht Start</option>\n <option value=\"nightEnd\">Nacht Ende</option>\n <option value=\"nadir\">Dunkelster moment</option>\n </select>\n <label style=\"display:flex; margin-left:10px; color: #676767; font-size: 13px\">Shift:</label>\n <input class=\"inp_min \" type=\"int\">\n <br>\n </div>\n </div>\n <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -2000px; top: -939px; position: relative;\">\n <div class=\"html_endpoint endpointDrag jsplumb-drag\" style=\"position: absolute; height: 20px; width: 20px; left: 2058px; top: 929px; visibility: visible;\" drag el>\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n </svg>\n </div>\n</div>",
            "h": 37,
            "w": 132
        },
        "trigger_monthly": {
            "data": "<div style=\"height:34px; width:126px \" class=\"mbs_html mbs_element_trigger tr_simpel \" style=\"left: 0px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: red\">\n <p class=\"head_font\">Trigger</p> <img src=\"img/icon/bullet_toggle_minus.png\" class=\"btn_min_trigger\"> </div>\n <div class=\"div_hmid_trigger\" style=\"color: black; font-size: 12px; text-align: center\">Monthly </div>\n <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1864px; top: -1029px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 20px; width: 20px; left: 1918px; top: 1019px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n </svg>\n </div>\n</div>",
            "h": 34,
            "w": 126
        },
        "trigger_yearly": {
            "data": "<div style=\"height:34px; width:126px \" class=\"mbs_html mbs_element_trigger tr_simpel \" style=\"left: 0px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: red\">\n <p class=\"head_font\">Trigger</p> <img src=\"img/icon/bullet_toggle_minus.png\" class=\"btn_min_trigger\"> </div>\n <div class=\"div_hmid_trigger\" style=\"color: black; font-size: 12px; text-align: center\">Yearly </div>\n <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1767px; top: -1082px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 20px; width: 20px; left: 1821px; top: 1072px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n </svg>\n </div>\n</div>",
            "h": 34,
            "w": 126
        },
        "komex": {
            "data": "<div style=\"height:31px; width:116px \" data-nr=\"1\" class=\"mbs_html mbs_element_kommentar \" style=\"color: rgb(0, 0, 0); left: 0px; top: 0px; position: relative; background-color: rgb(255, 255, 0);\">\n <textarea class=\"komex \" style=\"color:black; overflow: hidden; word-wrap: break-word; resize: horizontal; height: 15px;width: 100px;\">Kommentar</textarea>\n <div class=\"mbs_shadow\"></div>\n</div>",
            "h": 31,
            "w": 116
        },
        "scriptobj": {
            "data": "<div style=\"height:46px; width:157px \" style=\"min-width: 157px; left: 0px; top: 0px; position: relative;\" class=\"mbs_html mbs_element_trigger tr_simpel \">\n <div class=\"div_head\" style=\"background-color: yellow\">\n <p style=\"color: red!important;\" class=\"head_font\">Script Objekt</p> <img src=\"img/icon/bullet_toggle_minus.png\" class=\"btn_min_obj\"> </div>\n <div class=\"div_hmid_trigger\">\n <label style=\"position: relative;z-index: 1; background-color: transparent;display:inline-block; font-size: 13px;color: #000000;width: 45px \">Name: </label>\n <input class=\"inp_obj_name \" style=\"\n width: 94px;\n\"> </div>\n <div class=\"mbs_shadow\"></div>\n</div>",
            "h": 46,
            "w": 157
        },
        "codebox": {
            "data": "<div style=\"height:80px; width:120px \" class=\"mbs_html mbs_element_codebox \" style=\"border: 2px dotted rgb(0, 255, 255); width: 120px; height: 80px; left: 0px; top: 0px; position: relative;\">\n <div mbs_ class=\"titel_body \">\n <input value=\"Programm\" style=\"position: relative; margin-top: -12px\" type=\"text\" class=\"titel_codebox item_font \"> </div>\n <div class=\"titel_body titel_body_2 \"></div>\n <div class=\"prg_codebox ui-resizable ui-droppable\" style=\"width: 10px; height: 10px; border: 2px dotted transparent;\">\n <div class=\"ui-resizable-handle ui-resizable-e\" style=\"z-index: 90;\"></div>\n <div class=\"ui-resizable-handle ui-resizable-s\" style=\"z-index: 90;\"></div>\n <div class=\"ui-resizable-handle ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se\" style=\"z-index: 90;\"></div>\n </div>\n</div>",
            "h": 80,
            "w": 120
        },
        "next": {
            "data": "<div style=\"height:18px; width:50px \" style=\"z-index: 5; left: 8px; top: 0px; position: relative;\" class=\"fbs_html fbs_element_onborder fbs_element_next onborder_b \">\n <p class=\"head_next\">Next</p>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -121px; top: -210px; position: relative;\">\n <div class=\"html_endpoint ep_mbs_onborder \" style=\"position: absolute; height: 13px; width: 13px; left: 112px; top: 190px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"13\" height=\"13\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"13\" height=\"13\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 18,
            "w": 50
        },
        "next1": {
            "data": "<div style=\"height:18px; width:50px \" style=\"z-index: 5; right: auto; bottom: auto; left: 8px; top: 0px; position: relative;\" class=\"fbs_html fbs_element_onborder fbs_element_next \">\n <p class=\"head_next\">Next 1</p>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: 28px; top: -72px; position: relative;\">\n <div class=\"html_endpoint ep_fbs_onborder \" style=\"position: absolute; height: 13px; width: 13px; left: 17.5px; top: 54.5px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"13\" height=\"13\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"13\" height=\"13\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"#006600\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint ep_mbs_onborder \" style=\"position: absolute; height: 13px; width: 13px; left: -37px; top: 52px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"13\" height=\"13\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"13\" height=\"13\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 18,
            "w": 50
        },
        "next0": {
            "data": "<div style=\"height:18px; width:50px \" style=\"z-index: 5; right: auto; bottom: auto; left: 8px; top: 0px; position: relative;\" class=\"fbs_html fbs_element_onborder fbs_element_next \">\n <p class=\"head_next\">Next 0</p>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: 28px; top: -72px; position: relative;\">\n <div class=\"html_endpoint ep_fbs_onborder \" style=\"position: absolute; height: 13px; width: 13px; left: 17.5px; top: 54.5px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"13\" height=\"13\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"13\" height=\"13\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"#006600\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint ep_mbs_onborder \" style=\"position: absolute; height: 13px; width: 13px; left: -37px; top: 52px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"13\" height=\"13\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"13\" height=\"13\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 18,
            "w": 50
        },
        "each": {
            "data": "<div style=\"height:18px; width:50px \" style=\"z-index: 5; right: auto; bottom: auto; left: 8px; top: 0px; position: relative;\" class=\"fbs_html fbs_element_onborder fbs_element_next \">\n <p class=\"head_next\">each</p>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: 28px; top: -72px; position: relative;\">\n <div class=\"html_endpoint ep_fbs_onborder \" style=\"position: absolute; height: 13px; width: 13px; left: 17.5px; top: 54.5px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"13\" height=\"13\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"13\" height=\"13\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"#ff99ff\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint ep_mbs_onborder \" style=\"position: absolute; height: 13px; width: 13px; left: -37px; top: 52px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"13\" height=\"13\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"13\" height=\"13\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 18,
            "w": 50
        },
        "brake": {
            "data": "<div style=\"height:69px ; width:60px \" data-nr=\"0\" class=\"mbs_html mbs_element_simpel mbs_element_control  \" style=\"left: 10px; top: 0px; position: relative;\">\n  <div class=\"div_head\" style=\"background-color: #0060FF\"> <a class=\"head_font\">Delay</a> </div>\n  <div style=\"border-bottom: 1px solid rgb(166, 166, 166); display: flex;\">\n    <input type=\"text\" class=\"brake_delay   \" title=\"Pause in Sekunden\">\n    <input type=\"checkbox\" class=\"brake_delay_check  \" title=\"Alle laufenden Verzögerungen Beenden\"> </div>\n  <div class=\"div_left\">\n    <div class=\"div_input brake_0_in \"><a class=\"input_font\">Start</a>\n    </div>\n    <div class=\"div_input brake_0_in \"><a class=\"input_font\">Abbruch</a>\n    </div>\n  </div>\n  <div class=\"div_right_brake\">\n    <div class=\"div_output1 brake_0_out \">\n      <a class=\"output_font\"></a>\n    </div>\n  </div>\n  <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1823px; top: -166px; position: relative;\">\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 1813px; top: 132px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 1813px; top: 150px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 20px; width: 20px; left: 1876px; top: 137.5px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n    </svg>\n  </div>\n</div>",
            "h": 69,
            "w": 60
        },
        "intervall": {
            "data": "<div style=\"height:69px ; width:60px \" data-nr=\"0\" class=\"mbs_html mbs_element_simpel mbs_element_control  \" style=\"left: 10px; top: 0px; position: relative;\">\n  <div class=\"div_head\" style=\"background-color: #0060FF\"> <a class=\"head_font\">Intervall</a> </div>\n  <div style=\"border-bottom: 1px solid rgb(166, 166, 166)\">\n    <input type=\"text\" class=\"brake_delay  \" title=\"Pause in Sekunden\"> </div>\n  <div class=\"div_left\">\n    <div class=\"div_input intervall_0_in \"><a class=\"input_font\">Start</a>\n    </div>\n    <div class=\"div_input intervall_0_in \"><a class=\"input_font\">Abbruch</a>\n    </div>\n  </div>\n  <div class=\"div_right_brake\">\n    <div class=\"div_output1 intervall_0_out \">\n      <a class=\"output_font\"></a>\n    </div>\n  </div>\n  <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1900px; top: -223px; position: relative;\">\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 1890px; top: 189px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 1890px; top: 207px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 20px; width: 20px; left: 1953px; top: 194.5px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n    </svg>\n  </div>\n</div>",
            "h": 69,
            "w": 60
        },
        "loop": {
            "data": "<div style=\"height:83px ; width:60px \" data-nr=\"0\" class=\"mbs_html mbs_element_simpel mbs_element_control  \" style=\"left: 10px; top: 0px; position: relative;\">\n  <div class=\"div_head\" style=\"background-color: #0060FF\"> <a class=\"head_font\">Loop</a> </div>\n  <div style=\"border-bottom: 1px solid rgb(166, 166, 166);line-height: 10px;\">\n    <div style=\"color: #000000; display: inline; font-size: 9px;\">Loop:</div>\n    <input type=\"text\" class=\"brake_delay  \" title=\"Anzahl der Durchläufe\">\n    <div style=\"color: #000000; display: inline; font-size: 9px;\">Time:</div>\n    <input type=\"text\" class=\"brake_delay  \" title=\"Pause nach jedem Durchlauf in Sekunden\"> </div>\n  <div class=\"div_left\">\n    <div class=\"div_input loop_0_in \"><a class=\"input_font\">Start</a>\n    </div>\n    <div class=\"div_input loop_0_in \"><a class=\"input_font\">Cancel</a>\n    </div>\n  </div>\n  <div class=\"div_right_loop\">\n    <div class=\"div_output1 loop_0_out \">\n      <a class=\"output_font\"></a>\n    </div>\n  </div>\n  <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1859px; top: -255px; position: relative;\">\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 1849px; top: 221px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 1849px; top: 239px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 20px; width: 20px; left: 1912px; top: 227px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n    </svg>\n  </div>\n</div>",
            "h": 83,
            "w": 60
        },
        "expert": {
            "data": "<div style=\"height:72px; width:60px \" class=\"fbs_html fbs_element_exp \" style=\"left: 8px; top: 0px; position: relative;\">\n <div class=\"div_head\" style=\"background-color: gray\"> <span style=\"background-color:transparent; border:none; width: 56px; text-align: center;\" class=\"head_font \">Expert</span> </div>\n <label class=\"lab_exp_in\">Inputs</label>\n <label class=\"lab_exp_out\">Outputs</label>\n <input class=\"inp_exp_val_in \">\n <input class=\"inp_exp_val_out \">\n <div class=\"div_left_exp\">\n <div class=\"div_input expert_0_in \"></div>\n </div>\n <div class=\"div_right_exp\">\n <div class=\"div_output1 expert_0_out \"></div>\n </div>\n <div style=\"background-color: gray;z-index: 0;height: 15px;\" class=\"btn_exp\"> </div>\n <button type=\"button\" class=\"btn_exp\">Edit</button>\n <div class=\"fbs_shadow\"></div>\n</div>\n<div style=\"left: -50px; top: -126px; position: relative;\">\n <div class=\"html_endpoint \" style=\"position: absolute; height: 11px; width: 20px; left: 40px; top: 72.5px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"11\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"11\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"gray\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n <div class=\"html_endpoint \" style=\"position: absolute; height: 11px; width: 20px; left: 103px; top: 72.5px;\">\n <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"11\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n <rect width=\"20\" height=\"11\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"gray\" stroke=\"none\" style=\"\"></rect>\n </svg>\n </div>\n</div>",
            "h": 72,
            "w": 60
        },
        "block_t": {
            "data": "<div style=\"height:69px ; width:60px \" data-nr=\"0\" class=\"mbs_html mbs_element_simpel mbs_element_control  \" style=\"left: 10px; top: 0px; position: relative;\">\n  <div class=\"div_head\" style=\"background-color: #0060FF\"> <a class=\"head_font\">Block t</a> </div>\n  <div style=\"border-bottom: 1px solid rgb(166, 166, 166);text-align: left;; line-height: 12px\">\n    <div style=\"color: #000000; display: inline; font-size: 9px;\">Ms:</div>\n    <input type=\"text\" class=\"brake_delay  \"> </div>\n  <div class=\"div_left\">\n    <div class=\"div_input block_t_0_in \"><a class=\"input_font\">In</a>\n    </div>\n    <div class=\"div_input block_t_0_in \"><a class=\"input_font\">Reset</a>\n    </div>\n  </div>\n  <div class=\"div_right_brake\">\n    <div class=\"div_output1 block_t_0_out \">\n      <a class=\"output_font\"></a>\n    </div>\n  </div>\n  <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1893px; top: -957px; position: relative;\">\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 1883px; top: 923px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 1883px; top: 941px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 20px; width: 20px; left: 1946px; top: 928.5px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n    </svg>\n  </div>\n</div>",
            "h": 69,
            "w": 60
        },
        "block_tt": {
            "data": "<div style=\"height:83px ; width:60px \" data-nr=\"0\" class=\"mbs_html mbs_element_simpel mbs_element_control  \" style=\"left: 10px; top: 0px; position: relative;\">\n  <div class=\"div_head\" style=\"background-color: #0060FF\"> <a class=\"head_font\">Block tt</a> </div>\n  <div style=\"border-bottom: 1px solid rgb(166, 166, 166); line-height: 12px;\">\n    <div style=\"width:22px; color: #000000; display: inline; font-size: 9px;\">Time1</div>\n    <input type=\"text\" class=\"brake_delay  \">\n    <div style=\"width:22px; color: #000000; display: inline; font-size: 9px;\">Time2</div>\n    <input type=\"text\" class=\"brake_delay  \"> </div>\n  <div class=\"div_left\">\n    <div class=\"div_input block_tt_0_in \"><a class=\"input_font\">In</a>\n    </div>\n    <div class=\"div_input block_tt_0_in \"><a class=\"input_font\">Reset</a>\n    </div>\n  </div>\n  <div class=\"div_right_loop\">\n    <div class=\"div_output1 block_tt_0_out \">\n      <a class=\"output_font\"></a>\n    </div>\n  </div>\n  <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1814px; top: -1066px; position: relative;\">\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 1804px; top: 1032px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 1804px; top: 1050px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 20px; width: 20px; left: 1867px; top: 1038px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n    </svg>\n  </div>\n</div>",
            "h": 83,
            "w": 60
        },
        "block_tn": {
            "data": "<div style=\"height:83px ; width:60px \" data-nr=\"0\" class=\"mbs_html mbs_element_simpel mbs_element_control  \" style=\"left: 10px; top: 0px; position: relative;\">\n  <div class=\"div_head\" style=\"background-color: #0060FF\"> <a class=\"head_font\">Block tn</a> </div>\n  <div style=\"border-bottom: 1px solid rgb(166, 166, 166);;text-align: left; line-height: 12px;\">\n    <div style=\"width:22px; color: #000000; display: inline-block; font-size: 9px;\">Ms: </div>\n    <input type=\"text\" class=\"brake_delay  \">\n    <div style=\"width:22px; color: #000000; display: inline-block; font-size: 9px;\">Count:</div>\n    <input type=\"text\" class=\"brake_delay  \"> </div>\n  <div class=\"div_left\">\n    <div class=\"div_input block_tn_0_in \"><a class=\"input_font\">In</a>\n    </div>\n    <div class=\"div_input block_tn_0_in \"><a class=\"input_font\">Reset</a>\n    </div>\n  </div>\n  <div class=\"div_right_loop\">\n    <div class=\"div_output1 block_tn_0_out \">\n      <a class=\"output_font\"></a>\n    </div>\n  </div>\n  <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1957px; top: -1139px; position: relative;\">\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 1947px; top: 1105px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 1947px; top: 1123px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 20px; width: 20px; left: 2010px; top: 1111px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n    </svg>\n  </div>\n</div>",
            "h": 83,
            "w": 60
        },
        "block_kn": {
            "data": "<div style=\"height:69px ; width:60px \" data-nr=\"0\" class=\"mbs_html mbs_element_simpel mbs_element_control  \" style=\"left: 10px; top: 0px; position: relative;\">\n  <div class=\"div_head\" style=\"background-color: #0060FF\"> <a class=\"head_font\">Block &lt;n </a> </div>\n  <div style=\"border-bottom: 1px solid rgb(166, 166, 166); line-height: 12px\">\n    <div style=\"color: #000000; display: inline; font-size: 9px;\">Count:</div>\n    <input type=\"text\" class=\"brake_delay  \"> </div>\n  <div class=\"div_left\">\n    <div class=\"div_input block_kn_0_in \"><a class=\"input_font\">In</a>\n    </div>\n    <div class=\"div_input block_kn_0_in \"><a class=\"input_font\">Reset</a>\n    </div>\n  </div>\n  <div class=\"div_right_brake\">\n    <div class=\"div_output1 block_kn_0_out \">\n      <a class=\"output_font\"></a>\n    </div>\n  </div>\n  <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1838px; top: -1019px; position: relative;\">\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 1828px; top: 985px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 1828px; top: 1003px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 20px; width: 20px; left: 1891px; top: 990.5px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n    </svg>\n  </div>\n</div>",
            "h": 69,
            "w": 60
        },
        "block_gn": {
            "data": "<div style=\"height:69px ; width:60px \" data-nr=\"0\" class=\"mbs_html mbs_element_simpel mbs_element_control  \" style=\"left: 10px; top: 0px; position: relative;\">\n  <div class=\"div_head\" style=\"background-color: #0060FF\"> <a class=\"head_font\">Block &gt;n </a> </div>\n  <div style=\"border-bottom: 1px solid rgb(166, 166, 166); line-height: 12px\">\n    <div style=\"color: #000000; display: inline; font-size: 9px;\">Count:</div>\n    <input type=\"text\" class=\"brake_delay  \"> </div>\n  <div class=\"div_left\">\n    <div class=\"div_input block_gn_0_in \"><a class=\"input_font\">In</a>\n    </div>\n    <div class=\"div_input block_gn_0_in \"><a class=\"input_font\">Reset</a>\n    </div>\n  </div>\n  <div class=\"div_right_brake\">\n    <div class=\"div_output1 block_gn_0_out \">\n      <a class=\"output_font\"></a>\n    </div>\n  </div>\n  <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1809px; top: -1042px; position: relative;\">\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 1799px; top: 1008px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 1799px; top: 1026px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 20px; width: 20px; left: 1862px; top: 1013.5px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n    </svg>\n  </div>\n</div>",
            "h": 69,
            "w": 60
        },
        "block_e": {
            "data": "<div style=\"height:69px ; width:60px \" data-nr=\"0\" class=\"mbs_html mbs_element_simpel mbs_element_control  \" style=\"left: 10px; top: 0px; position: relative;\">\n  <div class=\"div_head\" style=\"background-color: #0060FF\"> <a class=\"head_font\">Block e </a> </div>\n  <div style=\"border-bottom: 1px solid rgb(166, 166, 166); line-height: 12px\">\n    <div style=\"color: #000000; display: inline; font-size: 9px;\">Count:</div>\n    <input type=\"text\" class=\"brake_delay  \"> </div>\n  <div class=\"div_left\">\n    <div class=\"div_input block_e_0_in \"><a class=\"input_font\">In</a>\n    </div>\n    <div class=\"div_input block_e_0_in \"><a class=\"input_font\">Reset</a>\n    </div>\n  </div>\n  <div class=\"div_right_brake\">\n    <div class=\"div_output1 block_e_0_out \">\n      <a class=\"output_font\"></a>\n    </div>\n  </div>\n  <div class=\"mbs_shadow\"></div>\n</div>\n<div style=\"left: -1934px; top: -1038px; position: relative;\">\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 1924px; top: 1004px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 10px; width: 20px; left: 1924px; top: 1022px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"10\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <rect width=\"20\" height=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></rect>\n    </svg>\n  </div>\n  <div class=\"html_endpoint   \" style=\"position: absolute; height: 20px; width: 20px; left: 1987px; top: 1009.5px;\">\n    <svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"20\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">\n      <circle cx=\"10\" cy=\"10\" r=\"10\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"blue\" stroke=\"none\" style=\"\"></circle>\n    </svg>\n  </div>\n</div>",
            "h": 69,
            "w": 60
        }
    }
    ;

//main_win.title = main_manifest.name + " " + main_manifest.version + " Beta";

//function haveParent(theParent) {
//    start_win = theParent;
//}

function get_userid() {
    //var net_inter = os.networkInterfaces();
    //
    //function findNested(obj, key, memo) {
    //    var i, proto = Object.prototype, ts = proto.toString;
    //    ('[object Array]' !== ts.call(memo)) && (memo = []);
    //    for (i in obj) {
    //        if (proto.hasOwnProperty.call(obj, i)) {
    //            if (i === key) {
    //                memo.push(obj[i]);
    //            } else if ('[object Array]' === ts.call(obj[i]) || '[object Object]' === ts.call(obj[i])) {
    //                findNested(obj[i], key, memo);
    //            }
    //        }
    //    }
    //    return memo;
    //}
    //
    //var net_inter_list = findNested(net_inter,"mac");
    var id = "";
    //$.each(net_inter_list, function(){
    //    if(this.toString() !="00:00:00:00:00:00"){
    //        id = this.toString().replace(/:/g,"");
    //        return false
    //    }
    //});
    return id
}

//var nwDir = upd.getAppPath();


//process.on("uncaughtException", function (e) {
//    main_win.show();
//    SGI.error_box(e.stack)
//});

//var execPath = path.dirname(process.execPath);

var scope;
var Range = ace.require("ace/range").Range
var PRG = {
    struck: {
        codebox: {},
        trigger: [],
        control: []
    }
};

var SGI;
var sim;
SGI = {

    dev: false,
    //version: main_manifest.version,
    version: 0,

    HOST: '37.120.169.17',
    HOST_PORT: 3000,

    os: "win",
    copy_data: [],
    socket: {},
    con_files: [],
    con_data: false,
    settings: {},
    zoom: 1,
    theme: "",
    fbs_n: 0,
    mbs_n: 0,
    scope_init: {},
    experts: {},
    grid: 9,

    gui_rendered: false,
    editor_rendered: false,


    drop_block: false,
    sim_run: false,
    file_name: "",
    key: "",
    plumb_inst: {
        inst_mbs: undefined
    },

    start_data: {
        id: 0,
        name: "Sim_Data",
        newState: {
            value: 0,
            timestamp: 0,
            ack: 0,
            lastchange: 0
        },
        oldState: {
            value: 0,
            timestamp: 0,
            ack: 0,
            lastchange: 0
        },
        channel: {
            id: 0,
            name: "Sim_Data",
            type: "Sim_Data",
            funcIds: "Sim_Data",
            roomIds: "Sim_Data",
            funcNames: "Sim_Data",
            roomNames: "Sim_Data"
        },
        device: {
            id: 0,
            name: "Sim_Data",
            type: "Sim_Data"
        }
    },

    Setup: function () {

        //SGI.dev = true;

        //main_win.on('close', function () {
        //    process.exit();
        //});

        scope = angular.element($('body')).scope();
        scope.$apply();

        //$("#prgopen").attr("nwworkingdir", path.resolve(scope.setup.datastore + "/ScriptGUI_Data/programms/"));
        //$("#prgsaveas").attr("nwworkingdir", path.resolve(scope.setup.datastore + "/ScriptGUI_Data/programms/"));

        // Setze Sprache XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        SGI.language = scope.setup.lang;


        // translate XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        $.each($(".translate"), function () {
            var $this = this;
            $($this).text(SGI.translate($($this).text()))

        });
        $.each($(".title_translate"), function () {
            var $this = this;
            $($this).attr("title", (SGI.translate($($this).attr("title"))))

        });

        // Sim Date  XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        ////var rule = new schedule.RecurrenceRule();
        //rule.second = 0;
        //schedule.scheduleJob(rule, function () {
        //    if (sim.time_mode == "auto") {
        //        var d = new Date();
        //        $("#sim_date").val(('0' + d.getDate()).slice(-2) + "/" + ('0' + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear() + " " + ('0' + d.getHours()).slice(-2) + ':' + ('0' + (d.getMinutes())).slice(-2));
        //    }
        //});
        //var d = new Date();
        //$("#sim_date").val(('0' + d.getDate()).slice(-2) + "/" + ('0' + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear() + " " + ('0' + d.getHours()).slice(-2) + ':' + ('0' + (d.getMinutes())).slice(-2));

        $("#sim_date").datetimepicker({
            timeFormat: "HH:mm",
            altFormat: "dd/mm/yy",
            dateFormat: "dd/mm/yy"

        });

        $("#sim_date").change(function () {
            sim.time_mode = "manual";
            sim.set_time($("#sim_date").val());
        });

        $("#btn_sim_time_auto").button().click(function () {
            sim.time_mode = "auto";
            var d = new Date();
            $("#sim_date").val(('0' + d.getDate()).slice(-2) + "/" + ('0' + (d.getMonth() + 1)).slice(-2) + "/" + d.getFullYear() + " " + ('0' + d.getHours()).slice(-2) + ':' + ('0' + (d.getMinutes())).slice(-2));
            sim_p.send(["time", sim.time_mode])
        });

        // Minimap XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        // todo Später mal
        //setInterval(function () {
        //
        //    $("#minimap_cont").empty();
        //    var prev = $("#prg_panel").html().toString();
        //
        //    prev = prev.replace(/(ng-model="|ng-style=")[A-Za-z0-9\[\].]+"/g, "")
        //        .replace(/(id=")[A-Za-z0-9\[\]._]+"/g, "")
        //        .replace(/(<svg)[/\s/\S]+?(svg>)/g, "")
        //        .replace(/(<a)[/\s/\S]+?(a>)/g, "")
        //        .replace(/(<input)[/\s/\S]+?(\/>)/g, "")
        //        .replace(/(<div class="_jsPlumb_endpoint)[/\s/\S]+?(<\/div>)/g, "")
        //        .replace(/(ng-)[A-Za-z0-9\[\].]+/g, "")
        //        .replace(/(mbs_shadow)/g, "")
        //        .replace(/(fbs_shadow)/g, "")
        //        .replace(/(_jsPlumb_endpoint_anchor_|jsplumb-draggable|jsplumb-droppable)/g, "");
        //
        //
        //    $("#minimap_cont").append(prev);
        //
        //}, 1000);


        // Live Test XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        $("#clear_force").button()
            .click(function () {
                $(this).removeClass("ui-state-focus");
                SGI.del_all_force();
            });

        $("#clear_log").button()
            .click(function () {
                $("#sim_output").children().remove();
                $("#sim_output").prepend("<tr><td style='width: 100px'>Script Log</td><td></td></tr>");
            });


        var start_h;
        var log_h = 130;
        $("#sim_log_head")
            .hover(
            function () {
                $(this).addClass("ui-state-focus");
            }, function () {
                $(this).removeClass("ui-state-focus");
            })
            .dblclick(function () {

                if ($("#sim_log").height() > 129) {
                    log_h = $("#sim_log").height();

                    $("#sim_log").css({
                        height: "10px",
                        "min-height": "10px"
                    });
                    $(".main").css({height: 'calc(100% - ' + (58 + 10) + 'px)'});
                } else {
                    $("#sim_log").css({height: "" + log_h + "px"});
                    $(".main").css({height: 'calc(100% - ' + (58 + log_h) + 'px)'});
                }
            })

            .drag("init", function () {
                start_h = $("#sim_log").height();
            })

            .drag("start", function (ev, dd) {

            })

            .drag(function (ev, dd) {
                if (start_h - dd.deltaY < 130) {
                    $("#sim_log").css({height: "130px"});
                    $(".main").css({height: 'calc(100% - ' + (58 + 130) + 'px)'});
                } else {
                    $("#sim_log").css({height: start_h - dd.deltaY + "px"});
                    $(".main").css({height: 'calc(100% - ' + (58 + start_h - dd.deltaY) + 'px)'});
                }

            });

        if (scope.setup.LT_open == false) {
            $("#sim_log").css({
                height: "10px",
                "min-height": "10px"
            });
            $(".main").css({height: 'calc(100% - ' + (58 + 10) + 'px)'});
        }


        if (scope.setup.mode == "gui") {
            SGI.load_gui();
            SGI.show_gui();

        } else {
            SGI.load_editor();
            SGI.show_editor();
        }

        //

        SGI.menu_iconbar();
        SGI.context_menu();
        SGI.quick_help();
        SGI.setup_socket();
        SGI.global_event();
        //SGI.check_fs(function () {
        //    //SGI.read_experts();
        //    //SGI.make_conpanel();
        //});


        //  Setup XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        $("#setup_dialog").dialog({
            modal: false,
            width: 600,
            maxWidth: "80%",
            height: 400,
            maxHeight: "80%",
            autoOpen: false,
            open: function () {
                SGI.Setup_dialog()
            },
            close: function () {
                scope.$apply();
                SGI.save_setup();
            }
        });

//      $("#setup_dialog").dialog("close");

        scope.save_scope_watchers();

        //main_win.focus();
        //main_win.show();
        //try {
        //    start_win.close();
        //}
        //catch (err) {
        //}

        console.log("Start finish");

        SGI.connect_backend()

$("body").css({
    "visibility": "visible"
})
        // Auto Connect
        if (scope.setup.auto_con) {
            if (scope.setup.con_type == "connect_backend") {
                SGI.connect_backend(scope.setup.last_con)
            }
            if (scope.setup.con_type == "offline") {
                SGI.offline(scope.setup.last_con)
            }

        }


        // todo Register mit Homepage verbinden
//        setTimeout(function () {
//            SGI.server_register()
//        }, 5000);

        //setTimeout(function () {
        //    if (SGI.dev != true) {
        //        if (scope.setup.update) {
        //            try{
        //            upd.checkNewVersion(function (error, newVersionExists, manifest) {
        //                if (!error && newVersionExists) {
        //                    SGI.update()
        //                }
        //            });
        //            }catch(err){
        //
        //            }
        //        }
        //
        //        if ((new Date).toLocaleDateString() != scope.setup.last_open) {
        //            SGI.server_homecall()
        //        }
        //
        //    }
        //}, 100);
    },

    global_event: function () {
        $('#body').on('click', function (event) {
            if ($(event.target).hasClass("prg_panel")) {
                $(".codebox_active").removeClass("codebox_active");
            }
            if (!$(event.target).hasClass("dot") && $(event.target).parent().prop("tagName") != "svg") {
                $(".dot").remove();
            }
        });

        //todo umstellung auf node-webkit shortcuts
        // | backspace 	 8    |   e 	            69   |    numpad 8          104
        // | tab 	     9    |   f 	            70   |    numpad 9          105
        // | enter 	     13   |   g 	            71   |    multiply          106
        // | shift 	     16   |   h 	            72   |    add           	107
        // | ctrl 	     17   |   i 	            73   |    subtract          109
        // | alt 	     18   |   j 	            74   |    decimal point     110
        // | pause/break 19   |   k 	            75   |    divide            111
        // | caps lock 	 20   |   l 	            76   |    f1            	112
        // | escape 	 27   |   m 	            77   |    f2            	113
        // | page up 	 33   |   n 	            78   |    f3            	114
        // | page down 	 34   |   o 	            79   |    f4            	115
        // | end 	     35   |   p 	            80   |    f5            	116
        // | home 	     36   |   q 	            81   |    f6            	117
        // | left arrow  37   |   r 	            82   |    f7            	118
        // | up arrow 	 38   |   s 	            83   |    f8            	119
        // | right arrow 39   |   t	                84   |    f9            	120
        // | down arrow  40   |   u 	            85   |    f10           	121
        // | insert 	 45   |   v 	            86   |    f11           	122
        // | delete 	 46   |   w 	            87   |    f12           	123
        // | 0 	         48   |   x 	            88   |    num lock          144
        // | 1 	         49   |   y 	            89   |    scroll lock      	145
        // | 2 	         50   |   z 	            90   |    semi-colon       	186
        // | 3 	         51   |   left window key   91   |    equal sign       	187
        // | 4 	         52   |   right window key  92   |    comma             188
        // | 5 	         53   |   select key 	    93   |    dash          	189
        // | 6 	         54   |   numpad 0 	        96   |    period            190
        // | 7 	         55   |   numpad 1 	        97   |    forward slash     191
        // | 8 	         56   |   numpad 2 	        98   |    grave accent      192
        // | 9 	         57   |   numpad 3 	        99   |    open bracket      219
        // | a 	         65   |   numpad 4 	        100  |    back slash        220
        // | b 	         66   |   numpad 5 	        101  |    close braket      221
        // | c 	         67   |   numpad 6 	        102  |    single quote 	    222
        // | d 	         68   |   numpad 7 	        103  |

        $(document).keydown(function (event) {
            SGI.key = event.keyCode;

            if (SGI.key == 46 && SGI.mode == "gui") {
                SGI.del_selected()
            } else if (SGI.key == 67 && event.ctrlKey == true && SGI.mode == "gui") {
                SGI.copy_selected();
                $("body").css({cursor: "default"});
            } else if (SGI.key == 86 && event.ctrlKey == true && SGI.mode == "gui") {
                SGI.paste_selected();
                $("body").css({cursor: "default"});
            } else if (SGI.key == 68 && event.altKey == true) {
                $("#develop_menu").show()
            } else if (SGI.key == 89 && event.altKey == true) {
                //main_win.showDevTools();
            } else if (SGI.key == 88 && event.altKey == true) {
////                main_win.close();
//                main_win.reload();
            } else if (SGI.key == 70 && event.altKey == true) {
                var test = test_fehler;
            } else if ((SGI.key == 17 || SGI.key == 91 || SGI.key == 93 || event.ctrlKey == true) && SGI.mode == "gui") {
                $("body").css({cursor: "help"});
                SGI.key = 17;
            }
        });

        $(document).on('click', ".fbs_element", function (target) {
            if (SGI.key == 16) {
                if ($(this).hasClass("fbs_element")) {

                    if ($(this).hasClass("jsplumb-drag-selected")) {
                        SGI.plumb_inst["inst_" + $(this).parent().parent().attr("id")].removeFromDragSelection($(this));
                    } else {
                        SGI.plumb_inst["inst_" + $(this).parent().parent().attr("id")].addToDragSelection($(this));
                    }

                } else {
                    $.each($(target.target).parents(), function () {

                        if ($(this).hasClass("fbs_element")) {
                            if ($(this).hasClass("jsplumb-drag-selected")) {
                                SGI.plumb_inst["inst_" + $(this).parent().parent().attr("id")].removeFromDragSelection($(this));
                            } else {
                                SGI.plumb_inst["inst_" + $(this).parent().parent().attr("id")].addToDragSelection($(this));
                            }
                        }

                    });
                }
            }
        });


        $(document).on('click', ".mbs_element", function (target) {
            if (SGI.key == 16) {
                if ($(this).hasClass("mbs_element")) {
                    if ($(this).hasClass("jsplumb-drag-selected")) {
                        SGI.plumb_inst.inst_mbs.removeFromDragSelection($(this));
                    } else {
                        SGI.plumb_inst.inst_mbs.addToDragSelection($(this));
                    }
                } else {
                    $.each($(target.target).parents(), function () {

                        if ($(this).hasClass("mbs_element")) {
                            if ($(this).hasClass("jsplumb-drag-selected")) {
                                SGI.plumb_inst.inst_mbs.removeFromDragSelection($(this));
                            } else {
                                SGI.plumb_inst.inst_mbs.addToDragSelection($(this));
                            }
                        }
                    });
                }
            }
        });

        $(document).keyup(function () {
            if (SGI.key == 17) {
                $("body").css({cursor: "default"});
            }
            SGI.key = "";
        });

    },

    save_setup: function () {
        localStorage.setup = JSON.stringify(scope.setup)
    },

    load_prg: function (_data) {
        var data = _data;
        try {
            if (data.version == undefined) {

                $.each(data.mbs, function () {
                    this["style"] = {
                        "left": this.left + "px",
                        "top": this.top + "px",
                        "width": this.width + "px",
                        "height": this.height + "px"
                    };

                    delete this.left;
                    delete this.top;
                    delete this.width;
                    delete this.height;


                    SGI.add_mbs_element(this);
                    if (this.counter > SGI.mbs_n) {
                        SGI.mbs_n = this.counter
                    }

                });
                $.each(data.fbs, function () {
                    this["style"] = {
                        "left": this.left + "px",
                        "top": this.top + "px"
                    };

                    delete this.left;
                    delete this.top;


                    SGI.add_fbs_element(this);
                    if (this.counter > SGI.mbs_n) {
                        SGI.fbs_n = this.counter
                    }
                });
                $.each(data.connections.mbs, function () {
                    var source = this.pageSourceId;
                    var target = this.pageTargetId;
                    var c;
                    this["connector"] = {
                        "stub": [30, 30],
                        "midpoint": 0.5
                    };

                    if (target.split("_")[0] == "codebox") {
                        try {
                            c = SGI.plumb_inst.inst_mbs.connect({
                                uuids: [source],
                                target: target

                            });
                            c.setConnector(["Flowchart", {
                                stub: this.connector.stub,
                                alwaysRespectStubs: true,
                                midpoint: this.connector.midpoint
                            }]);
                            scope.con.mbs[c.id] = {
                                pageSourceId: c.sourceId,
                                pageTargetId: c.targetId,
                                connector: {
                                    stub: this.connector.stub,
                                    midpoint: this.connector.midpoint
                                }
                            };
                        } catch (err) {
                        }


                    } else {
                        try {
                            c = SGI.plumb_inst.inst_mbs.connect({uuids: [source, target]});

                            c.setConnector(["Flowchart", {
                                stub: this.connector.stub,
                                alwaysRespectStubs: true,
                                midpoint: this.connector.midpoint
                            }]);
                            scope.con.mbs[c.id] = {
                                pageSourceId: c.sourceId,
                                pageTargetId: c.targetId,
                                connector: {
                                    stub: this.connector.stub,
                                    midpoint: this.connector.midpoint
                                }
                            }
                        } catch (err) {
                        }
                    }

                });
                $.each(data.connections.fbs, function (index) {
                    $.each(this, function () {
                        this["connector"] = {
                            "stub": [30, 30],
                            "midpoint": 0.5
                        };

                        try {

                            var source = this.pageSourceId;
                            var target = this.pageTargetId;

                            var c = SGI.plumb_inst["inst_" + index].connect({
                                uuids: [source, target]

                            });

                            c.setConnector(["Flowchart", {
                                stub: this.connector.stub,
                                alwaysRespectStubs: true,
                                midpoint: this.connector.midpoint
                            }]);

                            scope.con.fbs[index][c.id] = {
                                pageSourceId: c.sourceId,
                                pageTargetId: c.targetId,
                                connector: {
                                    stub: this.connector.stub,
                                    midpoint: this.connector.midpoint
                                }
                            };
                            scope.$apply()

                        } catch (err) {

                        }
                    });
                });

            } else {
                $.each(data.mbs, function () {
                    SGI.add_mbs_element(this);
                    if (this.counter > SGI.mbs_n) {
                        SGI.mbs_n = this.counter
                    }
                });
                $.each(data.fbs, function () {
                    SGI.add_fbs_element(this);
                    if (this.counter > SGI.fbs_n) {
                        SGI.fbs_n = this.counter
                    }
                });
                $.each(data.con.mbs, function () {
                    try {
                        var source = this.pageSourceId;
                        var target = this.pageTargetId;
                        var c;
                        if (target.split("_")[0] == "codebox") {
                            c = SGI.plumb_inst.inst_mbs.connect({
                                uuids: [source],
                                target: target

                            });
                            c.setConnector(["Flowchart", {
                                stub: this.connector.stub,
                                alwaysRespectStubs: true,
                                midpoint: this.connector.midpoint
                            }]);
                            scope.con.mbs[c.id] = {
                                pageSourceId: c.sourceId,
                                pageTargetId: c.targetId,
                                connector: {
                                    stub: this.connector.stub,
                                    midpoint: this.connector.midpoint
                                }
                            };

                        } else {
                            c = SGI.plumb_inst.inst_mbs.connect({uuids: [source, target]});

                            c.setConnector(["Flowchart", {
                                stub: this.connector.stub,
                                alwaysRespectStubs: true,
                                midpoint: this.connector.midpoint
                            }]);
                            scope.con.mbs[c.id] = {
                                pageSourceId: c.sourceId,
                                pageTargetId: c.targetId,
                                connector: {
                                    stub: this.connector.stub,
                                    midpoint: this.connector.midpoint
                                }
                            }
                        }

                    } catch (err) {

                    }

                });
                $.each(data.con.fbs, function (index) {
                    $.each(this, function () {

                        try {

                            var source = this.pageSourceId;
                            var target = this.pageTargetId;

                            var c = SGI.plumb_inst["inst_" + index].connect({
                                uuids: [source, target]

                            });

                            c.setConnector(["Flowchart", {
                                stub: this.connector.stub,
                                alwaysRespectStubs: true,
                                midpoint: this.connector.midpoint
                            }]);

                            scope.con.fbs[index][c.id] = {
                                pageSourceId: c.sourceId,
                                pageTargetId: c.targetId,
                                connector: {
                                    stub: this.connector.stub,
                                    midpoint: this.connector.midpoint
                                }
                            };
                            scope.$apply()

                        } catch (err) {

                        }
                    });
                });
            }

            SGI.fbs_n++;
            SGI.mbs_n++;
        }
        catch (err) {
            $("#wait_div").hide();
            SGI.error_box("load_prg  <br> " + err.stack)
        }
    },

    get_name: function (hmid) {
        var _name;
        if (hmid == undefined) {
            return ["Rechtsklick"];
        } else {
            if (homematic.regaObjects[hmid] == undefined) {
                return "UNGÜLTIGE ID !!!";
            } else {

                try {
                    if (homematic.regaObjects[hmid]["TypeName"] == "VARDP" || homematic.regaObjects[hmid]["TypeName"] == "PROGRAM") {
                        _name = homematic.regaObjects[hmid]["Name"].split(".").pop();

                    } else if (homematic.regaObjects[hmid]["TypeName"].match(/ENUM/)) {
                        _name = SGI.translate(homematic.regaObjects[hmid]["TypeName"].split("ENUM_")[1]) + " > " + homematic.regaObjects[hmid]["Name"];
                    } else if (homematic.regaObjects[hmid]["TypeName"] == "FAVORITE") {
                        _name = SGI.translate("FAVORITE") + " > " + homematic.regaObjects[hmid]["Name"];
                    } else {
                        var parent = homematic.regaObjects[hmid]["Parent"];
                        var parent_data = homematic.regaObjects[parent];
                        _name = parent_data.Name + " > " + homematic.regaObjects[hmid]["Name"].split(".").pop();
                    }
                    return [_name];
                } catch (err) {
                    return "UNGÜLTIGE ID !!!";
                }
            }
        }
    },

    get_id_by_name: function (name) {
        var id = 0;
        $.each(homematic.regaObjects, function (key) {

            if (key > 99999) {
                if (this.Name == name) {
                    id = key;
                    return false
                }
            }
        });
        return id
    },

    get_lowest_obj_id: function (name, cb) {

        if (SGI.con_data) {
            var last_id = 100000;
            var id_by_name = SGI.get_id_by_name(name);
            if (id_by_name == 0) {
                $.each(Object.keys(homematic.regaObjects).sort(), function () {

                    var id = parseInt(this);
                    if (id > 99999) {
                        if (id == last_id) {
                            last_id++;
                        } else {
                            return false
                        }
                    }
                });
                return cb(last_id)

            } else {
                return cb(id_by_name)
            }
        } else {
            return cb("undefined")
        }
    },

    //check_fs: function (cb) {
    //
    //    function check_dir() {
    //
    //        try {
    //            if (!fs.existsSync(path.resolve(scope.setup.datastore + '/ScriptGUI_Data'))) {
    //                fs.mkdirSync(path.resolve(scope.setup.datastore + '/ScriptGUI_Data'));
    //            }
    //            if (!fs.existsSync(path.resolve(scope.setup.datastore + '/ScriptGUI_Data/programms'))) {
    //                fs.mkdirSync(path.resolve(scope.setup.datastore + '/ScriptGUI_Data/programms'));
    //            }
    //            if (!fs.existsSync(path.resolve(scope.setup.datastore + '/ScriptGUI_Data/connections'))) {
    //                fs.mkdirSync(path.resolve(scope.setup.datastore + '/ScriptGUI_Data/connections'));
    //            }
    //            if (!fs.existsSync(path.resolve(scope.setup.datastore + '/ScriptGUI_Data/experts'))) {
    //                fs.mkdirSync(path.resolve(scope.setup.datastore + '/ScriptGUI_Data/experts'));
    //            }
    //            cb()
    //        }
    //        catch (e) {
    //        }
    //    }
    //
    //    if (scope.setup.datastore == "" || !fs.existsSync(path.resolve(scope.setup.datastore))) {
    //        $("body").append('\
    //            <div id="dialog_datastore" style="text-align: center" title="Datastore">\
    //            <img src="./img/logo.png" style="width: 300px"/><br><br><br>\
    //            <div style="font-size: 16px; font-weight: 900;">' + SGI.translate("select_datastore") + '</div><br><br>\
    //            <input style="display:none" id="datastore_patch" type="file"  nwdirectory />\
    //            <div style="display: inline">' + SGI.translate("path") + '</div><input type="text" style="width: 450px" id="inp_datastore" value=""/><button style="height: 27px;margin-top: -3px;" id="btn_datastore_chose">...</button><br><br><br>\
    //            <button id="btn_datastore_ok">' + SGI.translate("ok") + '</button>\
    //            </div>');
    //
    //        $("#dialog_datastore").dialog({
    //            width: "600px",
    //            height: 400,
    //            dialogClass: "update",
    //            modal: true,
    //            close: function () {
    //                $("#dialog_datastore").remove();
    //                check_dir()
    //            }
    //        });
    //
    //        $("#btn_datastore_ok").button().click(function () {
    //            if (fs.existsSync(path.resolve($("#inp_datastore").val()))) {
    //
    //                scope.setup.datastore = path.resolve($("#inp_datastore").val());
    //                scope.$apply();
    //                SGI.save_setup();
    //                $("#dialog_datastore").dialog("close")
    //
    //            } else {
    //                alert("Path not exist")
    //            }
    //        });
    //
    //        $("#btn_datastore_chose").button().click(function () {
    //            var chooser = $("#datastore_patch");
    //            chooser.change(function () {
    //                if ($(this).val() != "") {
    //                    $("#inp_datastore").val($(this).val());
    //                }
    //            });
    //
    //            chooser.attr("nwworkingdir", $("#inp_datastore").val());
    //            chooser.trigger('click');
    //        });
    //    } else {
    //        check_dir()
    //    }
    //
    //
    //}
};


var deleteFolderRecursive = function (path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function (file, index) {
            var curPath = path + "/" + file;
            if (fs.statSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};


