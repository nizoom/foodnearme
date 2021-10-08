import { getApp } from "@firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export function signIn(email, password){
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

}
export function signUp(email, password){

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
}


export function validateForm(email, pw, cfmpw){
 
  let error = {
    emptyString : [false, "Please make sure all fields are filled in"], 
    pwMismatch : [false, "These passwords don't match"],
    invalidEmail: [false, "Please enter a valid email"],
    invalidPw: [false, "Password must be longer than 4 characters"],
  }
  //console.log(arguments)

  //empty str
  Array.from(arguments).forEach(arg => {
    if(arg.length < 1){
      error.emptyString[0] = true;
    }
  })
  //pwMismatch
  if(cfmpw !== "..."){ // signup form requires cfmpw
    if(pw!==cfmpw){
      error.pwMismatch[0] = true;
    } 
  }
   
   //invalid email
   if(!email.includes("@") || !email.includes(".")
   ||email.length < 5){
      error.invalidEmail[0] = true;
   }

   if(pw.length < 5){
     error.invalidPw[0] = true;
   }

   //return errs that are true
   let errsList = ""
   for(const property in error){
     if(error[property][0]){
       //add to list of errors that're true / actually happened
      // errsList.push(property)
      errsList += `and ${error[property][1]} `
     }
   }
   console.log(errsList)
   return errsList
}