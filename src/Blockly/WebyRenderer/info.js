import Blockly from 'blockly/core';
import { WebyTopRow, WebyBottomRow } from './measurables/rows';
import WebyRightConnectionShape from './measurables/row_elements';

class WebyRenderInfo extends Blockly.blockRendering.RenderInfo {
    constructor(renderer, block) {
        super(renderer, block);
        this.topRow = new WebyTopRow(this.constants_);
        this.bottomRow = new WebyBottomRow(this.constants_);
        this.isInline = true;
        this.isMultiRow = !block.getInputsInline() || block.isCollapsed();
        this.hasStatementInput = block.statementInputCount > 0;
        this.rightSide = this.outputConnection ? new WebyRightConnectionShape(this.constants_) : null;
    }

    getRenderer() {
        return (this.renderer_);
    }

    measure() {
        this.createRows_();
        this.addElemSpacing_();
        this.addRowSpacing_();
        this.adjustXPosition_();
        this.computeBounds_();
        this.alignRowElements_();
        this.finalize_();
    }

    shouldStartNewRow_(input, lastInput) {
        if (!lastInput) {
            return false;
        }
        if (input.type === Blockly.NEXT_STATEMENT ||
            lastInput.type === Blockly.NEXT_STATEMENT) {
            return true;
        }
        if (input.type === Blockly.INPUT_VALUE || input.type === Blockly.DUMMY_INPUT) {
            return !this.isInline || this.isMultiRow;
        }
        return false;
    }

    getDesiredRowWidth_(row) {
        if (row.hasStatement) {
            var rightCornerWidth = this.constants_.INSIDE_CORNERS.rightWidth || 0;
            return this.width - this.startX - rightCornerWidth;
        }
        return super.getDesiredRowWidth_(row);
    }

    getInRowSpacing_(prev, next) {
        if (!prev || !next) {
            if (this.outputConnection && this.outputConnection.isDynamicShape &&
                !this.hasStatementInput && !this.bottomRow.hasNextConnection) {
                return this.constants_.NO_PADDING;
            }
        }
        if (!prev) {
            if (next && Blockly.blockRendering.Types.isStatementInput(next)) {
                return this.constants_.STATEMENT_INPUT_PADDING_LEFT;
            }
        }
        if (prev && Blockly.blockRendering.Types.isLeftRoundedCorner(prev) && next) {
            if (Blockly.blockRendering.Types.isPreviousConnection(next) ||
                Blockly.blockRendering.Types.isNextConnection(next)) {
                return next.notchOffset - this.constants_.CORNER_RADIUS;
            }
        }
        if (prev && Blockly.blockRendering.Types.isLeftSquareCorner(prev) && next &&
            Blockly.blockRendering.Types.isHat(next)) {
            return this.constants_.NO_PADDING;
        }
        return this.constants_.MEDIUM_PADDING;
    }

    getSpacerRowHeight_(prev, next) {
        if (Blockly.blockRendering.Types.isTopRow(prev) &&
            Blockly.blockRendering.Types.isBottomRow(next)) {
            return this.constants_.EMPTY_BLOCK_SPACER_HEIGHT;
        }
        var followsStatement =
            Blockly.blockRendering.Types.isInputRow(prev) && prev.hasStatement;
        var precedesStatement =
            Blockly.blockRendering.Types.isInputRow(next) && next.hasStatement;
        if (precedesStatement || followsStatement) {
            var cornerHeight = this.constants_.INSIDE_CORNERS.rightHeight || 0;
            var height = Math.max(this.constants_.NOTCH_HEIGHT, cornerHeight);
            return precedesStatement && followsStatement ?
                Math.max(height, this.constants_.DUMMY_INPUT_MIN_HEIGHT) : height;
        }
        if ((Blockly.blockRendering.Types.isTopRow(prev))) {
            if (!prev.hasPreviousConnection &&
                (!this.outputConnection || this.hasStatementInput)) {
                return Math.abs(this.constants_.NOTCH_HEIGHT -
                    this.constants_.CORNER_RADIUS);
            }
            return this.constants_.NO_PADDING;
        }
        if ((Blockly.blockRendering.Types.isBottomRow(next))) {
            if (!this.outputConnection) {
                var topHeight = Math.max(this.topRow.minHeight,
                    Math.max(this.constants_.NOTCH_HEIGHT,
                        this.constants_.CORNER_RADIUS)) - this.constants_.CORNER_RADIUS;
                return topHeight;
            } else if (!next.hasNextConnection && this.hasStatementInput) {
                return Math.abs(this.constants_.NOTCH_HEIGHT -
                    this.constants_.CORNER_RADIUS);
            }
            return this.constants_.NO_PADDING;
        }
        return this.constants_.MEDIUM_PADDING;
    }

