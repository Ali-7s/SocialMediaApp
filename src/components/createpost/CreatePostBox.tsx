
import {
    Avatar, Box,
    Button,
    TextField,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {PostRequest, User} from "../../types.tsx";
import {createNewPost} from "../../api/api.ts";


interface UserProps {
    user: User
}

const CreatePostBox = (  { user } : UserProps) => {
    const [post, setPost] = useState<PostRequest>({
        content: "",
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPost( {...post, [event.target.name]: event.target.value})
    }


    function handleButtonClick() {
        createPost().then();
    }

    function createPost ()  {
        const response = createNewPost(post).finally();
        console.log(post)
        console.log(response);
        return response.catch(Error)
    }

    return (
        <>
            <Box sx = { { display: "flex", marginBottom: "30px"}} >

                   <Avatar sx={ { width: "7.8%", height: "9%", marginRight: "5px", marginTop: "5px"}} aria-label="avatar" src={user.photoUrl}/>

                <TextField
                    sx={ { width: "100%"}}
                    name={"content"}
                    placeholder={"Create a new post!"}
                    fullWidth multiline minRows={2} maxRows={3}
                    onChange={handleChange}
                    inputProps={{
                        maxLength: 255
                    }}/>

                    <Button variant={"outlined"} onClick={handleButtonClick}> <Typography>Post</Typography></Button>
            </Box>
        </>

    )



}

export default CreatePostBox


