import {
    Avatar, Box,
    Button,
    TextField,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import { PostRequest } from "../../types.tsx";
import {createNewPost} from "../../api/api.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {useUserContext} from "../../hooks/useUserContext.tsx";

const CreatePostBox = () => {
    const {user} = useUserContext();
    const queryClient = useQueryClient()
    const [post, setPost] = useState<PostRequest>({
        content: "",
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPost( {...post, [event.target.name]: event.target.value})
    }


    const handleButtonClick = () => {
        createMutation.mutate(post)
    }

    const createMutation = useMutation({
        mutationFn: createNewPost,
        onSuccess: () => {
            console.log("Success");
            queryClient.invalidateQueries( {queryKey: ["posts"]}).then( () => {
                setPost({...post, content: ""})
            })
        },
        onError: error => {
            console.error(error)
        }
    })

    return (
        <>
            <Box sx = { { display: "flex", marginBottom: "30px"}} >

                   <Avatar sx={ { width: "7.8%", height: "9%", marginRight: "5px", marginTop: "5px"}} aria-label="avatar" src={user.photoUrl}/>

                <TextField
                    sx={ { width: "100%"}}
                    name={"content"}
                    value={post.content}
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


