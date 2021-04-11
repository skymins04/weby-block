import Blockly from 'blockly/core';

class WebyTopRow extends Blockly.blockRendering.TopRow {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(constants: any) {
        super(constants);
    }

    endsWithElemSpacer(): boolean {
        return false;
    }

    hasLeftSquareCorner(block: any): boolean {
        const hasHat: boolean = (block.hat ?
            block.hat === 'cap' : this.constants_.ADD_START_HATS) &&
            !block.outputConnection && !block.previousConnection;
        return !!block.outputConnection || hasHat;
    }

    hasRightSquareCorner(block: any): boolean {
        return !!block.outputConnection && !block.statementInputCount && !block.nextConnection;
    }
}

// tslint:disable-next-line: max-classes-per-file
class WebyBottomRow extends Blockly.blockRendering.BottomRow {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(constants: any) {
        super(constants);
    }

    endsWithElemSpacer(): boolean {
        return false;
    }

    hasLeftSquareCorner(block: any): boolean {
        return !!block.outputConnection;
    }

    hasRightSquareCorner(block: any): boolean {
        return !!block.outputConnection && !block.statementInputCount && !block.nextConnection;
    }
}

export { WebyTopRow, WebyBottomRow };