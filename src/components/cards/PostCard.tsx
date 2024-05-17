import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Avatar, CardActions, CardHeader, IconButton, Typography} from "@mui/material";
import {FavoriteBorderOutlined, MoreVert, ShareOutlined} from "@mui/icons-material";
import {Post} from "../../types.tsx";
import { parseISO, format } from 'date-fns';
import React from "react";

const PostCard: React.FC<{data: Post}> = ({data })  => {

    const formatDate = (date: string) => {
        const parsedDate = parseISO(date);
        return format(parsedDate, "hh:mm a '·' MMM d, yyyy" );
    }

    return (
        <>
            <Card variant={"outlined"}>
                <CardHeader
                    avatar={<Avatar aria-label="avatar" src={data.user.photoUrl}/>}
                    action={<IconButton aria-label="more options"><MoreVert /></IconButton>}
                    title= {<Typography variant={"h6"}>{data.user.username}</Typography>}
                    subheader= {formatDate(data.createdAt.toString())}
                />
                <CardContent>
                    <Typography>
                        {data.content}
                    </Typography>
                </CardContent>
                <CardActions>
                    <IconButton aria-label="like"><FavoriteBorderOutlined /></IconButton>
                    <IconButton aria-label="share"><ShareOutlined /></IconButton>
                </CardActions>
            </Card>
        </>
    )


}

export default PostCard;