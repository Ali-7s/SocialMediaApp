import {Avatar, Box, Divider, IconButton, Typography} from "@mui/material";
import {useUserContext} from "../../hooks/useUserContext.tsx";
import {AddAPhotoRounded} from "@mui/icons-material";
import {setUserProfileImg, useGetFollowers, useGetFollowing, useGetUserImage} from "../../api/api.ts";
import {useEffect, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {toastSuccess} from "../../services/ToastService.tsx";
import {Link} from "react-router-dom";

export const Sidebar = () => {
    const {user} = useUserContext();
    const queryClient = useQueryClient();
    const [file, setFile] = useState<File | null>(null);
    const photoUrl = useGetUserImage(user.id).data?.data.profile_img
    const { data: followersData } = useGetFollowers(
        user.id,);
    const { data: followingData } = useGetFollowing(
        user.id);



    useEffect(() => {
        if(file != null) {
            setUserProfileImg(file as File).then( () => {
                queryClient.invalidateQueries({ queryKey: ['photoUrl', user.id] }).then(
                    () => {
                        toastSuccess("Profile image updated!")

                    }
                )
            })
        }
    }, [file, queryClient, user.id]);

    return (
        <Box
            sx={{
                gridColumn: "1 / 2",
                gridRow: "1 / 3",
                backgroundColor: "white",
                borderRadius: "0.06em"
            }}
        >
            <Box>
                <Box sx={{
                    minHeight: "25svh",
                    padding: "1.5em",
                    backgroundColor: "transparent",
                    flex: 1,
                    margin: "0 auto",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}>
                    <Box sx={{position: "relative"}}>
                        <Avatar sx={{width: "7em", height: "7em", borderRadius: "50%", backgroundColor: "red"}}
                                alt="avatar"
                                aria-label="avatar" src={photoUrl}/>
                        <Box sx={{
                            color: "black",
                            backgroundColor: "white",
                            position: "absolute",
                            top: "5.8em",
                            left: "7.2em",
                            borderRadius: "50%",
                            width: "2.5em",
                            height: "2.5em",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            boxShadow: "0.5px 2px lightgrey"
                        }}>
                            <input
                                accept="image/*"
                                style={{display: 'none'}}
                                id="raised-button-file"
                                multiple
                                type="file"
                                onChange={(e) => setFile(e.target.files![0] as File)}
                            />
                            <label htmlFor="raised-button-file">
                                <IconButton  sx={{
                                    color: "black",
                                    maxHeight: "100%",
                                    backgroundColor: "transparent",
                                    maxWidth: "100%",
                                }} component="span">
                                    <AddAPhotoRounded/>
                                </IconButton>
                            </label>
                        </Box>
                    </Box>
                    <Link style = { { color: "black"} } to={"/profile"} state={user.id}><Typography variant="h5" component="h1" my={2} fontWeight={600} fontSize={18}
                                      sx={{color: "black"}}>{user.displayName}</Typography></Link>

                </Box>
                <Divider sx={{backgroundColor: "#bcbcbc", maxWidth: "10em", margin: "0 auto"}}/>
                <Box sx={{color: "black", backgroundColor: "blue"}}>
                    <Box sx={{
                        display: "flex",
                        backgroundColor: "white",
                        gap: "1em",
                        justifyContent: "center",
                        padding: "1.1em",
                        margin: "0 auto",
                        flexDirection: "row",
                        textAlign: "center"
                    }}>
                        <Box>
                        <Typography fontWeight={600} > {followingData?.length ?? 0}</Typography>
                        <Typography sx = { { color: "#8e8e8e"}} fontWeight={600}>Following </Typography>
                        </Box>
                    <Box>
                        <Typography fontWeight={600}> {followersData?.length ?? 0}</Typography>
                        <Typography sx = { { color: "#8e8e8e"}} fontWeight={600}>Followers</Typography>
                    </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
