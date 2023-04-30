import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { setFriends } from "state";

import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import getCookie from "utils/GetCookies";
import { setPosts } from 'state/postsReducer';
import { addFriend, removeFriend } from 'state/authReducer';


const Friend = ({ friendId, name, subtitle, userPicturePath, friendListFlag }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
//   const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);
//   const friends = useSelector((state) => state.user.friends);

const loggedInUser = useSelector((state) => state.auth.user);
const friends = useSelector((state) => state.auth.friendsList);
//let friends;
//if( ---profile) { friends =}

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const csrftoken = getCookie('csrftoken');


  const isFriend = friends.find((friend) => friend.id === friendId); //we want to show if the user is a friend, if they are a friend we want to show an icon to remove the friend, if they are not a friend we want the option to add friend

  const patchFriend = async () => {
    const response = await fetch(
        `/api/users/${loggedInUser}/friends/${friendId}/update/`, //id is for the current user and we want the id of the friend we want to update
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
          onClick={() => {
            // dispatch(setPosts([]))
            navigate(`/profile/${friendId}`);
            // navigate(0); //there's a bug when you go to a certain person profile page and then you try to click on someone else's profile page, the url does update with react router but the components do not re-render. the easy dirty workaround is this navigate(0) where when you go to the users page we manually refresh it
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
          <PersonAddOutlined sx={{ color: primaryDark }} /> //depending if theyre a friend or not we're going to show a different icon
        )}
      </IconButton> }
    </FlexBetween>
  );
};

export default Friend;