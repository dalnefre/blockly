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
    return "ERROR: unknown block '" + block.type + "'";
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
      "actor":  blockToCRLF(block.getInputTargetBlock('ACTOR'))  /* <address> */
    };
    return crlf;
  };

  // exports
  self.workspaceToCRLF = workspaceToCRLF;
  return self;
})({});
