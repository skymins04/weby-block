import * as Blockly from 'blockly/core';

/*
//<>
var htmlblock = {
    "type": "htmlblock_",
    "message0": "<> %1",
    "args0": [{"type": "input_value", "name": "ARG0", "check": "Args"}],
    "message1": "%1",
    "args1": [{"type": "input_statement", "name": "INNER0"}],
    //"nextStatement": null,
    //"previousStatement": null
};
Blockly.Blocks['htmlblock_'] = {
    init: function() {
        this.jsonInit(htmlblock);
        this.setStyle('logic_blocks');
    }
};
*/

//<html>
var htmlblockHtml = {
    "type": "htmlblock_html",
    "message0": "<html> %1",
    "args0": [{"type": "input_value", "name": "ARG0", "check": "Args"}],
    "message1": "%1",
    "args1": [{"type": "input_statement", "name": "INNER0"}]
};
Blockly.Blocks['htmlblock_html'] = {
    init: function() {
        this.jsonInit(htmlblockHtml);
        this.setStyle('logic_blocks');
    }
};

//<head>
var htmlblockHead = {
    "type": "htmlblock_head",
    "message0": "<head> %1",
    "args0": [{"type": "input_value", "name": "ARG0", "check": "Args"}],
    "message1": "%1",
    "args1": [{"type": "input_statement", "name": "INNER0"}],
    "nextStatement": null,
    "previousStatement": null
    
};
Blockly.Blocks['htmlblock_head'] = {
    init: function() {
        this.jsonInit(htmlblockHead);
        this.setStyle('logic_blocks');
    }
};

//<body>
var htmlblockBody = {
    "type": "htmlblock_body",
    "message0": "<body> %1",
    "args0": [{"type": "input_value", "name": "ARG0", "check": "Args"}],
    "message1": "%1",
    "args1": [{"type": "input_statement", "name": "INNER0"}],
    "nextStatement": null,
    "previousStatement": null
};
Blockly.Blocks['htmlblock_body'] = {
    init: function() {
        this.jsonInit(htmlblockBody);
        this.setStyle('logic_blocks');
    }
};

//<meta>
var htmlblockMeta = {
    "type": "htmlblock_meta",
    "message0": "<meta> %1",
    "args0": [{"type": "input_value", "name": "ARG0", "check": "Args"}],
    "nextStatement": null,
    "previousStatement": null
};
Blockly.Blocks['htmlblock_meta'] = {
    init: function() {
        this.jsonInit(htmlblockMeta);
        this.setStyle('logic_blocks');
    }
};

//<link>
var htmlblockLink = {
    "type": "htmlblock_link",
    "message0": "<link> %1",
    "args0": [{"type": "input_value", "name": "ARG0", "check": "Args"}],
    "nextStatement": null,
    "previousStatement": null
};
Blockly.Blocks['htmlblock_link'] = {
    init: function() {
        this.jsonInit(htmlblockLink);
        this.setStyle('logic_blocks');
    }
};

//<title>
var htmlblockTitle = {
    "type": "htmlblock_title",
    "message0": "<title> %1",
    "args0": [{"type": "input_value", "name": "ARG0", "check": "Args"}],
    "message1": "%1",
    "args1": [{"type": "input_statement", "name": "INNER0"}],
    "nextStatement": null,
    "previousStatement": null
};
Blockly.Blocks['htmlblock_title'] = {
    init: function() {
        this.jsonInit(htmlblockTitle);
        this.setStyle('logic_blocks');
    }
};