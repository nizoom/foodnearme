import React, {useRef} from "react"
import { postName } from "../firebase/setdatafirebase";
import { createUserinDB } from "../firebase/setdatafirebase";
const NickNamePage = (props) => { // for ppl who login w gmail or fb and don't have a nickname set

    const nameRef = useRef();

    function handleNameSubmit(event){
        event.preventDefault();
        console.log(nameRef.current.value)
        //createUserinDB();
    } 
    return(
        <div className = "nickname-page-wrapper">
            <h2>What would you like us to call you?</h2>
            <form onSubmit={handleNameSubmit}>
                <input type = "text" ref = {nameRef}></input>
                <button type = "submit"> Submit </button>
            </form>
        </div>
    )
}

export default NickNamePage;