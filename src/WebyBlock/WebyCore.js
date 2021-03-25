import Blockly from 'blockly/core';

class WebyCore {
    constructor() {
        this._HTML = 1;
        this._CSS = 2;
        this._JS = 3;
        this.htmlList = [];
        this.cssList = [];
        this.jsList = [];    
    }

    createHatBlock(_workspace, _s, _name) {
        var _list;
        var _text = [null,null,null];
        var _initTexts = [null,'CSS블럭을 생성해주세요', 'JS블럭을 생성해주세요'];
        switch(_s) {
            case this._HTML:
                _list = this.htmlList;
                _text[0] = 'htmlblock_main_';
                _text[1] = 'HTML';
                _text[2] = '.html)';
            break;
            case this._CSS:
                _list = this.cssList;
                _text[0] = 'cssblock_main_';
                _text[1] = 'CSS';
                _text[2] = '.css)';
            break;
            case this._JS:
                _list = this.jsList;
                _text[0] = 'jsblock_main_';
                _text[1] = 'JS';
                _text[2] = '.js)';
            break;
        }
        if(!_name) _name = window.prompt(_text[1]+'블럭의 이름을 지어주세요');
        if(_name != 'undefined' && _name != undefined) {
            var _type = _text[0] + _name;
            var _msg = _text[1]+' (' + _name + _text[2];
            if(_s == this._HTML) {
                Blockly.defineBlocksWithJsonArray([
                    {
                        "type": _type,
                        "message0": _msg,
                        "message1": "헤드 %1",
                        "args1": [{"type": "input_statement", "name": "INNER0"}],
                        "message2": "바디 %1",
                        "args2": [{"type": "input_statement", "name": "INNER1"}],
                        "colour": "1",
                        "style": {
                            "hat": "cap"
                        }
                    }
                ]);
            }
            else {
                Blockly.defineBlocksWithJsonArray([
                    {
                        "type": _type,
                        "message0": _msg,
                        "message1": "%1",
                        "args1": [{"type": "input_statement", "name": "INNER0"}],
                        "colour": _s == this._CSS ? 210 : 45,
                        "style": {
                            "hat": "cap"
                        }
                    }
                ]);
            }

            if(_s != this._HTML && list[0] == _initTexts[_s]) {
                switch(_s) {
                    case this._CSS:
                        this.cssList = [];
                        this.cssList.push(_name);
                    break;
                    case this._JS:
                        this.jsList = [];
                        this.jsList.push(_name);
                    break;
                }
            }
            else this.htmlList.push(_name);

            var _newBlock = workspace.newBlock(_type);
            _newBlock.initSvg();
            _newBlock.render();
        }
    }
}

export default WebyCore;