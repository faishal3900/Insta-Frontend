// src/context/Context.js

import React, { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

export const ThemeContext = createContext();

const ThemeProvider = ({ children, },) => {

    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);

    const [dark, setDark] = useState(true);
    const toggleTheme = () => setDark(!dark);

    const [followId, setFollow] = useState()
    const [following, setFollowing] = useState([])
    const [followFiar, setFollowFiar] = useState(true)

    const [comment, setComment] = useState(true)
    const btnComment = () => setComment(!comment)

    const [user, setUser] = useState({});

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginUserData, setLoginUserData] = useState("")
    const [currState, setcurrState] = useState("Login")

    function loginFunction(navigate) {
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
                        navigate("/home")
                            .finally(() => setLoading(false));
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
                .finally(() => setLoading(false));
            setcurrState("Login")
        }
    }

    function followFun() {
        fetch("https://insta-backend-60gi.onrender.com/follow", {
            method: "Put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({ followId })
        })
            .then(res => res.json())
            .then((data) => {

                setUser(data)
                setFollowing(data.following)
            })
    }
    useEffect(() => {
        followFun()
    }, [followId, followFiar]);

    const [allPostdata, setAllPostData] = useState([]);
    function submitFormData(e) {
        setLoading(true);
        fetch("https://insta-backend-60gi.onrender.com/allpost", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => res.json())
            .then((data) => { setAllPostData(data.posts.reverse()) })
            .finally(() => setLoading(false));

    }
    useEffect(() => {
        // console.log("hello");
        submitFormData();
    }, [allPostdata.posts]);



    return (
        <ThemeContext.Provider value={
            {
                dark,
                toggleTheme,
                comment,
                btnComment,
                user,
                setUser,
                followId,
                setFollow,
                following,
                followFun,
                followFiar,
                setFollowFiar,
                ///// allpost ke liye
                allPostdata,
                setAllPostData,
                loading,
                ///////login ke liye 
                name, setName,
                username, setUsername,
                email, setEmail,
                password, setPassword,
                loginUserData, setLoginUserData,
                currState, setcurrState,
                loginFunction,
                btnLoading,
                setBtnLoading
            }
        }>
            {children}
        </ThemeContext.Provider>
    );
};

export const useAuth = () => useContext(ThemeContext);
export default ThemeProvider;
