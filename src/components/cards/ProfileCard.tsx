import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {
    Avatar,

    CardHeader,

    Typography
} from "@mui/material";

import {UserSummary} from "../../types.tsx";
import {useState} from "react";
import {useUserContext} from "../../hooks/useUserContext.tsx";

import {Link} from "react-router-dom";
import {useGetUserImage} from "../../api/api.ts";
import FollowButton from "../buttons/FollowButton.tsx";


interface ProfileCardProps {
    toggleDialog: () => void
    data: UserSummary;
}

const ProfileCard = ({data, toggleDialog}: ProfileCardProps) => {
    const {user} = useUserContext()
    const [isFollowing, setIsFollowing] = useState(true);
    const photoUrl = useGetUserImage(data.id).data?.data.profile_img

    return (
        <>
            <Card variant={"outlined"} sx={{display: "flex", justifyContent: "space-between", width: "34svw", height: "10svh"}} >
                <CardHeader onClick={toggleDialog}
                    avatar={<Avatar aria-label="avatar" src={photoUrl ?? ""}/>}
                    title={<Link to={`/${data.username}`} state={data.id} style={{textDecoration: "none"}}><Typography
                        variant="h6" sx={{
                        color: "black",
                        textDecoration: "none",
                        fontSize: "15px"
                    }}>{data.displayName}</Typography></Link>}
                    subheader={"@" + data.username}
                />
                <CardContent sx={{  display: "flex", margin: "0 auto"}}>
                    {user.id == data.id ? "" :
                        <FollowButton followingId={data.id} isFollowing={isFollowing}
                                      setIsFollowing={setIsFollowing}/>}
                </CardContent>
            </Card>
        </>
    )
}

export default ProfileCard;