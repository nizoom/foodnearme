import { getDatabase, ref, child, get } from "firebase/database";

export async function getUserData(email){
   //use get to find this user in the db
   const dbRef = ref(getDatabase());
   get(child(dbRef, `users/`)).then((snapshot) => {
     if (snapshot.exists()) {
       console.log(snapshot.val());
     } else {
       console.log("No data available");
     }
   }).catch((error) => {
     console.error(error);
   });
}

//once we have userinfo maybe use the snapshot 
//to listen on that logged in acc ..?