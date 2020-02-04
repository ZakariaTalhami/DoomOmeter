import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { DoomguyContext } from '../../DoomguyContext';


const DoomRoom = () => {
    const history = useHistory();
    const [doomguy, setDoomguy] = useContext(DoomguyContext);

    useEffect(() => {
        if (!doomguy) {
            // Redirect user if doomguy isnt loaded
            history.push("/");
        } else {
            let id = setInterval(() => {
                const key = doomguy.key;
                const url = `https://qw1udscd0l.execute-api.eu-central-1.amazonaws.com/init/getdoomguy?key=${key}`
                fetch(url)
                    .then((data) => {
                        if (data.status === 200) {
                            data.json().then((doomguy) => {
                                setDoomguy(doomguy);
                            })
                        }
                    })
            }, 3000)
            return () => clearInterval(id)
        }
    })
    return (
        <h1>Doom room</h1>
    )
}

export default DoomRoom;