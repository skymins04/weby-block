import React from 'react';
import BlocklyComponent, { Block, Value, Field, Shadow, Category } from './Blockly';

import WebyCore from './WebyBlock/WebyCore';
import WebyBlocks from './WebyBlock/WebyBlocks';

import './App.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.workspaceRef1 = React.createRef();
        this.workspaceRef2 = React.createRef();
        this.workspaceRef3 = React.createRef();
        this.state = {
            xmlOutput: '',
            activeWorkspace: 1,
            workspaceShow1: true,
            workspaceShow2: false,
            workspaceShow3: false,
            workspaceReg1: '',
            workspaceReg2: '',
            workspaceReg3: ''
        }
        new WebyBlocks();
    }

    _switchWorkspace(_s) {
        switch(this.state.activeWorkspace) {
            case 1: this.setState({workspaceReg1: WebyBlocks.prototype.exportXml(this.workspaceRef1.current.workspace)}); break;
            case 2: this.setState({workspaceReg2: WebyBlocks.prototype.exportXml(this.workspaceRef2.current.workspace)}); break;
            case 3: this.setState({workspaceReg3: WebyBlocks.prototype.exportXml(this.workspaceRef3.current.workspace)}); break;
        }
        switch(_s) {
            case 1: this.setState({workspaceShow1: true, workspaceShow2: false, workspaceShow3: false}); break;
            case 2: this.setState({workspaceShow1: false, workspaceShow2: true, workspaceShow3: false}); break;
            case 3: this.setState({workspaceShow1: false, workspaceShow2: false, workspaceShow3: true}); break;
        }
        this.setState({activeWorkspace: _s});
    }

    render() {
        const {workspaceShow1, workspaceShow2, workspaceShow3} = this.state;
        return( <React.Fragment>
            <button onClick={() => this._switchWorkspace(1)}>HTML</button>
            <button onClick={() => this._switchWorkspace(2)}>CSS</button>
            <button onClick={() => this._switchWorkspace(3)}>JS</button>

            {workspaceShow1 && <BlocklyComponent ref={this.workspaceRef1} readOnly={false} trashcan={true} media={'media/'} move={{ scrollbars: true, drag: true, wheel: true }} initialXml={this.state.workspaceReg1}>
                <Category name="HTML" colour="1">

                </Category>
            </BlocklyComponent>}
            {workspaceShow2 && <BlocklyComponent ref={this.workspaceRef2} readOnly={false} trashcan={true} media={'media/'} move={{ scrollbars: true, drag: true, wheel: true }} initialXml={this.state.workspaceReg2}>
                <Category name="CSS" colour="180">

                </Category>
            </BlocklyComponent>}
            {workspaceShow3 && <BlocklyComponent ref={this.workspaceRef3} readOnly={false} trashcan={true} media={'media/'} move={{ scrollbars: true, drag: true, wheel: true }} initialXml={this.state.workspaceReg3}>
                <Category name="JS" colour="45">

                </Category>
            </BlocklyComponent>}
            <h2>generated XML</h2>
            <div id="xmlViewer">
                {this.state.xmlOutput}
            </div>
        </React.Fragment>
        );
    }

    componentDidMount() {
        WebyCore.prototype.createHatBlock(this.workspaceRef1.current.workspace, 1, 'index');
    }
}

export default App;