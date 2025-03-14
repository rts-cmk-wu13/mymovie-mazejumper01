/**
 * 
 * @typedef { string | boolean | object | any[]} LocalStorageData - Value to be saved in local storage
 */


/**
 * Save an item to local storage
 * @param {string} key - Key to be used in local storage.
 * @param {string | number | | boolean | object | any[] } value - Value to be saved
 * @returns {string}
 */
function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
    return "Data was saved with the key " + key
}


/**
 *  
 * @param {string} key - Key to be read from local storage
 * @returns {string | number | boolean | object | any[] }
 */
function readFromLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}




function deleteFromLocalStorage(key) {
    localStorage.removeItem(key)
    return "the element with key" + key +"was deleted";
}

saveToLocalStorage()