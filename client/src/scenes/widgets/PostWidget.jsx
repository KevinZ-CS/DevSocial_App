import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    Delete,
    EditOutlined,
    GitHub,
    PlayCircle,
  } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme, Card, CardContent, InputBase, Button } from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import Comment from "components/Comment";
import getCookie from "utils/GetCookies";
import { useState } from "react";
import { useSelector } from "react-redux";



  
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

const [isComments, setIsComments] = useState(false); 
const token = useSelector((state) => state.auth.token);
const [displayComments, setDisplayComments] = useState(comments)
const { palette } = useTheme();
const main = palette.neutral.main;
const primary = palette.primary.main;
const primaryDark = palette.primary.dark;

const csrftoken = getCookie('csrftoken');
const [comment, setComment] = useState('');
const loggedInUser = useSelector((state) => state.auth.user);

const [like, setLike] = useState(likes)

const isLiked = like.some(obj => Object.values(obj).includes(loggedInUser));
const likeCount = like.length; 



const handlePostComment = async () => {
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
};

   

const patchLike = async () => {
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

}; 
  

return (
  <Card sx  ={{  padding: "1.5rem 1.5rem 0.75rem 1.5rem", mb: "2rem", backgroundColor: palette.background.alt,
  borderRadius: "0.75rem",}} >
    <CardContent>
  {/* <WidgetWrapper m="2rem 0"> */}
    <Friend
      friendId={postUserId}
      name={name}
      subtitle={location}
      userPicturePath={userPicturePath}
      friendListFlag={false}
    />
    <Typography color={main} sx={{ mt: "1rem" }}>
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
      
      {/* <span style={{ color: palette.primary.dark }}>#ruby #rails </span> */}

    {picturePath && (
        <Typography sx={{ display: 'flex', justifyContent: 'center', m: "0 -2.5rem" }}>

      <img
        
        width="100%"
        // height="auto"
        alt="post"
        style={{ borderRadius: "0rem", marginTop: "0.75rem", maxHeight: '50rem', objectFit: "cover" }}
        src={`api/${picturePath}`}
      /> 
          </Typography>
      //this is the post picture
    )}
    <FlexBetween mt="0.25rem" ml="-1rem">
      <FlexBetween gap="0.5rem">

        <FlexBetween gap="0.3rem">
          <IconButton onClick={patchLike}>
            {isLiked ? (
              <FavoriteOutlined sx={{ color: primary }} />
            ) : (
              <FavoriteBorderOutlined /> //this is the like icon and determining if someone liked it or not
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
      
      <Box>
      <IconButton>
        <EditOutlined />
      </IconButton>

      <IconButton>
        <Delete />
        {/* <ShareOutlined /> */}
      </IconButton>
      </Box>

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
      commentsDisplay={displayComments}
      
    />
    {/* <Typography color={main} sx={{ mt: "-1rem", marginLeft: "3.2rem" }}>
      {comment.comment}
    </Typography > */}


          </Box>
        ))}

              <FlexBetween gap="1.5rem">
      {/* <UserImage image={picturePath} /> */}
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
          // width: "100%",
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
  {/* </WidgetWrapper> */}
  </CardContent>
  </Card>
    );
  };
  
  export default PostWidget;