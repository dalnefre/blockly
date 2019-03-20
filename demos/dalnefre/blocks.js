'use strict';

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
    "colour": 345,
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
    "type": "actor_behavior_with",
    "message0": "behavior with: %1 %2",
    "args0": [
      {
        "type": "input_value",
        "name": "STATE",
        "check": "Dict",
        "align": "RIGHT"
      },
      {
        "type": "input_statement",
        "name": "SCRIPT",
        "check": "Action"
      }
    ],
    "output": "Behavior",
    "colour": 270,
    "tooltip": "actor's script with initial state",
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
    "type": "actor_new",
    "message0": "new actor %1",
    "args0": [
      {
        "type": "input_value",
        "name": "BEHAVIOR",
        "check": "Behavior"
      }
    ],
    "output": "Actor",
    "colour": 90,
    "tooltip": "create an actor",
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
  return code;
};

Blockly.JavaScript['actor_new'] = function(block) {
  var value_behavior = Blockly.JavaScript.valueToCode(block, 'BEHAVIOR', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var code = 'this.sponsor(' + value_behavior + ')';
  return [code, Blockly.JavaScript.ORDER_MEMBER];  // default: ORDER_NONE
};

Blockly.JavaScript['actor_create'] = function(block) {
  var value_state = Blockly.JavaScript.valueToCode(block, 'STATE', Blockly.JavaScript.ORDER_COMMA);
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

Blockly.JavaScript['actor_behavior_with'] = function(block) {
  var value_state = Blockly.JavaScript.valueToCode(block, 'STATE', Blockly.JavaScript.ORDER_COMMA);
  var statements_script = Blockly.JavaScript.statementToCode(block, 'SCRIPT');
  var code = '';
  code += '(_ => function (__) {\n';
  code += '  this._ = this._ || _;  // actor state\n';
  code += statements_script;
  code += '})(';
  code += 'Object.assign(';
  code += 'Object.create(this._)';
  code += ', ' + value_state + '))';
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
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};

Blockly.JavaScript['actor_break'] = function(block) {
  var text_data = block.getFieldValue('DATA');
  var code = '';
  code += 'DAL.breakpoint('
  code += Blockly.JavaScript.quote_(text_data);
  code += ');\n';
  return code;
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
  if (text_name.match(/^[a-zA-Z_$][0-9a-zA-Z_$]*$/)) {
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

/*
 * Device
 */

Blockly.JavaScript['device_set'] = function(block) {
  var dropdown_pin = block.getFieldValue('PIN');
  var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_ATOMIC);
  var code = '';
  code += 'DAL.setDevicePin(';
  code += dropdown_pin
  code += ', ';
  code += value_value
  code += ');\n';
  return code;
};

Blockly.JavaScript['device_event'] = function(block) {
  var dropdown_event = block.getFieldValue('EVENT');
  var value_actor = Blockly.JavaScript.valueToCode(block, 'ACTOR', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = '';
  code += 'DAL.eventHandler';
  code += '["' + dropdown_event + '"]';
  code += ' = ' + value_actor;
  code += ';\n';
  return code;
};

Blockly.JavaScript['device_now'] = function(block) {
  var code = 'performance.now()';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];  // default: ORDER_NONE
};
