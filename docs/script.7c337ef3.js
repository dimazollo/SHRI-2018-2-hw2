// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/css-loader.js":[function(require,module,exports) {
var bundle = require('./bundle-url');

function updateLink(link) {
  var newLink = link.cloneNode();

  newLink.onload = function () {
    link.remove();
  };

  newLink.href = link.href.split('?')[0] + '?' + Date.now();
  link.parentNode.insertBefore(newLink, link.nextSibling);
}

var cssTimeout = null;

function reloadCSS() {
  if (cssTimeout) {
    return;
  }

  cssTimeout = setTimeout(function () {
    var links = document.querySelectorAll('link[rel="stylesheet"]');

    for (var i = 0; i < links.length; i++) {
      if (bundle.getBaseURL(links[i].href) === bundle.getBundleURL()) {
        updateLink(links[i]);
      }
    }

    cssTimeout = null;
  }, 50);
}

module.exports = reloadCSS;
},{"./bundle-url":"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"style/style.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"_css_loader":"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"script/Point.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Point =
/*#__PURE__*/
function () {
  function Point(_ref) {
    var x = _ref.x,
        y = _ref.y;

    _classCallCheck(this, Point);

    this.x = x;
    this.y = y;
  }

  _createClass(Point, [{
    key: "add",
    value: function add(_ref2) {
      var x = _ref2.x,
          y = _ref2.y;
      return new Point({
        x: this.x + x,
        y: this.y + y
      });
    }
  }, {
    key: "substract",
    value: function substract(_ref3) {
      var x = _ref3.x,
          y = _ref3.y;
      return new Point({
        x: this.x - x,
        y: this.y - y
      });
    }
  }, {
    key: "distanceTo",
    value: function distanceTo(_ref4) {
      var x = _ref4.x,
          y = _ref4.y;
      return Math.sqrt(Math.pow(this.x - x, 2) + Math.pow(this.y - y, 2));
    }
  }]);

  return Point;
}();

exports.default = Point;
},{}],"script/Pointer.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Point = _interopRequireDefault(require("./Point"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Pointer =
/*#__PURE__*/
function () {
  // TODO - maybe should use { offsetX, offsetY } together or instead
  function Pointer(_ref) {
    var x = _ref.x,
        y = _ref.y,
        pointerId = _ref.pointerId;

    _classCallCheck(this, Pointer);

    this.id = pointerId;
    this.startPoint = new _Point.default({
      x: x,
      y: y
    });
    this.prevPoint = new _Point.default({
      x: x,
      y: y
    });
    this.prevTs = Date.now();
  }

  _createClass(Pointer, [{
    key: "update",
    value: function update(_ref2) {
      var x = _ref2.x,
          y = _ref2.y,
          pointerId = _ref2.pointerId;

      if (this.id === pointerId) {
        this.prevPoint = new _Point.default({
          x: x,
          y: y
        });
        this.prevTs = Date.now();
      }
    }
  }]);

  return Pointer;
}();

exports.default = Pointer;
},{"./Point":"script/Point.js"}],"script/Gesture.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Pointer = _interopRequireDefault(require("./Pointer"));

