import Blockly from 'blockly/core';

class WebyMakerSvg extends Blockly.blockRendering.MarkerSvg {
    constructor(workspace, constants, maker) {
        super(workspace, constants, maker);
    }

    showWithInputOutput(curNode) {
        var block = curNode.getSourceBlock();
        var connection = curNode.getLocation();
        var offsetInBlock = connection.getOffsetInBlock();

        this.positionCircle_(offsetInBlock.x, offsetInBlock.y);
        this.setParent_(block);
        this.showCurrent_();
    }

    showWithOutput_(curNode) {
        this.showWithInputOutput(curNode);
    }

    showWithInput_(curNode) {
        this.showWithInputOutput(curNode);
    }

    showWithBlock_(curNode) {
        var block = curNode.getLocation();
        var heightWidth = block.getHeightWidth();
        this.positionRect_(0, 0, heightWidth.width, heightWidth.height);
        this.setParent_(block);
        this.showCurrent_();
    }

    positionCircle_(x, y) {
        this.markerCircle_.setAttribute('cx', x);
        this.markerCircle_.setAttribute('cy', y);
        this.currentMarkerSvg = this.markerCircle_;
    }

    hide() {
        super.hide();
        this.markerCircle_.style.display = 'none';
    }

    createDomInternal_() {
        super.createDomInternal_();

        this.markerCircle_ = Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.CIRCLE, {
                'r': this.constants_.CURSOR_RADIUS,
                'style': 'display: none',
                'stroke-width': this.constants_.CURSOR_STROKE_WIDTH
            },
            this.markerSvg_);

        if (this.isCursor()) {
            var blinkProperties = this.getBlinkProperties_();
            Blockly.utils.dom.createSvgElement(
                Blockly.utils.Svg.ANIMATE, blinkProperties,
                this.markerCircle_);
        }

        return this.markerSvg_;
    }

    applyColour_(curNode) {
        super.applyColour_(curNode);
        this.markerCircle_.setAttribute('fill', this.colour_);
        this.markerCircle_.setAttribute('stroke', this.colour_);

        if (this.isCursor()) {
            var values = this.colour_ + ';transparent;transparent;';
            this.markerCircle_.firstChild.setAttribute('values', values);
        }
    }
}

export default WebyMakerSvg;