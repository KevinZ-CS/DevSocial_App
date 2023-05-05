import { Box, useMediaQuery, useTheme, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";
import { useState } from "react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ProfilePage = () => {

const { userId } = useParams();
const theme = useTheme();
const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
const loggedInUser = useSelector((state) => state.auth.user);
const profileUserId = useSelector((state) => state.auth.profileUser);
const [error, setError] = useState('');

return (
    <Box>
      <ToastContainer />
      {error ? 
        <Box
        width="100%"
        backgroundColor={theme.palette.background.alt}
        p="1rem 6%"
        textAlign="center" >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
        {error}
        </Typography>
        </Box>
      : 
      <>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} setError={setError} />
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {profileUserId&&profileUserId.id === loggedInUser ? <MyPostWidget /> : null }
          <PostsWidget userId={userId} />
        </Box>
        {isNonMobileScreens && ( 
          <Box flexBasis="26%">
            <AdvertWidget />
            <Box m="2rem 0" />
            <FriendListWidget userId={userId} /> 
          </Box>
        )}
      </Box> 
      </>
      }
    </Box>
  );
};

export default ProfilePage;