'use strict';

Object.defineProperty(exports, "__esModule", {
            value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = getTypes;
function getTypes(value) {
            if (typeof value === 'string') return 'string';
            if (typeof value === 'number') return 'number';
            if (typeof value === 'function') return 'function';
            if (value === true || value === false) return 'boolean';
            if (typeof value === 'undefined') return 'undefined';
            if (value === null) return 'null';
            if (value.constructor === Array) return 'array';
            if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') return 'object';
};