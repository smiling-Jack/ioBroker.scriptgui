var Compiler = {
    last_fbs: "",
    script: "",
    make_prg: function (sim) {

        Compiler.trigger = "// Trigger\n";
        Compiler.obj = "\n// CCU.IO Objekte\n";
        Compiler.timeout = "\n// Timeout Variablen\n";
        Compiler.block = "\n// Blocking Variablen\n";
        Compiler.force = "\n// Force Variablen\n";

        Compiler.script = "";

        SGI.make_struc();

        function SortByEingang(a, b) {

            var aName = parseInt(a.eingang.replace("in", ""));
            var bName = parseInt(b.eingang.replace("in", ""));
            return ((aName < bName) ? -1 : ((aName > bName) ? 1 : 0));
        }

        $.each(PRG.struck.trigger, function () {

            var nr = this.mbs_id.split("_").pop();
            var mbs_nr;
            var targets = "";


            if (sim == "trigger" || sim == "hotrun") {
                mbs_nr = ", [" + nr + "]";
            } else {
                mbs_nr = "";
            }

            $.each(this.target, function () {
//                if (this[1] == 0) {
                targets += this + "(data);"
//                } else
//                    targets += " setTimeout(function(){ " + this[0] + "(data)}," + this[1] * 1000 + ");"
            });

            if (PRG._scope.mbs[nr].type == "trigger_valNe") {
                $.each(PRG._scope.mbs[nr].hmid, function () {
                    Compiler.trigger = 'subscribe({id: ' + this + ' , valNe:false}, function (data){' + targets + ' }' + mbs_nr + '); ' + Compiler.script;
                });
            }
            if (PRG._scope.mbs[nr].type == "trigger_event") {

                $.each(PRG._scope.mbs[nr].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + '}, function (data){' + targets + ' }' + mbs_nr + '); '
                });
            }
            if (PRG._scope.mbs[nr].type == "trigger_EQ") {

                $.each(PRG._scope.mbs[nr].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"eq"}, function (data){' + targets + ' }' + mbs_nr + '); '
                });
            }
            if (PRG._scope.mbs[nr].type == "trigger_NE") {

                $.each(PRG._scope.mbs[nr].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"ne"}, function (data){' + targets + ' }' + mbs_nr + '); '
                });
            }
            if (PRG._scope.mbs[nr].type == "trigger_GT") {

                $.each(PRG._scope.mbs[nr].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"gt"}, function (data){' + targets + ' }' + mbs_nr + '); '
                });
            }
            if (PRG._scope.mbs[nr].type == "trigger_GE") {

                $.each(PRG._scope.mbs[nr].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"ge"}, function (data){' + targets + ' }' + mbs_nr + '); '
                });
            }
            if (PRG._scope.mbs[nr].type == "trigger_LT") {

                $.each(PRG._scope.mbs[nr].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"lt"}, function (data){' + targets + ' }' + mbs_nr + '); '
                });
            }
            if (PRG._scope.mbs[nr].type == "trigger_LE") {

                $.each(PRG._scope.mbs[nr].hmid, function () {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , change:"le"}, function (data){' + targets + ' }' + mbs_nr + '); '
                });
            }
            if (PRG._scope.mbs[nr].type == "trigger_val") {

                $.each(PRG._scope.mbs[nr].hmid, function (index) {
                    Compiler.trigger += 'subscribe({id: ' + this + ' , ' + PRG._scope.mbs[nr]["val"][index] + ':' + PRG._scope.mbs[nr]["wert"][index] + '}, function (data){' + targets + ' }' + mbs_nr + '); '
                });
            }
            if (PRG._scope.mbs[nr].type == "trigger_time") {

                $.each(PRG._scope.mbs[nr].time, function (index) {
                    var _time = this;

                    var m = this.split(":")[1];
                    var h = this.split(":")[0];

                    var day = "";
                    var _day = PRG._scope.mbs[nr].day[index];

                    switch (_day) {
                        case "88":
                            day = "*";
                            break;
                        case "1":
                            day = "1";
                            break;
                        case "2":
                            day = "2";
                            break;
                        case "3":
                            day = "3";
                            break;
                        case "4":
                            day = "4";
                            break;
                        case "5":
                            day = "5";
                            break;
                        case "6":
                            day = "6";
                            break;
                        case "7":
                            day = "0";
                            break;
                        case "8":
                            day = "1-5";
                            break;
                        case "9":
                            day = "6,0";
                            break;

                    }
                    Compiler.trigger += 'schedule("' + m + ' ' + h + ' * * ' + day + '", function (data){' + targets + ' }' + mbs_nr + '); '
                });
            }
            if (PRG._scope.mbs[nr].type == "trigger_astro") {

                $.each(PRG._scope.mbs[nr].astro, function (index) {

                    Compiler.trigger += 'schedule({astro:"' + this + '", shift:' + PRG._scope.mbs[nr].minuten[index] + '}, function (data){' + targets + ' }); '
                });
            }
            if (PRG._scope.mbs[nr].type == "trigger_zykm") {

                Compiler.trigger += 'schedule(" */' + PRG._scope.mbs[nr].time + ' * * * * ", function (data){' + targets + ' }); '

            }
            if (PRG._scope.mbs[nr].type == "trigger_vartime") {
                var n = PRG._scope.mbs[nr].hmid.length;
                Compiler.trigger += 'schedule(" * * * * * ", function (data){';
                Compiler.trigger += 'var d = new Date();';
                Compiler.trigger += 'var h = (d.getHours() < 10) ? "0"+d.getHours() : d.getHours();';
                Compiler.trigger += 'var m = (d.getMinutes() < 10) ? "0"+d.getMinutes() : d.getMinutes();';
                Compiler.trigger += 'var now = h.toString() + ":" + m.toString() +":00";';
                Compiler.trigger += 'if('
                $.each(PRG._scope.mbs[nr].hmid, function (index, obj) {

                    Compiler.trigger += 'homematic.uiState["_"+' + this + '] == now';
                    if (index + 1 < n) {
                        Compiler.trigger += ' || ';
                    }
                });
                Compiler.trigger += '){' + targets + '}});'

            }
            if (PRG._scope.mbs[nr].type == "trigger_yearly") {

                Compiler.trigger += 'schedule("@yearly", function (data){' + targets + ' }' + mbs_nr + '); '

            }
            if (PRG._scope.mbs[nr].type == "trigger_monthly") {

                Compiler.trigger += 'schedule("@monthly", function (data){' + targets + ' }' + mbs_nr + '); '

            }
            if (PRG._scope.mbs[nr].type == "scriptobj") {

                Compiler.obj += 'var ' + PRG._scope.mbs[nr].name + '; ';

            }
            if (PRG._scope.mbs[nr].type == "ccuobj") {

                Compiler.obj += 'setObject(' + PRG._scope.mbs[nr].hmid + ', { Name: "' + PRG._scope.mbs[nr]["name"] + '", TypeName: "VARDP"}); '

            }
            if (PRG._scope.mbs[nr].type == "ccuobjpersi") {

                Compiler.obj += 'setObject(' + PRG._scope.mbs[nr].hmid + ', { Name: "' + PRG._scope.mbs[nr]["name"] + '", TypeName: "VARDP" , _persistent:true}); '

            }
            if (PRG._scope.mbs[nr].type == "trigger_start") {

                $.each(this.target, function () {
//                    if (this[1] == 0) {
                    Compiler.trigger += 'var start_data =' + JSON.stringify(SGI.start_data) + ';';
                    Compiler.trigger += " " + this + "(start_data);";
//                    } else
//                        Compiler.trigger += " setTimeout(function(start_data){ " + this[0] + "()}," + this[1] * 1000 + ");"
                });
            }
        });

        $.each(PRG.struck.control, function () {

            var nr = this.mbs_id.split("_").pop();

            var targets = "";
            $.each(this.target, function () {
                targets += this + "(data);";
            });
            //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            if (PRG._scope.mbs[nr].type == "brake") {

                Compiler.timeout += "var " + this.mbs_id + " = [] ;";
                if (PRG._scope.mbs[nr].wert == true) {
                    Compiler.timeout += "function  " + this.mbs_id + "_in1 (data){";
                    Compiler.timeout += "clearTimeout(" + this.mbs_id + ".pop());";
                    Compiler.timeout += this.mbs_id + ".push(setTimeout(function(){" + targets + "}," + parseFloat(PRG._scope.mbs[nr].val) * 1000 + "))";
                    Compiler.timeout += "}";
                } else {
                    Compiler.timeout += "function  " + this.mbs_id + "_in1 (data){";
                    Compiler.timeout += this.mbs_id + ".push(setTimeout(function(){" + targets + "}," + parseFloat(PRG._scope.mbs[nr].val) * 1000 + "))";
                    Compiler.timeout += "}";
                }
                Compiler.timeout += "function  " + this.mbs_id + "_in2 (data){";
                Compiler.timeout += "while (" + this.mbs_id + ".length > 0 ) clearTimeout(" + this.mbs_id + ".pop());";
                Compiler.timeout += "}";
            }
            //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            if (PRG._scope.mbs[nr].type == "intervall") {

                Compiler.timeout += "var " + this.mbs_id + " ;";
                Compiler.timeout += "function  " + this.mbs_id + "_in1 (data){";
                Compiler.timeout += "clearInterval(" + this.mbs_id + " );";
                Compiler.timeout += this.mbs_id + " = setInterval(function(){" + targets + "}," + parseFloat(PRG._scope.mbs[nr].val) * 1000 + ")";
                Compiler.timeout += "}";

                Compiler.timeout += "function  " + this.mbs_id + "_in2 (data){";
                Compiler.timeout += "clearInterval(" + this.mbs_id + " );";
                Compiler.timeout += "}";
            }
            //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            if (PRG._scope.mbs[nr].type == "loop") {

                Compiler.timeout += "var " + this.mbs_id + " = 0;";
                Compiler.timeout += "var " + this.mbs_id + "_delay;";
                Compiler.timeout += "function  " + this.mbs_id + "_loop (data){";
                Compiler.timeout += "if (" + this.mbs_id + " < " + PRG._scope.mbs[nr].wert + ") {";
                Compiler.timeout += this.mbs_id + " ++;";
                Compiler.timeout += targets;
                Compiler.timeout += this.mbs_id + "_delay = setTimeout(function(){" + this.mbs_id + "_loop(data)}," + parseFloat(PRG._scope.mbs[nr].val) * 1000 + ");";
                Compiler.timeout += "}";
                Compiler.timeout += "}";

                Compiler.timeout += "function  " + this.mbs_id + "_in1 (data){";
                Compiler.timeout += this.mbs_id + "= 0;";
                Compiler.timeout += "clearTimeout(" + this.mbs_id + "_delay);";
                Compiler.timeout += this.mbs_id + "_loop(data)";
                Compiler.timeout += "}";

                Compiler.timeout += "function  " + this.mbs_id + "_in2 (data){";
                Compiler.timeout += "clearInterval(" + this.mbs_id + "_delay );";
                Compiler.timeout += this.mbs_id + "= " + parseInt(PRG._scope.mbs[nr].wert) + ";";
                Compiler.timeout += "}";
            }
            //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            if (PRG._scope.mbs[nr].type == "block_t") {

                Compiler.block += "var " + this.mbs_id + " = false ;";
                Compiler.block += "var " + this.mbs_id + "_t;";
                Compiler.block += "function  " + this.mbs_id + "_in1 (data){";
                Compiler.block += "if(! "+ this.mbs_id +"){";
                Compiler.block +=     this.mbs_id + "_t = setTimeout(function(){" + this.mbs_id +" = false}," + parseFloat(PRG._scope.mbs[nr].opt1)+");";
                Compiler.block += this.mbs_id +" = true;";
                Compiler.block += targets;
                Compiler.block +=     "}";
                Compiler.block +=  "}";

                Compiler.block += "function  " + this.mbs_id + "_in2 (data){";
                Compiler.block += "clearTimeout(" + this.mbs_id + "_t)";
                Compiler.block += this.mbs_id +" = false;";
                Compiler.block += "}";
            }
            //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            if (PRG._scope.mbs[nr].type == "block_kn") {

                Compiler.block += "var " + this.mbs_id + " = 1;";
                Compiler.block += "function  " + this.mbs_id + "_in1 (data){";
                Compiler.block += "if("+ this.mbs_id +" < "+ parseInt(PRG._scope.mbs[nr].opt1)+"){";
                Compiler.block +=    this.mbs_id + " ++;";
                Compiler.block += targets;
                Compiler.block +=     "}";
                Compiler.block +=  "}";

                Compiler.block += "function  " + this.mbs_id + "_in2 (data){";
                Compiler.block += this.mbs_id +" = 1;";
                Compiler.block += "}";
            }
            //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            if (PRG._scope.mbs[nr].type == "block_gn") {

                Compiler.block += "var " + this.mbs_id + " = 1;";
                Compiler.block += "function  " + this.mbs_id + "_in1 (data){";
                Compiler.block += "if("+ this.mbs_id +" > "+ parseInt(PRG._scope.mbs[nr].opt1) +"){";
                Compiler.block +=    this.mbs_id + " ++;";
                Compiler.block += targets;
                Compiler.block +=     "}";
                Compiler.block +=  "}";

                Compiler.block += "function  " + this.mbs_id + "_in2 (data){";
                Compiler.block += this.mbs_id +" = 1;";
                Compiler.block += "}";
            }
            //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            if (PRG._scope.mbs[nr].type == "block_e") {

                Compiler.block += "var " + this.mbs_id + " = 1;";
                Compiler.block += "function  " + this.mbs_id + "_in1 (data){";
                Compiler.block += "if("+ this.mbs_id +" == "+ parseInt(PRG._scope.mbs[nr].opt1) +"){";
                Compiler.block +=    this.mbs_id + " = 1;";
                Compiler.block += targets;
                Compiler.block +=     "}else{"+this.mbs_id + " ++;}";
                Compiler.block +=  "}";

                Compiler.block += "function  " + this.mbs_id + "_in2 (data){";
                Compiler.block += this.mbs_id +" = 1;";
                Compiler.block += "}";
            }
            //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            if (PRG._scope.mbs[nr].type == "block_tn") {

                Compiler.block += "var " + this.mbs_id + "_n = 0;";
                Compiler.block += "var " + this.mbs_id + "_t ;";
                Compiler.block += "var " + this.mbs_id + "_r = false;";


                Compiler.block += "function  " + this.mbs_id + "_in1 (data){";
                Compiler.block +=   "if("+ this.mbs_id +"_r){";
                Compiler.block +=      this.mbs_id + "_n ++;";
                Compiler.block +=       "if("+ this.mbs_id +"_n == "+ parseFloat(PRG._scope.mbs[nr].opt1)+" ){";
                Compiler.block +=           targets;
                Compiler.block +=           "clearTimeout(" + this.mbs_id + "_t);";
                Compiler.block +=           this.mbs_id +"_n = 0;";
                Compiler.block +=           this.mbs_id +"_r = false;";
                Compiler.block +=          "}";
                Compiler.block +=    "}else{";
                Compiler.block +=          this.mbs_id + "_t = setTimeout(function(){" + this.mbs_id +"_n = 0; " + this.mbs_id +"_r = false }," + parseFloat(PRG._scope.mbs[nr].opt1)+");";
                Compiler.block +=          this.mbs_id +"_r = true;";
                Compiler.block +=    "}";
                Compiler.block +=  "}";

                Compiler.block += "function  " + this.mbs_id + "_in2 (data){";
                Compiler.block += "clearTimeout(" + this.mbs_id + "_t);";
                Compiler.block += this.mbs_id +"_n = 0;";
                Compiler.block += this.mbs_id +"_r = false;";
                Compiler.block += "}";
            }
            //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
            if (PRG._scope.mbs[nr].type == "block_tt") {

//                abfarge ob Tegeswechsel
                if(PRG._scope.mbs[nr].opt1 < PRG._scope.mbs[nr].opt2){
                    Compiler.block += "function  " + this.mbs_id + "_in1 (data){";
                    Compiler.block += "var d = new Date;";
                    Compiler.block += "var ts = ('0' + d.getHours()).slice(-2) + ':'+ ('0' + (d.getMinutes())).slice(-2);";
                    Compiler.block +=    "if(ts > \""+PRG._scope.mbs[nr].opt1.toString()+"\" && ts < \""+PRG._scope.mbs[nr].opt2.toString()+"\"){";
                    Compiler.block +=       targets;
                    Compiler.block +=    "}";
                    Compiler.block += "}";
                }else{
                    Compiler.block += "function  " + this.mbs_id + "_in1 (data){";
                    Compiler.block += "var d = new Date;";
                    Compiler.block += "var ts = ('0' + d.getHours()).slice(-2) + ':'+ ('0' + (d.getMinutes())).slice(-2);";
                    Compiler.block +=    "if(ts < \""+PRG._scope.mbs[nr].opt1.toString()+"\" && ts > \""+PRG._scope.mbs[nr].opt2.toString()+"\"){";
                    Compiler.block +=       targets;
                    Compiler.block +=    "}";
                    Compiler.block += "}";

                }
            }
            //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
        });


        Compiler.script += Compiler.timeout;
        Compiler.script += Compiler.block;
        Compiler.script += Compiler.obj;
        Compiler.script += Compiler.trigger;

        Compiler.script += '';

        $.each(PRG.struck.codebox, function (idx) {
            var nr = idx.split("_").pop();
            var all_in_box = this[0];
            Compiler.script += '//' + PRG._scope.mbs[nr].titel + '\n';
            Compiler.script += 'function ' + idx + '(data){ ';
            if (sim == "step") {
                Compiler.script += idx + '_0();';
            }
            $.each(all_in_box, function (n) {

                var nr = this.fbs_id.split("_").pop();
                var output = "";
                if (this.output[0]) {
                    output = 'var ' + this.output[0].ausgang;
                }


                Compiler.last_fbs = this.fbs_id;
                if (sim == "step") {
                    if (this.output[0]) {
                        Compiler.script += 'var ' + this.output[0].ausgang + ';';
                        output = this.output[0].ausgang
                    }

                    Compiler.script += 'function ' + idx + "_" + n + '(){'
                }
                if (sim != false) {
                    Compiler.script += '\n\n// xxxxxxxxxxxxxxxxxxxx ' + this.fbs_id + ' xxxxxxxxxxxxxxxxxxxx \n';
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "input") {
                    Compiler.script += output + ' = getState(' + PRG._scope.fbs[nr].hmid + ');';
                }
                if (this["type"] == "inputlocal") {
                    Compiler.script += output + ' = ' + this.hmid + ';';
                }
                if (this["type"] == "output") {
                    Compiler.script += 'setState(' + this.hmid + ',' + this["input"][0]["herkunft"] + ');';
                }
                if (this["type"] == "outputlocal") {
                    Compiler.script += this.hmid + ' = ' + this["input"][0]["herkunft"] + ' ;';
                }
                if (this["type"] == "debugout") {
                    Compiler.script += 'log("' + SGI.file_name + ' -> ' + PRG._scope.mbs[PRG._scope.fbs[nr]["parent"].split("_").pop()].titel + ' -> " + ' + this["input"][0]["herkunft"] + ');';
                }
                if (this["type"] == "pushover") {
                    Compiler.script += 'pushover({message:' + this["input"][0]["herkunft"] + '});';
                }
                if (this["type"] == "mail") {
                    var n = this["input"].length;

                    this["input"].sort(SortByEingang);
                    Compiler.script += 'email({to: ' + this["input"][0].herkunft + ',subject: ' + this["input"][1].herkunft + ',text: ' + this["input"][2].herkunft + '});';
                }
                if (this["type"] == "true") {
                    Compiler.script += output + '  = true;';
                }
                if (this["type"] == "false") {
                    Compiler.script += output + '  = false;';
                }
                if (this["type"] == "zahl") {
                    Compiler.script += output + '  = ' + PRG._scope.fbs[nr]["value"] + ' ;';
                }
                if (this["type"] == "string") {
                    var lines = PRG._scope.fbs[nr]["value"].split("") || PRG._scope.fbs[nr]["value"];
                    var daten = "";
                    $.each(lines, function () {
                        daten = daten + this.toString() + " ";
                    });
                    Compiler.script += output + '  = "' + PRG._scope.fbs[nr]["value"] + '";';
                }

                if (this["type"] == "vartime") {
                    var d = new Date();
                    daten = "var d = new Date();";

                    if (PRG._scope.fbs[nr]["value"] == "zeit_k") {
                        daten += 'var h = (d.getHours() < 10) ? "0"+d.getHours() : d.getHours();';
                        daten += 'var m = (d.getMinutes() < 10) ? "0"+d.getMinutes() : d.getMinutes();';

                        daten += output + '  = h + ":" + m;';
                    } else if (PRG._scope.fbs[nr]["value"] == "zeit_l") {
                        daten += 'var h = (d.getHours() < 10) ? "0"+d.getHours() : d.getHours();';
                        daten += 'var m = (d.getMinutes() < 10) ? "0"+d.getMinutes() : d.getMinutes();';
                        daten += 'var s = (d.getSeconds() < 10) ? "0"+d.getSeconds() : d.getSeconds();';

                        daten += output + '  = h + ":" + m + ":" + s;';

                    } else if (PRG._scope.fbs[nr]["value"] == "date_k") {
                        daten += output + '  = ';
                        daten += 'd.getDate() + "." + (d.getMonth()+1) + "." + d.getFullYear();'

                    } else if (PRG._scope.fbs[nr]["value"] == "date_l") {
                        daten += output + '  = ';
                        daten += 'd.getDate() + "." + (d.getMonth()+1) + "." + d.getFullYear() + " " + d.getHours().toString() + ":" + d.getMinutes().toString();'
                    } else if (PRG._scope.fbs[nr]["value"] == "mm") {
                        daten += output + '  = ';
                        daten += 'd.getMinutes().toString();'

                    } else if (PRG._scope.fbs[nr]["value"] == "hh") {
                        daten += output + '  = ';
                        daten += 'd.getHours().toString();'

                    } else if (PRG._scope.fbs[nr]["value"] == "WD") {
                        daten += ' var weekday=new Array();';
                        daten += ' weekday[0]="Sonntag";';
                        daten += ' weekday[1]="Montag";';
                        daten += ' weekday[2]="Dienstag";';
                        daten += ' weekday[3]="Mittwoch";';
                        daten += ' weekday[4]="Donnerstag";';
                        daten += ' weekday[5]="Freitag";';
                        daten += ' weekday[6]="Samstag";';
                        daten += output + '  = ';

                        daten += 'weekday[d.getDay()];'

                    } else if (PRG._scope.fbs[nr]["value"] == "KW") {

                        daten += 'var KWDatum = new Date();';
                        daten += 'var DonnerstagDat = new Date(KWDatum.getTime() + (3-((KWDatum.getDay()+6) % 7)) * 86400000);';
                        daten += 'var KWJahr = DonnerstagDat.getFullYear();';
                        daten += 'var DonnerstagKW = new Date(new Date(KWJahr,0,4).getTime() +(3-((new Date(KWJahr,0,4).getDay()+6) % 7)) * 86400000);';
                        daten += 'var KW = Math.floor(1.5 + (DonnerstagDat.getTime() - DonnerstagKW.getTime()) / 86400000/7);';
                        daten += output + '  = KW;';

                    } else if (PRG._scope.fbs[nr]["value"] == "MM") {
                        daten += ' var month=new Array();';
                        daten += ' month[0]="Jannuar";';
                        daten += ' month[1]="Februar";';
                        daten += ' month[2]="März";';
                        daten += ' month[3]="April";';
                        daten += ' month[4]="Mai";';
                        daten += ' month[5]="Juni";';
                        daten += ' month[6]="Juli";';
                        daten += ' month[7]="August";';
                        daten += ' month[8]="September";';
                        daten += ' month[9]="Oktober";';
                        daten += ' month[10]="November";';
                        daten += ' month[11]="Dezember";';
                        daten += output + '  = ';
                        daten += 'month[d.getMonth()];'
                    } else if (PRG._scope.fbs[nr]["value"] == "roh") {
                        daten += output + '  = ';
                        daten += 'Date.now();'
                    }

                    daten += "";
                    Compiler.script += daten;
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "trigvalue") {
                    Compiler.script += output + ' = data.newState.value;';
                }
                if (this["type"] == "trigtime") {
                    Compiler.script += output + ' = data.newState.timestamp;';
                }
                if (this["type"] == "trigoldvalue") {
                    Compiler.script += output + ' = data.oldState.value;';
                }
                if (this["type"] == "trigoldtime") {
                    Compiler.script += output + ' = data.oldState.timestamp;';
                }
                if (this["type"] == "trigid") {
                    Compiler.script += output + ' = data.id;';
                }
                if (this["type"] == "trigname") {
                    Compiler.script += output + ' = data.name;';
                }
                if (this["type"] == "trigchid") {
                    Compiler.script += output + ' = data.channel.id;';
                }
                if (this["type"] == "trigchname") {
                    Compiler.script += output + ' = data.channel.name;';
                }
                if (this["type"] == "trigchtype") {
                    Compiler.script += output + ' = data.channel.type;';
                }
                if (this["type"] == "trigchfuncIds") {
                    Compiler.script += output + ' = data.channel.funcIds;';
                }
                if (this["type"] == "trigchroomIds") {
                    Compiler.script += output + ' = data.channel.roomIds;';
                }
                if (this["type"] == "trigchfuncNames") {
                    Compiler.script += output + ' = data.channel.funcNames;';
                }
                if (this["type"] == "trigchroomNames") {
                    Compiler.script += output + ' = data.channel.roomNames;';
                }
                if (this["type"] == "trigdevid") {
                    Compiler.script += output + ' = data.device.id;';
                }
                if (this["type"] == "trigdevname") {
                    Compiler.script += output + ' = data.device.name;';
                }
                if (this["type"] == "trigdevtype") {
                    Compiler.script += output + ' = data.device.type;';
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "oder") {
                    var n = this["input"].length;
                    Compiler.script += 'if(';
                    $.each(this["input"], function (index, obj) {
                        Compiler.script += obj.herkunft + ' == true';
                        if (index + 1 < n) {
                            Compiler.script += ' || ';
                        }
                    });
                    Compiler.script += '){var ' + this.output[0].ausgang + ' = true;}else{var ' + this.output[0].ausgang + ' = false;}'
                }
                if (this["type"] == "und") {
                    var n = this["input"].length;
                    Compiler.script += 'if(';
                    $.each(this["input"], function (index, obj) {
                        Compiler.script += obj.herkunft + ' == true';
                        if (index + 1 < n) {
                            Compiler.script += ' && ';
                        }
                    });
                    Compiler.script += '){var ' + this.output[0].ausgang + ' = true;}else{var ' + this.output[0].ausgang + ' = false;}'
                }
                if (this["type"] == "verketten") {
                    var n = this["input"].length;

                    this["input"].sort(SortByEingang);
                    Compiler.script += output + '  = ';
                    $.each(this["input"], function (index, obj) {
                        Compiler.script += obj.herkunft;
                        if (index + 1 < n) {
                            Compiler.script += ' + ';
                        }
                    });
                    Compiler.script += ';';
                }
                if (this["type"] == "timespan") {
                    Compiler.script += 'var now = new Date(); \
                    var time1 = new Date();\
                    var time2 = new Date();\
                    var in1 = ' + this["input"][0]["herkunft"] + ';\
                    var in2 = ' + this["input"][1]["herkunft"] + ';\
                    var double1 = in1.split(" ");\
                    var double2 = in2.split(" ");\
\
                    var time;\
                    var date1;\
                    var date2;\
\
                    if (double1[1]) {\
                        time = double1[1].split(":");\
                        date1 = double1[0].split(".");\
                        date2 = double1[0].split("-");\
                    } else {\
                        time = in1.split(":");\
                        date1 = in1.split(".");\
                        date2 = in1.split("-");\
                    }\
\
                    if (time.length == 2) {\
                        time1.setHours(time[0]);\
                        time1.setMinutes(time[1]);\
                    }\
\
                    if (time.length == 3) {\
                        time1.setHours(time[0]);\
                        time1.setMinutes(time[1]);\
                        time1.setSeconds(time[2]);\
                    }\
\
                    if (date2.length == 3) {\
                        if (date2[0].length == 4) {\
                            time1.setFullYear(date2[0]);\
                        } else {\
                            time1.setFullYear("20" + date2[0]);\
                        }\
                        time1.setMonth(date2[1] - 1);\
                        time1.setDate(date2[2]);\
                    }\
\
                    if (date1.length == 3) {\
                        if (date1[0].length == 4) {\
                            time1.setFullYear(date1[2]);\
                        } else {\
                            time1.setFullYear("20" + date1[2]);\
                        }\
                        time1.setMonth(date1[1] - 1);\
                        time1.setDate(date1[0]);\
                    }\
\
                    if (double2[1]) {\
                        time = double2[1].split(":");\
                        date1 = double2[0].split(".");\
                        date2 = double2[0].split("-");\
                    } else {\
                        time = in2.split(":");\
                        date1 = in2.split(".");\
                        date2 = in2.split("-");\
                    }\
\
                    if (time.length == 2) {\
                        time2.setHours(time[0]);\
                        time2.setMinutes(time[1]);\
                    }\
\
                    if (time.length == 3) {\
                        time2.setHours(time[0]);\
                        time2.setMinutes(time[1]);\
                        time2.setSeconds(time[2]);\
                    }\
\
                    if (date2.length == 3) {\
                        if (date2[0].length == 4) {\
                            time1.setFullYear(date2[0]);\
                        } else {\
                            time1.setFullYear("20" + date2[0]);\
                        }\
                        time2.setMonth(date2[1] - 1);\
                        time2.setDate(date2[2]);\
                    }\
\
                    if (date1.length == 3) {\
                        if (date1[0].length == 4) {\
                            time2.setFullYear(date1[2]);\
                        } else {\
                            time2.setFullYear("20" + date1[2]);\
                        }\
                        time2.setMonth(date1[1] - 1);\
                        time2.setDate(date1[0]);\
                    }\
\
                    if (time1.valueOf() < now.valueOf() && time2.valueOf() > now.valueOf()) {\
                        var ' + this.output[0].ausgang + ' = true;\
                    }else{\
                        var ' + this.output[0].ausgang + ' = false;\
                  }';
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "not") {
                    Compiler.script += output + '  = !' + this["input"][0]["herkunft"] + ';';
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "inc") {
                    Compiler.script += output + '  = ' + this["input"][0]["herkunft"] + '+1;';
                }
                if (this["type"] == "dec") {
                    Compiler.script += output + '  = ' + this["input"][0]["herkunft"] + '-1;';
                }
                if (this["type"] == "summe") {
                    var n = this["input"].length;
                    Compiler.script += output + '  = ';

                    $.each(this["input"], function (index, obj) {
                        Compiler.script += obj.herkunft;
                        if (index + 1 < n) {
                            Compiler.script += ' + ';
                        }
                    });
                    Compiler.script += ';';
                }
                if (this["type"] == "differenz") {
                    var n = this["input"].length;
                    Compiler.script += output + '  = ';

                    $.each(this["input"], function (index, obj) {
                        Compiler.script += obj.herkunft;
                        if (index + 1 < n) {
                            Compiler.script += ' - ';
                        }
                    });
                    Compiler.script += ';';
                }
                if (this["type"] == "round") {
                    Compiler.script += output + '  = Math.round( ' + this["input"][0]["herkunft"] + ' * Math.pow(10, ' + PRG._scope.fbs[nr]["value"] + ')) / Math.pow(10, ' + PRG._scope.fbs[nr]["value"] + ');';
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "toint") {
                    Compiler.script += output + '  = parseInt(' + this["input"][0]["herkunft"] + ');';
                }
                if (this["type"] == "tofloat") {
                    Compiler.script += output + '  = parseFloat(' + this["input"][0]["herkunft"] + '.replace("," , "."));';
                }
                if (this["type"] == "tostring") {
                    Compiler.script += output + '  = ' + this["input"][0]["herkunft"] + '.toString();';
                }
                if (this["type"] == "toh") {
                    Compiler.script += output + '  = parseFloat(' + this["input"][0]["herkunft"] + '/10/60/60);';
                }

                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "next") {
                    var targets = "";
                    $.each(this.target, function () {
                        targets += this[0] + "(data);"
                    });
                    Compiler.script += targets;
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "next1") {
                    var targets = "";
                    var $this = this;

                    $.each(this.target, function () {
                        targets += "if(" + $this["input"][0].herkunft + " != false && " + $this["input"][0].herkunft + " != undefined && " + $this["input"][0].herkunft + " != 0 ){" + this[0] + " (data);}";
                    });
                    Compiler.script += targets;

                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "next0") {
                    var targets = "";
                    var $this = this;

                    $.each(this.target, function () {
                        targets += "if(" + $this["input"][0].herkunft + " == false || " + $this["input"][0].herkunft + " == undefined || " + $this["input"][0].herkunft + " == ''){" + this[0] + " (data);}";
                    });
                    Compiler.script += targets;
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "wenn") {
                    this["input"].sort(SortByEingang);
                    Compiler.script += 'if(' + this["input"][0].herkunft + ' ' + PRG._scope.fbs[nr]["value"] + ' ' + this["input"][1].herkunft + '){var ' + this.output[0].ausgang + ' = true;}else{var ' + this.output[0].ausgang + ' = false;}';
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "expert") {

                    this["input"].sort(SortByEingang);

                    $.each(this["input"], function (id) {
                        Compiler.script += 'var in' + (id + 1) + ' = ' + this.herkunft + ' ;';
                    });
                    $.each(this["output"], function (id) {
                        Compiler.script += 'var out' + (id + 1) + ' = 0 ;';
                    });

                    if (PRG._scope.fbs[nr]["value"] != 0) {
                        Compiler.script += PRG._scope.fbs[nr]["value"] + "";
                    }

                    this["output"].sort(function (a, b) {
                        return a.ausgang > b.ausgang;
                    });

                    var last = "";
                    var index = 0;
                    $.each(this["output"], function () {
                        if (this.ausgang != last) {
                            last = this.ausgang;
                            index++;
                            Compiler.script += 'var ' + this.ausgang + ' = out' + (index) + ' ;';
                        }
                    });
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "linput") {
                    Compiler.script += output + ' = regaObjects[' + this.hmid + ']["Channels"];';
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "lfdevice") {

                    var data = "";
                    for (var i = 0; i < this.hmid.length; i++) {
                        data += 'regaObjects[regaObjects[' + this["input"][0].herkunft + '[i]]["Parent"]]["HssType"] == "' + this.hmid[i] + '" ';

                        if (i + 1 < this.hmid.length) {
                            data += '|| '
                        }
                    }

                    Compiler.script += output + ' = [];';
                    Compiler.script += 'for(var i = 0;i<' + this["input"][0].herkunft + '.length;i++){';
                    Compiler.script += '  if(regaObjects[' + this["input"][0].herkunft + '[i]]["Parent"] != undefined){;';
                    Compiler.script += '    if (' + data + '){';
                    Compiler.script += ' ' + this.output[0].ausgang + '.push(' + this["input"][0].herkunft + '[i]);';
                    Compiler.script += '    }';
                    Compiler.script += '    }';
                    Compiler.script += '}';
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "lfchannel") {

                    var data = "";
                    for (var i = 0; i < this.hmid.length; i++) {
                        data += 'regaObjects[' + this["input"][0].herkunft + '[i]]["ChnLabel"] == "' + this.hmid[i] + '" ';
                        if (i + 1 < this.hmid.length) {
                            data += '|| '
                        }
                    }

                    Compiler.script += output + ' = [];';
                    Compiler.script += 'for(var i = 0;i<' + this["input"][0].herkunft + '.length;i++){';
                    Compiler.script += '    if (' + data + '){';
                    Compiler.script += ' ' + this.output[0].ausgang + '.push(' + this["input"][0].herkunft + '[i]);';
                    Compiler.script += '    }';
                    Compiler.script += '};';
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "lfdp") {

                    var data = "";
                    for (var i = 0; i < this.hmid.length; i++) {
                        data += 'property == "' + this.hmid[i] + '" ';
                        if (i + 1 < this.hmid.length) {
                            data += '|| '
                        }
                    }

                    Compiler.script += output + ' = [];';
                    Compiler.script += 'for(var i = 0;i<' + this["input"][0].herkunft + '.length;i++){';
                    Compiler.script += 'var _dp = regaObjects[' + this["input"][0].herkunft + '[i]]["DPs"]';
                    Compiler.script += '    for(var property in _dp){';
                    Compiler.script += '        if(' + data + '){';
                    Compiler.script += '        ' + this.output[0].ausgang + '.push(_dp[property])';
                    Compiler.script += '        }';
                    Compiler.script += '    }';
                    Compiler.script += '};';
                }
                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
                if (this["type"] == "lfwert") {
                    Compiler.script += 'var _out1 = [];';
                    Compiler.script += 'var _out2 = [];';
                    Compiler.script += 'var _out3 = [];';

                    Compiler.script += 'for(var i = 0;i<' + this["input"][0].herkunft + '.length;i++){';
                    Compiler.script += 'if (regaObjects[' + this["input"][0].herkunft + '[i]]["ValueType"] == 4){';
                    Compiler.script += ' var val = getState(' + this["input"][0].herkunft + '[i]).toFixed(1) ';
                    Compiler.script += '}else{';
                    Compiler.script += ' var val = getState(' + this["input"][0].herkunft + '[i]) ';
                    Compiler.script += '}';
                    Compiler.script += '    if(val ' + PRG._scope.fbs[nr]["opt"] + ' ' + PRG._scope.fbs[nr]["opt2"].toString() + '  || ' + PRG._scope.fbs[nr]["opt2"].toString() + ' == ""){';
                    Compiler.script += '    _out1.push(val.toString());';
                    Compiler.script += '    _out2.push(regaObjects[regaObjects[' + this["input"][0].herkunft + '[i]]["Parent"]].Name);';
                    Compiler.script += '    _out3.push(regaObjects[regaObjects[regaObjects[' + this["input"][0].herkunft + '[i]]["Parent"]]["Parent"]].Name);';
                    Compiler.script += '    }';

                    this["output"].sort(function (a, b) {
                        return a.ausgang > b.ausgang;
                    });

                    var last = "";
                    var index = 0;

                    $.each(this["output"], function () {
                        if (this.ausgang != last) {
                            last = this.ausgang;
                            index++;
                            Compiler.script += '    ' + this.ausgang + ' = _out' + index + '.join("' + PRG._scope.fbs[nr]["opt3"] + '");';
                        }
                    });
                    Compiler.script += '}';
                }

                //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

                if (sim != false && this.output.length > 0) {
                    $.each(this.output, function () {
                        Compiler.script += 'simout("' + this.ausgang + '",' + this.ausgang + ');';
                    });
                }
                if (sim != false && this.output.length > 0 && this.force != undefined) {
                    var force = this.force;
                    $.each(this.output, function () {

                        if (force != undefined && this.force != NaN) {
                            if (force == "true") {
                                Compiler.force += 'var ' + this.ausgang + '_force = 1;';
                                Compiler.script += this.ausgang + ' = ' + this.ausgang + '_force;';
                            } else if (force == "false") {
                                Compiler.force += 'var ' + this.ausgang + '_force = 0;';
                                Compiler.script += this.ausgang + ' = ' + this.ausgang + '_force;';
                            } else if (isNaN(force)) {
                                Compiler.force += 'var ' + this.ausgang + '_force ="' + force + '";';
                                Compiler.script += this.ausgang + ' = ' + this.ausgang + '_force;';
                            } else {
                                Compiler.force += 'var ' + this.ausgang + '_force =' + parseInt(force) + ';';
                                Compiler.script += this.ausgang + ' = ' + this.ausgang + '_force;';
                            }
                        }
                    });
                }
                if (sim != false && this.output.length > 0 && ( this.force == undefined || this.force == NaN  )) {
                    $.each(this.output, function () {
                        Compiler.force += 'var ' + this.ausgang + '_force = undefined ;';
                        Compiler.script += this.ausgang + ' = ' + this.ausgang + '_force || ' + this.ausgang + ';';

                    });
                }

                if (sim == "step") {
                    var call = "";
                    if (this.output[0]) {
                        var reg = new RegExp("[var " + this.output[0].ausgang + "]+$");
                        Compiler.script = Compiler.script.replace(reg, this.output[0].ausgang)
                    }
                    if (all_in_box.length > (n + 1)) {
                        call = 'setTimeout(function(){ ' + idx + "_" + (n + 1) + '()},' + 1000  + ');'
                    }

                    Compiler.script += 'step_fbs_highlight(' + this.fbs_id + ');';
                    Compiler.script += call + '}';
                }
            });
            Compiler.script += '};\n';
        });

        Compiler.force += Compiler.script;
        Compiler.script = Compiler.force;
        return (Compiler.script);
    }
};