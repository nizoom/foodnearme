import {getDatabase, ref, set} from "firebase/database"
import {app} from './clientApp.js'

export async function createUserinDB(name, email){
    //create userID#
    let userId = '';
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    for(let i = 0 ; i < 8 ; i++){
        let randomIndex = Math.floor(Math.random() * 26);
        // if 0 then return the random number else return 
        // the letter in the alphabet corresponding to that random index
        const lettersOrNums = Math.floor(Math.random() * 2)
        if(lettersOrNums --- 0 ){
            userId += randomIndex
        } else {
            userId += alphabet[randomIndex]
        }

    }
    console.log(userId)
    const db = getDatabase();
    set(ref(db, 'users/' + userId), {
        username: name,
        email: email,
    });
}
    

export async function postName(){
    const database  = getDatabase(app)

}