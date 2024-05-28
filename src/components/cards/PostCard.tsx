import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {Avatar, Box, CardActions, CardHeader, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import {FavoriteBorderOutlined, MoreVert} from "@mui/icons-material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import {Post} from "../../types.tsx";
import React, {useState} from "react";
import {useUserContext} from "../../hooks/useUserContext.tsx";
import EditDialog from "../dialogs/EditDialog.tsx";
import DeleteDialog from "../dialogs/DeleteDialog.tsx";
import {formatDate} from "./util/FormatDate.tsx";


const PostCard: React.FC<{data: Post}> = ({data })  => {
    const [editDialogOpen, setEditDialogOpen] = useState(false)
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const { user } = useUserContext()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const copyToClipboard = async () => {
        await navigator.clipboard.writeText(location.href);
        console.log("Success?")
    }


    const toggleEditDialog = () => {
        setEditDialogOpen(!editDialogOpen)
    }

    const toggleDeleteDialog = () => {
        setDeleteDialogOpen(!deleteDialogOpen)
    }

    return (
        <>
            <Card variant={"outlined"}>
                <CardHeader
                    avatar={<Avatar aria-label="avatar" src={data.user.photoUrl}/>}
                    action={<IconButton aria-label="more options"
                                        aria-controls={open ? 'basic-menu' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? 'true' : undefined}
                                        onClick={handleClick}

                    ><MoreVert /></IconButton>}
                    title= {<Typography sx={ { fontWeight: "bold"}} >{data.user.displayName}</Typography>}
                    subheader= {"@"+ data.user.username}
                />
                <CardContent>
                    <Typography>
                        {data.content}
                    </Typography>
                </CardContent>
                <Box sx={ { display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <CardActions>
                    <IconButton aria-label="like"><FavoriteBorderOutlined /></IconButton>
                </CardActions>
                <Typography sx={ { marginRight: "10px", color: "#606264"}}>{formatDate(data.createdAt)}</Typography>
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
                    { user.email === data.user.email ?
                      <div>
                            <MenuItem onClick={toggleDeleteDialog}><DeleteIcon sx={ { margin: "5px" }}/>Delete</MenuItem>
                            <MenuItem onClick={toggleEditDialog}><EditIcon sx={{margin: "5px"}}/>Edit</MenuItem>
                            <MenuItem onClick={copyToClipboard}><LinkIcon sx={{margin: "5px"}}/>Copy Link</MenuItem>
                      </div>: <MenuItem onClick={copyToClipboard}><LinkIcon sx={{margin: "5px"}}/>Copy Link</MenuItem> }
                </Menu>
            </Card>
            <EditDialog open={editDialogOpen} postData={data} toggleDialog={toggleEditDialog}/>
            <DeleteDialog open={deleteDialogOpen} id={data.id} toggleDialog={toggleDeleteDialog}/>
        </>
    )


}

export default PostCard;