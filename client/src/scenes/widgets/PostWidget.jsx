import {
  ChatBubbleOutlineOutlined,
  FavoriteBorderOutlined,
  FavoriteOutlined,
  GitHub,
  PlayCircle,
  MoreHoriz,
  } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme, Card, CardContent, InputBase, Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import Comment from "components/Comment";
import MoreOptionsDialog from "components/MoreOptionsDialog";
import EditPostForm from "components/EditPostForm";
import getCookie from "utils/GetCookies";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setLogout } from "state/authReducer";
import { toast } from 'react-toastify';
import { setPosts, setPostsDisplay } from "state/postsReducer";

const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    likes,
    comments,
    github,
    demo,
  }) => {


const { palette } = useTheme();
const main = palette.neutral.main;
const primary = palette.primary.main;
const primaryDark = palette.primary.dark;
const neutral = palette.neutral.dark;
const background = palette.background.alt

const dispatch = useDispatch();
const [isComments, setIsComments] = useState(false); 
const [comment, setComment] = useState('');
const [displayComments, setDisplayComments] = useState(comments);
const [like, setLike] = useState(likes);

const csrftoken = getCookie('csrftoken');
const loggedInUser = useSelector((state) => state.auth.user);
const isLiked = like.some(obj => Object.values(obj).includes(loggedInUser));
const likeCount = like.length; 

const token = useSelector((state) => state.auth.token);
const refreshToken = useSelector((state) => state.auth.refreshToken);
const tokenExpiration = useSelector((state) => state.auth.tokenExpiration);
const refreshTokenExpiration = useSelector((state) => state.auth.refreshTokenExpiration);

const postsDisplay = useSelector((state) => state.posts.postsDisplay);

const [dialogOpen, setDialogOpen] = useState(false);
const [editPostOpen, setEditPostOpen] = useState(false);

const handleEditFormClose = () => {
  setEditPostOpen(false)
};

const handleEditFormOpen = () => {
  setEditPostOpen(true)
};

const handleDialogClose = () => {
  setDialogOpen(false);
};

const handleMoreHorizClick = () => {
  setDialogOpen(true);
};

const handlePostComment = async () => {
  if (token && tokenExpiration && Date.now() < tokenExpiration && refreshToken && refreshTokenExpiration && Date.now() < refreshTokenExpiration) {
  const response = await fetch(
    `/api/posts/${postId}/comment/create/`,
    {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'X-CSRFToken': csrftoken, 
        Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      comment: comment,
      user: loggedInUser,
      post: postId
    })
    }
  );
  if (!response.ok) {
    console.log(response);
  }
  const data = await response.json();
    setComment('')
    setDisplayComments([data, ...displayComments]); 
    toast.success('Comment Posted!', {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      style: {
        backgroundColor: background,
        color: neutral,
      },
    });
  } 
    
    else {
      dispatch(setLogout())
    }
};

   

const patchLike = async () => {
  if (token && tokenExpiration && Date.now() < tokenExpiration && refreshToken && refreshTokenExpiration && Date.now() < refreshTokenExpiration) {
  const response = await fetch(`/api/posts/${postId}/like/${loggedInUser}/update/`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      'X-CSRFToken': csrftoken, 
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ 
      post: postId,
      user: loggedInUser,
    }),
  });
  const updatedLike = await response.json(); 
  
  if(response.ok) {
    if(updatedLike.message === "like") {
      setLike([updatedLike.data, ...like])

    } else {
      const updatedLikes = like.filter((user) => user.user !== loggedInUser)
      setLike(updatedLikes)
  }

  } else {
    console.log(updatedLike)
  }
  } else {
    dispatch(setLogout())
  }
}; 

const deletePost = async (postId) => {
  if (token && tokenExpiration && Date.now() < tokenExpiration && refreshToken && refreshTokenExpiration && Date.now() < refreshTokenExpiration) {
  
    const response = await fetch(
      `/api/posts/${postId}/`,
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
      const updatedDisplayPosts = postsDisplay.filter((post) => post.id !== postId)
      dispatch(setPosts(updatedDisplayPosts))
      dispatch(setPostsDisplay(updatedDisplayPosts))
      setDialogOpen(false);

      toast.success("Post deleted successfully!", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        progress: undefined,
        style: {
          backgroundColor: background,
          color: neutral,
        },
      });
    } else {
      setDialogOpen(false);
      console.log(data)
      toast.error("Failed to delete the post. Try again later.", {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        progress: undefined,
        style: {
          backgroundColor: background,
          color: neutral,
        },
      });
    }
  }  else {
    dispatch(setLogout())
  }
};
  

