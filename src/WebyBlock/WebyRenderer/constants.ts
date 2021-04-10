import Blockly from 'blockly/core';

class WebyConstantsProvider extends Blockly.blockRendering.ConstantProvider {
    GRID_UNIT: number = 4;
    SMALL_PADDING: number = this.GRID_UNIT;
    MEDIUM_PADDING: number = 2 * this.GRID_UNIT;
    MEDIUM_LARGE_PADDING: number = 3 * this.GRID_UNIT;
    LARGE_PADDING: number = 4 * this.GRID_UNIT;
    CORNER_RADIUS: number = 1 * this.GRID_UNIT;
    NOTCH_WIDTH: number = 9 * this.GRID_UNIT;
    NOTCH_HEIGHT: number = 2 * this.GRID_UNIT;
    NOTCH_OFFSET_LEFT: number = 3 * this.GRID_UNIT;
    STATEMENT_INPUT_NOTCH_OFFSET: number = this.NOTCH_OFFSET_LEFT;
    MIN_BLOCK_WIDTH: number = 2 * this.GRID_UNIT;
    MIN_BLOCK_HEIGHT: number = 12 * this.GRID_UNIT;
    EMPTY_STATEMENT_INPUT_HEIGHT: number = 6 * this.GRID_UNIT;
    TAB_OFFSET_FROM_TOP: number = 0;
    TOP_ROW_MIN_HEIGHT: number = this.CORNER_RADIUS;
    TOP_ROW_PRECEDES_STATEMENT_MIN_HEIGHT: number = this.LARGE_PADDING;
    BOTTOM_ROW_MIN_HEIGHT: number = this.CORNER_RADIUS;
    BOTTOM_ROW_AFTER_STATEMENT_MIN_HEIGHT: number = 6 * this.GRID_UNIT;
    STATEMENT_BOTTOM_SPACER: number = -this.NOTCH_HEIGHT;
    STATEMENT_INPUT_SPACER_MIN_WIDTH: number = 40 * this.GRID_UNIT;
    STATEMENT_INPUT_PADDING_LEFT: number = 4 * this.GRID_UNIT;
    EMPTY_INLINE_INPUT_PADDING: number = 4 * this.GRID_UNIT;
    EMPTY_INLINE_INPUT_HEIGHT: number = 8 * this.GRID_UNIT;
    DUMMY_INPUT_MIN_HEIGHT: number = 8 * this.GRID_UNIT;
    DUMMY_INPUT_SHADOW_MIN_HEIGHT: number = 6 * this.GRID_UNIT;
    CURSOR_WS_WIDTH: number = 20 * this.GRID_UNIT;
    CURSOR_COLOUR: string = '#ffa200';
    CURSOR_RADIUS: number = 5;
    JAGGED_TEETH_HEIGHT: number = 0;
    JAGGED_TEETH_WIDTH: number = 0;
    START_HAT_HEIGHT: number = 22;
    START_HAT_WIDTH: number = 96;
    SHAPES: any = {
        HEXAGONAL: 1,
        ROUND: 2,
        SQUARE: 3,
        PUZZLE: 4,
        NOTCH: 5
    };
    SHAPE_IN_SHAPE_PADDING: any = {
        1: { // Outer shape: hexagon.
            0: 5 * this.GRID_UNIT, // Field in hexagon.
            1: 2 * this.GRID_UNIT, // Hexagon in hexagon.
            2: 5 * this.GRID_UNIT, // Round in hexagon.
            3: 5 * this.GRID_UNIT // Square in hexagon.
        },
        2: { // Outer shape: round.
            0: 3 * this.GRID_UNIT, // Field in round.
            1: 3 * this.GRID_UNIT, // Hexagon in round.
            2: 1 * this.GRID_UNIT, // Round in round.
            3: 2 * this.GRID_UNIT // Square in round.
        },
        3: { // Outer shape: square.
            0: 2 * this.GRID_UNIT, // Field in square.
            1: 2 * this.GRID_UNIT, // Hexagon in square.
            2: 2 * this.GRID_UNIT, // Round in square.
            3: 2 * this.GRID_UNIT // Square in square.
        }
    };
    FULL_BLOCK_FIELDS: boolean = true;
    FIELD_TEXT_FONTSIZE: number = 3 * this.GRID_UNIT;
    FIELD_TEXT_FONTWEIGHT: string = 'bold';
    FIELD_TEXT_FONTFAMILY: string = '"Helvetica Neue", "Segoe UI", Helvetica, sans-serif';
    FIELD_BORDER_RECT_RADIUS: number = this.CORNER_RADIUS;
    FIELD_BORDER_RECT_X_PADDING: number = 2 * this.GRID_UNIT;
    FIELD_BORDER_RECT_Y_PADDING: number = 1.625 * this.GRID_UNIT;
    FIELD_BORDER_RECT_HEIGHT: number = 8 * this.GRID_UNIT;
    FIELD_DROPDOWN_BORDER_RECT_HEIGHT: number = 8 * this.GRID_UNIT;
    FIELD_DROPDOWN_NO_BORDER_RECT_SHADOW: boolean = true;
    FIELD_DROPDOWN_COLOURED_DIV: boolean = true;
    FIELD_DROPDOWN_SVG_ARROW: boolean = true;
    FIELD_DROPDOWN_SVG_ARROW_PADDING: number = this.FIELD_BORDER_RECT_X_PADDING;
    FIELD_TEXTINPUT_BOX_SHADOW: boolean = true;
    FIELD_COLOUR_FULL_BLOCK: boolean = false;
    FIELD_COLOUR_DEFAULT_WIDTH: number = 8 * this.GRID_UNIT;
    FIELD_COLOUR_DEFAULT_HEIGHT: number = 6 * this.GRID_UNIT;
    FIELD_CHECKBOX_X_OFFSET: number = 1 * this.GRID_UNIT;
    MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH: number = 12 * this.GRID_UNIT;
    SELECTED_GLOW_COLOUR: string = '#fff200';
    SELECTED_GLOW_SIZE: number = 0.5;
    REPLACEMENT_GLOW_COLOUR: string = '#fff200';
    REPLACEMENT_GLOW_SIZE: number = 2;
    selectedGlowFilterId: string = '';
    // tslint:disable-next-line: variable-name
    selectedGlowFilter_: any = null;
    replacementGlowFilterId: string = '';
    // tslint:disable-next-line: variable-name
    replacementGlowFilter_: any = null;

