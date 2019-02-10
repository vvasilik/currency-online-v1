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
})({"dist/index.js":[function(require,module,exports) {
var define;
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

parcelRequire = function (e, r, n, t) {
  var i = "function" == typeof parcelRequire && parcelRequire,
      o = "function" == typeof require && require;

  function u(n, t) {
    if (!r[n]) {
      if (!e[n]) {
        var f = "function" == typeof parcelRequire && parcelRequire;
        if (!t && f) return f(n, !0);
        if (i) return i(n, !0);
        if (o && "string" == typeof n) return o(n);
        var c = new Error("Cannot find module '" + n + "'");
        throw c.code = "MODULE_NOT_FOUND", c;
      }

      p.resolve = function (r) {
        return e[n][1][r] || r;
      }, p.cache = {};
      var l = r[n] = new u.Module(n);
      e[n][0].call(l.exports, p, l, l.exports, this);
    }

    return r[n].exports;

    function p(e) {
      return u(p.resolve(e));
    }
  }

  u.isParcelRequire = !0, u.Module = function (e) {
    this.id = e, this.bundle = u, this.exports = {};
  }, u.modules = e, u.cache = r, u.parent = i, u.register = function (r, n) {
    e[r] = [function (e, r) {
      r.exports = n;
    }, {}];
  };

  for (var f = 0; f < n.length; f++) {
    u(n[f]);
  }

  if (n.length) {
    var c = u(n[n.length - 1]);
    "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? module.exports = c : "function" == typeof define && define.amd ? define(function () {
      return c;
    }) : t && (this[t] = c);
  }

  return u;
}({
  "5eKD": [function (require, module, exports) {
    "use strict";

    var e, r;
    exports.__esModule = !0, exports.dotNumberKey = "dotNumber", exports.minNum = 0, exports.maxNum = 5, exports.defaultNum = 2, exports.currency = document.querySelector(".currency"), exports.usedCurrenciesKey = "usedCurrency", exports.inputEl = exports.currency.querySelector(".input"), exports.getBtn = exports.currency.querySelector(".get"), exports.clearBtn = exports.currency.querySelector(".clear"), exports.resEl = exports.currency.querySelector(".result"), exports.fromEl = exports.currency.querySelector(".select-from"), exports.toEl = exports.currency.querySelector(".select-to"), exports.burger = exports.currency.querySelector(".menu"), exports.reverse = exports.currency.querySelector(".reverse"), exports.saveDefaultBtn = exports.currency.querySelector(".save-default"), exports.defaultFrom = exports.currency.querySelector(".default-from"), exports.defaultTo = exports.currency.querySelector(".default-to"), exports.saveDotBtn = exports.currency.querySelector(".save-dot-number"), exports.dotNumberInput = exports.currency.querySelector(".dot-number"), exports.addCurrencySelect = exports.currency.querySelector(".add-currency-select"), exports.saveAddCurrencyBtn = exports.currency.querySelector(".save-add-currency"), exports.setInitialCurrenciesBtn = exports.currency.querySelector(".set-initial-btn"), exports.isFromAttr = "isFrom", exports.isToAttr = "isTo", exports.apiGetAll = "https://free.currencyconverterapi.com/api/v6/currencies", exports.apiGetValue = "https://free.currencyconverterapi.com/api/v5/convert", exports.initialUsedCurrencies = [(e = {
      id: "PLN",
      currencyName: "Polish Zloty",
      name: "Polish Zloty"
    }, e[exports.isFromAttr] = !0, e), {
      id: "EUR",
      currencyName: "Euro",
      name: "Euro"
    }, {
      id: "USD",
      currencyName: "United States Dollar",
      name: "United States Dollar"
    }, (r = {
      id: "UAH",
      currencyName: "Ukrainian Hryvnia",
      name: "Ukrainian Hryvnia"
    }, r[exports.isToAttr] = !0, r), {
      id: "RUB",
      currencyName: "Russian Ruble",
      name: "Russian Ruble"
    }];
  }, {}],
  "zzCr": [function (require, module, exports) {
    "use strict";

    function i() {
      "undefined" != typeof Notification && Notification.requestPermission(function (i) {
        console.log("Notification permission status:", i);
      });
    }

    function t(i) {
      "granted" == Notification.permission && navigator.serviceWorker.getRegistration().then(function (t) {
        t.showNotification(i);
      });
    }

    exports.__esModule = !0, exports.initNotification = i, exports.displayNotification = t;
  }, {}],
  "uCOr": [function (require, module, exports) {
    "use strict";

    exports.__esModule = !0;

    var e = require("./constants");

    function t(t, n) {
      return e.apiGetValue + "?q=" + t + "_" + n + "&compact=y";
    }

    function n() {
      e.fromEl.innerHTML = "", e.toEl.innerHTML = "", e.defaultFrom.innerHTML = "", e.defaultTo.innerHTML = "";
    }

    function r() {
      e.inputEl.value = "", e.resEl.innerText = "", e.inputEl.focus();
    }

    function o(e, t) {
      var n = Object.keys(e).map(function (n) {
        return i(e[n], t);
      }).sort(function (e, t) {
        return e.dataset.name < t.dataset.name ? -1 : 1;
      }),
          r = document.createDocumentFragment();
      return n.forEach(function (e) {
        return r.appendChild(e);
      }), r;
    }

    function i(e, t) {
      var n = document.createElement("option");
      return n.value = e.id, n.id = e.id, n.dataset.name = e.currencyName, t.isShort ? n.innerText = e.id : n.innerText = e.currencyName + " (" + e.id + ")", e[t.selectPosition] ? n.selected = !0 : n.selected = !1, n;
    }

    exports.getQuery = t, exports.clearSelectors = n, exports.clear = r, exports.getMountedOptions = o, exports.createOption = i;
  }, {
    "./constants": "5eKD"
  }],
  "7QCb": [function (require, module, exports) {
    "use strict";

    exports.__esModule = !0;

    var e,
        t = require("./constants"),
        n = require("./notification"),
        i = require("./helpers");

    function r() {
      n.initNotification(), o(), u(), p(), C();
    }

    function o() {
      t.getBtn.addEventListener("click", s), t.clearBtn.addEventListener("click", i.clear), t.burger.addEventListener("click", l), t.reverse.addEventListener("click", a), t.saveDefaultBtn.addEventListener("click", f), t.saveDotBtn.addEventListener("click", h), t.saveAddCurrencyBtn.addEventListener("click", g), t.setInitialCurrenciesBtn.addEventListener("click", N);
    }

    function u() {
      i.clearSelectors(), c();
    }

    function c() {
      var e = m(t.usedCurrenciesKey) || t.initialUsedCurrencies;
      t.fromEl.appendChild(i.getMountedOptions(e, {
        selectPosition: t.isFromAttr,
        isShort: !0
      })), t.toEl.appendChild(i.getMountedOptions(e, {
        selectPosition: t.isToAttr,
        isShort: !0
      })), t.defaultFrom.appendChild(i.getMountedOptions(e, {
        selectPosition: t.isFromAttr,
        isShort: !0
      })), t.defaultTo.appendChild(i.getMountedOptions(e, {
        selectPosition: t.isToAttr,
        isShort: !0
      }));
    }

    function s() {
      var e = t.fromEl.value,
          r = t.toEl.value,
          o = i.getQuery(e, r);
      e !== r ? fetch(o).then(function (e) {
        return e.json();
      }).then(function (e) {
        var t = 1;

        for (var i in e) {
          t = e[i].val;
        }

        navigator.onLine || n.displayNotification("Application works offline"), d(t);
      }).catch(function (e) {
        return t.resEl.innerText = "Some problems with request - " + e;
      }) : d(1);
    }

    function d(e) {
      var n = Number(t.inputEl.value),
          i = m(t.dotNumberKey),
          r = null !== i ? i : t.defaultNum;
      t.resEl.innerText = (Math.round(e * n * Math.pow(10, r)) / Math.pow(10, r)).toString();
    }

    function l() {
      var e = document.body;
      e.classList.contains("_burger-active") ? e.classList.remove("_burger-active") : e.classList.add("_burger-active");
    }

    function a() {
      var e = t.fromEl.selectedIndex,
          n = t.toEl.selectedIndex;
      t.fromEl[n].selected = !0, t.toEl[e].selected = !0;
    }

    function f() {
      var e = t.defaultFrom[t.defaultFrom.selectedIndex].id,
          n = t.defaultTo[t.defaultTo.selectedIndex].id,
          i = m(t.usedCurrenciesKey) || t.initialUsedCurrencies;
      i.forEach(function (i) {
        var r = i.id;
        i[t.isFromAttr] = !1, i[t.isToAttr] = !1, r === e && (i[t.isFromAttr] = !0), r === n && (i[t.isToAttr] = !0);
      }), v(t.usedCurrenciesKey, i), u(), l();
    }

    function v(e, t) {
      localStorage.setItem(e, JSON.stringify(t));
    }

    function m(e) {
      var t = localStorage.getItem(e);
      return JSON.parse(t);
    }

    function p() {
      var e = m(t.dotNumberKey);
      t.dotNumberInput.value = null !== e ? e : t.defaultNum;
    }

    function h() {
      var e = Number(t.dotNumberInput.value),
          n = e < t.minNum || e > t.maxNum ? t.defaultNum : e;
      v(t.dotNumberKey, n), l();
    }

    function C() {
      fetch(t.apiGetAll).then(function (e) {
        return e.json();
      }).then(function (t) {
        y(e = t.results);
      });
    }

    function y(n) {
      void 0 === n && (n = e);
      var r = E(n),
          o = i.getMountedOptions(r, {
        isShort: !1,
        selectPosition: null
      });
      t.addCurrencySelect.innerHTML = "", t.addCurrencySelect.appendChild(o);
    }

    function E(e) {
      var n = m(t.usedCurrenciesKey) || t.initialUsedCurrencies,
          i = {};
      return Object.keys(e).forEach(function (t) {
        var r = e[t].id;
        0 === n.filter(function (e) {
          return e.id === t;
        }).length && (i[r] = e[r]);
      }), i;
    }

    function g() {
      var e = m(t.usedCurrenciesKey) || t.initialUsedCurrencies,
          n = t.addCurrencySelect[t.addCurrencySelect.selectedIndex],
          i = e.slice();
      i.push({
        id: n.id,
        currencyName: n.innerText
      }), v(t.usedCurrenciesKey, i), u(), y(), l();
    }

    function N() {
      v(t.usedCurrenciesKey, null), y(), u(), l();
    }

    r();
  }, {
    "./constants": "5eKD",
    "./notification": "zzCr",
    "./helpers": "uCOr"
  }]
}, {}, ["7QCb"], null);
},{}],"node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "53093" + '/');

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
},{}]},{},["node_modules/parcel/src/builtins/hmr-runtime.js","dist/index.js"], null)
//# sourceMappingURL=/dist.de44d8ea.map