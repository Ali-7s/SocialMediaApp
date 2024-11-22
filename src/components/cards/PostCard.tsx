import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
    Avatar,
    Box,
    CardActions,
    CardHeader,
    IconButton,
    Menu,
    MenuItem,
    Typography
} from "@mui/material";
import {Favorite, FavoriteBorderOutlined, MoreVert} from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import {Post} from "../../types.tsx";
import React, {useEffect, useState} from "react";
import {useUserContext} from "../../hooks/useUserContext.tsx";
import EditDialog from "../dialogs/EditDialog.tsx";
import DeleteDialog from "../dialogs/DeleteDialog.tsx";
import {formatDate} from "./util/FormatDate.tsx";
import {Link} from "react-router-dom";
import {getUserLikedPostsId, likePost, unlikePost, useGetUserImage} from "../../api/api.ts";
import { red} from "@mui/material/colors";
import { useQuery, useQueryClient} from "@tanstack/react-query";


const PostCard: React.FC<{ data: Post }> = ({data}) => {
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [isLiked, setIsLiked] = useState(false)
    const queryClient = useQueryClient();
    const {user} = useUserContext()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    
    const photoUrl = useGetUserImage(data.user.id).data?.data.profile_img

    const { data: userLikedIdsData } = useQuery({
        queryKey: ["userLikedIds", user.id],
        queryFn: () => getUserLikedPostsId(),
        refetchOnMount: true,
        staleTime: 1

    });

    useEffect(() => {
        if (userLikedIdsData?.includes(data.id)) {
            setIsLiked(true);
        }

    }, [data.id, userLikedIdsData]);

    

    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(location.href);
        
    }


    const toggleEditDialog = () => {
        setEditDialogOpen(!editDialogOpen)
    }

    const toggleDeleteDialog = () => {
        setDeleteDialogOpen(!deleteDialogOpen)
    }

    const handleLikeClick = () => {
        
        if(isLiked) {
            
            unlikePost(data.id).then( () => {
                queryClient.invalidateQueries({queryKey: ["userLikedIds", "userLikedPosts"]}).then( () => {
                    setIsLiked(false);
                })
            })

            
        } else {
            
            likePost(data.id).then( () => {
                queryClient.invalidateQueries({queryKey: ["userLikedIds"]}).then()
            }).then()
        }
    }


    return (
        <>
            <Card variant={"outlined"} sx={{maxHeight: "90em"}}>
                <CardHeader
                    avatar={<Avatar aria-label="avatar" src={ photoUrl ?? ""} />}
                    action={<IconButton aria-label="more options"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}

                    ><MoreVert/></IconButton>}
                    title={<Link to={`/${data.user.username}`} state={data?.user.id} style={{textDecoration: "none"}}><Typography
                        variant="h6" sx={{
                        color: "black",
                        textDecoration: "none",
                        fontSize: "15px"
                    }}>{data?.user.displayName}</Typography></Link>}
                    subheader={"@" + data?.user.username}
                />
                <CardContent sx={{}}>
                    <Typography>
                        {data?.content}
                    </Typography>
                </CardContent>
                <Box sx={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <CardActions>
                        <IconButton aria-label="like" onClick={handleLikeClick}>{ isLiked ? <Favorite sx={{ color: red[500] }} /> : <FavoriteBorderOutlined/>}</IconButton>
                    </CardActions>
                    <Typography sx={{marginRight: "10px", color: "#606264"}}>{formatDate(data.createdAt)}</Typography>
                </Box>
                <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                        'aria-labelledby': 'basic-button',
                    }}
                >
                    {user.id === data?.user.id ?
                        <div>
                            <MenuItem onClick={toggleDeleteDialog}><DeleteIcon sx={{margin: "5px"}}/>Delete</MenuItem>
                            <MenuItem onClick={toggleEditDialog}><EditIcon sx={{margin: "5px"}}/>Edit</MenuItem>
                            <MenuItem onClick={copyToClipboard}><LinkIcon sx={{margin: "5px"}}/>Copy Link</MenuItem>
                        </div> :
                        <MenuItem onClick={copyToClipboard}><LinkIcon sx={{margin: "5px"}}/>Copy Link</MenuItem>}
                </Menu>
            </Card>
            <EditDialog open={editDialogOpen} postData={data} toggleDialog={toggleEditDialog}/>
            <DeleteDialog open={deleteDialogOpen} id={data.id} toggleDialog={toggleDeleteDialog}/>
        </>
    )
}

export default PostCard;