    HEXAGONAL: any = null;
    ROUNDED: any = null;
    SQUARED: any = null;

    setFontConstants_(theme: Blockly.Theme): void {
        super.setFontConstants_(theme);
        this.FIELD_BORDER_RECT_HEIGHT = this.FIELD_TEXT_HEIGHT + this.FIELD_BORDER_RECT_Y_PADDING * 2;
        this.FIELD_DROPDOWN_BORDER_RECT_HEIGHT = this.FIELD_BORDER_RECT_HEIGHT;
    }
    setDynamicProperties_(theme: any) {
        super.setDynamicProperties_(theme);
        this.SELECTED_GLOW_COLOUR = theme.getComponentStyle('selectedGlowColour') || this.SELECTED_GLOW_COLOUR;
        const selectedGlowSize = Number(theme.getComponentStyle('selectedGlowSize'));
        this.SELECTED_GLOW_SIZE = selectedGlowSize && !isNaN(selectedGlowSize) ? selectedGlowSize : this.SELECTED_GLOW_SIZE;
        this.REPLACEMENT_GLOW_COLOUR = theme.getComponentStyle('replacementGlowColour') || this.REPLACEMENT_GLOW_COLOUR;
        const replacementGlowSize = Number(theme.getComponentStyle('replacementGlowSize'));
        this.REPLACEMENT_GLOW_SIZE = replacementGlowSize && !isNaN(replacementGlowSize) ? replacementGlowSize : this.REPLACEMENT_GLOW_SIZE;
    }
    init(): void {
        super.init();
        this.HEXAGONAL = this.makeHexagonal();
        this.ROUNDED = this.makeRounded();
        this.SQUARED = this.makeSquared();
        this.STATEMENT_INPUT_NOTCH_OFFSET = this.NOTCH_OFFSET_LEFT + (this.INSIDE_CORNERS as any).rightWidth;
    }
    dispose(): void {
        super.dispose();
        if (this.selectedGlowFilter_) {
            Blockly.utils.dom.removeNode(this.selectedGlowFilter_);
        }
        if (this.replacementGlowFilter_) {
            Blockly.utils.dom.removeNode(this.replacementGlowFilter_);
        }
    }
    makeStartHat(): any {
        const h: number = this.START_HAT_HEIGHT;
        const w: number = this.START_HAT_WIDTH;

        const mainPath =
            Blockly.utils.svgPaths.curve('c',
                [
                    Blockly.utils.svgPaths.point(25, -h),
                    Blockly.utils.svgPaths.point(71, -h),
                    Blockly.utils.svgPaths.point(w, 0)
                ]);
        return {
            height: h,
            width: w,
            path: mainPath
        };
    }
    makeHexagonal(): any {
        const maxWidth: number = this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH;

        function makeMainPath(height: number, up: boolean, right: boolean): string {
            const halfHeight: number = height / 2;
            const width: number = halfHeight > maxWidth ? maxWidth : halfHeight;
            const forward: number = up ? -1 : 1;
            const direction: number = right ? -1 : 1;
            const dy: number = forward * height / 2;
            return Blockly.utils.svgPaths.lineTo(-direction * width, dy) +
                Blockly.utils.svgPaths.lineTo(direction * width, dy);
        }

        return {
            type: this.SHAPES.HEXAGONAL,
            isDynamic: true,
            width(height: number): number {
                const halfHeight: number = height / 2;
                return halfHeight > maxWidth ? maxWidth : halfHeight;
            },
            height(height: number): number {
                return height;
            },
            connectionOffsetY(connectionHeight: number): number {
                return connectionHeight / 2;
            },
            connectionOffsetX(connectionWidth: number): number {
                return -connectionWidth;
            },
            pathDown(height: number): string {
                return makeMainPath(height, false, false);
            },
            pathUp(height: number): string {
                return makeMainPath(height, true, false);
            },
            pathRightDown(height: number): string {
                return makeMainPath(height, false, true);
            },
            pathRightUp(height: number): string {
                return makeMainPath(height, false, true);
            }
        };
    }
    makeRounded(): any {
        const maxWidth: number = this.MAX_DYNAMIC_CONNECTION_SHAPE_WIDTH;
        const maxHeight: number = maxWidth * 2;

        function makeMainPath(blockHeight: number, up: boolean, right: boolean): string {
            const remainingHeight: number = blockHeight > maxHeight ? blockHeight - maxHeight : 0;
            const height: number = blockHeight > maxHeight ? maxHeight : blockHeight;
            const radius: number = height / 2;
            return Blockly.utils.svgPaths.arc('a', '0 0,1', radius, Blockly.utils.svgPaths.point((up ? -1 : 1) * radius, (up ? -1 : 1) * radius)) +
                Blockly.utils.svgPaths.lineOnAxis('v', (right ? 1 : -1) * remainingHeight) +
                Blockly.utils.svgPaths.arc('a', '0 0,1', radius, Blockly.utils.svgPaths.point((up ? 1 : -1) * radius, (up ? -1 : 1) * radius));
        }

        return {
            type: this.SHAPES.ROUND,
            isDynamic: true,
            width(height: number): number  {
                const halfHeight: number = height / 2;
                return halfHeight > maxWidth ? maxWidth : halfHeight;
            },
            height(height: number): number {
                return height;
            },
            connectionOffsetY(connectionHeight: number): number {
                return connectionHeight / 2;
            },
            connectionOffsetX(connectionWidth: number): number {
                return -connectionWidth;
            },
            pathDown(height: number): string {
                return makeMainPath(height, false, false);
            },
            pathUp(height: number): string {
                return makeMainPath(height, true, false);
            },
            pathRightDown(height: number): string {
                return makeMainPath(height, false, true);
            },
            pathRightUp(height: number): string {
                return makeMainPath(height, false, true);
            }
        };
    }

