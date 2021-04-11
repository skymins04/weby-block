import Blockly from 'blockly/core';

class WebyRightConnectionShape extends Blockly.blockRendering.Measurable {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(constants: any) {
        super(constants);
    }

    type: number = Blockly.blockRendering.Types.getType('RIGHT_CONNECTION');
    height: number = 0;
    width: number = 0;
}

export default WebyRightConnectionShape;