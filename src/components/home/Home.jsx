import React, { useContext, useState } from 'react';
import { data, useParams } from 'react-router';
import SideNavbar from '../Navbar/SideNavbar';
import Post from './Post';
import Suggested from './Suggested';
import SearchIcon from '@mui/icons-material/Search';
import "../../App.css"
import { ThemeContext } from '../context/Context';
import Switch from '@mui/material/Switch';

// import CommentData from '../comment/CommentData';



const Home = () => {

    const { dark, toggleTheme } = useContext(ThemeContext);
    const { comment, btnComment } = useContext(ThemeContext);


    return (
        <>
            {/* {comment ? <></> : <CommentData />} */}
            <div className='w-full flex justify-end items-center' id={dark == true ? "dark" : ""}>
                <Switch onClick={toggleTheme} className='p-1.5  mt-3' defaultChecked /><h1 className='mr-8'>Switch</h1>
            </div>
            <div className='grid grid-cols-1 gap-4' id={dark ? 'dark' : ''}>
                {/* <SideNavbar /> */}
                <Post />
                <Suggested />

            </div>
        </>
    );
}
export default Home;
