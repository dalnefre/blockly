'use strict';

Blockly.defineBlocksWithJsonArray([
  {
    "type": "actor_config",
    "message0": "configuration",
    "nextStatement": "Action",
    "colour": 345,
    "tooltip": "cast of actors",
    "helpUrl": ""
  },
  {
    "type": "actor_behavior",
    "message0": "behavior %1 %2",
    "args0": [
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
    "tooltip": "send a message",
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
    "tooltip": "update behavior",
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
    "message0": "create %1 actor",
    "args0": [
      {
        "type": "input_value",
        "name": "BEHAVIOR",
        "check": "Behavior"
      }
    ],
    "inputsInline": false,
    "output": "Actor",
    "colour": 90,
    "tooltip": "create an actor",
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
    "inputsInline": true,
    "output": null,
    "colour": 210,
    "tooltip": "dictionary lookup",
    "helpUrl": ""
  },
  {
    "type": "dict_set",
    "message0": "set %1 to %2 in %3",
    "args0": [
      {
        "type": "field_input",
        "name": "NAME",
        "text": "name"
      },
      {
        "type": "input_value",
        "name": "VALUE"
      },
      {
        "type": "input_value",
        "name": "DICT",
        "check": "Dict"
      }
    ],
    "inputsInline": true,
    "output": "Dict",
    "colour": 45,
    "tooltip": "dictionary definition",
    "helpUrl": ""
  },
  {
    "type": "dict_bind",
    "message0": "bind %1 to %2 in %3",
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
  }
]);

/*
 * Actor
 */

Blockly.JavaScript['actor_config'] = function(block) {
  var code = '';
  code += 'this.sponsor = tartjs(fail);  // configuration create\n';
  code += 'this._ = {};  // configuration state\n';
  return code;  // statements don't need binding-strength
};

Blockly.JavaScript['actor_send'] = function(block) {
  var value_message = Blockly.JavaScript.valueToCode(block, 'MESSAGE', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var value_actor = Blockly.JavaScript.valueToCode(block, 'ACTOR', Blockly.JavaScript.ORDER_FUNCTION_CALL);  // default: ORDER_ATOMIC
  var code = '';
  code += value_actor;
  code += '(';
  code += value_message;
  code += ')';
  code += ';\n';
  return code;  // statements don't need binding-strength
};

Blockly.JavaScript['actor_new'] = function(block) {
  var value_behavior = Blockly.JavaScript.valueToCode(block, 'BEHAVIOR', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var code = 'this.sponsor(' + value_behavior + ')';
  return [code, Blockly.JavaScript.ORDER_MEMBER];  // default: ORDER_NONE
};

Blockly.JavaScript['actor_create'] = function(block) {
  var value_behavior = Blockly.JavaScript.valueToCode(block, 'BEHAVIOR', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var code = 'this.sponsor(' + value_behavior + ')';
  return [code, Blockly.JavaScript.ORDER_MEMBER];  // default: ORDER_NONE
};

Blockly.JavaScript['actor_behavior'] = function(block) {
  var statements_script = Blockly.JavaScript.statementToCode(block, 'SCRIPT');
  var code = '';
  code += '((_) => function (__) {\n';
  code += '  this._ = this._ || _;  // actor state\n';
  code += '  Object.assign(this._, __);  // copy message into actor state\n';
  code += statements_script;
  code += '})(Object.create(this._))';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];  // default: ORDER_NONE
};

Blockly.JavaScript['actor_behavior_with'] = function(block) {
  var value_state = Blockly.JavaScript.valueToCode(block, 'STATE', Blockly.JavaScript.ORDER_COMMA);
  var statements_script = Blockly.JavaScript.statementToCode(block, 'SCRIPT');
  var code = '';
  code += '((_) => function (__) {\n';
  code += '  this._ = this._ || _;  // actor state\n';
  code += '  Object.assign(this._, __);  // copy message into actor state\n';
  code += statements_script;
  code += '})(';
  code += 'Object.assign(';
  code += 'Object.create(this._)';
  code += ', ' + value_state + '))';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];  // default: ORDER_NONE
};

Blockly.JavaScript['actor_become'] = function(block) {
  var value_behavior = Blockly.JavaScript.valueToCode(block, 'BEHAVIOR', Blockly.JavaScript.ORDER_ASSIGNMENT);  // default: ORDER_ATOMIC
  var code = '';
  code += 'this.behavior = ';
  code += value_behavior;
  code += ';\n';
  return code;  // statements don't need binding-strength
};

Blockly.JavaScript['actor_self'] = function(block) {
  var code = 'this.self';
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
  if (text_name.match(/^[a-zA-Z_$][0-9a-zA-Z_$]*$/)) {
    code += '.' + text_name;  // --FIXME-- quote special characters in identifier text_name
  } else {
    code += '[' + Blockly.JavaScript.quote_(text_name) + ']';
  }
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.JavaScript.ORDER_MEMBER];  // default: ORDER_NONE
};

Blockly.JavaScript['actor_fail'] = function(block) {
  var value_error = Blockly.JavaScript.valueToCode(block, 'ERROR', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var code = 'throw(' + value_error + ');\n';
  return code;  // statements don't need binding-strength
};

Blockly.JavaScript['actor_debug'] = function(block) {
  var code = '';
  code += 'function (__) {\n';
  code += '  let log = (console && console.log) || alert;\n';
  code += '  log("DEBUG:", __);\n';
  code += '}';
  return [code, Blockly.JavaScript.ORDER_COMMA];
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

Blockly.JavaScript['dict_set'] = function(block) {
  var text_name = block.getFieldValue('NAME');
  var value_value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var value_dict = Blockly.JavaScript.valueToCode(block, 'DICT', Blockly.JavaScript.ORDER_COMMA);  // default: ORDER_ATOMIC
  var code = '';
  code += 'Object.assign(';
  code += value_dict + ', ';
  code += '{ ' + Blockly.JavaScript.quote_(text_name);
  code += ': ' + value_value + ' })';
  return [code, Blockly.JavaScript.ORDER_FUNCTION_CALL];  // default: ORDER_NONE
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
