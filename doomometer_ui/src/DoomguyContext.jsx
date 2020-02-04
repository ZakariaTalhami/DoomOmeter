import React, { createContext, useState } from 'react';
import {loadObject} from './utils/localStorageHandler'

// check local storage
let defaultDoomguy = loadObject('doomguy');

// create Context
export const DoomguyContext = createContext();

// provider
export const DoomguyProvider = ({ children }) => {
    const [doomguy, setDoomguy] = useState(defaultDoomguy);
    return (
        <DoomguyContext.Provider value={[doomguy, setDoomguy]}>
            {children}
        </DoomguyContext.Provider>
    )
}