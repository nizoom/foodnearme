import {getDatabase, ref, set} from "firebase/database"
import {app} from './clientApp.js'


export async function createUserinDB(name, email, uid){
    const db = getDatabase();
    set(ref(db, 'users/' + uid), {
        username: name,
        email: email,
    });
}
    


//delete quote marks from JSON.stringify through formattedUid()

export function formattedUid(uid) {
    const deletefirstquote = uid.substring(1)
    const deletelastquote = deletefirstquote.slice(0, -1);
    return deletelastquote
}

export async function postName(){
    const database  = getDatabase(app)

}


 //create userID#
    // let userId = '';
    // const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    // for(let i = 0 ; i < 8 ; i++){
    //     let randomIndex = Math.floor(Math.random() * 26);
    //     // if 0 then return the random number else return 
    //     // the letter in the alphabet corresponding to that random index
    //     const lettersOrNums = Math.floor(Math.random() * 2)
    //     if(lettersOrNums --- 0 ){
    //         userId += randomIndex
    //     } else {
    //         userId += alphabet[randomIndex]
    //     }

    // }