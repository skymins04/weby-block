import React from 'react';

import Blockly from 'blockly/core';
import BlocklyComponent, { Block, Value, Field, Shadow, Category } from './Blockly';

import './blocks/htmlBlocks';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.workspaceRef = React.createRef();
    }
    
    generateXml = () => {
        var xmlDom = Blockly.Xml.workspaceToDom(this.workspaceRef.current.workspace);
        var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
        console.log(xmlText);
    }

    render() {
        return(
            <div className="App">
                <button onClick={this.generateXml}>Convert</button>
                <BlocklyComponent ref={this.workspaceRef}
                readOnly={false} trashcan={true} media={'media/'}
                move={{
                    scrollbars: true,
                    drag: true,
                    wheel: true
                }}
                initialXml={`<xml xmlns="http://www.w3.org/1999/xhtml">
                <block type="htmlblock_html" x="100" y="100">
                    <statement name="INNER0">
                        <block type="htmlblock_head"><next><block type="htmlblock_body"></block></next></block>
                    </statement>
                </block>
                </xml>`}>
                    <Category name="HTML" colour="210">
                        <Block type="htmlblock_html"/>
                        <Block type="htmlblock_head"/>
                        <Block type="htmlblock_body"/>
                        <Block type="htmlblock_meta"/>
                        <Block type="htmlblock_link"/>
                        <Block type="htmlblock_title"/>
                    </Category>
                </BlocklyComponent>
            </div>
        );
    }
}

export default App;