    getSpacerRowWidth_(prev, next) {
        var width = this.width - this.startX;
        if ((Blockly.blockRendering.Types.isInputRow(prev) && prev.hasStatement) ||
            (Blockly.blockRendering.Types.isInputRow(next) && next.hasStatement)) {
            return Math.max(width, this.constants_.STATEMENT_INPUT_SPACER_MIN_WIDTH);
        }
        return width;
    }

    getElemCenterline_(row, elem) {
        if (row.hasStatement && !Blockly.blockRendering.Types.isSpacer(elem) &&
            !Blockly.blockRendering.Types.isStatementInput(elem)) {
            return row.yPos + this.constants_.EMPTY_STATEMENT_INPUT_HEIGHT / 2;
        }
        if (Blockly.blockRendering.Types.isInlineInput(elem)) {
            var connectedBlock = elem.connectedBlock;
            if (connectedBlock && connectedBlock.outputConnection &&
                connectedBlock.nextConnection) {
                return row.yPos + connectedBlock.height / 2;
            }
        }
        return super.getElemCenterline_(row, elem);
    }

    addInput_(input, activeRow) {
        if (input.type === Blockly.DUMMY_INPUT && activeRow.hasDummyInput &&
            activeRow.align === Blockly.ALIGN_LEFT &&
            input.align === Blockly.ALIGN_RIGHT) {
            activeRow.rightAlignedDummyInput = input;
        }
        super.addInput_(input, activeRow);
    }

    addAlignmentPadding_(row, missingSpace) {
        if (row.rightAlignedDummyInput) {
            var alignmentDivider;
            for (var i = 0, elem;
                (elem = row.elements[i]); i++) {
                if (Blockly.blockRendering.Types.isSpacer(elem)) {
                    alignmentDivider = elem;
                }
                if (Blockly.blockRendering.Types.isField(elem) &&
                    elem.parentInput === row.rightAlignedDummyInput) {
                    break;
                }
            }
            if (alignmentDivider) {
                alignmentDivider.width += missingSpace;
                row.width += missingSpace;
                return;
            }
        }
        super.addAlignmentPadding_(row, missingSpace);
    }

    adjustXPosition_() {
        var notchTotalWidth = this.constants_.NOTCH_OFFSET_LEFT + this.constants_.NOTCH_WIDTH;
        var minXPos = notchTotalWidth;
        for (var i = 2; i < this.rows.length - 1; i += 2) {
            var prevSpacer = this.rows[i - 1];
            var row = this.rows[i];
            var nextSpacer = this.rows[i + 1];

            var hasPrevNotch = i === 2 ?
                !!this.topRow.hasPreviousConnection : !!prevSpacer.followsStatement;
            var hasNextNotch = i + 2 >= this.rows.length - 1 ?
                !!this.bottomRow.hasNextConnection : !!nextSpacer.precedesStatement;

            if (Blockly.blockRendering.Types.isInputRow(row) && row.hasStatement) {
                row.measure();
                minXPos = row.width - row.getLastInput().width + notchTotalWidth;
            } else if (hasPrevNotch && (i === 2 || hasNextNotch) &&
                Blockly.blockRendering.Types.isInputRow(row) && !row.hasStatement) {
                var xCursor = row.xPos;
                var prevInRowSpacer = null;
                for (var j = 0, elem;
                    (elem = row.elements[j]); j++) {
                    if (Blockly.blockRendering.Types.isSpacer(elem)) {
                        prevInRowSpacer = elem;
                    }
                    if (prevInRowSpacer && (Blockly.blockRendering.Types.isField(elem) ||
                            Blockly.blockRendering.Types.isInput(elem))) {
                        if (xCursor < minXPos &&
                            !(Blockly.blockRendering.Types.isField(elem) &&
                                (elem.field instanceof Blockly.FieldLabel ||
                                    elem.field instanceof Blockly.FieldImage))) {
                            var difference = minXPos - xCursor;
                            prevInRowSpacer.width += difference;
                        }
                    }
                    xCursor += elem.width;
                }
            }
        }
    }

