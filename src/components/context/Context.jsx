// src/context/Context.js
import React, { createContext, useEffect, useState } from 'react';
import { useContext } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children, },) => {
    const [dark, setDark] = useState(true);
    const toggleTheme = () => setDark(!dark);

    const [border, setBorder] = useState(true);


    const [followId, setFollow] = useState()
    const [following, setFollowing] = useState([])
    const [followFiar, setFollowFiar] = useState(true)

    const [comment, setComment] = useState(true)
    const btnComment = () => setComment(!comment)

    const [loginId, setLoginId] = useState()
    const [user, setUser] = useState({});


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

    // console.log(following); 


    useEffect(() => {
        followFun()
    }, [followId, followFiar]);


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
                border,
                setBorder

            }
        }>
            {children}
        </ThemeContext.Provider>
    );
};

export const useAuth = () => useContext(ThemeContext);
export default ThemeProvider;
