import {getAuthedUser, getPosts} from "../../api/api.ts";
import PostCard from "../../components/cards/PostCard.tsx";
import { useQuery } from "@tanstack/react-query";
import {Sidebar} from "../../components/sidebar/Sidebar.tsx";
import {User} from "../../types.tsx";
import {Box} from "@mui/material";
import CreatePostBox from "../../components/createpost/CreatePostBox.tsx";
import { useEffect, useState} from "react";
import {useUserContext} from "../../hooks/useUserContext.tsx";

const Home = ( ) => {
    const {user, setUser} = useUserContext();
    const [posts, setPosts] = useState<Post[]>([])

    useEffect(() => {
        getAuthedUser().then( user => setUser(user as User));
    }, [setUser]);


    const {data, error, isSuccess} = useQuery({
        queryKey: ["posts"],
        queryFn: getPosts,
    });

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
                        overflowY: "hidden",
                        height: "100vh",
                        paddingTop: "100px",
                    }
                }>
                    <Sidebar user={user as User} />
                    
                    <Box sx={{ width: "50vw", overflowY: "scroll"}}>
                        <CreatePostBox user={user as User}/>
                        <Box>
                            {data?.map(post => <PostCard data={post} key={post.id}/>)}
                        </Box>
                    </Box>
                </Box>
            </>
        );

};

export default Home;