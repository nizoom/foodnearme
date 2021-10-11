import React, {useRef} from "react"

const NickNamePage = (props) => {

    const nameRef = useRef();

    function handleNameSubmit(event){
        event.preventDefault();
        console.log(nameRef.current.value)
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