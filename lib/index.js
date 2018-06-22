'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _get_type = require('./utilities/get_type');

var _get_type2 = _interopRequireDefault(_get_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function lvar(initialValue) {
    // setup properties
    this.type = (0, _get_type2.default)(initialValue);
    this.nativeType = typeof initialValue === 'undefined' ? 'undefined' : _typeof(initialValue);
    var value = initialValue;
    var listners = {};
    var paused = false;
    var prevValue;

    this.set = function set(newValue, force) {
        force = force ? true : false;
        var currentValue = value;

        // get value types
        var valueType = (0, _get_type2.default)(newValue);
        var currentValueType = (0, _get_type2.default)(currentValue);

        // update value if forced or niether object nor array
        if (force || valueType != 'object' && valueType != 'array') {
            value = newValue;
            this.type = valueType;
            prevValue = currentValue;
            this.nativeType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
            fireListeners();
            return;
        }

        // update properties if is an object
        if (valueType == 'object' && currentValueType == 'object') {
            value = Object.assign({}, value, newValue);
            prevValue = currentValue;
            this.type = valueType;
            this.nativeType = typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue);
            return;
        }

        // concatinate if is an array
        if (valueType == 'array' && currentValueType == 'array') {
            value = value.concat(newValue);
            prevValue = currentValue;
            this.type = valueType;
            this.nativeType = typeof newValue === 'undefined' ? 'undefined' : _typeof(newValue);
            return;
        }
    };

    this.on = function on(key, callback) {
        if (listners.hasOwnProperty(key)) {
            var error = new Error('A listener with key ' + key + ' already exists.');
            console.warn(error);
            return;
        }

        if ((0, _get_type2.default)(key) != 'string') {
            var error = new Error('Listenr key must be of type string, ' + tyepof(key) + ' was given.');
            console.warn(error);
            return;
        }

        if ((0, _get_type2.default)(callback) != 'function') {
            var error = new Error('Listenr callback must be a function, ' + tyepof(key) + ' was given.');
            console.warn(error);
            return;
        }

        listners[key] = callback;
    };

    this.off = function off(key) {
        if ((0, _get_type2.default)(key) != 'string') {
            var error = new Error('Listenr key must be of type string, ' + tyepof(key) + ' was given.');
            console.warn(error);
            return;
        }

        if (listners.hasOwnProperty(key)) {
            delete listners[key];
        }
    };

    this.destroy = function destroy() {
        listners = {};
    };

    var fireListeners = function fireListeners() {
        if (paused) return;
        var keys = Object.keys(listners);
        for (var i = 0; i < keys; i++) {
            if ((0, _get_type2.default)(keys[i]) == 'function') {
                keys[i]({
                    value: value,
                    prevValue: prevValue,
                    valueType: (0, _get_type2.default)(value),
                    prevValueType: (0, _get_type2.default)(prevValue)
                });
            }
        }
    };

    this.pause = function pause() {
        paused = true;
    };

    this.unpause = function unpause() {
        this.unpause = true;
    };

    this.valueOf = function valueOf() {
        return value;
    };

    this.toString = function valueOf() {
        return value;
    };
}

module.exports = lvar;