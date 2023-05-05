import { Box, Typography, useTheme, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserImage from "./UserImage";
import getCookie from "utils/GetCookies";
import { setLogout } from "state/authReducer";
import { useDispatch } from "react-redux";
import { toast } from 'react-toastify';

const Comment = ({ name, userPicturePath, commentUser, comment, setDisplayComments, commentsDisplay, commentId, postId }) => {

const navigate = useNavigate();
const dispatch = useDispatch();

const { palette } = useTheme();
const main = palette.neutral.main;
const neutral = palette.neutral.dark;
const background = palette.background.alt

const csrftoken = getCookie('csrftoken');
const loggedInUser = useSelector((state) => state.auth.user);
const token = useSelector((state) => state.auth.token);
const refreshToken = useSelector((state) => state.auth.refreshToken);
const tokenExpiration = useSelector((state) => state.auth.tokenExpiration);
const refreshTokenExpiration = useSelector((state) => state.auth.refreshTokenExpiration);

const handleDeleteComment = async () => {
  if (token && tokenExpiration && Date.now() < tokenExpiration && refreshToken && refreshTokenExpiration && Date.now() < refreshTokenExpiration) {
  const response = await fetch(
    `/api/posts/${postId}/comment/${loggedInUser}/${commentId}/delete/`,
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
    const updatedDisplayComments = commentsDisplay.filter((comment) => comment.id !== commentId)
    setDisplayComments(updatedDisplayComments)
    toast.success('Comment Deleted!', {
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
  } } else {
  dispatch(setLogout()) }};

return (
  
  <Box display="flex" alignItems="flex-start" mb="1rem" >
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
        <UserImage image={userPicturePath} size="35px" />
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
       <Typography variant="h6" color={main} style={{ wordWrap: 'break-word' }}  maxWidth= "510px" >
        {comment}
       </Typography>
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
          }} >

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
  </Box> )};

export default Comment;