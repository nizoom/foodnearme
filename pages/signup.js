import React, {useRef, useState} from "react";
import { signUp } from "../firebase/firebaseauth";
import { validateForm } from "../firebase/firebaseauth";
import { createUserinDB } from "../firebase/setdatafirebase";
import awth from "../firebase/clientApp";
import { useRouter } from "next/router";

import {useAuthState} from "react-firebase-hooks/auth"
import {getAuth} from "firebase/auth"


function signUpPage(){
    //hook to get userid once the accoutn is created
    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);

    const router = useRouter();

    //input refs 
    const emailRef = useRef();
    const pwRef = useRef();
    const pwCfmRef = useRef();
    const usernameRef = useRef();

    const [showErrs, setShowErrs] = useState("")

    const handleSignup = async (event) => {
        event.preventDefault();
        console.log("signing up")

        const [emailValue, pwValue, pwCfmValue, usernameValue] = [emailRef.current.value,pwRef.current.value, pwCfmRef.current.value, usernameRef.current.value] 
        
        const possibleErrs = await validateForm(emailValue, pwValue, pwCfmValue, usernameValue)
        if(possibleErrs.length === 0){
             const success = await signUp(emailValue, pwValue)
             
             if(success){
             createUserinDB(usernameValue, emailValue, JSON.stringify(user.uid))
             router.push('/signin')
             }
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
                        <label htmlFor="username"> Username:</label>
                        <input type="text" name = "username" ref = {usernameRef}/>
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