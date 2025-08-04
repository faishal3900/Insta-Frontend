import React, { useContext } from 'react';
import SideNavbar from '../Navbar/SideNavbar';
import { ThemeContext } from '../context/Context';
import { assets } from '../../assets/assets';
import { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/Context";
import CircularProgress from '@mui/material/CircularProgress';

const Profile = () => {

    const { id } = useParams(); // URL se ID (if available)
    const { user } = useAuth(); // Logged-in user ka data
    const userId = id || user?._id; // Priority: URL ID > Logged-in I

    console.log(id);
    console.log(user?._id);



    const [loading, setLoading] = useState(false);
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
        setLoading(true);
        fetch(`https://insta-backend-60gi.onrender.com/profile/${userId}`, {
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
            .finally(() => setLoading(false));
    }
    useEffect(() => {
        ProfileData()
    }, [userId])

    const navigate = useNavigate()
    function navigateHendal() {
        navigate("/profile/" + user?._id + "/profile-edit")
    }

    // console.log(profileDatas.posts);

    return (
        <>
            {loading && (
                <div className="absolute left-[50%] right-[50%] top-[50%] bottom-[50%]">
                    <CircularProgress color="secondary" />
                </div>
            )}
            <div className='max-h-full min-h-dvh grid grid-cols-1' id={dark == true ? "dark" : ""}>
                <div className='flex justify-center gap-4 md:gap-9  '>
                    <div className='w-[60px] h-[60px] sm:w-[120px] sm:h-[120px] sm:mb-5 mt-10 rounded-full border-2'>
                        <img className='w-[60px] h-[60px] sm:w-[120px] sm:h-[120px] rounded-full' src={userDatas.pic || null} />
                    </div>
                    <div className='mt-5'>
                        <div className='text-[12px] items-center sm:flex gap-3 sm:mt-7 lg:text-[18px]'>
                            <div>
                                <h1 className='font-medium text-[15px] lg:text-[18px] mb-3'>{userDatas.name}</h1>
                            </div>
                            <div>

                                <button className={`bg-gray-700 p-1 pl-2 mb-3 pr-2 rounded-lg cursor-pointer ${id === user?._id ? "inline-block" : "hidden"}`} onClick={navigateHendal}>Edit Profile</button>
                            </div>
                        </div>

                        <div className='flex gap-6 text-[12px] sm:text-[15px] lg:text-[20px] '>
                            <h1>  <span className='font-medium '>{postDatas.length}</span> Posts</h1>
                            <h1><span className='font-medium'>{userDatas.followers.length}</span> followers</h1>
                            <h1><span className='font-medium'>{userDatas.following.length}</span> following</h1>
                        </div>
                        <div className='mt-5 mb-5'>
                            <button className={`bg-blue-500 mr-5 p-1 pl-2 mb-0 pr-2 rounded-lg cursor-pointer ${id === user?._id ? "hidden" : "inline-block "}`} onClick={() => followHendlar(userDatas._id)}>{isFollow ? "Unfollow" : "Follow"}</button>

                            <button className={`bg-gray-700 mr-5 p-1 pl-2 mb-0 pr-2 rounded-lg cursor-pointer ${id === user?._id ? "hidden" : "inline-block "}`} >Messenger</button>

                        </div>
                        <div className='text-[12px] sm:text-[15px] font-medium mb-3 mt-3 lg:text-[20px]'>
                            {/* <h1>{userDatas.name}</h1> */}
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>

                    <hr className='w-[60%]' />
                </div>

                <div className='flex justify-center font-medium text-2xl'>
                    <h1>Post</h1>
                </div>
                <div className='flex  justify-center sm:justify-start md:ml-40 lg:ml-90 flex-wrap mt-5 gap-5  mb-10'>
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
        </>
    );
}

export default Profile;
