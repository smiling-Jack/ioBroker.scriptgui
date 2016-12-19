/**
 * Created by schorling on 25.06.15.
 */


jQuery.extend(true, SGI, {

    load_gui: function(){


        jsPlumb.ready(function () {

            SGI.mbs_inst();

        });

        // Toolbox XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        $(".toolbox").hide();
        $("#sim_output").prepend("<tr><td style='width: 100px'>Script Log</td><td></td></tr>");
        $.each($(".html_element"), function () {
            var id = $(this).attr("id");
            if (bausteine[id]) {
                $(this)
                    .append('<div style="position:absolute">' + bausteine[id]["data"] + '</div>')
                    .css({height: bausteine[id].h + "px", width: bausteine[id].w + "px"})
            } else {
                $(this).append('<div class="mbs_html " style="height:62px; width: 124px ;position: relative;">\
                    <div style="position: relative; z-index: 3; color: red; margin-top: 10px;font-size: 12px;font-weight: 900; line-height: 44px;">' + id + '</div>\
                </div>');
            }
        });


        // Make btn Toolboxauswahl





        // Toolboxauswahl
        $("#toolbox_select").val(scope.setup.toolbox).selectmenu({
            change : function (event,ui) {
                var val = $("#toolbox_select").val();
                $(".toolbox").hide();
                $("#toolbox_" + val).show();
                scope.setup.toolbox = val;
                scope.$apply();
                //SGI.save_setup();
                $("#toolbox_select ~ span").removeClass("ui-state-focus")
            }
        });
        $("#toolbox_" + scope.setup.toolbox).show();


        //  Make element draggable XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX



        $(".fbs").draggable({
            helper: "clone",
            appendTo: "body",
            zIndex: 101,
            containment: "body",
            iframeFix: true,
            start: function (e, ui) {
            },
            drag: function (e, ui) {
                ui.position.left = parseInt(ui.offset.left + 52);
                ui.position.top = parseInt(ui.offset.top - 0);
            },
            stop: function () {
                $("#helper").remove()
            }
        });

        $(".mbs").draggable({
            helper: "clone",
            appendTo: "body",
            zIndex: 101,
            containment: "body",
            iframeFix: true,
            start: function (e, ui) {

            },
            drag: function (e, ui) {

                ui.position.left = parseInt(ui.offset.left + 10);
                ui.position.top = parseInt(ui.offset.top - 0);
            },
            stop: function () {
                $("#helper").remove()
            }
        });

        // Make element droppable XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

        $(".prg_panel")
            .droppable({
                accept: ".mbs , .fbs",
                drop: function (ev, ui) {
                    setTimeout(function () {

                        var left;
                        var top;
                        var data;
                        if ($(ui["draggable"][0]).hasClass("mbs")) {
                            if (ui["draggable"] != ui["helper"] && ev.pageX > 180) {
                                data = {
                                    type: $(ui["draggable"][0]).attr("id")
                                };
                                top = parseInt((ui["offset"]["top"] - $("#prg_panel").offset().top + 30) / SGI.zoom);
                                left = parseInt((ui["offset"]["left"] - $("#prg_panel").offset().left + 10 ) / SGI.zoom);
                                SGI.add_mbs_element(data, left, top);
                            }
                        } else {

                            if ($(ev.target).attr("id") == "prg_panel" && SGI.drop_block == false && scope.setup.fbs_wrap == true && ev.pageX > 180) {
                                data = {
                                    type: "codebox"
                                };
                                top = parseInt((ui["offset"]["top"] - $("#prg_panel").offset().top - 20 ) / SGI.zoom);
                                left = parseInt((ui["offset"]["left"] - $("#prg_panel").offset().left ) / SGI.zoom);
                                SGI.add_mbs_element(data, left, top);
                                data = {
                                    parent: $("#prg_panel").children().last().children().last().attr("id"),
                                    type: $(ui["draggable"][0]).attr("id")
                                };

                                SGI.add_fbs_element(data, 50 / SGI.zoom, 50 / SGI.zoom);
                            }
                        }
                    }, 0);
                }
            });

        SGI.select_mbs();
        SGI.select_fbs();
        SGI.make_conpanel();
        SGI.gui_rendered = true;
    },

    show_gui: function(){
        SGI.hide_editor();
        if (!SGI.gui_rendered) {
            SGI.load_gui()
        }

        SGI.setMain();

        sim.step = $('#lba_run_step').attr("aria-pressed")
        if (sim.step == "true") {
            $('#stepSpeed').show()
        } else {
            $('#stepSpeed').hide()
        }
        $("#lba_run_step").show();
        $("#lba_run_type2").show();
        $("#lba_run_type1").trigger("click");
        $("#main_gui").show();
        $(".set_gui").show();


        // slider XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        $(".prg_body").scrollTop(1000 - ($(".prg_body").height() / 2));
        $(".prg_body").scrollLeft(2000 - ($(".prg_body").width() / 2));
        setTimeout(function () {
            document.styleSheets[1].cssRules[0].style["background-color"] = $(".frame_color").css("background-color");
            document.styleSheets[1].cssRules[1].style["background-color"] = $(".frame_color").css("background-color");
        }, 100);

        SGI.mode = "gui";
        scope.setup.mode = "gui";
        scope.$apply();
        //SGI.save_setup()
    },

    hide_gui: function(){
        $("#main_gui").hide();
        $(".set_gui").hide()
    },

    mbs_inst: function () {

        SGI.plumb_inst.inst_mbs = jsPlumb.getInstance({
            PaintStyle: {lineWidth: 4, strokeStyle: "blue"},
            HoverPaintStyle: {strokeStyle: "red", lineWidth: 2},
//            ConnectionOverlays: [
//                [ "Arrow", {
//                    location: 1,
//                    id: "arrow",
//                    length: 12,
//                    foldback: 0.8
//                } ]
//            ],
            Container: "prg_panel",
            Connector: ["Flowchart", {stub: 30, alwaysRespectStubs: true, midpoint: 0.5}],
            Scope: "singel"
        });

        var mbs_dot;
        SGI.plumb_inst.inst_mbs.bind("click", function (c) {
            mbs_dot = setTimeout(function () {

                var id = c.id;
                var connector_data;
                var dot1_x;
                var dot1_y;
                var dot2_x;
                var dot2_y;
                var dot3_x;
                var dot3_y;
                var dot1_old_posi;
                var dot3_old_posi;
                var dot2_old_posi;
                var dot2_d;
                var svg_w;
                var svg_h;
                var dot_start;
                var old_midpoint;
                var old_stub;


                function make_dot() {
                    connector_data = scope.con.mbs[id].connector;
                    var svg_posi = {
                        top: parseInt($(c.connector.svg).css("top")),
                        left: parseInt($(c.connector.svg).css("left"))
                    };

                    var prg_posi = $(c.connector.svg).parent().offset();
                    var path = c.connector.getPath();
                    var svg_trans = $(c.connector.svg).children().first()[0].getAttribute("transform").replace("translate(", "").replace(")", "").split(",");
                    dot1_x = svg_posi.left + path[0].end[0] + parseInt(svg_trans[0]) - 8;
                    dot1_y = svg_posi.top + path[0].end[1] + parseInt(svg_trans[1]) - 8;

                    if (path.length == 5) {
                        dot2_x = svg_posi.left + path[3].start[0] + parseInt(svg_trans[0]) + Math.abs((path[2].start[0] - path[2].end[0]) / 2) + 1;
                        dot2_y = svg_posi.top + path[2].start[1] - parseInt(svg_trans[1]) + Math.abs((path[3].start[1] - path[2].start[1]) / 2) + 1;
                        dot2_d = "y";
                        dot3_x = svg_posi.left + path[path.length - 1].start[0] + parseInt(svg_trans[0]) - 8;
                        dot3_y = svg_posi.top + path[path.length - 1].end[1] - parseInt(svg_trans[1]);

                        $(".dot").remove();
                        $("#prg_panel").append('<div id="dot1" class="dot" style="left:' + dot1_x + 'px;top: ' + dot1_y + 'px  "></div>');
                        $("#prg_panel").append('<div id="dot2" class="dot" style="left:' + dot2_x + 'px;top: ' + dot2_y + 'px  "></div>');
                        $("#prg_panel").append('<div id="dot3" class="dot" style="left:' + dot3_x + 'px;top: ' + dot3_y + 'px  "></div>');
                        dot1_drag();
                        dot2_drag();
                        dot3_drag();
                    }
                    if (path.length == 3 && path[2].start[0] < path[2].end[0] && path[1].start[1] < path[1].end[1]) {
                        dot2_x = svg_posi.left + path[1].start[0] - parseInt(svg_trans[0]) - Math.abs((path[2].start[0] - path[2].start[0]) / 2);
                        dot2_y = svg_posi.top + path[1].start[1] - parseInt(svg_trans[1]) + Math.abs((path[2].start[1] - path[1].start[1]) / 2);
                        dot3_x = svg_posi.left + path[path.length - 1].end[0] + parseInt(svg_trans[0]) - 8;
                        dot3_y = svg_posi.top + path[path.length - 1].end[1] - parseInt(svg_trans[1]);

                        $(".dot").remove();
                        $("#prg_panel").append('<div id="dot1" class="dot" style="left:' + dot1_x + 'px;top: ' + dot1_y + 'px  "></div>');
                        $("#prg_panel").append('<div id="dot2" class="dot" style="left:' + dot2_x + 'px;top: ' + dot2_y + 'px  "></div>');
                        $("#prg_panel").append('<div id="dot3" class="dot" style="left:' + dot3_x + 'px;top: ' + dot3_y + 'px  "></div>');
                        dot1_drag();
                        dot2_drag();
                        dot3_drag();
                    }
                    if (path.length == 3 && path[2].start[0] < path[2].end[0] && path[1].start[1] > path[1].end[1]) {
                        dot2_x = svg_posi.left + path[1].start[0] - parseInt(svg_trans[0]) - Math.abs((path[2].start[0] - path[2].start[0]) / 2);
                        dot2_y = svg_posi.top + path[1].start[1] - parseInt(svg_trans[1]) - Math.abs((path[2].start[1] - path[1].start[1]) / 2);
                        dot3_x = svg_posi.left + path[path.length - 1].end[0] + parseInt(svg_trans[0]) - 8;
                        dot3_y = svg_posi.top + path[path.length - 1].end[1] - parseInt(svg_trans[1]);

                        $(".dot").remove();
                        $("#prg_panel").append('<div id="dot1" class="dot" style="left:' + dot1_x + 'px;top: ' + dot1_y + 'px  "></div>');
                        $("#prg_panel").append('<div id="dot2" class="dot" style="left:' + dot2_x + 'px;top: ' + dot2_y + 'px  "></div>');
                        $("#prg_panel").append('<div id="dot3" class="dot" style="left:' + dot3_x + 'px;top: ' + dot3_y + 'px  "></div>');
                        dot1_drag();
                        dot2_drag();
                        dot3_drag();
                    }
                    if (path.length == 3 && path[2].start[0] > path[2].end[0]) {
                        $(".dot").remove();
                        $("#prg_panel").append('<div id="dot1" class="dot" style="left:' + dot1_x + 'px;top: ' + dot1_y + 'px  "></div>');
                        dot1_drag()
                    }
                    if (path.length == 4) {
                        dot2_x = svg_posi.left + path[1].start[0] + parseInt(svg_trans[0]) - Math.abs((path[1].start[0] - path[1].end[0]) / 2) - 8;
                        dot2_y = svg_posi.top + path[1].start[1] - parseInt(svg_trans[1]) + Math.abs((path[1].start[1] - path[1].start[1]) / 2) + 1;
                        dot2_d = "y";
                        $(".dot").remove();
                        $("#prg_panel").append('<div id="dot2" class="dot" style="left:' + dot2_x + 'px;top: ' + dot2_y + 'px  "></div>');
                        dot2_drag()

                    }


                    function dot1_drag() {

                        $("#dot1").draggable({
                            axis: "x",
                            containment: $(c.connector.svg).parent(),
                            start: function (e, ui) {


                                dot_start = ui.position;
                                connector_data = scope.con.mbs[id].connector;
                                old_stub = connector_data.stub.slice();

                                $("#dot2, #dot3").remove()

                            },
                            drag: function (e, ui) {
                                var dif_x = ui.position.left - dot_start.left;


                                var new_stub = parseInt(old_stub[0]) + dif_x;
                                if (new_stub < 30) {
                                    new_stub = 30;
                                    ui.position = dot1_old_posi;
                                } else {
                                    dot1_old_posi = ui.position
                                }
                                connector_data.stub[0] = new_stub;


                                c.setConnector(["Flowchart", {
                                    stub: connector_data.stub,
                                    alwaysRespectStubs: true,
                                    midpoint: connector_data.midpoint
                                }]);
                                dot1_x = svg_posi.left + path[0].end[0] + parseInt(svg_trans[0]);
                            },
                            stop: function () {
                                scope.con.mbs[id].connector = connector_data;
                                scope.$apply();
                                make_dot();
                            }
                        });
                    }

                    function dot2_drag() {
                        $("#dot2").draggable({
                            axis: dot2_d,
//                        containment: $(c.connector.svg).parent(),
                            start: function (e, ui) {
                                $("#dot1, #dot3").remove();
                                connector_data = scope.con.mbs[id].connector;
                                svg_w = parseInt(c.connector.bounds.maxX - (connector_data.stub[0] + connector_data.stub[1]));
                                svg_h = parseInt(c.connector.bounds.maxY);
                                dot_start = ui.position;
                                old_midpoint = parseFloat(connector_data.midpoint);

                                if (path.length == 4) {
                                    svg_h = parseInt(c.connector.bounds.maxY - (connector_data.stub[0]));
                                }

                                if (path.length == 5) {
                                    if (path[2].start[0] == path[2].end[0]) {
                                        dot2_d = "x";
                                        $("#dot2").draggable("option", "axis", "x");
                                    } else {
                                        dot2_d = "y";
                                        $("#dot2").draggable("option", "axis", "y");
                                    }

                                }
                                if (path.length == 3) {
                                    if (path[1].start[0] == path[1].end[0]) {
                                        dot2_d = "x";
                                        $("#dot2").draggable("option", "axis", "x");
                                    } else {
                                        dot2_d = "y";
                                        $("#dot2").draggable("option", "axis", "y");
                                    }
                                }
                            },
                            drag: function (e, ui) {
                                var dif_x = ui.position.left - dot_start.left;
                                var dif_y = ui.position.top - dot_start.top;
                                var new_midpoint;
                                path = c.connector.getPath();

                                if (dot2_d == "x") {
                                    new_midpoint = Math.round((1 / svg_w * (svg_w * old_midpoint + dif_x)) * 100) / 100;

                                } else {
                                    if (path[1].start[1] < path[1].end[1] || path[0].start[1] < path[0].end[1]) {
                                        new_midpoint = Math.round((1 / svg_h * (svg_h * old_midpoint + dif_y)) * 100) / 100;
                                    } else {
                                        new_midpoint = Math.round((1 / svg_h * (svg_h * old_midpoint - dif_y)) * 100) / 100;
                                    }
                                }

                                if (new_midpoint > 0.98 || new_midpoint < 0.02) {

                                    if (new_midpoint > 0.98) {
                                        new_midpoint = 0.98;
                                        if (path.length == 5) {
                                            ui.position.left = svg_posi.left + path[2].start[0] + parseInt(svg_trans[0]) - Math.abs((path[3].start[0] - path[2].start[0]) / 2) + 1;
                                            ui.position.top = svg_posi.top + path[2].start[1] + parseInt(svg_trans[1]) + Math.abs((path[3].start[1] - path[2].start[1]) / 2) - 8;
                                        } else if (path.length == 4) {
                                            ui.position.left = dot2_x = svg_posi.left + path[1].start[0] + parseInt(svg_trans[0]) - Math.abs((path[1].start[0] - path[1].end[0]) / 2) - 8;
                                            ui.position.top = dot2_y = svg_posi.top + path[1].start[1] - parseInt(svg_trans[1]) + Math.abs((path[1].start[1] - path[1].start[1]) / 2) + 1;
                                        } else {
                                            ui.position.left = svg_posi.left + path[1].start[0] - parseInt(svg_trans[0]) - Math.abs((path[2].start[0] - path[2].start[0]) / 2);
                                            ui.position.top = svg_posi.top + path[1].start[1] - parseInt(svg_trans[1]) + Math.abs((path[2].start[1] - path[1].start[1]) / 2);
                                        }
                                    }

                                    if (new_midpoint < 0.02) {
                                        new_midpoint = 0.02;
                                        if (path.length == 5) {
                                            ui.position.left = svg_posi.left + path[2].start[0] + parseInt(svg_trans[0]) - Math.abs((path[3].start[0] - path[2].start[0]) / 2) + 1;
                                            ui.position.top = svg_posi.top + path[2].start[1] + parseInt(svg_trans[1]) + Math.abs((path[3].start[1] - path[2].start[1]) / 2) - 8;
                                        } else if (path.length == 4) {
                                            ui.position.left = dot2_x = svg_posi.left + path[1].start[0] + parseInt(svg_trans[0]) - Math.abs((path[1].start[0] - path[1].end[0]) / 2) - 8;
                                            ui.position.top = dot2_y = svg_posi.top + path[1].start[1] - parseInt(svg_trans[1]) + Math.abs((path[1].start[1] - path[1].start[1]) / 2) + 1;
                                        } else {
                                            ui.position.left = svg_posi.left + path[1].start[0] - parseInt(svg_trans[0]) - Math.abs((path[2].start[0] - path[2].start[0]) / 2);
                                            ui.position.top = svg_posi.top + path[1].start[1] - parseInt(svg_trans[1]) + Math.abs((path[2].start[1] - path[1].start[1]) / 2);
                                        }
                                    }
                                } else {
                                    dot2_old_posi = ui.position
                                }

                                connector_data.midpoint = new_midpoint;
                                c.setConnector(["Flowchart", {
                                    stub: connector_data.stub,
                                    alwaysRespectStubs: true,
                                    midpoint: connector_data.midpoint
                                }]);
                            },
                            stop: function () {
                                scope.con.mbs[id].connector = connector_data;
                                scope.$apply();
                                make_dot();
                            }

                        });
                    }

                    function dot3_drag() {
                        $("#dot3").draggable({
                            axis: "x",
                            containment: $(c.connector.svg).parent(),
                            start: function (e, ui) {

                                dot_start = ui.position;
                                connector_data = scope.con.mbs[id].connector;
                                old_stub = connector_data.stub.slice();

                                $("#dot1, #dot2").remove()
                            },
                            drag: function (e, ui) {
                                var dif_x;
                                var new_stub;

                                if (path[path.length - 1].start[0] < path[path.length - 1].end[0]) {
                                    dif_x = ui.position.left - dot_start.left;
                                    new_stub = parseInt(old_stub[1]) - dif_x;
                                    if (new_stub < 30) {
                                        new_stub = 30;
                                        ui.position = dot3_old_posi;
                                    } else {
                                        dot3_old_posi = ui.position
                                    }
                                    connector_data.stub[1] = new_stub;
                                    c.setConnector(["Flowchart", {
                                        stub: connector_data.stub,
                                        alwaysRespectStubs: true,
                                        midpoint: connector_data.midpoint
                                    }]);
                                    dot2_x = svg_posi.left + path[0].end[0] + parseInt(svg_trans[0]);
                                } else {
                                    dif_x = ui.position.left - dot_start.left;
                                    new_stub = parseInt(old_stub[1]) + dif_x;
                                    if (new_stub < 30) {
                                        new_stub = 30;
                                        ui.position = dot3_old_posi;
                                    } else {
                                        dot3_old_posi = ui.position
                                    }
                                    connector_data.stub[1] = new_stub;
                                    c.setConnector(["Flowchart", {
                                        stub: connector_data.stub,
                                        alwaysRespectStubs: true,
                                        midpoint: connector_data.midpoint
                                    }]);
                                    dot2_x = svg_posi.left + path[0].end[0] + parseInt(svg_trans[0]);
                                }
                            },
                            stop: function () {
                                scope.con.mbs[id].connector = connector_data;
                                scope.$apply();
                                make_dot();
                            }
                        });
                    }
                }

                if (scope.con.mbs[id]) {
                    make_dot();
                }

            }, 300)
        });

        SGI.plumb_inst.inst_mbs.bind("dblclick", function (c) {
            if (SGI.klick.target.tagName == "path") {
                clearTimeout(mbs_dot);
                $(".dot").remove();
                SGI.plumb_inst.inst_mbs.detach(c);
            }
        });

        SGI.plumb_inst.inst_mbs.bind("connection", function (c) {

            var mbs_in = c.targetId.split("_")[0];

            scope.con.mbs[c.connection.id] = {
                pageSourceId: c.connection.sourceId,
                pageTargetId: c.connection.targetId,
                connector: {
                    stub: [30, 30],
                    midpoint: 0.5
                }
            };


            scope.$apply();

            if (mbs_in == "brake" || mbs_in == "intervall" || mbs_in == "loop") {
                c.connection.removeAllOverlays()
            }
        });

        SGI.plumb_inst.inst_mbs.bind("contextmenu", function (c) {
            SGI.con = c;
        });

        SGI.plumb_inst.inst_mbs.bind("connectionDetached", function (c) {
            delete scope.con.mbs[c.connection.id];
            scope.$apply();
        });

    },

    select_mbs: function () {

        // Click coordinates
        var x1, x2, y1, y2;

        //Variable indicates wether a mousedown event within your selection happend or not
        var selection_mbs = false;
        var selection_start = false;

        // Selection frame (playground :D)
        $("#prg_body").mousedown(function (e) {

            if ($(e.target).attr("id") == "prg_panel") {

                var x = $("#prg_body").width() + 150;
                var y = $("#prg_body").height() + 50;

                if (e.pageX < x - 20 && e.pageY < y - 20) {
                    selection_mbs = true;
                    // store mouseX and mouseY
                    x1 = e.pageX;
                    y1 = e.pageY;
                }
            }
        });

        // If selection is true (mousedown on selection frame) the mousemove
        // event will draw the selection div
        $('#prg_body,#selection').mousemove(function (e) {
            if (selection_mbs) {
                if (!selection_start) {

                    $.each(SGI.plumb_inst, function () {
                        this.clearDragSelection();
                    });

                    selection_start = true;
                }
                // Store current mouseposition
                x2 = e.pageX;
                y2 = e.pageY;

                // Prevent the selection div to get outside of your frame
                //(x2+this.offsetleft < 0) ? selection = false : ($(this).width()+this.offsetleft < x2) ? selection = false : (y2 < 0) ? selection = false : ($(this).height() < y2) ? selection = false : selection = true;;
                // If the mouse is inside your frame resize the selection div
                if (selection_mbs) {
                    // Calculate the div selection rectancle for positive and negative values
                    var TOP = (y1 < y2) ? y1 : y2;
                    var LEFT = (x1 < x2) ? x1 : x2;
                    var WIDTH = (x1 < x2) ? x2 - x1 : x1 - x2;
                    var HEIGHT = (y1 < y2) ? y2 - y1 : y1 - y2;

                    // Use CSS to place your selection div
                    $("#selection").css({
                        position: 'absolute',
                        zIndex: 5000,
                        left: LEFT,
                        top: TOP,
                        width: WIDTH,
                        height: HEIGHT
                    });
                    $("#selection").show();

                    // Info output
                    $('#status2').html('( x1 : ' + x1 + ' )  ( x2 : ' + x2 + ' )  ( y1 : ' + y1 + '  )  ( y2 : ' + y2 + ' )  SPOS:' + TOP);
                }
            }
        });
        // UNselection
        // Selection complete, hide the selection div (or fade it out)
        $('#prg_body,#selection').mouseup(function (e) {

            selection_start = false;
            if (selection_mbs) {
                var mbs_element = $("#prg_panel").find(".jsplumb-drag-selected");
                if (mbs_element.length > 0) {
                    if ($(e.target).attr("id") == "prg_panel" || $(e.target).is(".prg_codebox")) {
                        $.each(SGI.plumb_inst, function () {
                            this.clearDragSelection();
                        });
                    }
                    $("#selection").hide();
                } else {
                    getIt();
                    $("#selection").hide();
                }
            }
            selection_mbs = false;
        });


        //Function for the select
        function getIt() {
            if (selection_mbs) {
                // Get all elements that can be selected
                $(".mbs_element").each(function () {
                    var p = $(this).offset();
                    // Calculate the center of every element, to save performance while calculating if the element is inside the selection rectangle
                    var xmiddle = p.left + $(this).width() / 2;
                    var ymiddle = (p.top - 50) + $(this).height() / 2;
                    if (matchPos(xmiddle, ymiddle)) {
                        // Colorize border, if element is inside the selection
                        if (!$(this).hasClass("mbs_element_codebox")) {
                            SGI.plumb_inst.inst_mbs.addToDragSelection($(this))
                        }
                    }
                });
            }
        }

        function matchPos(xmiddle, ymiddle) {
            // If selection is done bottom up -> switch value
            var myX1;
            var myX2;
            var myY1;
            var myY2;

            if (x1 > x2) {
                myX1 = x2;
                myX2 = x1;
            } else {
                myX1 = x1;
                myX2 = x2;
            }
            if (y1 > y2) {
                myY1 = y2;
                myY2 = y1;
            } else {
                myY1 = y1;
                myY2 = y2;
            }
            // Matching
            if ((xmiddle > myX1) && (xmiddle < myX2)) {
                if ((ymiddle > myY1) && (ymiddle < myY2)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    },

    select_fbs: function () {

        // Click coordinates
        var x, y, x1, x2, y1, y2;

        //Variable indicates wether a mousedown event within your selection happend or not
        var selection_fbs = false;
        var selection_start = false;
        var selection_codebox = "";
        var inst;

        // Selection frame (playground :D)
        $("#prg_panel").on("mousedown", ".prg_codebox", function (e) {
            if ($(e.target).is('.prg_codebox')) {
                $("body").bind("mousemove", function (_e) {

                    inst = $(e.target).parent().attr("id");

                    if (selection_fbs) {

                        if (!selection_start) {
//                            $(".fbs_element").removeClass("fbs_selected");
                            $.each(SGI.plumb_inst, function () {
                                this.clearDragSelection();
                            });
                            selection_start = true;
                        }
                        // Store current mouseposition
                        x2 = _e.pageX;
                        y2 = _e.pageY;

                        if (x2 > ($(selection_codebox).parent().offset().left + x)) {
                            x2 = $(selection_codebox).parent().offset().left + x + 2;
                        }
                        if (x2 < ($(selection_codebox).parent().offset().left)) {
                            x2 = $(selection_codebox).parent().offset().left - 2;
                        }
                        if (y2 > ($(selection_codebox).parent().offset().top + y )) {
                            y2 = $(selection_codebox).parent().offset().top + y + 2;
                        }
                        if (y2 < ($(selection_codebox).parent().offset().top)) {
                            y2 = $(selection_codebox).parent().offset().top - 2;
                        }

                        // Prevent the selection div to get outside of your frame
                        //(x2+this.offsetleft < 0) ? selection = false : ($(this).width()+this.offsetleft < x2) ? selection = false : (y2 < 0) ? selection = false : ($(this).height() < y2) ? selection = false : selection = true;;
                        // If the mouse is inside your frame resize the selection div

                        // Calculate the div selection rectancle for positive and negative values
                        var TOP = (y1 < y2) ? y1 : y2;
                        var LEFT = (x1 < x2) ? x1 : x2;
                        var WIDTH = (x1 < x2) ? x2 - x1 : x1 - x2;
                        var HEIGHT = (y1 < y2) ? y2 - y1 : y1 - y2;


                        // Use CSS to place your selection div
                        $("#selection").css({
                            position: 'absolute',
                            zIndex: 5000,
                            left: LEFT + 3,
                            top: TOP + 3,
                            width: WIDTH - 3,
                            height: HEIGHT - 3
                        });
                        $("#selection").show();

                        // Info output
                        $('#status2').html('( x1 : ' + x1 + ' )  ( x2 : ' + x2 + ' )  ( y1 : ' + y1 + '  )  ( y2 : ' + y2 + ' )  SPOS:' + TOP);
                    }
                });
                selection_codebox = this;
                x = $(this).width();
                y = $(this).height();

                selection_fbs = true;
                // store mouseX and mouseY
                x1 = e.pageX - 2;
                y1 = e.pageY - 2;
                x2 = e.pageX - 2;
                y2 = e.pageY - 2;
            }
        });

        $(document).mouseup(function (e) {
            if (selection_fbs) {
//                var $fbs_element = $("#prg_panel").find(".fbs_selected");
                var $fbs_element = $("#prg_panel").find(".jsplumb-drag-selected");

                if (e.shiftKey == true) {
                    var $target = $(e.target);
                    if ($target.hasClass("fbs_element")) {
                        $target.toggleClass("fbs_selected");
                    } else {
                        $.each($target.parents(), function () {
                            if ($(this).hasClass("fbs_element")) {
                                $(this).toggleClass("fbs_selected");
                            }
                        });
                    }
                    getIt();
                    $("#selection").hide();
                }
                else {
                    $.each(SGI.plumb_inst, function () {
                        this.clearDragSelection();
                    });
                    getIt();
                    $("#selection").hide();
                }
                selection_fbs = false;
                $("body").unbind("mousemove");
            }
        });


        //Function for the select
        function getIt() {
            if (selection_fbs) {
                // Get all elements that can be selected
                $(".fbs_element").each(function () {
                    var p = $(this).offset();
                    // Calculate the center of every element, to save performance while calculating if the element is inside the selection rectangle
                    var xmiddle = p.left + $(this).width() / 2;
                    var ymiddle = (p.top ) + $(this).height() / 2;
                    if (matchPos(xmiddle, ymiddle)) {
                        // Colorize border, if element is inside the selection
//                        $(this).addClass("fbs_selected");
//                        $(this).addClass("jsplumb-drag-selected");
//                        alert(inst)
                        SGI.plumb_inst["inst_" + inst].addToDragSelection($(this))
                    }
                });
            }
        }

        function matchPos(xmiddle, ymiddle) {
            // If selection is done bottom up -> switch value
            var myX1;
            var myX2;
            var myY1;
            var myY2;

            if (x1 > x2) {
                myX1 = x2;
                myX2 = x1;
            } else {
                myX1 = x1;
                myX2 = x2;
            }
            if (y1 > y2) {
                myY1 = y2;
                myY2 = y1;
            } else {
                myY1 = y1;
                myY2 = y2;
            }
            // Matching
            if ((xmiddle > myX1) && (xmiddle < myX2)) {
                if ((ymiddle > myY1) && (ymiddle < myY2)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }


    },

    add_input: function (opt) {

        var id = $($(opt).attr("$trigger")).attr("id");
        var nr = $($(opt).attr("$trigger")).data("nr");
        var data = scope.fbs[nr];
        var type = id.split("_")[0];
        var index = $($("#" + id).find("[id^='left']")).children().length + 1;
        var add_id = type + '_' + nr + '_in' + index + '';

        scope.fbs[nr].input_n = parseInt(index);


        $($("#" + id).find("[id^='left']")).append('\
                <div id="' + add_id + '"  class="div_input ' + type + '_' + nr + '_in"><a class="input_font">IN ' + index + '</a></div>\
                ');

        SGI.add_fbs_endpoint(add_id, "input", data);
        SGI.plumb_inst["inst_" + $("#" + data.fbs_id).parent().parent().attr("id")].repaintEverything();
    },

    add_fbs_endpoint: function (_id, _type, data, _position) {

        var scope = data.scope;
        var parent = data.parent;
        var id = _id;
        var position = _position || "";
        var type = _type || "";
        var endpointStyle = {};
        var _stub = 30;

        var codebox = $("#" + parent).parent().attr("id");

        if (scope == "singel") {
            if (type == "input") {
                endpointStyle = {fillStyle: "green"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), {uuid: id.toString()}, {
                    anchor: [0, 0.5, -1, 0, 0, 0],
                    isTarget: true,
                    paintStyle: endpointStyle,
                    connector: ["Flowchart", {stub: _stub, alwaysRespectStubs: true, midpoint: 0.9}],
                    endpoint: ["Rectangle", {width: 20, height: 10}]
                });
            }
            if (type == "output") {
                endpointStyle = {fillStyle: "green"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), {uuid: id.toString()}, {
                    anchor: [1, 0.5, 1, 0, 0, 0],
                    isSource: true,
                    maxConnections: -1,
                    paintStyle: endpointStyle,
                    connector: ["Flowchart", {stub: _stub, alwaysRespectStubs: true, midpoint: 0.5}],
                    endpoint: ["Rectangle", {width: 20, height: 10}],
                    connectorStyle: {lineWidth: 4, strokeStyle: "#00aaff"}
                });
            }
            if (position == "onborder") {
                endpointStyle = {fillStyle: "#006600"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), {uuid: id.toString()}, {
                    isTarget: true,
                    paintStyle: endpointStyle,
                    cssClass: "ep_fbs_onborder",
                    connector: ["Flowchart", {stub: _stub, alwaysRespectStubs: true}],
                    endpoint: ["Rectangle", {width: 13, height: 13}]
                });
                SGI.plumb_inst["inst_" + codebox].repaintEverything();
            }
        }


        if (scope == "liste_ch") {

            if (type == "input") {
                endpointStyle = {fillStyle: "#660066"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), {uuid: id.toString()}, {
                    anchor: [0, 0.5, -1, 0, 0, 0],
                    isTarget: true,
                    paintStyle: endpointStyle,
                    connector: ["Flowchart", {stub: _stub, alwaysRespectStubs: true}],
                    endpoint: ["Rectangle", {width: 20, height: 10}],
                    scope: "liste_ch"
                });
            } else if (type == "output") {
                endpointStyle = {fillStyle: "#882288"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), {uuid: id.toString()}, {
                    anchor: [1, 0.5, 1, 0, 0, 0],
                    isSource: true,
                    maxConnections: -1,
                    paintStyle: endpointStyle,
                    connector: ["Flowchart", {stub: _stub, alwaysRespectStubs: true}],
                    endpoint: ["Rectangle", {width: 20, height: 10}],
                    connectorStyle: {lineWidth: 4, strokeStyle: "#0000ff"},
                    scope: "liste_ch"
                });
            }
        }
        if (scope == "liste_ch_dp") {
            if (position == "onborder") {
                endpointStyle = {fillStyle: "#ff99ff"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), {uuid: id.toString()}, {
                    isTarget: true,
                    paintStyle: endpointStyle,
                    cssClass: "ep_fbs_onborder",
                    connector: ["Flowchart", {stub: _stub, alwaysRespectStubs: true}],
                    endpoint: ["Rectangle", {width: 13, height: 13}],
                    scope: "liste_dp"
                });
            } else if (type == "input") {
                endpointStyle = {fillStyle: "#660066"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), {uuid: id.toString()}, {
                    anchor: [0, 0.5, -1, 0, 0, 0],
                    isTarget: true,
                    paintStyle: endpointStyle,
                    connector: ["Flowchart", {stub: _stub, alwaysRespectStubs: true}],
                    endpoint: ["Rectangle", {width: 20, height: 10}],
                    scope: "liste_ch"
                });
            } else if (type == "output") {
                endpointStyle = {fillStyle: "#ff99ff"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), {uuid: id.toString()}, {
                    anchor: [1, 0.5, 1, 0, 0, 0],
                    isSource: true,
                    maxConnections: -1,
                    paintStyle: endpointStyle,
                    connector: ["Flowchart", {stub: _stub, alwaysRespectStubs: true}],
                    endpoint: ["Rectangle", {width: 20, height: 10}],
                    connectorStyle: {lineWidth: 4, strokeStyle: "#0000ff"},
                    scope: "liste_dp"
                });
            }
        }
        if (scope == "liste_val") {

            if (type == "input") {
                endpointStyle = {fillStyle: "#ff77ff"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), {uuid: id.toString()}, {
                    anchor: ["Left"],
                    isTarget: true,
                    paintStyle: endpointStyle,
                    connector: ["Flowchart", {stub: _stub, alwaysRespectStubs: true}],
                    endpoint: ["Rectangle", {width: 20, height: 10}],
                    scope: "liste_dp"
                });
            }

            if (type == "output") {
                endpointStyle = {fillStyle: "green"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), {uuid: id.toString()}, {
                    anchor: ["Right"],
                    isSource: true,
                    maxConnections: -1,
                    paintStyle: endpointStyle,
                    connector: ["Flowchart", {stub: _stub, alwaysRespectStubs: true}],
                    endpoint: ["Rectangle", {width: 20, height: 10}],
                    connectorStyle: {lineWidth: 4, strokeStyle: "#00aaff"},
                    scope: "singel"
                });
            }
        }
        if (scope == "expert") {
            if (type == "input") {
                endpointStyle = {fillStyle: "gray"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), {uuid: id.toString()}, {
                    anchor: [0, 0.5, -1, 0, 0, 0],
                    isTarget: true,
                    paintStyle: endpointStyle,
                    connector: ["Flowchart", {stub: _stub, alwaysRespectStubs: true}],
                    endpoint: ["Rectangle", {width: 20, height: 11}],
                    scope: "singel liste_ch liste_dp liste_var expert"
                });
            }
            if (type == "output") {
                endpointStyle = {fillStyle: "gray"};
                SGI.plumb_inst["inst_" + codebox].addEndpoint(id.toString(), {uuid: id.toString()}, {
                    anchor: [1, 0.5, 1, 0, 0, 0],
                    isSource: true,
                    maxConnections: -1,
                    paintStyle: endpointStyle,
                    connector: ["Flowchart", {stub: _stub, alwaysRespectStubs: true}],
                    endpoint: ["Rectangle", {width: 20, height: 11}],
                    connectorStyle: {lineWidth: 4, strokeStyle: "gray"},
                    scope: "singel liste_ch liste_dp liste_var expert"
                });
            }
        }
    },

    add_mbs_endpoint: function (data) {
        var endpointStyle;

        if (data.type == "codebox") {
            endpointStyle = {fillStyle: "blue"};
            SGI.plumb_inst.inst_mbs.makeTarget(data.mbs_id, {
                //isTarget: true,
                paintStyle: endpointStyle,
                dropOptions: {hoverClass: "dragHover"},
                anchor: ["Continuous", {faces: ["top", "left", "right", "bottom"]}],
                endpoint: ["Dot", {radius: 2}],
                maxConnections: -1
            });

        } else if ($("#" + data.fbs_id).hasClass("fbs_element_onborder")) {

            endpointStyle = {fillStyle: "blue"};
            SGI.plumb_inst.inst_mbs.addEndpoint(data.fbs_id, {uuid: data.fbs_id}, {
//            filter:".ep",				// only supported by jquery
                anchor: "Center",
                isSource: true,
                paintStyle: endpointStyle,
                endpoint: ["Rectangle", {width: 13, height: 13}],
                connector: ["Flowchart", {stub: 25, alwaysRespectStubs: true}],
                cssClass: "ep_mbs_onborder",
                connectorStyle: {
                    strokeStyle: "#5c96bc",
                    lineWidth: 2,
                    outlineColor: "transparent",
                    outlineWidth: 4
                },
                maxConnections: -1
            });


        } else if (data.type == "brake" || data.type == "intervall" || data.type == "loop" || data.type.split("_")[0] == "block") {
            endpointStyle = {fillStyle: "blue"};
            SGI.plumb_inst.inst_mbs.addEndpoint(data.mbs_id + "_in1", {uuid: data.mbs_id + "_in1"}, {
                //dropOptions: { hoverClass: "dragHover" },
                anchor: ["Left"],
                isTarget: true,
                isSource: false,
                paintStyle: endpointStyle,
                endpoint: ["Rectangle", {width: 20, height: 10}]
            });
            if (data.type != "block_tt") {
                SGI.plumb_inst.inst_mbs.addEndpoint(data.mbs_id + "_in2", {uuid: data.mbs_id + "_in2"}, {
                    //dropOptions: { hoverClass: "dragHover" },
                    anchor: ["Left"],
                    isTarget: true,
                    isSource: false,
                    paintStyle: endpointStyle,
                    endpoint: ["Rectangle", {width: 20, height: 10}]
                });
            }
            SGI.plumb_inst.inst_mbs.addEndpoint(data.mbs_id + "_out", {uuid: data.mbs_id + "_out"}, {
                anchor: ["Right"],
                isSource: true,
                paintStyle: endpointStyle,
                endpoint: ["Dot", {radius: 10}],
                connector: ["Flowchart", {stub: 25, alwaysRespectStubs: true}],
                connectorStyle: {
                    strokeStyle: "#5c96bc",
                    lineWidth: 2,
                    outlineColor: "transparent",
                    outlineWidth: 4
                },
                maxConnections: -1
            });

        } else if (data.type != "komex" && data.type != "scriptobj" && data.type != "ccuobj" && data.type != "ccuobjpersi") {
            endpointStyle = {fillStyle: "blue"};
            SGI.plumb_inst.inst_mbs.addEndpoint(data.mbs_id, {uuid: data.mbs_id}, {
                anchor: ["Bottom", "Left", "Right", "Top"],
                isSource: true,
                paintStyle: endpointStyle,
                endpoint: ["Dot", {radius: 10}],
                connector: ["Flowchart", {stub: 25, alwaysRespectStubs: true}],
                connectorStyle: {
                    strokeStyle: "#5c96bc",
                    lineWidth: 2,
                    outlineColor: "transparent",
                    outlineWidth: 4
                },
                maxConnections: -1
            });

        }

        SGI.plumb_inst.inst_mbs.repaintEverything()
    },

    add_codebox_inst: function (id) {

        SGI.plumb_inst["inst_" + id] = jsPlumb.getInstance({
            Endpoint: ["Dot", {radius: 2}],
//            PaintStyle: { lineWidth: 4, strokeStyle: "blue" },
            HoverPaintStyle: {strokeStyle: "red", lineWidth: 4},
            DropOptions: {tolerance: "touch"},
            Container: id,
            RenderMode: "svg",
            Scope: "singel",
            connector: ["Flowchart", {stub: 50, alwaysRespectStubs: true, midpoint: 0.5}]
            //connector: ["Flowchart", {stub: 50, alwaysRespectStubs: true, midpoint: 0.5}]


        });

        scope.con.fbs[id] = {};
        scope.$apply();
        var fbs_dot = false;

        SGI.plumb_inst["inst_" + id].bind("click", function (c, p) {

            var connector_data;
            var dot1_x;
            var dot1_y;
            var dot2_x;
            var dot2_y;
            var dot3_x;
            var dot3_y;
            var dot1_old_posi;
            var dot3_old_posi;
            var dot2_old_posi;
            var dot2_d;
            var svg_w;
            var svg_h;
            var dot_start;
            var old_midpoint;
            var old_stub;


            function make_dot() {
                var connector_data = scope.con.fbs[id][c.id].connector;
                var svg_posi = $(c.connector.svg).position();
                var prg_posi = $(c.connector.svg).parent().offset();
                var path = c.connector.getPath();
                var svg_trans = $(c.connector.svg).children().first()[0].getAttribute("transform").replace("translate(", "").replace(")", "").split(",");
                dot1_x = svg_posi.left + path[0].end[0] + parseInt(svg_trans[0]) - 8;
                dot1_y = svg_posi.top + path[0].end[1] + parseInt(svg_trans[1]) - 8;


                if (path.length == 5) {
                    dot2_x = svg_posi.left + path[3].start[0] + parseInt(svg_trans[0]) + Math.abs((path[2].start[0] - path[2].end[0]) / 2) - 8;
                    dot2_y = svg_posi.top + path[2].start[1] - parseInt(svg_trans[1]) + Math.abs((path[3].start[1] - path[2].start[1]) / 2) + 8;
                    dot2_d = "y";
                    dot3_x = svg_posi.left + path[path.length - 1].start[0] + parseInt(svg_trans[0]) - 8;
                    dot3_y = svg_posi.top + path[path.length - 1].end[1] - parseInt(svg_trans[1]) + 4;

                    $(".dot").remove();
                    $(c.connector.svg).parent().append('<div id="dot1" class="dot" style="left:' + dot1_x + 'px;top: ' + dot1_y + 'px  "></div>');
                    $(c.connector.svg).parent().append('<div id="dot2" class="dot" style="left:' + dot2_x + 'px;top: ' + dot2_y + 'px  "></div>');
                    $(c.connector.svg).parent().append('<div id="dot3" class="dot" style="left:' + dot3_x + 'px;top: ' + dot3_y + 'px  "></div>');
                    dot1_drag();
                    dot2_drag();
                    dot3_drag();
                }
                if (path.length == 3 && path[2].start[0] < path[2].end[0] && path[1].start[1] < path[1].end[1]) {
                    dot2_x = svg_posi.left + path[1].start[0] - parseInt(svg_trans[0]) - Math.abs((path[2].start[0] - path[2].start[0]) / 2) + 8;
                    dot2_y = svg_posi.top + path[1].start[1] - parseInt(svg_trans[1]) + Math.abs((path[2].start[1] - path[1].start[1]) / 2) + 8;
                    dot3_x = svg_posi.left + path[path.length - 1].end[0] + parseInt(svg_trans[0]) - 8;
                    dot3_y = svg_posi.top + path[path.length - 1].end[1] - parseInt(svg_trans[1]) + 8;

                    $(".dot").remove();
                    $(c.connector.svg).parent().append('<div id="dot1" class="dot" style="left:' + dot1_x + 'px;top: ' + dot1_y + 'px  "></div>');
                    $(c.connector.svg).parent().append('<div id="dot2" class="dot" style="left:' + dot2_x + 'px;top: ' + dot2_y + 'px  "></div>');
                    $(c.connector.svg).parent().append('<div id="dot3" class="dot" style="left:' + dot3_x + 'px;top: ' + dot3_y + 'px  "></div>');
                    dot1_drag();
                    dot2_drag();
                    dot3_drag();
                }
                if (path.length == 3 && path[2].start[0] < path[2].end[0] && path[1].start[1] > path[1].end[1]) {
                    dot2_x = svg_posi.left + path[1].start[0] - parseInt(svg_trans[0]) - Math.abs((path[2].start[0] - path[2].start[0]) / 2) + 8;
                    dot2_y = svg_posi.top + path[1].start[1] - parseInt(svg_trans[1]) - Math.abs((path[2].start[1] - path[1].start[1]) / 2) + 8;
                    dot3_x = svg_posi.left + path[path.length - 1].end[0] + parseInt(svg_trans[0]) - 8;
                    dot3_y = svg_posi.top + path[path.length - 1].end[1] - parseInt(svg_trans[1]) + 8;

                    $(".dot").remove();
                    $(c.connector.svg).parent().append('<div id="dot1" class="dot" style="left:' + dot1_x + 'px;top: ' + dot1_y + 'px  "></div>');
                    $(c.connector.svg).parent().append('<div id="dot2" class="dot" style="left:' + dot2_x + 'px;top: ' + dot2_y + 'px  "></div>');
                    $(c.connector.svg).parent().append('<div id="dot3" class="dot" style="left:' + dot3_x + 'px;top: ' + dot3_y + 'px  "></div>');
                    dot1_drag();
                    dot2_drag();
                    dot3_drag();
                }
                if (path.length == 3 && path[2].start[0] > path[2].end[0]) {
                    $(".dot").remove();
                    $("#prg_panel").append('<div id="dot1" class="dot" style="left:' + dot1_x + 'px;top: ' + dot1_y + 'px  "></div>');
                    dot1_drag()
                }
                if (path.length == 4) {
                    dot2_x = svg_posi.left + path[1].start[0] + parseInt(svg_trans[0]) - Math.abs((path[1].start[0] - path[1].end[0]) / 2) - 8;
                    dot2_y = svg_posi.top + path[1].start[1] - parseInt(svg_trans[1]) + Math.abs((path[1].start[1] - path[1].start[1]) / 2) + 1;
                    dot2_d = "y";
                    $(".dot").remove();
                    $(c.connector.svg).parent().append('<div id="dot2" class="dot" style="left:' + dot2_x + 'px;top: ' + dot2_y + 'px  "></div>');
                    dot2_drag()

                }


                function dot1_drag() {

                    $("#dot1").draggable({
                        axis: "x",
                        containment: $(c.connector.svg).parent(),
                        start: function (e, ui) {


                            dot_start = ui.position;
//                            connector_data = scope.con.fbs[id].connector;
                            old_stub = connector_data.stub.slice();

                            $("#dot2, #dot3").remove()

                        },
                        drag: function (e, ui) {
                            var dif_x = ui.position.left - dot_start.left;


                            var new_stub = parseInt(old_stub[0]) + dif_x;
                            if (new_stub < 30) {
                                new_stub = 30;
                                ui.position = dot1_old_posi;
                            } else {
                                dot1_old_posi = ui.position
                            }
                            connector_data.stub[0] = new_stub;


                            c.setConnector(["Flowchart", {
                                stub: connector_data.stub,
                                alwaysRespectStubs: true,
                                midpoint: connector_data.midpoint
                            }]);
                            dot1_x = svg_posi.left + path[0].end[0] + parseInt(svg_trans[0]);
                        },
                        stop: function () {
                            scope.con.fbs[id].connector = connector_data;
                            scope.$apply();
                            make_dot();
                        }
                    });
                }

                function dot2_drag() {
                    $("#dot2").draggable({
                        axis: dot2_d,
//                        containment: $(c.connector.svg).parent(),
                        start: function (e, ui) {
                            $("#dot1, #dot3").remove();
//                            connector_data = scope.con.fbs[id].connector;
                            svg_w = parseInt(c.connector.bounds.maxX - (connector_data.stub[0] + connector_data.stub[1]));
                            svg_h = parseInt(c.connector.bounds.maxY);
                            dot_start = ui.position;
                            old_midpoint = parseFloat(connector_data.midpoint);

                            if (path.length == 4) {
                                svg_h = parseInt(c.connector.bounds.maxY - (connector_data.stub[0]));
                            }

                            if (path.length == 5) {
                                if (path[2].start[0] == path[2].end[0]) {
                                    dot2_d = "x";
                                    $("#dot2").draggable("option", "axis", "x");
                                } else {
                                    dot2_d = "y";
                                    $("#dot2").draggable("option", "axis", "y");
                                }

                            }
                            if (path.length == 3) {
                                if (path[1].start[0] == path[1].end[0]) {
                                    dot2_d = "x";
                                    $("#dot2").draggable("option", "axis", "x");
                                } else {
                                    dot2_d = "y";
                                    $("#dot2").draggable("option", "axis", "y");
                                }
                            }
                        },
                        drag: function (e, ui) {
                            var new_midpoint;
                            var dif_x = ui.position.left - dot_start.left;
                            var dif_y = ui.position.top - dot_start.top;
                            path = c.connector.getPath();

                            if (dot2_d == "x") {
                                new_midpoint = Math.round((1 / svg_w * (svg_w * old_midpoint + dif_x)) * 100) / 100;

                            } else {
                                if (path[1].start[1] < path[1].end[1] || path[0].start[1] < path[0].end[1]) {
                                    new_midpoint = Math.round((1 / svg_h * (svg_h * old_midpoint + dif_y)) * 100) / 100;
                                } else {
                                    new_midpoint = Math.round((1 / svg_h * (svg_h * old_midpoint - dif_y)) * 100) / 100;
                                }
                            }

                            if (new_midpoint > 0.98 || new_midpoint < 0.02) {

                                if (new_midpoint > 0.98) {
                                    new_midpoint = 0.98;
                                    if (path.length == 5) {
                                        ui.position.left = svg_posi.left + path[2].start[0] + parseInt(svg_trans[0]) - Math.abs((path[3].start[0] - path[2].start[0]) / 2) - 8;
                                        ui.position.top = svg_posi.top + path[2].start[1] + parseInt(svg_trans[1]) + Math.abs((path[3].start[1] - path[2].start[1]) / 2) - 8;
                                    } else if (path.length == 4) {
                                        ui.position.left = dot2_x = svg_posi.left + path[1].start[0] + parseInt(svg_trans[0]) - Math.abs((path[1].start[0] - path[1].end[0]) / 2) - 8;
                                        ui.position.top = dot2_y = svg_posi.top + path[1].start[1] - parseInt(svg_trans[1]) + Math.abs((path[1].start[1] - path[1].start[1]) / 2) + 1;
                                    } else {
                                        ui.position.left = svg_posi.left + path[1].start[0] - parseInt(svg_trans[0]) - Math.abs((path[2].start[0] - path[2].start[0]) / 2) + 8;
                                        ui.position.top = svg_posi.top + path[1].start[1] - parseInt(svg_trans[1]) + Math.abs((path[2].start[1] - path[1].start[1]) / 2) + 8;
                                    }
                                }

                                if (new_midpoint < 0.02) {
                                    new_midpoint = 0.02;
                                    if (path.length == 5) {
                                        ui.position.left = svg_posi.left + path[2].start[0] + parseInt(svg_trans[0]) - Math.abs((path[3].start[0] - path[2].start[0]) / 2) - 8;
                                        ui.position.top = svg_posi.top + path[2].start[1] + parseInt(svg_trans[1]) + Math.abs((path[3].start[1] - path[2].start[1]) / 2) - 8;
                                    } else if (path.length == 4) {
                                        ui.position.left = dot2_x = svg_posi.left + path[1].start[0] + parseInt(svg_trans[0]) - Math.abs((path[1].start[0] - path[1].end[0]) / 2) - 8;
                                        ui.position.top = dot2_y = svg_posi.top + path[1].start[1] - parseInt(svg_trans[1]) + Math.abs((path[1].start[1] - path[1].start[1]) / 2) + 1;
                                    } else {
                                        ui.position.left = svg_posi.left + path[1].start[0] - parseInt(svg_trans[0]) - Math.abs((path[2].start[0] - path[2].start[0]) / 2) + 8;
                                        ui.position.top = svg_posi.top + path[1].start[1] - parseInt(svg_trans[1]) + Math.abs((path[2].start[1] - path[1].start[1]) / 2) + 8;
                                    }
                                }
                            } else {
                                dot2_old_posi = ui.position
                            }

                            connector_data.midpoint = new_midpoint;
                            c.setConnector(["Flowchart", {
                                stub: connector_data.stub,
                                alwaysRespectStubs: true,
                                midpoint: connector_data.midpoint
                            }]);
                        },
                        stop: function () {
                            scope.con.fbs[id].connector = connector_data;
                            scope.$apply();
                            make_dot();
                        }

                    });
                }

                function dot3_drag() {
                    $("#dot3").draggable({
                        axis: "x",
                        containment: $(c.connector.svg).parent(),
                        start: function (e, ui) {

                            dot_start = ui.position;
//                            connector_data = scope.con.fbs[id].connector;
                            old_stub = connector_data.stub.slice();

                            $("#dot1, #dot2").remove()
                        },
                        drag: function (e, ui) {
                            var dif_x;
                            var new_stub;
                            if (path[path.length - 1].start[0] < path[path.length - 1].end[0]) {
                                dif_x = ui.position.left - dot_start.left;
                                new_stub = parseInt(old_stub[1]) - dif_x;
                                if (new_stub < 30) {
                                    new_stub = 30;
                                    ui.position = dot3_old_posi;
                                } else {
                                    dot3_old_posi = ui.position
                                }
                                connector_data.stub[1] = new_stub;
                                c.setConnector(["Flowchart", {
                                    stub: connector_data.stub,
                                    alwaysRespectStubs: true,
                                    midpoint: connector_data.midpoint
                                }]);
                                dot2_x = svg_posi.left + path[0].end[0] + parseInt(svg_trans[0]);
                            } else {
                                dif_x = ui.position.left - dot_start.left;
                                new_stub = parseInt(old_stub[1]) + dif_x;
                                if (new_stub < 30) {
                                    new_stub = 30;
                                    ui.position = dot3_old_posi;
                                } else {
                                    dot3_old_posi = ui.position
                                }
                                connector_data.stub[1] = new_stub;
                                c.setConnector(["Flowchart", {
                                    stub: connector_data.stub,
                                    alwaysRespectStubs: true,
                                    midpoint: connector_data.midpoint
                                }]);
                                dot2_x = svg_posi.left + path[0].end[0] + parseInt(svg_trans[0]);
                            }
                        },
                        stop: function () {
                            scope.con.fbs[id].connector = connector_data;
                            scope.$apply();
                            make_dot();
                        }
                    });
                }
            }

            setTimeout(function () {
                if (scope.con.fbs[id][c.id]) {
                    make_dot();
                }
            }, 300)


        });

        SGI.plumb_inst["inst_" + id].bind("dblclick", function (c) {

            if (SGI.klick.target.tagName == "path") {
                $(".dot").remove();
                SGI.plumb_inst["inst_" + id].detach(c);
            }

        });

        SGI.plumb_inst["inst_" + id].bind("connection", function (c) {

            var fbs_in = c.targetId.split("_in")[0];
            var fbs_out = c.sourceId.split("_out")[0];

            scope.fbs[$("#" + fbs_in).data("nr")].input[c.targetId.split("_")[2]] = c.sourceId;
            scope.fbs[$("#" + fbs_out).data("nr")].output[c.sourceId.split("_")[2]] = c.targetId;


            scope.con.fbs[id][c.connection.id] = {
                pageSourceId: c.connection.sourceId,
                pageTargetId: c.connection.targetId,
                connector: {
                    stub: [30, 30],
                    midpoint: 0.5
                }
            };

            scope.$apply()
        });

        SGI.plumb_inst["inst_" + id].bind("contextmenu", function (c) {
            SGI.con = c;
        });

        SGI.plumb_inst["inst_" + id].bind("connectionDetached", function (c) {
            var fbs_in = c.connection.targetId.split("_in")[0];
            var fbs_out = c.connection.sourceId.split("_out")[0];
            delete scope.con.fbs[id][c.connection.id];
            delete scope.fbs[$("#" + fbs_in).data("nr")].input[c.connection.targetId.split("_")[2]];
            delete scope.fbs[$("#" + fbs_out).data("nr")].output[c.connection.sourceId.split("_")[2]];
            scope.$apply();
        });

    },

    add_trigger_oid: function (_this, type, type2) {
        var $this = _this;

        $('#select_oid').selectId('show',{
                common: {
                    //custom: instance
                }
            },
            function (newId, ignore, obj) {
                var _name = obj.common.name;
                var nr = $($this).data("nr");
                scope.mbs[nr]["oid"].push(newId.toString());
                if (scope.mbs[nr]["name"][0] == "Rechtsklick") {
                    scope.mbs[nr]["name"][0] = _name;
                } else {
                    scope.mbs[nr]["name"].push(_name);
                }
                if (type2 == "val") {
                    SGI.add_trigger_name_val($this);
                } else {
                    // singel Trigger
                    SGI.add_trigger_name($this);
                }
                scope.$apply();
                SGI.plumb_inst.inst_mbs.repaintEverything()
            });
    },

    add_trigger_name: function ($this) {
        $($this).find(".div_oid_font").remove();

        $.each(scope.mbs[$this.data("nr")]["name"], function () {

            var add = '<div data-info="' + $this.attr("id") + '" class="div_oid_font">' + this + '</div>';

            $($this).find(".div_oid_trigger").append(add)

        });
    },

    add_filter_device: function (_this) {

        var $this = _this;


        $('#select_oid').selectId('show',{
                common: {
                    //custom: instance
                }
            },
            function (newId, ignore, obj) {
                if (newId != null) {

                    scope.fbs[$this.data("nr")]["oid"].push(newId);
                    SGI.add_filter_device_name($this)
                }
            });



    },

    add_filter_channel: function (_this) {

        var $this = _this;

        $.id_select({
            type: "channel",
            close: function (oid) {

                if (oid != null) {

                    scope.fbs[$this.data("nr")]["oid"].push(oid);
                    SGI.add_filter_channel_name($this)
                }
            }
        });


    },

    add_filter_dp: function (_this) {

        var $this = _this;

        $.id_select({
            type: "dp",
            close: function (oid) {

                if (oid != null) {

                    scope.fbs[$this.data("nr")]["oid"].push(oid);
                    SGI.add_filter_dp_name($this)
                }
            }
        });


    },

    add_filter_device_name: function ($this) {
        var add = "";
        var nr = $($this).data("nr");

        $($this).find(".div_oid_filter_font_device").remove();
        if (scope.fbs[nr]["oid"].length > 0) {

            $.each(scope.fbs[nr]["oid"], function () {
                var name = this;
                add += '<div data-info="' + $($this).attr("id") + '" class="div_oid_filter_font_device">' + name + '</div>';

            });
        } else {
            add += '<div data-info="' + $($this).attr("id") + '" class="div_oid_filter_font_device">Rechtsklick</div>';
        }

        $($this).find(".div_oid_filter").append(add);

        SGI.plumb_inst["inst_" + $($this).parent().parent().attr("id")].repaintEverything();
    },

    add_filter_channel_name: function ($this) {
        var add = "";
        var nr = $($this).data("nr");

        $($this).find(".div_oid_filter_font_channel").remove();
        if (scope.fbs[nr]["oid"].length > 0) {

            $.each(scope.fbs[nr]["oid"], function () {
                var name = this;
                add += '<div data-info="' + $($this).attr("id") + '" class="div_oid_filter_font_channel">' + name + '</div>';
            });
        } else {
            add += '<div data-info="' + $($this).attr("id") + '" class="div_oid_filter_font_channel">Rechtsklick</div>';
        }

        $($this).find(".div_oid_filter").append(add);

        SGI.plumb_inst["inst_" + $($this).parent().parent().attr("id")].repaintEverything();
    },

    add_filter_dp_name: function ($this) {
        var add = "";

        $($this).find(".div_oid_filter_font_dp").remove();
        if (scope.fbs[$($this).data("nr")]["oid"].length > 0) {

            $.each(scope.fbs[$($this).data("nr")]["oid"], function () {
                var name = this;
                add += '<div data-info="' + $($this).attr("id") + '" class="div_oid_filter_font_dp">' + name + '</div>';

            });
        } else {
            add += '<div data-info="' + $($this).attr("id") + '" class="div_oid_filter_font_dp">Rechtsklick</div>';
        }

        $($this).find(".div_oid_filter").append(add);

        SGI.plumb_inst["inst_" + $($this).parent().parent().attr("id")].repaintEverything();
    },

    add_trigger_name_val: function ($this) {
        $($this).find(".div_oid_val_body").remove();
        var nr = $($this).data("nr");
        var add = "";
        $.each(scope.mbs[nr].name, function (index) {

            var wert = scope.mbs[nr]["wert"][index] || 0;

            add += '<div style="min-width: 100%" class="div_oid_val_body">';
            add += '<div data-info="' + $this.attr("id") + '"  style="display:inline-block;float: left;" class="div_oid_val">{{mbs[' + nr + '].name[' + index + '].toString()}}</div>';
            add += '<div style="float: right; margin-left:5px; display: inline-block; position: relative;z-index: 2">';
            add += '<select  id="val_' + index + '" ng-model="mbs[' + nr + '].val[' + index + ']" class="inp_val">';
            add += '    <option value="val">Gleich</option>';
            add += '    <option value="valNe">Ungleich</option>';
            add += '    <option value="valGt">Gr��er</option>';
            add += '    <option value="valGe">Gr��er =</option>';
            add += '    <option value="valLt">Kleiner</option>';
            add += '    <option value="valLe">Kleiner =</option>';
            add += '</select>';

            add += '<input class="inp_wert"  type=int ng-model="mbs[' + nr + '].wert[' + index + ']" id="var_' + index + '">';
            add += '</div>';
            add += '</div>';
        });

        scope.append($($this).find(".div_oid_trigger"), add);


//        $('.inp_time').numberMask({type: 'float', beforePoint: 2, afterPoint: 2, decimalMark: ':'});


    },

    add_trigger_time: function ($this) {
        $($this).find(".div_oid_font").remove();
        var nr = $($this).data("nr");
        var add = "";

        $.each(scope.mbs[nr]["time"], function (index) {

            add += '<div id="tr_ch_body_' + index + '" class="tr_ch_body">';
            add += '<input class="inp_time" ng-model="mbs[' + nr + '].time[' + index + ']" id="var_' + index + '">';
            add += '<select id="day_' + index + '" ng-model="mbs[' + nr + '].day[' + index + ']" class="inp_day">';
            add += '    <option value="88">*</option>';
            add += '    <option value="1">Mo</option>';
            add += '    <option value="2">Di</option>';
            add += '    <option value="3">Mi</option>';
            add += '    <option value="4">Do</option>';
            add += '    <option value="5">Fr</option>';
            add += '    <option value="6">Sa</option>';
            add += '    <option value="7">So</option>';
            add += '    <option value="8">MO-FR</option>';
            add += '    <option value="9">SA-SO</option>';
            add += '</select>';
            add += '</div>';
        });
        scope.append($($this).find(".div_oid_trigger"), add);

    },

    add_trigger_astro: function ($this) {
        $($this).find(".tr_ch_body").remove();
        var add = "";
        $.each(scope.mbs[$($this).data("nr")]["astro"], function (index) {
            add += '<div id="tr_ch_body_' + index + '" class="tr_ch_body">';
            add += '<select ng-model="mbs[' + $this.data("nr") + '].astro[' + index + ']" id="astro_' + index + '" class="inp_astro">';
            add += '    <option value="sunrise">Sonnenaufgang Start</option>';
            add += '    <option value="sunriseEnd">Sonnenaufgang Ende</option>';
            add += '    <option value="solarNoon">H�chster Sonnenstand</option>';
            add += '    <option value="sunsetStart">Sonnenuntergang Start</option>';
            add += '    <option value="sunset">Sonnenuntergang Ende</option>';
            add += '    <option value="night">Nacht Start</option>';
            add += '    <option value="nightEnd">Nacht Ende</option>';
            add += '    <option value="nadir">Dunkelster moment</option>';
            add += '</select>';
            add += '<label style="display:flex ;margin-left:10px; color: #676767; font-size: 13px">Shift:</label></label><input class="inp_min" type=int  ng-model="mbs[' + $this.data("nr") + '].minuten[' + index + ']" id="var_' + index + '"><br>';
            add += '</div>';
        });

        scope.append($($this).find(".div_oid_trigger"), add);

//      $('.inp_time').numberMask({type: 'float', beforePoint: 2, afterPoint: 2, decimalMark: ':'});

    },

    make_fbs_drag: function (data) {
        var $div = $("#" + data.parent);
        var ep_mbs = [];
        var ep_fbs = [];
        var codebox_w = "";
        var codebox_h = "";

        var $this_height = "";
        var $this_width = "";
        var $this = "";

        SGI.plumb_inst["inst_" + $($div).parent().attr("id")].draggable($("#" + data.fbs_id), {
                containment: "parent",
                start: function (params) {
                    codebox_h = $(params.el).parent().parent().height();
                    codebox_w = $(params.el).parent().parent().width();
                    ep_mbs = SGI.plumb_inst.inst_mbs.getEndpoint($(params.el).attr("id"));
                    ep_fbs = SGI.plumb_inst["inst_" + $("#" + data.parent).parent().attr("id")].getEndpoint(data.fbs_id);
                    $this_height = $(params.el).height();
                    $this_width = $(params.el).width();
                },
                drag: function (params) {

                    if ($(params.el).hasClass("fbs_element_onborder")) {
                        var $this_left = params.pos[0];
                        var $this_right = codebox_w - params.pos[0] - $this_width;
                        var $this_top = params.pos[1];
                        var $this_bottom = codebox_h - params.pos[1] - $this_height;

                        if ($this_left < $this_top && $this_left < $this_bottom && $this_left < $this_right) {
                            $(params.el).css({left: "-28px", right: "auto", bottom: "auto"});
                            ep_mbs.setAnchor("Left");
                            if (ep_fbs) {
                                ep_fbs.setAnchor("Right");
                                ep_fbs.repaint();
                            }
                        } else if ($this_right < $this_left && $this_right < $this_top && $this_right < $this_bottom) {
                            $(params.el).css({left: "auto", right: "-28px", bottom: "auto"});
                            ep_mbs.setAnchor("Right");
                            if (ep_fbs) {
                                ep_fbs.setAnchor("Left");
                                ep_fbs.repaint();
                            }
                        } else if ($this_top < (codebox_h / 2)) {
                            $(params.el).css({top: "-13px", bottom: "auto", right: "auto"});
                            ep_mbs.setAnchor("Top");
                            if (ep_fbs) {
                                ep_fbs.setAnchor("Bottom");
                                ep_fbs.repaint();
                            }
                        } else if ($this_top > (codebox_h / 2)) {
                            $(params.el).css({top: "auto", bottom: "-13px", right: "auto"});
                            ep_mbs.setAnchor("Bottom");
                            if (ep_fbs) {
                                ep_fbs.setAnchor("Top");
                                ep_fbs.repaint();
                            }
                        }

                        //todo not Everything
                        SGI.plumb_inst["inst_" + $(params.el).parent().parent().attr("id")].repaintEverything();

                        SGI.plumb_inst.inst_mbs.repaintEverything();

//                            ep_mbs.repaint();
//                            ep_fbs.repaint();
                    }


                },
                stop: function (params) {

                    var nr = $(params.el).data("nr");
                    scope.fbs[nr].style.top = $(params.el).position().top / SGI.zoom + "px";
                    scope.fbs[nr].style.left = $(params.el).position().left / SGI.zoom + "px";

                    scope.$apply();

                    //todo not Everything
                    SGI.plumb_inst["inst_" + $(params.el).parent().parent().attr("id")].repaintEverything();
                    SGI.plumb_inst.inst_mbs.repaintEverything();


//                        if ($.isArray(ep_fbs) == true) {
//                            SGI.plumb_inst["inst_" + $($div).parent().attr("id")].repaint(ep_fbs);
//                        } else {
//                            SGI.plumb_inst["inst_" + $($div).parent().attr("id")].repaint($(this).attr("id"));
//                        }

//                        SGI.plumb_inst["inst_" + $(params.el).parent().parent().attr("id")].repaintEverything();
                }
            }
        );


    },

    make_mbs_drag: function (data) {

        if (data.type == "codebox") {
            SGI.plumb_inst.inst_mbs.draggable($("#" + data.mbs_id).find(".titel_body"), {
                containment: "parent",
                start: function () {
                    $(".dot").remove();
                },
                drag: function (params) {
                    if ($(params.el).hasClass("titel_body")) {
                        var pos = $(params.el).parent().position();
                        $(params.el).parent().css({
                            left: pos.left + params.e.movementX + "px",
                            top: pos.top + params.e.movementY + "px"
                        });
                        SGI.plumb_inst.inst_mbs.repaintEverything();
                    }
                },
                stop: function (params) {
                    var nr = $(params.el).data("nr");
                    scope.mbs[nr].style.top = $(params.el).parent().css("top");
                    scope.mbs[nr].style.left = $(params.el).parent().css("left");
                    SGI.plumb_inst.inst_mbs.repaintEverything();
                    scope.$apply();
                }
            });
        } else {
            SGI.plumb_inst.inst_mbs.draggable($("#" + data.mbs_id), {
                containment: "parent",

                start: function () {
                    $(".dot").remove();

                },
                drag: function (params) {

                },
                stop: function (params) {
                    var nr = $(params.el).data("nr");
                    scope.mbs[nr].style.top = $(params.el).css("top");
                    scope.mbs[nr].style.left = $(params.el).css("left");
                    scope.$apply();
                }
            });
        }
    },

    make_mbs_drop: function () {

        $(".prg_codebox").droppable({
            accept: ".fbs",
            tolerance: "pointer",
            drop: function (ev, ui) {
                var data;
                var top;
                var left;
                SGI.drop_block = true;
                setTimeout(function () {
                    SGI.drop_block = false;
                }, 500);
                if (ui["draggable"].hasClass("fbs_exp_custom")) {
                    if (scope.setup.snap_grid) {

                        data = {
                            parent: $(ev.target).attr("id"),
                            type: $(ui["draggable"][0]).attr("id")

                        };
                        top = Math.round(((ui["offset"]["top"] - $(ev.target).offset().top + 30) / SGI.zoom) / SGI.grid) * SGI.grid;
                        left = Math.round(((ui["offset"]["left"] - $(ev.target).offset().left + 0) / SGI.zoom) / SGI.grid) * SGI.grid;
                    } else {
                        data = {
                            parent: $(ev.target).attr("id"),
                            type: $(ui["draggable"][0]).attr("id")

                        };
                        top = parseInt(((ui["offset"]["top"] - $(ev.target).offset().top) + 30) / SGI.zoom);
                        left = parseInt(((ui["offset"]["left"] - $(ev.target).offset().left) + 0) / SGI.zoom);
                    }

                    SGI.add_fbs_element(data, left, top);
                } else {

                    if (scope.setup.snap_grid) {

                        data = {
                            parent: $(ev.target).attr("id"),
                            type: $(ui["draggable"][0]).attr("id")
                        };
                        top = Math.round(((ui["offset"]["top"] - $(ev.target).offset().top + 30) / SGI.zoom) / SGI.grid) * SGI.grid;
                        left = Math.round(((ui["offset"]["left"] - $(ev.target).offset().left + 40) / SGI.zoom) / SGI.grid) * SGI.grid;
                    } else {
                        data = {
                            parent: $(ev.target).attr("id"),
                            type: $(ui["draggable"][0]).attr("id")
                        };
                        top = parseInt(((ui["offset"]["top"] - $(ev.target).offset().top) + 30) / SGI.zoom);
                        left = parseInt(((ui["offset"]["left"] - $(ev.target).offset().left) + 40) / SGI.zoom);
                    }

                    SGI.add_fbs_element(data, left, top);
                }
            }
        });
    },

    make_savedata: function () {
        return {
            version: SGI.version,
            mbs: scope.mbs,
            fbs: scope.fbs,
            con: scope.con
        };
    },

    make_struc: function () {

        PRG.struck.codebox = {};
        PRG.struck.trigger = [];
        PRG.struck.control = [];

        PRG._scope = SGI.make_savedata();

        $("#prg_panel .mbs_element_codebox ").each(function (idx, elem) {
            var $this = $(elem);
            var fbs = $($this).find(".fbs_element");
            var data = {};
            var ebene = 99999;
            var onborder = [];
            Compiler.last_fbs = $(fbs).attr("id");
            $.each(fbs, function (idx, elem) {
                var $this = $(elem);
                var nr = $this.data("nr");
                var fbs_id = $this.attr('id');
                var input = scope.fbs[nr]["input"];
                var output = scope.fbs[nr]["output"];

                data[fbs_id.split("_")[1]] = {
                    ebene: 99999,
                    fbs_id: fbs_id,
                    type: scope.fbs[nr]["type"],
                    oid: scope.fbs[nr]["oid"],
                    positionX: parseInt($this.css("left"), 10),
                    positionY: parseInt($this.css("top"), 10),
                    nr: nr,
                    input: input,
                    output: output,
                    force: scope.fbs[nr]["force"]
                }
            });


            for (var i = 0; i < 2; i++) {

                $.each(data, function () {
                    if (ebene == this.ebene) {

                        $.each(this["input"], function () {
                            var fbs_befor = this.split("_")[1];
                            data[fbs_befor].ebene = ebene - 1
                        });
                        i = 0
                    }
                });
                ebene--;
                if (ebene == 0) {
                    throw "ebene"
                }
            }

            $.each(data, function () {
                if (jQuery.isEmptyObject(this.input)) {
                    this.ebene = 1;
                }
            });

            $.each(data, function () {
                if ($("#" + this.fbs_id).hasClass("fbs_element_onborder")) {
                    onborder.push({"id": this.fbs_id, left: this.positionX})
                }
            });

            function SortByLeft(a, b) {
                var aName = a.left;
                var bName = b.left;
                return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
            }

            function SortByEbene(a, b) {
                var aName = a.ebene;
                var bName = b.ebene;
                return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
            }

            onborder.sort(SortByLeft);

            ebene = 100001;
            $.each(onborder, function () {
                var id = this.id.split("_")[1];
                data[id].ebene = ebene;
                ebene++
            });

            var sortable = [];
            for (var x in data) {
                sortable.push({
                    ebene: data[x].ebene,
                    fbs_id: data[x].fbs_id,
                    type: data[x].type,
                    oid: data[x].oid,
                    positionX: data[x].positionX,
                    positionY: data[x].positionY,
                    in: data[x].input,
                    out: data[x].output,
                    force: data[x].force
                });
            }

            sortable.sort(SortByEbene);
            PRG.struck.codebox[$($this).attr("id")] = [sortable];
        });
        $("#prg_panel .mbs_element_trigger ").each(function (idx, elem) {
            var $this = $(elem);
            PRG.struck.trigger[idx] = {
                mbs_id: $this.attr('id')
            };
        });
        $("#prg_panel .mbs_element_control ").each(function (idx, elem) {
            var $this = $(elem);
            PRG.struck.control[idx] = {
                mbs_id: $this.attr('id')
            };
        });
        $.each(PRG.struck.codebox, function (idx) {
            var $codebox = idx;

            $.each(this[0], function () {
                var id = this["fbs_id"];
                var input = [];
                var output = [];
                var target = [];

                if ($("#" + id).hasClass("fbs_element_onborder")) {
                    $.each(PRG._scope.con.mbs, function () {

                        if (this.pageSourceId == id) {
                            target.push([this.pageTargetId]);
                        }

                    });
                    $.each(PRG._scope.con.fbs[$codebox], function () {
                        var _input = this["pageTargetId"].split("_");
                        var input_name = (_input[0] + "_" + _input[1]);

                        if (input_name == id) {
                            var add = {
                                "eingang": this["pageTargetId"],
                                "herkunft": this.pageSourceId
                            };

                            input.push(add);
                        }
                    });
                } else {

                    $.each(PRG._scope.con.fbs[$codebox], function () {

                        var _input = this["pageTargetId"].split("_");
                        var input_name = (_input[0] + "_" + _input[1]);
                        var _output = this["pageSourceId"].split("_");
                        var output_name = (_output[0] + "_" + _output[1]);

                        if (input_name == id) {
                            var add = {
                                "eingang": _input[2],
                                "herkunft": this.pageSourceId
                            };
                            input.push(add);
                        }

                        if (output_name == id) {
                            add = {
                                ausgang: this.pageSourceId
                            };
                            output.push(add)
                        }
                    });
                }
                this["target"] = target;
                this["input"] = input;
                this["output"] = output;
            });
        });
        $.each(PRG.struck.trigger, function () {

            var $this = this;
            $this.target = [];
            var $trigger = this.mbs_id;
            $.each(PRG._scope.con.mbs, function () {
                if (this.pageSourceId == $trigger) {
                    $this.target.push(this.pageTargetId);
                }
            });
        });
        $.each(PRG.struck.control, function () {

            var $this = this;
            $this.target = [];
            var $trigger = this.mbs_id;
            $.each(PRG._scope.con.mbs, function () {

                if (this.pageSourceId == $trigger + "_out") {
                    $this.target.push(this.pageTargetId);
                }
            });
        });
    },

    make_conpanel: function () {

        SGI.con_files = [];
        try {
            $.each(fs.readdirSync(path.resolve(scope.setup.datastore + '/ScriptGUI_Data/connections/')), function () {
                var con_name = this.split(".json")[0];
                con_name = con_name.replace("port", ":");
                SGI.con_files.push(con_name)
            });
        }
        catch (e) {
        }

        $("#inp_con_ip").xs_combo({
            addcssButton: "xs_button_con frame_color ",
            addcssMenu: "xs_menu_con",
            addcssFocus: "xs_focus_con",
            cssText: "xs_text_con item_font",
            time: 750,
            combo: true,
            val: SGI.con_files[0],
            data: SGI.con_files
        });

        if (SGI.con_files.length == 0) {
            $("#btn_con_offline").parent().hide()
        }


        $("#inp_con_ip").bind("change", function () {
            SGI.disconnect();

            if (SGI.con_files.indexOf($(this).val()) == -1) {
                $("#btn_con_offline").parent().hide()
            } else {
                $("#btn_con_offline").parent().show()
            }

        });

        $("#inp_con_ip").bind("keyup", function () {

            if (SGI.con_data) {
                SGI.disconnect();
            }
            if (SGI.con_files.indexOf($(this).children().first().val()) == -1) {
                $("#btn_con_offline").parent().hide()
            } else {
                $("#btn_con_offline").parent().show()
            }

        });

        var movementTimer = null;
        var panel_open = false;
        $("#inp_con_ip").mousemove(function () {
            clearTimeout(movementTimer);
            movementTimer = setTimeout(function () {
                if (!panel_open) {
                    panel_open = true;
                    $("#con_panel").stop(true, false).slideDown(300)
                }

            }, 150);
        });

        $("#inp_con_ip").mouseout(function () {
            clearTimeout(movementTimer);
        });

        $("#con_panel_wrap").hover(function () {

        }, function (e) {

            if ($(e.toElement).attr("id") != "inp_con_ip") {
                if ($(e.target).attr("id") == "con_panel_wrap") {
                    panel_open = false;
                    $("#con_panel").stop(true, false).slideUp(700)
                }
            }
        });
    },

    copy_selected: function () {
        SGI.copy_data = [];

//        $.each($('.fbs_selected'), function () {
        $.each($('.jsplumb-drag-selected '), function () {
            var data;
            var posi;
            if ($(this).hasClass("fbs_element")) {
                posi = $(this).position();
                data = {
                    type: $(this).attr("id").split("_")[0],
                    style: {
                        top: posi.top,
                        left: posi.left
                    },
                    parent: "",
                    fbs: true
                };
                SGI.copy_data.push(data)
            } else if ($(this).hasClass("mbs_element")) {
                posi = $(this).position();
                data = {
                    type: $(this).attr("id").split(/_[0-9]+/)[0],
                    style: {
                        top: posi.top,
                        left: posi.left
                    },
                    parent: "",
                    mbs: true
                };
                SGI.copy_data.push(data)
            }
        });
    },

    paste_selected: function () {

        var codebox = $(".codebox_active").find(".prg_codebox");

//        $(".fbs_selected").removeClass("fbs_selected");
        $.each(SGI.plumb_inst, function () {
            this.clearDragSelection();
        });

        $.each(SGI.copy_data, function () {

            var data;
            if (this.fbs) {
                data = this;
                data.parent = $(codebox).attr('id');
                SGI.add_fbs_element(data, data.style.left, data.style.top, true)
            } else {
                data = this;
                data.parent = "prg_panel";
                SGI.add_mbs_element(data, data.style.left, data.style.top, true)
            }

        });
    },

    find_border_position: function (data) {
        var box_h = parseInt($("#" + data.parent).css("height").split("px")[0]);
        var box_w = parseInt($("#" + data.parent).css("width").split("px")[0]);
        var top = parseInt($("#" + data.fbs_id).css("top").split("px")[0]);
        var left = parseInt($("#" + data.fbs_id).css("left").split("px")[0]);

        var p = [
            {ist: parseInt(left) || 9999, t: "left"},
            {ist: parseInt(box_w - left) || 9999, t: "right"},
            {ist: parseInt(top) || 9999, t: "top"},
            {ist: parseInt(box_h - top) || 9999, t: "bottom"}
        ];

        function SortByName(a, b) {
            var aName = a.ist;
            var bName = b.ist;
            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        }

        p.sort(SortByName);

        return p[0].t

    },

    find_prg_codebox: function (child) {
        var prg_codebox = undefined;

        if ($(child).hasClass('ui-resizable-handle')) {
            prg_codebox = undefined;
        } else if ($(child).hasClass('prg_codebox')) {
            prg_codebox = $(child);
        } else if ($(child).hasClass('mbs_element_codebox')) {
            prg_codebox = $(child).find(".prg_codebox");
        } else {
            var all = $(child).parents();
            $.each(all, function () {
                if ($(this).hasClass('prg_codebox')) {
                    prg_codebox = this;
                }
            });
        }
        return prg_codebox
    },

    read_experts: function () {
        function SortFile(a, b) {
            var aName = a.toString();
            var bName = b.toString();
            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        }

        fs.readdir(scope.setup.datastore + '/ScriptGUI_Data/experts/', function (err, _files) {
            if (err) {
                throw err;
            } else {

                var files = _files;
                SGI.experts = {};
                $(".fbs_exp_custom").remove();
                $(".expert_br").remove();

                files.sort(SortFile);

                $.each(files, function () {
                    var file = this.toString();
                    try {
                        fs.readFile(scope.setup.datastore + '/ScriptGUI_Data/experts/' + file, function (err, data) {
                            if (err) {
                                throw err;
                            } else {
                                var data = JSON.parse(data);
                                SGI.experts[data.name] = data;

                                $("#toolbox_expert").append(
                                    "<div id='expert_" + data.name + "' style='width: 60px;height: auto;margin: auto;text-align: center;background-color: #ffffff;border-radius: 12px;z-index: 50;display: inline-table;margin-top:30px; overflow-x: visible;overflow-y: hidden ;min-height:72px' class='fbs_exp_custom fbs'> " +
                                    "<div  style=\"width:60px; overflow: visible!important;display: inline-block;  \" class=\"fbs_html fbs_element_exp \" style=\"left: 8px; top: 0px; position: relative;\">" +
                                    "<div class=\"div_head\" style=\"background-color: gray;overflow: visible!important;height: auto;\">" +
                                    "<span style=\"background-color:transparent; border:none; width: 56px; text-align: center;\" class=\"head_font \">Expert</span>" +
                                    "</div>" +
                                    "<label class=\"lab_exp_in\">Inputs</label>" +
                                    "<label class=\"lab_exp_out\">Outputs</label>" +
                                    "<input class=\"inp_exp_val_in \">" +
                                    "<input class=\"inp_exp_val_out \">" +
                                    "<div  id='left_" + data.name + "'  class=\"div_left_exp\">" +
                                    "</div>" +
                                    "<div  id='right_" + data.name + "' class=\"div_right_exp\">" +
                                    "</div>" +
                                    "<div style=\"background-color: gray;z-index: 1;height: 15px;\" class=\"btn_exp\"></div>" +
                                    "<button type=\"button\" class=\"btn_exp\">Edit</button>" +
                                    "<div style='position: absolute; width: 100%; height: 100%; z-index: -1 ;background-color: #ffffff;top:0;border-radius: 12px' ></div>" +
                                    "<div class=\"fbs_shadow\"></div>" +
                                    "</div>" +
                                    "</div>"
                                );

                                for (var i = 1; i <= parseInt(data.in); i++) {
                                    $("#left_" + data.name).append(
                                        "<div  class=\"html_endpoint \" style=\"position: relative; margin-top: 5px; height: 11px; width: 20px; left: -10px; top: 0px;z-index: -1!important;\">" +
                                        "<svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"11\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">" +
                                        "<rect width=\"20\" height=\"11\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"gray\" stroke=\"none\" style=\"\"></rect>" +
                                        "</svg>" +
                                        "</div>"
                                    )
                                }
                                for (var i = 1; i <= parseInt(data.out); i++) {
                                    $("#right_" + data.name).append(
                                        "<div class=\"html_endpoint \" style=\"position: relative; margin-top: 5px;height: 11px; width: 20px; left: 10px; top: 0px;z-index: -1!important;\">" +
                                        "<svg style=\"position:absolute;left:0px;top:0px\" width=\"20\" height=\"11\" pointer-events=\"all\" position=\"absolute\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\">" +
                                        "<rect width=\"20\" height=\"11\" version=\"1.1\" xmlns=\"http://www.w3.org/1999/xhtml\" fill=\"gray\" stroke=\"none\" style=\"\"></rect>" +
                                        "</svg>" +
                                        "</div>"
                                    )
                                }

                                var active_toolbox;
                                $("#expert_" + data.name).draggable({
                                    helper: "clone",
                                    appendTo: "body",
                                    zIndex: 101,
                                    containment: "body",
                                    iframeFix: true,
                                    start: function (e, ui) {
                                    },
                                    drag: function (e, ui) {
                                    },
                                    stop: function () {
                                        $("#helper").remove()
                                    }
                                });

                            }
                        });
                    }
                    catch (err) {
                        throw err
                    }
                })
            }
        })
    },

    add_force: function (con) {
        var _ep = con.sourceId.split("_");
        var nr = _ep[1];
        var parent = scope.fbs[nr].parent.split("_");
        var codebox = parent[1] + '_' + parent[2];
        var source = con.sourceId;
        var cons = SGI.plumb_inst['inst_' + codebox].getConnections({source: source});
        if (scope.fbs[nr].force == undefined) {
            scope.fbs[nr].force = "";
        }

        $.each(cons, function () {

            var con = this;
            var id = con.id;
            this.removeOverlay('force');
            this.addOverlay(
                ["Custom", {
                    create: function () {
                        return $('<div><div class="force_overlay ui-corner-all" style="max-height: 18px">\
                    <input type="text" value="' + scope.fbs[nr].force + '" data-info="' + source + '" id="overlay_force_' + id + '" class="force_input ui-corner-all"></input>\
                    </div></div>');
                    },
                    id: "force",
                    location: -25
                }]
            );

            $('#overlay_force_' + id).change(function () {
                scope.fbs[nr].force = $(this).val();
                SGI.add_force(con);
            });
        });
    },

    del_force: function (con) {
        var _ep = con.sourceId.split("_");
        var nr = _ep[1];
        var parent = scope.fbs[nr].parent.split("_");
        var codebox = parent[1] + '_' + parent[2];

        var cons = SGI.plumb_inst['inst_' + codebox].getConnections({source: con.sourceId});

        var id = con.id;
        $("#overlay_force_" + id).val("");
        $("#overlay_force_" + id).trigger("change");
        $.each(cons, function () {
            this.removeOverlay('force');
            scope.fbs[nr].force = undefined;
        });
        scope.$apply();

    },

    del_all_force: function () {
        var cons = [];
        $.each(SGI.plumb_inst, function () {
            var _cons = this.getConnections("*");
            cons = cons.concat(_cons)
        });

        $.each(cons, function () {
            if (this.getOverlay('force')) {
                this.removeOverlay('force');
                scope.fbs[this.sourceId.split("_")[1]].force = undefined;
            }
        });
        scope.$apply();

    },

    del_mbs: function (opt) {

        var trigger = $(opt).attr("$trigger");
        var children = $(trigger).find("div");
        var nr = $(opt.$trigger).data("nr");

        SGI.plumb_inst.inst_mbs.deleteEndpoint($(opt.$trigger).attr("id"));
        $.each(children, function () {
            var ep = SGI.plumb_inst["inst_mbs"].getEndpoints($(this).attr("id"));

            SGI.plumb_inst["inst_mbs"].detachAllConnections(this);

            if (ep != undefined) {
                SGI.plumb_inst["inst_mbs"].deleteEndpoint($(ep).attr("elementId"));
            }
        });
        $(trigger).remove();
        delete scope.mbs[nr];
        scope.$apply()
    },

    del_fbs: function (opt) {

        var trigger = $(opt).attr("$trigger");
        var children = $(trigger).find("div");
        var nr = $(opt.$trigger).data("nr");
        var parent = scope.fbs[nr]["parent"].split("_");

        $.each(children, function () {
            var ep = SGI.plumb_inst["inst_" + parent[1] + "_" + parent[2]].getEndpoints($(this).attr("id"));

            SGI.plumb_inst["inst_" + parent[1] + "_" + parent[2]].detachAllConnections(this);

            if (ep != undefined) {
                SGI.plumb_inst["inst_" + parent[1] + "_" + parent[2]].deleteEndpoint($(ep).attr("elementId"));
            }
        });
        $(trigger).remove();
        delete scope.fbs[nr];
        scope.$apply()
    },

    del_fbs_onborder: function (opt) {

        var trigger = $(opt).attr("$trigger");
        var id = $(opt.$trigger).attr("id");
        var nr = $(opt.$trigger).data("nr");
        var parent = scope.fbs[nr]["parent"].split("_");


        SGI.plumb_inst["inst_" + parent[1] + "_" + parent[2]].detachAllConnections(id);
        SGI.plumb_inst["inst_" + parent[1] + "_" + parent[2]].deleteEndpoint(id);
        SGI.plumb_inst.inst_mbs.deleteEndpoint(id);
        $(trigger).remove();
        delete scope.fbs[nr];
        scope.$apply()
    },

    del_codebox: function (opt) {
        var $this = $(opt).attr("$trigger");

        if (!$($this).hasClass("mbs_element_codebox")) {
            $this = $(opt).attr("$trigger").parent().parent()
        }

        var children = $($this).find("div");

        SGI.plumb_inst.inst_mbs.detachAllConnections($($this));
        $.each(children, function () {
            var ep = SGI.plumb_inst["inst_" + $($this).attr("id")].getEndpoints($(this).attr("id"));

            SGI.plumb_inst["inst_" + $($this).attr("id")].detachAllConnections(this);

            if (ep != undefined) {
                SGI.plumb_inst["inst_" + $($this).attr("id")].deleteEndpoint($(ep).attr("elementId"));
            }

            if ($(this).hasClass("fbs_element")) {
                delete scope.fbs[$(this).data("nr")];
            }

        });
        $($this).remove();
        delete scope.mbs[$($this).data("nr")];
        delete scope.con.fbs[$($this).attr("id")];

        scope.$apply();

    },

    del_selected: function () {

        var mbs_sel = $(".mbs_selected");
        var fbs_sel = $(".jsplumb-drag-selected");
        var opt = {};

        $.each($(".jsplumb-drag-selected"), function () {
            if ($(this).hasClass("fbs_element")) {
                if ($(this).hasClass("fbs_element_onborder")) {
                    opt.$trigger = this;
                    SGI.del_fbs_onborder(opt)

                } else {
                    opt.$trigger = this;
                    SGI.del_fbs(opt)
                }
            } else {
                if ($(this).hasClass("mbs_element_codebox")) {
                    opt.$trigger = this;
                    SGI.del_codebox(opt)

                } else {
                    opt.$trigger = this;
                    SGI.del_mbs(opt)
                }
            }
        });


    },

    change_id: function (opt) {

        $('#select_oid').selectId('show',{
                common: {
                    //custom: instance
                }
            },
            function (newId, ignore, obj) {

                if (newId != null) {
                    if (newId != null) {

                        var _name = obj.common.name;

                        scope.fbs[$(opt.$trigger).data("nr")]["oid"] = newId;

                        $(opt.$trigger).find(".div_oid").text(_name);
                        scope.fbs[$(opt.$trigger).data("nr")]["name"] = _name;

                        SGI.plumb_inst["inst_" + $(opt.$trigger).parent().parent().attr("id")].repaintEverything();
                    }
                }
            });

    },

    change_i_liste: function (opt) {

        $.id_select({
            type: "groups",
            close: function (oid) {
                if (oid != null) {

                    var _name = SGI.get_name(oid);
                    scope.fbs[$(opt.$trigger).data("nr")]["oid"] = oid;
                    $(opt.$trigger).find(".div_oid").text(_name);
                    scope.fbs[$(opt.$trigger).data("nr")]["name"] = _name;

                    scope.$apply();
                    SGI.plumb_inst["inst_" + $(opt.$trigger).parent().parent().attr("id")].repaintEverything();
                }
            }
        });
    },

    change_o_liste: function (opt) {

        $.id_select({
            type: "obj",
            close: function (oid) {
                if (oid != null) {
                    var _name = SGI.get_name(oid);
                    scope.fbs[$(opt.$trigger).data("nr")]["oid"] = oid;
                    $(opt.$trigger).find(".div_oid").text(_name);
                    scope.fbs[$(opt.$trigger).data("nr")]["name"] = _name;

                    scope.$apply();
                    SGI.plumb_inst["inst_" + $(opt.$trigger).parent().parent().attr("id")].repaintEverything();
                }
            }
        });

    },

    change_local: function (opt) {

        $.id_select({
            type: "local",
            close: function (oid) {
                if (oid != null) {

                    scope.fbs[$(opt.$trigger).data("nr")]["oid"] = oid;
                    $(opt.$trigger).find(".div_oid").text(oid);
                    scope.fbs[$(opt.$trigger).data("nr")]["name"] = oid;

                    scope.$apply();
                    SGI.plumb_inst["inst_" + $(opt.$trigger).parent().parent().attr("id")].repaintEverything();
                }
            }
        });
    },

    del_trigger_oid: function (opt) {
        var nr = $("#" + $(opt.$trigger).data("info")).data("nr");
        var name = $(opt.$trigger).text();
        var index = $.inArray(name, scope.mbs[nr]["name"]);

        scope.mbs[nr]["name"].splice(index, 1);
        scope.mbs[nr]["oid"].splice(index, 1);

        $(opt.$trigger).remove();

        scope.$apply();
        SGI.plumb_inst.inst_mbs.repaintEverything()
    },

    del_device_oid: function (opt) {
        var nr = $("#" + $(opt.$trigger).data("info")).data("nr");
        var name = $(opt.$trigger).text();
        var index = $.inArray(name, scope.fbs[nr]["name"]);

//     scope.fbs[nr]["name"].splice(index, 1);
        scope.fbs[nr]["oid"].splice(index, 1);

        $(opt.$trigger).remove();

        scope.$apply();
        SGI.plumb_inst["inst_" + $("#" + $(opt.$trigger).data("info")).parent().parent().attr("id")].repaintEverything();
    },

    del_filter_item: function (opt) {
        var nr = $("#" + $(opt.$trigger).data("info")).data("nr");
        var name = $(opt.$trigger).text();
        var index = $.inArray(name, scope.fbs[nr]["oid"]);

//        PRG.fbs[nr]["name"].splice(index, 1); //todo Remove after ng
        scope.fbs[nr]["oid"].splice(index, 1);

        $(opt.$trigger).remove();
        scope.$apply();

        SGI.plumb_inst["inst_" + $("#" + $(opt.$trigger).data("info")).parent().parent().attr("id")].repaintEverything();
    },

    del_trigger_val: function (opt) {
        var nr = $("#" + $(opt.$trigger).data("info")).data("nr");
        var parrent = $(opt.$trigger).data("info");
        var name = $(opt.$trigger).text();
        var index = $.inArray(name, scope.mbs[nr]["name"]);

        scope.mbs[nr]["name"].splice(index, 1);
        scope.mbs[nr]["oid"].splice(index, 1);
        scope.mbs[nr]["val"].splice(index, 1);
        scope.mbs[nr]["wert"].splice(index, 1);

        $(opt.$trigger).parent().remove();
        scope.$apply();

        SGI.plumb_inst.inst_mbs.repaintEverything()
    },

    expert_save: function (opt) {
        var nr = $(opt.$trigger).data("nr");

        var data = {
            name: scope.fbs[nr]["opt"],
            value: scope.fbs[nr]["value"],
            in: scope.fbs[nr]["exp_in"],
            out: scope.fbs[nr]["exp_out"]
        };

        fs.writeFile(scope.setup.datastore + '/ScriptGUI_Data/experts/expert_' + data.name + '.json', JSON.stringify(data), function (err) {
            if (err) {
                throw err;
            } else {
                SGI.read_experts();
            }

        });
    },

    expert_del: function (opt) {
        var name = $(opt.$trigger).attr("id");
        fs.unlink(scope.setup.datastore + '/ScriptGUI_Data/experts/' + name + ".json", function (err) {
            if (err) {
                throw err;
            } else {
                SGI.read_experts();
            }

        });
    },

    edit_exp: function (data, name, callback) {

        var h = $(window).height() - 200;
        var v = $(window).width() - 400;

        $("body").append('\
                   <div id="dialog_code" style="text-align: left; min-width: 520px" title="Expert Editor">\
                    <button id="btn_exp_id">ID</button>\
                    <button id="btn_exp_group">Gruppe</button>\
                    <button id="btn_exp_device">Ger�t</button>\
                    <div style="float: right; margin-top:6px"> \
                        <span>' + SGI.translate("Name:") + '</span>\
                            <input id="exp_name" type="text" value="' + name + '"/>\
                    </div>\
                    <div id="expert_ace"   style="width: calc(100% - 0px);height: calc(100% - 50px);margin-top: 10px;" class="code frame_color ui-corner-all"></div>\
                   </div>');

        $("#dialog_code").dialog({
            height: h,
            width: v,
            resizable: true,
            minWidth: 550,
            close: function () {
                var data = {
                    value: editor.getValue(),
                    name: $('#exp_name').val()
                };
                $("#dialog_code").remove();
                return callback(data)
            }
        });

        var editor = ace.edit("expert_ace");
        editor.getSession().setMode("ace/mode/javascript")
        editor.setTheme("ace/theme/monokai");
        editor.setOptions({
            showPrintMargin: false,
        });

        editor.$blockScrolling = Infinity;
        editor.getSession().setUseWrapMode(true);

        editor.setValue(js_beautify(data.toString(), {indent_size: 2}), -1);


        $("#btn_exp_id").button().click(function () {

            $.id_select({
                type: "singel",
                close: function (oid) {
                    var range = {from: editor.getCursor(true), to: editor.getCursor(false)};
                    editor.replaceRange(oid, range.from, range.to)
                }
            });
        });
        $("#btn_exp_group").button().click(function () {

            $.id_select({
                type: "groups",
                close: function (oid) {
                    var range = {from: editor.getCursor(true), to: editor.getCursor(false)};
                    editor.replaceRange(oid, range.from, range.to)
                }
            });
        });
        $("#btn_exp_device").button().click(function () {

            $.id_select({
                type: "device",
                close: function (oid) {
                    var data = '"' + oid + '"';
                    var range = {from: editor.getCursor(true), to: editor.getCursor(false)};
                    editor.replaceRange(data, range.from, range.to)
                }
            });
        });
    },

    open_quick_help_dialog: function () {

        if ($("body").find(".quick-help").length < 1) {

            $("body").append('\
                   <div id="dialog_quick-help" style="text-align: center, " title="Quick Help">\
                   <input class="focus_dummy" type="button"/>\
                   <div id="help-content"></div>\
                   </div>');

            $("#dialog_quick-help").dialog({

                dialogClass: "quick-help",
                close: function () {
                    $("#dialog_quick-help").remove();
                }

            });
//            $(".ui-tooltip").remove()

            $(".quick-help").css({
                position: "absolute",
                top: "58px",
                left: "182px",
                right: "auto",
                width: "200px",
                "z-index": 50
            });

        }

    },

    quick_help: function () {
        var help = {
            toint: '<div class="quick-help_content">      <H2>INT:</H2>                     <p>' + SGI.translate("toint") + '</p></div>',
            tofloat: '<div class="quick-help_content">      <H2>Float:</H2>                   <p>' + SGI.translate("tofloat") + '</p></div>',
            tostring: '<div class="quick-help_content">      <H2>String:</H2>                  <p>' + SGI.translate("tostring") + '</p></div>',
            und: '<div class="quick-help_content">      <H2>and:</H2>                     <p>' + SGI.translate("und") + '</p></div>',
            oder: '<div class="quick-help_content">      <H2>or:</H2>                      <p>' + SGI.translate("oder") + '</p></div>',
            not: '<div class="quick-help_content">      <H2>Not:</H2>                     <p>' + SGI.translate("not") + '</p></div>',
            verketten: '<div class="quick-help_content">      <H2>concate:</H2>                 <p>' + SGI.translate("verketten") + '</p></div>',
            input: '<div class="quick-help_content">      <H2>Get:</H2>                     <p>' + SGI.translate("input") + '</p></div>',
            inputliste: '<div class="quick-help_content">      <H2>Get Liste:</H2>               <p>' + SGI.translate("inputliste") + '</p></div>',
            inputlocal: '<div class="quick-help_content">      <H2>Get Local:</H2>               <p>' + SGI.translate("inputlocal") + '</p></div>',
            output: '<div class="quick-help_content">      <H2>Set:</H2>                     <p>' + SGI.translate("output") + '</p></div>',
            outputlocal: '<div class="quick-help_content">      <H2>Set Local:</H2>               <p>' + SGI.translate("outputlocal") + '</p></div>',
            mail: '<div class="quick-help_content">      <H2>Mail:</H2>                    <p>' + SGI.translate("mail") + '</p></div>',
            debugout: '<div class="quick-help_content">      <H2>CCU.IO LOG:</H2>              <p>' + SGI.translate("debugout") + '</p></div>',
            "true": '<div class="quick-help_content">      <H2>true:</H2>                    <p>' + SGI.translate("true") + '</p></div>',
            "false": '<div class="quick-help_content">      <H2>false:</H2>                   <p>' + SGI.translate("false") + '</p></div>',
            zahl: '<div class="quick-help_content">      <H2>Number:</H2>                  <p>' + SGI.translate("zahl") + '</p></div>',
            string: '<div class="quick-help_content">      <H2>Text:</H2>                    <p>' + SGI.translate("string") + '</p></div>',
            vartime: '<div class="quick-help_content">      <H2>Time:</H2>                    <p>' + SGI.translate("vartime") + '</p></div>',
            trigvalue: '<div class="quick-help_content">      <H2>Trigger Value:</H2>           <p>' + SGI.translate("trigvalue") + '</p></div>',
            trigtime: '<div class="quick-help_content">      <H2>Trigger Time:</H2>            <p>' + SGI.translate("trigtime") + '</p></div>',
            trigoldvalue: '<div class="quick-help_content">      <H2>Trigger old Value:</H2>       <p>' + SGI.translate("trigoldvalue") + '</p></div>',
            trigoldtime: '<div class="quick-help_content">      <H2>Trigger old Time:</H2>        <p>' + SGI.translate("trigoldtime") + '</p></div>',
            trigid: '<div class="quick-help_content">      <H2>Trigger ID:</H2>              <p>' + SGI.translate("trigid") + '</p></div>',
            trigname: '<div class="quick-help_content">      <H2>Trigger Name:</H2>            <p>' + SGI.translate("trigname") + '</p></div>',
            trigtype: '<div class="quick-help_content">      <H2>Trigger Type:</H2>            <p>' + SGI.translate("trigtype") + '</p></div>',
            trigdevid: '<div class="quick-help_content">      <H2>Trigger Device ID:</H2>       <p>' + SGI.translate("trigdevid") + '</p></div>',
            trigdevname: '<div class="quick-help_content">      <H2>Trigger Device Name:</H2>     <p>' + SGI.translate("trigdevname") + '</p></div>',
            trigdevtype: '<div class="quick-help_content">      <H2>Trigger Device Type:</H2>     <p>' + SGI.translate("trigdevtype") + '</p></div>',
            codebox: '<div class="quick-help_content">      <H2>Program Box:</H2>             <p>' + SGI.translate("codebox") + '</p></div>',
            brake: '<div class="quick-help_content">      <H2>Delay:</H2>                   <p>' + SGI.translate("brake") + '</p></div>',
            intervall: '<div class="quick-help_content">      <H2>Intervall:</H2>               <p>' + SGI.translate("intervall") + '</p></div>',
            loop: '<div class="quick-help_content">      <H2>Loop:</H2>                    <p>' + SGI.translate("loop") + '</p></div>',

            block_t: '<div class="quick-help_content">      <H2>Block t:</H2>           <p>' + SGI.translate("block_t") + '</p></div>',
            block_kn: '<div class="quick-help_content">      <H2>Block &ltn:</H2>           <p>' + SGI.translate("block_kn") + '</p></div>',
            block_gn: '<div class="quick-help_content">      <H2>Block &gtn:</H2>           <p>' + SGI.translate("block_gn") + '</p></div>',
            block_e: '<div class="quick-help_content">      <H2>Block e:</H2>           <p>' + SGI.translate("block_e") + '</p></div>',
            block_tn: '<div class="quick-help_content">      <H2>Block tn:</H2>           <p>' + SGI.translate("block_tn") + '</p></div>',
            block_tt: '<div class="quick-help_content">      <H2>Block tt:</H2>           <p>' + SGI.translate("block_tt") + '</p></div>',


            next: '<div class="quick-help_content">      <H2>Next:</H2>                    <p>' + SGI.translate("next") + '</p></div>',
            next1: '<div class="quick-help_content">      <H2>Next 1:</H2>                  <p>' + SGI.translate("next1") + '</p></div>',
            next0: '<div class="quick-help_content">      <H2>Next 0:</H2>                  <p>' + SGI.translate("next0") + '</p></div>',
            komex: '<div class="quick-help_content">      <H2>Comment:</H2>                 <p>' + SGI.translate("komex") + '</p></div>',
            ccuobj: '<div class="quick-help_content">      <H2>CCU.IO Object:</H2>           <p>' + SGI.translate("ccuobj") + '</p></div>',
            ccuobjpersi: '<div class="quick-help_content">      <H2>CCU.IO Object persident:</H2> <p>' + SGI.translate("ccuobjpersi") + '</p></div>',
            trigger_event: '<div class="quick-help_content">      <H2>Trigger --:</H2>              <p>' + SGI.translate("trigger_event") + '</p></div>',
            trigger_EQ: '<div class="quick-help_content">      <H2>Trigger EQ:</H2>              <p>' + SGI.translate("trigger_EQ") + '</p></div>',
            trigger_NE: '<div class="quick-help_content">      <H2>Trigger NE:</H2>              <p>' + SGI.translate("trigger_NE") + '</p></div>',
            trigger_GT: '<div class="quick-help_content">      <H2>Trigger GT:</H2>              <p>' + SGI.translate("trigger_GT") + '</p></div>',
            trigger_GE: '<div class="quick-help_content">      <H2>Trigger GE:</H2>              <p>' + SGI.translate("trigger_GE") + '</p></div>',
            trigger_LT: '<div class="quick-help_content">      <H2>Trigger LT:</H2>              <p>' + SGI.translate("trigger_LT") + '</p></div>',
            trigger_LE: '<div class="quick-help_content">      <H2>Trigger LE:</H2>              <p>' + SGI.translate("trigger_LE") + '</p></div>',
            trigger_valNe: '<div class="quick-help_content">      <H2>Trigger valNE:</H2>           <p>' + SGI.translate("trigger_valNe") + '</p></div>',
            trigger_val: '<div class="quick-help_content">      <H2>Trigger VAL:</H2>             <p>' + SGI.translate("trigger_val") + '</p></div>',
            trigger_time: '<div class="quick-help_content">      <H2>Trigger Time:</H2>            <p>' + SGI.translate("trigger_time") + '</p></div>',
            trigger_vartime: '<div class="quick-help_content">      <H2>Trigger var. Time:</H2>       <p>' + SGI.translate("trigger_vartime") + '</p></div>',
            trigger_zykm: '<div class="quick-help_content">      <H2>Trigger Zyklus M:</H2>        <p>' + SGI.translate("trigger_zykm") + '</p></div>',
            trigger_astro: '<div class="quick-help_content">      <H2>Trigger Astro:</H2>           <p>' + SGI.translate("trigger_astro") + '</p></div>',
            trigger_start: '<div class="quick-help_content">      <H2>Trigger Start:</H2>           <p>' + SGI.translate("trigger_start") + '</p></div>',
            wenn: '<div class="quick-help_content">      <H2>IF:</H2>                      <p>' + SGI.translate("wenn") + '</p></div>',
            timespan: '<div class="quick-help_content">      <H2>Timespan:</H2>                <p>' + SGI.translate("timespan") + '</p></div>',
            inc: '<div class="quick-help_content">      <H2>+1:</H2>                      <p>' + SGI.translate("inc") + '</p></div>',
            dec: '<div class="quick-help_content">      <H2>-1:</H2>                      <p>' + SGI.translate("dec") + '</p></div>',
            summe: '<div class="quick-help_content">      <H2>Sum:</H2>                     <p>' + SGI.translate("summe") + '</p></div>',
            differenz: '<div class="quick-help_content">      <H2>Difference:</H2>              <p>' + SGI.translate("differenz") + '</p></div>'
        };

        $(document).click(function (elem) {
            SGI.klick = elem;


            if (SGI.key == 17) {
                SGI.open_quick_help_dialog();
                $("#help-content").children().remove();
                var type


                if ($(elem.target).hasClass("fbs_element") || $(elem.target).hasClass("mbs_element") || $(elem.target).hasClass("fbs") || $(elem.target).hasClass("mbs")) {

                    if ($(elem.target).attr("id").split("_")[0] == "trigger" || $(elem.target).attr("id").split("_")[0] == "block") {
                        type = $(elem.target).attr("id").split("_")[0] + "_" + $(elem.target).attr("id").split("_")[1];
                    } else {
                        type = $(elem.target).attr("id").split("_")[0];
                    }

                    $("#help-content").append(help[type]);
                } else {
                    $.each($(elem.target).parents(), function () {
                        if ($(this).hasClass("fbs_element") || $(this).hasClass("mbs_element") || $(this).hasClass("fbs") || $(this).hasClass("mbs")) {

                            if ($(this).attr("id").split("_")[0] == "trigger" || $(this).attr("id").split("_")[0] == "trigger") {
                                type = $(this).attr("id").split("_")[0] + "_" + $(this).attr("id").split("_")[1];
                            } else {
                                type = $(this).attr("id").split("_")[0];
                            }
                            $("#help-content").append(help[type]);
                            return false
                        }
                        if ($(this).hasClass("_jsPlumb_overlay")) {
                            type = $(this).attr("id").split("_")[0];
                            $("#help-content").append(help[type]);
                            return false
                        }
                    });
                }


            }

        });
    },

    load_prg: function (script) {
        var data = script.native.prg;
        try {
            if (script.native.version == undefined || script.native.version == "old") {

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
            error_box("load_prg  <br> " + err.stack)
        }
    },
});