var _Point = _interopRequireDefault(require("./Point"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Gesture =
/*#__PURE__*/
function () {
  function Gesture() {
    _classCallCheck(this, Gesture);

    this.pointers = [];
    this.translateParams = new _Point.default({
      x: 0,
      y: 0
    });
    this._scaleParams = 1.0;
    this._brightnessParams = 1.0;
    this.prevPinchDistance = null;
    this.prevRotateAngle = null;
  }

  _createClass(Gesture, [{
    key: "handlePointerEvent",
    value: function handlePointerEvent(event) {
      switch (event.type) {
        case 'pointerdown':
          this.handlePointerDown(event);
          break;

        case 'pointermove':
          this.handlePointerMove(event);
          break;

        case 'pointerup':
          this.handlePointerUp(event);
          break;

        case 'pointercancel':
          this.handlePointerCancel(event);
          break;
      }
    }
  }, {
    key: "handlePointerDown",
    value: function handlePointerDown(event) {
      if (this.pointers.filter(function (item) {
        return item.id === event.pointerId;
      }).length === 0) {
        this.pointers.push(new _Pointer.default(event));
      }
    }
  }, {
    key: "handlePointerMove",
    value: function handlePointerMove(event) {
      var currentPointer = this.getPointer(event);

      if (currentPointer == null) {
        // currentPointer.update(event);
        return;
      } else {
        if (this.pointers.length === 1) {
          var newPoint = new _Point.default(event);
          var delta = newPoint.substract(currentPointer.prevPoint);
          this.translateParams = this.translateParams.add(delta);
        } else if (this.pointers.length === 2) {
          var secondPointer = this.pointers.filter(function (pointer) {
            return pointer.id !== event.pointerId;
          })[0];
          this.handlePinch(currentPointer, secondPointer); // rotate

          this.handleRotate(this.pointers[0], this.pointers[1]);
        } // update relevant pointer with event coordinates


        currentPointer.update(event);
      }
    }
  }, {
    key: "handlePointerUp",
    value: function handlePointerUp(event) {
      this.releasePointer(event);
    }
  }, {
    key: "handlePointerCancel",
    value: function handlePointerCancel(event) {
      this.releasePointer(event);
    }
  }, {
    key: "releasePointer",
    value: function releasePointer(_ref) {
      var pointerId = _ref.pointerId;
      this.pointers = this.pointers.filter(function (pointer) {
        return pointer.id !== pointerId;
      });

      if (this.pointers.length < 2) {
        this.prevPinchDistance = null;
        this.prevRotateAngle = null;
      }
    }
  }, {
    key: "getPointer",
    value: function getPointer(_ref2) {
      var pointerId = _ref2.pointerId;
      var array = this.pointers.filter(function (pointer) {
        return pointer.id === pointerId;
      });

      if (array.length === 1) {
        return array[0];
      } else if (array.length < 1) {
        return null;
      } else if (array.length > 1) {
        throw new Error('unique pointer was registered twice');
      }
    }
  }, {
    key: "handlePinch",
    value: function handlePinch(currentPointer, secondPointer) {
      var newPinchDistance = currentPointer.prevPoint.distanceTo(secondPointer.prevPoint);

      if (this.prevPinchDistance) {
        var delta = newPinchDistance - this.prevPinchDistance;
        var initialWidth = 2560;
        var k = 5; // magic coefficient to make scale faster;

        var relativeSizeChange = k * delta / initialWidth;
        this.scaleParams += relativeSizeChange;
      } // update prevPinchDistance


      this.prevPinchDistance = newPinchDistance;
    }
  }, {
    key: "handleRotate",
    value: function handleRotate(currentPointer, secondPointer) {
      var vector = currentPointer.prevPoint.substract(secondPointer.prevPoint);
      var newRotateAngle = Math.atan2(vector.y, vector.x);

      if (this.prevRotateAngle) {
        var delta = newRotateAngle - this.prevRotateAngle;
        var k = 0.2; // magic coefficient to slow change of brightness

        var angleChange = k * delta;
        this.brightnessParams += angleChange;
      }

      this.prevRotateAngle = newRotateAngle;
    }
  }, {
    key: "scaleParams",
    get: function get() {
      return this._scaleParams;
    },
    set: function set(value) {
      if (value > 0.3 && value < 2) {
        this._scaleParams = value;
      }
    }
  }, {
    key: "brightnessParams",
    get: function get() {
      return this._brightnessParams;
    },
    set: function set(value) {
      if (value > 0.5 && value < 2) {
        this._brightnessParams = value;
      }
    }
  }]);

  return Gesture;
}();

exports.default = Gesture;
},{"./Pointer":"script/Pointer.js","./Point":"script/Point.js"}],"script/index.js":[function(require,module,exports) {
"use strict";

var _style = _interopRequireDefault(require("../style/style.css"));

var _Gesture = _interopRequireDefault(require("./Gesture"));

var _Point = _interopRequireDefault(require("./Point"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cameraContainer = document.querySelector('.camera-view__container');
var cameraImage = document.querySelector('.camera-view__image');
var bar = document.querySelector('.bar');
var scaleBlock = document.querySelector('#scale');
var brightnessBlock = document.querySelector('#brightness');
var gesture = new _Gesture.default(); // FAKE pointer for debugging

var myPointer = {
  id: 10000,
  startPoint: new _Point.default({
    x: 400,
    y: 250
  }),
  prevPoint: new _Point.default({
    x: 400,
    y: 250
  }),
  prevTs: Date.now()
}; // gesture.pointers.push(myPointer);

var initialImageWidth = cameraImage.offsetWidth;

function calcBarPosition() {
  var xTranslate = gesture.translateParams.x;
  var containerWidth = cameraContainer.offsetWidth;
  var position = ((initialImageWidth / 2 + xTranslate) / initialImageWidth * containerWidth - bar.style.width / 2) % containerWidth;

  if (position < 0) {
    return position + containerWidth;
  } else {
    return position;
  }
}

bar.style.left = calcBarPosition() + 'px';
cameraImage.addEventListener('pointerdown', function (event) {
  cameraImage.setPointerCapture(event.pointerId);
  gesture.handlePointerDown(event);
});
cameraImage.addEventListener('pointermove', function (event) {
  gesture.handlePointerMove(event);
  var translate = gesture.translateParams;
  cameraImage.style.backgroundPosition = "".concat(translate.x, "px ").concat(translate.y, "px");
  var scale = gesture.scaleParams;
  cameraImage.style.transform = "scale(".concat(scale, ")");
  var brightness = gesture.brightnessParams;
  cameraImage.style.filter = "brightness(".concat(brightness, ")");
  bar.style.left = calcBarPosition() + 'px';
  scaleBlock.textContent = Math.floor(scale * 100) + '%';
  brightnessBlock.textContent = Math.floor(brightness * 100) + '%';
});
cameraImage.addEventListener('pointerup', function (event) {
  gesture.handlePointerUp(event);
  cameraImage.releasePointerCapture(event.pointerId);
});
cameraImage.addEventListener('pointercancel', function (event) {
  gesture.handlePointerCancel(event);
  cameraImage.releasePointerCapture(event.pointerId);
});
},{"../style/style.css":"style/style.css","./Gesture":"script/Gesture.js","./Point":"script/Point.js"}],"../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51984" + '/');

  ws.onmessage = function (event) {
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      console.clear();
      data.assets.forEach(function (asset) {
        hmrApply(global.parcelRequire, asset);
      });
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          hmrAccept(global.parcelRequire, asset.id);
        }
      });
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAccept(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAccept(bundle.parent, id);
  }

  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAccept(global.parcelRequire, id);
  });
}
},{}]},{},["../../../.config/yarn/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script/index.js"], null)
//# sourceMappingURL=/script.7c337ef3.map