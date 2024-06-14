"use client"

import {getAuthedUser, getPosts} from "../../api/api.ts";
import PostCard from "../../components/cards/PostCard.tsx";
import { useQuery } from "@tanstack/react-query";
import {Sidebar} from "../../components/sidebar/Sidebar.tsx";
import {Post, User} from "../../types.tsx";
import {Box} from "@mui/material";
import CreatePostBox from "../../components/createpost/CreatePostBox.tsx";
import { useEffect, useState} from "react";
import {useUserContext} from "../../hooks/useUserContext.tsx";
import {useNavigate} from "react-router-dom";
import {toastSuccess} from "../../services/ToastService.tsx";

const Home = ( ) => {
    const navigate = useNavigate();
    const {setUser, auth} = useUserContext();
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        if(!auth) {
            navigate("/")
            toastSuccess("Successfully logged out")
        } else {
            getAuthedUser().then( user => setUser(user as User));
        }

    }, [auth, navigate, setUser]);


    const {data, error, isSuccess} = useQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
    });

    useEffect(() => {
        setPosts(data?.sort( (post1, post2) => {
            return new Date(post2.createdAt).getTime() - new Date(post1.createdAt).getTime()
        }) as Post[])
    }, [data]);

    if (!isSuccess) {
        return <span>Loading...</span>
    } else if (error) {
        return <span>Error when fetching posts...</span>
    }

        return (
            <>
                <Box sx={
                    { backgroundColor: "#white",
                        display: "flex",
                        flexDirection: {
                            xs: "column",
                            lg: "row"
                        },
                        color: "white",
                        padding: 3,
                        gap: 3,
                        overflow: "hidden",
                        height: "100vh",
                        paddingTop: "100px",
                    }
                }>
                    <Sidebar/>

                    <Box sx={{ width: "50vw", overflowY: "scroll"}}>
                        <CreatePostBox/>
                        <Box>
                            {posts?.map(post => <PostCard data={post} key={post.id}/>)}
                        </Box>
                    </Box>
                </Box>
            </>
        );

};

export default Home;