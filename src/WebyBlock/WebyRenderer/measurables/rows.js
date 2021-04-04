import Blockly from 'blockly/core';

class WebyTopRow extends Blockly.blockRendering.TopRow {
    constructor(constants) {
        super(constants);
    }

    endsWithElemSpacer() {
        return false;
    }

    hasLeftSquareCorner(block) {
        var hasHat = (block.hat ?
            block.hat === 'cap' : this.constants_.ADD_START_HATS) &&
            !block.outputConnection && !block.previousConnection;
        return !!block.outputConnection || hasHat;
    }

    hasRightSquareCorner(block) {
        return !!block.outputConnection && !block.statementInputCount && !block.nextConnection;
    }
}

class WebyBottomRow extends Blockly.blockRendering.BottomRow {
    constructor(constants) {
        super(constants);
    }

    endsWithElemSpacer() {
        return false;
    }

    hasLeftSquareCorner(block) {
        return !!block.outputConnection;
    }

    hasRightSquareCorner(block) {
        return !!block.outputConnection && !block.statementInputCount && !block.nextConnection;
    }
}

export { WebyTopRow, WebyBottomRow };