//
// BART/CRLF representation for actor programs
//
'use strict';

var BART = (function (self) {
  var CRLF = {};

  let fieldToString = function fieldToString(field, missing) {
    let value = field.getText();
    if (typeof value === 'string') {
      return value;
    } else {
      return missing;
    }
  };

  let fieldToNumber = function fieldToNumber(field, missing) {
    let value = field.getText();
    if (typeof value === 'string') {
      return (1 * value);
    } else {
      return missing;
    }
  };

  let blockToError = function blockToError(block) {
    return "ERROR: unknown block -- " + block.type;
  };

  let blockToCRLF = function blockToCRLF(block) {
    var convert = CRLF[block.type];
    if (!convert) {
      return blockToError(block);
    }
    return convert(block);
  };
  
  let stackToCRLF = function stackToCRLF(block) {
    var list = [];
    while (block) {
      list.push(blockToCRLF(block));
      block = block.getNextBlock();
    }
    return list;
  };

  let workspaceToCRLF = function workspaceToCRLF(workspace) {
    var list = workspace.getTopBlocks(true);
    for (var i = 0; i < list.length; ++i) {
      list[i] = blockToCRLF(list[i]);  // replace each block with CRLF
    }
    return list;
  };

  CRLF['actor_sponsor'] = function (block) {
    var crlf = {
      "kind": "actor_sponsor",
      "actors": fieldToNumber(block.getField('ACTORS')),
      "events": fieldToNumber(block.getField('EVENTS')),
      "script": stackToCRLF(block.getInputTargetBlock('SCRIPT'))
    };
    return crlf;
  };

  CRLF['actor_send'] = function (block) {
    var crlf = {
      "kind": "actor_send",
      "message": blockToCRLF(block.getInputTargetBlock('MESSAGE')),  /* <dictionary> */
      "actor": blockToCRLF(block.getInputTargetBlock('ACTOR'))  /* <address> */
    };
    return crlf;
  };

  CRLF['actor_create'] = function (block) {
    var crlf = {
      "kind": "actor_create",
      "state": blockToCRLF(block.getInputTargetBlock('STATE')),  /* <dictionary> */
      "behavior": blockToCRLF(block.getInputTargetBlock('BEHAVIOR'))  /* <behavior> */
    };
    return crlf;
  };

  CRLF['actor_behavior'] = function (block) {
    var crlf = {
      "kind": "actor_behavior",
      "name": fieldToString(block.getField('NAME')),  // FIXME: behavior name is optional, check for missing?
      "script": stackToCRLF(block.getInputTargetBlock('SCRIPT'))
    };
    return crlf;
  };

  CRLF['actor_become'] = function (block) {
    var crlf = {
      "kind": "actor_become",
      "behavior": blockToCRLF(block.getInputTargetBlock('BEHAVIOR'))  /* <behavior> */
    };
    return crlf;
  };

  CRLF['actor_assign'] = function (block) {
    var crlf = {
      "kind": "actor_assign",
      "name": fieldToString(block.getField('NAME')),
      "value": blockToCRLF(block.getInputTargetBlock('VALUE'))  /* <expression> */
    };
    return crlf;
  };

  CRLF['actor_state'] = function (block) {
    var crlf = {
      "kind": "actor_state",
      "name": fieldToString(block.getField('NAME'))
    };
    return crlf;
  };

  CRLF['actor_has_state'] = function (block) {
    var crlf = {
      "kind": "actor_has_state",
      "name": fieldToString(block.getField('NAME'))
    };
    return crlf;
  };

  CRLF['actor_message'] = function (block) {
    var crlf = {
      "kind": "actor_message"
    };
    return crlf;
  };

  CRLF['actor_self'] = function (block) {
    var crlf = {
      "kind": "actor_self"
    };
    return crlf;
  };

  CRLF['actor_ignore'] = function (block) {
    var crlf = {
      "kind": "actor_ignore"
    };
    return crlf;
  };

  CRLF['actor_fail'] = function (block) {
    var crlf = {
      "kind": "actor_fail",
      "error": blockToCRLF(block.getInputTargetBlock('ERROR'))  /* <expression> */
    };
    return crlf;
  };

  CRLF['actor_send_after'] = function (block) {
    var crlf = {
      "kind": "actor_send_after",
      "delay": fieldToNumber(block.getField('DELAY')),
      "message": blockToCRLF(block.getInputTargetBlock('MESSAGE')),  /* <dictionary> */
      "actor": blockToCRLF(block.getInputTargetBlock('ACTOR'))  /* <address> */
    };
    return crlf;
  };

  CRLF['device_now'] = function (block) {
    var crlf = {
      "kind": "device_now"
    };
    return crlf;
  };

  CRLF['dict_empty'] = function (block) {
    var crlf = {
      "kind": "dict_empty"
    };
    return crlf;
  };

  CRLF['dict_bind'] = function (block) {
    var crlf = {
      "kind": "dict_bind",
      "name": fieldToString(block.getField('NAME')),
      "value": blockToCRLF(block.getInputTargetBlock('VALUE')),  /* <expression> */
      "with": blockToCRLF(block.getInputTargetBlock('DICT'))  /* <dictionary> */
    };
    return crlf;
  };

  CRLF['dict_get'] = function (block) {
    var crlf = {
      "kind": "dict_get",
      "name": fieldToString(block.getField('NAME')),
      "in": blockToCRLF(block.getInputTargetBlock('DICT'))  /* <dictionary> */
    };
    return crlf;
  };

  CRLF['dict_has'] = function (block) {
    var crlf = {
      "kind": "dict_has",
      "name": fieldToString(block.getField('NAME')),
      "in": blockToCRLF(block.getInputTargetBlock('DICT'))  /* <dictionary> */
    };
    return crlf;
  };

  CRLF['logic_null'] = function (block) {
    var crlf = {
      "kind": "expr_literal",
      "type": "Unit",
      "const": null
    };
    return crlf;
  };

  CRLF['logic_boolean'] = function (block) {
    let bool = fieldToString(block.getField('BOOL'));
    var crlf = {
      "kind": "expr_literal",
      "type": "Boolean",
      "const": (bool == 'true')
    };
    return crlf;
  };

  CRLF['math_number'] = function (block) {
    var crlf = {
      "kind": "expr_literal",
      "type": "Number",
      "const": fieldToNumber(block.getField('NUM'))
    };
    return crlf;
  };

  CRLF['text'] = function (block) {
    var crlf = {
      "kind": "expr_literal",
      "type": "String",
      "const": fieldToString(block.getField('TEXT'))
    };
    return crlf;
  };

  CRLF['logic_negate'] = function (block) {
    let op = "neg";
    var crlf = {
      "kind": "expr_operation",
      "type": "Boolean",
      "name": op + "[1]",
      "args": [
        blockToCRLF(block.getInputTargetBlock('BOOL'))
      ]
    };
    return crlf;
  };

  CRLF['logic_operation'] = function (block) {
    let op = fieldToString(block.getField('OP'));
    var crlf = {
      "kind": "expr_operation",
      "type": "Boolean",
      "name": op + "[2]",
      "args": [
        blockToCRLF(block.getInputTargetBlock('A')),
        blockToCRLF(block.getInputTargetBlock('B'))
      ]
    };
    return crlf;
  };

  CRLF['math_number_property'] = function (block) {
    let op = fieldToString(block.getField('PROPERTY'));
    var crlf = {
      "kind": "expr_operation",
      "type": "Boolean"
    };
    if (op == 'divisible by') {
      crlf["name"] = op + "[2]";
      crlf["args"] = [
        blockToCRLF(block.getInputTargetBlock('NUMBER_TO_CHECK')),
        blockToCRLF(block.getInputTargetBlock('DIVISOR'))
      ]
    } else {
      crlf["name"] = op + "[1]";
      crlf["args"] = [
        blockToCRLF(block.getInputTargetBlock('NUMBER_TO_CHECK'))
      ]
    }
    return crlf;
  };

  CRLF['math_single'] = function (block) {
    let op = fieldToString(block.getField('OP'));
    var crlf = {
      "kind": "expr_operation",
      "type": "Number",
      "name": op + "[1]",
      "args": [
        blockToCRLF(block.getInputTargetBlock('NUM'))
      ]
    };
    return crlf;
  };

  CRLF['math_arithmetic'] = function (block) {
    let op = fieldToString(block.getField('OP'));
    var crlf = {
      "kind": "expr_operation",
      "type": "Number",
      "name": op + "[2]",
      "args": [
        blockToCRLF(block.getInputTargetBlock('A')),
        blockToCRLF(block.getInputTargetBlock('B'))
      ]
    };
    return crlf;
  };

  CRLF['math_trig'] = function (block) {
    let op = fieldToString(block.getField('OP'));
    var crlf = {
      "kind": "expr_operation",
      "type": "Number",
      "name": op + "[1]",
      "args": [
        blockToCRLF(block.getInputTargetBlock('NUM'))
      ]
    };
    return crlf;
  };

  CRLF['logic_ternary'] = function (block) {
    let op = "if-then-else";
    var crlf = {
      "kind": "expr_operation",
      "name": op + "[3]",
      "args": [
        blockToCRLF(block.getInputTargetBlock('IF')),
        blockToCRLF(block.getInputTargetBlock('THEN')),
        blockToCRLF(block.getInputTargetBlock('ELSE'))
      ]
    };
    return crlf;
  };

  // exports
  self.workspaceToCRLF = workspaceToCRLF;
  return self;
})({});
