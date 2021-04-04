import Blockly from 'blockly/core';
import WebyConstantsProvider from './constants';
import WebyRenderInfo from './info';
import WebyDrawer from './drawer';
import WebyMakerSvg from './maker_svg';
import WebyPathObject from './path_object';

class WebyRenderer extends Blockly.blockRendering.Renderer {
    // eslint-disable-next-line no-useless-constructor
    constructor(name) {
        super(name);
    }
    
    makeConstants_() {
        return new WebyConstantsProvider();
    }
    
    makeRenderInfo_(block) {
        return new WebyRenderInfo(this, block);
    }
    
    makeDrawer_(block, info) {
        return new WebyDrawer(block, info);
    }
    
    makeMarkerDrawer(workspace, maker) {
        return new WebyMakerSvg(workspace, this.getConstants(), maker);
    }
    
    makePathObject(root, style) {
        return new WebyPathObject(root, style, this.getConstants());
    }
    
    shouldHighlightConnection(conn) {
        return conn.type !== Blockly.INPUT_VALUE && conn.type !== Blockly.OUTPUT_VALUE;
    }

    getConnectionPreviewMethod(closest, local, topBlock) {
        if (local.type === Blockly.OUTPUT_VALUE) {
            if (!closest.isConnected()) {
              return Blockly.InsertionMarkerManager.PREVIEW_TYPE.INPUT_OUTLINE;
            }
            return Blockly.InsertionMarkerManager.PREVIEW_TYPE.REPLACEMENT_FADE;
          }
    
          return super.getConnectionPreviewMethod(closest, local, topBlock);
    }
}

Blockly.blockRendering.register('weby', WebyRenderer);

export default WebyRenderer;