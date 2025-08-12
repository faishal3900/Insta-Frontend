// src/context/Context.js

import React, { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';

export const ThemeContext = createContext();
export const useAuth = () => useContext(ThemeContext);

const ThemeProvider = ({ children, },) => {

    const [loading, setLoading] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);

    const [dark, setDark] = useState(true);
    const toggleTheme = () => setDark(!dark);

    const [followId, setFollow] = useState()
    const [following, setFollowing] = useState([])
    const [followFiar, setFollowFiar] = useState(true)

    console.log(following)

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

                    setLoginUserData(data.dbUser)
                    if (data.token) {
                        localStorage.setItem("jwt", data.token);
                        submitFormData()
                        allUserData()
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
                body: JSON.stringify({ name, email, password })
            })
                .then((res) => res.json())
                .then((data) => console.log(data, "add ho gaya "))
                .finally(() => setLoading(false));
            setcurrState("Login")
        }
    }

    function followFun() {
        const token = localStorage.getItem("jwt");
        if (!token) return;
        fetch("https://insta-backend-60gi.onrender.com/follow", {
            method: "Put",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify({ followId })
        })
            .then(res => res.json())
            .then((data) => {

                setUser(data)
                setFollowing(data.following)
                console.log(data.following);

            })
    }
    useEffect(() => {
        followFun()
        console.log(following);

    }, [followId, followFiar]);

    const [allPostdata, setAllPostData] = useState([]);
    function submitFormData(e) {
        const token = localStorage.getItem("jwt");
        setLoading(true);
        if (!token) return;
        fetch("https://insta-backend-60gi.onrender.com/allpost", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then((res) => res.json())
            .then((data) => { setAllPostData(data.posts.reverse()) })
            .finally(() => setLoading(false));

    }
    useEffect(() => {
        // console.log("hello");
        submitFormData();
    }, []);

   
    const [randomUsers, setRandomUsers] = useState([]);
    function allUserData() {
        fetch("https://insta-backend-60gi.onrender.com/alluser", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => res.json())
            .then((data) => {
                const shuffled = [...data.user].sort(() => 0.5 - Math.random());
                setRandomUsers(shuffled.slice(0, 5));
            }
            )
    }
    useEffect(() => {
        allUserData()
    }, []);

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
                setBtnLoading,

                randomUsers
            }
        }>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
