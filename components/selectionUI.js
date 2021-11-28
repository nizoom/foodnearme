import React, {useState, useEffect} from "react";
import { useRouter } from "next/router"
import { getLocation } from "./findfoodfuncs/getlocation";
import LocationSearchInput from "./autocompleteinput";
import FavesBoxSelector from "./userpaths/favefoosdsbox";
import SpecificFoodBox from "./userpaths/specificfoodbox";
import { sortFaves } from "./findfoodfuncs/sortfaves";

const SelectionUI= (props) => {

   
  
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
        if(customCuisine !== ''){
            initPlacesRequest(coords, customCuisine)
        }
  
    }

    //gets cuisine name from child component specific specific food box and makes it accessible to parent component
    function getCustomCuisine(cuisine){         
        setCustomCuisine(cuisine)
    }

    async function handleFaveInit(){
        console.log('finding places based on preferences')
        const sortedFaves = await sortFaves(props.currentFavesState.foodPreferences)

        if(sortedFaves.length>0){
            initPlacesRequest(coords, sortedFaves)
        } else {
            props.noFaves();
            //if no saved faves tell user to save some
        }
            
    }

    //retrieves coordinates from getLocation in useeffect block
    function coordinatesCallback(coordinates){
        let coordsObj = {lat: coordinates[0], lng : coordinates[1]} 
        setCoords(coordsObj)
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

    async function initPlacesRequest(coordinates, cuisines){ 
        console.log(coordinates)
        const foodParam = cuisines.toString();
        const latParam = coordinates.lat.toString();
        const lngParam = coordinates.lng.toString();

        if(coordinates){
            router.push({pathname : '/restaurant',  query : {foodtypes: cuisines, lat: latParam, lng : lngParam}})
        }
    }
    return (

        <div className="foodform-wrapper">
            <div className = 'user-path-wrapper'> 
                <FavesBoxSelector className='user-path-item' checkboxChange = {checkboxChange} checkboxStatus = {foodSearchPath}/> 

                <p className='or'> Or a</p>

                <SpecificFoodBox className='user-path-item'checkboxChange = {checkboxChange} checkboxStatus = {foodSearchPath} 
                getCustomCuisine = {getCustomCuisine} inputValidity ={customCuisine}/>
            </div>



                {addressField ?<div> <LocationSearchInput getCoordsFromAddress = {getCoordsFromAddress}/> </div> : null }
                {!coords ? <h3> {locationMessage}</h3>:<div className='go-btn-div'>
                    <button type = "submit" onClick = {initFoodFind} className = 'go-btn'> Go! </button>
                </div>}

            
        </div>
    )
}

export default SelectionUI;
