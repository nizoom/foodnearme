import React from "react";
import FavesForm from "./newfaves"
const FaveSection = (props) => {
    return (
        <div className = "favesection-wrapper">
            <h2 className = 'fave-bites-header'> Favorite Bites </h2>
           
        
                <h4 className = 'fave-bites-subheader'> Edit Your Current Faves: </h4>
                <FavesForm uid = {props.uid} currentFavesState = {props.currentFavesState}
                />
        </div>

      
    )
}

export default FaveSection;