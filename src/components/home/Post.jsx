import React, { useContext, useEffect, useState } from 'react';
import { data } from 'react-router-dom';
import { assets } from '../../assets/assets';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import PostDisplay from './PostDisplay';
import CircularProgress from '@mui/material/CircularProgress';
import { ThemeContext } from '../context/Context';

const Post = () => {


    // const allPosts = data.reverse();

    const { allPostdata, loading } = useContext(ThemeContext);



    // console.log(data);
    return (
        <>
            {loading && (
                <div className="m-50 flex h-dvh justify-center">
                    <CircularProgress color="secondary" />
                </div>
            )}
            <div className='m-auto'>
                {allPostdata.map((post, idx) => <PostDisplay posts={post} key={idx} />)}
            </div>
        </>

    );
}

export default Post;
