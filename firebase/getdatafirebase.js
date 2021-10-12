import { getDatabase, ref, child, get } from "firebase/database";

export async function getUserData(uid){
   //use get to find this user in the db
   const dbRef = ref(getDatabase());
   const userData = await get(child(dbRef, `users/${uid}`)).then((snapshot) => {
     if (snapshot.exists()) {
       console.log(snapshot.val());
       return snapshot.val();
     } else {
       console.log("No data available");
       
     }
   }).catch((error) => {
     console.error(error);
   });
   return userData;
}

//once we have userinfo maybe use the snapshot 
//to listen on that logged in acc ..?