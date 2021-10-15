import React from "react";
import FavesForm from "./faves"

const FaveSection = () => {
    return (
        <div className = "favesection-wrapper">
            <h2> Favorite Bites </h2>
            <h4> Current Faves </h4>
            <div>
                <h4> Add New Faves </h4>
                <FavesForm/>
            </div>

        </div>
    )
}

export default FaveSection;