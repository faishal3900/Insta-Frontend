import React, { useContext, useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import "../../App.css"
import { ThemeContext } from '../context/Context';
import { useNavigate } from 'react-router-dom';
import { pink } from '@mui/material/colors';

const PostDisplay = (Props) => {
    const [text, setText] = useState("");
    const [selectedPostId, setSelectedPostId] = useState("");

    const [postsDataForLike, setPostsDataForLike] = useState({
        _id: "",
        title: "",
        body: "",
        photos: "",
        userName: "",
        postedBy: "",
        pic: "",
        comment: [],
        likes: [],
        createdAt: "",
        ...Props.posts
    });

    const [postsData, setPostsData] = useState({
        _id: "",
        title: "",
        body: "",
        photos: "",
        userName: "",
        postedBy: "",
        pic: "",
        comment: [],
        likes: [],
        createdAt: "",
        ...Props.posts
    });
    const [comData, setComData] = useState({
        _id: "",
        title: "",
        body: "",
        photos: "",
        userName: "",
        postedBy: "",
        pic: "",
        comment: [],
        likes: [],
        createdAt: "",
        ...Props.posts
    })


    console.log(comData);


    const navigate = useNavigate();

    const { dark, user } = useContext(ThemeContext);
    const [comBtn, setComBtn] = useState(true);

    function likeHandler() {
        fetch(`https://insta-backend-60gi.onrender.com/like`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("jwt")
            },
            body: JSON.stringify({ postId: postsData._id })
        })
            .then((res) => res.json())
            .then((data) => {
                setPostsDataForLike(data.data)
            })
            .catch(err => console.error(err))
    }


    // const fetchPosts = () => {

    //     fetch("https://insta-backend-60gi.onrender.com/allpost", {
    //         headers: {
    //             "Authorization": "Bearer " + localStorage.getItem("jwt")
    //         }
    //     })
    //         .then(res => res.json())
    //         .then(data => {
    //             // Update the postsData if this post is in the fetched posts list
    //             if (data.posts) {
    //                 const updatedPost = data.posts.find(post => post._id === postsData._id);
    //                 if (updatedPost) setPostsData(updatedPost);
    //             }
    //         })
    //         .catch(err => {
    //             console.error("Error fetching posts:", err);
    //         })

    // };

    // useEffect(() => {
    //     fetchPosts();
    // }, []);

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
            .then(res => res.json())
            .then(data => {
                setText("");
                setComData(data.comment);
                console.log(data);
                // Update with new comment data
            })
            .catch(err => console.error("Error posting comment:", err))

    };

    const comment = () => {
        if (comBtn) {
            setSelectedPostId(postsData._id);
            console.log(postsData.id);
            setComBtn(false);
        } else {
            setSelectedPostId("");
            setComBtn(true);
        }
    };

    function clickHandler() {
        navigate("/profile/" + postsData.postedBy);
    }

    return (
        <>

            <div className={`grid grid-cols-1 items-center sm:w-[420px] p-5 mt-5 w-[300px] border-2 rounded-2xl border-gray-300 shadow-2x ${(dark) ? "border-gray-900" : ""}`} >

                <div onClick={clickHandler} className='flex items-center mb-3 gap-2'>
                    <img src={postsData.pic} alt="" className='h-8 w-8 rounded-full cursor-pointer' />
                    <div className='cursor-pointer'>
                        <h1 className='text-black font-bold' id={dark ? "dark" : ""}>{postsData.userName}</h1>
                        <p className='text-[12px] font-medium text-gray-500'>{postsData.createdAt}</p>
                    </div>
                </div>
                <img className='' src={postsData.photos} alt="" />
                <div className='flex gap-6'>
                    <p onClick={likeHandler} style={{ cursor: "pointer" }}>
                        {postsDataForLike.likes?.length || 0}
                        {postsDataForLike.likes.includes(user._id)
                            ? <FavoriteIcon sx={{ color: pink[500], }} />
                            : <FavoriteBorderIcon />}
                    </p>
                    <p onClick={comment} style={{ cursor: "pointer" }}>
                        {comData.comment?.length} <ChatBubbleOutlineOutlinedIcon />

                    </p>
                </div>
                <h3 className='font-bold'>{postsData.title}</h3>
                <p>{postsData.body}</p>
                <hr className='mt-5 mb-5 text-gray-500' />
                <div>
                    {selectedPostId && (
                        <div className={`mb-6 w-110 rounded ${dark ? "dark" : ""}`}>
                            <div>
                                {comData.comment.map((com, idx) => (
                                    <div key={idx} className='flex items-center'>
                                        {/* {console.log(com)} */}
                                        <img className='w-8 h-8 rounded-4xl m-2' src={com.pic} alt="" />
                                        <h1 className='font-medium'>{com.userName}</h1>
                                        <p> :- {com.text}</p>
                                    </div>
                                ))}
                            </div>
                            <input
                                value={text}
                                placeholder="Write your comment..."
                                onChange={(e) => setText(e.target.value)}
                                className="border-2 px-3 py-2 rounded w-[90%] mb-2"
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