    makeSquared(): any {
        const radius: number = this.CORNER_RADIUS;

        function makeMainPath(height: number, up: boolean, right: boolean): string {
            const innerHeight: number = height - radius * 2;
            return Blockly.utils.svgPaths.arc('a', '0 0,1', radius, Blockly.utils.svgPaths.point((up ? -1 : 1) * radius, (up ? -1 : 1) * radius)) +
                Blockly.utils.svgPaths.lineOnAxis('v', (right ? 1 : -1) * innerHeight) +
                Blockly.utils.svgPaths.arc('a', '0 0,1', radius, Blockly.utils.svgPaths.point((up ? 1 : -1) * radius, (up ? -1 : 1) * radius));
        }

        return {
            type: this.SHAPES.SQUARE,
            isDynamic: true,
            width(_height: number): number {
                return radius;
            },
            height(height: number): number {
                return height;
            },
            connectionOffsetY(connectionHeight: number): number {
                return connectionHeight / 2;
            },
            connectionOffsetX(connectionWidth: number): number {
                return -connectionWidth;
            },
            pathDown(height: number): string {
                return makeMainPath(height, false, false);
            },
            pathUp(height: number): string {
                return makeMainPath(height, true, false);
            },
            pathRightDown(height: number): string {
                return makeMainPath(height, false, true);
            },
            pathRightUp(height: number): string {
                return makeMainPath(height, false, true);
            }
        };
    }
    makeNotch(): any {
        const w: number = this.NOTCH_WIDTH;
        const h: number = this.NOTCH_HEIGHT;

        const innerWidth: number = w / 3;
        const curveWidth: number = innerWidth / 3;

        const halfHeight: number = h / 2;
        const quarterHeight: number = halfHeight / 2;

        function makeMainPath(dir: number): string {
            return (
                Blockly.utils.svgPaths.curve('c', [
                    Blockly.utils.svgPaths.point(dir * curveWidth / 2,
                        0),
                    Blockly.utils.svgPaths.point(dir * curveWidth * 3 / 4,
                        quarterHeight / 2),
                    Blockly.utils.svgPaths.point(dir * curveWidth,
                        quarterHeight)
                ]) +
                Blockly.utils.svgPaths.line([
                    Blockly.utils.svgPaths.point(dir * curveWidth,
                        halfHeight)
                ]) +
                Blockly.utils.svgPaths.curve('c', [
                    Blockly.utils.svgPaths.point(dir * curveWidth / 4,
                        quarterHeight / 2),
                    Blockly.utils.svgPaths.point(dir * curveWidth / 2,
                        quarterHeight),
                    Blockly.utils.svgPaths.point(dir * curveWidth,
                        quarterHeight)
                ]) +
                Blockly.utils.svgPaths.lineOnAxis('h', dir * innerWidth) +
                Blockly.utils.svgPaths.curve('c', [
                    Blockly.utils.svgPaths.point(dir * curveWidth / 2,
                        0),
                    Blockly.utils.svgPaths.point(dir * curveWidth * 3 / 4,
                        -(quarterHeight / 2)),
                    Blockly.utils.svgPaths.point(dir * curveWidth,
                        -quarterHeight)
                ]) +
                Blockly.utils.svgPaths.line([
                    Blockly.utils.svgPaths.point(dir * curveWidth,
                        -halfHeight)
                ]) +
                Blockly.utils.svgPaths.curve('c', [
                    Blockly.utils.svgPaths.point(dir * curveWidth / 4,
                        -(quarterHeight / 2)),
                    Blockly.utils.svgPaths.point(dir * curveWidth / 2,
                        -quarterHeight),
                    Blockly.utils.svgPaths.point(dir * curveWidth,
                        -quarterHeight)
                ])
            );
        }

        const pathL: string = makeMainPath(1);
        const pathR: string = makeMainPath(-1);

        return {
            type: this.SHAPES.NOTCH,
            width: w,
            height: h,
            pathLeft: pathL,
            pathRight: pathR
        };
    }

