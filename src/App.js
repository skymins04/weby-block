import React from 'react';

import Blockly from 'blockly/core';
import BlocklyComponent, { Block, Value, Field, Shadow, Category } from './Blockly';
    
import './blocks/htmlBlocks';
import './blocks/commonBlocks';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.workspaceRef = React.createRef();
        this.initialXml = `<xml xmlns="http://www.w3.org/1999/xhtml">
        <block type="htmltag_html" x="100" y="100"></block>
        </xml>`;
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
                <BlocklyComponent ref={this.workspaceRef} readOnly={false} trashcan={true} media={'media/'} move={{ scrollbars: true, drag: true, wheel: true }} initialXml={this.initialXml}>
                    <Category name="Common" colour="270">
                        <Block type="common_text"/>
                    </Category>
                    <Category name="HTML" colour="45">
                        <Block type="htmltag_html"/>
                        <Block type="htmltag_meta"/>
                        <Block type="htmltag_link"/>
                        <Block type="htmltag_title"/>
                        <Block type="htmltag_script"/>
                    </Category>
                </BlocklyComponent>
            </div>
        );
    }
}

export default App;