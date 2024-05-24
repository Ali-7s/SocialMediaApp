import {Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@mui/material";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deletePost} from "../../api/api.ts";

type DeleteDialogProps = {
    open: boolean,
    id: number
    toggleDialog: () => void
}


const DeleteDialog = ( { open, id, toggleDialog } : DeleteDialogProps) => {
    const queryClient = useQueryClient()

    const handleDeleteClick = (id: number) => {
        deleteMutation.mutate(id)
    }

    const deleteMutation = useMutation(
        {
            mutationFn: deletePost,
            onSuccess: () => {
                console.log("Success");
                queryClient.invalidateQueries( {queryKey: ["posts"]}).then();
            },
            onError: error => {
                console.error(error)
            }
        })

    return (
        <Dialog
            open={open}
            onClose={toggleDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Delete post"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this post? This action can't be undone.
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={ { display: "flex" , justifyContent: "space-between"}}>
                <Button  variant={"contained"} onClick={() => {
                    handleDeleteClick(id)
                }}>Confirm</Button>
                <Button  variant={"contained"} onClick={toggleDialog} autoFocus>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default DeleteDialog
