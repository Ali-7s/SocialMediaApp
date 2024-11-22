import {Button} from "@mui/material";
import {Link} from "react-router-dom";
import {fetchMessages} from "../../api/api.ts";

type MessageButtonProps = {
    senderId: number,
    recipientId: number,

}

const MessageButton = ( { senderId, recipientId}: MessageButtonProps) => {


    const handleFollowingMouseEnter = () => {

    }

    const handleFollowingMouseLeave = () => {

    }




    const handleButtonClick = () => {
         fetchMessages(senderId, recipientId).then(r => {
             return r;
             }
         );
    }

    return (
        <Link state={recipientId} to={`/chat/${recipientId}`} style={{ textDecoration: 'none' }}>
            <Button
                onMouseEnter={handleFollowingMouseEnter}
                onMouseLeave={handleFollowingMouseLeave}
                onClick={handleButtonClick}
                sx={{
                    marginLeft: "auto",
                    marginTop: "130px",
                    marginRight: "20px",
                    padding: "8px 16px",
                    fontWeight: "bold",
                    borderRadius: "12px",
                    border: "solid 1px #ccc",
                    backgroundColor: "#708090",
                    color: "white",
                    "&:hover": {
                        backgroundColor: "#607080",
                        borderColor: "#ccc"
                    },
                }}
            >
                Message
            </Button>
        </Link>
    )
}
export default MessageButton
