import React from 'react';

import Blockly from 'blockly/core';
import locale from 'blockly/msg/ko';
import 'blockly/blocks';
import '../Weby/WebyRenderer';

import './BlocklyComponent.css';

Blockly.setLocale(locale);

declare global {
    namespace JSX {
        interface IntrinsicElements {
            xml: any;
        }
    }
}

class BlocklyComponent extends React.Component {

    // eslint-disable-next-line @typescript-eslint/no-useless-constructor
    constructor(props: any) {
        super(props);
        this.blocklyDiv = React.createRef();
        this.toolbox = React.createRef();
    }

    private blocklyDiv: any = null;

    private toolbox: any = null;

    private priWorkspace: any = null;

    componentDidMount(): void {
        const { initialXml, children, ...rest } = (this.props as any);
        this.priWorkspace = Blockly.inject(
            this.blocklyDiv.current,
            {
                toolbox: this.toolbox.current,
                renderer: 'weby',
                zoom: {
                    controls: true,
                    startScale: 0.65
                },
                ...rest
            },
        );

        if (initialXml) Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), this.priWorkspace);
    }

    get workspace(): Blockly.WorkspaceSvg {
        return this.priWorkspace;
    }

    render() {
        const { children } = (this.props as any);
        return <React.Fragment>
            <div ref={this.blocklyDiv} id="blocklyDiv" />
            <xml xmlns="https://developers.google.com/blockly/xml" is="blockly" style={{ display: 'none' }} ref={this.toolbox}>
                {children}
            </xml>
        </React.Fragment>;
    }
}

 export default BlocklyComponent;
