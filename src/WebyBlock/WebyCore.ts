//WebyCore.ts
import Blockly from 'blockly/core';

class WebyCore {
    protected htmlList:string[] = [''];

    protected cssList:string[] = [''];

    protected jsList:string[] = [''];

    protected htmlBlockCount:number = 0;

    protected cssBlockCount:number = 0;

    protected jsBlockCount:number = 0;

    protected needReflash:boolean = false;

    clearUndoStack(): void {
        Blockly.mainWorkspace.clearUndo();
    }

    undo(): void {
        Blockly.mainWorkspace.undo(false);
    }
    redo(): void {
        Blockly.mainWorkspace.undo(true);
    }

    exportXml(_workspace: any): string {
        return Blockly.Xml.domToPrettyText(Blockly.Xml.workspaceToDom(_workspace));
    }

    importXml(_workspace: any, _xml: string): string[] {
        return Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(_xml), _workspace);
    }

    // tslint:disable-next-line: no-unnecessary-initializer
    createHatBlock(_workspace: any, _s: number, _name: any = undefined, _deletable: boolean = true): void {
        let _blockCount: number = 0;
        // tslint:disable-next-line: prefer-const
        let _text: string[] = ['', '', ''];
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
            const _type: string = _text[0] + _name;
            const _msg: string = _text[1]+' (' + _name + _text[2];
            if(_s === 1) {
                (Blockly as any).Blocks[_type] = {
                    init: function(): void {
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
                };
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


            const _newBlock: any = _workspace.newBlock(_type);
            _newBlock.initSvg();
            _newBlock.render();
            this.needReflash = true;
        }
    }
}

export default WebyCore;