import {Avatar, Box, Typography, Paper, Tabs} from "@mui/material";
import Tab from '@mui/material/Tab';




import { useLocation} from "react-router-dom";
import React, { useEffect, useState } from "react";
import {
    getUser, getUserFollowingPosts, getUserLikedPosts,
    getUserPosts,
    useGetFollowers,
    useGetFollowing, useGetUserImage,
} from "../../api/api.ts";
import { UserSummary, UserProfile, Pageable} from "../../types.tsx";
import FollowButton from "../../components/buttons/FollowButton.tsx";
import { useUserContext } from "../../hooks/useUserContext.tsx";
import EditProfileButton from "../../components/buttons/EditProfileButton.tsx";
import {keepPreviousData, useQuery} from "@tanstack/react-query";
import MessageButton from "../../components/buttons/MessageButton.tsx";
import FollowersDialog from "../../components/dialogs/FollowersDialog.tsx";
import PostsComponent from "../../components/posts/PostsComponent.tsx";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}


const Profile = () => {
    const [user, setUser] = useState<UserProfile>();
    const [followers, setFollowers] = useState<UserSummary[]>([]);
    const [following, setFollowing] = useState<UserSummary[]>([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const authedUserId = useUserContext().user.id;
    const location = useLocation();
    const userId = location.state;
    const photoUrl = useGetUserImage(userId).data?.data.profile_img
    const [currentPage, setCurrentPage] = useState(0);
    const [value, setValue] = React.useState(0);
    const [boxName, setBoxName] = useState("");
    const [followerDialogOpen, setFollowerDialogOpen] = useState(false)

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };


    const { data} = useQuery({
        queryKey: ["userPosts", currentPage, userId],
        queryFn: () => getUserPosts(currentPage, userId),
        placeholderData: keepPreviousData,
    });

    const { data: followingPostsData } = useQuery({
        queryKey: ["userFollowingPosts", currentPage],
        queryFn: () => getUserFollowingPosts(currentPage),
        placeholderData: keepPreviousData,
    });

    const { data: likedPostsData} = useQuery({
        queryKey: ["userLikedPosts", currentPage],
        queryFn: () => getUserLikedPosts(currentPage),
        placeholderData: keepPreviousData,
    });

    

    const { data: followersData } = useGetFollowers(
        userId,);
    const { data: followingData } = useGetFollowing(
        userId);


    useEffect(() => {
        getUser(userId)
            .then((u) => setUser(u as UserProfile))
    }, [ userId]);

    useEffect(() => {
        if (followersData) setFollowers(followersData);
        if (followingData) setFollowing(followingData);
    }, [data, followersData, followingData, followingPostsData, likedPostsData, value, currentPage]);

    useEffect(() => {
        if (followersData?.map((u) => u.id).includes(authedUserId)) {
            setIsFollowing(true);
        }
    }, [authedUserId, followersData]);

    function toggleFollowerDialog() {
        setFollowerDialogOpen(!followerDialogOpen);
    }

    const handleBoxClick = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();

        const name = e.currentTarget.getAttribute('data-name');

        if (name !== null) {
            setBoxName(name);
        } else {
            console.warn('Attribute "data-name" not found on the clicked element.');
        }

        toggleFollowerDialog();
    }

    
    return (
        <>
            <Box
                sx={{
                    maxInlineSize: "90svw",
                    margin: "0 auto",
                    padding: "2em",
                    color: "#333",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    maxWidth: "95%",
                    maxHeight: "70svh",
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        backgroundColor: "#fff",
                        padding: "2em",
                        borderRadius: "12px",
                        boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
                        width: "100%",
                        marginBottom: "1em",
                    }}
                >
                    <Avatar
                        src={photoUrl}
                        sx={{
                            height: "120px",
                            width: "120px",
                            border: "3px solid #4e4e4e",
                            marginRight: "1em",
                        }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: "bold", color: "#444" }}
                        >
                            {user?.displayName}
                        </Typography>
                        <Typography
                            variant="subtitle1"
                            sx={{ color: "#666", marginBottom: "0.5em" }}
                        >
                            @{user?.username}
                        </Typography>
                        <Box
                            sx={{
                                display: "flex",
                                gap: "1em",
                                color: "#666",
                                fontSize: "0.9rem",
                            }}
                        >
                            <Box sx={{ display: "flex", gap: "1.5em" }}>
                                <Box
                                    data-name="Following"
                                    onClick={handleBoxClick}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: "inherit",
                                        textDecoration: "none",
                                        '&:hover': { textDecoration: "underline", cursor: "pointer" }
                                    }}
                                >
                                    <Typography sx={{ fontWeight: "bold", marginRight: "4px" }}>
                                        {following?.length ?? 0}
                                    </Typography>
                                    <Typography>Following</Typography>
                                </Box>
                                <Box
                                    data-name="Followers"
                                    onClick={handleBoxClick}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        color: "inherit",
                                        textDecoration: "none",
                                        '&:hover': { textDecoration: "underline", cursor: "pointer" }
                                    }}
                                >
                                    <Typography sx={{ fontWeight: "bold", marginRight: "4px" }}>
                                        {followers?.length ?? 0}
                                    </Typography>
                                    <Typography>Followers</Typography>
                                </Box>
                            </Box>

                        </Box>
                    </Box>
                    <Box sx={{ display: "flex", gap: "0.5em" }}>
                        {authedUserId === userId ? (
                            <EditProfileButton />
                        ) : (
                            <>
                                <MessageButton
                                    senderId={authedUserId}
                                    recipientId={userId}
                                />
                                <FollowButton
                                    followingId={userId}
                                    isFollowing={isFollowing}
                                    setIsFollowing={setIsFollowing}
                                />
                            </>
                        )}
                    </Box>

                </Paper>
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example"   textColor="inherit"
                              indicatorColor="primary">
                            <Tab label="My Posts" {...a11yProps(0)} />
                            <Tab label="Following Posts" {...a11yProps(1)} sx = { { display: user?.id == authedUserId ? "" : "none" } } />
                            <Tab label="Liked Posts" {...a11yProps(2)} sx = { { display: user?.id == authedUserId ? "" : "none" } } />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <PostsComponent data={data as Pageable} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <PostsComponent data={followingPostsData as Pageable} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <PostsComponent data={likedPostsData as Pageable} currentPage={currentPage} setCurrentPage={setCurrentPage}/>
                    </CustomTabPanel>
                </Box>
                <FollowersDialog open={followerDialogOpen} followers={followers} following={following} toggleDialog={toggleFollowerDialog} name={boxName}/>
            </Box>
        </>
    );
};

export default Profile;
