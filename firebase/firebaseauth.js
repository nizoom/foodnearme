import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";


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
    emptyString : false,
    pwMismatch : false,
    invalidEmail: false,
    invalidPw: false,
  }
  //console.log(arguments)
  //empty str
  Array.from(arguments).forEach(arg => {
    if(arg.length < 1){
      error.emptyString = true;
    }
  })
  //pwMismatch
   if(pw!==cfmpw){
     error.pwMismatch = true;
   } 
   //invalid email
   if(!email.includes("@") || !email.includes(".")
   ||email.length < 5){
      error.invalidEmail = true;
   }

   if(pw.length < 5){
     error.invalidPw = true;
   }

   //return errs that are true
   let errsList = ""
   for(const property in error){
     if(error[property]){
       //add to list of errors that're true / actually happened
      // errsList.push(property)
      errsList += `and ${property}`
     }
   }
   console.log(errsList)
   return errsList
}