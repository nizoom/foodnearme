import { getDatabase, ref, child, get } from "firebase/database";

export async function getUserData(uid){
   //use get to find this user in the db
   const dbRef = ref(getDatabase());
   const userData = await get(child(dbRef, `users/${uid}`)).then((snapshot) => {
     if (snapshot.exists()) {
       //console.log(snapshot.val());
       return snapshot.val();
     } else {
       //user does not exist in realtime db
       console.log("No data available");
       return false
     }
   }).catch((error) => {
     console.error(error);
   });
   return userData;
}

