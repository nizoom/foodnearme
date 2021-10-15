import React, {useRef} from "react";
import { useRouter } from "next/router"


const SpecificFoodForm = (props) => {

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

    function handleFaveInit(){
        console.log('finding places based on preferences')
    }
    return (

        <div className="specific-foodform-wrapper">
             <div>
                     <button onClick = {handleFaveInit}> <h3> Find food based on your faves </h3> </button>
                </div>
            
            <form onSubmit = {handleFoodSubmit} className="specific-food-form">
                <p> Prefer something specific? </p>
                <div>
                    <label htmlFor ="cuisine"> What cuisine are you in the mood for?</label>
                    <input type="text" name = "cuisine" ref = {cuisineRef}/>
                </div>
                <div>
                    <label htmlFor="locaton"> Location: </label>
                     <input type = "text" name = "location" ref = {locationRef}/>
                </div>
                <div>
                    <button type = "submit"> Submit </button>
                </div>
            </form>
        </div>
    )
}

export default SpecificFoodForm;