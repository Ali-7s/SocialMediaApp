import {Button, Dialog, DialogActions, DialogContent, DialogTitle, Typography} from "@mui/material";
import ProfileCard from "../cards/ProfileCard.tsx";
import {UserSummary} from "../../types.tsx";
import {useEffect, useState} from "react";

type FollowersDialogProps = {
    open: boolean,
    following?: UserSummary[],
    followers?: UserSummary[],
    name: string,
    toggleDialog: () => void
}


const FollowersDialog = ( { open, toggleDialog, following, followers, name} : FollowersDialogProps) => {
    const [data, setData] = useState<UserSummary[]>();

    useEffect(() => {
        if(following && followers) {
            if(name == "Following") {
                setData(following)
            } else {
                setData(followers)
            }
        }
    }, [followers, following, name]);




    return (
        <Dialog
            open={open}
            onClose={toggleDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {name}
            </DialogTitle>
            <DialogContent>
                { data && data?.length > 0 ?  data?.map((post) => <ProfileCard data={post} key={post.id} toggleDialog={toggleDialog}/>) : <Typography  variant={"h5"} sx = {{ color: "black", fontWeight: "bold"}} >This user  { name == "Followers" ? "has no followers." : "is not following anyone."}</Typography>}
            </DialogContent>
            <DialogActions sx={ { display: "flex" , justifyContent: "space-between"}}>
                <Button  variant={"contained"} onClick={toggleDialog} autoFocus>
                    Close
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default FollowersDialog
