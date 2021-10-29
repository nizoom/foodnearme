import {getDatabase, ref, set} from "firebase/database"
import {app} from './clientApp.js'


export async function createUserinDB(name, email, uid){
    const db = getDatabase();
    let foodPreferenceState = {
        Indian : false,
        Italian : false,
        Japanese : false,  
        Chinese : false,
        Thai : false,
        Korean :    false,
        Mexican : false,
        American : false,
        Mediterranean : false, 
    }
    set(ref(db, 'users/' + uid), {
        username: name,
        email: email,
        preferences :  { foodPreferences : foodPreferenceState }
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


export function updateFoodPreferences(uid, foodPreferences){
    console.log('updating preferences')
    const db = getDatabase();
    //its creating an extra object instead of updating it
    set(ref(db, 'users/' + uid + `/preferences`), { 
        foodPreferences
    });

}