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
})({"constants.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var _a, _b;

exports.dotNumberKey = 'dotNumber';
exports.minNum = 0;
exports.maxNum = 5;
exports.defaultNum = 2;
exports.currency = document.querySelector('.currency');
exports.usedCurrenciesKey = 'usedCurrency';
exports.inputEl = exports.currency.querySelector('.input');
exports.getBtn = exports.currency.querySelector('.get');
exports.clearBtn = exports.currency.querySelector('.clear');
exports.resEl = exports.currency.querySelector('.result');
exports.fromEl = exports.currency.querySelector('.select-from');
exports.toEl = exports.currency.querySelector('.select-to');
exports.burger = exports.currency.querySelector('.menu');
exports.reverse = exports.currency.querySelector('.reverse');
exports.saveDefaultBtn = exports.currency.querySelector('.save-default');
exports.defaultFrom = exports.currency.querySelector('.default-from');
exports.defaultTo = exports.currency.querySelector('.default-to');
exports.saveDotBtn = exports.currency.querySelector('.save-dot-number');
exports.dotNumberInput = exports.currency.querySelector('.dot-number');
exports.addCurrencySelect = exports.currency.querySelector('.add-currency-select');
exports.saveAddCurrencyBtn = exports.currency.querySelector('.save-add-currency');
exports.setInitialCurrenciesBtn = exports.currency.querySelector('.set-initial-btn');
exports.isFromAttr = 'isFrom';
exports.isToAttr = 'isTo';
exports.apiGetAll = 'https://free.currencyconverterapi.com/api/v6/currencies';
exports.apiGetValue = 'https://free.currencyconverterapi.com/api/v5/convert';
exports.initialUsedCurrencies = [(_a = {
  id: 'PLN',
  currencyName: 'Polish Zloty',
  name: 'Polish Zloty'
}, _a[exports.isFromAttr] = true, _a), {
  id: 'EUR',
  currencyName: 'Euro',
  name: 'Euro'
}, {
  id: 'USD',
  currencyName: 'United States Dollar',
  name: 'United States Dollar'
}, (_b = {
  id: 'UAH',
  currencyName: 'Ukrainian Hryvnia',
  name: 'Ukrainian Hryvnia'
}, _b[exports.isToAttr] = true, _b), {
  id: 'RUB',
  currencyName: 'Russian Ruble',
  name: 'Russian Ruble'
}];
},{}],"notification.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

function initNotification() {
  if (typeof Notification === 'undefined') {
    return;
  }

  Notification.requestPermission(function (status) {
    console.log('Notification permission status:', status);
  });
}

exports.initNotification = initNotification;

function displayNotification(text) {
  if (Notification.permission == 'granted') {
    navigator.serviceWorker.getRegistration().then(function (reg) {
      reg.showNotification(text);
    });
  }
}

exports.displayNotification = displayNotification;
},{}],"helpers.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var constants_1 = require("./constants");

function getQuery(itemFrom, itemTo) {
  return constants_1.apiGetValue + "?q=" + itemFrom + "_" + itemTo + "&compact=y";
}

exports.getQuery = getQuery;

function clearSelectors() {
  constants_1.fromEl.innerHTML = '';
  constants_1.toEl.innerHTML = '';
  constants_1.defaultFrom.innerHTML = '';
  constants_1.defaultTo.innerHTML = '';
}

exports.clearSelectors = clearSelectors;

function clear() {
  constants_1.inputEl.value = '';
  constants_1.resEl.innerText = '';
  constants_1.inputEl.focus();
}

exports.clear = clear;

function getMountedOptions(data, settings) {
  var options = Object.keys(data).map(function (item) {
    return createOption(data[item], settings);
  }).sort(function (a, b) {
    return a.dataset.name < b.dataset.name ? -1 : 1;
  });
  var wrapper = document.createDocumentFragment();
  options.forEach(function (item) {
    return wrapper.appendChild(item);
  });
  return wrapper;
}

exports.getMountedOptions = getMountedOptions;

function createOption(item, settings) {
  var el = document.createElement('option');
  el.value = item.id;
  el.id = item.id;
  el.dataset.name = item.currencyName;

  if (settings.isShort) {
    el.innerText = item.id;
  } else {
    el.innerText = item.currencyName + " (" + item.id + ")";
  }

  if (item[settings.selectPosition]) {
    el.selected = true;
  } else {
    el.selected = false;
  }

  return el;
}

