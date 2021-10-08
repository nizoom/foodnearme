import React from "react";
import auth from "../firebase/clientApp";
import Link from "next/link"




function SignInScreen() {
    return (
      <div className="signin-page-wrapper">
        
        <h2> Please sign in</h2>
        <div className = "signin-wrapper">
          <form>
            <div className="group"> 
              <label htmlFor="email"> Email :</label>
              <input type = "email" name="email"/> 
            </div>
            
            <div className="group"> 
              <label htmlFor="password"> Password </label>
              <input type="password" name="password"/> 
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