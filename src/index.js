import getType from './utilities/get_type';

function lvar(initialValue)
{
    // setup properties
    this.type       = getType(initialValue);
    this.nativeType = typeof(initialValue);
    var value       = initialValue;
    var listners    = {};
    var paused      = false;
    var prevValue;

    this.set = function set(newValue, force)
    {
        force = force ? true : false;
        let currentValue = value;

        // get value types
        var valueType = getType(newValue);
        var currentValueType = getType(currentValue);

        // update value if forced or niether object nor array
        if(force || valueType != 'object' && valueType != 'array')
        {
            value           = newValue;
            this.type       = valueType;
            prevValue       = currentValue;
            this.nativeType = typeof(value);
            fireListeners();
            return;
        }

        // update properties if is an object
        if(valueType == 'object' && currentValueType == 'object')
        {
            value           = Object.assign({}, value, newValue);
            prevValue       = currentValue;
            this.type       = valueType;
            this.nativeType = typeof(newValue);
            return;
        }

        // concatinate if is an array
        if(valueType == 'array' && currentValueType == 'array')
        {
            value           = value.concat(newValue);
            prevValue       = currentValue;
            this.type       = valueType;
            this.nativeType = typeof(newValue);
            return;
        }
    }

    this.on = function on(key, callback)
    {
        if(listners.hasOwnProperty(key))
        {
            var error = new Error(`A listener with key ${key} already exists.`);
            console.error(error);
            return;
        }

        if(getType(key) != 'string')
        {
            var error = new Error(`Listenr key must be of type string, ${tyepof(key)} was given.`);
            console.error(error);
            return;
        }

        if(getType(callback) != 'function')
        {
            var error = new Error(`Listenr callback must be a function, ${tyepof(key)} was given.`);
            console.error(error);
            return;
        }

        listners[key] = callback;
    }

    this.off = function off(key)
    {
        if(getType(key) != 'string')
        {
            var error = new Error(`Listenr key must be of type string, ${tyepof(key)} was given.`);
            console.error(error);
            return;
        }

        if(listners.hasOwnProperty(key))
        {
            delete listners[key];
        }
    }

    this.destroy = function destroy()
    {
        listners = {};
    }

    function fireListeners()
    {
        if(paused) return;
        var keys = Object.keys(listners);
        for(var i = 0; i < keys; i++)
        {
            if(getType(keys[i]) == 'function')
            {
                keys[i]({
                    value: value, 
                    prevValue: prevValue, 
                    valueType: getType(value),
                    prevValueType: getType(prevValue),
                });
            }
        }
    }

    this.pause = function pause()
    {
        paused = true;
    }

    this.unpause = function unpause()
    {
        this.unpause = true;
    }

    this.valueOf = function valueOf()
    {
        return value;
    }

    this.toString = function valueOf()
    {
        return value;
    }
}

module.exports = lvar;