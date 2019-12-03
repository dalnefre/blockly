'use strict';

/*
Color Scheme
  45    Dictionary/Object
  165   Text/String
  210   Logic/Boolean
  225   Number
  270   Behavior/Config
  345   Action/Device
*/
Blockly.defineBlocksWithJsonArray([
  {
    "type": "actor_sponsor",
    "message0": "sponsor %1 actors %2 %3 events %4 %5",
    "args0": [
      {
        "type": "field_number",
        "name": "ACTORS",
        "value": 99,
        "min": 0
      },
      {
        "type": "input_dummy",
        "align": "RIGHT"
      },
      {
        "type": "field_number",
        "name": "EVENTS",
        "value": 999,
        "min": 0
      },
      {
        "type": "input_dummy",
        "align": "RIGHT"
      },
      {
        "type": "input_statement",
        "name": "SCRIPT",
        "check": "Action",
        "align": "RIGHT"
      }
    ],
    "colour": 270,
    "tooltip": "actor resource pool",
    "helpUrl": ""
  },
  {
    "type": "actor_behavior",
    "message0": "behavior %1 %2 %3",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": ""
      },
      {
        "type": "input_dummy"
      },
      {
        "type": "input_statement",
        "name": "SCRIPT",
        "check": "Action"
      }
    ],
    "output": "Behavior",
    "colour": 270,
    "tooltip": "actor's script",
    "helpUrl": ""
  },
  {
    "type": "actor_send",
    "message0": "send %1 to %2",
    "args0": [
      {
        "type": "input_value",
        "name": "MESSAGE",
        "check": "Dict",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "ACTOR",
        "check": "Actor",
        "align": "RIGHT"
      }
    ],
    "previousStatement": "Action",
    "nextStatement": "Action",
    "colour": 345,
    "tooltip": "send a message to an actor",
    "helpUrl": ""
  },
  {
    "type": "actor_send_after",
    "message0": "after %1 send %2 to %3",
    "args0": [
      {
        "type": "input_value",
        "name": "DELAY",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "MESSAGE",
        "check": "Dict",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "ACTOR",
        "check": "Actor",
        "align": "RIGHT"
      }
    ],
    "inputsInline": false,
    "previousStatement": "Action",
    "nextStatement": "Action",
    "colour": 345,
    "tooltip": "send a message to an actor after delay in milliseconds",
    "helpUrl": ""
  },
  {
    "type": "actor_become",
    "message0": "become %1",
    "args0": [
      {
        "type": "input_value",
        "name": "BEHAVIOR",
        "check": "Behavior"
      }
    ],
    "previousStatement": "Action",
    "nextStatement": "Action",
    "colour": 345,
    "tooltip": "update behavior script",
    "helpUrl": ""
  },
  {
    "type": "actor_self",
    "message0": "myself",
    "output": "Actor",
    "colour": 90,
    "tooltip": "the current actor",
    "helpUrl": ""
  },
  {
    "type": "actor_message",
    "message0": "message",
    "output": "Dict",
    "colour": 45,
    "tooltip": "the current message",
    "helpUrl": ""
  },
  {
    "type": "actor_ignore",
    "message0": "no action",
    "previousStatement": "Action",
    "nextStatement": "Action",
    "colour": 345,
    "tooltip": "ignore",
    "helpUrl": ""
  },
  {
    "type": "actor_create",
    "message0": "actor with: %1 script: %2",
    "args0": [
      {
        "type": "input_value",
        "name": "STATE",
        "check": "Dict",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "BEHAVIOR",
        "check": "Behavior",
        "align": "RIGHT"
      }
    ],
    "inputsInline": false,
    "output": "Actor",
    "colour": 90,
    "tooltip": "create an actor with initial state",
    "helpUrl": ""
  },
  {
    "type": "actor_assign",
    "message0": "set %1 to %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "name"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      }
    ],
    "inputsInline": false,
    "previousStatement": "Action",
    "nextStatement": "Action",
    "colour": 345,
    "tooltip": "update state",
    "helpUrl": ""
  },
  {
    "type": "actor_state",
    "message0": "get %1",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "name"
      }
    ],
    "output": null,
    "colour": 210,
    "tooltip": "retrieve state",
    "helpUrl": ""
  },
  {
    "type": "actor_has_state",
    "message0": "%1 is defined",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "name"
      }
    ],
    "output": "Boolean",
    "colour": 210,
    "tooltip": "check for definition",
    "helpUrl": ""
  },
  {
    "type": "actor_fail",
    "message0": "FAIL! %1",
    "args0": [
      {
        "type": "input_value",
        "name": "ERROR"
      }
    ],
    "previousStatement": "Action",
    "nextStatement": "Action",
    "colour": 345,
    "tooltip": "abort behavior",
    "helpUrl": ""
  },
  {
    "type": "actor_debug",
    "message0": "DEBUG...",
    "output": "Behavior",
    "colour": 270,
    "tooltip": "trap to debugger",
    "helpUrl": ""
  },
  {
    "type": "actor_break",
    "message0": "BREAKPOINT... %1",
    "args0": [
      {
        "type": "field_input",
        "name": "DATA",
        "text": ""
      }
    ],
    "previousStatement": "Action",
    "nextStatement": "Action",
    "colour": 345,
    "tooltip": "debugger breakpoint",
    "helpUrl": ""
  },
  {
    "type": "dict_empty",
    "message0": "{ }",
    "output": "Dict",
    "colour": 45,
    "tooltip": "empty dictionary",
    "helpUrl": ""
  },
  {
    "type": "dict_get",
    "message0": "get %1 from %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "name"
      },
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Dict"
      }
    ],
    "inputsInline": false,
    "output": null,
    "colour": 210,
    "tooltip": "dictionary lookup",
    "helpUrl": ""
  },
  {
    "type": "dict_has",
    "message0": "%1 defined in %2",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "name"
      },
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Dict"
      }
    ],
    "inputsInline": false,
    "output": "Boolean",
    "colour": 210,
    "tooltip": "check for definition",
    "helpUrl": ""
  },
  {
    "type": "dict_bind",
    "message0": "bind %1 to %2 with %3",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "name"
      },
      {
        "type": "input_value",
        "name": "VALUE",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Dict",
        "align": "RIGHT"
      }
    ],
    "inputsInline": false,
    "output": "Dict",
    "colour": 45,
    "tooltip": "dictionary definition",
    "helpUrl": ""
  },
  {
    "type": "dict_extend",
    "message0": "extend %1 with %2",
    "args0": [
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Dict",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "Dict",
        "align": "RIGHT"
      }
    ],
    "inputsInline": false,
    "output": "Dict",
    "colour": 45,
    "tooltip": "extend dictionary with new definitions",
    "helpUrl": ""
  },
  {
    "type": "device_set",
    "message0": "set %1 to %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "PIN",
        "options": [
          [
            "pin 0",
            "0"
          ],
          [
            "pin 1",
            "1"
          ],
          [
            "pin 2",
            "2"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "Boolean"
      }
    ],
    "previousStatement": "Action",
    "nextStatement": "Action",
    "colour": 345,
    "tooltip": "set state of device output pin",
    "helpUrl": ""
  },
  {
    "type": "device_event",
    "message0": "when %1 notify %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "EVENT",
        "options": [
          [
            "button A clicked,",
            "A.clicked"
          ],
          [
            "button B clicked,",
            "B.clicked"
          ],
          [
            "button C clicked,",
            "C.clicked"
          ]
        ]
      },
      {
        "type": "input_value",
        "name": "ACTOR",
        "check": "Actor"
      }
    ],
    "previousStatement": "Action",
    "nextStatement": "Action",
    "colour": 345,
    "tooltip": "listen for device events",
    "helpUrl": ""
  },
  {
    "type": "device_now",
    "message0": "now",
    "output": "Number",
    "colour": 225,
    "tooltip": "the current time in milliseconds",
    "helpUrl": ""
  },
  {
    "type": "string_empty",
    "message0": "\" \"",
    "output": "String",
    "colour": 165,
    "tooltip": "The empty string.",
    "helpUrl": ""
  },
  {
    "type": "string_literal",
    "message0": "\"%1\"",
    "args0": [
      {
        "type": "field_input",
        "name": "TEXT",
        "text": ""
      }
    ],
    "output": "String",
    "colour": 165,
    "tooltip": "A string.",
    "helpUrl": ""
  },
  {
    "type": "string_length",
    "message0": "count codes in %1",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      }
    ],
    "output": "Number",
    "colour": 225,
    "tooltip": "Length of a string, including spaces.",
    "helpUrl": ""
  },
  {
    "type": "string_at",
    "message0": "code #%1 in %2",
    "args0": [
      {
        "type": "input_value",
        "name": "INDEX",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      }
    ],
    "inputsInline": true,
    "output": "Number",
    "colour": 225,
    "tooltip": "Codepoint at position in string.",
    "helpUrl": ""
  },
  {
    "type": "string_insert",
    "message0": "insert %1 at %2 in %3",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "INDEX",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String",
        "align": "RIGHT"
      }
    ],
    "inputsInline": false,
    "output": "String",
    "colour": 165,
    "tooltip": "Add codepoint to string.",
    "helpUrl": ""
  },
  {
    "type": "character",
    "message0": "code for '%1'",
    "args0": [
      {
        "type": "field_input",
        "name": "CHAR",
        "text": "A"
      }
    ],
    "output": "Number",
    "colour": 225,
    "tooltip": "Codepoint for a character.",
    "helpUrl": ""
  },
  {
    "type": "array_empty",
    "message0": "[ ]",
    "output": "Array",
    "colour": 120,
    "tooltip": "The empty array.",
    "helpUrl": ""
  },
  {
    "type": "array_length",
    "message0": "count items in %1",
    "args0": [
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }
    ],
    "output": "Number",
    "colour": 225,
    "tooltip": "Length of an array.",
    "helpUrl": ""
  },
  {
    "type": "array_at",
    "message0": "item #%1 in %2",
    "args0": [
      {
        "type": "input_value",
        "name": "INDEX",
        "check": "Number"
      },
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array"
      }
    ],
    "inputsInline": true,
    "output": null,
    "colour": 210,
    "tooltip": "Item at position in array.",
    "helpUrl": ""
  },
  {
    "type": "array_insert",
    "message0": "insert %1 at %2 in %3",
    "args0": [
      {
        "type": "input_value",
        "name": "VALUE",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "INDEX",
        "check": "Number",
        "align": "RIGHT"
      },
      {
        "type": "input_value",
        "name": "LIST",
        "check": "Array",
        "align": "RIGHT"
      }
    ],
    "inputsInline": false,
    "output": "Array",
    "colour": 120,
    "tooltip": "Add item to array.",
    "helpUrl": ""
  },
  {
    "type": "text_match_regex",
    "message0": "%1 matches %2",
    "args0": [
      {
        "type": "input_value",
        "name": "TEXT",
        "check": "String"
      },
      {
        "type": "field_input",
        "name": "REGEX",
        "text": "^[0-9]+$"
      }
    ],
    "inputsInline": true,
    "output": "Boolean",
    "colour": 165,
    "tooltip": "true if text matches regular expression pattern",
    "helpUrl": ""
  }
]);

