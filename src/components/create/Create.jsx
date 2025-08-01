import React, { useContext, useState } from 'react';
// import { assets } from '../../assets/assets';
// import { useNavigate } from 'react-router-dom';
// import SideNavbar from '../Navbar/SideNavbar';
import { ThemeContext } from '../context/Context';

const Create = () => {

    const [title, setTitle] = useState()
    const [body, setBody] = useState()
    const [pic, setPic] = useState()

    // const navigate = useNavigate()
    function submitPostData(e) {
        e.preventDefault()
        fetch("https://insta-backend-60gi.onrender.com/createPost", {
            method: "Post",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({ title, body, pic })
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
            })
        setTitle("")
        setBody("")
        setPic("")

    }
    const { dark, toggleTheme } = useContext(ThemeContext);

    return (
        <>
            <div className='h-dvh' id={dark == true ? "dark" : ""}>
                {/* <SideNavbar /> */}
                <div className=" w-full flex justify-center ">
                    {/* <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="" /> */}

                    <form onSubmit={submitPostData} className='flex flex-col items-center border-2 rounded-2xl w-100 '>
                        <label className='' >Title</label>
                        <input type="text" placeholder='title' name='title' className='m-5 pl-10 pr-10 pb-2 pt-2 border-2 rounded-2xl border-gray-500' value={title} onChange={(e) => setTitle(e.target.value)} />
                        <label >Body</label>
                        <input type="text" placeholder='body' name='body' className='m-5 pl-10 pr-10 pb-2 pt-2 border-2 rounded-2xl border-gray-500' value={body} onChange={(e) => setBody(e.target.value)} />
                        <label >Photo</label>
                        <input type="text" placeholder='Url' name='photo' className='m-5 pl-10 pr-10 pb-2 pt-2 border-2 rounded-2xl border-gray-500' value={pic} onChange={(e) => setPic(e.target.value)} />
                        <button className='m-5 bg-blue-500 text-white pt-2 pb-2 pl-15 pr-15 text-2xl rounded-2xl' style={{ cursor: "pointer" }}>Post</button>
                        {/* <input type="file" /> */}

                    </form>


                </div>
            </div>
        </>
    );
}

export default Create;
