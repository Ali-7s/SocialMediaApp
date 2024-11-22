"use client";

import { getPosts } from "../../api/api.ts";
import PostCard from "../../components/cards/PostCard.tsx";
import { Sidebar } from "../../components/sidebar/Sidebar.tsx";
import { Post } from "../../types.tsx";
import { Box, Button, Typography } from "@mui/material";
import CreatePostBox from "../../components/createpost/CreatePostBox.tsx";
import { useEffect, useState } from "react";
import LoadingCard from "../../components/cards/LoadingCard.tsx";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useWebSocket } from "../../contexts/WebSocketContext.tsx";
import { toastSuccess } from "../../services/ToastService.tsx";

const Home = () => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [lastPage, setLastPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const { data, isLoading, isFetching, isPlaceholderData } = useQuery({
        queryKey: ["posts", currentPage],
        queryFn: () => getPosts(currentPage),
        placeholderData: keepPreviousData,
    });

    const { isConnected, subscribeToTopic } = useWebSocket();

    useEffect(() => {
        if (data) {
            setLastPage(data.totalPages);
            setPosts(data.content);
        }
    }, [data]);

    // WebSocket subscription for notifications
    useEffect(() => {
        if (isConnected) {
            subscribeToTopic("/user/queue/notifications", (message) => {
                toastSuccess(`New notification: ${message.content}`);
            });
        }
    }, [isConnected, subscribeToTopic]);

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr 1fr",
                gridTemplateRows: "repeat(5, 1fr)",
                maxInlineSize: "100vw",
                gap: "1em",
                paddingTop: "1.5em",
                paddingLeft: "1.5em",
                maxHeight: "85vh",
            }}
        >
            <Sidebar />

            <CreatePostBox />

            <Box
                sx={{
                    overflowY: "auto",
                    maxHeight: "80vh",
                    gridRow: "span 5",
                    gridColumn: "2/5",
                    padding: "1em",
                    backgroundColor: "#f4f4f4",
                    borderRadius: "8px",
                    border: "1px solid #ddd",

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

                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: "1em",
                    }}
                >
                    {currentPage === 0 || isFetching ? (
                        <Button sx={{ visibility: "hidden" }}>Previous</Button>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 0))}
                            sx={{
                                textTransform: "none",
                                backgroundColor: "#1976D2",
                                "&:hover": { backgroundColor: "#1565C0" },
                            }}
                        >
                            Previous
                        </Button>
                    )}

                    <Typography
                        sx={{
                            fontWeight: "bold",
                            fontSize: "14px",
                            color: "#333",
                        }}
                    >
                        Page {currentPage + 1} of {lastPage}
                    </Typography>

                    <Button
                        variant="contained"
                        onClick={() => {
                            if (!isPlaceholderData && currentPage + 1 < lastPage) {
                                setCurrentPage((prev) => prev + 1);
                            }
                        }}
                        disabled={currentPage + 1 >= lastPage || isFetching}
                        sx={{
                            textTransform: "none",
                            backgroundColor: "#1976D2",
                            "&:hover": { backgroundColor: "#1565C0" },
                        }}
                    >
                        Next
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default Home;
