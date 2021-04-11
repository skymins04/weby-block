import Blockly from 'blockly/core';

class WebyStatementInput extends Blockly.blockRendering.StatementInput {
    constructor(constants: any, input: any) {
        super(constants, input);
        if ((this as any).connectedBlock) {
            let block = (this as any).connectedBlock;
            while (block.getNextBlock()) {
                block = block.getNextBlock();
            }
            if (!block.nextConnection) {
                (this as any).height = (this as any).connectedBlockHeight;
                (this as any).connectedBottomNextConnection = true;
            }
        }
    }
}

export default WebyStatementInput;