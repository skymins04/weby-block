import Blockly from 'blockly/core';
import WebyConstantsProvider from './constants';
import WebyRenderInfo from './info';
import WebyDrawer from './drawer';
import WebyMakerSvg from './maker_svg';
import WebyPathObject from './path_object';

class WebyRenderer extends Blockly.blockRendering.Renderer {
    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(name: string) {
        super(name);
    }

    public makeConstants_(): WebyConstantsProvider {
        return new WebyConstantsProvider();
    }

    public makeRenderInfo_(block: Blockly.BlockSvg): WebyRenderInfo {
        return new WebyRenderInfo(this, block);
    }

    public makeDrawer_(block: Blockly.BlockSvg, info: Blockly.blockRendering.RenderInfo): WebyDrawer {
        return new WebyDrawer(block, info);
    }

    public makeMarkerDrawer(workspace: Blockly.WorkspaceSvg, maker: Blockly.Marker): WebyMakerSvg {
        return new WebyMakerSvg(workspace, this.getConstants(), maker);
    }

    public makePathObject(root: SVGElement, style: Blockly.Theme.BlockStyle): WebyPathObject {
        return new WebyPathObject(root, style, this.getConstants());
    }

    public shouldHighlightConnection(conn: any): boolean{
        return conn.type !== Blockly.INPUT_VALUE && conn.type !== Blockly.OUTPUT_VALUE;
    }

    public getConnectionPreviewMethod(closest: Blockly.RenderedConnection, local: Blockly.RenderedConnection, topBlock: Blockly.BlockSvg): any {
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