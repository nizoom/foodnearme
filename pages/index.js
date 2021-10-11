import { useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import LogoutBtn from '../components/logoutbtn'
import {useAuthState} from "react-firebase-hooks/auth"
import {getAuth} from "firebase/auth"
import { getUserData } from '../firebase/getdatafirebase'
import { formattedUid } from '../firebase/setdatafirebase'

export default function Home() {
  
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  
  //console.log(`Loading: ${loading} | Current user: ${user}`)
  
  const welcomeStatement = `Welcome ${JSON.stringify(user)}, what are ya hungry for?`


  useEffect(() => {
    function getDataFromEmail (){
      const uid = formattedUid(JSON.stringify(user.uid))
      console.log(uid)
      ///getUserData()
    }
  })

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
