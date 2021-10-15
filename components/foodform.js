import React, {useRef} from "react";


const FoodForm = (props) => {

    const cuisineRef = useRef();
    const locationRef = useRef();

    function handleFoodSubmit (e){
        e.preventDefault();
        const [cuisineValue, locationValue] = [cuisineRef.current.value, locationRef.current.value]
        console.log("submitted")
        console.log(`${cuisineValue} and ${locationValue}`)

    }
    return (
        <div className="foodform-wrapper">
            <form onSubmit = {handleFoodSubmit} className="foodform-form">
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

export default FoodForm;