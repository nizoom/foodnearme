import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import LogoutBtn from '../components/logoutbtn'
import {useAuthState} from "react-firebase-hooks/auth"
import {getAuth} from "firebase/auth"

export default function Home() {
  
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  
  console.log(`Loading: ${loading} | Current user: ${user}`)
  
  const welcomeStatement = `Welcome ${JSON.stringify(user)}, what are ya hungry for?
  `
  return (
    <div> 
        <LogoutBtn currentUser = {user}/>
        <h1 style = {{margin: "10px"}}>Welcome to the home page</h1>
        {user !== null ? <h2>
          {welcomeStatement}
        </h2> : null}
    </div>
  )
}

  // const clientCredentials = {
    //     apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    //     authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    //     projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    //     storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    //     messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    //     appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    //     measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
    //   }