return (
  <Card sx  ={{  padding: "1.5rem 1.5rem 0.75rem 1.5rem", mb: "2rem", backgroundColor: palette.background.alt,
  borderRadius: "0.75rem" }} >
    <CardContent>
    <Friend
      friendId={postUserId}
      name={name}
      subtitle={location}
      userPicturePath={userPicturePath}
      friendListFlag={false}
    />
    <Typography color={main} sx={{ mt: "1rem" }} style={{ wordWrap: 'break-word' }}  maxWidth= "625px">
      {description}

    </Typography >
      <br />

      <FlexBetween gap="1rem" mt="-0.5rem" mb="0.5rem">
        <FlexBetween gap="0.4rem">
          {github&&<> 
          <GitHub sx={{ fontSize: "30px" }} />
            <Typography color={main} fontWeight="500"
            sx={{ '& a': { textDecoration: 'none', color: main, '&:hover': { color: primaryDark } } }}
            >
            <a href={github} target="_blank">Github.</a>
            </Typography>
          </>}

          {demo&&<>
          <PlayCircle sx={{ fontSize: "30px" }} />
            <Typography color={main} fontWeight="500" sx={{ '& a': { textDecoration: 'none', color: main, '&:hover': { color: primaryDark } } }}>
            <a href={demo} target="_blank">Demo</a>
            </Typography>
          </>}
        </FlexBetween>
      </FlexBetween>
      
    {picturePath && (
      <Typography sx={{ display: 'flex', justifyContent: 'center', m: "0 -2.5rem" }}>
      <img
        width="100%"
        alt="post"
        style={{ borderRadius: "0rem", marginTop: "0.75rem", maxHeight: '50rem', objectFit: "cover" }}
        // src={`/api/${picturePath}`}
        src={`/api${picturePath}`}
      /> 
      </Typography>

    )}
    <FlexBetween mt="0.25rem" ml="-1rem">
      <FlexBetween gap="0.5rem">

        <FlexBetween gap="0.3rem">
          <IconButton onClick={patchLike}>
            {isLiked ? (
              <FavoriteOutlined sx={{ color: primary }} />
            ) : (
              <FavoriteBorderOutlined /> 
            )}
          </IconButton>
          <Typography>{likeCount}</Typography>
        </FlexBetween>

        <FlexBetween gap="0.3rem">
          <IconButton onClick={() => setIsComments(!isComments)}>
            <ChatBubbleOutlineOutlined />
              </IconButton>
          <Typography>{displayComments.length}</Typography>
        </FlexBetween>
      </FlexBetween>
      
      {loggedInUser === postUserId ?
      <Box>
        <IconButton onClick={handleMoreHorizClick} sx={{ padding: "0" }}>
            <MoreHoriz />
          </IconButton>
        <MoreOptionsDialog 
           open={dialogOpen}
           handleClose={handleDialogClose}
           editForm={handleEditFormOpen}
           postId={postId}
           onDeletePost={deletePost}
        />
           <EditPostForm 
           open={editPostOpen}
           handleClose={handleEditFormClose}
           postId={postId}
           description={description}
           picturePath={picturePath}
           githubUrl={github}
           demoUrl={demo}
        />

      </Box> : null
  }

    </FlexBetween>
    {isComments && (
      <Box mt="0.5rem">
      {displayComments.map((comment, i) => (
        <Box key={`${comment.userData.first_name}-${i}`} mt="1rem"> 
        <Comment
          friendId={postUserId}
          name={`${comment.userData.first_name} ${comment.userData.last_name}`}
          subtitle={comment.userData.location}
          userPicturePath={comment.userData.image}
          commentUser={comment.user}
          comment={comment.comment}
          setDisplayComments={setDisplayComments}
          commentId={comment.id}
          postId={postId}
          commentsDisplay={displayComments} />
        </Box>
        ))}

        <FlexBetween gap="1.5rem">

        <InputBase
          placeholder="Write a comment"
          onChange={(e) => setComment(e.target.value)}
          value={comment}
          sx={{
            width: "100%",
            backgroundColor: palette.neutral.light,
            borderRadius: "0.75rem",
            padding: "0.5rem 1rem",
            ml: "-0.9rem",
            mt: "1rem",
          }}
        />

        <Button    
          disabled={!comment}
          onClick={handlePostComment}
          sx={{
          color: palette.background.alt,
          mt: "1rem",
          backgroundColor: primary,
          borderRadius: "0.5rem",
          padding: "0.75rem 0.75rem",
          "&:hover": { backgroundColor: palette.primary.dark },

        }}>Post</Button>
        </FlexBetween>

      </Box>
    )}
  </CardContent>
  </Card>
    );
  };
  
  export default PostWidget;