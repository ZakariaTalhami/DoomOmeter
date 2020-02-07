import React, {useState, useEffect} from 'react';

const Sprite = ({
    file,
    tickLenght,
    positions,
    loop,
    w,
    h,
    framesCount,
    stagesCount,
    stage,
    paused,
    scale,
}) => {
    const [spriteState, setSpriteState] = useState({
        currentFrame: 0,
        currentPosition: {
            x: 0,
            y: stage * h
        }
    })

    useEffect(() => {
        const id = setInterval(() => {
            if(!paused) {
                updateSprite();
            }
        }, tickLenght);

        return () => clearInterval(id)
    });

    const updateSprite = () => {
        
        // next frame
        const nextFrame = (spriteState.currentFrame + 1) % framesCount
        // if(!loop) {
        //     nextFrame = nextFrame === 0 ? spriteState.currentFrame : nextFrame
        // }

        // set new position
        const nextPos = {
            x: nextFrame * w,
            y: stage * h
        }

        // update sprite
        setSpriteState({
            ...spriteState,
            currentFrame: nextFrame,
            currentPosition: nextPos
        })
    }
    
    const pos = spriteState.currentPosition;
    console.log(pos);
    const spriteStyle = {
        background: `url(${file})`,
        backgroundPositionX: `${pos.x}px`,
        backgroundPositionY: `-${pos.y}px`,
        width: `${w}px`,
        height: `${h}px`,
        transform: `scale(${scale})`
    };

    return (
        <div style={spriteStyle}>

        </div>
    )
}

export default Sprite;