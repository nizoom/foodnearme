import React, {useState} from "react";

const CurrentFaves = (props) => {
    //console.log(props.currentFavesState)
    const favesObj = props.currentFavesState.foodPreferences
    //check if any faves 
    console.log(favesObj)
    let activeFaves = [];

    (function () {
        for (const property in favesObj) {
           // console.log([property])
            if(favesObj[property]){
                
                activeFaves.push([property])
            } else {
                //activeFaves.push(`${property} is not an active fave`)
            }
        }
    })();

    console.log(activeFaves)

    
    const favesJsx = activeFaves.map((fave, index) => {
        return (<li key = {index}> {fave} </li>)
    })



    //if none display no faves message 

    //else display faves
    return (
        <div>
            {activeFaves.length < 1 ? 
                <p className = 'no-faves-message'> You have no current faves! Add new 
                ones below to easily search for your favorite foods. 
            </p> : <ul>
                {
                    
                  
                     favesJsx

                }
            </ul>
        
            
            }
        </div>
    )
}

export default CurrentFaves;