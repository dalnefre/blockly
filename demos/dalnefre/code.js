'use strict';

var DAL = (function (self) {

  let ignore = function noop() { return ignore; };  // no operation (callable)
  let log = (console && console.log) || ignore;  // default error log
  let show = alert && (_ => alert(_)) || ignore;  // synchronous message dialog
  let fail = function fail(e) { self.log('FAIL!', e); self.show('FAIL! ' + e); };  // default error handler
  let trace = log;
  let xtrace = ignore;
  let breakpoint = function breakpoint(data) {
    trace("--BREAKPOINT--", data);
  };
  let invokeLater = (typeof setImmediate === "function")
    ? function invokeLater(callback) { setImmediate(callback); }
    : function invokeLater(callback) { setTimeout(callback, 0); };

  let snapshot = function snapshot(o) {  // snapshot mutable state
    o = Object.assign({}, o);
    if (o._) {
      o._ = Object.freeze(Object.assign({}, o._));
    }
    return Object.freeze(o);
  };
  var configCount = 0;
  let tart = function config(options) {
    let configId = ++configCount;
    options = options || {};
    var fail = options.fail || self.fail || ignore;
    options.actorLimit = (options.actorLimit >= 0) ? options.actorLimit : Infinity;
    options.eventLimit = (options.eventLimit >= 0) ? options.eventLimit : Infinity;
    var sponsor = function create(behavior) {
      let actorId = options.actorLimit;
      trace("create["+actorId+"]", behavior);
      var actor = ignore;
      if (options.actorLimit >= 0) {
        --options.actorLimit;
        actor = function send(message) {
          let eventId = options.eventLimit;
          trace("send["+eventId+"]", message);
          invokeLater(() => {
            trace("deliver["+options.eventLimit+"]", message);
            if (options.eventLimit >= 0) {
              --options.eventLimit;
              try {
                trace("context["+eventId+"]", snapshot(context));
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
          id: configId + '.' + actorId,
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
    positionDevice();
  };
  let generateJavaScript = function generateJavaScript() {
    Blockly.JavaScript.addReservedWords('DAL', 'code');  // protect reserved word(s)
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
    if (lang === 'XML') {
      let dom = Blockly.Xml.workspaceToDom(self.blocklyWorkspace);
      sourceElement.value = Blockly.Xml.domToPrettyText(dom);
      sourceElement.focus();
    }
    sourceElement.style.visibility = 'visible';
    resizeDisplay();
  };
  let loadXmlFile = document.getElementById('loadXmlFile');
  let loadXmlSource = function loadXmlSource() {
    let ok = (loadXmlFile.files.length == 1); // && confirm('Replace program with file contents?');
    if (ok) {
      let file = loadXmlFile.files[0];
      let reader = new FileReader();
      reader.addEventListener('load', function (event) {
        try {
          let xml = event.target.result;
          let dom = Blockly.Xml.textToDom(xml);
          Blockly.Xml.domToWorkspace(dom, self.blocklyWorkspace);
        } catch (e) {
          show('Failed to load XML source.');
        }
      });
      reader.readAsText(file);
    }
    // Clear this so that the change event still fires even if the
    // same file is chosen again. If the user re-imports a file, we
    // want to reload the workspace with its contents.
    loadXmlFile.value = null;
  };
  let createAndDownloadFile = function createAndDownloadFile(contents, filename, mimetype) {
    var data = new Blob([contents], {type: mimetype});
    var clickEvent = new MouseEvent("click", {
      "view": window,
      "bubbles": true,
      "cancelable": false
    });
    var a = document.createElement('a');
    a.href = window.URL.createObjectURL(data);
    a.download = filename;
    a.textContent = 'Download file!';
    a.dispatchEvent(clickEvent);
  };
  let saveXmlButton = document.getElementById('saveXmlButton');
  let saveXmlSource = function saveXmlSource() {
    let filename = prompt('Save XML source to file:', 'dalnefre.xml');
    if (filename) {
      try {
        let dom = Blockly.Xml.workspaceToDom(self.blocklyWorkspace);
        let xml = Blockly.Xml.domToPrettyText(dom);
        createAndDownloadFile(xml, filename, 'text/xml');
      } catch (e) {
        show('Failed to save XML source.');
      }
    }
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
  let drawDevice = (() => {
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
    let led = [
      { on: ledOn, x: 32, y: 26, style: ledGreen },
      { on: ledOn, x: canvas_w / 2, y: 26, style: ledYellow },
      { on: ledOn, x: canvas_w - 32, y: 26, style: ledRed },
      { on: ledOn, x: 32, y: 55, style: ledGreen },
      { on: ledOn, x: canvas_w / 2, y: 55, style: ledYellow },
      { on: ledOn, x: canvas_w - 32, y: 55, style: ledRed },
    ];
    self.setDevicePin = function setPin(pin, on) {
      led[pin].on(on);
    };
    return function drawDevice() {
      ctx.clearRect(0, 0, canvas_w, canvas_h);
      led[0].on(false);
      led[1].on(false);
      led[2].on(false);
/*
      led[3].on(true);
      led[4].on(true);
      led[5].on(true);
*/
    };
  })();
  var eventHandler = {};
  let deviceEvent = function deviceEvent(name) {  // trigger named device event
    let handler = eventHandler[name];
    trace(name, handler);
    if (handler) {
      handler({ "name": name });  // FIXME: should we freeze the message?
    }
  };

  let onload = function (e) {
    Blockly.BlockSvg.START_HAT = true;
    self.blocklyWorkspace = Blockly.inject(sourceBlocks, {
      media: '../../media/',
//      media : 'https://blockly-demo.appspot.com/static/media/', 
      collapse : true, 
      comments : true, 
      disable : true, 
      maxBlocks : Infinity, 
      trashcan : true, 
      zoom: {
        controls: true,
        wheel: false,
        startScale: 1.0,
        maxScale: 3,
        minScale: 0.3,
        scaleSpeed: 1.2
      },
      horizontalLayout : false, 
      toolboxPosition : 'start', 
      css : true, 
      rtl : false, 
      scrollbars : true, 
      grid: {
        spacing: 16,
        length: 1,
        colour: '#0cc',
        snap: true
      },
      sounds : true, 
      oneBasedIndex : true,
      toolbox: document.getElementById('toolbox')
    });
//    self.blocklyWorkspace.addChangeListener(Blockly.Events.disableOrphans);
    displaySource('Blocks');
    window.addEventListener('resize', resizeDisplay, false);
    positionDevice();
    drawDevice();
  };

  // exports
  self.log = log;
  self.show = show;
  self.breakpoint = breakpoint;
  self.fail = fail;
  self.tart = tart;
  self.init = onload;
  self.displaySource = displaySource;
  self.loadXml = loadXmlSource;
  self.saveXml = saveXmlSource;
  self.executeCode = executeJavaScript;
  self.drawDevice = drawDevice;
  self.deviceEvent = deviceEvent;
  self.eventHandler = eventHandler;
  self.varPattern = /^[a-zA-Z_$][0-9a-zA-Z_$]*$/;
  return self;
})({});

//window.addEventListener('load', DAL.init);
DAL.init();
