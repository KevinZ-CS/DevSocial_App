import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Navbar from "scenes/navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidget from "scenes/widgets/MyPostWidget";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidget from "scenes/widgets/UserWidget";
import AdvertWidget from "scenes/widgets/AdvertWidget";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const { userId } = useParams();
  const token = useSelector((state) => state.auth.token);

  const loggedInUser = useSelector((state) => state.auth.user);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");
  const profileUserId = useSelector((state) => state.auth.profileUser);

  

//   const getUser = async () => {
//     const response = await fetch(`/api/users/${userId}`, {
//       method: "GET",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await response.json();

//     if(response.ok) {
//     setUser(data); } else {
//         console.log(data)
//     }
//   };

//   useEffect(() => {
//     getUser();
//   }, [userId]); 

//   if (!profileUserId) return null;

  return (
    <Box>
      <Navbar />
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidget userId={userId} />
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
    </Box>
  );
};

export default ProfilePage;