    makeInsideCorners(): any {
        const radius: number = this.CORNER_RADIUS;

        const innerTopLeftCorner: string = Blockly.utils.svgPaths.arc('a', '0 0,0', radius,
            Blockly.utils.svgPaths.point(-radius, radius));

        const innerTopRightCorner: string = Blockly.utils.svgPaths.arc('a', '0 0,1', radius,
            Blockly.utils.svgPaths.point(-radius, radius));

        const innerBottomLeftCorner: string = Blockly.utils.svgPaths.arc('a', '0 0,0', radius,
            Blockly.utils.svgPaths.point(radius, radius));

        const innerBottomRightCorner: string = Blockly.utils.svgPaths.arc('a', '0 0,1', radius,
            Blockly.utils.svgPaths.point(radius, radius));

        return {
            width: radius,
            height: radius,
            pathTop: innerTopLeftCorner,
            pathBottom: innerBottomLeftCorner,
            rightWidth: radius,
            rightHeight: radius,
            pathTopRight: innerTopRightCorner,
            pathBottomRight: innerBottomRightCorner
        };
    }

    shapeFor(connection: any): any {
        let checks: any = connection.getCheck();
        if (!checks && connection.targetConnection) {
            checks = connection.targetConnection.getCheck();
        }
        switch (connection.type) {
            case Blockly.INPUT_VALUE:
            case Blockly.OUTPUT_VALUE:
                const outputShape = connection.getSourceBlock().getOutputShape();
                if (outputShape !== null) {
                    switch (outputShape) {
                        case this.SHAPES.HEXAGONAL:
                            return this.HEXAGONAL;
                        case this.SHAPES.ROUND:
                            return this.ROUNDED;
                        case this.SHAPES.SQUARE:
                            return this.SQUARED;
                        default:
                            break;
                    }
                }
                // Includes doesn't work in IE.
                if (checks && checks.indexOf('Boolean') !== -1) {
                    return this.HEXAGONAL;
                }
                if (checks && checks.indexOf('Number') !== -1) {
                    return this.ROUNDED;
                }
                if (checks && checks.indexOf('String') !== -1) {
                    return this.ROUNDED;
                }
                return this.ROUNDED;
            case Blockly.PREVIOUS_STATEMENT:
            case Blockly.NEXT_STATEMENT:
                return this.NOTCH;
            default:
                throw Error('Unknown type');
        }
    }

