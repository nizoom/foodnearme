import React, {useRef, useEffect} from "react";
import Image from 'next/image'
import SpecificFoodBoxImg from '../../media/specificfoodbox.png'

const SpecificFoodBox = (props) => {
    const checkboxRef = useRef();
    const cuisineRef = useRef();
    useEffect(() => {
        //if not faves then mark specific cuisine as the user's food search path
        !props.checkboxStatus? checkboxRef.current.checked = true : checkboxRef.current.checked = false;

    }, [props.checkboxStatus])

    function handleInputChange(event){
        cuisineRef.current = event.target.value
        props.getCustomCuisine(cuisineRef.current)
    }
    
    return (
        <div className = 'specific-food-box-wrapper'>
        <div className='food-box'>
        <Image src= {SpecificFoodBoxImg} className = 'favebox-img' width = '233' height = '224' layout = 'responsive' />
            <p className = 'spec-food-descriptor'> Specific Cuisine </p>
            <input type = 'checkbox' onChange={props.checkboxChange} ref = {checkboxRef} className = 'specific-checkbox'/>
            {!props.checkboxStatus ? 
            <div>
                <form className = 'specific-food-form'>
                    <label htmlFor ="cuisine"> What cuisine are you in the mood for?</label>
                    <input type="text" name = "cuisine" ref = {cuisineRef} onChange={(e) => handleInputChange(e)}
                        className = 'specific-cuisine-input'
                        placeholder = {props.inputValidity === '' ? 'Enter a cuisine' : null }
                    />
                </form>
            </div> : null
    
           }
        
        </div>
          
    </div>
    )
}

export default SpecificFoodBox