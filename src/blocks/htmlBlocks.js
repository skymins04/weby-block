import * as Blockly from 'blockly';
import { Block } from '../Blockly';

Blockly.defineBlocksWithJsonArray([
    {
        "type": "htmlblock_html",
        "message0": "HTML",
        "message1": "헤드 %1",
        "args1": [{"type": "input_statement", "name": "INNER0"}],
        "message2": "바디 %1",
        "args2": [{"type": "input_statement", "name": "INNER0"}],
        "colour": "1",
        "style": {
            "hat": "cap"
        }
    },
    {
        "type": "htmlblock_title",
        "message0": "사이트 제목 %1",
        "args0": [{"type": "field_input", "name": "ARG0", "text": "weby website", "spellcheck": false}],
        "nextStatement": null,
        "previousStatement": null,
        "colour": "1"
    },
    {
        "type": "htmlblock_div",
        "message0": "영역 %1",
        "args0": [{"type": "input_value", "name": "ARG0", "check": "Args"}],
        "message1": "%1",
        "args1": [{"type": "input_statement", "name": "INNER0"}],
        "nextStatement": null,
        "previousStatement": null,
        "colour": "1"
    },
    {
        "type": "htmlalt_class",
        "message0": "요소이름 %1",
        "args0": [{"type": "field_input", "name": "ARG0", "text": "영역1", "spellcheck": false}],
        "output": "Args",
        "colour": "1"
    }
]);

Blockly.Blocks['htmlblock_css'] = {
    init: function() {
        this.jsonInit({
            "nextStatement": null,
            "previousStatement": null,
            "colour": "1"
        });
        var input = this.appendDummyInput()
                        .appendField('CSS연결')
                        .appendField(new Blockly.FieldDropdown(this.generateOptions), 'FILE');
    },

    generateOptions: function() {
        var options = [['123.css', '1'], ['456.css', '2'], ['789.css', '3']];
        return options;
    }
};

Blockly.Blocks['htmlblock_js'] = {
    init: function() {
        this.jsonInit({
            "nextStatement": null,
            "previousStatement": null,
            "colour": "1"
        });
        var input = this.appendDummyInput()
                        .appendField('JS연결')
                        .appendField(new Blockly.FieldDropdown(this.generateOptions), 'FILE');
    },

    generateOptions: function() {
        var options = [['123.js', '1'], ['456.js', '2'], ['789.js', '3']];
        return options;
    }
};