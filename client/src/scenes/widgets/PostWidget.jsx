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
  import getCookie from "utils/GetCookies";

  import { useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  // import { setPost } from "state/authReducer";


  
  const PostWidget = ({
    postId,
    postUserId,
    name,
    description,
    location,
    picturePath,
    userPicturePath,
    // likes,
    comments,
    github,
    demo,
  }) => {

    const likes = 5
    // const comments = []
    console.log(comments)

    //thinking about making an isolated area just for this posts comment in this component and then displaying it
    //also add trash can next to comment, make it conditional and have the delete reqeust here
    //make github and demo icons conditional

    const [isComments, setIsComments] = useState(false); //determines if we open the comments list or not
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    // const loggedInUserId = useSelector((state) => state.user._id);
    // const isLiked = Boolean(likes[loggedInUserId]); //remember that the likes for a post looks something like this {userId1: true, userId2: true } so for isLiked we're checking if the likes objects thats being passed down for this post contains a key that's the current user id and that key has a value, if it does it will return true if not it will return false
    // const likeCount = Object.keys(likes).length; //this just grabs the length of the keys in the likes object

    const isLiked = false
    const likeCount = false


  
    const { palette } = useTheme();
    const main = palette.neutral.main;
    const primary = palette.primary.main;
    const primaryDark = palette.primary.dark;

    const csrftoken = getCookie('csrftoken');
    const [comment, setComment] = useState('');
    const loggedInUser = useSelector((state) => state.auth.user);

    const handlePostComment = async () => {
      const response = await fetch(
        "api/comment/",
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
        console.log(data)
    };

   
  
    // const patchLike = async () => {
    //   const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
    //     method: "PATCH",
    //     headers: {
    //       Authorization: `Bearer ${token}`,
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ userId: loggedInUserId }),
    //   });
    //   const updatedPost = await response.json(); //this gives us the updated post from the backend
    //   dispatch(setPost({ post: updatedPost })); //notice how its setPost not setPosts
    // }; //this updates the likes
  

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
              <IconButton onClick={() => console.log('patchLike use to be here')}>
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

{comments.map((comment, i) => (
              <Box key={`${comment.userData.first_name}-${i}`} mt="1rem"> 
            
     
            <Comment
          friendId={postUserId}
          name={`${comment.userData.first_name} ${comment.userData.last_name}`}
          subtitle={comment.userData.location}
          userPicturePath={comment.userData.image}
         
        />
        <Typography color={main} sx={{ mt: "-1rem", marginLeft: "3.2rem" }}>
          {comment.comment}
        </Typography >


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