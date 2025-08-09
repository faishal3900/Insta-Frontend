import React from 'react';
import { assets } from '../../assets/assets';
import { useEffect } from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { ThemeContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';


const Suggested = () => {

    const [userData, setUserData] = useState([])
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
                setUserData(data.user)
                const shuffled = [...data.user].sort(() => 0.5 - Math.random());
                setRandomUsers(shuffled.slice(0, 5));
            }
            )
    }
    useEffect(() => {
        allUserData()
    }, []);

    const { followId, setFollow, following, followFun, followFiar, setFollowFiar, user } = useContext(ThemeContext);



    function followHendlar(userId) {

        if (followFiar == true) {
            setFollow(userId);
            setFollowFiar(false)
        } else {
            setFollow(userId);
            setFollowFiar(true)
        }
    }

    const navigate = useNavigate()

    function Logout() {
        localStorage.clear();
        navigate("/")
    }
    return (
        <div className=' ml-40 hidden lg:inline absolute right-3 '>

            <div className='flex justify-center items-center max-w-[280px] min-w-[80px] gap-3 mt-7'>
                <Avatar> <img src={user.pic} alt="" className='h-12 w-12 rounded-full' /></Avatar>
                <h2 className='font-medium'>{user.name}</h2>
                <button className='ml-2.5 font-bold text-red-700' style={{ cursor: "pointer" }} onClick={Logout}>logout</button>
            </div>
            <div className='font-medium text-gray-500 mt-4'>
                <h3>Suggested for you</h3>
            </div>

            {randomUsers.map((User, idx) => {

                // console.log(User);
                function profileHandlar() {
                    navigate("/profile/" + User._id)
                }
                const isFollow = following.includes(User._id)

                return (
                    <div key={idx}>
                        <div className='max-w-[350px] min-w-[100px] '>
                            <div className='flex justify-center items-center gap-3 mt-5'>
                                <img src={User.pic} alt="" className='h-12 w-12 rounded-full' />
                                <div>
                                    <h2 className='font-medium cursor-pointer' onClick={profileHandlar} >{User.name}</h2>
                                    <p className='text-[12px] font-medium text-gray-500'>Followed by shaily97541</p>
                                </div>
                                <button className='ml-2.5 font-bold text-blue-400' style={{ cursor: "pointer" }} onClick={() => followHendlar(User._id)}>{isFollow ? "Unfollow" : "Follow"}</button>
                            </div>
                        </div>
                    </div>
                )

            })}

        </div>
    );
}

export default Suggested;
