import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import ButtonBase from '@mui/material/ButtonBase';

const ProfileEdit = () => {

    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [bio, setBio] = useState("")
    const [pic, setPic] = useState(undefined)


    const handleAvatarChange = (event) => {
        const file = event.target.files?.[0];
        if (file) {
            // Read the file as a data URL
            const reader = new FileReader();
            reader.onload = () => {
                setPic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    function ProfileSubmite() {
        fetch("https://insta-backend-60gi.onrender.com/singup", {
            method: "Post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, bio, username, pic })
        })
            .then((res) => res.json())
            .then((data) => console.log(data))

    }
    return (
        <>
            <form onSubmit={ProfileSubmite}>
                <div className='flex flex-col items-center border-2 w-[600px] mx-auto rounded-2xl'>
                    <div className=''>
                        <h1>Edit Profile</h1>
                    </div>
                    <div className='flex justify-center items-center gap-5'>
                        <ButtonBase
                            component="label"
                            role={undefined}
                            tabIndex={-1} // prevent label from tab focus
                            aria-label="Avatar image"
                            sx={{
                                borderRadius: '40px',
                                '&:has(:focus-visible)': {
                                    outline: '2px solid',
                                    outlineOffset: '2px',
                                },
                            }}
                        >
                            <Avatar alt="Upload new avatar" src={pic} />
                            <input
                                type="file"
                                accept="image/*"
                                style={{
                                    border: 0,
                                    clip: 'rect(0 0 0 0)',
                                    height: '1px',
                                    margin: '-1px',
                                    overflow: 'hidden',
                                    padding: 0,
                                    position: 'absolute',
                                    whiteSpace: 'nowrap',
                                    width: '1px',
                                }}
                                onChange={handleAvatarChange}
                            />
                        </ButtonBase>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="">Name</label>
                        <input type="text" placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Username</label>
                        <input type="text" placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Bio</label>
                        <input type="text" placeholder='Bio' value={bio} onChange={(e) => setBio(e.target.value)} required />
                    </div>
                    <div className='flex flex-col'>
                        <label htmlFor="">Email</label>
                        <input type="text" placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>

                    <button>Save</button>
                </div>
            </form>
        </>
    );
}

export default ProfileEdit;
