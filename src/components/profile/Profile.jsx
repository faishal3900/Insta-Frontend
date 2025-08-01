import React, { useContext } from 'react';
import SideNavbar from '../Navbar/SideNavbar';
import { ThemeContext } from '../context/Context';
import { assets } from '../../assets/assets';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from "react-router-dom";
import { useAuth } from "../context/Context";

const Profile = () => {

    const { id } = useParams(); // URL se ID (if available)
    const { user } = useAuth(); // Logged-in user ka data
    const userId = id || user?._id; // Priority: URL ID > Logged-in I

    const { dark, toggleTheme } = useContext(ThemeContext);
    const [postDatas, setPostDatas] = useState([{
        posts: []
    }])
    const [userDatas, setUserDatas] = useState({
        followers: [],
        following: [],
        pic: '',
        name: '',
        _id: ''
    })

    const { following, setFollow, followFiar, setFollowFiar } = useContext(ThemeContext);

    const isFollow = following.includes(userDatas._id)

    function followHendlar(userId) {

        if (followFiar == true) {
            setFollow(userId);
            setFollowFiar(false)
        } else {
            setFollow(userId);
            setFollowFiar(true)
        }
    }

    // const Id = "6871fb95b374d17fe174df64"
    
    function ProfileData() {
        if (!userId) return;
        fetch(`http://localhost:3000/profile/${userId}`, {
            method: "get",
            headers: {
                "Content-Type": "application/json",
            }
        })
            .then((res => res.json()))
            .then((data) => {
                setPostDatas(data.posts)

                setUserDatas(data.user)
            })
    }
    useEffect(() => {
        ProfileData()
    }, [userId])


 
    // console.log(profileDatas.posts);

    return (
        <div className='max-h-full min-h-dvh grid grid-cols-1 gap-4' id={dark == true ? "dark" : ""}>
            <div className='flex justify-center  '>
                <div className='w-30 m-20 h-30 rounded-full border-2'>
                    <img className='w-30 h-30 rounded-full' src={userDatas.pic || null} />
                </div>
                <div className='m-20'>
                    <div className='flex gap-6'>
                        <h1 className='font-medium'>{userDatas.name}</h1>
                        <button className='bg-blue-500 p-1 pl-2 mb-3 pr-2 rounded-lg cursor-pointer' onClick={() => followHendlar(userDatas._id)}>{isFollow ? "Unfollow" : "Follow"}</button>
                        <button className='bg-gray-700 p-1 pl-2 mb-3 pr-2 rounded-lg cursor-pointer'>Edit Profile</button>
                    </div>
                    <div className='flex gap-9 '>
                        <h1>  <span className='font-medium'>{postDatas.length}</span> Posts</h1>
                        <h1><span className='font-medium'>{userDatas.followers.length}</span> followers</h1>
                        <h1><span className='font-medium'>{userDatas.following.length}</span> following</h1>
                    </div>
                    <div>
                        <h1>{userDatas.name}</h1>
                    </div>
                </div>
            </div>
            <div className='justify-end flex'>
                <hr className=' w-[100%]' />
            </div>
            <div className='flex  justify-start flex-wrap mt-5 gap-5 ml-90 mb-10'>
                {postDatas.map((postD, indx) => {

                    return (
                        <span className='' key={indx}>
                            <img className='w-60' src={postD.photos} alt="" />
                        </span>
                    )

                })
                }


            </div>
        </div>
    );
}

export default Profile;