exports.createOption = createOption;
},{"./constants":"constants.ts"}],"index.ts":[function(require,module,exports) {
"use strict";

exports.__esModule = true;

var constants_1 = require("./constants");

var notification_1 = require("./notification");

var helpers_1 = require("./helpers");

var allCurrencies;
initialize();

function initialize() {
  notification_1.initNotification();
  initListeners();
  setCurrenciesSelectors();
  setDefaultDot();
  setAllCurrencies();
}

;

function initListeners() {
  constants_1.getBtn.addEventListener('click', getCurrency);
  constants_1.clearBtn.addEventListener('click', helpers_1.clear);
  constants_1.burger.addEventListener('click', toggleMenu);
  constants_1.reverse.addEventListener('click', toggleCurrency);
  constants_1.saveDefaultBtn.addEventListener('click', saveDefaultHandler);
  constants_1.saveDotBtn.addEventListener('click', saveDotNumber);
  constants_1.saveAddCurrencyBtn.addEventListener('click', saveAddCurrency);
  constants_1.setInitialCurrenciesBtn.addEventListener('click', setInitialCurrencies);
}

function setCurrenciesSelectors() {
  helpers_1.clearSelectors();
  setSelectors();
}

function setSelectors() {
  var data = getData(constants_1.usedCurrenciesKey) || constants_1.initialUsedCurrencies;
  constants_1.fromEl.appendChild(helpers_1.getMountedOptions(data, {
    selectPosition: constants_1.isFromAttr,
    isShort: true
  }));
  constants_1.toEl.appendChild(helpers_1.getMountedOptions(data, {
    selectPosition: constants_1.isToAttr,
    isShort: true
  }));
  constants_1.defaultFrom.appendChild(helpers_1.getMountedOptions(data, {
    selectPosition: constants_1.isFromAttr,
    isShort: true
  }));
  constants_1.defaultTo.appendChild(helpers_1.getMountedOptions(data, {
    selectPosition: constants_1.isToAttr,
    isShort: true
  }));
}

function getCurrency() {
  var fromVal = constants_1.fromEl.value;
  var toVal = constants_1.toEl.value;
  var query = helpers_1.getQuery(fromVal, toVal);

  if (fromVal === toVal) {
    calculate(1);
    return;
  }

  fetch(query).then(function (resp) {
    return resp.json();
  }).then(function (data) {
    var rate = 1;

    for (var item in data) {
      rate = data[item].val;
    }

    if (!navigator.onLine) {
      notification_1.displayNotification('Application works offline');
    }

    calculate(rate);
  })["catch"](function (err) {
    return constants_1.resEl.innerText = "Some problems with request - " + err;
  });
}

function calculate(rate) {
  var num = Number(constants_1.inputEl.value);
  var numDotStored = getData(constants_1.dotNumberKey);
  var numDot = numDotStored !== null ? numDotStored : constants_1.defaultNum;
  constants_1.resEl.innerText = (Math.round(rate * num * Math.pow(10, numDot)) / Math.pow(10, numDot)).toString();
}

function toggleMenu() {
  var activeClass = '_burger-active';
  var body = document.body;

  if (body.classList.contains(activeClass)) {
    body.classList.remove(activeClass);
  } else {
    body.classList.add(activeClass);
  }
}

function toggleCurrency() {
  var firstIndex = constants_1.fromEl.selectedIndex;
  var secondIndex = constants_1.toEl.selectedIndex;
  constants_1.fromEl[secondIndex].selected = true;
  constants_1.toEl[firstIndex].selected = true;
}

function saveDefaultHandler() {
  var firstValue = constants_1.defaultFrom[constants_1.defaultFrom.selectedIndex].id;
  var secondValue = constants_1.defaultTo[constants_1.defaultTo.selectedIndex].id;
  var data = getData(constants_1.usedCurrenciesKey) || constants_1.initialUsedCurrencies;
  data.forEach(function (item) {
    var id = item.id;
    item[constants_1.isFromAttr] = false;
    item[constants_1.isToAttr] = false;

    if (id === firstValue) {
      item[constants_1.isFromAttr] = true;
    }

    if (id === secondValue) {
      item[constants_1.isToAttr] = true;
    }
  });
  saveData(constants_1.usedCurrenciesKey, data);
  setCurrenciesSelectors();
  toggleMenu();
}

function saveData(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getData(key) {
  var data = localStorage.getItem(key);
  return JSON.parse(data);
}

function setDefaultDot() {
  var data = getData(constants_1.dotNumberKey);
  constants_1.dotNumberInput.value = data !== null ? data : constants_1.defaultNum;
}

function saveDotNumber() {
  var value = Number(constants_1.dotNumberInput.value);
  var num = value < constants_1.minNum || value > constants_1.maxNum ? constants_1.defaultNum : value;
  saveData(constants_1.dotNumberKey, num);
  toggleMenu();
}

function setAllCurrencies() {
  fetch(constants_1.apiGetAll).then(function (res) {
    return res.json();
  }).then(function (data) {
    allCurrencies = data.results;
    mountAllCurrencies(allCurrencies);
  });
}

function mountAllCurrencies(data) {
  if (data === void 0) {
    data = allCurrencies;
  }

  var filteredData = filterAlreadyExist(data);
  var mountedOptions = helpers_1.getMountedOptions(filteredData, {
    isShort: false,
    selectPosition: null
  });
  constants_1.addCurrencySelect.innerHTML = '';
  constants_1.addCurrencySelect.appendChild(mountedOptions);
}

function filterAlreadyExist(data) {
  var usedCurrencies = getData(constants_1.usedCurrenciesKey) || constants_1.initialUsedCurrencies;
  var res = {};
  Object.keys(data).forEach(function (item) {
    var id = data[item].id;

    if (usedCurrencies.filter(function (currency) {
      return currency.id === item;
    }).length === 0) {
      res[id] = data[id];
    }
  });
  return res;
}

function saveAddCurrency() {
  var usedCurrencies = getData(constants_1.usedCurrenciesKey) || constants_1.initialUsedCurrencies;
  var newCurrency = constants_1.addCurrencySelect[constants_1.addCurrencySelect.selectedIndex];
  var newCurrencies = usedCurrencies.slice();
  newCurrencies.push({
    id: newCurrency.id,
    currencyName: newCurrency.innerText
  });
  saveData(constants_1.usedCurrenciesKey, newCurrencies);
  setCurrenciesSelectors();
  mountAllCurrencies();
  toggleMenu();
}

function setInitialCurrencies() {
  saveData(constants_1.usedCurrenciesKey, null);
  mountAllCurrencies();
  setCurrenciesSelectors();
  toggleMenu();
}
},{"./constants":"constants.ts","./notification":"notification.ts","./helpers":"helpers.ts"}],"../node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "58063" + '/');

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
},{}]},{},["../node_modules/parcel/src/builtins/hmr-runtime.js","index.ts"], null)
//# sourceMappingURL=/index.map