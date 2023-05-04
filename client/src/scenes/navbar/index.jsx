import { useState } from "react";
import {
  Box,
  IconButton,
  InputBase,
  Typography,
  Select,
  MenuItem,
  FormControl,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  DarkMode,
  LightMode,
  Menu,
  Close,
  Settings,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state/authReducer";
import { setSearchKeyword, setPostsDisplay } from "state/postsReducer";
import { useNavigate } from "react-router-dom";
import FlexBetween from "components/FlexBetween";
import SettingsNavBar from "components/SettingsNavbar";
import EditAccountForm from "components/EditAccountForm";
import { toast } from 'react-toastify';
import getCookie from "utils/GetCookies";

const Navbar = () => {

const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
const dispatch = useDispatch();
const navigate = useNavigate();
const fullName = useSelector((state) => state.auth.full_name);
const searchKeyword = useSelector((state) => state.posts.searchKeyword);
const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");
const theme = useTheme(); 

const posts = useSelector((state) => state.posts.posts);

const neutralLight = theme.palette.neutral.light;
const dark = theme.palette.neutral.dark;
const background = theme.palette.background.default;
const primaryLight = theme.palette.primary.light;
const alt = theme.palette.background.alt;
const primaryDark = theme.palette.primary.dark;


const csrftoken = getCookie('csrftoken');

const token = useSelector((state) => state.auth.token);
const refreshToken = useSelector((state) => state.auth.refreshToken);
const tokenExpiration = useSelector((state) => state.auth.tokenExpiration);
const refreshTokenExpiration = useSelector((state) => state.auth.refreshTokenExpiration);

const neutral = theme.palette.neutral.dark;
const backgroundToast = theme.palette.background.alt

const [dialogOpen, setDialogOpen] = useState(false);
const [editAccOpen, setEditAccOpen] = useState(false);


const deleteAcc = async (userId) => {
  if (token && tokenExpiration && Date.now() < tokenExpiration && refreshToken && refreshTokenExpiration && Date.now() < refreshTokenExpiration) {
  
    const response = await fetch(
      `/api/users/${userId}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          'X-CSRFToken': csrftoken, 
       
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      dispatch(setLogout())
      dispatch(setSearchKeyword(''))
      setDialogOpen(false);
      console.log(data)
   

      toast.success("Account deleted successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        progress: undefined,
        style: {
          backgroundColor: backgroundToast,
          color: neutral,
        },
      });
      
    } else {
      setDialogOpen(false);
      console.log(data)
      toast.error("Failed to delete account. Try again later.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        progress: undefined,
        style: {
          backgroundColor: backgroundToast,
          color: neutral,
        },
      });
    }
  }  else {
    dispatch(setLogout())
  }
};


function handleKeyDown(e) {
  if(searchKeyword&&e.keyCode === 13) {
  e.preventDefault()
  navigate("/home")
  dispatch(setPostsDisplay(posts.filter((post) =>
  (post.userData.first_name + post.userData.last_name)
  .toLowerCase()
  .includes(searchKeyword.split(' ').join('').toLowerCase())
  )))
}}




const handleDialogClose = () => {
  setDialogOpen(false);
};

const handleEditFormClose = () => {
  setEditAccOpen(false)
};

const handleEditAccOpen = () => {
  setEditAccOpen(true)
};


return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt} >
      <FlexBetween gap="1.75rem">
        <Typography
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"  
          color="primary"
          onClick={() => {
            navigate("/home")
            dispatch(setSearchKeyword(''))
            dispatch(setPostsDisplay(posts))
          }}
          sx={{
            "&:hover": {
              color: primaryDark,
              cursor: "pointer",
            }, 
          }}
        >
          DevSocial
        </Typography>

        <SettingsNavBar 
           open={dialogOpen}
           handleClose={handleDialogClose}
           editForm={handleEditAccOpen}
           onDeleteAcc={deleteAcc}
        />

        <EditAccountForm 
               open={editAccOpen}
               handleClose={handleEditFormClose}
        />

        {isNonMobileScreens && ( 
          <FlexBetween
            backgroundColor={neutralLight}
            borderRadius="9px"
            gap="3rem"
            padding="0.1rem 1.5rem" 
          >
            <InputBase 
            placeholder="Search posts by users..." 
            value={searchKeyword}
            onChange={(e) => dispatch(setSearchKeyword(e.target.value))}
            onKeyDown={handleKeyDown}
            />

            <IconButton onClick={() => {
              navigate("/home")
              dispatch(setPostsDisplay(posts.filter((post) =>
              (post.userData.first_name + post.userData.last_name)
              .toLowerCase()
              .includes(searchKeyword.split(' ').join('').toLowerCase())
              )))
              
            } 
              }
              >
              <Search />
            </IconButton>
          </FlexBetween>
        )}
      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkMode sx={{ fontSize: "25px" }} />     
            ) : (
              <LightMode sx={{ color: dark, fontSize: "25px" }} /> 
            )}
          </IconButton>
      
          <FormControl variant="standard" value={fullName}> 
            <Select
              value={fullName}
              sx={{
                backgroundColor: neutralLight,
                width: "150px",
                borderRadius: "0.25rem",
                p: "0.25rem 1rem",
                "& .MuiSvgIcon-root": { 
                  pr: "0.25rem",
                  width: "3rem",
                },
                "& .MuiSelect-select:focus": {
                  backgroundColor: neutralLight,
                },
              }}
              input={<InputBase />}
            >
              <MenuItem value={fullName} >
                <Typography>{fullName}</Typography>
              </MenuItem>
              <MenuItem 
              onClick={() => {
                setDialogOpen(true)
              }
                }
              >
                Settings
              </MenuItem>
              <MenuItem onClick={() => {
                dispatch(setLogout())
                dispatch(setSearchKeyword('')) }
                }>Log Out</MenuItem>
            </Select>
          </FormControl>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <Menu />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close />
            </IconButton>
          </Box>

          {/* MENU ITEMS same as DESKTOP NAV but with a few adjustments to FlexBetween component*/}  
          <FlexBetween
            display="flex"
            flexDirection="column" 
            justifyContent="center" 
            alignItems="center" 
            gap="3rem"
          > 
            <IconButton
              onClick={() => dispatch(setMode())}
              sx={{ fontSize: "25px" }}
            >
              {theme.palette.mode === "dark" ? (
                <DarkMode sx={{ fontSize: "25px" }} />
              ) : (
                <LightMode sx={{ color: dark, fontSize: "25px" }} />
              )}
            </IconButton>

            <FormControl variant="standard" value={fullName}>
              <Select
                value={fullName}
                sx={{
                  backgroundColor: neutralLight,
                  width: "150px",
                  borderRadius: "0.25rem",
                  p: "0.25rem 1rem",
                  "& .MuiSvgIcon-root": {
                    pr: "0.25rem",
                    width: "3rem",
                  },
                  "& .MuiSelect-select:focus": {
                    backgroundColor: neutralLight,
                  },
                }}
                input={<InputBase />}
              >
                <MenuItem value={fullName}>
                  <Typography>{fullName}</Typography>
                </MenuItem>
                <MenuItem onClick={() => dispatch(setLogout())}>
                  Log Out
                </MenuItem>
              </Select>
            </FormControl>
          </FlexBetween>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Navbar;