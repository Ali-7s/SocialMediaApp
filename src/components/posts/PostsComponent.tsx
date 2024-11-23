import {Box, Button} from "@mui/material";
import LoadingCard from "../cards/LoadingCard.tsx";
import PostCard from "../cards/PostCard.tsx";
import {Pageable, Post} from "../../types.tsx";
import  {useEffect, useState} from "react";


type PostComponentProps = {
    data: Pageable,
    isLoading?: boolean;
    isFetching?: boolean;
    isPlaceholderData?: boolean;
    currentPage: number;
    setCurrentPage: (p: (prev: number) => number) => void;
}

const PostsComponent = ({data, isLoading, isFetching, isPlaceholderData, currentPage, setCurrentPage}: PostComponentProps) => {
    const [lastPage, setLastPage] = useState(0);
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        if (data) {
            setLastPage(data.totalPages);
            setPosts(data.content);
        }

    }, [data, currentPage]);

        return (

        <>

            <Box
                sx={{
                    overflowY: "auto",
                    gridRow: "span 5",
                    gridColumn: "span 5",
                    width: "100%",
                    padding: "1em",
                    backgroundColor: "#fff",
                    borderRadius: "8px",

                }}
            >
                {isLoading ? (
                    <>
                        <LoadingCard />
                        <LoadingCard />
                        <LoadingCard />
                        <LoadingCard />
                        <LoadingCard />
                    </>
                ) : (
                    posts.map((post) => <PostCard data={post} key={post.id} />)
                )}
            </Box>

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "1em",
                }}
            > { currentPage === 0 || isFetching ? <Button sx={ { visibility: "hidden"}}>Previous</Button> : <Button
                variant="contained"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
            >
                Previous
            </Button>}

                <Box sx={{ display: "flex", alignItems: "center", color: "black" }}>
                    Page {currentPage + 1} of {lastPage}
                </Box>
                <Button
                    variant="contained"
                    onClick={() => {
                        if ( !isPlaceholderData && currentPage + 1 < lastPage) {
                            setCurrentPage((prev) => prev + 1);
                        }
                    }}
                    disabled={currentPage + 1 >= lastPage || isFetching}
                >
                    Next
                </Button>
            </Box>

        </>

    )
}
export default PostsComponent
