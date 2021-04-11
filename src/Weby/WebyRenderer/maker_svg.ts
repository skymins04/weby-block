import Blockly from 'blockly/core';

class WebyMakerSvg extends Blockly.blockRendering.MarkerSvg {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(workspace: Blockly.WorkspaceSvg, constants: Blockly.blockRendering.ConstantProvider, maker: Blockly.Marker) {
        super(workspace, constants, maker);
    }

    public showWithInputOutput(curNode: Blockly.ASTNode): void {
        const block: any = curNode.getSourceBlock();
        const connection: any = curNode.getLocation();
        const offsetInBlock: any = connection.getOffsetInBlock();

        this.positionCircle_(offsetInBlock.x, offsetInBlock.y);
        this.setParent_(block);
        this.showCurrent_();
    }

    public showWithOutput_(curNode: Blockly.ASTNode): void {
        this.showWithInputOutput(curNode);
    }

    public showWithInput_(curNode: Blockly.ASTNode): void {
        this.showWithInputOutput(curNode);
    }

    public showWithBlock_(curNode: Blockly.ASTNode): void {
        const block: any = curNode.getLocation();
        const heightWidth: any = block.getHeightWidth();
        this.positionRect_(0, 0, heightWidth.width, heightWidth.height);
        this.setParent_(block);
        this.showCurrent_();
    }

    public positionCircle_(x: number, y: number): void {
        (this as any).markerCircle_.setAttribute('cx', x);
        (this as any).markerCircle_.setAttribute('cy', y);
        this.currentMarkerSvg = (this as any).markerCircle_;
    }

    public hide(): void {
        super.hide();
        (this as any).markerCircle_.style.display = 'none';
    }

    public createDomInternal_(): any {
        super.createDomInternal_();

        (this as any).markerCircle_ = Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.CIRCLE, {
                'r': (this.constants_ as any).CURSOR_RADIUS,
                'style': 'display: none',
                'stroke-width': this.constants_.CURSOR_STROKE_WIDTH
            },
            (this as any).markerSvg_);

        if (this.isCursor()) {
            const blinkProperties: object = this.getBlinkProperties_();
            Blockly.utils.dom.createSvgElement(
                Blockly.utils.Svg.ANIMATE, blinkProperties,
                (this as any).markerCircle_);
        }

        return (this as any).markerSvg_;
    }

    public applyColour_(curNode: Blockly.ASTNode): void {
        super.applyColour_(curNode);
        (this as any).markerCircle_.setAttribute('fill', this.colour_);
        (this as any).markerCircle_.setAttribute('stroke', this.colour_);

        if (this.isCursor()) {
            const values: string = this.colour_ + ';transparent;transparent;';
            (this as any).markerCircle_.firstChild.setAttribute('values', values);
        }
    }
}

export default WebyMakerSvg;