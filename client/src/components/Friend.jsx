import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import getCookie from "utils/GetCookies";
import { addFriend, removeFriend } from 'state/authReducer';
import { setSearchKeyword } from 'state/postsReducer';
import { setLogout } from "state/authReducer";
import { toast } from 'react-toastify';


const Friend = ({ friendId, name, subtitle, userPicturePath, friendListFlag }) => {
  
const dispatch = useDispatch();
const navigate = useNavigate();

const loggedInUser = useSelector((state) => state.auth.user);
const friends = useSelector((state) => state.auth.friendsList);
const csrftoken = getCookie('csrftoken');
const isFriend = friends.find((friend) => friend.id === friendId); 

const { palette } = useTheme();
const primaryLight = palette.primary.light;
const primaryDark = palette.primary.dark;
const main = palette.neutral.main;
const medium = palette.neutral.medium;

const neutral = palette.neutral.dark;
const background = palette.background.alt

const token = useSelector((state) => state.auth.token);
const refreshToken = useSelector((state) => state.auth.refreshToken);
const tokenExpiration = useSelector((state) => state.auth.tokenExpiration);
const refreshTokenExpiration = useSelector((state) => state.auth.refreshTokenExpiration);


const patchFriend = async () => {
  if (token && tokenExpiration && Date.now() < tokenExpiration && refreshToken && refreshTokenExpiration && Date.now() < refreshTokenExpiration) {
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
      toast.success('Friend Added!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        style: {
          backgroundColor: background,
          color: neutral,
        },
      });
  } else {
      console.log(data)
      dispatch(removeFriend(friendId))
      toast.success('Friend Removed!', {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        style: {
          backgroundColor: background,
          color: neutral,
        },
      })
  }
} else {
  dispatch(setLogout())
}
};

  return (
    <FlexBetween>
      <FlexBetween gap="1rem" mt="-0.75rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            dispatch(setSearchKeyword(''))
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