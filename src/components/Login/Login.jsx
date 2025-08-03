import React, { useState } from 'react'
import './Login.css'
import { assets } from '../../assets/assets'
import { useNavigate } from 'react-router-dom'
import Context from '../context/Context'



const LoginPopup = () => {
    const [currState, setcurrState] = useState("Login")
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginUserData, setLoginUserData] = useState("")

    console.log(loginUserData);


    const navigate = useNavigate()
    function submitFormData(e) {
        e.preventDefault()
        if (currState === "Login") {
            fetch("https://insta-backend-60gi.onrender.com/singin", {
                method: "Post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
                .then((res) => res.json())

                .then((data) => {

                    // localStorage.setItem("jwt", data.token)
                    console.log("jwt", data.dbUser._id);
                    setLoginUserData(data.dbUser)
                    if (data.token) {
                        localStorage.setItem("jwt", data.token);
                        navigate("/home"); // 👈 navigate after success

                    } else {
                        alert(data.message || "Something went wrong");
                    }

                })

        } else {
            fetch("https://insta-backend-60gi.onrender.com/singup", {
                method: "Post",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password, username })
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
            setcurrState("Login")
        }
    }
    return (

        <div className='login-popup'>
            <form className="login-popup-container" onSubmit={submitFormData}>
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img src={assets.cross_icon} alt="" />
                </div>

                <div className="login-popup-input">
                    {currState === "Login" ? <></> : <input type="text" placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)} required />}

                    {currState === "Login" ? <></> : <input type="text" placeholder='Enter username' value={username} onChange={(e) => setUsername(e.target.value)} required />}

                    <input type="email" placeholder='Your email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    <input type="password" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>


                <button type='submit' >{currState === "Sign Up" ? "Create account" : "Login"}</button>
                <div className='login-popup-condition'>
                    <input type="checkbox" required />
                    <p>By continuing, i agree to thr terms of use & privacy policy.</p>
                </div>
                {currState === "Login"
                    ? <p>Creare a new account? <span onClick={() => setcurrState("Sign Up")}>Click here</span></p>
                    : <p>Already have an account? <span onClick={() => setcurrState("Login")}>Login here</span></p>
                }
            </form>
        </div>

    )
}

export default LoginPopup
