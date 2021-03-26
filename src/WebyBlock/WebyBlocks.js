import Blockly from 'blockly/core';
import WebyCore from './WebyCore';

class WebyBlocks extends WebyCore {
    constructor() {
        super();
        this.defBlocksHtml();
        this.defBlocksCss();
        this.defBlocksJs();
    }

    _importBlockGenerateOptions(_s) {
        var _list = [], _opt = [];
        switch(_s) {
            case 1: _list = this.htmlList; break;
            case 2: _list = this.cssList; break;
            case 3: _list = this.jsList; break;
        }
        for(var i = 0; i < _list.length; i++) _opt.push([_list[i].toString(), i.toString()]);
        return _opt;
    }

    defBlocksHtml(_reflashmode = false) {
        if(!_reflashmode) {
            Blockly.defineBlocksWithJsonArray([
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
                    "message0": "공간영역 %1",
                    "args0": [{"type": "input_value", "name": "ARG0", "check": "Args"}],
                    "message1": "%1",
                    "args1": [{"type": "input_statement", "name": "INNER0"}],
                    "nextStatement": null,
                    "previousStatement": null,
                    "colour": "1"
                },
                {
                    "type": "htmlalt_id",
                    "message0": "요소이름 %1",
                    "args0": [{"type": "field_input", "name": "ARG0", "text": "영역1", "spellcheck": false}],
                    "output": "Args",
                    "colour": "1"
                }
            ]);
        }
        Blockly.Blocks['htmlblock_importcss'] = {
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
        
            generateOptions: () => {return this._importBlockGenerateOptions(2);}
        };
        Blockly.Blocks['htmlblock_importjs'] = {
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
            generateOptions: () => {return this._importBlockGenerateOptions(3);}
        };
        if(_reflashmode) this.needReflash = false;
    }

    defBlocksCss() {
        Blockly.defineBlocksWithJsonArray([
            {
                "type": "cssblock_selecter",
                "message0": "%1의 스타일",
                "args0": [{"type": "field_input", "name": "ARG0", "text": "영역1", "spellcheck": false}],
                "message1": "%1",
                "args1": [{"type": "input_statement", "name": "INNER0"}],
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            }
        ]);
    }

    defBlocksJs() {
        
    }
}

export default WebyBlocks;