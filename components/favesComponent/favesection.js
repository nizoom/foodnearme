import React from "react";
import FavesForm from "./newfaves"
import CurrentFaves from "./currentfaves";
const FaveSection = (props) => {
    return (
        <div className = "favesection-wrapper">
            <h2> Favorite Bites </h2>
            <h4> Current Faves </h4>
            <div>
                <CurrentFaves currentFavesState = {props.currentFavesState}/>
            </div>
            <div>
                <h4> Add New Faves </h4>
                <FavesForm uid = {props.uid}/>
            </div>

        </div>
    )
}

export default FaveSection;