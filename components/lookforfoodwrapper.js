import React, {useRef, useState, useEffect} from "react";
import { useRouter } from "next/router"
import { getLocation } from "./findfoodfuncs/getlocation";
import LocationSearchInput from "./autocompleteinput";
import FavesBoxSelector from "./uibtns/favefoosdsbox";
import SpecificFoodBox from "./uibtns/specificfoodbox";
import { findFood } from "../pages/[restaurants]";

const LookforFoodWrapper= (props) => {

   
  
    const router = useRouter();
    const [addressField, setAddressField] = useState(false)
    const [coords, setCoords] = useState(false)
  

    //determines by which method the user is looking for restaurants either through faves or a speicifc cuisine
    const [foodSearchPath, setFoodSearchPath] = useState('null');

    function initFoodFind (){
        //if true then the user wants to use their faves  / else they want a specific cuisine 
        foodSearchPath ? handleFaveInit() : handleCustomFoodSubmit ();
    }

    useEffect(() => {
        if(!coords){ //get location via the client or via address bar
            getLocation(coordinatesCallback, geolocationRejected)
            // setTimeout(() => {getLocation(coordinatesCallback, geolocationRejected)}, 1000)
        }
    })

    function handleCustomFoodSubmit (e){
        e.preventDefault();
        const cuisineValue = cuisineRef.current.value
        console.log("submitted")
        console.log(`${cuisineValue}`)
        
        cuisineRef.current.value = ""
        //initPlacesRequest(coords)
        // router.push(`/posts/${cuisineValue}`)

    }

    function handleFaveInit(){
        console.log('finding places based on preferences')
        initPlacesRequest(coords)
        //await getLocation(passCoordinatesToGoogle, geolocationRejected);
        
    }

    //retrieves coordinates from getLocation in useeffect block
    function coordinatesCallback(coordinates){
        console.log(coordinates)
        setCoords(coordinates)
    }

   
    //if location services are blocked then activate address field
    function geolocationRejected(){ // init manual address input from user
        console.log('please enter your address')
        setAddressField(true) 

    }

    //get coordinates from filled out address bar
    function getCoordsFromAddress(coordinates){
        console.log(coordinates)
        setCoords(coordinates)
    }

  

    function checkboxChange(){
        //change from faves to specific cuisine
        console.log('changed')
        setFoodSearchPath(!foodSearchPath)
    }

    function initPlacesRequest(coordinates){ // coordinates through built in browser geolocation
        // let test = {test: 'test'} 
        // const { test } = router.query
        router.push({pathname : '/restaurants', query: {params : 'restaurants/0,0/thai'}})
        //findFood(coords, process.env.NEXT_PUBLIC_GOOGLE_KEY, props.currentFavesState)
    }
    return (

        <div className="specific-foodform-wrapper">
            <div className = 'user-path-wrapper'> 
                <FavesBoxSelector className='user-path-item' checkboxChange = {checkboxChange} checkboxStatus = {foodSearchPath}/> 

                <p className='user-path-item'> Or </p>

                <SpecificFoodBox className='user-path-item'checkboxChange = {checkboxChange} checkboxStatus = {foodSearchPath}/>
            </div>



                {!addressField ?<div> <LocationSearchInput getCoordsFromAddress = {getCoordsFromAddress}/> </div> : null }
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


{/* <div>
                     <button onClick = {handleFaveInit}> <h3> Find food based on your faves </h3> </button>
                </div>
                
                
            
            <form onSubmit = {handleCustomFoodSubmit} className="specific-food-form">
                <p> Or prefer something specific? </p>
                <div>
                    <label htmlFor ="cuisine"> What cuisine are you in the mood for?</label>
                    <input type="text" name = "cuisine" ref = {cuisineRef}/>
                </div> */}