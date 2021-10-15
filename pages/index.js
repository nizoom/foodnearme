import {useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import LogoutBtn from '../components/logoutbtn'
import {useAuthState} from "react-firebase-hooks/auth"
import {getAuth} from "firebase/auth"
import { getUserData } from '../firebase/getdatafirebase'
import { formattedUid } from '../firebase/setdatafirebase'
import Script from 'next/script'

import { getServerSideProps } from './posts/[query]'
import Posts from './posts/[query]'

import FoodForm from '../components/foodform'

export default function Home() {
  
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState()
  
  //console.log(`Loading: ${loading} | Current user: ${user}`)
  
  const welcomeStatement = `Welcome ${username}, what are ya hungry for?`


  async function getDataFromUid (){
    const uid = formattedUid(JSON.stringify(user.uid))
    console.log(uid)
    const userData = await getUserData(uid)
    // console.log(userData)
    const name = userData.username;
    setUsername(name);


  }

  //maybe yuo take the params from the user and 
  //then use the context with the link 


  return (
    <div> 
      <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCjYaPndbfufJc-FoD7jZhA_FWa85FP2QA&libraries=places&callback=../apifuncs/getfood"
        />
        <LogoutBtn currentUser = {user}/>
        <h1 style = {{margin: "10px"}}>Welcome to Food Near Me</h1>
        
        {user !== null ? <h2>
          {welcomeStatement}
        </h2> : <h2 style = {{margin: "10px"}}> Log in and we'll handle the rest! </h2>}
          <FoodForm/>
    </div>
  )
}
//food form should be conditional 