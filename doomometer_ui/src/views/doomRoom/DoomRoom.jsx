import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { DoomguyContext } from '../../DoomguyContext';
import Sprite from '../Sprite';
import RoundButton from '../RoundButton';
import buttonOff from '../../icons/work_off_128.png'
import buttonOn from '../../icons/work_on_128.png'
import './DoomRoom.css'
import { saveObject } from '../../utils/localStorageHandler';


const DoomRoom = () => {
    const history = useHistory();
    const [doomguy, setDoomguy] = useContext(DoomguyContext);
    
    useEffect(() => {
        if (!doomguy) {
            // Redirect user if doomguy isnt loaded
            setTimeout(() => history.push("/"), 0);
        } else {
            let id = setInterval(() => {
                loadDoomguy();
            }, 3000)
            return () => clearInterval(id)
        }
    });

    const healthToStage = (health) => {
        let stage = 0;
        switch (true) {
            case health > 70:
                stage = 0;
                break;
            case health <= 70 && health > 50:
                stage = 1;
                break;
            case health <= 50 && health >35:
                stage = 2;
                break;
            case health <= 35 && health > 20:
                stage = 3;
                break;
            case health <= 20:
                stage = 4;
                break;
            default:
                break;
        }

        return stage;
    }

    const loadDoomguy = () => {
        const key = doomguy.key;
        const url = `https://qw1udscd0l.execute-api.eu-central-1.amazonaws.com/init/getdoomguy?key=${key}`
        fetch(url)
            .then((data) => {
                if (data.status === 200) {
                    data.json().then((doomguy) => {
                        saveObject("doomguy", doomguy);
                        setDoomguy(doomguy);
                    })
                }
            });
    }

    const updateDoomguyState = (newState) => {
        const data = {
            key: doomguy._id,
            isSitting: newState
        }
        const url = 'https://qw1udscd0l.execute-api.eu-central-1.amazonaws.com/init/setdoomguystate'
        fetch(url, { body: JSON.stringify(data), method: 'post' })
            .then((res) => res.json())
            .then(res => {
                console.log(res);
                loadDoomguy();
            })
            .catch(error => console.log(error))
    }

    const isSitting = doomguy ? doomguy.sitting : false;    
    return (
        <div className="container">
            <div style={{
                position: 'absolute',
                top: '50%',
                transform: ' translateY(-50%)'
            }}>
                <Sprite
                    file='https://i.imgur.com/nnLFxE3.png'
                    w='120'
                    h='155'
                    tickLenght='500'
                    stage={healthToStage(doomguy.health)}
                    framesCount='5'
                    scale='2'
                />
            </div>
            <div className="sitButton noselect">
                <RoundButton
                    iconOn={buttonOn}
                    iconOff={buttonOff}
                    toggled={isSitting}
                    callback={updateDoomguyState}
                />
            </div>
        </div>
    )
}

export default DoomRoom;