import React from 'react';

import Blockly from 'blockly/core';
import BlocklyComponent, { Block, Value, Field, Shadow, Category } from './Blockly';
    
import './App.css'

import './blocks/htmlBlocks';
import './blocks/commonBlocks';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.workspaceRef = React.createRef();
        this.state = {
            xmlOutput: "",
            initialXml: `<xml xmlns="http://www.w3.org/1999/xhtml"><block type="htmlblock_html" deletable="false" x="100" y="100"></block></xml>`
        };
    }
    
    generateXml = () => {
        var xmlDom = Blockly.Xml.workspaceToDom(this.workspaceRef.current.workspace);
        var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
        this.setState({xmlOutput: xmlText});
        console.log(xmlText);
    }

    render() {
        return(
            <div className="App">
                <button onClick={this.generateXml}>Convert</button>
                <BlocklyComponent ref={this.workspaceRef} readOnly={false} trashcan={true} media={'media/'} move={{ scrollbars: true, drag: true, wheel: true }} initialXml={this.state.initialXml}>
                    <Category name="Common" colour="180">
                        <Block type="common_text"/>
                    </Category>
                    <Category name="HTML" colour="1">
                        <label text="요소 블록"></label>
                        <Block type="htmlblock_title"/>
                        <Block type="htmlblock_css"/>
                        <Block type="htmlblock_js"/>
                        <Block type="htmlblock_div"/>
                        <label text="속성 블록"></label>
                        <Block type="htmlalt_class"></Block>
                    </Category>
                    <Category name="CSS" colour="210">
                        <button text="새 CSS 만들기"></button>
                    </Category>
                    <Category name="JS" colour="45">
                        <button text="새 JS 만들기"></button>
                    </Category>
                </BlocklyComponent>
                <h2>generated XML</h2>
                <div id="xmlViewer">
                    {this.state.xmlOutput}
                </div>
            </div>
        );
    }
}

export default App;