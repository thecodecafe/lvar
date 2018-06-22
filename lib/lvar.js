var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

import getType from './utilities/get_type';

var lvar = function lvar(value) {
    // set default value for lvar
    this.value = value;
    this.type = getType(value);
    this.nativeType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    this.listners = {};
    this.paused = false;
    this.prevValue;
};

lvar.prototype.set = function (value, force) {
    force = force ? true : false;
    var prevValue = this.value;

    // get value types
    var valueType = getType(value);
    var prevValueType = getType(prevValue);

    if (force || valueType != 'object' && valueType != 'array') {
        this.value = value;
        this.type = getType(value);
        this.nativeType = typeof value === 'undefined' ? 'undefined' : _typeof(value);
        this.prevValue = prevValue;
        this.fireListeners();
        return;
    }

    if (valueType == 'object' && prevValueType == 'object') {
        this.value = Object.assign(value);
    }
};

lvar.prototype.on = function (key, callback) {
    if (this.listners.hasOwnProperty(key)) {
        var error = new Error('A listener with key ' + key + ' already exists.');
        console.warn(error);
        return;
    }

    if (getType(key) != 'string') {
        var error = new Error('Listenr key must be of type string, ' + tyepof(key) + ' was given.');
        console.warn(error);
        return;
    }

    if (getType(callback) != 'function') {
        var error = new Error('Listenr callback must be a function, ' + tyepof(key) + ' was given.');
        console.warn(error);
        return;
    }

    this.listners[key] = callback;
};

lvar.prototype.off = function (key) {
    if (getType(key) != 'string') {
        var error = new Error('Listenr key must be of type string, ' + tyepof(key) + ' was given.');
        console.warn(error);
        return;
    }

    if (this.listners.hasOwnProperty(key)) {
        delete this.listners[key];
    }
};

lvar.prototype.destroy = function () {
    this.listners = {};
};

lvar.prototype.fireListeners = function () {
    if (this.paused) return;
    var keys = Object.keys(this.listners);
    for (var i = 0; i < keys; i++) {
        if (getType(keys[i]) == 'function') {
            keys[i]({
                value: this.value,
                prevValue: this.prevValue,
                valueType: getType(this.value),
                prevValueType: getType(this.prevValue)
            });
        }
    }
};

lvar.prototype.paused = function () {
    this.paused = true;
};

lvar.prototype.unpause = function () {
    this.unpause = true;
};

lvar.prototype.valueOf = function () {
    return this.value;
};

lvar.prototype.toString = function () {
    return this.value;
};

export default lvar;