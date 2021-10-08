import React, {useState} from "react";
import { logout } from "../firebase/firebaseauth";
import auth from "../firebase/clientApp";
import { useRouter } from "next/router";

const LogoutBtn = () => {

    const [btnText, setBtnText] = useState("Login")

    const router = useRouter();

    function handleBtnClick (){
        //if btnText === Login then to go signin page and change state
        if(btnText === "Login"){
            setBtnText("Logout")
            router.push("/signin")
        } else {  // else call logout function and change state
            logout()
            setBtnText("Login")

        }

    }
    return(
        <div>
            <button onClick = {handleBtnClick}
             style = {{float: "right", margin: "10px", padding: "10px"}}> {btnText} </button>
        </div>
    )
}

export default LogoutBtn;