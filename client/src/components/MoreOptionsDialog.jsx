import React from "react";
import {
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
} from "@mui/material";

const MoreOptionsDialog = ({ open, handleClose, postId, onDeletePost, editForm }) => {

return (
  <Dialog
    onClose={handleClose}
    open={open}
    fullWidth
    maxWidth="xs"
    sx={{
      marginTop: "-10rem",
      "& .MuiDialogContent-root": {
        padding: 0,
      },
      "& .MuiPaper-root": {
        borderRadius: "10px",
      },
    }}>
        
    <DialogContent>
      <List
        sx={{
          padding: 0,
        }}
      >
        <ListItem disablePadding>
          <ListItemButton onClick={() => onDeletePost(postId)}>
            <ListItemText
              primary="Delete"
              sx={{
                textAlign: "center",
                color: "red",
              }}
            />
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem disablePadding>
          <ListItemButton onClick={() => {
              handleClose()
              editForm()
              }}>
            <ListItemText
              primary="Edit"
              sx={{
                textAlign: "center",
              }}
            />
          </ListItemButton>
        </ListItem>
        
        <Divider />
    
        <ListItem disablePadding>
          <ListItemButton onClick={handleClose}>
            <ListItemText
              primary="Cancel"
              sx={{
                textAlign: "center",
              }}
            />
          </ListItemButton>
        </ListItem>

      </List>

    </DialogContent>

  </Dialog>
  );
};

export default MoreOptionsDialog;