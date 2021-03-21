import * as Blockly from 'blockly';

class WebyCategory extends Blockly.ToolboxCategory {
    constructor(categroyDef, toolbox, opt_parent) {
        super(categroyDef, toolbox, opt_parent);
    }

    addColourBorder_(colour) {
        this.rowDiv_.style.backgroundColor = colour;
    }
}

Blockly.registry.register(
    Blockly.registry.Type.TOOLBOX_ITEM,
    Blockly.ToolboxCategory.registrationName,
    WebyCategory, true );