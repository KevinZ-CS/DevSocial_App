import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import getCookie from "utils/GetCookies";
import { addFriend, removeFriend } from 'state/authReducer';


const Friend = ({ friendId, name, subtitle, userPicturePath, friendListFlag }) => {
  
const dispatch = useDispatch();
const navigate = useNavigate();
const token = useSelector((state) => state.auth.token);
const loggedInUser = useSelector((state) => state.auth.user);
const friends = useSelector((state) => state.auth.friendsList);
const csrftoken = getCookie('csrftoken');
const isFriend = friends.find((friend) => friend.id === friendId); 

const { palette } = useTheme();
const primaryLight = palette.primary.light;
const primaryDark = palette.primary.dark;
const main = palette.neutral.main;
const medium = palette.neutral.medium;


const patchFriend = async () => {
  
  const response = await fetch(
      `/api/users/${loggedInUser}/friends/${friendId}/update/`, 
    {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          'X-CSRFToken': csrftoken, 
          Authorization: `Bearer ${token}`,
  
      },
      body: JSON.stringify({
          user: loggedInUser,
          friend: friendId
        })
    }
  );
  const data = await response.json();

  if(data.message === 'friend') {
      console.log(data)
      
      dispatch(addFriend(data.data))
  } else {
      console.log(data)
      dispatch(removeFriend(friendId))
  }

};

  return (
    <FlexBetween>
      <FlexBetween gap="1rem" mt="-0.75rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {navigate(`/profile/${friendId}`);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.dark,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>
      {loggedInUser === friendId || friendListFlag ? null :
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem", mr: "-0.5rem" }}
      >
        {isFriend ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} /> 
        )}
      </IconButton> }
    </FlexBetween>
  );
};

export default Friend;