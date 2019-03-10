'use strict';

var DAL = (function (self) {

  let ignore = function noop() { return ignore; };  // no operation (callable)
  let log = (console && console.log) || ignore;  // default error log
  let show = alert && (_ => alert(_)) || ignore;  // synchronous message dialog
  let fail = function fail(e) { self.log('FAIL!', e); self.show('FAIL! ' + e); };  // default error handler
  let trace = ignore; //log;
  let invokeLater = (typeof setImmediate === "function")
    ? function invokeLater(callback) { setImmediate(callback); }
    : function invokeLater(callback) { setTimeout(callback, 0); };

  let tart = function config(options) {
    options = options || {};
    var fail = options.fail || self.fail || ignore;
    options.actorLimit = (options.actorLimit >= 0) ? options.actorLimit : Infinity;
    options.eventLimit = (options.eventLimit >= 0) ? options.eventLimit : Infinity;
    var sponsor = function create(behavior) {
      trace("create["+options.actorLimit+"]", behavior);
      var actor = ignore;
      if (options.actorLimit >= 0) {
        --options.actorLimit;
        actor = function send(message) {
//          trace("send["+options.eventLimit+"]", message);
          invokeLater(() => {
            trace("deliver["+options.eventLimit+"]", message);
            if (options.eventLimit >= 0) {
              --options.eventLimit;
              try {
                context.behavior(message);
              } catch (exception) {
                fail(exception);
              };
            } else {
              fail('Event limit exceeded');
            }
          });
        };
        var context = {
          self: actor,
          behavior: behavior,
          sponsor: sponsor
        };
      } else {
        fail('Actor limit exceeded');
      }
      return actor;
    };
    return sponsor;
  };

  let displayArea = document.getElementById('displayArea');
  let source = {  // source elements by language
    "JavaScript": document.getElementById('sourceJavaScript'),
    "Python": document.getElementById('sourcePython'),
    "XML": document.getElementById('sourceXML'),
    "Blocks": document.getElementById('sourceBlocks')
  };
  let sourceBlocks = source['Blocks'];
  var sourceElement = sourceBlocks;  // the currently displayed source element

  let elementDimensions = function elementDimensions(e) {  // get absolute coordinates and dimensions of an HTML element
    var dim = { x: 0, y: 0, w: e.offsetWidth, h: e.offsetHeight };
    while (e) {
      dim.x += e.offsetLeft;
      dim.y += e.offsetTop;
      e = e.offsetParent;
    };
    return dim;
  };
  let positionElement = function positionElement(e, dim) {  // set absolute coordinates and dimensions of an HTML element
    e.style.left = dim.x + 'px';
    e.style.top = dim.y + 'px';
    e.style.width = dim.w + 'px';
    e.style.height = dim.h + 'px';
    // Height and width need to be set, read back, then set again to compensate for scrollbars.
    e.style.width = (2 * dim.w - e.offsetWidth) + 'px';
    e.style.height = (2 * dim.h - e.offsetHeight) + 'px';
  };
  let resizeDisplay = function resizeDisplay() {
    positionElement(sourceElement, elementDimensions(displayArea));
    if (sourceElement === sourceBlocks) {
      Blockly.svgResize(self.blocklyWorkspace);
    }
  };
  let generateJavaScript = function generateJavaScript() {
    // Blockly.JavaScript.addReservedWords('sponsor');  // protect reserved word(s)
    return Blockly.JavaScript.workspaceToCode(self.blocklyWorkspace);
  };
  let displaySource = function displaySource(lang) {
    // de-select and hide current source
    window.blur();
    sourceElement.style.visibility = 'hidden';
    // select and display new source
    sourceElement = source[lang] || sourceBlocks;  // default language: Blocks
    if (lang === 'JavaScript') {
      sourceElement.textContent = generateJavaScript();
    }
    if (lang === 'Python') {
      let code = Blockly.Python.workspaceToCode(self.blocklyWorkspace);
      sourceElement.textContent = code;
    }
    if (lang === 'XML') {
      let dom = Blockly.Xml.workspaceToDom(self.blocklyWorkspace);
      sourceElement.value = Blockly.Xml.domToPrettyText(dom);
      sourceElement.focus();
    }
    sourceElement.style.visibility = 'visible';
    resizeDisplay();
  };
  let executeJavaScript = function executeJavaScript(fail) {
    fail = fail || self.fail;  // error handler
    try {
      if (!self.blocklyWorkspace.allInputsFilled()) {
        throw "program incomplete";
      }
      var code = generateJavaScript();
      eval(code);
    } catch(e) {
      fail(e);
    }
  };

  let onload = function (e) {
    self.blocklyWorkspace = Blockly.inject(sourceBlocks, {
      media: '../../media/',
//      media : 'https://blockly-demo.appspot.com/static/media/', 
      collapse : true, 
      comments : true, 
      disable : true, 
      maxBlocks : Infinity, 
      trashcan : true, 
      horizontalLayout : false, 
      toolboxPosition : 'start', 
      css : true, 
      rtl : false, 
      scrollbars : true, 
      sounds : true, 
      oneBasedIndex : true,
      toolbox: document.getElementById('toolbox')
    });
    displaySource('Blocks');
    window.addEventListener('resize', resizeDisplay, false);
  };

  // exports
  self.log = log;
  self.show = show;
  self.fail = fail;
  self.tart = tart;
  self.init = onload;
  self.displaySource = displaySource;
  self.executeCode = executeJavaScript;
  return self;
})({});

//window.addEventListener('load', DAL.init);
DAL.init();
