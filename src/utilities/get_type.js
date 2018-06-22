const getTypes = function(value)
{
            if(typeof value === 'string') return 'string';
            if(typeof value === 'number') return 'number';
          if(typeof value === 'function') return 'function';
    if(value === true || value === false) return 'boolean';
         if(typeof value === 'undefined') return 'undefined';
                       if(value === null) return 'null';
          if(value.constructor === Array) return 'array';
            if(typeof value === 'object') return 'object';
};

export default getTypes;