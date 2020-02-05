import React, { useState, useContext } from 'react';
import {useHistory} from 'react-router-dom';
import { DoomguyContext } from '../../DoomguyContext';
import {saveObject} from '../../utils/localStorageHandler';

const Create = () => {
    const [keyValue, setKeyValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [doomguy, setDoomguy] = useContext(DoomguyContext);
    const history = useHistory();

    const createDoomguy = () => {
        const url = "https://qw1udscd0l.execute-api.eu-central-1.amazonaws.com/init/registerdoomguy"
        const data = {
            key: keyValue,
            email: emailValue
        }
        fetch(url, {method: 'post', body: JSON.stringify(data)})
            .then(res => res.json())
            .then(doomguy => {
                saveObject("doomguy", doomguy);
                setDoomguy(doomguy);
                history.push("/doomroom");
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className='container'>
            {/* Key */}
            <label>key</label>
            <input type="text"
                onChange={(event) => setKeyValue(event.target.value)}/>

            {/* Email */}
            <label>Email</label>
            <input type="text"
                onChange={(event) => setEmailValue(event.target.value)}/>
            <button style={{ marginTop: "50px" }} onClick={createDoomguy}>Create</button>
        </div>
    )
}

export default Create;