import Blockly from 'blockly/core';

class WebyPathObject extends Blockly.blockRendering.PathObject {
    constructor(root, style, constants) {
        super(root, style, constants);
        this.constants = constants;
        this.svgPathSelected_ = null;
        this.outlines_ = {};
        this.remainingOutlines_ = null;
        this.outputShapeType = null;
    }

    setPath(pathString) {
        super.setPath(pathString);
        if (this.svgPathSelected_) {
            this.svgPathSelected_.setAttribute('d', pathString);
        }
    }

    applyColour(block) {
        super.applyColour(block);
        if (block.isShadow() && block.getParent()) {
            this.svgPath.setAttribute('stroke', block.getParent().style.colourTertiary);
        }
        for (var i = 0, keys = Object.keys(this.outlines_), key;
            (key = keys[i]); i++) {
            this.outlines_[key].setAttribute('fill', this.style.colourTertiary);
        }
    }

    flipRTL() {
        super.flipRTL();
        for (var i = 0, keys = Object.keys(this.outlines_),
                key;
            (key = keys[i]); i++) {
            this.outlines_[key].setAttribute('transform', 'scale(-1 1)');
        }
    }

    updateSelected(enable) {
        this.setClass_('blocklySelected', enable);
        if (enable) {
            if (!this.svgPathSelected_) {
                this.svgPathSelected_ = this.svgPath.cloneNode(true);
                this.svgPathSelected_.setAttribute('fill', 'none');
                this.svgPathSelected_.setAttribute('filter', 'url(#' + this.constants.selectedGlowFilterId + ')');
                this.svgRoot.appendChild(this.svgPathSelected_);
            }
        } else {
            if (this.svgPathSelected_) {
                this.svgRoot.removeChild(this.svgPathSelected_);
                this.svgPathSelected_ = null;
            }
        }
    }

    updateReplacementFade(enable) {
        this.setClass_('blocklyReplaceable', enable);
        if (enable) {
            this.svgPath.setAttribute('filter', 'url(#' + this.constants.replacementGlowFilterId + ')');
        } else {
            this.svgPath.removeAttribute('filter');
        }
    }

    updateShapeForInputHighlight(conn, enable) {
        var name = conn.getParentInput().name;
        var outlinePath = this.getOutlinePath_(name);
        if (!outlinePath) {
            return;
        }
        if (enable) {
            outlinePath.setAttribute('filter', 'url(#' + this.constants.replacementGlowFilterId + ')');
        } else {
            outlinePath.removeAttribute('filter');
        }
    }

    beginDrawing() {
        this.remainingOutlines_ = {};
        for (var i = 0, keys = Object.keys(this.outlines_), key;
            (key = keys[i]); i++) {
            this.remainingOutlines_[key] = 1;
        }
    }

    endDrawing() {
        if (this.remainingOutlines_) {
            for (var i = 0, keys = Object.keys(this.remainingOutlines_), key;
                (key = keys[i]); i++) {
                this.removeOutlinePath_(key);
            }
        }
        this.remainingOutlines_ = null;
    }

    setOutlinePath(name, pathString) {
        var outline = this.getOutlinePath_(name);
        outline.setAttribute('d', pathString);
        outline.setAttribute('fill', this.style.colourTertiary);
    }

    getOutlinePath_(name) {
        if (!this.outlines_[name]) {
            this.outlines_[name] = Blockly.utils.dom.createSvgElement(
                Blockly.utils.Svg.PATH, {
                    'class': 'blocklyOutlinePath',
                    'd': ''
                },
                this.svgRoot);
        }
        if (this.remainingOutlines_) {
            delete this.remainingOutlines_[name];
        }
        return this.outlines_[name];
    }

    removeOutlinePath_(name) {
        this.outlines_[name].parentNode.removeChild(this.outlines_[name]);
        delete this.outlines_[name];
    }
}

export default WebyPathObject;