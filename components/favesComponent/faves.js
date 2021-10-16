import React from "react";

const FavesForm = (props) => {
    //to add new faves

    //default preferences
    let foodPreferenceState = {
        Indian : false, Italian : false,
        Japanese : false, Chinese : false,
        Thai : false, Korean : false,
        Mexican : false, American : false,
        Mediterranean : false
    }

    function handleSavePreferences (e) {
        e.preventDefault();
        //call function to update preferences on firebase db 
    }

    function handleCheckChange(e){
        let checkStatus = e.target.checked;
        let foodType = e.target.value;
        //update state w o rerender
        foodPreferenceState.[foodType] = checkStatus;
        
    }

    return (
        <div className = 'favesform-wrapper'>
            <form className = 'favesform' onSubmit = {handleSavePreferences}>
                <div className = 'new-fave-div'>
                    <label htmlFor='Indian'> Indian</label>
                    <input type="checkbox" name = 'Indian' value = 'Indian' onChange = {handleCheckChange}/>
                </div>
                <div className = 'new-fave-div'>
                    <label htmlFor='Japanese'> Japanese</label>
                    <input type="checkbox" name = 'Japanese' value = 'Japanese' onChange = {handleCheckChange}/>
                </div>
                <div className = 'new-fave-div'>
                    <label htmlFor='Italian'> Italian</label>
                    <input type="checkbox" name = 'Italian'value = 'Italian' onChange = {handleCheckChange}/>
                </div>
                <div className = 'new-fave-div'>
                    <label htmlFor='Thai'> Thai</label>
                    <input type="checkbox" name = 'Thai'value = 'Thai' onChange = {handleCheckChange}/>
                </div>
                <div className = 'new-fave-div'>
                    <label htmlFor='Chinese'> Chinese</label>
                    <input type="checkbox" name = 'Chinese' value = 'Chinese' onChange = {handleCheckChange}/>
                </div>
                <div className = 'new-fave-div'>
                    <label htmlFor='Mexican'> Mexican</label>
                    <input type="checkbox" name = 'Mexican' value = 'Mexican' onChange = {handleCheckChange}/>
                </div>
                <div className = 'new-fave-div'>
                    <label htmlFor='American'> American</label>
                    <input type="checkbox" name = 'American' value = 'American' onChange = {handleCheckChange}/>
                </div>
                <div className = 'new-fave-div'>
                    <label htmlFor='Korean'> Korean</label>
                    <input type="checkbox" name = 'Korean'value = 'Korean' onChange = {handleCheckChange}/>
                </div>
                <div className = 'new-fave-div'>
                    <label htmlFor='Mediterranean'> Mediterranean</label>
                    <input type="checkbox" name = 'Mediterranean' value = 'Mediterranean' onChange = {handleCheckChange}/>
                </div>
                <button type = "submit"> Save preferences </button>
            </form>
            
            
        </div>
    )
}

export default FavesForm