    finalizeOutputConnection_() {
        if (!this.outputConnection || !this.outputConnection.isDynamicShape) {
            return;
        }
        var yCursor = 0;
        for (var i = 0, row;
            (row = this.rows[i]); i++) {
            row.yPos = yCursor;
            yCursor += row.height;
        }
        this.height = yCursor;

        var blockHeight = this.bottomRow.hasNextConnection ? this.height - this.bottomRow.descenderHeight : this.height;
        var connectionHeight = this.outputConnection.shape.height(blockHeight);
        var connectionWidth = this.outputConnection.shape.width(blockHeight);

        this.outputConnection.height = connectionHeight;
        this.outputConnection.width = connectionWidth;
        this.outputConnection.startX = connectionWidth;
        this.outputConnection.connectionOffsetY = this.outputConnection.shape.connectionOffsetY(connectionHeight);
        this.outputConnection.connectionOffsetX = this.outputConnection.shape.connectionOffsetX(connectionWidth);

        var rightConnectionWidth = 0;
        if (!this.hasStatementInput && !this.bottomRow.hasNextConnection) {
            rightConnectionWidth = connectionWidth;
            this.rightSide.height = connectionHeight;
            this.rightSide.width = rightConnectionWidth;
            this.rightSide.centerline = connectionHeight / 2;
            this.rightSide.xPos = this.width + rightConnectionWidth;
        }
        this.startX = connectionWidth;
        this.width += connectionWidth + rightConnectionWidth;
        this.widthWithChildren += connectionWidth + rightConnectionWidth;
    }

    finalizeHorizontalAlignment_() {
        if (!this.outputConnection || this.hasStatementInput ||
            this.bottomRow.hasNextConnection) {
            return;
        }
        var totalNegativeSpacing = 0;
        for (var i = 0, row;
            (row = this.rows[i]); i++) {
            if (!Blockly.blockRendering.Types.isInputRow(row)) {
                continue;
            }
            var firstElem = row.elements[1];
            var lastElem = row.elements[row.elements.length - 2];
            var leftNegPadding = this.getNegativeSpacing_(firstElem);
            var rightNegPadding = this.getNegativeSpacing_(lastElem);
            totalNegativeSpacing = leftNegPadding + rightNegPadding;
            var minBlockWidth = this.constants_.MIN_BLOCK_WIDTH +
                this.outputConnection.width * 2;
            if (this.width - totalNegativeSpacing < minBlockWidth) {
                totalNegativeSpacing = this.width - minBlockWidth;
                leftNegPadding = totalNegativeSpacing / 2;
                rightNegPadding = totalNegativeSpacing / 2;
            }

            row.elements.unshift(new Blockly.blockRendering.InRowSpacer(this.constants_,
                -leftNegPadding));
            row.elements.push(new Blockly.blockRendering.InRowSpacer(this.constants_,
                -rightNegPadding));
        }
        if (totalNegativeSpacing) {
            this.width -= totalNegativeSpacing;
            this.widthWithChildren -= totalNegativeSpacing;
            this.rightSide.xPos -= totalNegativeSpacing;
            for (var i = 0, row;
                (row = this.rows[i]); i++) {
                if (Blockly.blockRendering.Types.isTopOrBottomRow(row)) {
                    row.elements[1].width -= totalNegativeSpacing;
                    row.elements[1].widthWithConnectedBlocks -= totalNegativeSpacing;
                }
                row.width -= totalNegativeSpacing;
                row.widthWithConnectedBlocks -= totalNegativeSpacing;
            }
        }
    }

