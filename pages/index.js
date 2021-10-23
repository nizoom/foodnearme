import {useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import LogoutBtn from '../components/logoutbtn'
import {useAuthState} from "react-firebase-hooks/auth"
import {getAuth} from "firebase/auth"
import { getUserData } from '../firebase/getdatafirebase'
import { formattedUid } from '../firebase/setdatafirebase'
import Script from 'next/script'


import SpecificFoodForm from '../components/lookforfoodform'
import FaveSection from '../components/favesComponent/favesection'

export default function Home() {
  
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState()
  const [foodPrefsFromDB, setFoodPrefsFromDB] = useState(null);
  const [userID, setUserID] = useState()
  
  //console.log(`Loading: ${loading} | Current user: ${user}`)
  
  const welcomeStatement = `Welcome ${username}, what are ya hungry for?`


  async function getDataFromUid (){
    console.log('fired')

    const uid = formattedUid(JSON.stringify(user.uid))
    setUserID(uid);
    const userData = await getUserData(uid)

    //console.log(userData)
    setFoodPrefsFromDB(userData.foodPreferences);
    const name = userData.username;
    setUsername(name);
  }

  useEffect(() => {
    console.log(user)
    user !== null ? getDataFromUid() : null
  }, [user])

  function logoutClearsScreen(){
    setFoodPrefsFromDB(null)
  }

  const mapsLibraryScript = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}&libraries=places&callback=../apifuncs/getfood`

  return (
    <div> 
      
        <LogoutBtn currentUser = {user} clearHomeScreen = {logoutClearsScreen}/>
        <h1 style = {{margin: "10px"}}>Welcome to Food Near Me</h1>
        
        {foodPrefsFromDB === null ? <h2 style = {{margin: "10px"}}> Log in and we'll handle the rest! </h2> :
          <div> 
            <h2 style = {{margin: '10px'}}>
            {welcomeStatement}</h2> 
              
            <SpecificFoodForm/>
            
            <FaveSection currentFavesState = {foodPrefsFromDB} uid = {userID}/> 
          </div>
          }
          
          <Script src= {mapsLibraryScript}
        />
        
          
    </div>
  )
}

{/* <>
<Script src={placesLibraryScript} />
</> */}

//const placesLibraryScript = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}&libraries=places&callback=`
