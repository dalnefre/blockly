//
// BART/CRLF representation for actor programs
//
'use strict';

var BART = (function (self) {
  var CRLF = {};
  
  let toCRLF = function toCRLF(block) {
    var convert = CRLF[block.getStyleName()];
    // [FIXME: catch unknown style!]
    return convert(block);
  };

  let asString = function asString(field, default) {
    let value = field.getText();
    if (typeof value === 'string') {
      return value;
    } else {
      return default;
    }
  };

  let asNumber = function asNumber(field, default) {
    let value = field.getText();
    if (typeof value === 'string') {
      return (1 * value);
    } else {
      return default;
    }
  };

  CRLF['actor_sponsor'] = function (block) {
    var crlf = {
      "kind": "actor_sponsor",
      "actors": asNumber(block.getField('ACTORS')),
      "events": asNumber(block.getField('EVENTS')),
      "script": [
        // Blockly.JavaScript.statementToCode(block, 'SCRIPT');
      ]
    };
    return crlf;
  };

  CRLF['actor_send'] = function (block) {
    var crlf = {
      "kind": "actor_send",
      "message": toCRLF(block.getInputTargetBlock('MESSAGE')),  /* <dictionary> */
      "actor":  toCRLF(block.getInputTargetBlock('ACTOR'))  /* <address> */
    };
    return crlf;
  };

  // exports
  self.toCRLF = toCRLF;
  return self;
})({});
