import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import "../../App.css"
import { ThemeContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';

const PostDisplay = (Props, userName) => {
    // const [posts, setPosts] = useState([]);
    const [text, setText] = useState("");
    const [selectedPostId, setSelectedPostId] = useState("");
    const [loading, setLoading] = useState(false);


    const [postId, setPostId] = useState()
    // const [like, setLike] = useState(true)
    const navigate = useNavigate()

    function likeHandler() {
        if (!postId === !Props.posts.likes) {
            fetch("https://insta-backend-60gi.onrender.com/like", {
                method: "Put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({ postId })
            })
                .then((res) => res.json())
                .then((data) => {
                    setPostId(Props.posts._id)
                    // setLike(false)
                })
            console.log(Props.posts._id);
        } else {

            fetch("https://insta-backend-60gi.onrender.com/unlike", {
                method: "Put",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + localStorage.getItem("jwt")
                },
                body: JSON.stringify({ postId })
            })
                .then((res) => res.json())
                .then((data) => {
                    // setLike(true)
                    setPostId(Props.posts._id)
                })
            console.log(Props.posts._id);

        }


    }

    // const fetchPosts = () => {
    //     setLoading(true);
    //     fetch("https://insta-backend-60gi.onrender.com/allpost", {
    //         headers: {
    //             "Authorization": "Bearer " + localStorage.getItem("jwt")
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             if (data.posts) setPosts(data.posts);
    //         })
    //         .catch(err => {
    //             console.error("Error fetching posts:", err);
    //         })
    //         .finally(() => {
    //             setLoading(false);
    //         });
    // };

    const postComment = () => {

        if (!selectedPostId) return alert("Please select a post");
        if (!text.trim()) return alert("Comment cannot be empty");

        fetch("https://insta-backend-60gi.onrender.com/comment", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({
                postId: selectedPostId,
                text
            })
        })
            .then(res => {
                if (res.ok) {
                    setText("");
                    fetchPosts(); // Refresh the posts
                }
            })
            .catch(err => {
                console.error("Error posting comment:", err);
            });
    };

    // useEffect(() => {
    //     fetchPosts();
    // }, []);


    const { dark, toggleTheme, border, setBorder } = useContext(ThemeContext);

    const [comBtn, setComBtn] = useState(true)
    const comment = () => {
        if (comBtn) {
            setSelectedPostId(Props.posts._id)
            setComBtn(false)
        } else {
            setSelectedPostId("")
            setComBtn(true)
        }

    }

    function clickHendlar() {
        navigate("/profile/" + Props.posts.postedBy)
        // console.log(Props.posts._id)
    }


    return (
        <>
            <div className={`grid grid-cols-1 items-center sm:w-[450px] p-5 mt-5 w-45 border-2 rounded-2xl border-gray-300 shadow-2x ${dark == true ? "border-gray-900" : ""} `} >

                <div onClick={clickHendlar} className='flex items-center mb-3 gap-2  '>
                    <img src={Props.posts.pic} alt="" className='h-8 w-8 rounded-full cursor-pointer' />
                    <div className='cursor-pointer'>
                        <h1 className='text-black font-bold' id={dark == true ? "dark" : ""}>{Props.posts.userName}</h1>
                        <p className='text-[12px] font-medium text-gray-500'>{Props.posts.createdAt}</p>
                    </div>
                </div>
                <img className='' src={Props.posts.photos} alt="" />
                <div className='flex gap-6'>
                    <p onClick={likeHandler} style={{ cursor: "pointer" }}>{Props.posts.likes.length}<FavoriteBorderIcon /> </p>
                    <p onClick={comment} style={{ cursor: "pointer" }}>{Props.posts.comment.length}<ChatBubbleOutlineOutlinedIcon /> </p>
                </div>
                <h3 className='font-bold'>{Props.posts.title}</h3>
                <p>{Props.posts.body}</p>
                <hr className='mt-5 mb-5 text-gray-500' />
                <div className=''>
                    {selectedPostId && (
                        <div className={`mb-6 w-110  rounded ${dark == true ? "dark" : ""}`}>
                            {/* <img className='w-50' src={Props.posts.photos} /> */}
                            <div className=' '>
                                {Props.posts.comment.map((com, idx) => {
                                    return (
                                        <div className='' key={idx}>
                                            <div className='flex items-center'>
                                                <img className='w-8 h-8 rounded-4xl m-2' src={com.pic} alt="" />
                                                <h1 className=' font-medium' >{com.userName} </h1>
                                                <p className=''> :- {com.text}</p>
                                            </div>
                                        </div>
                                    )

                                })}

                            </div>
                            <input
                                value={text}
                                placeholder="Write your comment..."
                                onChange={(e) => setText(e.target.value)}
                                className="border-2 px-3 py-2 rounded w-[90%] mb-2 "
                                rows="1"
                            />
                            <button
                                onClick={postComment}
                                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                                disabled={!text.trim()}
                            >
                                Post Comment
                            </button>
                        </div>
                    )}

                </div>
            </div>
        </>
    );
}

export default PostDisplay;
