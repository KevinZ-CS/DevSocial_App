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
import { useSelector } from "react-redux";

const SettingsNavBar = ({ open, handleClose, onDeleteAcc, editForm }) => {

const loggedInUser = useSelector((state) => state.auth.user);


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
          borderRadius: "16px",
        },
      }}
    >
      <DialogContent>
        <List
          sx={{
            padding: 0,
          }}
        >
          <ListItem disablePadding>
            <ListItemButton onClick={() => onDeleteAcc(loggedInUser)}> 
              <ListItemText
                primary="Delete Account"
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
                primary="Edit Account"
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

export default SettingsNavBar;