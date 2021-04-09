import Blockly from 'blockly/core';

class FieldColourExt extends Blockly.Field {
    constructor(opt_value, opt_validator, opt_config) {
        super(opt_value, opt_validator, opt_config);
        this.picker_ = null;
        this.highlightedIndex_ = null;
        this.onClickWrapper_ = null;
        this.onMouseMoveWrapper_ = null;
        this.onMouseEnterWrapper_ = null;
        this.onMouseLeaveWrapper_ = null;
        this.onKeyDownWrapper_ = null;
        this.SERIALIZABLE = true;
        this.CURSOR = 'default';
        this.isDirty_ = false;
        this.colours_ = null;
        this.titles_ = null;
        this.columns_ = 0;
        this.COLOURS = [
            // grays
            '#ffffff', '#cccccc', '#c0c0c0', '#999999', '#666666', '#333333', '#000000',
            // reds
            '#ffcccc', '#ff6666', '#ff0000', '#cc0000', '#990000', '#660000', '#330000',
            // oranges
            '#ffcc99', '#ff9966', '#ff9900', '#ff6600', '#cc6600', '#993300', '#663300',
            // yellows
            '#ffff99', '#ffff66', '#ffcc66', '#ffcc33', '#cc9933', '#996633', '#663333',
            // olives
            '#ffffcc', '#ffff33', '#ffff00', '#ffcc00', '#999900', '#666600', '#333300',
            // greens
            '#99ff99', '#66ff99', '#33ff33', '#33cc00', '#009900', '#006600', '#003300',
            // turquoises
            '#99ffff', '#33ffff', '#66cccc', '#00cccc', '#339999', '#336666', '#003333',
            // blues
            '#ccffff', '#66ffff', '#33ccff', '#3366ff', '#3333ff', '#000099', '#000066',
            // purples
            '#ccccff', '#9999ff', '#6666cc', '#6633ff', '#6600cc', '#333399', '#330099',
            // violets
            '#ffccff', '#ff99ff', '#cc66cc', '#cc33cc', '#993399', '#663366', '#330033'
        ];
        this.DEFAULT_VALUE = this.COLOURS[0];
        this.TITLES = [];
        this.COLUMNS = 7;
    }

    fromJson(options) {
        return new FieldColourExt(options['colour'], undefined, options);
    }

    configure_(config) {
        super.configure_(config);
        if(config['colourOptions']) {
            this.colours_ = config['colourOptions'];
            this.titles_ = config['colourTitltes'];
        }
        if(config['columns']) {
            this.columns_ = config['columns'];
        }
    }

    initView() {
        this.size_ = new Blockly.utils.Size(this.getConstants().FIELD_COLOUR_DEFAULT_WIDTH,
                                            this.getConstants().FIELD_COLOUR_DEFAULT_HEIGHT);
        if(!this.getConstants().FIELD_COLOUR_FULL_BLOCK) {
            this.createBorderRect_();
            this.borderRect_.style['fillOpacity'] = '1';
        } else {
            this.clickTarget_ = this.sourceBlock_.getSvgRoot();
        }
    }

    applyColour() {
        if (!this.getConstants().FIELD_COLOUR_FULL_BLOCK) {
            if (this.borderRect_) {
              this.borderRect_.style.fill = this.getValue();
            }
        } else {
            this.sourceBlock_.pathObject.svgPath.setAttribute('fill', this.getValue());
            this.sourceBlock_.pathObject.svgPath.setAttribute('stroke', '#fff');
        }
    }

    doClassValidation_(opt_newValue) {
        if (typeof opt_newValue != 'string') {
            return null;
        }
        return Blockly.utils.colour.parse(opt_newValue);
    }

    doValueUpdate_(newValue) {
        this.value_ = newValue;
        if (this.borderRect_) {
            this.borderRect_.style.fill = newValue;
        } else if (this.sourceBlock_ && this.sourceBlock_.rendered) {
            this.sourceBlock_.pathObject.svgPath.setAttribute('fill', newValue);
            this.sourceBlock_.pathObject.svgPath.setAttribute('stroke', '#fff');
        }
    }
    
    getText() {
        var colour = this.value_;
        if (/^#(.)\1(.)\2(.)\3$/.test(colour)) {
            colour = '#' + colour[1] + colour[3] + colour[5];
        }
        return colour;
    }

    setColours(colours, opt_titles) {
        this.colours_ = colours;
        if (opt_titles) {
            this.titles_ = opt_titles;
        }
        return this;
    }

    setColumns(columns) {
        this.columns_ = columns;
        return this;
    }

