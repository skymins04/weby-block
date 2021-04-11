import Blockly from 'blockly/core';
import { WebyTopRow, WebyBottomRow } from './measurables/rows';
import WebyRightConnectionShape from './measurables/row_elements';

class WebyRenderInfo extends Blockly.blockRendering.RenderInfo {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(renderer: any, block: any) {
        super(renderer, block);
        this.isMultiRow = !block.getInputsInline() || block.isCollapsed();
        this.hasStatementInput= block.statementInputCount > 0;
    }

    topRow: WebyTopRow = new WebyTopRow(this.constants_);
    bottomRow: WebyBottomRow = new WebyBottomRow(this.constants_);
    isInline: boolean = true;
    isMultiRow: boolean = false;
    hasStatementInput: boolean = false;
    rightSide: WebyRightConnectionShape | any = this.outputConnection ? new WebyRightConnectionShape(this.constants_) : null;

    getRenderer(): Blockly.blockRendering.Renderer {
        return this.renderer_;
    }

    measure(): void {
        this.createRows_();
        this.addElemSpacing_();
        this.addRowSpacing_();
        this.adjustXPosition_();
        this.computeBounds_();
        this.alignRowElements_();
        this.finalize_();
    }

    shouldStartNewRow_(input: any, lastInput: any): boolean {
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

    getDesiredRowWidth_(row: any): number {
        if (row.hasStatement) {
            const rightCornerWidth: number = (this.constants_.INSIDE_CORNERS as any).rightWidth || 0;
            return this.width - rightCornerWidth;
        }
        return super.getDesiredRowWidth_(row);
    }

    getInRowSpacing_(prev: any, next: any): number {
        if (!prev || !next) {
            if (this.outputConnection && (this.outputConnection as any).isDynamicShape &&
                !this.hasStatementInput && !this.bottomRow.hasNextConnection) {
                return this.constants_.NO_PADDING;
            }
        }
        if (!prev) {
            if (next && Blockly.blockRendering.Types.isStatementInput(next)) {
                return (this.constants_ as any).STATEMENT_INPUT_PADDING_LEFT;
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

    getSpacerRowHeight_(prev: any, next: any): number {
        if (Blockly.blockRendering.Types.isTopRow(prev) &&
            Blockly.blockRendering.Types.isBottomRow(next)) {
            return (this.constants_ as any).EMPTY_BLOCK_SPACER_HEIGHT;
        }
        const followsStatement: boolean =
            Blockly.blockRendering.Types.isInputRow(prev) && prev.hasStatement;
        const precedesStatement: boolean =
            Blockly.blockRendering.Types.isInputRow(next) && next.hasStatement;
        if (precedesStatement || followsStatement) {
            const cornerHeight: number = (this.constants_.INSIDE_CORNERS as any).rightHeight || 0;
            const height: number = Math.max(this.constants_.NOTCH_HEIGHT, cornerHeight);
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
                const topHeight: number = Math.max(this.topRow.minHeight,
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

    getSpacerRowWidth_(prev: any, next: any): number {
        const width = this.width - (this as any).startX;
        if ((Blockly.blockRendering.Types.isInputRow(prev) && prev.hasStatement) ||
            (Blockly.blockRendering.Types.isInputRow(next) && next.hasStatement)) {
            return Math.max(width, (this.constants_ as any).STATEMENT_INPUT_SPACER_MIN_WIDTH);
        }
        return width;
    }

    getElemCenterline_(row: any, elem: Blockly.blockRendering.Row | Blockly.blockRendering.Measurable): number {
        if (row.hasStatement && !Blockly.blockRendering.Types.isSpacer(elem) &&
            !Blockly.blockRendering.Types.isStatementInput(elem)) {
            return row.yPos + this.constants_.EMPTY_STATEMENT_INPUT_HEIGHT / 2;
        }
        if (Blockly.blockRendering.Types.isInlineInput(elem)) {
            const connectedBlock: any = (elem as any).connectedBlock;
            if (connectedBlock && connectedBlock.outputConnection &&
                connectedBlock.nextConnection) {
                return row.yPos + connectedBlock.height / 2;
            }
        }
        return super.getElemCenterline_(row, elem);
    }

    addInput_(input: any, activeRow: any): void {
        if (input.type === Blockly.DUMMY_INPUT && activeRow.hasDummyInput &&
            activeRow.align === Blockly.ALIGN_LEFT &&
            input.align === Blockly.ALIGN_RIGHT) {
            activeRow.rightAlignedDummyInput = input;
        }
        super.addInput_(input, activeRow);
    }

    addAlignmentPadding_(row: any, missingSpace: any): void {
        if (row.rightAlignedDummyInput) {
            let alignmentDivider: any;
            for (let i: number = 0, elem: any;
                // tslint:disable-next-line: no-conditional-assignment
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

    adjustXPosition_(): void {
        const notchTotalWidth: number = this.constants_.NOTCH_OFFSET_LEFT + this.constants_.NOTCH_WIDTH;
        let minXPos: number = notchTotalWidth;
        for (let i = 2; i < this.rows.length - 1; i += 2) {
            const prevSpacer: any = this.rows[i - 1];
            const row: any = this.rows[i];
            const nextSpacer: any = this.rows[i + 1];

            const hasPrevNotch: boolean = i === 2 ?
                !!this.topRow.hasPreviousConnection : !!(prevSpacer as any).followsStatement;
            const hasNextNotch: boolean = i + 2 >= this.rows.length - 1 ?
                !!this.bottomRow.hasNextConnection : !!(nextSpacer as any).precedesStatement;

            if (Blockly.blockRendering.Types.isInputRow(row) && row.hasStatement) {
                row.measure();
                minXPos = row.width - (row.getLastInput() as any).width + notchTotalWidth;
            } else if (hasPrevNotch && (i === 2 || hasNextNotch) &&
                Blockly.blockRendering.Types.isInputRow(row) && !row.hasStatement) {
                let xCursor: number = row.xPos;
                let prevInRowSpacer: any = null;
                for (let j: number = 0, elem: any;
                    // tslint:disable-next-line: no-conditional-assignment
                    (elem = row.elements[j]); j++) {
                    if (Blockly.blockRendering.Types.isSpacer(elem)) {
                        prevInRowSpacer = elem;
                    }
                    if (prevInRowSpacer && (Blockly.blockRendering.Types.isField(elem) ||
                            Blockly.blockRendering.Types.isInput(elem))) {
                        if (xCursor < minXPos &&
                            !(Blockly.blockRendering.Types.isField(elem) &&
                                ((elem as any).field instanceof Blockly.FieldLabel ||
                                    (elem as any).field instanceof Blockly.FieldImage))) {
                            const difference = minXPos - xCursor;
                            prevInRowSpacer.width += difference;
                        }
                    }
                    xCursor += (elem as any).width;
                }
            }
        }
    }

    finalizeOutputConnection_(): void {
        if (!this.outputConnection || !(this.outputConnection as any).isDynamicShape) {
            return;
        }
        let yCursor = 0;
        for (let i: number = 0, row: any;
            // tslint:disable-next-line: no-conditional-assignment
            (row = this.rows[i]); i++) {
            row.yPos = yCursor;
            yCursor += row.height;
        }
        this.height = yCursor;

        const blockHeight: number = this.bottomRow.hasNextConnection ? this.height - this.bottomRow.descenderHeight : this.height;
        const connectionHeight: number = (this.outputConnection as any).shape.height(blockHeight);
        const connectionWidth: number = (this.outputConnection as any).shape.width(blockHeight);

        (this.outputConnection as any).height = connectionHeight;
        (this.outputConnection as any).width = connectionWidth;
        (this.outputConnection as any).startX = connectionWidth;
        (this.outputConnection as any).connectionOffsetY = (this.outputConnection as any).shape.connectionOffsetY(connectionHeight);
        (this.outputConnection as any).connectionOffsetX = (this.outputConnection as any).shape.connectionOffsetX(connectionWidth);

        let rightConnectionWidth: number = 0;
        if (!this.hasStatementInput && !this.bottomRow.hasNextConnection) {
            rightConnectionWidth = connectionWidth;
            this.rightSide.height = connectionHeight;
            this.rightSide.width = rightConnectionWidth;
            this.rightSide.centerline = connectionHeight / 2;
            this.rightSide.xPos = this.width + rightConnectionWidth;
        }
        (this as any).startX = connectionWidth;
        this.width += connectionWidth + rightConnectionWidth;
        this.widthWithChildren += connectionWidth + rightConnectionWidth;
    }

    finalizeHorizontalAlignment_(): void {
        if (!this.outputConnection || this.hasStatementInput ||
            this.bottomRow.hasNextConnection) {
            return;
        }
        let totalNegativeSpacing = 0;
        for (let i: number = 0, row: any;
            // tslint:disable-next-line: no-conditional-assignment
            (row = this.rows[i]); i++) {
            if (!Blockly.blockRendering.Types.isInputRow(row)) {
                continue;
            }
            const firstElem: any = row.elements[1];
            const lastElem: any = row.elements[row.elements.length - 2];
            let leftNegPadding: number = this.getNegativeSpacing_(firstElem);
            let rightNegPadding: number = this.getNegativeSpacing_(lastElem);
            totalNegativeSpacing = leftNegPadding + rightNegPadding;
            const minBlockWidth: number = this.constants_.MIN_BLOCK_WIDTH +
                (this.outputConnection as any).width * 2;
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
            for (let i: number = 0, row: any;
                // tslint:disable-next-line: no-conditional-assignment
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

    getNegativeSpacing_(elem: Blockly.blockRendering.Measurable): number {
        if (!elem) {
            return 0;
        }
        const connectionWidth: number = (this.outputConnection as any).width;
        const outerShape: any = (this.outputConnection as any).shape.type;
        const constants: Blockly.blockRendering.ConstantProvider = this.constants_;
        if (this.isMultiRow && this.inputRows.length > 1) {
            switch (outerShape) {
                case constants.SHAPES.ROUND:
                    const maxWidth: number = (this.constants_ as any).MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH;
                    const width: number = this.height / 2 > maxWidth ? maxWidth : this.height / 2;
                    const topPadding: number = this.constants_.SMALL_PADDING;
                    const roundPadding: number = width *
                        (1 - Math.sin(Math.acos((width - topPadding) / width)));
                    return connectionWidth - roundPadding;
                default:
                    return 0;
            }
        }
        if (Blockly.blockRendering.Types.isInlineInput(elem)) {
            const connectedBlock: any = (elem as any).connectedBlock;
            const innerShape: any = connectedBlock ?
                connectedBlock.pathObject.outputShapeType :
                (elem as any).shape.type;
            if (connectedBlock && connectedBlock.outputConnection &&
                (connectedBlock.statementInputCount || connectedBlock.nextConnection)) {
                return 0;
            }
            if (outerShape === constants.SHAPES.HEXAGONAL && outerShape !== innerShape) {
                return 0;
            }
            return connectionWidth -
                (this.constants_ as any).SHAPE_IN_SHAPE_PADDING[outerShape][innerShape];
        } else if (Blockly.blockRendering.Types.isField(elem)) {
            if (outerShape === constants.SHAPES.ROUND &&
                (elem as any).field instanceof Blockly.FieldTextInput) {
                return connectionWidth - (2.75 * (constants as any).GRID_UNIT);
            }
            return connectionWidth -
                (this.constants_ as any).SHAPE_IN_SHAPE_PADDING[outerShape][0];
        } else if (Blockly.blockRendering.Types.isIcon(elem)) {
            return this.constants_.SMALL_PADDING;
        }
        return 0;
    }

    finalizeVerticalAlignment_(): void {
        if (this.outputConnection) {
            return;
        }
        for (let i = 2; i < this.rows.length - 1; i += 2) {
            const prevSpacer: any = this.rows[i - 1];
            const row: any = this.rows[i];
            const nextSpacer: any = this.rows[i + 1];

            const firstRow: boolean = i === 2;
            const hasPrevNotch: boolean = firstRow ?
                !!this.topRow.hasPreviousConnection : !!prevSpacer.followsStatement;
            const hasNextNotch: boolean = i + 2 >= this.rows.length - 1 ?
                !!this.bottomRow.hasNextConnection : !!nextSpacer.precedesStatement;

            if (hasPrevNotch) {
                const hasSingleTextOrImageField: boolean = row.elements.length === 3 &&
                    (row.elements[1].field instanceof Blockly.FieldLabel ||
                        row.elements[1].field instanceof Blockly.FieldImage);
                if (!firstRow && hasSingleTextOrImageField) {
                    prevSpacer.height -= this.constants_.SMALL_PADDING;
                    nextSpacer.height -= this.constants_.SMALL_PADDING;
                    row.height -= this.constants_.MEDIUM_PADDING;
                } else if (!firstRow && !hasNextNotch) {
                    prevSpacer.height += this.constants_.SMALL_PADDING;
                } else if (hasNextNotch) {
                    let hasNonShadowConnectedBlocks: boolean = false;
                    const MIN_VERTICAL_TIGHTNESTING_HEIGHT: number = 40;
                    for (let j: number = 0, elem: any;
                        // tslint:disable-next-line: no-conditional-assignment
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

    finalize_(): void {
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