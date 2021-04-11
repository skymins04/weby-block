import Blockly from 'blockly/core';

class WebyTopRow extends Blockly.blockRendering.TopRow {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(constants: Blockly.blockRendering.ConstantProvider) {
        super(constants);
    }

    public endsWithElemSpacer(): boolean {
        return false;
    }

    public hasLeftSquareCorner(block: Blockly.BlockSvg): boolean {
        const hasHat: boolean = (block.hat ?
            block.hat === 'cap' : this.constants_.ADD_START_HATS) &&
            !block.outputConnection && !block.previousConnection;
        return !!block.outputConnection || hasHat;
    }

    public hasRightSquareCorner(block: Blockly.BlockSvg): boolean {
        return !!block.outputConnection && !block.statementInputCount && !block.nextConnection;
    }
}

// tslint:disable-next-line: max-classes-per-file
class WebyBottomRow extends Blockly.blockRendering.BottomRow {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(constants: Blockly.blockRendering.ConstantProvider) {
        super(constants);
    }

    public endsWithElemSpacer(): boolean {
        return false;
    }

    public hasLeftSquareCorner(block: Blockly.BlockSvg): boolean {
        return !!block.outputConnection;
    }

    public hasRightSquareCorner(block: Blockly.BlockSvg): boolean {
        return !!block.outputConnection && !block.statementInputCount && !block.nextConnection;
    }
}

export { WebyTopRow, WebyBottomRow };