    showEditor_() {
        this.picker_ = this.dropdownCreate_();
        Blockly.DropDownDiv.getContentDiv().appendChild(this.picker_);
        Blockly.DropDownDiv.showPositionedByField(this, this.dropdownDispose_.bind(this));
        this.picker_.focus({preventScroll: true});
    }

    onClick_(e) {
        var cell = e.target;
        var colour = cell && cell.label;
        if(colour !== null) {
            this.setValue(colour);
            Blockly.DropDownDiv.hideIfOwner(this);
        }
    }

    onKeyDown_(e) {
        var handled = false;
        if(e.keyCode === Blockly.utils.KeyCodes.UP) {
            this.moveHighlightBy_(0, -1);
            handled = true;
        } else if(e.keyCode === Blockly.utils.KeyCodes.DOWN) {
            this.moveHighlightBy_(0, 1);
            handled = true;
        } else if(e.keyCode === Blockly.utils.KeyCodes.LEFT) {
            this.moveHighlightBy_(-1, 0);
            handled = true;
        } else if(e.keyCode === Blockly.utils.KeyCodes.RIGHT) {
            this.moveHighlightBy_(1, 0);
            handled = true;
        } else if(e.keyCode === Blockly.utils.KeyCodes.ENTER) {
            var highlighted = this.getHighlighted_();
            if (highlighted) {
              var colour = highlighted && highlighted.label;
              if (colour !== null) {
                this.setValue(colour);
              }
            }
            Blockly.DropDownDiv.hideWithoutAnimation();
            handled = true;
        }
        if (handled) {
            e.stopPropagation();
        }
    }

    onBlocklyAction(action) {
        if (this.picker_) {
            switch (action.name) {
            case Blockly.navigation.actionNames.PREVIOUS:
                this.moveHighlightBy_(0, -1);
                return true;
            case Blockly.navigation.actionNames.NEXT:
                this.moveHighlightBy_(0, 1);
                return true;
            case Blockly.navigation.actionNames.OUT:
                this.moveHighlightBy_(-1, 0);
                return true;
            case Blockly.navigation.actionNames.IN:
                this.moveHighlightBy_(1, 0);
                return true;
            default:
                return false;
            }
        }
        return super.onBlocklyAction(action);
    }

    moveHighlightBy_(dx, dy) {
        var colours = this.colours_ || this.COLOURS;
        var columns = this.columns_ || this.COLUMNS;
        var x = this.highlightedIndex_ % columns;
        var y = Math.floor(this.highlightedIndex_ / columns);

        x += dx;
        y += dy;

        if(dx < 0) {
            if(x < 0 && y > 0) {
                x = columns - 1;
                y--;
            } else if(x < 0) {
                x = 0;
            }
        } else if(dx > 0) {
            if(x > columns - 1 && y < Math.floor(colours.length / columns) - 1) {
                x = 0;
                y++;
            } else if(dy < 0) {
                if(y < 0) {
                    y = 0;
                }
            } else if(dy > 0) {
                if(y > Math.floor(colours.length / columns) - 1) {
                    y = Math.floor(colours.length / columns) - 1;
                }
            } 
        }

        var cell = this.picker_.childNodes[y].childNodes[x];
        var index = (y * columns) + x;
        this.setHighlightedCell_(cell, index);
    }

    onMouseMove_(e) {
        var cell = e.target;
        var index = cell && Number(cell.getAttribute('data-index'));
        if(index !== null && index !== this.highlightedIndex_) {
            this.setHighlightedCell_(cell, index);
        }
    }

    onMouseEnter_() {
        this.picker_.focus({preventScroll:true});
    }

    onMouseLeave_() {
        this.picker_.blur();
        var highlighted = this.getHighlighted_();
        if(highlighted) {
            Blockly.utils.dom.removeClass(highlighted, 'blocklyColourHighlighted');
        }
    }

    getHighlighted_() {
        var columns = this.columns_ || this.COLUMNS;
        var x = this.highlightedIndex_ % columns;
        var y = Math.floor(this.highlightedIndex_ / columns);
        var row = this.picker_.childNodes[y];
        if (!row) {
            return null;
        }
        var col = row.childNodes[x];
        return col;
    }

    setHighlightedCell_(cell, index) {
        var highlighted = this.getHighlighted_();
        if (highlighted) {
            Blockly.utils.dom.removeClass(highlighted, 'blocklyColourHighlighted');
        }
        Blockly.utils.dom.addClass(cell, 'blocklyColourHighlighted');
        this.highlightedIndex_ = index;
        Blockly.utils.aria.setState(this.picker_, Blockly.utils.aria.State.ACTIVEDESCENDANT, cell.getAttribute('id'));
    }

