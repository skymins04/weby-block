import Blockly from 'blockly/core';

class WebyStatementInput extends Blockly.blockRendering.StatementInput {
    constructor(constants, input) {
        super(constants, input);
        if (this.connectedBlock) {
            var block = this.connectedBlock;
            while (block.getNextBlock()) {
                block = block.getNextBlock();
            }
            if (!block.nextConnection) {
                this.height = this.connectedBlockHeight;
                this.connectedBottomNextConnection = true;
            }
        }
    }
}

export default WebyStatementInput;