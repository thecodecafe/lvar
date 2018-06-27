'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _get_type = require('./utilities/get_type');

var _get_type2 = _interopRequireDefault(_get_type);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function lvar(initialValue) {
    // setup properties
    this.type = (0, _get_type2.default)(initialValue);
    var value = initialValue;
    var paused = false;
    this.nativeType = typeof initialValue === 'undefined' ? 'undefined' : _typeof(initialValue);
    var subscriptions = {};

    this.val = function val(newValue) {
        // get current value
        var currentValue = value;

        // get value types
        var valueType = (0, _get_type2.default)(newValue);

        // update value
        value = newValue;
        this.type = valueType;
        this.nativeType = typeof value === 'undefined' ? 'undefined' : _typeof(value);

        // notify subscribers
        notifySubscribers(currentValue);
    };

    this.subscribe = function subscribe(key, callback) {
        if (subscriptions.hasOwnProperty(key)) {
            var error = new Error('A listener with key ' + key + ' already exists.');
            console.error(error);
            return;
        }

        if ((0, _get_type2.default)(key) != 'string') {
            var error = new Error('Listenr key must be of type string, ' + tyepof(key) + ' was given.');
            console.error(error);
            return;
        }

        if ((0, _get_type2.default)(callback) != 'function') {
            var error = new Error('Listenr callback must be a function, ' + tyepof(key) + ' was given.');
            console.error(error);
            return;
        }

        subscriptions[key] = callback;
    };

    this.unsubscribe = function unsubscribe(key) {
        if ((0, _get_type2.default)(key) != 'string') {
            var error = new Error('Listenr key must be of type string, ' + tyepof(key) + ' was given.');
            console.error(error);
            return;
        }

        if (subscriptions.hasOwnProperty(key)) {
            delete subscriptions[key];
        }
    };

    this.destroy = function destroy() {
        subscriptions = {};
    };

    function notifySubscribers(prevValue) {
        if (paused) return;
        var keys = Object.keys(subscriptions);
        for (var i = 0; i < keys; i++) {
            if ((0, _get_type2.default)(keys[i]) == 'function') {
                keys[i]({
                    value: value,
                    valueType: (0, _get_type2.default)(value),
                    prevValue: prevValue,
                    prevValueType: (0, _get_type2.default)(prevValue)
                });
            }
        }
    }

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

// module.exports = lvar;