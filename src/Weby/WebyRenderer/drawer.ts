import Blockly from 'blockly/core';

class WebyDrawer extends Blockly.blockRendering.Drawer {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(block: Blockly.BlockSvg, info: Blockly.blockRendering.RenderInfo) {
        super(block, info);
    }

    public draw(): void {
        const pathObject: any = (this as any).block_.pathObject;
        pathObject.beginDrawing();
        this.hideHiddenIcons_();
        this.drawOutline_();
        this.drawInternals_();

        pathObject.setPath((this as any).outlinePath_ + '\n' + (this as any).inlinePath_);
        if ((this as any).info_.RTL) {
            pathObject.flipRTL();
        }
        if (Blockly.blockRendering.useDebugger) {
            (this as any).block_.renderingDebugger.drawDebug((this as any).block_, (this as any).info_);
        }
        this.recordSizeOnBlock_();
        if ((this as any).info_.outputConnection) {
            pathObject.outputShapeType = (this as any).info_.outputConnection.shape.type;
        }
        pathObject.endDrawing();
    }

    public drawOutline_(): void {
        if ((this as any).info_.outputConnection &&
            (this as any).info_.outputConnection.isDynamicShape &&
            !(this as any).info_.hasStatementInput &&
            !(this as any).info_.bottomRow.hasNextConnection) {
            this.drawFlatTop_();
            this.drawRightDynamicConnection_();
            this.drawFlatBottom_();
            this.drawLeftDynamicConnection_();
        } else {
            super.drawOutline_();
        }
    }

    public drawLeft_(): void {
        if ((this as any).info_.outputConnection &&
            (this as any).info_.outputConnection.isDynamicShape) {
            this.drawLeftDynamicConnection_();
        } else {
            super.drawLeft_();
        }
    }

    public drawRightSideRow_(row: any): void {
        if (row.height <= 0) {
            return;
        }
        if (row.precedesStatement || row.followsStatement) {
            const cornerHeight: number = (this.constants_.INSIDE_CORNERS as any).rightHeight;
            const remainingHeight: number = row.height - (row.precedesStatement ? cornerHeight : 0);
            (this as any).outlinePath_ +=
                (row.followsStatement ? (this.constants_.INSIDE_CORNERS as any).pathBottomRight : '') +
                (remainingHeight > 0 ? Blockly.utils.svgPaths.lineOnAxis('V', row.yPos + remainingHeight) : '') +
                (row.precedesStatement ? (this.constants_.INSIDE_CORNERS as any).pathTopRight : '');
        } else {
            (this as any).outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('V', row.yPos + row.height);
        }
    }

    public drawRightDynamicConnection_(): void {
        (this as any).outlinePath_ += (this as any).info_.outputConnection.shape.pathRightDown((this as any).info_.outputConnection.height);
    }

    public drawLeftDynamicConnection_(): void {
        this.positionOutputConnection_();
        (this as any).outlinePath_ += (this as any).info_.outputConnection.shape.pathUp((this as any).info_.outputConnection.height);
        (this as any).outlinePath_ += 'z';
    }

    public drawFlatTop_(): void {
        const topRow = (this as any).info_.topRow;
        this.positionPreviousConnection_();
        (this as any).outlinePath_ += Blockly.utils.svgPaths.moveBy(topRow.xPos, (this as any).info_.startY);
        (this as any).outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('h', topRow.width);
    }

    public drawFlatBottom_(): void {
        const bottomRow = (this as any).info_.bottomRow;
        this.positionNextConnection_();
        (this as any).outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('V', bottomRow.baseline);
        (this as any).outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('h', -bottomRow.width);
    }

    public drawInlineInput_(input: any): void {
        this.positionInlineInputConnection_(input);

        const inputName: string = input.input.name;
        if (input.connectedBlock || (this as any).info_.isInsertionMarker) {
            return;
        }

        const width: number = input.width - (input.connectionWidth * 2);
        const height: number = input.height;
        const yPos: number = input.centerline - height / 2;

        const connectionRight: number = input.xPos + input.connectionWidth;

        const outlinePath = Blockly.utils.svgPaths.moveTo(connectionRight, yPos) +
            Blockly.utils.svgPaths.lineOnAxis('h', width) +
            input.shape.pathRightDown(input.height) +
            Blockly.utils.svgPaths.lineOnAxis('h', -width) +
            input.shape.pathUp(input.height) +
            'z';
        (this as any).block_.pathObject.setOutlinePath(inputName, outlinePath);
    }

    public drawStatementInput_(row: any) {
        const input: any = row.getLastInput();
        const x: number = input.xPos + input.notchOffset + input.shape.width;

        const innerTopLeftCorner: string =
            input.shape.pathRight +
            Blockly.utils.svgPaths.lineOnAxis('h', -(input.notchOffset - (this.constants_.INSIDE_CORNERS as any).width)) +
            (this.constants_.INSIDE_CORNERS as any).pathTop;

        const innerHeight: number =
            row.height - (2 * (this.constants_.INSIDE_CORNERS as any).height);

        const innerBottomLeftCorner: string =
            (this.constants_.INSIDE_CORNERS as any).pathBottom +
            Blockly.utils.svgPaths.lineOnAxis('h', (input.notchOffset - (this.constants_.INSIDE_CORNERS as any).width)) +
            (input.connectedBottomNextConnection ? '' : input.shape.pathLeft);

        (this as any).outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('H', x) +
            innerTopLeftCorner +
            Blockly.utils.svgPaths.lineOnAxis('v', innerHeight) +
            innerBottomLeftCorner +
            Blockly.utils.svgPaths.lineOnAxis('H', row.xPos + row.width);

        this.positionStatementInputConnection_(row);
    }
}

export default WebyDrawer;