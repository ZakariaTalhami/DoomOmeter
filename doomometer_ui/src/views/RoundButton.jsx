import React, { useState } from 'react';

const defaultStyle = {
    width: '100%',
    cursor: 'pointer',
    padding: '15%',
    border: "3px #DC5248 solid",
    borderRadius: '1000px',
}

const RoundButton = ({ iconOn, iconOff, toggled = false, callback }) => {
    const [isToggled, setIsToggled] = useState(toggled);

    const displayedIcon = isToggled ? iconOn : iconOff;

    const onToggle = () => {
        if (callback && typeof callback === 'function') {
            callback(!isToggled)
        }
        setIsToggled(!isToggled);
    }

    const buttonStyle = {
        ...defaultStyle,
        backgroundColor: isToggled ? "#DC5248ff" : "#0000"
    }

    return (
        <div style={buttonStyle} onClick={onToggle}>
            <img style={{ width: '100%' }} src={displayedIcon} alt='button icon' />
        </div>
    )
}

export default RoundButton;