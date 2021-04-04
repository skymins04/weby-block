import Blockly from 'blockly/core';

class WebyRightConnectionShape extends Blockly.blockRendering.Measurable {
    constructor(constants) {
        super(constants);
        this.type |= Blockly.blockRendering.Types.getType('RIGHT_CONNECTION');
        this.height = 0;
        this.width = 0;
    }
}

export default WebyRightConnectionShape;