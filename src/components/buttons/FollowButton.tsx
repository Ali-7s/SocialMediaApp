import { Button } from "@mui/material";
import {followUser, unfollowUser} from "../../api/api.ts";
import {Dispatch, SetStateAction, useEffect, useState} from "react";
import {useQueryClient} from "@tanstack/react-query";

type FollowButtonProps = {
    followingId: number,
    isFollowing: boolean,
    setIsFollowing: Dispatch<SetStateAction<boolean>>
}

const FollowButton = ( {followingId, isFollowing, setIsFollowing }: FollowButtonProps) => {
    const [buttonText, setButtonText] = useState("")
    const queryClient = useQueryClient();
    

    useEffect(() => {
        setButtonText( isFollowing ? 'Following' : 'Follow');
    }, [isFollowing]);

    const handleFollowingMouseEnter = () => {
        if(isFollowing) {
            setButtonText("Unfollow")
        }
    }

    const handleFollowingMouseLeave = () => {
        if(isFollowing) {
            setButtonText("Following")
        }
    }

    const handleFollowClick = () => {
        followUser(followingId).then(  () => {
                queryClient.invalidateQueries().then()
            }
        )
    }

    const handleUnfollowClick = () => {
        unfollowUser(followingId).then(  () => {
                queryClient.invalidateQueries().then();
                setIsFollowing(false)
            }
        )
    }


    return (
        <Button
            onMouseEnter={handleFollowingMouseEnter}
            onMouseLeave={handleFollowingMouseLeave}
            onClick={isFollowing ? handleUnfollowClick : handleFollowClick}
            sx={{
                alignSelf: "end",
                padding: "8px 16px",     // Adds padding to keep spacing consistent
                minWidth: "10em",       // Ensures a consistent minimum width
                fontWeight: "bold",
                borderRadius: "12px",
                border: "solid 1px #ccc",
                display: "inline-flex",
                justifyContent: "center", // Centers text within the button
                textAlign: "center",      // Keeps text centered
                backgroundColor: isFollowing ? "#ff6961" : "#708090",
                color: "white",
                "&:hover": {
                    backgroundColor: isFollowing ? "#e57373" : "#607080",
                    borderColor: "#ccc"
                },
            }}
        >
            {buttonText}
        </Button>
    )
}
export default FollowButton
