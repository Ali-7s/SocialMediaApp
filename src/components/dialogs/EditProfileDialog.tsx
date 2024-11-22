import {
    Avatar, Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField
} from "@mui/material";
import {useUserContext} from "../../hooks/useUserContext.tsx";
import React, {useEffect, useRef, useState} from "react";
import {UpdateUserProfileReq, User} from "../../types.tsx";
import {getAuthedUser, setUserProfileImg, updateProfile, useGetUserImage} from "../../api/api.ts";
import {toastSuccess} from "../../services/ToastService.tsx";
import {useQueryClient} from "@tanstack/react-query";

type EditProfileDialogProps = {
    open: boolean,
    toggleDialog: () => void
}


const EditProfileDialog = ({open, toggleDialog}: EditProfileDialogProps) => {
    const {user, setUser} = useUserContext();
    const queryClient = useQueryClient();
    const inputRef = useRef<HTMLInputElement>(null);
    const [file, setFile] = useState<File>();
    const [userReq, setUserReq] = useState<UpdateUserProfileReq>({
        displayName: user.displayName,
        username: user.username,
        photoUrl: user.photoUrl
    })
    const photoUrl = useGetUserImage(user.id).data?.data.profile_img


    
    const selectImage = () => {
        if(inputRef.current) {
            inputRef.current.click();
        }
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUserReq({...userReq, [event.target.name]: event.target.value})
    }

    const handleCancelClick = () => {
        toggleDialog()
        setTimeout(() => {
            setUserReq({
                    displayName: user.displayName,
                    username: user.username,
                }
            )
        }, 150)
    }

    const handleSave = () => {
        updateProfile(userReq).then(
            async () => {
                toggleDialog()
                const authedUser = await getAuthedUser();
                setUser(authedUser as User);
            }
        )
    }

    useEffect(() => {
        if (file != null) {
            setUser(prevState => ({...prevState, photoUrl: ""}));
            setUserProfileImg(file as File).then(() => {
                queryClient.invalidateQueries({queryKey: ['photoUrl', user.id]}).then(
                    () => {
                        toastSuccess("Profile image updated!")
                    }
                )
            })
        }
    }, [file, queryClient, setUser, user.id]);

    return (
        <>
            <Dialog
                open={open}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Edit Profile"}
                </DialogTitle>
                <DialogContent>
                    <Box sx={{display: "flex", width: "100svw", alignItems: "center", marginBottom: "2em"}}>
                        <Avatar src={photoUrl}
                                sx={{width: "100px", height: "100px", border: "5px solid black", marginRight: "1em"}}/>
                        <Button variant={"outlined"} onClick={selectImage}>Update Photo </Button>

                    </Box>
                    <Box sx={{display: "flex", flexDirection: "column", gap: "1em"}}>
                        <TextField label={"Display Name"} name={"displayName"} variant={"standard"}
                                   value={userReq.displayName} onChange={handleChange}></TextField>
                        <TextField label={"Username"} name={"username"} variant={"standard"} value={userReq.username}
                                   onChange={handleChange}></TextField>
                    </Box>
                </DialogContent>

                <DialogActions sx={{display: "flex", justifyContent: "space-between"}}>
                    <Button variant={"contained"} onClick={handleSave}>Save</Button>
                    <Button onClick={handleCancelClick} variant={"contained"} autoFocus>
                        Cancel
                    </Button>
                </DialogActions>
            </Dialog>
            <form style={{display: 'none'}}>
                <input type={'file'} ref={inputRef} onChange={(event) => setFile(event.target.files![0])}
                       name={'file'}
                       accept={'image/*'}/>
            </form>
        </>
    )
}
export default EditProfileDialog
