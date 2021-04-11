import Blockly from 'blockly/core';

class WebyRightConnectionShape extends Blockly.blockRendering.Measurable {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(constants: Blockly.blockRendering.ConstantProvider) {
        super(constants);
    }

    public type: number = Blockly.blockRendering.Types.getType('RIGHT_CONNECTION');

    public height: number = 0;

    public width: number = 0;
}

export default WebyRightConnectionShape;