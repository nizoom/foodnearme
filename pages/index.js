import {useState, useEffect } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import LogoutBtn from '../components/logoutbtn'
import {useAuthState} from "react-firebase-hooks/auth"
import {getAuth} from "firebase/auth"
import { getUserData } from '../firebase/getdatafirebase'
import { formattedUid } from '../firebase/setdatafirebase'


import SelectionUI from '../components/selectionUI'
import FaveSection from '../components/favesComponent/favesection'

export default function Home() {
  
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const [username, setUsername] = useState()
  const [foodPrefsFromDB, setFoodPrefsFromDB] = useState(null);
  const [userID, setUserID] = useState()
  
  //console.log(`Loading: ${loading} | Current user: ${user}`)
  
  const welcomeStatement = `Welcome ${username}, search for food based on your: `


  async function getDataFromUid (){

    const uid = formattedUid(JSON.stringify(user.uid))
    setUserID(uid);
   
    const userData = await getUserData(uid)

    console.log(userData)
    setFoodPrefsFromDB(userData.preferences.foodPreferences);
   
    const name = userData.username;
    setUsername(name);
  }

  useEffect(() => {
    user !== null ? getDataFromUid() : null
  }, [user])

  function logoutClearsScreen(){
    setFoodPrefsFromDB(null)
  }

  const mapsLibraryScript = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_KEY}&libraries=places`

  function noFaveHandler(){ // if user submits a faves request without any saved faves
    console.log('save some faves below or try a specific cuisine')
  }
  return (
    <div> 
        <Head>
            <script async defer src ={mapsLibraryScript}/>
          </Head>

        <LogoutBtn currentUser = {user} clearHomeScreen = {logoutClearsScreen}/>
        <h1 style = {{margin: "10px"}}>Welcome to Food Near Me</h1>
        
        {foodPrefsFromDB === null ? <h2 style = {{margin: "10px"}}> Log in and we'll handle the rest! </h2> :
          <div> 
            <h2 style = {{margin: '10px'}}>
            {welcomeStatement}</h2> 
              
            <SelectionUI currentFavesState = {foodPrefsFromDB} noFaves={noFaveHandler}/>
            
            <FaveSection currentFavesState = {foodPrefsFromDB} uid = {userID}/> 
          </div>
          }
        
          
    </div>
  )
}
