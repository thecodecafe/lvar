import getType from './utilities/get_type';

function lvar(initialValue)
{
    // setup properties
    this.type         = getType(initialValue);
    var value         = initialValue;
    var paused        = false;
    this.nativeType   = typeof(initialValue);
    var subscriptions = {};

    this.val = function val(newValue)
    {
        // get current value
        let currentValue = value;

        // get value types
        var valueType = getType(newValue);

        // update value
        value           = newValue;
        this.type       = valueType;
        this.nativeType = typeof(value);

        // notify subscribers
        notifySubscribers(currentValue);
    }

    this.subscribe = function subscribe(key, callback)
    {
        if(subscriptions.hasOwnProperty(key))
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

        subscriptions[key] = callback;
    }

    this.unsubscribe = function unsubscribe(key)
    {
        if(getType(key) != 'string')
        {
            var error = new Error(`Listenr key must be of type string, ${tyepof(key)} was given.`);
            console.error(error);
            return;
        }

        if(subscriptions.hasOwnProperty(key))
        {
            delete subscriptions[key];
        }
    }

    this.destroy = function destroy()
    {
        subscriptions = {};
    }

    function notifySubscribers(prevValue)
    {
        if(paused) return;
        var keys = Object.keys(subscriptions);
        for(var i = 0; i < keys; i++)
        {
            if(getType(keys[i]) == 'function')
            {
                keys[i]({
                    value        : value, 
                    valueType    : getType(value),
                    prevValue    : prevValue, 
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