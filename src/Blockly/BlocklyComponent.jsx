import React from 'react';
 
import Blockly from 'blockly/core';
import locale from 'blockly/msg/ko';
import 'blockly/blocks';

import './BlocklyComponent.css';
 
Blockly.setLocale(locale);
 
class BlocklyComponent extends React.Component {
    constructor(props) {
        super(props);
        this.blocklyDiv = React.createRef();
        this.toolbox = React.createRef();
    }
 
    componentDidMount() {
        const { initialXml, children, ...rest } = this.props;
        this.priWorkspace = Blockly.inject(
            this.blocklyDiv.current,
            {
                toolbox: this.toolbox.current,
                renderer: 'zelos',
                zoom: {
                    controls: true,
                    startScale: 0.65
                },
                ...rest
            },
        );

        if (initialXml) Blockly.Xml.domToWorkspace(Blockly.Xml.textToDom(initialXml), this.priWorkspace);
    }
 
    get workspace() {
        return this.priWorkspace;
    }
 
    render() {
        const { children } = this.props;
        return <React.Fragment>
            <div ref={this.blocklyDiv} id="blocklyDiv" />
            <xml xmlns="https://developers.google.com/blockly/xml" is="blockly" style={{ display: 'none' }} ref={this.toolbox}>
                {children}
            </xml>
        </React.Fragment>;
    }
}
 
 export default BlocklyComponent;
 