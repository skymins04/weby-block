import Blockly from 'blockly/core';

class WebyDrawer extends Blockly.blockRendering.Drawer {
    constructor(block, info) {
        super(block, info);
    }

    draw() {
        var pathObject = this.block_.pathObject;
        pathObject.beginDrawing();
        this.hideHiddenIcons_();
        this.drawOutline_();
        this.drawInternals_();

        pathObject.setPath(this.outlinePath_ + '\n' + this.inlinePath_);
        if (this.info_.RTL) {
            pathObject.flipRTL();
        }
        if (Blockly.blockRendering.useDebugger) {
            this.block_.renderingDebugger.drawDebug(this.block_, this.info_);
        }
        this.recordSizeOnBlock_();
        if (this.info_.outputConnection) {
            pathObject.outputShapeType = this.info_.outputConnection.shape.type;
        }
        pathObject.endDrawing();
    }

    drawOutline_() {
        if (this.info_.outputConnection &&
            this.info_.outputConnection.isDynamicShape &&
            !this.info_.hasStatementInput &&
            !this.info_.bottomRow.hasNextConnection) {
            this.drawFlatTop_();
            this.drawRightDynamicConnection_();
            this.drawFlatBottom_();
            this.drawLeftDynamicConnection_();
        } else {
            super.drawOutline_();
        }
    }

    drawLeft_() {
        if (this.info_.outputConnection &&
            this.info_.outputConnection.isDynamicShape) {
            this.drawLeftDynamicConnection_();
        } else {
            super.drawLeft_();
        }
    }

    drawRightSideRow_(row) {
        if (row.height <= 0) {
            return;
        }
        if (row.precedesStatement || row.followsStatement) {
            var cornerHeight = this.constants_.INSIDE_CORNERS.rightHeight;
            var remainingHeight = row.height - (row.precedesStatement ? cornerHeight : 0);
            this.outlinePath_ +=
                (row.followsStatement ? this.constants_.INSIDE_CORNERS.pathBottomRight : '') +
                (remainingHeight > 0 ? Blockly.utils.svgPaths.lineOnAxis('V', row.yPos + remainingHeight) : '') +
                (row.precedesStatement ? this.constants_.INSIDE_CORNERS.pathTopRight : '');
        } else {
            this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('V', row.yPos + row.height);
        }
    }

    drawRightDynamicConnection_() {
        this.outlinePath_ += this.info_.outputConnection.shape.pathRightDown(this.info_.outputConnection.height);
    }

    drawLeftDynamicConnection_() {
        this.positionOutputConnection_();
        this.outlinePath_ += this.info_.outputConnection.shape.pathUp(this.info_.outputConnection.height);
        this.outlinePath_ += 'z';
    }

    drawFlatTop_() {
        var topRow = this.info_.topRow;
        this.positionPreviousConnection_();
        this.outlinePath_ += Blockly.utils.svgPaths.moveBy(topRow.xPos, this.info_.startY);
        this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('h', topRow.width);
    }

    drawFlatBottom_() {
        var bottomRow = this.info_.bottomRow;
        this.positionNextConnection_();
        this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('V', bottomRow.baseline);
        this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('h', -bottomRow.width);
    }

    drawInlineInput_(input) {
        this.positionInlineInputConnection_(input);

        var inputName = input.input.name;
        if (input.connectedBlock || this.info_.isInsertionMarker) {
            return;
        }

        var width = input.width - (input.connectionWidth * 2);
        var height = input.height;
        var yPos = input.centerline - height / 2;

        var connectionRight = input.xPos + input.connectionWidth;

        var outlinePath = Blockly.utils.svgPaths.moveTo(connectionRight, yPos) +
            Blockly.utils.svgPaths.lineOnAxis('h', width) +
            input.shape.pathRightDown(input.height) +
            Blockly.utils.svgPaths.lineOnAxis('h', -width) +
            input.shape.pathUp(input.height) +
            'z';
        this.block_.pathObject.setOutlinePath(inputName, outlinePath);
    }

    drawStatementInput_(row) {
        var input = row.getLastInput();
        var x = input.xPos + input.notchOffset + input.shape.width;

        var innerTopLeftCorner =
            input.shape.pathRight +
            Blockly.utils.svgPaths.lineOnAxis('h', -(input.notchOffset - this.constants_.INSIDE_CORNERS.width)) +
            this.constants_.INSIDE_CORNERS.pathTop;

        var innerHeight =
            row.height - (2 * this.constants_.INSIDE_CORNERS.height);

        var innerBottomLeftCorner =
            this.constants_.INSIDE_CORNERS.pathBottom +
            Blockly.utils.svgPaths.lineOnAxis('h', (input.notchOffset - this.constants_.INSIDE_CORNERS.width)) +
            (input.connectedBottomNextConnection ? '' : input.shape.pathLeft);

        this.outlinePath_ += Blockly.utils.svgPaths.lineOnAxis('H', x) +
            innerTopLeftCorner +
            Blockly.utils.svgPaths.lineOnAxis('v', innerHeight) +
            innerBottomLeftCorner +
            Blockly.utils.svgPaths.lineOnAxis('H', row.xPos + row.width);

        this.positionStatementInputConnection_(row);
    }
}

export default WebyDrawer;