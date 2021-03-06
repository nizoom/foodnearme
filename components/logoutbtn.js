import React, {useState, useRef, useEffect} from "react";
import { logout } from "../firebase/firebaseauth";
import auth from "../firebase/clientApp";
import { useRouter } from "next/router";

const LogoutBtn = (props) => {

    const [btnText, setBtnText] = useState()

    //const btnTextRef = useRef('');

    useEffect(() => {
        if(props.currentUser === null){
            setBtnText("Login")
        } else {
            setBtnText("Logout")
        }
        
        
    }, [props.currentUser])

    const router = useRouter();

    function handleBtnClick (){
    //if btnText === Login then to go signin page and change state
        if(btnText==="Login"){
            router.push("/signin")
        } else {
            logout();
            props.clearHomeScreen()
        }
    
    }
    return(
        <div className='login-out-btn-wrapper'>
            <button onClick = {handleBtnClick}> {btnText} </button>
        </div>
    )
}

export default LogoutBtn;