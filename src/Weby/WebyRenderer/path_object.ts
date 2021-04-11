/* tslint:disable: variable-name */
import Blockly from 'blockly/core';

class WebyPathObject extends Blockly.blockRendering.PathObject {
    constructor(root: SVGElement, style: Blockly.Theme.BlockStyle, constants: Blockly.blockRendering.ConstantProvider ) {
        super(root, style, constants);
        this.constants = constants;
    }

    constants: any = null;
    svgPathSelected_: any = null;
    outlines_: any = {};
    remainingOutlines_: any = null;
    outputShapeType: any = null;

    setPath(pathString: string): void {
        super.setPath(pathString);
        if (this.svgPathSelected_) {
            this.svgPathSelected_.setAttribute('d', pathString);
        }
    }

    applyColour(block: Blockly.Block): void {
        super.applyColour(block);
        if (block.isShadow() && block.getParent()) {
            this.svgPath.setAttribute('stroke', (block.getParent() as any).style.colourTertiary);
        }
        for (let i: number = 0, keys: string[] = Object.keys(this.outlines_), key: string;
            // tslint:disable-next-line: no-conditional-assignment
            (key = keys[i]); i++) {
            this.outlines_[key].setAttribute('fill', this.style.colourTertiary);
        }
    }

    flipRTL(): void {
        super.flipRTL();
        for (let i: number = 0, keys: string[] = Object.keys(this.outlines_), key: string;
            // tslint:disable-next-line: no-conditional-assignment
            (key = keys[i]); i++) {
            this.outlines_[key].setAttribute('transform', 'scale(-1 1)');
        }
    }

    updateSelected(enable: boolean): void {
        this.setClass_('blocklySelected', enable);
        if (enable) {
            if (!this.svgPathSelected_) {
                this.svgPathSelected_ = this.svgPath.cloneNode(true);
                this.svgPathSelected_.setAttribute('fill', 'none');
                this.svgPathSelected_.setAttribute('filter', 'url(#' + this.constants.selectedGlowFilterId + ')');
                (this as any).svgRoot.appendChild(this.svgPathSelected_);
            }
        } else {
            if (this.svgPathSelected_) {
                (this as any).svgRoot.removeChild(this.svgPathSelected_);
                this.svgPathSelected_ = null;
            }
        }
    }

    updateReplacementFade(enable: boolean): void {
        this.setClass_('blocklyReplaceable', enable);
        if (enable) {
            this.svgPath.setAttribute('filter', 'url(#' + this.constants.replacementGlowFilterId + ')');
        } else {
            this.svgPath.removeAttribute('filter');
        }
    }

    updateShapeForInputHighlight(conn: any, enable: boolean): void {
        const name: string = conn.getParentInput().name;
        const outlinePath: SVGPathElement = this.getOutlinePath_(name);
        if (!outlinePath) {
            return;
        }
        if (enable) {
            outlinePath.setAttribute('filter', 'url(#' + this.constants.replacementGlowFilterId + ')');
        } else {
            outlinePath.removeAttribute('filter');
        }
    }

    beginDrawing(): void {
        this.remainingOutlines_ = {};
        for (let i: number = 0, keys: string[] = Object.keys(this.outlines_), key: string;
            // tslint:disable-next-line: no-conditional-assignment
            (key = keys[i]); i++) {
            this.remainingOutlines_[key] = 1;
        }
    }

    endDrawing(): void {
        if (this.remainingOutlines_) {
            for (let i: number = 0, keys: string[] = Object.keys(this.remainingOutlines_), key: string;
                // tslint:disable-next-line: no-conditional-assignment
                (key = keys[i]); i++) {
                this.removeOutlinePath_(key);
            }
        }
        this.remainingOutlines_ = null;
    }

    setOutlinePath(name: string, pathString: string): void {
        const outline: SVGPathElement = this.getOutlinePath_(name);
        outline.setAttribute('d', pathString);
        outline.setAttribute('fill', this.style.colourTertiary);
    }

    getOutlinePath_(name: string): SVGPathElement {
        if (!this.outlines_[name]) {
            this.outlines_[name] = Blockly.utils.dom.createSvgElement(
                Blockly.utils.Svg.PATH, {
                    'class': 'blocklyOutlinePath',
                    'd': ''
                },
                (this as any).svgRoot);
        }
        if (this.remainingOutlines_) {
            delete this.remainingOutlines_[name];
        }
        return this.outlines_[name];
    }

    removeOutlinePath_(name: string): void {
        this.outlines_[name].parentNode.removeChild(this.outlines_[name]);
        delete this.outlines_[name];
    }
}

export default WebyPathObject;