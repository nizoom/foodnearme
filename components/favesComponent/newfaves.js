import React, {useRef, useEffect} from "react";
import { updateFoodPreferences } from "../../firebase/setdatafirebase";

const FavesForm = (props) => {
    const favesObj = props.currentFavesState.foodPreferences


    console.log(favesObj)
    let activeFaves = [];

    // each checkbox needs to get its status from the favesObj because that is up to date 

    //to add new faves

    //default preferences
    let foodPreferenceState = {
        Indian : false,
        Italian : false,
        Japanese : false, 
        Chinese : false,
        Thai : false, 
        Korean : false,
        Mexican : false, 
        American : false,
        Mediterranean : false
    }

    function handleSavePreferences (e) {
        e.preventDefault();
         //call function to update preferences on firebase db 

        updateFoodPreferences(props.uid, foodPreferenceState)
    }

    function handleCheckChange(e){
        let checkStatus = e.target.checked;
        let foodType = e.target.value;
        //update state w o rerender
        foodPreferenceState.[foodType].status = checkStatus;
        
    }

    const checkRef = useRef();
    function assignCheck(){
        checkRef.current.checked = true;
    }

    const IndianRef = useRef();
    const ItalianRef = useRef()
    const JapaneseRef = useRef()
    const ChineseRef = useRef()
    const ThaiRef = useRef()
    const KoreanRef = useRef();
    const MexicanRef = useRef();
    const AmericanRef = useRef();
    const MediterraneanRef = useRef();


    useEffect (() => {
        for (const property in favesObj) {
            // console.log([property])
            if(favesObj[property].status){
                console.log(property)
                //find the index of the property
                //set checkbox to true
                assignCheckStatus(property)
            } 
        }
    }, [])

   

    function assignCheckStatus(cuisine){
       
       switch(cuisine){
           case 'Indian':
               IndianRef.current.checked = true;
               break;
           case 'Italian':
                ItalianRef.current.checked = true;
               break;
           case 'Japanese':
                JapaneseRef.current.checked = true;
               break;
            case 'Chinese':
                ChineseRef.current.checked = true;
               break;
            case 'Thai':
                ThaiRef.current.checked = true;
                break;
            case 'Korean':
                KoreanRef.current.checked = true;
                break;
            case 'Mexican':
                MexicanRef.current.checked = true;
                break;
            case 'American':
                AmericanRef.current.checked = true;
                break;
            case 'Mediterranean':
                Mediterranean.current.checked = true;
                break;

       }
        //console.log(allRefs[0].current)
        // = true;
    }
    // Indian : {status: false, index: 0},
    // Italian : {status: false, index: 1},
    // Japanese : {status: false, index: 2}, 
    // Chinese : {status: false, index: 3},
    // Thai : {status: false, index: 4}, 
    // Korean : {status: false, index: 5},
    // Mexican : {status: false, index: 6}, 
    // American : {status: false, index: 7},
    // Mediterranean : {status: false, index: 8}
   

    return (
        <div className = 'favesform-wrapper'>
            <form className = 'favesform' onSubmit = {handleSavePreferences}>
                <div className = 'new-fave-div'>
                    <label htmlFor='Indian'> Indian</label>
                    <input type="checkbox" name = 'Indian' value = 'Indian' onChange = {handleCheckChange} ref = {IndianRef}/>
                </div>
                <div className = 'new-fave-div'>
                    <label htmlFor='Japanese'> Japanese</label>
                    <input type="checkbox" name = 'Japanese' value = 'Japanese' onChange = {handleCheckChange} ref={JapaneseRef}/>
                </div>
                <div className = 'new-fave-div'>
                    <label htmlFor='Italian'> Italian</label>
                    <input type="checkbox" name = 'Italian'value = 'Italian' onChange = {handleCheckChange} ref={ItalianRef}/>
                </div>
                <div className = 'new-fave-div'>
                    <label htmlFor='Thai'> Thai</label>
                    <input type="checkbox" name = 'Thai'value = 'Thai' onChange = {handleCheckChange} ref={ThaiRef}/>
                </div>
                <div className = 'new-fave-div'>
                    <label htmlFor='Chinese'> Chinese</label>
                    <input type="checkbox" name = 'Chinese' value = 'Chinese' onChange = {handleCheckChange} ref={ChineseRef}/>
                </div>
                <div className = 'new-fave-div'>
                    <label htmlFor='Mexican'> Mexican</label>
                    <input type="checkbox" name = 'Mexican' value = 'Mexican' onChange = {handleCheckChange} ref={MexicanRef}/>
                </div>
                <div className = 'new-fave-div'>
                    <label htmlFor='American'> American</label>
                    <input type="checkbox" name = 'American' value = 'American' onChange = {handleCheckChange} ref={AmericanRef}/>
                </div>
                <div className = 'new-fave-div'>
                    <label htmlFor='Korean'> Korean</label>
                    <input type="checkbox" name = 'Korean'value = 'Korean' onChange = {handleCheckChange} ref={KoreanRef}/>
                </div>
                <div className = 'new-fave-div'>
                    <label htmlFor='Mediterranean'> Mediterranean</label>
                    <input type="checkbox" name = 'Mediterranean' value = 'Mediterranean' onChange = {handleCheckChange} ref={MediterraneanRef}/>
                </div>
                <button type = "submit"> Save preferences </button>
            </form>

            <div className = 'test'>
                    <label htmlFor='test'> test</label>
                    <input type="checkbox" name = 'test' value = 'test' ref = {checkRef}/>
                </div>
            
            <button onClick = {assignCheck}> set checkbox status</button>
        </div>
    )
}

export default FavesForm

   // (function () {
    //     for (const property in favesObj) {
    //        // console.log([property])
    //         if(favesObj[property]){
                
    //             activeFaves.push([property])
    //         } else {
    //             //activeFaves.push(`${property} is not an active fave`)
    //         }
    //     }
    // })();

    // console.log(activeFaves)