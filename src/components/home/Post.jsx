import React, { useEffect, useState } from 'react';
import { data } from 'react-router-dom';
import { assets } from '../../assets/assets';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PostDisplay from './PostDisplay';

const Post = () => {
    const [data, setData] = useState([]);
    // const allPosts = data.reverse();
    function submitFormData(e) {

        fetch("https://insta-backend-60gi.onrender.com/allpost", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            }
        })
            .then((res) => res.json())
            .then((data) => { setData(data.posts.reverse()) })

    }
    useEffect(() => {
        // console.log("hello");

        submitFormData();
    }, [data.posts]);
    // console.log(data);
    return (
        <div className='m-auto'>
            {data.map((post, idx) => <PostDisplay posts={post} key={idx} />)}
        </div>

    );
}

export default Post;
