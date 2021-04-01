import React from 'react';
import BlocklyComponent, { Block, Value, Field, Shadow, Category, Button, Sep, Mutation, Label } from './Blockly';

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
        this.WebyBlocks = new WebyBlocks();
    }

    _switchWorkspace(_s) {
        switch(this.state.activeWorkspace) {
            case 1: this.setState({workspaceReg1: this.WebyBlocks.exportXml(this.workspaceRef1.current.workspace)}); break;
            case 2: this.setState({workspaceReg2: this.WebyBlocks.exportXml(this.workspaceRef2.current.workspace)}); break;
            case 3: this.setState({workspaceReg3: this.WebyBlocks.exportXml(this.workspaceRef3.current.workspace)}); break;
        }
        switch(_s) {
            case 1: this.setState({workspaceShow1: true, workspaceShow2: false, workspaceShow3: false}); break;
            case 2: this.setState({workspaceShow1: false, workspaceShow2: true, workspaceShow3: false}); break;
            case 3: this.setState({workspaceShow1: false, workspaceShow2: false, workspaceShow3: true}); break;
        }
        this.setState({activeWorkspace: _s});
    }

    _regToolboxCallback(_s) {
        switch(_s) {
            case 1: // html toolbox callbacks
                if(this.WebyBlocks.needReflash) this.WebyBlocks.defBlocksHtml(true); // html toolbox reflash
                this.workspaceRef1.current.workspace.registerButtonCallback('createHtml', () => {this.WebyBlocks.createHatBlock(this.workspaceRef1.current.workspace, 1)});
            break;
            case 2: // css toolbox callbacks
                this.workspaceRef2.current.workspace.registerButtonCallback('createCss', () => {this.WebyBlocks.createHatBlock(this.workspaceRef2.current.workspace, 2)});
            break;
            case 3: // js toolbox callbacks
                this.workspaceRef3.current.workspace.registerButtonCallback('createJs', () => {this.WebyBlocks.createHatBlock(this.workspaceRef3.current.workspace, 3)});
            break;
        }
    }

    _exportXmls() {
        this.setState({
            xmlOutput: <React.Fragment>
                <div>{this.state.activeWorkspace == 1 ? this.WebyBlocks.exportXml(this.workspaceRef1.current.workspace) : this.state.workspaceReg1}</div>
                <div>{this.state.activeWorkspace == 2 ? this.WebyBlocks.exportXml(this.workspaceRef2.current.workspace) : this.state.workspaceReg2}</div>
                <div>{this.state.activeWorkspace == 3 ? this.WebyBlocks.exportXml(this.workspaceRef3.current.workspace) : this.state.workspaceReg3}</div>
            </React.Fragment>
        });
    }

    _viewHeadblockList() {
        console.log('[HTML XML]');
        console.log(this.WebyBlocks.htmlList);
        console.log('[CSS XML]');
        console.log(this.WebyBlocks.cssList);
        console.log('[JS XML]');
        console.log(this.WebyBlocks.jsList);
    };

    render() {
        const {workspaceShow1, workspaceShow2, workspaceShow3} = this.state;
        return( <React.Fragment>
            <button onClick={() => this._switchWorkspace(1)}>HTML</button>
            <button onClick={() => this._switchWorkspace(2)}>CSS</button>
            <button onClick={() => this._switchWorkspace(3)}>JS</button>
            <button onClick={() => this._exportXmls()}>Export XML</button>
            <button onClick={() => this._viewHeadblockList()}>View HB List</button>

            {workspaceShow1 && <BlocklyComponent ref={this.workspaceRef1} readOnly={false} trashcan={true} media={'media/'} move={{ scrollbars: true, drag: true, wheel: true }} initialXml={this.state.workspaceReg1}>
                <Button text="새 HTML 생성" callbackKey="createHtml"></Button>
                <Label text="태그 블럭들"></Label>
                <Block type="htmlblock_importcss"></Block>
                <Block type="htmlblock_importjs"></Block>
                <Block type="htmlblock_title"></Block>
                <Block type="htmlblock_text"></Block>
                <Block type="htmlblock_h"></Block>
                <Block type="htmlblock_div"></Block>
                <Block type="htmlblock_a"></Block>
                <Block type="htmlblock_input"></Block>
                <Block type="htmlblock_embed"></Block>
                <Block type="htmlblock_br"></Block>
                <Label text="속성 블럭들"></Label>
                <Block type="htmlalt_id"></Block>
            </BlocklyComponent>}
            {workspaceShow2 && <BlocklyComponent ref={this.workspaceRef2} readOnly={false} trashcan={true} media={'media/'} move={{ scrollbars: true, drag: true, wheel: true }} initialXml={this.state.workspaceReg2}>
                <Button text="새 CSS 생성" callbackKey="createCss"></Button>
                <Block type="cssblock_uniselecter"><Value name="ARG0"><Shadow type="cssargs_textfield"></Shadow></Value></Block>
                <Block type="cssblock_idselecter"><Value name="ARG0"><Shadow type="cssargs_textfield"></Shadow></Value></Block>
                <Block type="cssargs_and">
                    <Value name="ARG0">
                        <Shadow type="cssargs_textfield"></Shadow>
                    </Value>
                    <Value name="ARG1">
                        <Shadow type="cssargs_textfield"></Shadow>
                    </Value>
                </Block>
                <Block type="cssargs_sub">
                    <Value name="ARG0">
                        <Shadow type="cssargs_textfield"></Shadow>
                    </Value>
                    <Value name="ARG1">
                        <Shadow type="cssargs_textfield"></Shadow>
                    </Value>
                </Block>
                <Block type="cssargs_children">
                    <Value name="ARG0">
                        <Shadow type="cssargs_textfield"></Shadow>
                    </Value>
                    <Value name="ARG1">
                        <Shadow type="cssargs_textfield"></Shadow>
                    </Value>
                </Block>
                <Block type="cssblock_fontcolor"><Value name="ARG0"><Shadow type="colour_picker"></Shadow></Value></Block>
                <Block type="cssblock_fontsize"></Block>
                <Block type="cssblock_fontweight"></Block>
                <Block type="cssblock_fontstyle"></Block>
            </BlocklyComponent>}
            {workspaceShow3 && <BlocklyComponent ref={this.workspaceRef3} readOnly={false} trashcan={true} media={'media/'} move={{ scrollbars: true, drag: true, wheel: true }} initialXml={this.state.workspaceReg3}>
                <Category name="새 JS 생성" colour="45">
                    <Button text="새 JS 생성" callbackKey="createJs"></Button>
                </Category>
                <Sep></Sep>
                <Category name="논리" colour="%{BKY_LOGIC_HUE}">
                    <Block type="controls_if"></Block>
                    <Block type="logic_compare"></Block>
                    <Block type="logic_operation"></Block>
                    <Block type="logic_negate"></Block>
                    <Block type="logic_boolean"></Block>
                    <Block type="logic_null"></Block>
                    <Block type="logic_ternary"></Block>
                </Category>
                <Category name="반복" colour="%{BKY_LOOPS_HUE}">
                    <Block type="controls_repeat_ext">
                        <Value name="TIMES">
                        <Shadow type="math_number">
                            <Field name="NUM">10</Field>
                        </Shadow>
                        </Value>
                    </Block>
                    <Block type="controls_whileUntil"></Block>
                    <Block type="controls_for">
                        <Value name="FROM">
                        <Shadow type="math_number">
                            <Field name="NUM">1</Field>
                        </Shadow>
                        </Value>
                        <Value name="TO">
                        <Shadow type="math_number">
                            <Field name="NUM">10</Field>
                        </Shadow>
                        </Value>
                        <Value name="BY">
                        <Shadow type="math_number">
                            <Field name="NUM">1</Field>
                        </Shadow>
                        </Value>
                    </Block>
                    <Block type="controls_forEach"></Block>
                    <Block type="controls_flow_statements"></Block>
                </Category>
                <Category name="수학" colour="%{BKY_MATH_HUE}">
                    <Block type="math_number">
                        <Field name="NUM">123</Field>
                    </Block>
                    <Block type="math_arithmetic">
                        <Value name="A">
                        <Shadow type="math_number">
                            <Field name="NUM">1</Field>
                        </Shadow>
                        </Value>
                        <Value name="B">
                        <Shadow type="math_number">
                            <Field name="NUM">1</Field>
                        </Shadow>
                        </Value>
                    </Block>
                    <Block type="math_single">
                        <Value name="NUM">
                        <Shadow type="math_number">
                            <Field name="NUM">9</Field>
                        </Shadow>
                        </Value>
                    </Block>
                    <Block type="math_trig">
                        <Value name="NUM">
                        <Shadow type="math_number">
                            <Field name="NUM">45</Field>
                        </Shadow>
                        </Value>
                    </Block>
                    <Block type="math_constant"></Block>
                    <Block type="math_number_property">
                        <Value name="NUMBER_TO_CHECK">
                        <Shadow type="math_number">
                            <Field name="NUM">0</Field>
                        </Shadow>
                        </Value>
                    </Block>
                    <Block type="math_round">
                        <Value name="NUM">
                        <Shadow type="math_number">
                            <Field name="NUM">3.1</Field>
                        </Shadow>
                        </Value>
                    </Block>
                    <Block type="math_on_list"></Block>
                    <Block type="math_modulo">
                        <Value name="DIVIDEND">
                        <Shadow type="math_number">
                            <Field name="NUM">64</Field>
                        </Shadow>
                        </Value>
                        <Value name="DIVISOR">
                        <Shadow type="math_number">
                            <Field name="NUM">10</Field>
                        </Shadow>
                        </Value>
                    </Block>
                    <Block type="math_constrain">
                        <Value name="VALUE">
                        <Shadow type="math_number">
                            <Field name="NUM">50</Field>
                        </Shadow>
                        </Value>
                        <Value name="LOW">
                        <Shadow type="math_number">
                            <Field name="NUM">1</Field>
                        </Shadow>
                        </Value>
                        <Value name="HIGH">
                        <Shadow type="math_number">
                            <Field name="NUM">100</Field>
                        </Shadow>
                        </Value>
                    </Block>
                    <Block type="math_random_int">
                        <Value name="FROM">
                        <Shadow type="math_number">
                            <Field name="NUM">1</Field>
                        </Shadow>
                        </Value>
                        <Value name="TO">
                        <Shadow type="math_number">
                            <Field name="NUM">100</Field>
                        </Shadow>
                        </Value>
                    </Block>
                    <Block type="math_random_float"></Block>
                    <Block type="math_atan2">
                        <Value name="X">
                        <Shadow type="math_number">
                            <Field name="NUM">1</Field>
                        </Shadow>
                        </Value>
                        <Value name="Y">
                        <Shadow type="math_number">
                            <Field name="NUM">1</Field>
                        </Shadow>
                        </Value>
                    </Block>
                </Category>
                <Category name="문자" colour="%{BKY_TEXTS_HUE}">
                    <Block type="text"></Block>
                    <Block type="text_join"></Block>
                    <Block type="text_append">
                        <Value name="TEXT">
                        <Shadow type="text"></Shadow>
                        </Value>
                    </Block>
                    <Block type="text_length">
                        <Value name="VALUE">
                        <Shadow type="text">
                            <Field name="TEXT">abc</Field>
                        </Shadow>
                        </Value>
                    </Block>
                    <Block type="text_isEmpty">
                        <Value name="VALUE">
                        <Shadow type="text">
                            <Field name="TEXT"></Field>
                        </Shadow>
                        </Value>
                    </Block>
                    <Block type="text_indexOf">
                        <Value name="VALUE">
                        <Block type="variables_get">
                            <Field name="VAR"></Field>
                        </Block>
                        </Value>
                        <Value name="FIND">
                        <Shadow type="text">
                            <Field name="TEXT">abc</Field>
                        </Shadow>
                        </Value>
                    </Block>
                    <Block type="text_charAt">
                        <Value name="VALUE">
                        <Block type="variables_get">
                            <Field name="VAR"></Field>
                        </Block>
                        </Value>
                    </Block>
                    <Block type="text_getSubstring">
                        <Value name="STRING">
                        <Block type="variables_get">
                            <Field name="VAR"></Field>
                        </Block>
                        </Value>
                    </Block>
                    <Block type="text_changeCase">
                        <Value name="TEXT">
                        <Shadow type="text">
                            <Field name="TEXT">abc</Field>
                        </Shadow>
                        </Value>
                    </Block>
                    <Block type="text_trim">
                        <Value name="TEXT">
                        <Shadow type="text">
                            <Field name="TEXT">abc</Field>
                        </Shadow>
                        </Value>
                    </Block>
                    <Block type="text_print">
                        <Value name="TEXT">
                        <Shadow type="text">
                            <Field name="TEXT">abc</Field>
                        </Shadow>
                        </Value>
                    </Block>
                    <Block type="text_prompt_ext">
                        <Value name="TEXT">
                        <Shadow type="text">
                            <Field name="TEXT">abc</Field>
                        </Shadow>
                        </Value>
                    </Block>
                </Category>
                <Category name="리스트" colour="%{BKY_LISTS_HUE}">
                    <Block type="lists_create_with">
                        <Mutation items="0"></Mutation>
                    </Block>
                    <Block type="lists_create_with"></Block>
                    <Block type="lists_repeat">
                        <Value name="NUM">
                        <Shadow type="math_number">
                            <Field name="NUM">5</Field>
                        </Shadow>
                        </Value>
                    </Block>
                    <Block type="lists_length"></Block>
                    <Block type="lists_isEmpty"></Block>
                    <Block type="lists_indexOf">
                        <Value name="VALUE">
                        <Block type="variables_get">
                            <Field name="VAR"></Field>
                        </Block>
                        </Value>
                    </Block>
                    <Block type="lists_getIndex">
                        <Value name="VALUE">
                        <Block type="variables_get">
                            <Field name="VAR"></Field>
                        </Block>
                        </Value>
                    </Block>
                    <Block type="lists_setIndex">
                        <Value name="LIST">
                        <Block type="variables_get">
                            <Field name="VAR"></Field>
                        </Block>
                        </Value>
                    </Block>
                    <Block type="lists_getSublist">
                        <Value name="LIST">
                        <Block type="variables_get">
                            <Field name="VAR"></Field>
                        </Block>
                        </Value>
                    </Block>
                    <Block type="lists_split">
                        <Value name="DELIM">
                        <Shadow type="text">
                            <Field name="TEXT">,</Field>
                        </Shadow>
                        </Value>
                    </Block>
                    <Block type="lists_sort"></Block>
                </Category>
                <Category name="색깔" colour="%{BKY_COLOUR_HUE}">
                    <Block type="colour_picker"></Block>
                    <Block type="colour_random"></Block>
                    <Block type="colour_rgb">
                        <Value name="RED">
                        <Shadow type="math_number">
                            <Field name="NUM">100</Field>
                        </Shadow>
                        </Value>
                        <Value name="GREEN">
                        <Shadow type="math_number">
                            <Field name="NUM">50</Field>
                        </Shadow>
                        </Value>
                        <Value name="BLUE">
                        <Shadow type="math_number">
                            <Field name="NUM">0</Field>
                        </Shadow>
                        </Value>
                    </Block>
                    <Block type="colour_blend">
                        <Value name="COLOUR1">
                        <Shadow type="colour_picker">
                            <Field name="COLOUR">#ff0000</Field>
                        </Shadow>
                        </Value>
                        <Value name="COLOUR2">
                        <Shadow type="colour_picker">
                            <Field name="COLOUR">#3333ff</Field>
                        </Shadow>
                        </Value>
                        <Value name="RATIO">
                        <Shadow type="math_number">
                            <Field name="NUM">0.5</Field>
                        </Shadow>
                        </Value>
                    </Block>
                </Category>
                <Sep></Sep>
                <Category name="변수" colour="%{BKY_VARIABLES_HUE}" custom="VARIABLE"></Category>
                <Category name="함수" colour="%{BKY_PROCEDURES_HUE}" custom="PROCEDURE"></Category>
            </BlocklyComponent>}
            <h2>generated XML</h2>
            <div id="xmlViewer">
                {this.state.xmlOutput}
            </div>
        </React.Fragment>
        );
    }

    componentDidMount() {
        this.WebyBlocks.createHatBlock(this.workspaceRef1.current.workspace, 1, 'index', false);
        this._regToolboxCallback(this.state.activeWorkspace);
    }

    componentDidUpdate() {
        this._regToolboxCallback(this.state.activeWorkspace);
    }
}

export default App;