import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  
  return (
    <div> 
        <h1>HELLO</h1>
        <h1>The value of customKey is:</h1>
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