    generateSecondaryColour_(colour: string): string {
        return Blockly.utils.colour.blend('#000', colour, 0.15) || colour;
    }

    generateTertiaryColour_(colour: string): string {
        return Blockly.utils.colour.blend('#000', colour, 0.25) || colour;
    }

    createDom(svg: SVGElement, tagName: string, selector: string): void {
        super.createDom(svg, tagName, selector);
        const defs: SVGDefsElement = Blockly.utils.dom.createSvgElement(Blockly.utils.Svg.DEFS, {}, svg);
        const selectedGlowFilter: SVGFilterElement = Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.FILTER, {
                'id': 'blocklySelectedGlowFilter' + this.randomIdentifier,
                'height': '160%',
                'width': '180%',
                y: '-30%',
                x: '-40%'
            },
            defs);
        Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.FEGAUSSIANBLUR, {
                'in': 'SourceGraphic',
                'stdDeviation': this.SELECTED_GLOW_SIZE
            },
            selectedGlowFilter);
        const selectedComponentTransfer: SVGFEComponentTransferElement = Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.FECOMPONENTTRANSFER, {
                'result': 'outBlur'
            }, selectedGlowFilter);
        Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.FEFUNCA, {
                'type': 'table',
                'tableValues': '0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1'
            },
            selectedComponentTransfer);
        Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.FEFLOOD, {
                'flood-color': this.SELECTED_GLOW_COLOUR,
                'flood-opacity': 1,
                'result': 'outColor'
            },
            selectedGlowFilter);
        Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.FECOMPOSITE, {
                'in': 'outColor',
                'in2': 'outBlur',
                'operator': 'in',
                'result': 'outGlow'
            },
            selectedGlowFilter);
        this.selectedGlowFilterId = selectedGlowFilter.id;
        this.selectedGlowFilter_ = selectedGlowFilter;
        const replacementGlowFilter: SVGFilterElement = Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.FILTER, {
                'id': 'blocklyReplacementGlowFilter' + this.randomIdentifier,
                'height': '160%',
                'width': '180%',
                y: '-30%',
                x: '-40%'
            },
            defs);
        Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.FEGAUSSIANBLUR, {
                'in': 'SourceGraphic',
                'stdDeviation': this.REPLACEMENT_GLOW_SIZE
            },
            replacementGlowFilter);
        const replacementComponentTransfer: SVGFEComponentTransferElement = Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.FECOMPONENTTRANSFER, {
                'result': 'outBlur'
            }, replacementGlowFilter);
        Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.FEFUNCA, {
                'type': 'table',
                'tableValues': '0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1'
            },
            replacementComponentTransfer);
        Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.FEFLOOD, {
                'flood-color': this.REPLACEMENT_GLOW_COLOUR,
                'flood-opacity': 1,
                'result': 'outColor'
            },
            replacementGlowFilter);
        Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.FECOMPOSITE, {
                'in': 'outColor',
                'in2': 'outBlur',
                'operator': 'in',
                'result': 'outGlow'
            },
            replacementGlowFilter);
        Blockly.utils.dom.createSvgElement(
            Blockly.utils.Svg.FECOMPOSITE, {
                'in': 'SourceGraphic',
                'in2': 'outGlow',
                'operator': 'over',
            },
            replacementGlowFilter);
        this.replacementGlowFilterId = replacementGlowFilter.id;
        this.replacementGlowFilter_ = replacementGlowFilter;
    }

    getCSS_(selector: string): string[] {
        return [
            /* eslint-disable indent */
            // Text.
            selector + ' .blocklyText,',
            selector + ' .blocklyFlyoutLabelText {',
            'font: ' + this.FIELD_TEXT_FONTWEIGHT + ' ' +
            this.FIELD_TEXT_FONTSIZE + 'pt ' + this.FIELD_TEXT_FONTFAMILY + ';',
            '}',

            // Fields.
            selector + ' .blocklyText {',
            'fill: #fff;',
            '}',
            selector + ' .blocklyNonEditableText>rect:not(.blocklyDropdownRect),',
            selector + ' .blocklyEditableText>rect:not(.blocklyDropdownRect) {',
            'fill: ' + this.FIELD_BORDER_RECT_COLOUR + ';',
            '}',
            selector + ' .blocklyNonEditableText>text,',
            selector + ' .blocklyEditableText>text,',
            selector + ' .blocklyNonEditableText>g>text,',
            selector + ' .blocklyEditableText>g>text {',
            'fill: #575E75;',
            '}',

            // Flyout labels.
            selector + ' .blocklyFlyoutLabelText {',
            'fill: #575E75;',
            '}',

            // Bubbles.
            selector + ' .blocklyText.blocklyBubbleText {',
            'fill: #575E75;',
            '}',

            // Editable field hover.
            selector + ' .blocklyDraggable:not(.blocklyDisabled)',
            ' .blocklyEditableText:not(.editing):hover>rect,',
            selector + ' .blocklyDraggable:not(.blocklyDisabled)',
            ' .blocklyEditableText:not(.editing):hover>.blocklyPath {',
            'stroke: #fff;',
            'stroke-width: 2;',
            '}',

            // Text field input.
            selector + ' .blocklyHtmlInput {',
            'font-family: ' + this.FIELD_TEXT_FONTFAMILY + ';',
            'font-weight: ' + this.FIELD_TEXT_FONTWEIGHT + ';',
            'color: #575E75;',
            '}',

            // Dropdown field.
            selector + ' .blocklyDropdownText {',
            'fill: #fff !important;',
            '}',
            // Widget and Dropdown Div
            selector + '.blocklyWidgetDiv .goog-menuitem,',
            selector + '.blocklyDropDownDiv .goog-menuitem {',
            'font-family: ' + this.FIELD_TEXT_FONTFAMILY + ';',
            '}',
            selector + '.blocklyDropDownDiv .goog-menuitem-content {',
            'color: #fff;',
            '}',

            // Connection highlight.
            selector + ' .blocklyHighlightedConnectionPath {',
            'stroke: ' + this.SELECTED_GLOW_COLOUR + ';',
            '}',

            // Disabled outline paths.
            selector + ' .blocklyDisabled > .blocklyOutlinePath {',
            'fill: url(#blocklyDisabledPattern' + this.randomIdentifier + ')',
            '}',

            // Insertion marker.
            selector + ' .blocklyInsertionMarker>.blocklyPath {',
            'fill-opacity: ' + this.INSERTION_MARKER_OPACITY + ';',
            'stroke: none;',
            '}',
            /* eslint-enable indent */
        ];
    }
}

export default WebyConstantsProvider;