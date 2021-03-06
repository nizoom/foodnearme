import React, {useRef, useState} from "react";
import auth from "../firebase/clientApp";
import Link from "next/link"
import { useRouter } from "next/router"
import { signIn, validateForm, GoogleSignin, FacebookSignin } from "../firebase/firebaseauth";
import Image from 'next/image'
import logo from '../media/logo.png'
import waveTop from '../media/wavetop.png';
import waveBottom from '../media/wavebottom.png';

function SignInScreen() {

  const emailRef = useRef();
  const pwRef = useRef();
  const router = useRouter();

  const [showErrs, setShowErrs] = useState("");

  const handleSignin = async (event) => {
    event.preventDefault();
    const [emailValue, pwValue] = [emailRef.current.value, pwRef.current.value]
    const possibleErrs = validateForm(emailValue, pwValue, "...") //no pw confirmation here -> blank last arguement
    if(possibleErrs.length === 0 ){
      let result = await signIn(emailValue, pwValue);
      if(result){ // if successful then go to home page
        router.push("/")
      }
    } else {
      let trimmedErrs = possibleErrs.substr(4)
      setShowErrs(trimmedErrs) // may want to make this a ul for each err
    }
  }

  const handleFirebaseLogin = async (e, loginMethod) => {
    e.preventDefault()
    // console.log(loginMethod)

    if(loginMethod === "Gmail"){
      const result = await GoogleSignin()
      if(!result){ //if google sign in for the fist time -> then nickname needs to be set
        router.push('./nickname')
      } else {
        console.log(result)
        resolveLogin(result)
      }
   
    } else {
      const result = await FacebookSignin();
      console.log(result)
      resolveLogin(result)
    }
  }

  function resolveLogin(attemptResult){
    //if successful
    if(attemptResult){
      router.push('/')
    } else {
      //err handling 
    }
  }
  

    return (
      <div className="signin-page-wrapper">
        
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
        
        <h1 className = 'instructional-header'> Please sign in</h1>
        <div className = "signin-wrapper">
          {showErrs.length > 0 ? <p className='err-message'> {showErrs} </p> : null}
          <form onSubmit = {handleSignin}>
            <div className="group"> 
              <label htmlFor="email" className='label'> Email:</label>
              <input type = "email" name="email" ref = {emailRef} className = 'signin-inputs'/> 
            </div>
            
            <div className="group"> 
              <label htmlFor="password" className = 'label'> Password: </label>
              <input type="password" name="password" ref={pwRef} className = 'signin-inputs'/> 
            </div>
            <button type = "submit" className = 'signin-submit'> Submit </button>
            <div>
              <p className = 'instructional-p'> Or sign in with Google: </p>
              <button className = 'gmail-btn'onClick = {() => handleFirebaseLogin(event, "Gmail")}> Gmail </button>
            </div> 
          </form>
          <div>
          <div className = 'gmail-section'>
            <p className = 'create-account-p'> Don't have an account? Sign up 
            <Link href="/signup">
              <a>
            <span> here.</span> 
              </a>
            </Link>
            </p>
          </div>
          
          </div>
        </div>
      </div>
    )
  }
  
  export default SignInScreen;

  //               <button onClick= {() => handleFirebaseLogin(event, "Facebook")}> Facebook </button>
