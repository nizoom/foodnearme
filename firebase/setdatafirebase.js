import {getDatabase, ref, set} from "firebase/database"
import {app} from './clientApp.js'


export async function createUserinDB(name, email, uid){
    const db = getDatabase();
    let foodPreferenceState = {
<<<<<<< HEAD
        Indian : false,
        Italian : false,
        Japanese : false,  
        Chinese : false,
        Thai : false,
        Korean :    false,
        Mexican : false,
        American : false,
        Mediterranean : false, 
=======
        Indian : {status: false, index: 0},
        Italian : {status: false, index: 1},
        Japanese : {status: false, index: 2}, 
        Chinese : {status: false, index: 3},
        Thai : {status: false, index: 4}, 
        Korean : {status: false, index: 5},
        Mexican : {status: false, index: 6}, 
        American : {status: false, index: 7},
        Mediterranean : {status: false, index: 8}
>>>>>>> 58efff368e90ac62cea2514485e1661857e4e620
    }
    set(ref(db, 'users/' + uid), {
        username: name,
        email: email,
        foodPreferences : foodPreferenceState
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


export function updateFoodPreferences(uid, newfoodobprefs){
    console.log('updating preferences')
    const db = getDatabase();

    set(ref(db, 'users/' + uid + '/foodPreferences'), {
        foodPreferences : newfoodobprefs
    });

}