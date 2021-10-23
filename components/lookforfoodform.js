import React, {useRef} from "react";
import { useRouter } from "next/router"
import { getLocation } from "./findfoodfuncs/getlocation";
const LookforFoodForm = (props) => {

    const cuisineRef = useRef();
    const locationRef = useRef();
    const router = useRouter();

    function handleFoodSubmit (e){
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
        await getLocation(passCoordinatesToGoogle);
        
    }

    function passCoordinatesToGoogle(coordinates){
        console.log(coordinates)
    }
    return (

        <div className="specific-foodform-wrapper">
             <div>
                     <button onClick = {handleFaveInit}> <h3> Find food based on your faves </h3> </button>
                </div>
            
            <form onSubmit = {handleFoodSubmit} className="specific-food-form">
                <p> Or prefer something specific? </p>
                <div>
                    <label htmlFor ="cuisine"> What cuisine are you in the mood for?</label>
                    <input type="text" name = "cuisine" ref = {cuisineRef}/>
                </div>
               
                <div>
                    <button type = "submit"> Go! </button>
                </div>
            </form>
        </div>
    )
}

export default LookforFoodForm;

{/* <div>
<label htmlFor="locaton"> Location: </label>
 <input type = "text" name = "location" ref = {locationRef}/>
</div> */}