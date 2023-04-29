import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme, Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { setFriends } from "state/authReducer";

import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import getCookie from "utils/GetCookies";

const Comment = ({ friendId, name, subtitle, userPicturePath, commentUser, comment, setDisplayComments, commentsDisplay, commentId, postId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.auth.token);
  // const friends = useSelector((state) => state.user.friends);
  const csrftoken = getCookie('csrftoken');

  const loggedInUser = useSelector((state) => state.auth.user);
  // const dateTimeAgo = moment(new Date(timestamp)).fromNow();

  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const dark = palette.neutral.dark;

  // const isFriend = friends.find((friend) => friend._id === friendId); //we want to show if the user is a friend, if they are a friend we want to show an icon to remove the friend, if they are not a friend we want the option to add friend

  // const patchFriend = async () => {
  //   const response = await fetch(
  //     `http://localhost:3001/users/${_id}/${friendId}`, //id is for the current user and we want the id of the friend we want to update
  //     {
  //       method: "PATCH",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //         "Content-Type": "application/json",
  //       },
  //     }
  //   );
  //   const data = await response.json();
  //   dispatch(setFriends({ friends: data }));
  // };


  const handleDeleteComment = async () => {
    const response = await fetch(
      `api/post/${postId}/comment/${loggedInUser}/${commentId}/delete/`,
      {
        method: "DELETE",
        headers: {
          'X-CSRFToken': csrftoken, 
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();

    if (response.ok) {
      console.log(data)
      const updatedDisplayComments = commentsDisplay.filter((comment) => comment.id !== commentId)
      setDisplayComments(updatedDisplayComments)

      // dispatch(deleteComment({ postId, commentId: comment._id }));
    } else {
      // Handle error here
      console.log(response)
    }
  };



  return (
    <Box display="flex" alignItems="flex-start" mb="1rem">
    {name && userPicturePath && (
      <Box
        sx={{
          "&:hover": {
            cursor: "pointer",
          },
          marginRight: '1rem'
        }}
        onClick={() => {
          navigate(`/profile/${commentUser}`);
          navigate(0);
        }}
      >
        {/* <img
          style={{
            objectFit: "cover",
            borderRadius: "50%",
            marginRight: "1rem",
          }}
          width={30}
          height={30}
          alt="user"
          src={userPicturePath}
        /> */}
          <UserImage image={userPicturePath} size="35px" 
          
          />
      </Box>
    )}
    <Box display="flex" flexDirection="column" justifyContent="center">
      {name && (
        <Typography
          variant="h6"
          sx={{
            "&:hover": {
              color: palette.primary.dark,
              cursor: "pointer",
            },
          }}
          onClick={() => {
            navigate(`/profile/${commentUser}`);
            navigate(0);
          }}
        >
          {name}
        </Typography>
      )}
      <Typography variant="h6" color={main}>
        {comment}
      </Typography>
      {/* <Typography variant="caption" color="text.secondary">
        {dateTimeAgo}
      </Typography> */}
    </Box>
    <Box marginLeft="auto">
      {loggedInUser === commentUser && (
        <Button
          size="small"
          onClick={handleDeleteComment}
          aria-label="delete"
          sx={{
            textTransform: "none",
            "&:hover": {
              backgroundColor: "transparent",
            },
          }}
        >
          <Typography
            variant="caption"
            color={main}
            sx={{
              "&:hover": {
                color: "red",
              },
            }}
          >
            Delete
          </Typography>
        </Button>
      )}
    </Box>
  </Box>
    // <FlexBetween>
    //   <FlexBetween gap="1rem">
    //     <UserImage image={userPicturePath} size="35px" />
    //     <Box
    //       onClick={() => {
    //         navigate(`/profile/${friendId}`);
    //         navigate(0); //there's a bug when you go to a certain person profile page and then you try to click on someone else's profile page, the url does update with react router but the components do not re-render. the easy dirty workaround is this navigate(0) where when you go to the users page we manually refresh it
    //       }}
    //     >
    //       <Typography
    //         color={dark}
    //         variant="h5"
    //         fontWeight="500"
    //         fontSize="0.9rem"
    //         mt="-1rem"
    //         sx={{
    //           "&:hover": {
    //             color: palette.primary.dark,
    //             cursor: "pointer",
    //           },
    //         }}
    //       >
    //         {name}
    //       </Typography>
    //       <Typography color={medium} fontSize="0.75rem">
            
    //       </Typography>
    //     </Box>
    //   </FlexBetween>

    // </FlexBetween>
  );
};

export default Comment;