/*
 * Actor
 */

Blockly.JavaScript['actor_sponsor'] = function(block) {
  var number_actors = block.getFieldValue('ACTORS');
  var number_events = block.getFieldValue('EVENTS');
  var statements_script = Blockly.JavaScript.statementToCode(block, 'SCRIPT');
  // FIXME: implement actor and event limits!
  var code = '\n';
  code += '((DAL.tart({  // begin configuration\n';
  code += '  actorLimit: ' + number_actors + ',\n';
  code += '  eventLimit: ' + number_events + '\n';
  code += '}))(function (_) {\n';
  code += '  this._ = _;  // configuration state\n';
  code += statements_script;
  code += '}))({});  // end configuration\n';
  return code;  // statements don't need binding-strength
};

Blockly.JavaScript['actor_send'] = function(block) {
  var value_message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var value_actor = Blockly.JavaScript.valueToCode(block, 'ACTOR', Blockly.JavaScript.ORDER_FUNCTION_CALL);  // default: ORDER_ATOMIC
  var code = '';
  code += value_actor;
  code += '(';
  code += value_message;
  code += ');\n';
  return code;  // statements don't need binding-strength
};

Blockly.JavaScript['actor_send_after'] = function(block) {
  var value_delay = Blockly.JavaScript.valueToCode(block, 'DELAY', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var value_message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var value_actor = Blockly.JavaScript.valueToCode(block, 'ACTOR', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var code = '';
  code += '((target, message) => {\n';
  code += '  setTimeout(() => { ';
  code += 'target(message); ';
  code += '}, ' + value_delay + ');\n';
  code += '})(' + value_actor + ', ' + value_message +');\n';
  return code;  // statements don't need binding-strength
};

Blockly.JavaScript['actor_create'] = function(block) {
  var value_state = Blockly.JavaScript.valueToCode(block, 'STATE', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var value_behavior = Blockly.JavaScript.valueToCode(block, 'BEHAVIOR', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var code = '';
  code += 'this.sponsor(';
  code += value_behavior + '(';
  code += 'Object.assign(Object.create(this._), ';
  code += value_state + ')))';
  return [code, Blockly.JavaScript.ORDER_MEMBER];  // default: ORDER_NONE
};

Blockly.JavaScript['actor_behavior'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var statements_script = Blockly.JavaScript.statementToCode(block, 'SCRIPT');
  var code = '';
  code += '(_ => function ';
  if (text_name.match(DAL.varPattern)) {
    code += text_name;  // --FIXME-- quote special characters in identifier text_name
  }
  code += '(__) {\n';
  code += '  this._ = this._ || _;  // actor state\n';
  code += statements_script;
  code += '})';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];  // default: ORDER_NONE
};

Blockly.JavaScript['actor_become'] = function(block) {
  var value_behavior = Blockly.JavaScript.valueToCode(block, 'BEHAVIOR', Blockly.JavaScript.ORDER_FUNCTION_CALL);  // default: ORDER_ATOMIC
  var code = '';
  code += 'this.behavior = ';
  code += value_behavior + '(this._)';
  code += ';\n';
  return code;  // statements don't need binding-strength
};

Blockly.JavaScript['actor_self'] = function(block) {
  var code = 'this.self';
  return [code, Blockly.JavaScript.ORDER_MEMBER];  // default: ORDER_NONE
};

Blockly.JavaScript['actor_message'] = function(block) {
  var code = '__';
  return [code, Blockly.JavaScript.ORDER_MEMBER];  // default: ORDER_NONE
};

Blockly.JavaScript['actor_ignore'] = function(block) {
  var code = ';\n';
  return code;  // statements don't need binding-strength
};

Blockly.JavaScript['actor_assign'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var code = '';
  code += 'Object.assign(';
  code += 'this._, ';  // stateful context
  code += '{ ' + Blockly.JavaScript.quote_(text_name);
  code += ': ' + value_value + ' })';
  code += ';\n';
  return code;  // statements don't need binding-strength
};

Blockly.JavaScript['actor_state'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var code = 'this._';  // stateful context
  if (text_name.match(DAL.varPattern)) {
    code += '.' + text_name;  // --FIXME-- quote special characters in identifier text_name
  } else {
    code += '[' + Blockly.JavaScript.quote_(text_name) + ']';
  }
  return [code, Blockly.JavaScript.ORDER_MEMBER];  // default: ORDER_NONE
};

Blockly.JavaScript['actor_has_state'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var code = 'this._';  // stateful context
  code += '[' + Blockly.JavaScript.quote_(text_name) + ']';
  code += ' !== undefined';
  return [code, Blockly.JavaScript.ORDER_EQUALITY];  // default: ORDER_NONE
};

Blockly.JavaScript['actor_fail'] = function(block) {
  var value_error = Blockly.JavaScript.valueToCode(block, 'ERROR', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var code = 'throw(' + value_error + ');\n';
  return code;  // statements don't need binding-strength
};

Blockly.JavaScript['actor_debug'] = function(block) {
  var code = '';
  code += '(_ => function DEBUG(__) {  // ignore state\n';
  code += '  DAL.log("DEBUG:", __);\n';
  code += '})';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];  // default: ORDER_NONE
};

Blockly.JavaScript['actor_break'] = function(block) {
  var text_data = block.getFieldValue('DATA');
  var code = '';
  code += 'DAL.breakpoint('
  code += Blockly.JavaScript.quote_(text_data);
  code += ');\n';
  return code;  // statements don't need binding-strength
};

/*
 * Dictionary
 */

Blockly.JavaScript['dict_empty'] = function(block) {
  var code = '{}';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];  // default: ORDER_NONE
};

Blockly.JavaScript['dict_get'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var value_dict = Blockly.JavaScript.valueToCode(block, 'DICT', Blockly.JavaScript.ORDER_MEMBER);  // default: ORDER_ATOMIC
  var code = '';
  code += value_dict;
  if (text_name.match(DAL.varPattern)) {
    code += '.' + text_name;  // --FIXME-- quote special characters in identifier text_name
  } else {
    code += '[' + Blockly.JavaScript.quote_(text_name) + ']';
  }
  return [code, Blockly.JavaScript.ORDER_MEMBER];  // default: ORDER_NONE
};

Blockly.JavaScript['dict_has'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var value_dict = Blockly.JavaScript.valueToCode(block, 'DICT', Blockly.JavaScript.ORDER_MEMBER);  // default: ORDER_ATOMIC
  var code = '';
  code += value_dict;
  code += '[' + Blockly.JavaScript.quote_(text_name) + ']';
  code += ' !== undefined';
  return [code, Blockly.JavaScript.ORDER_EQUALITY];  // default: ORDER_NONE
};

Blockly.JavaScript['dict_bind'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var value_dict = Blockly.JavaScript.valueToCode(block, 'DICT', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var code = '';
  code += 'Object.freeze(';  // Dictionary values are immutable
  code += 'Object.assign(';
  code += 'Object.assign(';
  code += '{}, ' + value_dict + '), ';
  code += '{ ' + Blockly.JavaScript.quote_(text_name);
  code += ': ' + value_value + ' }';
  code += '))';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];  // default: ORDER_NONE
};

Blockly.JavaScript['dict_extend'] = function(block) {
  var value_dict = Blockly.JavaScript.valueToCode(block, 'DICT', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var code = '';
  code += 'Object.freeze(';  // Dictionary values are immutable
  code += 'Object.assign(';
  code += 'Object.assign(';
  code += '{}, ' + value_dict + '), ' + value_value;
  code += '))';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];  // default: ORDER_NONE
};

/*
 * Device
 */

Blockly.JavaScript['device_set'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);  // default: ORDER_ATOMIC
  var code = '';
  code += 'DAL.setDevicePin(';
  code += dropdown_pin
  code += ', ';
  code += value_value
  code += ');\n';
  return code;  // statements don't need binding-strength
};

Blockly.JavaScript['device_event'] = function(block) {
  var dropdown_event = block.getFieldValue('EVENT');
  var value_actor = Blockly.JavaScript.valueToCode(block, 'ACTOR', Blockly.JavaScript.ORDER_ATOMIC);  // default: ORDER_ATOMIC
  var code = '';
  code += 'DAL.eventHandler';
  code += '["' + dropdown_event + '"]';
  code += ' = ' + value_actor;
  code += ';\n';
  return code;  // statements don't need binding-strength
};

Blockly.JavaScript['device_now'] = function(block) {
  var code = 'performance.now()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];  // default: ORDER_NONE
};

Blockly.JavaScript['text_print'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var code = '';
  code += 'DAL.show(';
  //code += 'JSON.stringify(';
  code += value_text;
  //code += ', null, 2)';
  code += ');\n';
  return code;  // statements don't need binding-strength
};

/*
 * String
 */

Blockly.JavaScript['string_empty'] = function(block) {
  var code = '""';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];  // default: ORDER_NONE
};

