import { getApp } from "@firebase/app";
import { FacebookAuthProvider, GoogleAuthProvider, signOut, getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getUserData } from "./getdatafirebase";
import { createUserinDB } from "./setdatafirebase";

export async function signIn(email, password){
  const auth = getAuth();

  let result = await signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    //console.log(user)
    return true; // successful sign in
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage)
    return false; 
  });
  return result;
}
export async function signUp(email, password){

    const auth = getAuth();

    //stores the results of the signup attempt
    let resultsObject = {
      error: false, errorMessage: '', errorCode: '',
      uid: ''
    }
    await createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
      
        resultsObject.uid = user.uid;

        return resultsObject;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // console.log(`${errorCode}: ${errorMessage}`)
        resultsObject.error = true;
        resultsObject.errorCode = errorCode;
        resultsObject.errorMessage = errorMessage;
        return resultsObject;

      });
      console.log(resultsObject)
      return resultsObject;
}


export function logout(){
  const auth = getAuth();
  console.log("logging out")
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });
}

export function validateForm(email, pw, cfmpw, username){
 
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


export async function GoogleSignin(){
  const provider = new GoogleAuthProvider();
  const auth = getAuth();
  const result = await signInWithPopup(auth, provider)
  .then(async (result) => {
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    // The signed-in user info.
    const user = result.user;
    
    //search realtime db for user id 
    const doesUserExist = await getUserData(user.uid)
    
    //if it does not exist an entry needs to be created and we need to prompt the user with nickname screen 
    if(!doesUserExist){
        //go to nick name page
        return false
    } //else 
    return user;
  
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
    console.log(`error - ${errorCode}: ${errorMessage}`)
    return `error.message`
  });
  
  return result;
}

export async function FacebookSignin(){
  const provider = new FacebookAuthProvider();

  const auth = getAuth();

  const result = await signInWithPopup(auth, provider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;

    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
    console.log(user)
    return true;
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);
    console.log(`error - ${errorCode}: ${errorMessage}`)
    return false;
    // ...
  });
  return result
}