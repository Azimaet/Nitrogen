/******************************************************/
/********************** UTILS *************************/

function isEmpty(obj) {
    for(var key in obj) { 
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

function filteredKeys(obj, filter) {
    let key, keys = []
    for (key in obj)
      if (obj.hasOwnProperty(key) && filter.test(key))
        keys.push(key)
    return keys
}
