import {
    ChatBubbleOutlineOutlined,
    FavoriteBorderOutlined,
    FavoriteOutlined,
    ShareOutlined,
    Delete,
    EditOutlined,
    GitHub,
    PlayCircle,
  } from "@mui/icons-material";
  import { Box, Divider, IconButton, Typography, useTheme, Card, CardContent, InputBase, Button } from "@mui/material";

  import FlexBetween from "components/FlexBetween";
//   import Friend from "components/Friend";
  import WidgetWrapper from "components/WidgetWrapper";
  import UserImage from "components/UserImage";
  import Comment from "components/Comment";

  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setPost } from "state";


  
  const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    // likes,
    // comments,
    github,
    demo,
  }) => {

    const likes = 5
    const comments = []

    const [isComments, setIsComments] = useState(false); //determines if we open the comments list or not
    const dispatch = useDispatch();
    const token = useSelector((state) => state.token);
    const loggedInUserId = useSelector((state) => state.user._id);
    const isLiked = Boolean(likes[loggedInUserId]); //remember that the likes for a post looks something like this {userId1: true, userId2: true } so for isLiked we're checking if the likes objects thats being passed down for this post contains a key that's the current user id and that key has a value, if it does it will return true if not it will return false
    const likeCount = Object.keys(likes).length; //this just grabs the length of the keys in the likes object
  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const primaryDark = palette.primary.dark;

   
  
    const patchLike = async () => {
      const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json(); //this gives us the updated post from the backend
      dispatch(setPost({ post: updatedPost })); //notice how its setPost not setPosts
    }; //this updates the likes
  
    return (
      <Card sx  ={{  padding: "1.5rem 1.5rem 0.75rem 1.5rem", mb: "2rem", backgroundColor: palette.background.alt,
      borderRadius: "0.75rem",}} >
        <CardContent>
      {/* <WidgetWrapper m="2rem 0"> */}
        {/* <Friend
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
        /> */}
        <Typography color={main} sx={{ mt: "1rem" }}>
          {description}

        </Typography >
          <br />

          <FlexBetween gap="1rem" mt="-0.5rem" mb="0.5rem">
            <FlexBetween gap="0.4rem">
              <>
              <GitHub sx={{ fontSize: "30px" }} />
                <Typography color={main} fontWeight="500"
                sx={{ '& a': { textDecoration: 'none', color: main, '&:hover': { color: primaryDark } } }}
                >
                <a href=''target="_blank">Github.</a>
                </Typography>
              </>

              <>
              <PlayCircle sx={{ fontSize: "30px" }} />
                <Typography color={main} fontWeight="500" sx={{ '& a': { textDecoration: 'none', color: main, '&:hover': { color: primaryDark } } }}>
                <a href='' target="_blank">Demo</a>
                </Typography>
              </>
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
              <Typography>{comments.length}</Typography>
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

                 <FlexBetween gap="1.5rem">
          {/* <UserImage image={picturePath} /> */}
          <InputBase
            placeholder="Write a comment"
            // onChange={(e) => setPost(e.target.value)}
            // value={post}
            sx={{
              width: "100%",
              backgroundColor: palette.neutral.light,
              borderRadius: "0.75rem",
              padding: "0.5rem 1rem",
              ml: "-0.9rem",
            }}
          />
          <Button    
          sx={{
              // width: "100%",
              color: palette.background.alt,
              backgroundColor: primary,
              borderRadius: "0.5rem",
              padding: "0.75rem 0.75rem",
              "&:hover": { backgroundColor: palette.primary.dark },

            }}>Post</Button>
        </FlexBetween>

       
            {comments.map((comment, i) => (
              <Box key={`${name}-${i}`} mt="1rem"> 
            
     
            <Comment
          friendId={postUserId}
          name={name}
          subtitle={location}
          userPicturePath={userPicturePath}
         
        />
        <Typography color={main} sx={{ mt: "-1rem", marginLeft: "3.2rem" }}>
          {comment}
        </Typography >


              </Box>
            ))}


            
     
          </Box>
        )}
      {/* </WidgetWrapper> */}
      </CardContent>
      </Card>
    );
  };
  
  export default PostWidget;