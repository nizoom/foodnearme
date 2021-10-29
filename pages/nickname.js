import React, {useRef} from "react"
import { postName } from "../firebase/setdatafirebase";
import { createUserinDB } from "../firebase/setdatafirebase";
import {useAuthState} from "react-firebase-hooks/auth"
import {getAuth} from "firebase/auth"

const NickNamePage = (props) => { // for ppl who login w gmail or fb and don't have a nickname set

    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);
    const nameRef = useRef();

    function handleNameSubmit(event){
        event.preventDefault();
        const name = nameRef.current.value;
        console.log(nameRef.current.value)
        createUserinDB(name, user.email, user.uid)
    } 
    return(
        <div className = "nickname-page-wrapper">
            <h2>This is your first time signing in. Please enter a username.</h2>
            <p> Don't worry - you won't need to remember it</p>
            <form onSubmit={handleNameSubmit}>
                <input type = "text" ref = {nameRef}></input>
                <button type = "submit"> Submit </button>
            </form>
        </div>
    )
}

export default NickNamePage;