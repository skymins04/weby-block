import Blockly from 'blockly/core';
import WebyCore from './WebyCore';

class WebyBlocks extends WebyCore {
    constructor() {
        super();
        this.defBlocksHtml();
        this.defBlocksCss();
        this.defBlocksJs();
    }

    private _importBlockGenerateOptions(_s: number): string[][] {
        let _list: string[] = [];
        // tslint:disable-next-line: prefer-const
        let _opt = [];
        switch(_s) {
            case 1:
                _list = this.htmlList;
                break;
            case 2:
                _list = this.cssList;
                break;
            case 3:
                _list = this.jsList;
                break;
            default: break;
        }
        for(let i = 0; i < _list.length; i++) _opt.push([_list[i].toString(), i.toString()]);
        return _opt;
    }

    defBlocksHtml(_reflashmode:boolean = false): void {
        if(!_reflashmode) {
            Blockly.defineBlocksWithJsonArray([
                {
                    "type": "htmlblock_text",
                    "message0": "텍스트 %1",
                    "args0": [{"type": "field_multilinetext", "name": "ARG0", "text": "hello\nworld", "spellcheck": false}],
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
                    "args0": [{"type": "field_dropdown","name": "ARG0","options": [["큰","0"],["중간","1"],["작은","2"]]},
                            {"type": "input_value", "name": "ARG1", "check": "Args"}],
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
                    "message0": "입력태그 %1",
                    "args0": [
                        {
                            "type": "field_dropdown",
                            "name": "ARG0",
                            "options": [
                                ["텍스트", "0"],
                                ["비밀번호", "1"],
                                ["날짜", "2"],
                                ["날짜&시간", "3"],
                                ["기본버튼", "4"],
                                ["리셋버튼", "5"],
                                ["전송버튼", "6"],
                                ["파일업로드버튼", "7"],
                                ["체크박스", "8"],
                                ["라디오버튼", "9"],
                                ["색상", "10"]
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
                    "type": "htmlalt_class",
                    "message0": "그룹이름 %1",
                    "args0": [{"type": "field_input", "name": "ARG0", "text": "그룹1", "spellcheck": false}],
                    "output": "Args",
                    "colour": "1"
                },
                {
                    "type": "htmlalt_id",
                    "message0": "요소이름 %1",
                    "args0": [{"type": "field_input", "name": "ARG0", "text": "요소1", "spellcheck": false}],
                    "output": "Args",
                    "colour": "1"
                }
            ]);
        }
        (Blockly as any).Blocks.htmlblock_importcss = {
            init(): void {
                this.jsonInit({
                    "nextStatement": null,
                    "previousStatement": null,
                    "colour": "1"
                });
                this.appendDummyInput()
                    .appendField('CSS연결')
                    .appendField(new Blockly.FieldDropdown(this.generateOptions), 'FILE');
            },

            generateOptions: () => {return this._importBlockGenerateOptions(2);}
        };
        (Blockly as any).Blocks.htmlblock_importjs = {
            init(): void {
                this.jsonInit({
                    "nextStatement": null,
                    "previousStatement": null,
                    "colour": "1"
                });
                this.appendDummyInput()
                    .appendField('JS연결')
                    .appendField(new Blockly.FieldDropdown(this.generateOptions), 'FILE');
            },
            generateOptions: () => {return this._importBlockGenerateOptions(3);}
        };
        if(_reflashmode) this.needReflash = false;
    }

    defBlocksCss(): void {
        Blockly.defineBlocksWithJsonArray([
            {
                "type": "cssargs_textfield",
                "message0": "%1",
                "args0": [{"type": "field_input", "name": "ARG0"}],
                "output": "CssText",
                "colour": "210"
            },
            {
                "type": "cssargs_sizefield",
                "message0": "%1 %2",
                "args0": [
                    {"type": "field_number", "name": "ARG0", "value": 1, "precision": 1},
                    {
                        "type": "field_dropdown",
                        "name": "ARG1",
                        "options":[
                            ["px", "0"],
                            ["pt", "1"],
                            ["em", "2"],
                            ["ex", "3"],
                            ["%", "4"]
                        ]
                    }
                ],
                "output": "CssSize",
                "colour": "210"
            },
            {
                "type": "cssargs_tagname",
                "message0": "%1",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "ARG0",
                        "options": [
                            ["영역태그", "0"],
                            ["링크태그", "1"],
                            ["입력태그", "2"],
                            ["큰 제목태그", "3"],
                            ["중간 제목태그", "4"],
                            ["작은 제목태그", "5"],
                            ["임베드태그", "6"]
                        ]
                    }
                ],
                "inputsInline": true,
                "output": "CssArgs",
                "colour": "220"
            },
            {
                "type": "cssargs_idname",
                "message0": "요소이름 %1",
                "args0": [
                    {"type": "input_value", "name": "ARG0", "check": "CssText"}
                ],
                "inputsInline": true,
                "output": "CssArgs",
                "colour": "220"
            },
            {
                "type": "cssargs_classname",
                "message0": "그룹이름 %1",
                "args0": [
                    {"type": "input_value", "name": "ARG0", "check": "CssText"}
                ],
                "inputsInline": true,
                "output": "CssArgs",
                "colour": "220"
            },
            {
                "type": "cssargs_pseudoclass",
                "message0": "%1 : %2",
                "args0": [
                    {"type": "input_value", "name": "ARG0", "check": "CssArgs"},
                    {
                        "type": "field_dropdown",
                        "name": "ARG1",
                        "options": [
                            ["이미 방문한 링크상태", "0"],
                            ["아직 방문하지 않은 링크상태", "1"],
                            ["현재 클릭중인 링크상태", "2"],
                            ["현재 마우스를 올려놓은 상태", "3"]
                        ]
                    }
                ],
                "inputsInline": true,
                "output": "CssArgs",
                "colour": "190"
            },
            {
                "type": "cssargs_structural_pseudoclass1",
                "message0": "부모요소의 %1 %2 %3",
                "args0": [
                    {"type": "field_number", "name": "ARG0", "value": 1, "min": 1, "precision": 1},
                    {
                        "type": "field_dropdown",
                        "name": "ARG1",
                        "options": [
                            ["번째(앞에서) 자식인", "0"],
                            ["번째(뒤에서) 자식인", "1"],
                            ["번째(같은유형 중 앞에서) 자식인", "2"],
                            ["번째(같은유형 중 뒤에서) 자식인", "3"],
                        ]
                    },
                    {"type": "input_value", "name": "ARG2", "check": "CssArgs"}
                ],
                "inputsInline": true,
                "output": "CssArgs",
                "colour": "190"
            },
            {
                "type": "cssargs_structural_pseudoclass2",
                "message0": "부모요소의 %1 %2",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "ARG0",
                        "options": [
                            ["첫번째 자식인", "0"],
                            ["마지막 자식인", "1"],
                            ["첫번째(같은유형 중) 자식인", "2"],
                            ["마지막(같은유형 중) 자식인", "3"],
                            ["유일한 자식인", "4"],
                            ["자식요소가 비어있는 자식인", "5"]
                        ]
                    },
                    {"type": "input_value", "name": "ARG1", "check": "CssArgs"}
                ],
                "inputsInline": true,
                "output": "CssArgs",
                "colour": "190"
            },
            {
                "type": "cssargs_combinator",
                "message0": "%1 %2 %3",
                "args0": [
                    {"type": "input_value", "name": "ARG0", "check": ["CssArgs", "CssCombi"]},
                    {
                        "type": "field_dropdown",
                        "name": "ARG1",
                        "options": [
                            ["&", "0"],
                            ["하위의 모든", "1"],
                            ["의 자식", "2"],
                            ["의 일반형제", "3"],
                            ["의 인접형제", "4"]
                        ]
                    },
                    {"type": "input_value", "name": "ARG2", "check": ["CssArgs", "CssCombi"]}
                ],
                "inputsInline": true,
                "output": "CssCombi",
                "colour": "190"
            },
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
                "type": "cssblock_selecter",
                "message0": "%1의 스타일",
                "args0": [{"type": "input_value", "name": "ARG0", "check": ["CssArgs", "CssCombi"]}],
                "message1": "%1",
                "args1": [{"type": "input_statement", "name": "INNER0"}],
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            },
            {
                "type": "cssblock_width",
                "message0": "요소 폭을 %1로 설정",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "ARG0",
                        "check": "CssSize"
                    }
                ],
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            },
            {
                "type": "cssblock_height",
                "message0": "요소 높이를 %1로 설정",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "ARG0",
                        "check": "CssSize"
                    }
                ],
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            },
            {
                "type": "cssblock_margin",
                "message0": "요소 마진을 위쪽 %1 아래쪽 %2 오른쪽 %3 왼쪽 %4로 설정",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "ARG0",
                        "check": "CssSize"
                    },
                    {
                        "type": "input_value",
                        "name": "ARG1",
                        "check": "CssSize"
                    },
                    {
                        "type": "input_value",
                        "name": "ARG2",
                        "check": "CssSize"
                    },
                    {
                        "type": "input_value",
                        "name": "ARG3",
                        "check": "CssSize"
                    }
                ],
                "inputsInline": true,
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            },
            {
                "type": "cssblock_padding",
                "message0": "요소 패딩을 위쪽 %1 아래쪽 %2 오른쪽 %3 왼쪽 %4로 설정",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "ARG0",
                        "check": "CssSize"
                    },
                    {
                        "type": "input_value",
                        "name": "ARG1",
                        "check": "CssSize"
                    },
                    {
                        "type": "input_value",
                        "name": "ARG2",
                        "check": "CssSize"
                    },
                    {
                        "type": "input_value",
                        "name": "ARG3",
                        "check": "CssSize"
                    }
                ],
                "inputsInline": true,
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            },
            {
                "type": "cssblock_border",
                "message0": "요소 외곽선 %1 색상 %2 형태 %3 두께 %4로 설정",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "ARG0",
                        "options": [
                            ["전체를","0"],
                            ["위쪽을","1"],
                            ["아래쪽을","2"],
                            ["오른쪽을","3"],
                            ["왼쪽을","4"]
                        ]
                    },
                    {
                        "type": "input_value",
                        "name": "ARG1"
                    },
                    {
                        "type": "field_dropdown",
                        "name": "ARG2",
                        "options": [
                            ["없음","0"],
                            ["실선","1"],
                            ["점선","2"],
                            ["대쉬선","3"],
                            ["이중선","4"]
                        ]
                    },
                    {
                        "type": "input_value",
                        "name": "ARG3",
                        "check": "CssSize"
                    },
                ],
                "inputsInline": true,
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            },
            {
                "type": "cssblock_fontcolor",
                "message0": "문자 색상을 %1로 설정",
                "args0": [{"type": "input_value", "name": "ARG0", "check": "Colour"}],
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            },
            {
                "type": "cssblock_fontsize",
                "message0": "문자 사이즈를 %1로 설정",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "ARG0",
                        "check": "CssSize"
                    }
                ],
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            },
            {
                "type": "cssblock_fontweight",
                "message0": "문자 굵기를 %1로 설정",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "ARG0",
                        "options": [
                            ["기본", "0"],
                            ["얇게", "1"],
                            ["굵게", "2"],
                            ["제일 굵게", "3"]
                        ]
                    }
                ],
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            },
            {
                "type": "cssblock_fontstyle",
                "message0": "문자 이탤릭 효과를 %1",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "ARG0",
                        "options": [
                            ["사용안함", "0"],
                            ["사용", "1"],
                            ["강제 사용", "2"]
                        ]
                    }
                ],
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            },
            {
                "type": "cssblock_texttransform",
                "message0": "문자 %1 표시",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "ARG0",
                        "options": [
                            ["모두를 대문자로","0"],
                            ["모두를 소문자로","1"],
                            ["첫 글자만 대문자로","2"]
                        ]
                    }
                ],
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            },
            {
                "type": "cssblock_wordwrap",
                "message0": "문자가 요소영역을 넘치면 줄바꿈을 %1",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "ARG0",
                        "options": [
                            ["허용","0"],
                            ["허용하지 않음","1"]
                        ]
                    }
                ],
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            },
            {
                "type": "cssblock_textalign",
                "message0": "문자를 %1 정렬",
                "args0": [
                    {
                        "type": "field_dropdown",
                        "name": "ARG0",
                        "options": [
                            ["가운데로","0"],
                            ["왼쪽으로","1"],
                            ["오른쪽으로","2"],
                            ["양쪽으로","3"]
                        ]
                    }
                ],
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            },
            {
                "type": "cssblock_letterspacing",
                "message0": "문자 자간을 %1로 설정",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "ARG0",
                        "check": "CssSize"
                    }
                ],
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            },
            {
                "type": "cssblock_wordspacing",
                "message0": "문자 단어간격을 %1로 설정",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "ARG0",
                        "check": "CssSize"
                    }
                ],
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            },
            {
                "type": "cssblock_textindent",
                "message0": "문자 첫 줄을 %1만큼 들여쓰기",
                "args0": [
                    {
                        "type": "input_value",
                        "name": "ARG0",
                        "check": "CssSize"
                    }
                ],
                "nextStatement": null,
                "previousStatement": null,
                "colour": "210"
            }
        ]);

        (Blockly as any).Blocks.cssblock_textdecoration = {
            validate(_newValue: any): any {
                this.getSourceBlock().updateConnections(_newValue);
                return _newValue;
            },

            init(): void {
                const _opt = [
                    ["사용안함", "0"],
                    ["사용", "1"]
                ];
                this.jsonInit({
                    "inputsInline": true,
                    "nextStatement": null,
                    "previousStatement": null,
                    "colour": "210"
                });
                this.appendDummyInput()
                    .appendField('문자 장식선을 ')
                    .appendField(new Blockly.FieldDropdown(_opt, this.validate), 'ARG0');
            },

            updateConnections(_newValue: string): void {
                const _height = [
                    ["아래쪽", "0"],
                    ["위쪽", "1"],
                    ["중간", "2"]
                ];
                const _style = [
                    ["실선", "0"],
                    ["이중선", "1"],
                    ["점선", "2"],
                    ["파선", "3"],
                    ["물결선", "4"]
                ];
                this.removeInput('OPT1', true);
                this.removeInput('OPT2', true);
                if(_newValue === '1') {
                    this.appendDummyInput('OPT1')
                        .appendField('(')
                        .appendField(new Blockly.FieldDropdown(_height), 'ARG1')
                        .appendField(new Blockly.FieldDropdown(_style), 'ARG2');
                    this.appendDummyInput('OPT2')
                        .appendField(new Blockly.FieldColour("#ff0000"), 'ARG3')
                        .appendField(')');
                }
            }
        };
    }

    defBlocksJs(): void {}
}

export default WebyBlocks;