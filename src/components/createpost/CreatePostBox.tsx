
import {
    Avatar, Box,
    Button,
    TextField,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import {PostRequest} from "../../types.tsx";
import {createNewPost} from "../../api/api.ts";




const CreatePostBox = ( ) => {
    const [post, setPost] = useState<PostRequest>({
        content: "",
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPost( {...post, [event.target.name]: event.target.value})
    }


    function handleButtonClick() {
        createPost();
    }

    function createPost ()  {
        const response = createNewPost(post);
        return response.catch(Error)
    }

    return (
        <>
            <Box sx = { { display: "flex", marginBottom: "30px"}} >

                   <Avatar sx={ { width: "7.8%", height: "9%", marginRight: "5px", marginTop: "5px"}} aria-label="avatar" src={"https://img.freepik.com/free-vector/cute-koala-with-cub-cartoon-icon-illustration_138676-2839.jpg?w=1380&t=st=1715294086~exp=1715294686~hmac=ff8e23e681a9bc14887363d97e79d43018ed0ff4fe6482b666d31b6b632048c6"}/>

                <TextField
                    sx={ { width: "100%"}}
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