    getNegativeSpacing_(elem) {
        if (!elem) {
            return 0;
        }
        var connectionWidth = this.outputConnection.width;
        var outerShape = this.outputConnection.shape.type;
        var constants = this.constants_;
        if (this.isMultiRow && this.inputRows.length > 1) {
            switch (outerShape) {
                case constants.SHAPES.ROUND:
                    var maxWidth = this.constants_.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH;
                    var width = this.height / 2 > maxWidth ? maxWidth : this.height / 2;
                    var topPadding = this.constants_.SMALL_PADDING;
                    var roundPadding = width *
                        (1 - Math.sin(Math.acos((width - topPadding) / width)));
                    return connectionWidth - roundPadding;
                default:
                    return 0;
            }
        }
        if (Blockly.blockRendering.Types.isInlineInput(elem)) {
            var connectedBlock = elem.connectedBlock;
            var innerShape = connectedBlock ?
                connectedBlock.pathObject.outputShapeType :
                elem.shape.type;
            if (connectedBlock && connectedBlock.outputConnection &&
                (connectedBlock.statementInputCount || connectedBlock.nextConnection)) {
                return 0;
            }
            if (outerShape === constants.SHAPES.HEXAGONAL && outerShape !== innerShape) {
                return 0;
            }
            return connectionWidth -
                this.constants_.SHAPE_IN_SHAPE_PADDING[outerShape][innerShape];
        } else if (Blockly.blockRendering.Types.isField(elem)) {
            if (outerShape === constants.SHAPES.ROUND &&
                elem.field instanceof Blockly.FieldTextInput) {
                return connectionWidth - (2.75 * constants.GRID_UNIT);
            }
            return connectionWidth -
                this.constants_.SHAPE_IN_SHAPE_PADDING[outerShape][0];
        } else if (Blockly.blockRendering.Types.isIcon(elem)) {
            return this.constants_.SMALL_PADDING;
        }
        return 0;
    }

    finalizeVerticalAlignment_() {
        if (this.outputConnection) {
            return;
        }
        for (var i = 2; i < this.rows.length - 1; i += 2) {
            var prevSpacer = this.rows[i - 1];
            var row = this.rows[i];
            var nextSpacer = this.rows[i + 1];

            var firstRow = i === 2;
            var hasPrevNotch = firstRow ?
                !!this.topRow.hasPreviousConnection : !!prevSpacer.followsStatement;
            var hasNextNotch = i + 2 >= this.rows.length - 1 ?
                !!this.bottomRow.hasNextConnection : !!nextSpacer.precedesStatement;

            if (hasPrevNotch) {
                var hasSingleTextOrImageField = row.elements.length === 3 &&
                    (row.elements[1].field instanceof Blockly.FieldLabel ||
                        row.elements[1].field instanceof Blockly.FieldImage);
                if (!firstRow && hasSingleTextOrImageField) {
                    prevSpacer.height -= this.constants_.SMALL_PADDING;
                    nextSpacer.height -= this.constants_.SMALL_PADDING;
                    row.height -= this.constants_.MEDIUM_PADDING;
                } else if (!firstRow && !hasNextNotch) {
                    prevSpacer.height += this.constants_.SMALL_PADDING;
                } else if (hasNextNotch) {
                    var hasNonShadowConnectedBlocks = false;
                    var MIN_VERTICAL_TIGHTNESTING_HEIGHT = 40;
                    for (var j = 0, elem;
                        (elem = row.elements[j]); j++) {
                        if (Blockly.blockRendering.Types.isInlineInput(elem) &&
                            elem.connectedBlock && !elem.connectedBlock.isShadow() &&
                            elem.connectedBlock.getHeightWidth().height >=
                            MIN_VERTICAL_TIGHTNESTING_HEIGHT) {
                            hasNonShadowConnectedBlocks = true;
                            break;
                        }
                    }
                    if (hasNonShadowConnectedBlocks) {
                        prevSpacer.height -= this.constants_.SMALL_PADDING;
                        nextSpacer.height -= this.constants_.SMALL_PADDING;
                    }
                }
            }
        }
    }

    finalize_() {
        this.finalizeOutputConnection_();
        this.finalizeHorizontalAlignment_();
        this.finalizeVerticalAlignment_();
        super.finalize_();
        if(this.rightSide) {
            this.widthWithChildren += this.rightSide.width;
        }
    }
}

export default WebyRenderInfo;