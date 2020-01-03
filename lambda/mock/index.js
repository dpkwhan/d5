(function(global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined'
    ? (module.exports = factory(require('mockjs'), require('moment')))
    : typeof define === 'function' && define.amd
    ? define(['mockjs', 'moment'], factory)
    : ((global = global || self), (global.mock = factory(global.mockjs, global.moment)));
})(this, function(mockjs, moment) {
  'use strict';

  mockjs = mockjs && mockjs.hasOwnProperty('default') ? mockjs['default'] : mockjs;
  moment = moment && moment.hasOwnProperty('default') ? moment['default'] : moment;

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true,
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _objectSpread(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};
      var ownKeys = Object.keys(source);

      if (typeof Object.getOwnPropertySymbols === 'function') {
        ownKeys = ownKeys.concat(
          Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }),
        );
      }

      ownKeys.forEach(function(key) {
        _defineProperty(target, key, source[key]);
      });
    }

    return target;
  }
});
