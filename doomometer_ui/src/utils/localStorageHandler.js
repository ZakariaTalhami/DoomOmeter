const EXPIRATION_TIME = 7

export const saveObject = (key, object) => {
    const storeObject = JSON.stringify({
        createdTime: Date.now(),
        value: object
    })
    localStorage.setItem(key, storeObject);
}

export const loadObject = (key) => {
    let object = null;
    const storedValue = localStorage.getItem(key)
    if (storedValue) {
        const storedObject = JSON.parse(storedValue);
    
        const createdTime = new Date(storedObject.createdTime);
        const expirationDate = new Date();
        expirationDate.setDate(createdTime.getDate() + EXPIRATION_TIME);
    
        // Check if expired
        if (expirationDate < Date.now()) {
            expireObjects(key);
        } else {
            object = storedObject.value;
        }
    }

    return object;
}

const expireObjects = (key) => {
    localStorage.removeItem(key)
}