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
                    "type": "htmlblock_text",
                    "message0": "텍스트 %1",
                    "args0": [{"type": "field_input", "name": "ARG0", "text": "hello world", "spellcheck": false}],
                    "nextStatement": null,
                    "previousStatement": null,
                    "colour": "1"
                },
                {
                    "type": "htmlblock_title",
                    "message0": "사이트제목태그 %1",
                    "args0": [{"type": "field_input", "name": "ARG0", "text": "weby website", "spellcheck": false}],
                    "nextStatement": null,
                    "previousStatement": null,
                    "colour": "1"
                },
                {
                    "type": "htmlblock_h",
                    "message0": "%1제목태그 %2",
                    "args0": [{"type": "field_dropdown","name": "ARG0","options": [["큰","BIGH"],["중간","MIDH"],["작은","SMLH"]]},
                            {"type": "input_value", "name": "ARG0", "check": "Args"}],
                    "message1": "%1",
                    "args1": [{"type": "input_statement", "name": "INNER0"}],
                    "nextStatement": null,
                    "previousStatement": null,
                    "colour": "1"
                },
                {
                    "type": "htmlblock_div",
                    "message0": "영역태그 %1",
                    "args0": [{"type": "input_value", "name": "ARG0", "check": "Args"}],
                    "message1": "%1",
                    "args1": [{"type": "input_statement", "name": "INNER0"}],
                    "nextStatement": null,
                    "previousStatement": null,
                    "colour": "1"
                },
                {
                    "type": "htmlblock_a",
                    "message0": "링크태그 %1",
                    "args0": [{"type": "input_value", "name": "ARG0", "check": "Args"}],
                    "message1": "%1",
                    "args1": [{"type": "input_statement", "name": "INNER0"}],
                    "nextStatement": null,
                    "previousStatement": null,
                    "colour": "1"
                },
                {
                    "type": "htmlblock_input",
                    "message0": "%1 입력태그",
                    "args0": [
                        {
                            "type": "field_dropdown",
                            "name": "ARG0",
                            "options": [
                                ["텍스트", "text"],
                                ["비밀번호", "password"],
                                ["날짜", "date"],
                                ["날짜&시간", "datetime-local"],
                                ["버튼", "button"],
                                ["리셋버튼", "reset"],
                                ["전송버튼", "submit"],
                                ["파일업로드버튼", "file"],
                                ["체크박스", "checkbox"],
                                ["라디오버튼", "radio"],
                                ["색상", "color"]
                            ]
                        }
                    ],
                    "nextStatement": null,
                    "previousStatement": null,
                    "colour": "1"
                },
                {
                    "type": "htmlblock_embed",
                    "message0": "임베드태그 %1",
                    "args0": [{"type": "field_input", "name": "ARG0", "text": "https://소스URL/#", "spellcheck": false}],
                    "nextStatement": null,
                    "previousStatement": null,
                    "colour": "1"
                },
                {
                    "type": "htmlblock_br",
                    "message0": "줄바꿈",
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
                "type": "cssblock_uniselecter",
                "message0": "모든요소의 스타일",
                "message1": "%1",
                "args1": [{"type": "input_statement", "name": "INNER0"}],
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            },
            {
                "type": "cssblock_idselecter",
                "message0": "%1의 스타일",
                "args0": [{"type": "input_value", "name": "ARG0", "check": "CSSARGS"}],
                "message1": "%1",
                "args1": [{"type": "input_statement", "name": "INNER0"}],
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            },
            {
                "type": "cssargs_and",
                "message0": "%1 & %2",
                "args0": [
                    {"type": "input_value", "name": "ARG0", "check": "CSSARGS"},
                    {"type": "input_value", "name": "ARG1", "check": "CSSARGS"}
                ],
                "inputsInline": true,
                "output": "CSSARGS",
                "colour": "210"
            },
            {
                "type": "cssargs_sub",
                "message0": "%1 하위의 모든 %2",
                "args0": [
                    {"type": "input_value", "name": "ARG0", "check": "CSSARGS"},
                    {"type": "input_value", "name": "ARG1", "check": "CSSARGS"}
                ],
                "inputsInline": true,
                "output": "CSSARGS",
                "colour": "210"
            },
            {
                "type": "cssargs_children",
                "message0": "%1 직속 하위 %2",
                "args0": [
                    {"type": "input_value", "name": "ARG0", "check": "CSSARGS"},
                    {"type": "input_value", "name": "ARG1", "check": "CSSARGS"}
                ],
                "inputsInline": true,
                "output": "CSSARGS",
                "colour": "210"
            },
            {
                "type": "cssargs_textfield",
                "message0": "%1",
                "args0": [
                    {"type": "field_input", "name": "ARG0"}
                ],
                "output": "CSSARGS",
                "colour": "210"
            },
            {
                "type": "cssblock_fontcolor",
                "message0": "폰트 색상: %1",
                "args0": [{"type": "input_value", "name": "ARG0"}],
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            },
            {
                "type": "cssblock_fontsize",
                "message0": "폰트 사이즈: %1 %2",
                "args0": [
                    {"type": "field_number", "name": "ARG0", "value": 24, "min": 0, "precision": 1}, 
                    {
                        "type": "field_dropdown",
                        "name": "ARG1",
                        "options": [
                            ["px", "px"],
                            ["pt", "pt"],
                            ["em", "em"]
                        ]
                    }
                ],
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            },
            {
                "type": "cssblock_fontweight",
                "message0": "폰트 굵기: %1",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "ARG0",
                        "options": [
                            ["보통", "normal"],
                            ["얇게", "lighter"],
                            ["굵게", "bold"],
                            ["제일 굵게", "bolder"]
                        ]
                    }
                ],
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            },
            {
                "type": "cssblock_fontstyle",
                "message0": "폰트 스타일: %1",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "ARG0",
                        "options": [
                            ["보통", "normal"],
                            ["이탤릭", "italic"],
                            ["강제 이탤릭", "oblique"]
                        ]
                    }
                ],
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