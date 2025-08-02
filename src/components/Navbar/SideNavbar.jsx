import React, { useContext, useState } from 'react';
import "../../App.css"
import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import ExploreIcon from '@mui/icons-material/ExploreOutlined';
import Shop2Icon from '@mui/icons-material/Shop2Outlined';
import SendIcon from '@mui/icons-material/SendOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AddBoxIcon from '@mui/icons-material/AddBoxOutlined';
import AccountCircleIcon from '@mui/icons-material/AccountCircleOutlined';
import DehazeIcon from '@mui/icons-material/DehazeOutlined';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';
import { ThemeContext, useAuth } from '../context/Context';

const SideNavbar = () => {
    const [navActive, setNavActive] = useState("home")
    const navigate = useNavigate()

    const { user } = useAuth(); // Logged-in user ka data
    console.log(user);


    function createHendlar() {
        setNavActive("create")
        navigate("/create")
    }
    function homeHendler() {
        setNavActive("home")
        navigate("/home")
    }
    function logoutHendlar() {
        localStorage.clear();
        navigate("/");
    }


    const { dark, toggleTheme, following, } = useContext(ThemeContext)

    return (
        <div className={`sm:fixed sm:top-0 sm:bottom-0 sm:left-0 absolute w-16 lg:w-55 border-r border-gray-600 scroll-smooth transition-all duration-300 justify-center `} id={dark == true ? "dark" : ""}>
            <ul className='sm:block flex fixed bottom-0 sm:w-15 lg:w-50 bg-black w-full justify-center items-center gap-3'>
                <img
                    className='sm:inline-block hidden w-8 md:w-45 mb-3 mt-3 pb-4 pt-4 mx-auto md:mx-0 md:pr-3 md:pl-3'
                    src={dark ? assets.Instagram_logo_w : assets.Instagram_logo}
                    alt=""
                />

                <li onClick={homeHendler} className={` p-2 mt-3 mb-3 ml-2 mr-2 rounded-lg hSideNav ${navActive === "home" ? "active" : ""}`} style={{ cursor: "pointer" }}>
                    <HomeIcon className='md:mr-3' />
                    <span className='hidden lg:inline'>Home</span>
                </li>

                <li onClick={() => setNavActive("search")} className={`sm:block hidden p-2 mb-3 mt-3 ml-2 mr-2 rounded-lg hSideNav ${navActive === "search" ? "active" : ""}`} style={{ cursor: "pointer" }}>
                    <SearchIcon className='md:mr-3' />
                    <span className='hidden lg:inline'>Search</span>
                </li>

                <li onClick={() => setNavActive("Explore")} className={`sm:block hidden p-2 mb-3 mt-3 ml-2 mr-2 rounded-lg hSideNav ${navActive === "Explore" ? "active" : ""}`} style={{ cursor: "pointer" }}>
                    <ExploreIcon className='md:mr-3' />
                    <span className='hidden lg:inline'>Explore</span>
                </li>

                <li onClick={() => setNavActive("Reels")} className={`p-2 mb-3 mt-3 ml-2 mr-2 rounded-lg hSideNav ${navActive === "Reels" ? "active" : ""}`} style={{ cursor: "pointer" }}>
                    <Shop2Icon className='md:mr-3' />
                    <span className='hidden lg:inline'>Reels</span>
                </li>

                <li onClick={() => setNavActive("Messages")} className={`p-2 mb-3 mt-3 ml-2 mr-2 rounded-lg hSideNav ${navActive === "Messages" ? "active" : ""}`} style={{ cursor: "pointer" }}>
                    <SendIcon className='md:mr-3' />
                    <span className='hidden lg:inline'>Messages</span>
                </li>

                <li onClick={() => setNavActive("Notifications")} className={`sm:block hidden p-2 mb-3 mt-3 ml-2 mr-2 rounded-lg hSideNav ${navActive === "Notifications" ? "active" : ""}`} style={{ cursor: "pointer" }}>
                    <FavoriteBorderIcon className='md:mr-3' />
                    <span className='hidden lg:inline'>Notifications</span>
                </li>

                <li onClick={createHendlar} className={`p-2 mb-3 mt-3 ml-2 mr-2 rounded-lg hSideNav ${navActive === "create" ? "active" : ""}`} style={{ cursor: "pointer" }}>
                    <AddBoxIcon className='md:mr-3' />
                    <span className='hidden lg:inline'>Create</span>
                </li>

                <li onClick={() => { setNavActive("Profile"), navigate("/profile/" + user._id) }} className={`p-2 mb-3 mt-3 ml-2 mr-2 rounded-lg hSideNav flex gap-3 items-center ${navActive === "Profile" ? "active" : ""}`} style={{ cursor: "pointer" }}>
                    <img className='w-10 h-10 rounded-4xl border-2' src={user.pic} alt="" />
                    <span className='hidden lg:inline'>Profile</span>
                </li>

                <li onClick={() => logoutHendlar()} className={`sm:block hidden p-2 mb-3 mt-3 ml-2 mr-2 rounded-lg hSideNav `} style={{ cursor: "pointer" }}>
                    <span className=' text-red-600 font-medium hidden lg:inline'>Logout</span>
                </li>
            </ul>
        </div>
    );
}

export default SideNavbar;