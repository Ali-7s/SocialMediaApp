import {
    Box,
    Button,
    TextField,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import { PostRequest} from "../../types.tsx";
import {createNewPost} from "../../api/api.ts";
import {useMutation, useQueryClient} from "@tanstack/react-query";

const CreatePostBox = () => {
    const queryClient = useQueryClient()
    const [post, setPost] = useState<PostRequest>({
        content: "",
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPost({...post, [event.target.name]: event.target.value})
    }


    const handleButtonClick = () => {
        createMutation.mutate(post)
    }

    const createMutation = useMutation({
        mutationFn: createNewPost,
        onSuccess: () => {
            
            queryClient.invalidateQueries({queryKey: ["posts"]}).then(() => {
                setPost({...post, content: ""})
            })
        },
        onError: error => {
            console.error(error)
        }
    })

    return (
        <>
            <Box sx={{
                gridColumn: "2/5",
                padding: "2em",
                backgroundColor: "white",
                border: "solid 1px lightgrey",
                borderRadius: "0,9em"
            }}>
                <TextField
                    name={"content"}
                    value={post.content}
                    placeholder={"Create a new post!"}
                    fullWidth multiline minRows={2} maxRows={3}
                    onChange={handleChange}
                    inputProps={{
                        maxLength: 255
                    }}
                    sx = { {  marginTop: "1px", '&:hover': {

                            backgroundColor: "white",
                            color: "#c7c0c0",
                            border: "none",
                        },

                        '&:focus': {
                        border: "none",
                            fieldset: "solid 1px lightgrey",
                        },

                        fieldset: {
                        border: "solid 1px lightgrey",
                        }



                    }}



                />
                <Button variant={"outlined"} sx={{
                    marginTop: "5px", backgroundColor: "#c7c0c0", color: "white", borderColor: "#c7c0c0", '&:hover': {
                        backgroundColor: "white",
                        color: "#c7c0c0",
                        border: "solid 1px #c7c0c0",
                    }
                }} onClick={handleButtonClick}> <Typography>Post</Typography></Button>
            </Box>
        </>

    )

}

export default CreatePostBox


