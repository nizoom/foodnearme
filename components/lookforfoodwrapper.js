import React, {useRef, useState, useEffect} from "react";
import { useRouter } from "next/router"
import { getLocation } from "./findfoodfuncs/getlocation";
import LocationSearchInput from "./autocompleteinput";
import FavesBoxSelector from "./uibtns/favefoosdsbox";
import SpecificFoodBox from "./uibtns/specificfoodbox";

const LookforFoodWrapper= (props) => {

   
    const locationRef = useRef();
    const router = useRouter();
    const [addressField, setAddressField] = useState(false)
    const [coords, setCoords] = useState(false)

    function initFoodFind (){
        //if true then the user wants to use their faves  / else they want a specific cuisine 
        foodSearchPath ? handleFaveInit() : handleCustomFoodSubmit ();
    }

    useEffect(() => {
        if(!coords){
            setTimeout(() => {getLocation(passCoordinatesToGoogle, geolocationRejected)}, 5000)
        }
    })
    function handleCustomFoodSubmit (e){
        e.preventDefault();
        const [cuisineValue, locationValue] = [cuisineRef.current.value, locationRef.current.value]
        console.log("submitted")
        console.log(`${cuisineValue} and ${locationValue}`)
        //validate form
        //if valid
        //reset to blank
        cuisineRef.current.value = ""
        router.push(`/posts/${cuisineValue}`)

    }

    async function handleFaveInit(){
        console.log('finding places based on preferences')
        //await getLocation(passCoordinatesToGoogle, geolocationRejected);
        
    }

    function passCoordinatesToGoogle(coordinates){ // coordinates through built in browser geolocation
        setCoords(coordinates)
        console.log(coordinates)
    }

    function geolocationRejected(){ // init manual address input from user
        console.log('please enter your address')
        setAddressField(true) 

    }

    const [foodSearchPath, setFoodSearchPath] = useState('null');

    function checkboxChange(){
        //change from faves to specific cuisine
        console.log('changed')
        setFoodSearchPath(!foodSearchPath)
    }
    return (

        <div className="specific-foodform-wrapper">
            <div className = 'user-path-wrapper'> 
                <FavesBoxSelector className='user-path-item' checkboxChange = {checkboxChange} checkboxStatus = {foodSearchPath}/> 

                <p className='user-path-item'> Or </p>

                <SpecificFoodBox className='user-path-item'checkboxChange = {checkboxChange} checkboxStatus = {foodSearchPath}/>
            </div>





             {/* <div>
                     <button onClick = {handleFaveInit}> <h3> Find food based on your faves </h3> </button>
                </div>
                
                
            
            <form onSubmit = {handleCustomFoodSubmit} className="specific-food-form">
                <p> Or prefer something specific? </p>
                <div>
                    <label htmlFor ="cuisine"> What cuisine are you in the mood for?</label>
                    <input type="text" name = "cuisine" ref = {cuisineRef}/>
                </div> */}
                {addressField ?<div> <LocationSearchInput/> </div> : null }
                <div>
                    <button type = "submit" onClick = {initFoodFind}> Go! </button>
                </div>

                
                
            {/* </form> */}
        </div>
    )
}

export default LookforFoodWrapper;

// { addressField ? <div>
//     <label htmlFor="locaton"> Location: </label>
//     <input type = "text" name = "location" ref = {locationRef}/>
// </div> : null }