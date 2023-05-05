import {
  Dialog,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  useTheme,
} from "@mui/material";
import {
  CheckCircle,
  } from "@mui/icons-material";
import { setAccountDeleted } from "state/authReducer";
import { useSelector, useDispatch } from "react-redux";

const AccountDeleteDialog = () => {

const dispatch = useDispatch()
const { palette } = useTheme();
const main = palette.primary.main;
const dialogOpen = useSelector((state) => state.auth.accountDeleted);

return (

  <Dialog
    onClose={() => dispatch(setAccountDeleted(false))}
    open={dialogOpen}
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
        <List sx={{ padding: 2, }}>
  
      <ListItem sx={{ display: 'flex', justifyContent: 'center' }}>
        <CheckCircle sx={{ fontSize: '3rem', margin: 'auto', color: main }} />
      </ListItem>

      <ListItem >
        <ListItemText
          primary="Your account has successfully been deleted."
          sx={{
            textAlign: "center",
          }}
        />
        </ListItem>

      <Divider />
     
      <ListItem disablePadding>
        <ListItemButton onClick={() => dispatch(setAccountDeleted(false))}>
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

export default AccountDeleteDialog;