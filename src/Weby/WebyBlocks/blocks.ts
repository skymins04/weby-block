import Blockly from 'blockly/core';
import WebyCore from '../WebyCore';

import htmlJson from './html.json';
import cssJson from './css.json';
import jsJson from './js.json';

abstract class WebyBlocks extends WebyCore {
    constructor() {
        super();
        this.defBlocksHtml();
        this.defBlocksCss();
        this.defBlocksJs();
    }

    protected _importBlockGenerateOptions(_s: number): string[][] {
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
            Blockly.defineBlocksWithJsonArray(htmlJson);
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
        Blockly.defineBlocksWithJsonArray(cssJson);

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