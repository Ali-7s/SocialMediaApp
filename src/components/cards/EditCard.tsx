import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Avatar, Button, CardActions, CardHeader, TextField, Typography} from "@mui/material";
import {Post, UpdatePostRequest} from "../../types.tsx";
import React, {useEffect, useState} from "react";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import { updatePost} from "../../api/api.ts";
import {formatDate} from "./util/FormatDate.tsx";

type EditCardProps = {
    data: Post
    toggleDialog: () => void
}


const EditCard = ({data, toggleDialog} : EditCardProps)  => {
    const queryClient = useQueryClient()
    const [post, setPost] = useState<UpdatePostRequest>({
        id: 0,
        content: "",
    })

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPost( {...post, [event.target.name]: event.target.value})
    }

    useEffect(() => {
        setPost((prev) => ({
            ...prev, content: data.content, id: data.id
        }))
    }, [data.content, data.id]);

    const handleUpdateClick = () => {
        updateMutation.mutate(post)
        toggleDialog()
    }

    const updateMutation = useMutation({
        mutationFn: updatePost,
        onSuccess: () => {
            queryClient.invalidateQueries( {queryKey: ["posts"]}).then();
        },
        onError: error => {
            console.error(error)
        }
    })


    return (
        <>
            <Card variant={"outlined"}>
                <CardHeader
                    avatar={<Avatar aria-label="avatar" src={data.user.photoUrl}/>}
                    title= {<Typography variant={"h6"}>{data.user.displayName}</Typography>}
                    subheader= {formatDate(data.createdAt.toString())}
                />
                <CardContent>
                    <TextField fullWidth multiline minRows={2} maxRows={3}
                               inputProps={{
                                   maxLength: 255
                               }}
                               name={"content"}
                               onChange={handleChange}
                    value={post.content}
                    />

                </CardContent>
                <CardActions sx = { { display: "flex", justifyContent: "space-between"}}>
                    <Button variant={"contained"} aria-label={"update"} onClick={handleUpdateClick}>Update</Button>
                    <Button variant={"contained"} aria-label={"cancel"} onClick={toggleDialog} autoFocus>Cancel</Button>
                </CardActions>

            </Card>
        </>
    )


}

export default EditCard;