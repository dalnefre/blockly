//
// BART/CRLF representation for actor programs
//
'use strict';

var BART = (function (self) {
  var CRLF = {};

  let fieldToString = function fieldToString(field, missing) {
    if (field) {
      let value = field.getText();
      if (typeof value === 'string') {
        return value;
      }
    }
    return missing;
  };

  let fieldToNumber = function fieldToNumber(field, missing) {
    if (field) {
      let value = field.getText();
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
        if (hex.length > 1) {
          output += hex;
        } else {
          output += '0' + hex;
        }
        output += suffix;
      }
      ++index;
    }
    return output;
  };
  // Binary Octet-Stream Encoding
  let valueToBOSE = function valueToBOSE(value) {
    let integerToBOSE = function integerToBOSE(n) {
      n = 0 + n;  // force number representation
      var output = "";
      if ((n >= -64) && (n <= 126)) {  // small integer range
        output += String.fromCodePoint(0x80 + n);
      } else {
        if (n < 0) {
          output += String.fromCodePoint(0x18);  // negative integer, 0 padding
        } else {
          output += String.fromCodePoint(0x10);  // positive integer, 0 padding
        }
        if ((n >= -32768) && (n <= 32767)) {  // 16-bit range
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
    let stringToBOSE = function stringToBOSE(s) {
      let is7bit = function is7bit(s) {
        var ok = true;
        var i = 0;
        while (i < s.length) {
          var c = s.charCodeAt(i);  // grab UTF-16 character
          if (c > 0x7F) {
            ok = false;  // not 7-bit ASCII
            break;
          }
          ++i;
        }
        return ok;
      };
      s = "" + s;  // force string representation
      var output = "";
      if (s.length == 0) {
        output += String.fromCodePoint(0x0F);  // empty string
      } else if (is7bit(s)) {
        output += String.fromCodePoint(0x0A);  // UTF-8 String
        output += integerToBOSE(s.length);
        var i = 0;
        while (i < s.length) {
          var c = s.charCodeAt(i);  // grab UTF-16 character
          output += String.fromCodePoint(c);  // 7-bit codepoint
          ++i;
        }
      } else {
        output += String.fromCodePoint(0x0C);  // UTF-16 String
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
      output += stringToBOSE(value);
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
            content += stringToBOSE(key);
            content += valueToBOSE(value[key]);
          }
        );
        output += integerToBOSE(content.length);  // size field
        output += content;
      }
    } else {  // substitute `null` for unsupported value type
      output += String.fromCodePoint(0xFF);
    }
    return output;
  };
  let dumpCRLF = function dumpCRLF(crlf) {
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
    let bose = valueToBOSE(crlf);
    var text = 'data = {\n';
    var offset = 0;
    while (offset < bose.length) {
      text += '  ';
      var hd = hexdump(bose, offset, 16, ' ', '0x', ',');
      text += hd;
      text += '  // ';
      var cd = chardump(bose, offset, 16);
      text += cd;
      text += '\n';
      offset += 16;
    }
    text += '};\n';
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
