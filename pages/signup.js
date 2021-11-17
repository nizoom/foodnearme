import React, {useRef, useState} from "react";
import { signUp } from "../firebase/firebaseauth";
import { validateForm } from "../firebase/firebaseauth";
import { createUserinDB } from "../firebase/setdatafirebase";
import awth from "../firebase/clientApp";
import { useRouter } from "next/router";

import Image from 'next/image'
import logo from '../media/logo.png'
import waveTop from '../media/wavetop.png';
import waveBottom from '../media/wavebottom.png';




function signUpPage(){


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
            
            //this obj stores uid and any possible errors from creating an account
             const resultsObj = await signUp(emailValue, pwValue)
             
             if(resultsObj.error === false){ //no errors
                createUserinDB(usernameValue, emailValue, resultsObj.uid);
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
          
           
            {showErrs.length > 0 ? <h3>{showErrs}</h3>: null}

            <div>
          

                    <div className = 'logo-wrapper-login'>
                     <div className = 'logo-login'>
                        <Image src = {logo} layout = '' priority fixed = '1x'/>
                    </div>
                    </div>

                    <div className = 'wavetop-wrapper'>
                        <Image src = {waveTop}  className = 'wavetop' width = '256' height = '461' layout='responsive'/>
                    </div>

                    <div className = 'wavebottom-wrapper'>
                        <Image src = {waveBottom}  className = 'wavetop' width = '256' height = '461' layout='responsive'/>
                    </div>

                    <div>
                        <h1 className = 'instructional-header'> Sign up here</h1>
                    </div>

                    <div className = "signin-wrapper">
                        <form onSubmit= {handleSignup}>
                            <div className="group">
                                <label htmlFor="email" className='label'> Email:</label>
                                <input type="email" name = "email" ref = {emailRef} className = 'signin-inputs'/>
                            </div>

                            <div className="group">
                                <label htmlFor="username" className='label'> Username:</label>
                                <input type="text" name = "username" ref = {usernameRef} className = 'signin-inputs'/>
                            </div>
                            
                            <div className="group"> 
                                <label htmlFor="password" className='label'> Password: </label>
                                <input type="password" name="password" ref = {pwRef} className = 'signin-inputs'/> 
                            </div>
                            <div className="group"> 
                                <label htmlFor="pwcnfm" className='label'> Confirm Password: </label>
                                <input type="password" name="pwcfm" ref = {pwCfmRef} className = 'signin-inputs'/> 
                            </div>
                        <button type = "submit" className = 'signin-submit'> Submit </button>
                    <div>
                    <p> Or sign in with : </p>
                    <button className = 'gmail-btn'> Gmail </button>
                 
                    </div>
                </form>
            </div>
            </div>
           
        </div>
    )
}

export default signUpPage