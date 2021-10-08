import React, {useRef, useState} from "react";
// import auth from "../firebase/clientApp";
// import { getAuth } from "@firebase/auth";
import { signUp } from "../firebase/firebaseauth";
import { validateForm } from "../firebase/firebaseauth";
import awth from "../firebase/clientApp";

function signUpPage(){

    const emailRef = useRef();
    const pwRef = useRef();
    const pwCfmRef = useRef();

    const [showErrs, setShowErrs] = useState("")

    const handleSignup = async (event) => {
        event.preventDefault();
        console.log("signing up")

        const [emailValue, pwValue, pwCfmValue] = [emailRef.current.value,pwRef.current.value, pwCfmRef.current.value] 
        
        const possibleErrs = await validateForm(emailValue, pwValue, pwCfmValue)
        if(possibleErrs.length === 0){
             signUp(emailValue, pwValue)
        } else {
            //list all errors in a state hook
            //delete first 'and'
            let trimmedErrs = possibleErrs.substr(4)
            setShowErrs(possibleErrs)
        }
        
    }
    return(
        <div className = "signin-page-wrapper">
            <h1> Sign up here</h1>
            {showErrs.length > 0 ? <h3>{showErrs}</h3>: null}
            <div>
                <form onSubmit= {handleSignup}>
                    <div className="group">
                        <label htmlFor="email"> Email:</label>
                        <input type="email" name = "email" ref = {emailRef}/>
                    </div>
                    <div className="group"> 
                        <label htmlFor="password"> Password: </label>
                        <input type="password" name="password" ref = {pwRef}/> 
                    </div>
                    <div className="group"> 
                        <label htmlFor="pwcnfm"> Confirm Password: </label>
                        <input type="password" name="pwcfm" ref = {pwCfmRef}/> 
                    </div>
                <button type = "submit"> Submit </button>
            <div>
              <p> Or sign in with : </p>
              <button> Gmail </button>
              <button> Facebook </button>
            </div>
                </form>
            </div>
           
        </div>
    )
}

export default signUpPage