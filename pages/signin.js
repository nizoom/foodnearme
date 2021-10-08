import React, {useRef, useState} from "react";
import auth from "../firebase/clientApp";
import Link from "next/link"
import { signIn } from "../firebase/firebaseauth";
import { validateForm } from "../firebase/firebaseauth";

function SignInScreen() {

  const emailRef = useRef();
  const pwRef = useRef();

  const [showErrs, setShowErrs] = useState("");

  const handleSignin = async (event) => {
    event.preventDefault();
    const [emailValue, pwValue] = [emailRef.current.value, pwRef.current.value]
    const possibleErrs = validateForm(emailValue, pwValue, "...") //no pw confirmation here -> blank last arguement
    if(possibleErrs.length === 0 ){
      //signIn(emailValue, pwValue);
    } else {
      let trimmedErrs = possibleErrs.substr(4)
      setShowErrs(trimmedErrs)
    }
  }

    return (
      <div className="signin-page-wrapper">
        
        <h1> Please sign in</h1>
        <div className = "signin-wrapper">
          {showErrs.length > 0 ? <p> {showErrs} </p> : null}
          <form onSubmit = {handleSignin}>
            <div className="group"> 
              <label htmlFor="email"> Email :</label>
              <input type = "email" name="email" ref = {emailRef}/> 
            </div>
            
            <div className="group"> 
              <label htmlFor="password"> Password </label>
              <input type="password" name="password" ref={pwRef}/> 
            </div>
            <button type = "submit"> Submit </button>
            <div>
              <p> Or sign in with : </p>
              <button> Gmail </button>
              <button> Facebook </button>
            </div> 
          </form>
          <div>
            <Link href="/signup">
              <a>
                <p> Don't have an account? Sign up here </p>
              </a>
            </Link>
          </div>
        </div>
      </div>
    )
  }
  
  export default SignInScreen;