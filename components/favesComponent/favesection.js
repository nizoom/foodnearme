import React from "react";
import FavesForm from "./newfaves"
const FaveSection = (props) => {
    return (
        <div className = "favesection-wrapper">
            <h2> Favorite Bites </h2>
            {/* <h4> Current Faves </h4>
            <div>
                <CurrentFaves/>
            </div> */}
            <div>
                <h4> Edit Your Current Faves </h4>
                <FavesForm uid = {props.uid} currentFavesState = {props.currentFavesState}
                />
            </div>

        </div>
    )
}

export default FaveSection;