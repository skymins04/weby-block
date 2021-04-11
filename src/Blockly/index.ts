import React from 'react';

import BlocklyComponent from './BlocklyComponent';

export default BlocklyComponent;

const Block = (p: any): React.DOMElement<any, Element> => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("block", props, children);
};

const Category = (p: any): React.DOMElement<any, Element> => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("category", props, children);
};

const Value = (p: any): React.DOMElement<any, Element> => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("value", props, children);
};

const Field = (p: any): React.DOMElement<any, Element> => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("field", props, children);
};

const Shadow = (p: any): React.DOMElement<any, Element> => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("shadow", props, children);
};

const Button = (p: any): React.DetailedReactHTMLElement<any, HTMLElement> => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("button", props, children);
};

const Sep = (p: any): React.DOMElement<any, Element> => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("sep", props, children);
};

const Mutation = (p: any): React.DOMElement<any, Element> => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("mutation", props, children);
};

const Label = (p: any): React.DetailedReactHTMLElement<any, HTMLElement> => {
    const { children, ...props } = p;
    props.is = "blockly";
    return React.createElement("label", props, children);
};

export { Block, Category, Value, Field, Shadow, Button, Sep, Mutation, Label };