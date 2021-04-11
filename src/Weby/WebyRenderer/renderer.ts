import Blockly from 'blockly/core';
import WebyConstantsProvider from './constants';
import WebyRenderInfo from './info';
import WebyDrawer from './drawer';
import WebyMakerSvg from './maker_svg';
import WebyPathObject from './path_object';

class WebyRenderer extends Blockly.blockRendering.Renderer {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(name: any) {
        super(name);
    }

    makeConstants_(): any {
        return new WebyConstantsProvider();
    }

    makeRenderInfo_(block: any): WebyRenderInfo {
        return new WebyRenderInfo(this, block);
    }

    makeDrawer_(block: any, info: any): WebyDrawer {
        return new WebyDrawer(block, info);
    }

    makeMarkerDrawer(workspace: any, maker: any): WebyMakerSvg {
        return new WebyMakerSvg(workspace, this.getConstants(), maker);
    }

    makePathObject(root: any, style: any): WebyPathObject {
        return new WebyPathObject(root, style, this.getConstants());
    }

    shouldHighlightConnection(conn: any): boolean{
        return conn.type !== Blockly.INPUT_VALUE && conn.type !== Blockly.OUTPUT_VALUE;
    }

    getConnectionPreviewMethod(closest: any, local: any, topBlock: any): any {
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