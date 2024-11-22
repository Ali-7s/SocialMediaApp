import {Button } from "@mui/material";
import EditProfileDialog from "../dialogs/EditProfileDialog.tsx";
import {useState} from "react";

const EditProfileButton = () => {
    const [editDialogOpen, setEditDialogOpen] = useState(false)

    const toggleEditDialog = () => {
        setEditDialogOpen(!editDialogOpen)
    }

    return (
        <>
            <Button
                onClick={() => setEditDialogOpen(!editDialogOpen)}
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
                Edit Profile
            </Button>
            <EditProfileDialog open={editDialogOpen} toggleDialog={toggleEditDialog} />
        </>

            )
}
export default EditProfileButton
