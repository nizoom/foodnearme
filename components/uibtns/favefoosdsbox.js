import React, {useEffect, useRef} from "react";

const FavesBoxSelector = (props) => {

    const checkboxRef = useRef();
    useEffect(() => {
        //if  faves then check faves as the user's food search path (default)
      props.checkboxStatus? checkboxRef.current.checked = true : checkboxRef.current.checked = false;

    }, [props.checkboxStatus])
    return (
        <div className='specific-food-box'>
            <p>faves </p>
            <input type= 'checkbox' onChange={props.checkboxChange}  ref = {checkboxRef}/> 
        </div>
    )
}

export default FavesBoxSelector
