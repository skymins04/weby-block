import Blockly from 'blockly/core';

class WebyCore {
    constructor() {
        this.htmlList = [''];
        this.cssList = ['CSS블럭을 생성해주세요'];
        this.jsList = ['JS블럭을 생성해주세요'];
        this.htmlBlockCount = 0;
        this.cssBlockCount = 0;
        this.jsBlockCount = 0;
        this.needReflash = false;
    }

    clearUndoStack() {
        Blockly.mainWorkspace.clearUndo();
    }
    
    exportXml(_workspace) {
        return Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(_workspace));
    }

    importXml(_workspace, _xml) {
        return Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(_xml), _workspace);
    }

    createHatBlock(_workspace, _s, _name = undefined, _deletable = true) {
        var _blockCount;
        var _text = [null,null,null];
        switch(_s) {
            case 1:
                _blockCount = this.htmlBlockCount;
                _text[0] = 'htmlblock_main_';
                _text[1] = 'HTML';
                _text[2] = '.html)';
            break;
            case 2:
                _blockCount = this.cssBlockCount;
                _text[0] = 'cssblock_main_';
                _text[1] = 'CSS';
                _text[2] = '.css)';
            break;
            case 3:
                _blockCount = this.jsBlockCount;
                _text[0] = 'jsblock_main_';
                _text[1] = 'JS';
                _text[2] = '.js)';
            break;
            default: break;
        }
        if(!_name) _name = window.prompt(_text[1]+'블럭의 이름을 지어주세요');
        if(_name !== 'undefined' && _name !== undefined) {
            var _type = _text[0] + _name;
            var _msg = _text[1]+' (' + _name + _text[2];
            if(_s === 1) {
                Blockly.Blocks[_type] = {
                    init: function() {
                        this.jsonInit({
                            "message0": _msg,
                            "message1": "헤드 %1",
                            "args1": [{"type": "input_statement", "name": "INNER0"}],
                            "message2": "바디 %1",
                            "args2": [{"type": "input_statement", "name": "INNER1"}],
                            "colour": "1",
                            "style": {
                                "hat": "cap"
                            }
                        });
                        this.setDeletable(_deletable);
                    }
                }
            }
            else {
                Blockly.defineBlocksWithJsonArray([
                    {
                        "type": _type,
                        "message0": _msg,
                        "message1": "%1",
                        "args1": [{"type": "input_statement", "name": "INNER0"}],
                        "colour": _s === 2 ? 210 : 45,
                        "style": {
                            "hat": "cap"
                        }
                    }
                ]);
            }
            
            switch(_s) {
                case 1:
                    if(_blockCount === 0) this.htmlList = [];
                    this.htmlList.push(_name);
                    this.htmlBlockCount += 1;
                break;
                case 2:
                    if(_blockCount === 0) this.cssList = [];
                    this.cssList.push(_name);
                    this.cssBlockCount += 1;
                break;
                case 3:
                    if(_blockCount === 0) this.jsList = [];
                    this.jsList.push(_name);
                    this.jsBlockCount += 1;
                break;
                default: break;
            }
            

            var _newBlock = _workspace.newBlock(_type);
            _newBlock.initSvg();
            _newBlock.render();
            this.needReflash = true;
        }
    }
}

export default WebyCore;