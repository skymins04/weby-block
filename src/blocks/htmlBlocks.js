import * as Blockly from 'blockly';

Blockly.defineBlocksWithJsonArray([
    {
        "type": "htmltag_html",
        "message0": "html 태그",
        "message1": "head %1",
        "args1": [{"type": "input_statement", "name": "INNER0"}],
        "message2": "body %1",
        "args2": [{"type": "input_statement", "name": "INNER0"}],
        "colour": '45',
        "style": {
            "hat": "cap"
        }
    },
    {
        "type": "htmltag_meta",
        "message0": "meta 태그 %1",
        "args0": [{"type": "input_value", "name": "ARG0", "check": "Args"}],
        "nextStatement": null,
        "previousStatement": null,
        "colour": '45'
    },
    {
        "type": "htmltag_link",
        "message0": "link 태그 %1",
        "args0": [{"type": "input_value", "name": "ARG0", "check": "Args"}],
        "nextStatement": null,
        "previousStatement": null,
        "colour": '45'
    },
    {
        "type": "htmltag_title",
        "message0": "title 태그",
        "message1": "%1",
        "args1": [{"type": "input_statement", "name": "INNER0"}],
        "nextStatement": null,
        "previousStatement": null,
        "colour": '45'
    },
    {
        "type": "htmltag_script",
        "message0": "script 태그 %1",
        "args0": [{"type": "input_value", "name": "ARG0", "check": "Args"}],
        "nextStatement": null,
        "previousStatement": null,
        "colour": '45'
    },
]);