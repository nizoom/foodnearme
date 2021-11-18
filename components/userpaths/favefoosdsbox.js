import React, {useEffect, useRef} from "react";
import Image from 'next/image'
import Faveboximg from '../../media/favefoodbox.png'



const FavesBoxSelector = (props) => {

    const checkboxRef = useRef();
    
    useEffect(() => {
        //if  faves then check faves as the user's food search path (default)
      props.checkboxStatus? checkboxRef.current.checked = true : checkboxRef.current.checked = false;

    }, [props.checkboxStatus])
    return (
        <div className='food-box'>
            <Image src= {Faveboximg} className = 'favebox-img' width = '233' height = '224' layout = 'responsive' />
            <p className = 'faves-descriptor'>Faves </p>
            <input type= 'checkbox' onChange={props.checkboxChange}  ref = {checkboxRef} className='checkbox'/> 
        </div>
    )
}

export default FavesBoxSelector
