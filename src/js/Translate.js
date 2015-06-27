/**
 *  CCU-IO.ScripGUI
 *  http://github.com/smiling-Jack/CCU-IO.ScriptGUI
 *
 *  Copyright (c) 2013 Steffen Schorling http://github.com/smiling-Jack
 *  MIT License (MIT)
 *
 */

SGI = $.extend(true, SGI, {
    words : {

// Editor

        'ROOMS'                 : {'de': 'Räume',                    'en': 'Rooms',                       'ru': 'Комнаты'},
        'FUNCTIONS'             : {'de': 'Gewerke',                  'en': 'Functions',                   'ru': 'Роли'},
        'FAVORITE'              : {'de': 'Favoriten',                'en': 'Favorites',                   'ru': 'Часто используемые'},
        'Datei'                 : {'de': 'Datei',                    'en': 'File',                        'ru': 'Файл'},
        'Neu'                   : {'de': 'Neu',                      'en': 'New',                         'ru': 'Новый'},
        'Öffnen'                : {'de': 'Öffnen',                   'en': 'Open',                        'ru': 'Открыть'},
        'Vorlagen'              : {'de': 'Vorlagen',                 'en': 'Patterns',                    'ru': 'Образцы'},
        'Speichern'             : {'de': 'Speichern',                'en': 'Save',                        'ru': 'Сохранить'},
        'Speichern als'         : {'de': 'Speichern als',            'en': 'Save as',                     'ru': 'Сохранить как'},
        'Export'                : {'de': 'Exportieren',              'en': 'Export',                      'ru': 'Экспортировать'},
        'Einstellungen'         : {'de': 'Einstellungen',            'en': 'Settings',                    'ru': 'Настройки'},
        'Theme'                 : {'de': 'Theme',                    'en': 'Theme',                       'ru': 'Тема'},
        'Dark-Hive'             : {'de': 'Dark-Hive',                'en': 'Dark-Hive',                   'ru': 'Dark-Hive'},
        'Start'                 : {'de': 'Start',                    'en': 'Start',                       'ru': 'Start'},
        'humanity'              : {'de': 'humanity',                 'en': 'humanity',                    'ru': 'humanity'},
        'blitzer'               : {'de': 'blitzer',                  'en': 'blitzer',                     'ru': 'blitzer'},
        'Swanky Purse'          : {'de': 'Swanky Purse',             'en': 'Swanky Purse',                'ru': 'Swanky Purse'},
        'Compiler'              : {'de': 'Compiler',                 'en': 'Compiler',                    'ru': 'Компилятор'},
        'Zeige Script'          : {'de': 'Skript zeigen',            'en': 'Show script',                 'ru': 'Показать скрипт'},
        'Speicher Script'       : {'de': 'Skript speichern',         'en': 'Save script',                 'ru': 'Сохранить скрипт'},
        'Lösche Script'         : {'de': 'Skript löschen',           'en': 'Delete script',               'ru': 'Удалить скрипт'},
        'Help'                  : {'de': 'Hilfe',                    'en': 'Help',                        'ru': 'Помощь'},
        'Schnell Hilfe'         : {'de': 'Schnellhilfe',             'en': 'Quick help',                  'ru': 'Быстрая помощь'},
        'Tastenkominationen'    : {'de': 'Tastenkombinationen',      'en': 'Hot keys',                    'ru': 'Горячие клавиши'},
        'Video Tutorials'       : {'de': 'Video Tutorials',          'en': 'Video Tutorials',             'ru': 'Видео уроки'},
        'Develop'               : {'de': 'Erstellen',                'en': 'Develop',                     'ru': 'Разработка'},
        'Lade Datei'            : {'de': 'Lade Datei',               'en': 'Load file',                   'ru': 'Загрузить файл'},
        'MBS Image'             : {'de': 'MBS Image',                'en': 'MBS Image',                   'ru': 'MBS Image'},
        'FBS Image'             : {'de': 'FBS Image',                'en': 'FBS Image',                   'ru': 'FBS Image'},
        'New Struck'            : {'de': 'New Struck??',             'en': 'New Struck??',                'ru': 'Новая Struck??'},
        'Add FireBug'           : {'de': 'Add FireBug??',            'en': 'Add FireBug??',               'ru': 'Add FireBug??'},
        'Show Debugscript'      : {'de': 'Zeige Debug-Skript',       'en': 'Show debug script',           'ru': 'Показать отладочный скрипт'},
        'Datei:'                : {'de': 'Datei: ',                  'en': 'File: ',                      'ru': 'Файл: '},
        ' Live Test'            : {'de': ' Live-Test',               'en': ' Live test',                  'ru': ' Live test'},
        'Save Element'          : {'de': 'Als Vorlage speichern',    'en': 'Save as template',            'ru': 'Сохранить элемент'},  //ToDo RU
        'Öffne last'            : {'de': 'Öffne letztes Programm',   'en': 'Open last program',           'ru': 'Загрузить локально'}, //ToDo RU
        'Links Ausrichten'      : {'de': 'Links ausrichten',         'en': 'Align left',                  'ru': 'Выравнить слева'},
        'Rechts Ausrichten'     : {'de': 'Rechts ausrichten',        'en': 'Align right',                 'ru': 'Выравнить справа'},
        'Oben Ausrichten'       : {'de': 'Oben ausrichten',          'en': 'Align top',                   'ru': 'Выравнить сверху'},
        'Unten Ausrichten'      : {'de': 'Unten ausrichten',         'en': 'Align bottom',                'ru': 'Выравнить снизу'},
        'Diagonal Ausrichten'   : {'de': 'Diagonal ausrichten',      'en': 'Align diagonal',              'ru': 'Выравнить по диагонали'},
        'Zoom zuckrücksetzen'   : {'de': 'Zoom zurücksetzen',        'en': 'Reset zoom',                  'ru': 'Сбросить зум'},
        'Zoom In'               : {'de': 'Hinein zoomen',            'en': 'Zoom in',                     'ru': 'Увеличить'},
        'Zoom Out'              : {'de': 'Heraus zoomen',            'en': 'Zoom out',                    'ru': 'Уменьшить'},
        'An Grid fangen ON/OFF' : {'de': 'Am Gitter ausrichten An/Aus',  'en': 'Grid align On/Off',       'ru': 'Сетка Вкл/Выкл'},
        'Tooltip ON/OFF'        : {'de': 'Hinweise An/Aus',          'en': 'Tooltips On/Off',             'ru': 'Подсказки Вкл/Выкл'},
        'Scriptengine Neustarten':{'de': 'Neustart Script Engine',   'en': 'Restart script engine',       'ru': 'Перезапустить Scrip-Engine'},
        'Teste Script'          : {'de': 'Skript testen',            'en': 'Test script',                 'ru': 'Тестировать скрипт'},
        'Stop'                  : {'de': 'Stopp',                    'en': 'Stop',                        'ru': 'Стоп'},
        'Force entfernen'       : {'de': 'Vorgabe entfernen',        'en': 'Remove Override',             'ru': 'Удалить значение'},
        'Allgemein'             : {'de': 'Allgemein',                'en': 'General',                     'ru': 'Общие'},
        'Programme'             : {'de': 'Programme',                'en': 'Programs',                    'ru': 'Программа'},
        'Logic'                 : {'de': 'Logik',                    'en': 'Logic',                       'ru': 'Логические'},
        'Listen Filter'         : {'de': 'Listen-Filter',            'en': 'List filter',                 'ru': 'Фильтры'},
        'Get Set Var'           : {'de': 'Get/Set/Var',              'en': 'Get/Set/Var',                 'ru': 'Читать/Писать'},
        'Convert'               : {'de': 'Konvertieren',             'en': 'Convert',                     'ru': 'Конверт.'},
        'Math.'                 : {'de': 'Math.',                    'en': 'Math.',                       'ru': 'Матем.'},
        'Singel Trigger'        : {'de': 'Einzel-Trigger',           'en': 'Single Trigger',              'ru': 'Триггеры(один)'},
        'Zeit Trigger'          : {'de': 'Zeit-Trigger',             'en': 'Time Trigger',                'ru': 'Триггеры(время)'},
        'Trigger Daten'         : {'de': 'Triggerdaten',             'en': 'Trigger Data',                'ru': 'Триггеры(данные)'},
        'Expert'                : {'de': 'Experten-Bausteine',       'en': 'Expert blocks',               'ru': 'Эксперт'}, //ToDo RU
        'Mode'                  : {'de': 'Modus',                    'en': 'Mode',                        'ru': ''},//ToDo RU
        'Editor'                : {'de': 'Editor',                   'en': 'Editor',                      'ru': ''},//ToDo RU
        'GUI'                   : {'de': 'GUI',                      'en': 'GUI',                         'ru': ''},//ToDo RU
        'Update'                : {'de': 'Aktualisierung',           'en': 'Update',                      'ru': ''},//ToDo RU
        'Version ist:'          : {'de': 'Installierte Version: ',   'en': 'Installed version: ',         'ru': ''},//ToDo RU
        'Neuste Version:'       : {'de': 'Neueste Version: ',        'en': 'Latest version: ',            'ru': ''},//ToDo RU
        'register'              : {'de': 'Senden',                   'en': 'Send',                        'ru': ''},//ToDo RU
        'erstellung'            : {'de': 'Build: ',                  'en': 'Build: ',                     'ru': ''},//ToDo RU
        'ok'                    : {'de': 'ok',                       'en': 'ok',                          'ru': ''},//ToDo RU
        'path'                  : {'de': 'Pfad: ',                   'en': 'path: ',                      'ru': 'пластырь:'},//ToDo RU
        'select_datastore'      : {'de': 'Bitte wählen sie das Verzeichnis, in dem der ScriptGUI-Datastore enthalten ist bzw. erstellt werden soll.',
                                   'en': 'Please select the path for the ScriptGUI Datastore',
                                   'ru': ''},//ToDo RU
        'register_info'         : {'de': 'Bitte registrieren Sie Ihre Version<br>und<br>helfen sie mit, ScriptGUI zu verbessern',
                                   'en': 'Please register your copy<br>and<br>help to improve ScriptGUI',
                                   'ru': ''},//ToDo RU


// Setup Dialog
        'Auto update'           : {'de': 'Neue Version suchen',      'en': 'Search new version',          'ru': ''},//ToDo RU
        'Auto Codebox'          : {'de': 'Auto-Codebox',             'en': 'Auto Codebox',                'ru': ''},//ToDo RU


// Shortcut
        'links Klick'                      : {'de': 'Linksklick',                          'en': 'left click',                            'ru': 'левая кнопка'},
        'Markierung umschalten'            : {'de': 'Markierung umschalten',               'en': 'Toggle selection',                      'ru': 'Инвертировать выбор'},
        'Markierte Bausteine kopieren'     : {'de': 'Markierte Bausteine kopieren',        'en': 'Copy selected blocks ',                 'ru': 'Скопировать выбранные блоки'},
        'Alle markierten Bausteine löschen': {'de': 'Alle markierten Bausteine löschen',   'en': 'Delete selected blocks',                'ru': 'Удалить выбранные блоки'},

// MBS
        'delay_check'           : {
            'de': 'Alle laufenden Verzögerungen beenden',
            'en': 'Cancel all running delays',
            'ru': 'Остановить все запущеные таймауты'
        },
        'Abbruch'               : {'de': 'Abbrechen',                'en': 'Cancel',                      'ru': 'Отмена'},
        'Pause in Sekunden'     : {'de': 'Verzögerung in Sekunden',  'en': 'Delay duration in seconds',   'ru': 'Пауза в секундах'},
        'loop_n'                : {'de': 'Anzahl der Durchläufe',    'en': 'Number of cycles',            'ru': 'Число проходов'},
        'loop_delay'            : {'de': 'Verzögerung nach jedem Durchlauf in Sekunden',  'en': 'Delay after each cycle in seconds',     'ru': 'Пауза в секундах после каждого прохода'},



// FBS
        'Empfänger'             : {'de': 'Empfänger',                'en': 'Recipient',                 'ru': 'Получатель'},
        'Betreff'               : {'de': 'Betreff',                  'en': 'Subject',                     'ru': 'Заголовок'},
        'Text'                  : {'de': 'Text',                     'en': 'Text',                        'ru': 'Текст'},
        'roh'                   : {'de': 'roh',                      'en': 'raw',                         'ru': 'сырой'},
        'Monat_text'            : {'de': 'Monat (Text)',             'en': 'Month (Text)',                'ru': 'Месяц (текст)'},
        'Wochentag_text'        : {'de': 'Wochentag (Text)',         'en': 'Weekday (Text)',              'ru': 'День недели (текст)'},
        'KW'                    : {'de': 'Kalenderwoche',            'en': 'Week of year',                'ru': 'Неделя года'},/*KW für Kalenderwoche*/
        'Minute'                : {'de': 'Minute',                   'en': 'Minute',                      'ru': 'Минуты'},
        'Stunde'                : {'de': 'Stunde',                   'en': 'Hour',                        'ru': 'Час'},
        'Vergleichsoperator'    : {'de': 'Vergleichsoperator',       'en': 'comparison operator',         'ru': 'Оператор сравнения'},
        'no'                    : {'de': 'Zahl',                     'en': 'Number',                      'ru': 'Число'},
        'Anzahl Nachkommastellen': {'de': 'Anzahl Nachkommastellen', 'en': 'Number of decimal places',    'ru': 'Знаков после запятой'},

// Contextmenu
        'Entferne Element'      : {'de': 'Element löschen',          'en': 'Delete element',              'ru': 'Удалить'},
        'Eingang Hinzufügen'    : {'de': 'Eingang hinzufügen',       'en': 'Add input',                   'ru': 'Добавить вход'},
        'Add ID'                : {'de': 'ID hinzufügen',            'en': 'Add ID',                      'ru': 'Добавить ID'},
        'Add Zeit'              : {'de': 'Zeit hinzufügen',          'en': 'Add time',                    'ru': 'Добавить время'},
        'Add Astro'             : {'de': 'Astrofunktion hinzufügen', 'en': 'Add Astro function',          'ru': 'Добавить астровремя'},
        'Entferne ID'           : {'de': 'ID entfernen',             'en': 'Remove ID',                   'ru': 'Удалить ID'},
        'Add Gerät'             : {'de': 'Gerät hinzufügen',         'en': 'Add device',                  'ru': 'Добавить устройство'},
        'Entferne Gerät'        : {'de': 'Gerät entfernen',          'en': 'Remove device',               'ru': 'Удалить устройство'},
        'Add Kanal'             : {'de': 'Kanal hinzufügen',         'en': 'Add channel',                 'ru': 'Добавить канал'},
        'Add Datenpunkt'        : {'de': 'Datenpunkt hinzufügen',    'en': 'Add datapoint',               'ru': 'Добавить данные'},
        'Entferne Datenpunkt'   : {'de': 'Entferne Datenpunkt',      'en': 'Remove datapoint',            'ru': 'Удалить данные'},
        'Hintergrund'           : {'de': 'Hintergrund',              'en': 'Background',                  'ru': 'Фон'},
        'Rot'                   : {'de': 'Rot',                      'en': 'Red',                         'ru': 'красный'},
        'Grün'                  : {'de': 'Grün',                     'en': 'Green',                       'ru': 'зеленый'},
        'Gelb'                  : {'de': 'Gelb',                     'en': 'Yellow',                      'ru': 'желтый'},
        'Weiß'                  : {'de': 'Weiß',                     'en': 'White',                       'ru': 'белый'},
        'Schwarz'               : {'de': 'Schwarz',                  'en': 'Black',                       'ru': 'черный'},
        'Transparent'           : {'de': 'Transparent',              'en': 'Transparent',                 'ru': 'прозрачный'},
        'Schrift'               : {'de': 'Schriftart',               'en': 'Font',                        'ru': 'Шрифт'},
        'ID Auswahl'            : {'de': 'ID auswählen',             'en': 'Select ID',                   'ru': 'Выбрать ID'},
        'Add Force'             : {'de': 'Vorgabe hinzufügen',       'en': 'Add Force',                   'ru': 'Добавить значение'},
        'Del Force'             : {'de': 'Vorgabe entfernen',        'en': 'Remove Force',                'ru': 'Удалить значение'},
        'Autoformat'            : {'de': 'Autoformatierung',         'en': 'Autoformat',                  'ru': 'Автоформатирование'},
        'Entferne Kanal'        : {'de': 'Kanal entfernen',          'en': 'Remove Channel',              'ru': 'Удалить канал'},
        'Auto route'            : {'de': 'Verbindungsführung automatisch',   'en': 'Auto route',                  'ru': 'автоматический путь'}, // TODO ru ???  "Automatische verbindungsführung"


// ID Select Dialog
        'Name'                  : {'de': 'Name',                     'en': 'Name',                        'ru': 'Имя'},
        'Type / Gerät'          : {'de': 'Typ / Gerät',              'en': 'Type / Device',               'ru': 'Тип / Устройство'},
        'Raum'                  : {'de': 'Raum',                     'en': 'Room',                        'ru': 'Комната'},
        'Gewerk'                : {'de': 'Gewerk',                   'en': 'Role',                        'ru': 'Роль'},
        'Favorit'               : {'de': 'Favorit',                  'en': 'Favorite',                    'ru': 'Часто используемые'},
        'Gruppen'               : {'de': 'Gruppen',                  'en': 'Groups',                      'ru': 'Группы'},
        'Gerät'                 : {'de': 'Gerät',                    'en': 'Device',                      'ru': 'Устройство'},
        'Kanal'                 : {'de': 'Kanal',                    'en': 'Channel',                     'ru': 'Канал'},
        'Datenpunkt'            : {'de': 'Datenpunkt',               'en': 'Datapoint',                   'ru': 'Данные'},
        'Local'                 : {'de': 'Lokal',                    'en': 'Local',                       'ru': 'Локально'},
        'Objecte'               : {'de': 'Objekte',                  'en': 'Objects',                     'ru': 'Объекты'},
        'ID:'                   : {'de': 'ID: ',                     'en': 'ID: ',                        'ru': 'ID: '},
        'Name:'                 : {'de': 'Name: ',                   'en': 'Name: ',                      'ru': 'Имя: '},
        'Übernehmen'            : {'de': 'Übernehmen',               'en': 'Apply',                       'ru': 'Применить'},
        'Alarm'                 : {'de': 'Alarm'  ,                  'en': 'Alarm'  ,                     'ru': 'Alarm'},
        'Logical'               : {'de': 'Logical',                  'en': 'Logical',                     'ru': 'Logical'},
        'Boolean'               : {'de': 'Boolean',                  'en': 'Boolean',                     'ru': 'Boolean'},
        'String'                : {'de': 'String' ,                  'en': 'String' ,                     'ru': 'String'},
        'Number'                : {'de': 'Number' ,                  'en': 'Number' ,                     'ru': 'Number'},
        'Enum'                  : {'de': 'Enum'   ,                  'en': 'Enum'   ,                     'ru': 'Enum'},



// Quick-Help
        toint: {
            'de': 'Konvertiert den Eingangswert in eine Zahl.',
            'en': 'Converts the input value into a number.',
            'ru': 'Конвертирует входное значение в целочисленное число.'
        },
        tofloat: {
            'de': 'Konvertiert den Eingangswert in eine Gleitkommazahl.',
            'en': 'Converts the input value into a float.',
            'ru': 'Конвертирует входное значение в число с плавающей запятой.'
        },
        tostring: {
            'de': 'Konvertiert den Eingangswert in einen Text.',
            'en': 'Converts the input value into a string.',
            'ru': 'Конвертирует входное значение в текст.'
        },
        und: {
            'de': 'Logische UND-Verknüpfung. Wenn alle Eingänge 1 sind, ist der Ausgang auch 1.',
            'en': 'Logical "AND". If all inputs are 1, the output is 1 as well.',
            'ru': 'Логическое "и". Если все входы не равны нулю, то выход будет 1.'
        },
        oder: {
            'de': 'Logische ODER-Verknüpfung. Wenn ein Eingang 1 ist, ist der Ausgang auch 1',
            'en': 'Logical "OR". If one input is 1, the output is 1 as well',
            'ru': 'Логическое "или". Если один из входов не равен нулю, то выход будет 1'
        },
        not: {
            'de': 'Logische Negierung. Wenn der Eingang 1 ist, ist der Ausgang 0, und umgekehrt',
            'en': 'Logitcal "NOT". If input is 1, the output is 0, and vice versa.',
            'ru': 'Логическое "нет". Если вход не равен 0, то выход будет 0 и наоборот.'
        },
        verketten: {
            'de': 'Verbindet z.B. mehrere Texte miteinander.',
            'en': 'Concatenates e.g. strings with each other.',
            'ru': 'Соединяет текстовые переменные между собой.'
        },
        input: {
            'de': 'Liest den aktuellen Wert der hinterlegten ID von CCU.IO',
            'en': 'Reads the current value of the ID stored in CCU.IO.',
            'ru': 'Считывает актуальное значение для переменной с заданным ID из CCU.IO'
        },
        inputliste: {
            'de': 'Erstellt eine Kanal-ID-Liste entsprechend der Auswahl.',
            'en': 'Creates a list with channel IDs according to the selection.',
            'ru': 'Создаёт список с ID'
        },
        inputlocal: {
            'de': 'Liest den aktuellen Wert der lokalen Variablen ein.',
            'en': 'Reads the current value of the local variable.',
            'ru': 'Считывает актуальное значение локальной переменной.'
        },
 
        output: {
            'de': 'Setzt den Wert der hinterlegten ID über CCU.IO.',
            'en': 'Sets the value of the stored ID via CCU.IO.',
            'ru': 'Задаёт значение для переменной из CCU.IO с заданным ID.'
        },
        outputlocal: {
            'de': 'Setzt den Wert der hinterlegten lokalen Variablen.',
            'en': 'Sets the value of the stored local variable.',
            'ru': 'Задаёт значение локальной переменной.'
        },
        mail: {
            'de': 'Versendet eine E-Mail.<br><br>Zur Nutzung muss der E-Mail-Adapter in CCU.IO aktiviert sein.',
            'en': 'Sends an email.<br><br>Usage only possible with an activated email adapter in CCU.IO.',
            'ru': 'Отсылает электронное письмо.<br><br><b>Что бы использовать эту функцию, E-Mail драйвер должен быть активирован.'
        },
        debugout: {
            'de': 'Schreibt den Wert in die Datei ccu.io.log.<br><br>Log-Eintrag sieht wie folgt aus:<br>Skriptname prg_codebox_n -> WERT.',
            'en': 'Writes the value into ccu.io.log.<br><br>Log entry has the following format:<br>Script name prg_codebox_n -> VALUE.',
            'ru': 'Записывает значение в протокол CCU.IO<br><br>Записанная строка будет иметь следующий формат: ИмяСкрипта prg_codebox_n -> ЗНАЧЕНИЕ.'
        },
        'true': {
            'de': 'Der Ausgang ist immer 1.',
            'en': 'Output is 1.',
            'ru': 'Выход равняется 1.'
        },
        'false': {
            'de': 'Der Ausgang ist immer 0.',
            'en': 'Output is 0.',
            'ru': 'Выход равняется 0.'
        },
        zahl: {
            'de': 'Der Ausgang entspricht der eingegebenen Zahl.<br><br>Als Eingabe sind nur Dezimalzahlen möglich - das Dezimaltrennzeichen ist ".", zb. 123.45.',
            'en': 'The output is equal to the input number.<br><br>Only decimal digits are allowed with divider ".", e.g. 123.45.',
            'ru': '' //ToDo RU
        },
        string: {
            'de': 'Der Ausgang entspricht dem eingegebenen Text. Durch "Enter" hinzugefügte Zeilenumbrüche werden als Leerzeichen übernommen.' +
                  'Zusätzlich können Zeilenumbrüche durch \\n und Leerzeichen durch \\f hinzugefügt werden.',
            'en': 'The output is equal to the input string. Line breaks added with "Enter" are set as additional spaces. Set a new line with \\n and a space with \\f.',
            'ru': 'Выход равняется заданному тексту. Для новой строки и дополнительного пробела можно использовать символы \\n (new line) и \\f (space).'
        },
        vartime: {
            'de': 'Der Ausgang entspricht dem aktuellen Zeitpunkt im gewählten Format, z.B. :<br>hh:mm = 22:54<br>hh:mm:ss = 22:45:53<br>TT:MM:JJ = 15.01.2014<br>TT:MM:JJ hh:mm = 15.01.2014 22:45<br>' +
                'Minute = 54<br>Stunde = 22<br>KW = 3<br>Wochentag = Mittwoch<br>Monat = Januar',
            'en': 'The output depends on the actual timepoint in the selected format, e.g.:<br>hh:mm = 22:54<br>hh:mm:ss = 22:45:53<br>TT:MM:JJ = 15.01.2014<br>TT:MM:JJ hh:mm = 15.01.2014 22:45<br>' +
                'Minute = 54<br>Hour = 22<br>KW = 3<br>Week day = Monday<br>Month = January',
            'ru': 'Выход равняется заданному времени. Например:<br>hh:mm = 22:54<br>hh:mm:ss = 22:45:53<br>TT:MM:YY = 15.1.2014<br>TT:MM:YY hh:mm = 15.1.2014 22:45<br>' +
                'Минуты = 54<br>Часы = 22<br>KW = 3<br>День недели = Monday<br>Месяц = January'
        },
        trigvalue: {
            'de': 'Entspricht dem Wert des auslösenden Triggers zum Auslösezeitpunkt.<br><br>Nicht nutzbar bei Zeit-Triggern.',
            'en': 'Corresponds to the value of the release trigger.<br><br>Can not be used with time triggers.',
            'ru': 'Соответствует значению триггера во время его срабатывания.<br><br>Нельзя использовать с триггерами по времени.'
        },
        trigtime: {
            'de': 'Zeitpunkt der Trigger-Auslösung.<br><br>Nicht nutzbar bei Zeit-Trigger.',
            'en': 'Timepoint of the trigger release.<br><br>Can not be used with time triggers.',
            'ru': 'Время, когда сработал триггер.<br><br>Нельзя использовать с триггерами по времени.'
        },
        trigoldvalue: {
            'de': 'Entspricht dem alten Wert des auslösenden Triggers.<br><br>Nicht nutzbar bei Zeit-Triggern.',
            'en': 'Corresponds to the old value of the release trigger.<br><br>Can not be used with time triggers.',
            'ru': 'ru' // ToDo RU
        },
        trigoldtime: {
            'de': 'Zeitpunkt der vorhergehenden Auslösung.<br><br>Nicht nutzbar bei Zeit-Triggern.',
            'en': 'Timepoint of previous trigger event.<br><br>Can not be used with time triggers.',
            'ru': 'Время, когда сработал триггер в предыдущий раз.<br><br>Нельзя использовать с триггерами по времени.'
        },
        trigid: {
            'de': 'ID des auslösenden Triggers.<br><br>Nicht nutzbar bei Zeit-Triggern.',
            'en': 'ID of release trigger.<br><br>Can not be used with time triggers.',
            'ru': 'ID сработавшего триггера.<br><br>Нельзя использовать с триггерами по времени.'
        },
        trigname: {
            'de': 'Name des auslösenden Triggers.<br><br>Nicht nutzbar bei Zeit-Triggern.',
            'en': 'Name of release trigger.<br><br>Can not be used with time triggers.',
            'ru': 'Имя сработавшего триггера.<br><br>Нельзя использовать с триггерами по времени.'
        },
        trigtype: {
            'de': 'Typ des auslösenden Triggers.<br><br>Nicht nutzbar bei Zeit-Triggern.',
            'en': 'Type of release trigger.<br><br>Can not be used with time triggers.',
            'ru': 'Тип сработавшего триггера.<br><br>Нельзя использовать с триггерами по времени.'
        },
        trigdevid: {
            'de': 'Geräte-ID des auslösenden Triggers.<br><br>Nicht nutzbar bei Zeit-Triggern.',
            'en': 'Device ID of release trigger.<br><br>Can not be used with time triggers.',
            'ru': 'ID устройства сработавшего триггера.<br><br>Нельзя использовать с триггерами по времени.'
        },
        trigdevname: {
            'de': 'Gerätename des auslösenden Triggers.<br><br>Nicht nutzbar bei Zeit-Triggern.',
            'en': 'Device name of release trigger<br><br>Can not be used with time triggers.',
            'ru': 'Тип устройства сработавшего триггера<br><br>Нельзя использовать с триггерами по времени.'
        },
        trigdevtype: {
            'de': 'Gerätetyp des auslösenden Triggers.<br><br>Nicht nutzbar bei Zeit-Triggern.',
            'en': 'Device type of release trigger<br><br>Can not be used with time triggers.',
            'ru': 'Имя устройства сработавшего триггера<br><br>Нельзя использовать с триггерами по времени.'
        },
        codebox: {
            'de': 'Programmboxen bilden die Basis jedes Skripts und müssen immer mit mindestens einem Trigger verbunden sein.'+
                '<br><br>In einer Programmbox werden dann die Funktionsbausteine per Drag und Drop aus der Toolbox platziert.',
            'en': 'Program boxes are the basis of every script and must be connected with at least one trigger.' +
                '<br><br>The function blocks of the tool box can be placed by drag\'n drop into the respective program box.',
            'ru': 'Программы являются основой для всех скриптов и должны быть связаны с триггером, для того, что бы они выполнялись.<br><br>' +
                'Функциональные блоки пожно "перетащить" мышкой из инструментария.'
        },
        brake: {
            'de': 'Fügt eine Verzögerung ein.<br><br>Nach Aufruf des Starteingangs wird die Verzögerung gestartet. ' +
                'Bei Aufruf von "Abbrechen" wird die Verzögerung abgebochen und die verbundenen Programmboxen werden <b>nicht</b> ausgeführt. '+
                'Wenn "laufende Verzögerungen beenden" gewählt wird, startet ein weiterer Aufruf des Starteingangs die Verzögerung neu und verwirft die alte Verzögerung.'+
                '<br><br>Die Eingabe der Verzögerungszeit erfolgt in Sekunden, wobei z.B. auch 0.5 erlaubt ist.',
            'en': 'Inserts a delay.<br><br>The delay starts after calling the input.' +
            	'When triggering the "Cancel" input, the delay will be canceled and the connected program boxed will <b>not</b> be executed.' +
            	'When using "Cancel running delays", a new call of the start input re-starts the delay and cancels the old delay.'+
                '<br><br>The value of the delay is set in seconds. However, float values, e.g. 0.5 for half of a second, can be used as well.',
            'ru': 'Вставляет паузу.<br><br>Пауза отсчитывается после того, как вызван вход. '+
                '<br><br>Длительность задаётся в секундах, но можно использовать и дробные значения. Например, 0.5 это пол-секунды.'
        },
        intervall: {
            'de': 'Ruft die verbundenen Programboxen im Intervall auf.<br><br>'+
                'Nach Aufruf des Starteingangs wird das Interval gestartet. Bei Aufruf von "Abbrechen" wird das Intervall beendet.<br><br>' +
                'Die Eingabe der Intervallzeit erfolgt in Sekunden, wobei z.B. auch 0.5 erlaubt ist.',
            'en': 'Calls the connected program box periodically.<br><br>'+
                'The respective interval starts after calling the start input. The interval will stop after calling "Cancel".<br><br>' +
                'The interval can be set in seconds. However, float values, e.g. 0.5 for half of a second, can be used as well.',
            'ru': 'Переодически вызывает привязанную программу.<br><br>'+
                'Вызовы стартуются если вызван вход Start. Переодические вызовы останавливаются если вызвать вход Cancel.<br><br>' +
                'Длительность задаётся в секундах, но можно использовать и дробные значения. Например, 0.5 это пол-секунды.'
        },
        loop: {
            'de': 'Ruft die verbundenen Programboxen entsprechend der eingegebenen Schleifenanzahl auf. Zwischen den Aufrufen erfolgt eine Pause entsprechend der Zeitangabe.<br><br>'+
                'Nach Aufruf des Starteingangs wird die Schleife gestartet. Bei Aufruf von "Abbrechen" wird die Schleife beendet.<br><br>' +
                'Die Eingabe der Zeiten erfolgt in Sekunden, wobei z.B. auch 0.5 erlaubt ist.',
            'en': 'Calls the connected programm box defined number of times. The pause can be defined between ths calls.<br><br>'+
                'The executing starts after call of start input. The calls stop if Cancel input called.Programboxen' +
                'The pause can be set in seconds. Values as 0.5 are alowed too.',
            'ru': 'Вызывает привязанную программу заданное число раз. Между вызовами можно задать паузу.<br><br>'+
                'Вызовы стартуются если вызван вход Start. Вызовы прекращаются если вызвать вход Cancel.<br><br>' +
                'Длительность паузы задаётся в секундах, но можно использовать и дробные значения. Например, 0.5 это пол-секунды.'
        },
        block_t: {
            'de': 'Dieser Baustein blockiert den Aufruf von Programboxen oder anderen Bausteinen:<br><br>Nach em Aufruf für die eingestellte Dauer.<br><br>Die Zeit entspicht Millisekunden.',
            'en': 'Blocks the call of function boxes:<br><br>After the call for the set duration<br><br>The time is set in milliseconds.',
            'ru': '' //ToDo RU
        },
        block_kn: {
            'de': 'Dieser Baustein blockiert den Aufruf von Programboxen oder anderen Bausteinen:<br><br>Solage wie die Summe aller Aufrufe kleiner ist als der eingestellte Wert.',
            'en': 'Blocks the call of function boxes:<br><br>As long as the sum of all calls is less then the set value.',
            'ru': '' //ToDo RU
        },
        block_gn: {
            'de': 'Dieser Baustein blockiert den Aufruf von Programboxen oder anderen Bausteinen:<br><br>Wenn die Summe aller Aufrufe größer ist als der eingestellte Wert.',
            'en': 'Blocks the call of function boxes:<br><br>If the sum of all calls is larger then the set value.',
            'ru': '' //ToDo RU
        },
        block_e: {
            'de': 'Dieser Baustein blockiert den Aufruf von Programboxen oder anderen Bausteinen:<br><br>Ausser jedes x´te mal<br><br>Der erste Aufruf wird ausgeführt.',
            'en': 'Blocks the call of function boxes:<br><br>Except any x´th time.<br><br>The firt call will be executed.',
            'ru': '' //ToDo RU
        },
        block_tn: {
            'de': 'Dieser Baustein blockiert den Aufruf von Programboxen oder anderen Bausteinen:<br><br>Ausser wenn auf Anzahl der Aufrufe in der eingestellten Zeit den eingestellten Wert erreicht. Erfolgt ein weiterer Aufruf danach, beginnt die Zeit und Zählung von vorn.',
            'en': 'Blocks the call of function boxes:<br><br>Except if the number of calls in the set time exceed the set number. The Counter will re-start when an additional call happens.',
            'ru': '' //ToDo RU
        },
        block_tt: {
            'de': 'Dieser Baustein blockiert den Aufruf von Programboxen oder anderen Bausteinen:<br><br>Ausser im Zeitraum von Time1 bis Time2.<br><br>Tageswechsel werden unterstützt, z.B.:<br>Time1="23:00"<br> und <br>Time2 ="01:00"',
            'en': 'Blocks the call of function boxes:<br><br>Except in the period between Time1 and Time2<br><br>By using e.g. <br>Time1="23:00"<br> und <br>Time2 ="01:00" also the change beween days is possible.', // ToDo En :-)
            'ru': '' //ToDo RU
        },
        next: {
            'de': 'Ruft weitere Programmboxen auf.',
            'en': 'Calls the next program boxes.',
            'ru': 'Вызывает следующую программу.'
        },
        next1: {
            'de': 'Ruft weitere Programmboxen auf, wenn der Eingang 1 oder true ist.',
            'en': 'Calls the next program boxes, if the input is not 1 or true.',
            'ru': 'Вызывает следующую программу, если вход не 0.'
        },
        next0: {
            'de': 'Ruft weitere Programmboxen auf, wenn der Eingang 0 oder false ist.',
            'en': 'Calls the next program boxes, if the input 0 or false.',
            'ru': '' //ToDo RU
        },
        komex: {
            'de': 'Kommentarbox ohne weitere Funktion.',
            'en': 'Comment box without other functionality.',
            'ru': 'Просто коментарий или пояснение к программе.'
        },
        ccuobj: {
            'de': 'Legt eine Variable in CCU.IO an.<br><br>Dies kann eine Zahl, Text oder auch eine Liste mehrerer Werte/Texte sein.<br><br>' +
                'Hinweis:<br>Beim neustarten der Scriptengine verliert diese Variable ihren Wert !',
            'en': 'Creates a variable in CCU.IO<br><br>It can be string, number, float or a list of strings/numbers.<br><br>' +
                'Note:<br>After restart of CCU.IO the value of the variable will be lost!',
            'ru': 'Создаёт переменную в CCU.IO.<br><br>Она может быть текстовой, числовой или списком.<br><br>' +
                'Замечание: после перезапуска CCU.IO значение переменной потеряется!<br>'
        },
        ccuobjpersi: {
            'de': 'Legt eine Variable in CCU.IO an.<br><br> Dies kan eine Zahl, Text oder auch eine Liste mehrerer Werte/Texte sein.<br><br>' +
                'Hinweis:<br> Beim neustarten der Scriptengine verliert diese Variable <b style="color: red">nicht</b> ihren Wert !',
            'en': 'Creates the variable in CCU.IO<br><br>It can be string, number, float or a list of strings/numbers.<br><br>' +
                'Note:<br>After restart of CCU.IO the value of the variable will be <b style="color: red">restored</b>!',
            'ru': 'Создаёт переменную в CCU.IO.<br><br>Она может быть текстовой, числовой или списком.<br><br>' +
                'Замечание: после перезапуска CCU.IO значение переменной <b style="color: red">сохрантся</b>!<br>'
        },
        trigger_event: {
            'de': 'Dieser Trigger führt die verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisiert wird.',
            'en': 'This trigger executes the linked program boxes,<br><br>if one of the defined IDs has been updated.',
            'ru': 'Триггер вызывает привязанную программу,<br><br>если значение одного из заданных ID обновится.'
        },
        trigger_EQ: {
            'de': 'Dieser Trigger führt die verbundenen Programmboxen aus:<br><br>' +
                'Wenn eine der hinterlegten IDs aktualisiert wurde und der Wert gleich geblieben ist.',
            'en': 'This trigger executes the linked program boxes,<br><br>if one of the defined IDs has been updated but the value is the same.',
            'ru': 'Триггер вызывает привязанную программу,<br><br>если значение одного из заданных ID обновится, но значение не изменилось.'
        },
        trigger_NE: {
            'de': 'Dieser Trigger führt die verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisiert wurde und der Wert sich geändert hat.',
            'en': 'This trigger executes the linked program boxes,<br><br>if one of the defined IDs has been updated and the value has changed.',
            'ru': 'Триггер вызывает привязанную программу,<br><br>если значение одного из заданных ID обновится и значение изменилось.'
        },
        trigger_GT: {
            'de': 'Dieser Trigger führt die verbundenen Programmboxen aus:<br><br>Wenn eine der hinterlegten IDs aktualisiert wurde und der Wert größer geworden ist.',
            'en': 'This trigger executes the linked program boxes,<br><br>if one of the defined IDs has been updated and the value is higher.',
            'ru': 'Триггер вызывает привязанную программу,<br><br>если значение одного из заданных ID обновилось и увеличилось.'
        },
        trigger_GE: {
            'de': 'Dieser Trigger führt die verbundenen Programmboxen aus:<br><br>' +
                'Wenn eine der hinterlegten IDs aktualisiert wurde und der Wert größer geworden oder gleich geblieben ist.',
            'en': 'This trigger executes the linked program boxes,<br><br>if one of the defined ID has been updated and the value is higher or equal.',
            'ru': 'Триггер вызывает привязанную программу,<br><br>если значение одного из заданных ID обновилось и увеличилось или не изменилось.'
        },
        trigger_LT: {
            'de': 'Dieser Trigger führt die verbundenen Programmboxen aus:<br><br>' +
                'Wenn eine der hinterlegten IDs aktualisiert wurde und der Wert kleiner geworden ist.',
            'en': 'This trigger executes the linked program boxes,<br><br>if one of the defined IDs has been updated and the value is smaller.',
            'ru': 'Триггер вызывает привязанную программу,<br><br>если значение одного из заданных ID обновилось и уменьшилось.'
        },
        trigger_LE: {
            'de': 'Dieser Trigger führt die verbundenen Programmboxen aus:<br><br>' +
                'Wenn eine der hinterlegten IDs aktualisiert wurde und der Wert kleiner geworden oder gleich geblieben ist',
            'en': 'This trigger executes the linked program boxes,<br><br>if one of the defined IDs has been updated and the value is smaller or equal.',
            'ru': 'Триггер вызывает привязанную программу,<br><br>если значение одного из заданных ID обновилось и уменьшилось или не изменилось.'
        },
        trigger_valNe: {
            'de': 'Dieser Trigger führt die verbundenen Programmboxen aus:<br><br>' +
                'Wenn eine der hinterlegten IDs aktualisiert wurde und der Wert nicht 0 ist',
            'en': 'This trigger executes the linked program boxes,<br><br>' +
                'if one of the defined IDs has been updated and the value is not 0.',
            'ru': 'Триггер вызывает привязанную программу,<br><br>если значение одного из заданных ID обновилось и не равно 0.'
        },
        trigger_val: {
            'de': 'Dieser Trigger führt die verbundenen Programmboxen aus:<br><br>' +
                'Wenn eine der hinterlegten IDs aktualisiert wurde und gemäß gewähltem Vergleichsoperator dem eingegebenen Wert entspricht oder nicht<br><br>' +
                '<b>Mögliche Werte für den Vergleich:</b><br>z.B. true, false, 1, -2, 345, 67.89, "Text"',
            'en': 'This trigger executes the linked program boxes,<br><br>' +
                'if one of the defined IDs has been updated and the value is equal to defined value.',
            'ru': 'Триггер вызывает привязанную программу,<br><br>если значение одного из заданных ID обновилось и равно заданному значению.'
        },
        trigger_time: {
            'de': 'Dieser Trigger führt die verbundenen Programmboxen aus:<br><br>' +
                'Zum definierten Zeitpunkt.<br><br>Mögliche Werte zb. 20:01, 9:00, 2:3, ...',
            'en': 'This trigger executes the linked program boxes,<br><br>at the defined timepoint.<br><br>Possible values e.g. 20:01, 9:00, 2:3, ...',
            'ru': 'Триггер вызывает привязанную программу,<br><br>???' // ToDo RU
        },
        trigger_vartime: {
            'de': 'Dieser Trigger führt die verbundenen Programmboxen aus:<br><br>' +
                'Wenn der Wert eines hinterlegten CCU.IO Objekts gleich der aktuellen Zeit ist. Die Überprüfung findet minütlich statt.<br><br>' +
                '<b>Hinweis:</b><br>Die Werte der Objekte müssen im Format "hh:mm" sein,<br> zb. 01:23 12:34 12:01',
            'en': 'This trigger executes the linked program boxes,<br><br>' +
                'if the value of the CCU.IO object is equal to the actual time. The check is done every minute.<br><br>' +
                '<b>Note:</b><br>The values of the object must have follwoing format: "hh:mm"<br> e.g. 01:23 12:34 12:01',
            'ru': 'Триггер вызывает привязанную программу,<br><br>' +
                'если ЗНАЧЕНИЕ переменной из CCU.IO равняется настоящему времени. Сравнение происходит по-минутно.<br><br>' +
                '<b>Замечание:</b><br>Значения переменной должны иметь следующий формат: hh:mm<br> Например, 01:23 12:34 12:01'
        },
        trigger_zykm: {
            'de': 'Dieser Trigger führt die verbundenen Programmboxen alle X Minuten nach Start der Scriptengine aus.',
            'en': 'This trigger executes the linked program boxes every X minutes after the start of script engine.<br><br>',
            'ru': 'Триггер вызывает привязанную программу каждые X минут после старта Script-Engine.'
        },
        trigger_astro: {
            'de': 'Dieser Trigger führt die verbundenen Programmboxen entsprechent dem Sonnenstand aus.' +
                '<br><br>Hinweis:<br>Es werden die Längen- und Breitengradeinstellungen aus den CCU.IO Einstellungen genutzt.' +
                '<br><br><b>Shift:</b><br>Offset für den Astrozeitpunkt in Minuten. Es sind auch negative Eingaben möglich.' +
                '<br><br><b>Sonnenaufgang Start:</b><br> Sonne erscheint am Horizont<br><b>Sonnenaufgang Ende:</b>' +
                '<br>Sonne ist vollständig am Horizont zu sehen<br><b>Höchster Sonnenstand:</b>' +
                '<br>Sonne ist am höchsten Punkt<br><b>Sonnenuntergang Start:</b>' +
                '<br>Sonne berührt den Horizont<br><b>Sonnenuntergang Ende:</b>' +
                '<br>Sonne ist vollständig untergegangen<br><b>Nacht Start:</b>' +
                '<br>Beginn der astronomischen Nacht<br><b>Nacht Ende:</b>' +
                '<br>Ende der astronomischen Nacht<br><b>Dunkelster moment:</b><br> Sonne ist am tiefsten Punkt',
            'en': 'This trigger executes the linked program box according to the sun position.' +
                '<br><br>Note:<br>The longitude and latitude must be set up valid in the CCU.IO settings.' +
                '<br><br><b>Shift:</b><br>Offset to the astro event in minutes. Negative values are allowed too.' +
                '<br><br><b>Sunrise start:</b><br>The sun is at horizont.<br><b>Sunrise end:</b>' +
                '<br>The sun can be seen full at horizont.<br><b>Zenit:</b>' +
                '<br>The sun is in the high position.<br><b>Sunset start:</b>' +
                '<br>The sun touchs the horizont<br><b>Sunset end:</b>' +
                '<br>Ths sun is hidden behind the horizont<br><b>Night start:</b>' +
                '<br>Start of the astronomical night<br><b>Night end:</b>' +
                '<br>End of the astronomical night<br><b>Darkest position:</b><br>The sun is in the lowest position',
            'ru': 'Триггер вызывает привязанную программу в зависимости от положения солнца.' +
                '<br><br>Замечание:<br>Долгота и широта в настройках CCU.IO должны быть заданны правильно.' +
                '<br><br><b>Сдвиг:</b><br>Сдвиг в минутах по отношению к астрологическому событию. Можно задавать отрицательные значения.' +
                '<br><br><b>Начало восхода:</b><br>The sun is at horizont.<br><b>Конец восхода:</b>' +
                '<br>The sun can be seen full at horizont.<br><b>Зенит:</b>' +
                '<br>The sun is in the high position.<br><b>Начало захода:</b>' +
                '<br>The sun touchs the horizont<br><b>Конец захода:</b>' +
                '<br>Ths sun is hidden behind the horizont<br><b>Начало ночи:</b>' +
                '<br>Start of the astronomical night<br><b>Конец ночи:</b>' +
                '<br>End of the astronomical night<br><b>Надир:</b><br>The sun is in the lowest position'
        },
        trigger_start: {
            'de': 'Dieser Trigger führt die verbundenen Programmboxen einmalig beim Start/Neustart der Scriptengine aus.',
            'en': 'This trigger executes the linked program box once at start or restart of the script engine.',
            'ru': 'Триггер вызывает привязанную программу один раз при старте Scrip-Engine или её перезапуске.'
        },
        wenn: {
            'de': 'Dieser Baustein vergleicht den Eingang "In" mit dem Eingang "Rev" und liefert bei Übereinstimmung den Wert 1 zurück.<br><br>' +
                'Mögliche Vergleichsoperatoren:'+
                '<br>= &nbsp: In <b>gleich</b> Rev<br>'+
                '!= : In <b>ungleich</b> Rev<br>'+
                '< &nbsp: In <b>kleiner</b> Rev<br>'+
                '> &nbsp: In <b>größer</b> Rev<br>'+
                '<=: In <b>kleiner oder gleich</b> Rev<br>'+
                '>=: In <b>größer oder gleich</b> Rev<br><br>'+
                'Hinweis:<br>'+
                'Beim Vergleichen von Zeitangaben ist:<br>'+
                '10:00 <b>kleiner</b> 9:00<br>und:<br>'+
                '10:00 <b>größer</b> 09:00',
            'en': 'This block compares the input "In" with value of "Rev" and returns 1 if true.<br><br>' +
                'Possible comparations:'+
                '<br>= &nbsp: In <b>equal</b> Rev<br>'+
                '!= : In <b>not equal</b> Rev<br>'+
                '< &nbsp: In <b>smaller</b> Rev<br>'+
                '> &nbsp: In <b>greater</b> Rev<br>'+
                '<=: In <b>smaller or equal</b> Rev<br>'+
                '>=: In <b>greater or equal</b> Rev<br><br>'+
                'Note:<br>'+
                'For time comparations:<br>'+
                '10:00 <b>smaller</b> 9:00<br>and:<br>'+
                '10:00 <b>greater</b> 09:00',
            'ru': 'Этот блок сравнивает вход In со входом "Rev" и выдает 1, если сравнение истинно.<br><br>' +
                'Варианты сравнений:'+
                '<br>= &nbsp: In <b>равно</b> Rev<br>'+
                '!= : In <b>не равно</b> Rev<br>'+
                '< &nbsp: In <b>меньше</b> Rev<br>'+
                '> &nbsp: In <b>больше</b> Rev<br>'+
                '<=: In <b>меньше или равно</b> Rev<br>'+
                '>=: In <b>больше или равно</b> Rev<br><br>'+
                'Замечание:<br>'+
                'Если сравнивать значения времени:<br>'+
                '10:00 <b>меньше</b> 9:00<br>и:<br>'+
                '10:00 <b>больше</b> 09:00'
        },
        timespan: {
            'de': 'Dieser Baustein vergleicht ob der aktuelle Zeitpunkt zwischen "Start" und "Stop" liegt und liefert bei Übereinstimmung den Wert 1 zurück.'+
                '<br><br><b>Mögliche Eingangsformatierungen sind:</b><br>hh:mm<br>hh:mm:ss<br>' +
                'TT.MM.JJJJ (es geht aus immer T.M.JJ)<br>JJJJ-MM-TT (es geht aus immer JJ-M-T)' +
                '<br><br>Bei Kombination von Datum und Uhrzeit ist das Leerzeichen Wichtig!<br> TT.MM.JJJJ hh:mm<br>TT.MM.JJJJ hh:mm:ss<br>JJJJ-MM-TT hh:mm<br>JJJJ-MM-TT hh:mm:ss',
            'en': 'This block compares if the actual timepoint is between "Start" and "Stop" and returns the result as 1 (yes) or 0 (no).' +
                '<br><br><b>Valid input formats are:</b><br>hh:mm<br>hh:mm:ss<br>' +
                'DD.MM.YYYY (D.M.YY is valid too)<br>YYYY-MM-DD (YY-M-D is valid too)' +
                '<br><br>When combining date and time the space is very important!<br>DD.MM.YYYY hh:mm:ss<br>YYYY-MM-DD hh:mm<br>YYYY-MM-DD hh:mm:ss',
            'ru': 'Этот блок проверяет лежит ли актуальное время между "Start" и "Stop" и выдаёт результат: 1(да) или 0(нет).' +
                '<br><br><b>Форматы ввода:</b><br>hh:mm<br>hh:mm:ss<br>' +
                'DD.MM.YYYY (D.M.YY тоже возможно)<br>YYYY-MM-DD (YY-M-D тоже возможно)' +
                '<br><br>Если задавать ещё и время, то пробел очень важен!<br>DD.MM.YYYY hh:mm:ss<br>YYYY-MM-DD hh:mm<br>YYYY-MM-DD hh:mm:ss'
        },
        inc: {
            'de': 'Dieser Baustein <b>erhöht</b> den Eingangswert um 1.',
            'en': 'This block <b>increases</b> the input value by one.',
            'ru': 'Этот блок <b>увеличивает</b> значение на входе на один.'
        },
        dec: {
            'de': 'Dieser Baustein <b>verringert</b> den Eingangswert um 1.',
            'en': 'This block <b>decrements</b> the input value by one.',
            'ru': 'Этот блок <b>уменьшает</b> значение на входе на один.'
        },
        summe: {
            'de': 'Dieser Baustein addiert alle Eingänge.',
            'en': 'This block adds all input values.',
            'ru': 'Этот блок складывает значения всех входов вместе.'
        },
        differenz: {
            'de': 'Dieser Baustein subtrahiert alle Eingänge von Eingang In1.',
            'en': 'This block substracts all other inputs from In1.',
            'ru': 'Этот блок отнимает значение всех входов (кроме первого) от первого входа (In1).'
        }


    },

    translate: function (text) {
        SGI.language = scope.setup.lang;
        if (SGI.words[text]) {
            if (SGI.words[text][SGI.language] != '')
               return SGI.words[text][SGI.language];
            else if (SGI.words[text]["de"])
                console.warn("Keine Übersätzung für "+ text + " in "+ SGI.language +" gefunden");
            return SGI.words[text]["de"];
        }else{
//          console.warn(text);
            return text;
        }
    }
});
