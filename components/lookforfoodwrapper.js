import React, {useRef, useState, useEffect} from "react";
import { useRouter } from "next/router"
import { getLocation } from "./findfoodfuncs/getlocation";
import LocationSearchInput from "./autocompleteinput";
import FavesBoxSelector from "./uibtns/favefoosdsbox";
import SpecificFoodBox from "./uibtns/specificfoodbox";
import { sortFaves } from "./findfoodfuncs/sortfaves";

const LookforFoodWrapper= (props) => {

   
  
    const router = useRouter();
    const [addressField, setAddressField] = useState(false)
    const [coords, setCoords] = useState(false)
    const [locationMessage, setLocationMessage] = useState('Assessing location...')
    const [customCuisine, setCustomCuisine] = useState('')

    //determines by which method the user is looking for restaurants either through faves or a speicifc cuisine
    const [foodSearchPath, setFoodSearchPath] = useState('null');

    function initFoodFind (){
       
        //if true then the user wants to use their faves  / else they want a specific cuisine 
        foodSearchPath ? handleFaveInit() : handleCustomFoodSubmit ();
    }

    useEffect(() => {
        if(!coords){ //get location via the client or via address bar
            getLocation(coordinatesCallback, geolocationRejected)
            //console.log(props.currentFavesState.foodPreferences)
        }
    })


    function handleCustomFoodSubmit (e){
        if(!customCuisine == null){
            initPlacesRequest(coords, customCuisine)
        }
  
    }

    //gets cuisine name from child component specific specific food box and makes it accessible to parent component
    function getCustomCuisine(cuisine){ 
        console.log(cuisine)
        setCustomCuisine(cuisine)
    }

    async function handleFaveInit(){
        console.log('finding places based on preferences')
         const sortedFaves = await sortFaves(props.currentFavesState.foodPreferences)

        initPlacesRequest(coords, sortedFaves)
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
        setLocationMessage('Awaiting location')

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

    function initPlacesRequest(coordinates, cuisines){ 
        console.log(coordinates)
        if(coordinates){
            router.push({pathname : '/restaurants', query: {params : coordinates, cuisines}})
        }
    }
    return (

        <div className="specific-foodform-wrapper">
            <div className = 'user-path-wrapper'> 
                <FavesBoxSelector className='user-path-item' checkboxChange = {checkboxChange} checkboxStatus = {foodSearchPath}/> 

                <p className='user-path-item'> Or </p>

                <SpecificFoodBox className='user-path-item'checkboxChange = {checkboxChange} checkboxStatus = {foodSearchPath} 
                getCustomCuisine = {getCustomCuisine} inputValidity ={customCuisine}/>
            </div>



                {addressField ?<div> <LocationSearchInput getCoordsFromAddress = {getCoordsFromAddress}/> </div> : null }
                {!coords ? <h3> {locationMessage}</h3>:<div>
                    <button type = "submit" onClick = {initFoodFind}> Go! </button>
                </div>}

                
                
            {/* </form> */}
        </div>
    )
}

export default LookforFoodWrapper;
