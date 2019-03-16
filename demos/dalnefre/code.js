'use strict';

var DAL = (function (self) {

  let ignore = function noop() { return ignore; };  // no operation (callable)
  let log = (console && console.log) || ignore;  // default error log
  let show = alert && (_ => alert(_)) || ignore;  // synchronous message dialog
  let fail = function fail(e) { self.log('FAIL!', e); self.show('FAIL! ' + e); };  // default error handler
  let trace = log;
  let xtrace = ignore;
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
          trace("send["+options.eventLimit+"]", message);
          invokeLater(() => {
            trace("deliver["+options.eventLimit+"]", message);
            if (options.eventLimit >= 0) {
              --options.eventLimit;
              try {
                trace("context["+options.eventLimit+"]", context);
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

  let deviceArea = document.getElementById('deviceArea');
  let deviceCanvas = document.getElementById('deviceCanvas');
  let deviceContext = deviceCanvas.getContext('2d');
  let positionDevice = function positionDevice() {
    var areaDim = elementDimensions(deviceArea);
    var canvasDim = elementDimensions(deviceCanvas);
    canvasDim.x = areaDim.x + 1;  // adjust for border
    canvasDim.y = areaDim.y + 1;  // adjust for border
    positionElement(deviceCanvas, canvasDim);
  };
  let drawDevice = (_ => {
    let ctx = deviceContext;
    let canvas_w = deviceCanvas.width;
    let canvas_h = deviceCanvas.height;
    let two_pi = Math.PI * 2;
    let half_pi = Math.PI / 2;
    let led_radius = 7;
    let drawLED = function drawLED(led, on) {
      ctx.beginPath();
      ctx.arc(led.x, led.y, led_radius, 0, two_pi);
      ctx.fillStyle = (on ? led.style.on : led.style.off);
      ctx.fill();
    }
    let ledRed = { on: '#f30', off: '#630' };
    let ledYellow = { on: '#ee0', off: '#550' };
    let ledGreen = { on: '#0e0', off: '#050' };
    let ledBlue = { on: '#4af', off: '#446' };
    let ledOn = function ledOn(on) { drawLED(this, on); }
    let led_0 = { on: ledOn, x: 32, y: 26, style: ledGreen };
    let led_1 = { on: ledOn, x: canvas_w / 2, y: 26, style: ledYellow };
    let led_2 = { on: ledOn, x: canvas_w - 32, y: 26, style: ledRed };
/*
    let led_3 = { on: ledOn, x: 32, y: 55, style: ledGreen };
    let led_4 = { on: ledOn, x: canvas_w / 2, y: 55, style: ledYellow };
    let led_5 = { on: ledOn, x: canvas_w - 32, y: 55, style: ledRed };
*/
    return function drawDevice() {
      ctx.clearRect(0, 0, canvas_w, canvas_h);
      led_0.on(true);
      led_1.on(true);
      led_2.on(true);
/*
      led_3.on(false);
      led_4.on(false);
      led_5.on(false);
*/
    };
  })();

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
    positionDevice();
    drawDevice();
  };

  // exports
  self.log = log;
  self.show = show;
  self.fail = fail;
  self.tart = tart;
  self.init = onload;
  self.displaySource = displaySource;
  self.executeCode = executeJavaScript;
  self.drawDevice = drawDevice;
  self.varPattern = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;
  return self;
})({});

//window.addEventListener('load', DAL.init);
DAL.init();