Blockly.JavaScript['string_literal'] = function(block) {
  var field_text = block.getFieldValue('TEXT');
  var code = '';
  code += '"';
  code += field_text;  // --FIXME-- quote special characters in string value!
  code += '"';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];  // default: ORDER_NONE
};

Blockly.JavaScript['string_length'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_MEMBER);  // default: ORDER_ATOMIC
  var code = '';
  code += value_text;
  code += '.length';
  return [code, Blockly.JavaScript.ORDER_MEMBER];  // default: ORDER_NONE
};

Blockly.JavaScript['string_at'] = function(block) {
  var value_index = Blockly.JavaScript.valueToCode(block, 'INDEX', Blockly.JavaScript.ORDER_ATOMIC);  // default: ORDER_ATOMIC
  var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_MEMBER);  // default: ORDER_ATOMIC
  var code = '';
  code += value_text;
  code += '.charCodeAt(';
  code += value_index;
  code += '-1)';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];  // default: ORDER_NONE
};

Blockly.JavaScript['string_insert'] = function(block) {
  var value_index = Blockly.JavaScript.valueToCode(block, 'INDEX', Blockly.JavaScript.ORDER_ATOMIC);  // default: ORDER_ATOMIC
  var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_MEMBER);  // default: ORDER_ATOMIC
  var code = '';
  code += '';
  code += value_text + '.slice(0, ' + value_index + '-1)';
  code += ' + ';
  code += 'String.fromCharCode(' + value_value + ')';
  code += ' + ';
  code += value_text + '.slice(' + value_index + '-1)';
  return [code, Blockly.JavaScript.ORDER_NONE];  // default: ORDER_NONE
};

