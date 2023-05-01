import { Box, Typography, useTheme } from "@mui/material";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFriends, setProfileFriends } from "state/authReducer"; 
import { useLocation } from "react-router-dom";

const FriendListWidget = ({ userId }) => {
  const dispatch = useDispatch();
  const { palette } = useTheme();
  const token = useSelector((state) => state.auth.token);
  const loggedInUser = useSelector((state) => state.auth.user);

  const friends = useSelector((state) => state.auth.friendsList);
  const profileFriends = useSelector((state) => state.auth.profileFriendsList);

  const { pathname } = useLocation();
  const profilePath = pathname.split("/")[1]; // extracts "profile" from "/profile/123"


  //work on deleting post, maybe update?
  //patch usfer profile
  //add modals for confirmation messages
  //work on error pages
  //work on search bar

  const getFriends = async () => {
    const response = await fetch(
      `/api/users/${loggedInUser}/friends/`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    const data = await response.json();
    if(response.ok) {
    dispatch(setFriends(data)) 
    } else {console.log(data)}
  };


const getProfileFriends = async () => {
  const response = await fetch(
    `/api/users/${userId}/friends/`, 
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );

  const data = await response.json();
  if(response.ok) {
    dispatch(setProfileFriends(data))

  
} else {
  console.log(data) 
}
};

useEffect(() => {
  getFriends();
}, []); 

useEffect(() => {
  if (profilePath === 'profile' && parseInt(userId) !==loggedInUser) {
    getProfileFriends(); 
  } 
}, [userId]); 

return (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">

        {profilePath === 'profile' && parseInt(userId) !==loggedInUser ? 
            <> 
        {profileFriends.map((friend) => (
        <Friend
            key={friend.id}
            friendId={friend.id}
            name={`${friend.first_name} ${friend.last_name}`}
            subtitle={friend.occupation}
            userPicturePath={friend.image}
            currentProfileId={userId}
            friendListFlag={true}
        />
        ))} </>  :    <>
        {friends.map((friend) => (
          <Friend
            key={friend.id}
            friendId={friend.id}
            name={`${friend.first_name} ${friend.last_name}`}
            subtitle={friend.occupation}
            userPicturePath={friend.image}
            currentProfileId={userId}
          />
        ))}  </>
        }
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;