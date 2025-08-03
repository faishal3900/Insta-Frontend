import React, { useEffect, useState } from 'react';
import { data } from 'react-router-dom';
import { assets } from '../../assets/assets';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PostDisplay from './PostDisplay';
import CircularProgress from '@mui/material/CircularProgress';

const Post = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    // const allPosts = data.reverse();
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
            .then((data) => { setData(data.posts.reverse()) })
            .finally(() => setLoading(false));

    }
    useEffect(() => {
        // console.log("hello");

        submitFormData();
    }, [data.posts]);
    // console.log(data);
    return (
        <>
            {loading && (
                <div className="m-50 flex h-dvh justify-center">
                    <CircularProgress color="secondary" />
                </div>
            )}
            <div className='m-auto'>
                {data.map((post, idx) => <PostDisplay posts={post} key={idx} />)}
            </div>
        </>

    );
}

export default Post;