Blockly.JavaScript['character'] = function(block) {
  var field_char = block.getFieldValue('CHAR');
  var code = '';
  code += field_char.charCodeAt(0);
  return [code, Blockly.JavaScript.ORDER_ATOMIC];  // default: ORDER_NONE
};

/*
 * Array
 */

Blockly.JavaScript['array_empty'] = function(block) {
  var code = '[]';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];  // default: ORDER_NONE
};

Blockly.JavaScript['array_length'] = function(block) {
  var value_list = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_MEMBER);  // default: ORDER_ATOMIC
  var code = '';
  code += value_list;
  code += '.length';
  return [code, Blockly.JavaScript.ORDER_MEMBER];  // default: ORDER_NONE
};

Blockly.JavaScript['array_at'] = function(block) {
  var value_index = Blockly.JavaScript.valueToCode(block, 'INDEX', Blockly.JavaScript.ORDER_ATOMIC);  // default: ORDER_ATOMIC
  var value_list = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_MEMBER);  // default: ORDER_ATOMIC
  var code = '';
  code += value_list;
  code += '[';
  code += value_index;
  code += '-1]';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];  // default: ORDER_NONE
};

Blockly.JavaScript['array_insert'] = function(block) {
  var value_index = Blockly.JavaScript.valueToCode(block, 'INDEX', Blockly.JavaScript.ORDER_ATOMIC);  // default: ORDER_ATOMIC
  var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var value_list = Blockly.JavaScript.valueToCode(block, 'LIST', Blockly.JavaScript.ORDER_MEMBER);  // default: ORDER_ATOMIC
  var code = '';
  code += '';
  code += value_list + '.slice(0, ' + value_index + '-1)';
  code += '.concat([' + value_value + '])';
  code += '.concat(' + value_list + '.slice(' + value_index + '-1))';
  return [code, Blockly.JavaScript.ORDER_NONE];  // default: ORDER_NONE
};

/*
 * Text
 */

Blockly.JavaScript['text_match_regex'] = function(block) {
  var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);  // default: ORDER_ATOMIC
  var text_regex = block.getFieldValue('REGEX');
  var code = '';
  code += value_text;
  code += '.match(/';
  code += text_regex;
  code += '/)';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];  // default: ORDER_NONE
};
