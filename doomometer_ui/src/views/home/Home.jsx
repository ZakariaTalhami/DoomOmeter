import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import "./Home.css"
import { DoomguyContext } from '../../DoomguyContext';
import { saveObject } from '../../utils/localStorageHandler'

const Home = () => {
    const history = useHistory();
    const [doomguy, setDoomguy] = useContext(DoomguyContext);
    const [keyValue, setKeyValue] = useState(doomguy ? doomguy.key : "")
    // eslint-disable-next-line
    const [isLoadingDoomguym, setIsloadingDoomguy] = useState(false);

    const loadDoomguy = () => {
        setIsloadingDoomguy(true);
        const url = `https://qw1udscd0l.execute-api.eu-central-1.amazonaws.com/init/getdoomguy?key=${keyValue}`
        fetch(url)
            .then((data) => {
                if (data.status === 200) {
                    data.json().then((doomguy) => {
                        saveObject("doomguy", doomguy);
                        setDoomguy(doomguy);
                        history.push("/doomroom");
                    })
                }
            })
            .catch((error) => {
                console.error("Error!");
                console.error(error);
            })
    }
    const checkForEnter = (event) => {
        if (event.key === "Enter") {
            loadDoomguy()
        }
    }

    return (
        <div className="container">
            <label>key</label>
            <input type="text"
                value={keyValue}
                onChange={(event) => setKeyValue(event.target.value)}
                onKeyPress={checkForEnter} />
            <button style={{ marginTop: "50px" }} onClick={loadDoomguy}>load</button>
            <div className="or">
                or
            </div>
            <button onClick={() => history.push('/create')}>create</button>
        </div>
    )
}


export default Home;