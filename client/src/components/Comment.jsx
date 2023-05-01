import { Box, Typography, useTheme, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserImage from "./UserImage";
import getCookie from "utils/GetCookies";

const Comment = ({ name, userPicturePath, commentUser, comment, setDisplayComments, commentsDisplay, commentId, postId }) => {

const navigate = useNavigate();
const token = useSelector((state) => state.auth.token);
const csrftoken = getCookie('csrftoken');
const loggedInUser = useSelector((state) => state.auth.user);

const { palette } = useTheme();
const primaryLight = palette.primary.light;
const primaryDark = palette.primary.dark;
const main = palette.neutral.main;
const medium = palette.neutral.medium;
const dark = palette.neutral.dark;

const handleDeleteComment = async () => {
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
  } else {

    console.log(data)
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
  
  );
};

export default Comment;