//
// BART/CRLF representation for actor programs
//
'use strict';

var BART = (function (self) {
  var CRLF = {};

  let fieldToString = function fieldToString(field, missing) {
    if (field) {
      let value = field.getValue();
      if (typeof value === 'string') {
        return value;
      }
    }
    return missing;
  };

  let fieldToNumber = function fieldToNumber(field, missing) {
    if (field) {
      let value = field.getValue();
      if (typeof value === 'string') {
        return (1 * value);
      }
    }
    return missing;
  };

  let blockToError = function blockToError(block) {
    if (block) {
      return "ERROR: unknown block -- " + block.type;
    }
    return "ERROR: missing block";
  };

  let blockToCRLF = function blockToCRLF(block) {
    if (block) {
      var convert = CRLF[block.type];
      if (convert) {
        return convert(block);
      }
    }
    return blockToError(block);
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

  /*
   * Action
   */

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

  //CRLF['actor_debug'] = function (block) { ... };

  //CRLF['actor_break'] = function (block) { ... };

  /*
   * State
   */

  CRLF['actor_self'] = function (block) {
    var crlf = {
      "kind": "actor_self"
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

  CRLF['actor_has_state'] = function (block) {
    var crlf = {
      "kind": "actor_has_state",
      "name": fieldToString(block.getField('NAME'))
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

  CRLF['actor_message'] = function (block) {
    var crlf = {
      "kind": "actor_message"
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

  CRLF['dict_get'] = function (block) {
    var crlf = {
      "kind": "dict_get",
      "name": fieldToString(block.getField('NAME')),
      "in": blockToCRLF(block.getInputTargetBlock('DICT'))  /* <dictionary> */
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

  //CRLF['dict_extend'] = function (block) { ... };

  CRLF['dict_empty'] = function (block) {
    var crlf = {
      "kind": "expr_literal",
      "type": "Object",
      "const": {}
    };
    return crlf;
  };

  /*
   * String (Text)
   */

  CRLF['string_literal'] = function (block) {
    var crlf = {
      "kind": "expr_literal",
      "type": "String",
      "const": fieldToString(block.getField('TEXT'))
    };
    return crlf;
  };

  CRLF['string_length'] = function (block) {
    var crlf = {
      "kind": "string_length",
      "string": blockToCRLF(block.getInputTargetBlock('TEXT'))  /* <string> */
    };
    return crlf;
  };

  CRLF['string_at'] = function (block) {
    var crlf = {
      "kind": "string_at",
      "index": blockToCRLF(block.getInputTargetBlock('INDEX')),  /* <number> */
      "string": blockToCRLF(block.getInputTargetBlock('TEXT'))  /* <string> */
    };
    return crlf;
  };

  CRLF['string_insert'] = function (block) {
    var crlf = {
      "kind": "string_insert",
      "index": blockToCRLF(block.getInputTargetBlock('INDEX')),  /* <number> */
      "value": blockToCRLF(block.getInputTargetBlock('VALUE')),  /* <number> */
      "string": blockToCRLF(block.getInputTargetBlock('TEXT'))  /* <string> */
    };
    return crlf;
  };

  CRLF['character'] = function (block) {
    var crlf = {
      "kind": "expr_literal",
      "type": "Number",
      "const": fieldToString(block.getField('CHAR')).charCodeAt(0)  /* <number> */
    };
    return crlf;
  };

  CRLF['string_empty'] = function (block) {
    var crlf = {
      "kind": "expr_literal",
      "type": "String",
      "const": ""
    };
    return crlf;
  };

  /*
   * Array (List)
   */

  CRLF['array_length'] = function (block) {
    var crlf = {
      "kind": "array_length",
      "array": blockToCRLF(block.getInputTargetBlock('LIST'))  /* <array> */
    };
    return crlf;
  };

  CRLF['array_at'] = function (block) {
    var crlf = {
      "kind": "array_at",
      "index": blockToCRLF(block.getInputTargetBlock('INDEX')),  /* <number> */
      "array": blockToCRLF(block.getInputTargetBlock('LIST'))  /* <array> */
    };
    return crlf;
  };

  CRLF['array_insert'] = function (block) {
    var crlf = {
      "kind": "array_insert",
      "index": blockToCRLF(block.getInputTargetBlock('INDEX')),  /* <number> */
      "value": blockToCRLF(block.getInputTargetBlock('VALUE')),  /* <expression> */
      "array": blockToCRLF(block.getInputTargetBlock('LIST'))  /* <array> */
    };
    return crlf;
  };

  CRLF['array_empty'] = function (block) {
    var crlf = {
      "kind": "expr_literal",
      "type": "Array",
      "const": []
    };
    return crlf;
  };

  /*
   * Math
   */

  CRLF['math_number'] = function (block) {
    var crlf = {
      "kind": "expr_literal",
      "type": "Number",
      "const": fieldToNumber(block.getField('NUM'))
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

  //CRLF['math_constant'] = function (block) {
  //  let name = fieldToString(block.getField('CONSTANT'));
  //  ...
  //};

  CRLF['math_number_property'] = function (block) {
    let op = fieldToString(block.getField('PROPERTY'));
    var crlf = {
      "kind": "expr_operation",
      "type": "Boolean"
    };
    if (op == 'DIVISIBLE_BY') {
      crlf["name"] = op + "[2]";
      crlf["args"] = [
        blockToCRLF(block.getInputTargetBlock('NUMBER_TO_CHECK')),
        blockToCRLF(block.getInputTargetBlock('DIVISOR'))
      ];
    } else {
      crlf["name"] = op + "[1]";
      crlf["args"] = [
        blockToCRLF(block.getInputTargetBlock('NUMBER_TO_CHECK'))
      ];
    }
    return crlf;
  };

  //CRLF['math_round'] = function (block) { ... };

  //CRLF['math_on_list'] = function (block) { ... };

  //CRLF['math_modulo'] = function (block) { ... };

  //CRLF['math_constrain'] = function (block) { ... };

  //CRLF['math_random_int'] = function (block) { ... };

  //CRLF['math_random_float'] = function (block) { ... };

  /*
   * Text
   */

  CRLF['text'] = function (block) {
    var crlf = {
      "kind": "expr_literal",
      "type": "String",
      "const": fieldToString(block.getField('TEXT'))
    };
    return crlf;
  };

  CRLF['text_join'] = function (block) {
    var parts = [];
    var i = 0;
    while (i < 99) {  // FIXME: is there a limit to the number of clauses?
      var add_block = block.getInputTargetBlock('ADD' + i);
      if (add_block) {
        parts.push(blockToCRLF(add_block));
      }
      ++i;
    }
    let op = "join";
    var crlf = {
      "kind": "expr_operation",
      "name": op + "[*]", /*"[" + parts.length + "]",*/
      "args": parts
    };
    return crlf;
  };

  //CRLF['text_append'] = function (block) { ... };

  CRLF['text_length'] = function (block) {
    let op = "length";
    var crlf = {
      "kind": "expr_operation",
      "type": "Number",
      "name": op + "[1]",
      "args": [
        blockToCRLF(block.getInputTargetBlock('VALUE'))
      ]
    };
    return crlf;
  };

  CRLF['text_isEmpty'] = function (block) {
    var crlf = {
      "kind": "expr_operation",
      "type": "Boolean",
      "name": "EQ[2]",
      "args": [
        {
          "kind": "expr_operation",
          "type": "Number",
          "name": "length[1]",
          "args": [
            blockToCRLF(block.getInputTargetBlock('VALUE'))
          ]
        },
        {
          "kind": "expr_literal",
          "type": "Number",
          "const": 0
        }
      ]
    };
    return crlf;
  };

  //CRLF['text_indexOf'] = function (block) { ... };

  CRLF['text_charAt'] = function (block) {
    let op = fieldToString(block.getField('WHERE'));
    var crlf = {
      "kind": "expr_operation",
      "type": "Number"
    };
    // FIXME: check for <mutation at="true"> instead?
    if ((op == 'FROM_START') || (op == 'FROM_END')) {
      crlf["name"] = "charAt_" + op + "[2]";
      crlf["args"] = [
        blockToCRLF(block.getInputTargetBlock('VALUE')),
        blockToCRLF(block.getInputTargetBlock('AT'))
      ];
    } else {
      crlf["name"] = "charAt_" + op + "[1]";
      crlf["args"] = [
        blockToCRLF(block.getInputTargetBlock('VALUE'))
      ];
    }
    return crlf;
  };

  //CRLF['text_getSubstring'] = function (block) { ... };

  //CRLF['text_changeCase'] = function (block) { ... };

  //CRLF['text_trim'] = function (block) { ... };

  CRLF['text_print'] = function (block) {
    var crlf = {
      "kind": "log_print",
      "level": 1,
      "value": blockToCRLF(block.getInputTargetBlock('TEXT'))
    };
    return crlf;
  };

  //CRLF['text_prompt_ext'] = function (block) { ... };

  //CRLF['text_match_regex'] = function (block) { ... };

  /*
   * Logic
   */

  CRLF['controls_if'] = function (block) {
    var cases = [];
    var i = 0;
    while (i < 99) {  // FIXME: is there a limit to the number of clauses?
      var if_block = block.getInputTargetBlock('IF' + i);
      var do_block = block.getInputTargetBlock('DO' + i);
      if (if_block) {
        cases.push({
          "if": blockToCRLF(if_block),
          "do": stackToCRLF(do_block)
        });
      }
      ++i;
    }
    let else_block = block.getInputTargetBlock('ELSE');
    if (else_block) {
      cases.push({
        "if": { "kind": "expr_literal", "type": "Boolean", "const": "true" },
        "do": stackToCRLF(else_block)
      });
    }
    var crlf = {
      "kind": "conditional",
      "args": cases
    };
    return crlf;
  };

  CRLF['logic_compare'] = function (block) {
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

  CRLF['logic_negate'] = function (block) {
    let op = "NOT";
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

  CRLF['logic_boolean'] = function (block) {
    let bool = fieldToString(block.getField('BOOL'));
    var crlf = {
      "kind": "expr_literal",
      "type": "Boolean",
      "const": (bool == 'TRUE')
    };
    return crlf;
  };

  CRLF['logic_null'] = function (block) {
    var crlf = {
      "kind": "expr_literal",
      "type": "Null",
      "const": null
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

  /*
   * List (Array)
   */

  CRLF['lists_create_with'] = function (block) {
    var parts = [];
    var i = 0;
    while (i < 99) {  // FIXME: is there a limit to the number of clauses?
      var add_block = block.getInputTargetBlock('ADD' + i);
      if (add_block) {
        parts.push(blockToCRLF(add_block));
      }
      ++i;
    }
    let op = "list";
    var crlf = {
      "kind": "expr_operation",
      "name": op + "[*]", /*"[" + parts.length + "]",*/
      "args": parts
    };
    return crlf;
  };

  CRLF['lists_length'] = function (block) {
    let op = "length";
    var crlf = {
      "kind": "expr_operation",
      "type": "Number",
      "name": op + "[1]",
      "args": [
        blockToCRLF(block.getInputTargetBlock('VALUE'))
      ]
    };
    return crlf;
  };

  CRLF['lists_isEmpty'] = function (block) {
    var crlf = {
      "kind": "expr_operation",
      "type": "Boolean",
      "name": "EQ[2]",
      "args": [
        {
          "kind": "expr_operation",
          "type": "Number",
          "name": "length[1]",
          "args": [
            blockToCRLF(block.getInputTargetBlock('VALUE'))
          ]
        },
        {
          "kind": "expr_literal",
          "type": "Number",
          "const": 0
        }
      ]
    };
    return crlf;
  };

  /*
   * Device
   */

  //CRLF['device_set'] = function (block) { ... };

  //CRLF['device_event'] = function (block) { ... };

  CRLF['device_now'] = function (block) {
    var crlf = {
      "kind": "device_now"
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

  /*
   * support routines
   */

  // chardump
  let chardump = function chardump(string, offset, count, separator, prefix, suffix, replace) {
    offset = offset || 0;
    count = count || string.length;
    separator = separator || '';
    prefix = prefix || '';
    suffix = suffix || '';
    replace = replace || function (code) {
        if ((code < 0x20)
        || ((0x7F <= code) && (code < 0xA0))) {  // replace control codes
          return 0xB7;  // center-dot
        }
        return code;
    }
    var output = '';
    var index = 0;
    while (index < count) {
      if ((offset + index) < string.length) {
        if (index > 0) {
          output += separator;
        }
        output += prefix;
        var code = string.codePointAt(offset + index);
        output += String.fromCodePoint(replace(code));
        output += suffix;
      }
      ++index;
    }
    return output;
  };
  // hexdump
  let hexdump = function hexdump(string, offset, count, separator, prefix, suffix) {
    offset = offset || 0;
    count = count || string.length;
    separator = separator || ' ';
    prefix = prefix || '';
    suffix = suffix || '';
    var output = '';
    var index = 0;
    while (index < count) {
      if ((offset + index) < string.length) {
        if (index > 0) {
          output += separator;
        }
        output += prefix;
        var hex = string.codePointAt(offset + index).toString(16);
        if (hex.length < 2) {
          output += '0';
        }
        output += hex;
        output += suffix;
      }
      ++index;
    }
    return output;
  };
  let BOSE = {  // Binary Octet-Stream Encoding
    memo_properties: true,  // option to memoize property names
    memo__kind: true,  // option to memoize "kind" property values
    memo__type: true,  // option to memoize "type" property values
    memo__name: true,  // option to memoize "name" property values
/*
    memo_properties: false,  // option to memoize property names
    memo__kind: false,  // option to memoize "kind" property values
    memo__type: false,  // option to memoize "type" property values
    memo__name: false,  // option to memoize "name" property values
*/
    memo_no_wrap: true,  // option to prevent memo index wrap-around
    memo_index: 0,  // index of next memo table entry to use
    memo_table: [],  // table of memoized Strings
    memo_full: false,  // index wrap-around flag
    memo_clear: function memo_clear() {  // reset memo table (each top-level object must start fresh)
      BOSE.memo_index = 0;
      BOSE.memo_table = [];
      BOSE.memo_full = false;
    },
    memo_lookup: function memo_lookup(string) {  // return the memo index matching this `string`
      return BOSE.memo_table.indexOf(string);  // -1 = not found.
    },
    memo_add: function memo_add(string) {  // add `string` to memo table, return the index where it was stored.
      let index = BOSE.memo_index++;
      if (BOSE.memo_index > 0xFF) {
        BOSE.memo_index = 0;  // wrap-around memo index
        if (BOSE.memo_no_wrap) {
          BOSE.memo_full = true;
        }
      }
      BOSE.memo_table[index] = string;
      return index;
    }
  };
  let integerToBOSE = function integerToBOSE(n) {
    n = 0 + n;  // force number representation
    var output = "";
    if ((-64 <= n) && (n <= 126)) {  // small integer range
      output += String.fromCodePoint(0x80 + n);
    } else {
      if (n < 0) {
        output += String.fromCodePoint(0x18);  // negative integer, 0 padding
      } else {
        output += String.fromCodePoint(0x10);  // positive integer, 0 padding
      }
      if ((-32768 <= n) && (n <= 65535)) {  // 16-bit range
        output += String.fromCodePoint(0x82);  // 2-byte size
        n >>>= 0;  // force 32-bit integer representation
        output += String.fromCodePoint(n & 0xFF);  // LSB
        n >>= 8;
        output += String.fromCodePoint(n & 0xFF);  // MSB
      } else {
        output += String.fromCodePoint(0x84);  // 4-byte size
        n >>>= 0;  // force 32-bit integer representation
        output += String.fromCodePoint(n & 0xFF);  // LSB
        n >>= 8;
        output += String.fromCodePoint(n & 0xFF);
        n >>= 8;
        output += String.fromCodePoint(n & 0xFF);
        n >>= 8;
        output += String.fromCodePoint(n & 0xFF);  // MSB
      }
    }
    return output;
  };
  let stringToBOSE = function stringToBOSE(s, memoize) {
    memoize = memoize || false;
    var memo = -1;
    let is7bit = function is7bit(s) {
      var i = 0;
      while (i < s.length) {
        var c = s.charCodeAt(i);  // grab UTF-16 character
        if (c > 0x7F) {
          return false;  // not 7-bit ASCII
        }
        ++i;
      }
      return true;  // only 7-bit ASCII (safe UTF-8)
    };
    s = "" + s;  // force string representation
    var output = "";
    if (s.length == 0) {
      output += String.fromCodePoint(0x0F);  // empty string
    } else if (s.charCodeAt(0) == 0x10) {  // capability starts with DLE (^P)
      output += String.fromCodePoint(0x08);  // raw octet data
      output += integerToBOSE(s.length);
      var i = 0;
      while (i < s.length) {
        var c = s.charCodeAt(i);  // grab UTF-16 character
        output += String.fromCodePoint(c) & 0xFF;  // octet (byte) data
        ++i;
      }
    } else if (memoize && ((memo = BOSE.memo_lookup(s)) >= 0)) {
      output += String.fromCodePoint(0x09);  // memo reference
      output += String.fromCodePoint(memo);
    } else if (is7bit(s)) {
      if (memoize && !BOSE.memo_full) {
        BOSE.memo_add(s);
        output += String.fromCodePoint(0x0B);  // UTF-8 String (+ memoize)
      } else {
        output += String.fromCodePoint(0x0A);  // UTF-8 String
      }
      output += integerToBOSE(s.length);
      var i = 0;
      while (i < s.length) {
        var c = s.charCodeAt(i);  // grab UTF-16 character
        output += String.fromCodePoint(c);  // 7-bit codepoint
        ++i;
      }
    } else {
      if (memoize && !BOSE.memo_full) {
        BOSE.memo_add(s);
        output += String.fromCodePoint(0x0D);  // UTF-16 String (+ memoize)
      } else {
        output += String.fromCodePoint(0x0C);  // UTF-16 String
      }
      output += integerToBOSE(s.length * 2);
      var i = 0;
      while (i < s.length) {
        var c = s.charCodeAt(i);  // grab UTF-16 character
        output += String.fromCodePoint(c >>> 8);  // MSB
        output += String.fromCodePoint(c & 0xFF);  // LSB
        ++i;
      }
    }
    return output;
  };
  let valueToBOSE = function valueToBOSE(value, memoize) {
    memoize = memoize || false;
    var output = "";
    if (value === null) {
      output += String.fromCodePoint(0xFF);  // null
    } else if (value === true) {
      output += String.fromCodePoint(0x00);  // true
    } else if (value === false) {
      output += String.fromCodePoint(0x01);  // false
    } else if (typeof value === 'number') {
      // FIXME: all numbers are treated as 32-bit integers, for now...
      output += integerToBOSE(value);
    } else if (typeof value === 'string') {
      output += stringToBOSE(value, memoize);
    } else if (Array.isArray(value)) {
      if (value.length == 0) {
        output += String.fromCodePoint(0x02);  // empty array
      } else {
        output += String.fromCodePoint(0x06);  // counted array
        var content = integerToBOSE(value.length);  // count field
        value.forEach(
          function (item, index, array) {
            content += valueToBOSE(item);
          }
        );
        output += integerToBOSE(content.length);  // size field
        output += content;
      }
    } else if (typeof value === 'object') {
      let keys = Object.getOwnPropertyNames(value);
      if (keys.length == 0) {
        output += String.fromCodePoint(0x03);  // empty object
      } else {
        output += String.fromCodePoint(0x07);  // counted object
        var content = integerToBOSE(keys.length);  // count field
        keys.forEach(
          function (key, index, array) {
            content += stringToBOSE(key, BOSE.memo_properties);
            memoize = (BOSE.memo__kind && (key === 'kind'))
                   || (BOSE.memo__type && (key === 'type'))
                   || (BOSE.memo__name && (key === 'name'));
            content += valueToBOSE(value[key], memoize);
          }
        );
        output += integerToBOSE(content.length);  // size field
        output += content;
      }
    } else {  // substitute `null` for unsupported value type
      // FIXME: print WARNING to console?
      output += String.fromCodePoint(0xFF);
    }
    return output;
  };
  let dumpCRLF = function dumpCRLF(crlf) {
    BOSE.memo_clear();
    let bose = valueToBOSE(crlf);
    var text = '';
    var offset = 0;
    while (offset < bose.length) {
      var os = ('00000000' + offset.toString(16)).slice(-8);
      text += os;
      text += '  ';
      var hd = hexdump(bose, offset, 16);
      hd = (hd + '                                                ').slice(0, 47);
      text += hd;
      text += '  |';
      var cd = chardump(bose, offset, 16);
      cd = (cd + '                ').slice(0, 16);
      text += cd;
      text += '|\n';
      offset += 16;
    }
    return text;
  };
  let dataCRLF = function dataCRLF(crlf) {
    BOSE.memo_clear();
    let bose = valueToBOSE(crlf);
    var text = 'uint8_t bose[] = {\n';
    var offset = 0;
    while (offset < bose.length) {
      text += '    ';
      var hd = hexdump(bose, offset, 16, ' ', '0x', ',');
      text += hd;
      text += '  // ';
      var cd = chardump(bose, offset, 16);
      text += cd;
      text += '\n';
      offset += 16;
    }
    text += '};\n';
    //console.log("BOSE.memo_index = ", BOSE.memo_index);
    //console.log("BOSE.memo_table = ", BOSE.memo_table);
    //console.log("BOSE.memo_full = ", BOSE.memo_full);
    return text;
  };

  // exports
  self.chardump = chardump;
  self.hexdump = hexdump;
  self.valueToBOSE = valueToBOSE;
  self.dumpCRLF = dumpCRLF;
  self.dataCRLF = dataCRLF;
  self.workspaceToCRLF = workspaceToCRLF;
  return self;
})({});