    dropdownCreate_() {
        var columns = this.columns_ || this.COLUMNS;
        var colours = this.colours_ || this.COLOURS;
        var titles = this.titles_ || this.TITLES;
        var selectedColour = this.getValue();
        // Create the palette.
        var table = document.createElement('table');
        table.className = 'blocklyColourTable';
        table.tabIndex = 0;
        table.dir = 'ltr';
        Blockly.utils.aria.setRole(table, Blockly.utils.aria.Role.GRID);
        Blockly.utils.aria.setState(table, Blockly.utils.aria.State.EXPANDED, true);
        Blockly.utils.aria.setState(table, Blockly.utils.aria.State.ROWCOUNT, Math.floor(colours.length / columns));
        Blockly.utils.aria.setState(table, Blockly.utils.aria.State.COLCOUNT, columns);
        
        var row;
        for (var i = 0; i < colours.length; i++) {
            if (i % columns === 0) {
            row = document.createElement('tr');
            Blockly.utils.aria.setRole(row, Blockly.utils.aria.Role.ROW);
            table.appendChild(row);
            }
            var cell = document.createElement('td');
            row.appendChild(cell);
            cell.label = colours[i];  // This becomes the value, if clicked.
            cell.title = titles[i] || colours[i];
            cell.id = Blockly.utils.IdGenerator.getNextUniqueId();
            cell.setAttribute('data-index', i);
            Blockly.utils.aria.setRole(cell, Blockly.utils.aria.Role.GRIDCELL);
            Blockly.utils.aria.setState(cell, Blockly.utils.aria.State.LABEL, colours[i]);
            Blockly.utils.aria.setState(cell, Blockly.utils.aria.State.SELECTED, colours[i] === selectedColour);
            cell.style.backgroundColor = colours[i];
            if (colours[i] === selectedColour) {
                cell.className = 'blocklyColourSelected';
                this.highlightedIndex_ = i;
            }
        }

        this.onClickWrapper_ = Blockly.bindEventWithChecks_(table, 'click', this, this.onClick_, true);
        this.onMouseMoveWrapper_ = Blockly.bindEventWithChecks_(table, 'mousemove', this, this.onMouseMove_, true);
        this.onMouseEnterWrapper_ = Blockly.bindEventWithChecks_(table, 'mouseenter', this, this.onMouseEnter_, true);
        this.onMouseLeaveWrapper_ = Blockly.bindEventWithChecks_(table, 'mouseleave', this, this.onMouseLeave_, true);
        this.onKeyDownWrapper_ = Blockly.bindEventWithChecks_(table, 'keydown', this, this.onKeyDown_);
      
        return table;
    }

    dropdownDispose_() {
        if (this.onClickWrapper_) {
            Blockly.unbindEvent_(this.onClickWrapper_);
            this.onClickWrapper_ = null;
        }
        if (this.onMouseMoveWrapper_) {
            Blockly.unbindEvent_(this.onMouseMoveWrapper_);
            this.onMouseMoveWrapper_ = null;
        }
        if (this.onMouseEnterWrapper_) {
            Blockly.unbindEvent_(this.onMouseEnterWrapper_);
            this.onMouseEnterWrapper_ = null;
        }
        if (this.onMouseLeaveWrapper_) {
            Blockly.unbindEvent_(this.onMouseLeaveWrapper_);
            this.onMouseLeaveWrapper_ = null;
        }
        if (this.onKeyDownWrapper_) {
            Blockly.unbindEvent_(this.onKeyDownWrapper_);
            this.onKeyDownWrapper_ = null;
        }
        this.picker_ = null;
        this.highlightedIndex_ = null;
    }
}

Blockly.Css.register([
    /* eslint-disable indent */
    '.blocklyColourTable {',
      'border-collapse: collapse;',
      'display: block;',
      'outline: none;',
      'padding: 1px;',
    '}',
  
    '.blocklyColourTable>tr>td {',
      'border: .5px solid #888;',
      'box-sizing: border-box;',
      'cursor: pointer;',
      'display: inline-block;',
      'height: 20px;',
      'padding: 0;',
      'width: 20px;',
    '}',
  
    '.blocklyColourTable>tr>td.blocklyColourHighlighted {',
      'border-color: #eee;',
      'box-shadow: 2px 2px 7px 2px rgba(0,0,0,.3);',
      'position: relative;',
    '}',
  
    '.blocklyColourSelected, .blocklyColourSelected:hover {',
      'border-color: #eee !important;',
      'outline: 1px solid #333;',
      'position: relative;',
    '}'
    /* eslint-enable indent */
]);

Blockly.fieldRegistry.register('field_colour_ext', FieldColourExt);

export default FieldColourExt;