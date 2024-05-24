import {Dialog} from "@mui/material";
import EditCard from "../cards/EditCard.tsx";
import {Post} from "../../types.tsx";

type EditDialogProps = {
    open: boolean,
    postData: Post
    toggleDialog: () => void
}

const EditDialog = ( { open, postData, toggleDialog } : EditDialogProps) => {
    return (
       <Dialog open={open} fullWidth={true}
               onClose={toggleDialog}>
          <EditCard data={postData} key={postData.id}  toggleDialog={toggleDialog}/>
       </Dialog>
    )
}
export default EditDialog
