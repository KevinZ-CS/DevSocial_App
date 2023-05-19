import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state/authReducer";
import { setPosts, setPostsDisplay } from "state/postsReducer";
import PostWidget from "./PostWidget";
import {
  Typography,
  Container,
} from "@mui/material";

const PostsWidget = ({ userId }) => {

const dispatch = useDispatch();
const { pathname } = useLocation();
const profilePath = pathname.split("/")[1]; // extracts "profile" from "/profile/123"

const token = useSelector((state) => state.auth.token);
const refreshToken = useSelector((state) => state.auth.refreshToken);
const tokenExpiration = useSelector((state) => state.auth.tokenExpiration);
const refreshTokenExpiration = useSelector((state) => state.auth.refreshTokenExpiration);

const postsDisplay = useSelector((state) => state.posts.postsDisplay);
const searchKeyword = useSelector((state) => state.posts.searchKeyword);

const getPosts = async () => {
    if (token && tokenExpiration && Date.now() < tokenExpiration && refreshToken && refreshTokenExpiration && Date.now() < refreshTokenExpiration) {
    const response = await fetch("/api/posts/", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if(response.ok) {
      dispatch(setPosts(data))
      dispatch(setPostsDisplay(data.filter((post) =>
      (post.userData.first_name + post.userData.last_name)
      .toLowerCase()
      .includes(searchKeyword.split(' ').join('').toLowerCase())
      ))) 
  } else {
      console.log(response)
    }
  }   
  else {
      dispatch(setLogout())
    }
  };


const getUserPosts = async () => {
  if (token && tokenExpiration && Date.now() < tokenExpiration && refreshToken && refreshTokenExpiration && Date.now() < refreshTokenExpiration) {
  const response = await fetch(
    `/api/posts/${userId}/`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    }
  );
  const data = await response.json(); 
  
  if(response.ok) {
    dispatch(setPosts(data))
    dispatch(setPostsDisplay(data.filter((post) =>
    (post.userData.first_name + post.userData.last_name)
    .toLowerCase()
    .includes(searchKeyword.split(' ').join('').toLowerCase())
    )))
    } else {
        console.log(data)
      }
    } else {
      dispatch(setLogout())
    }};

useEffect(() => {
  if (profilePath === 'profile') {
    getUserPosts(); 
  } else {
    getPosts();
  }
}, [userId]); 


return (
<> { postsDisplay.length === 0 ? 

<Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', mt: 4 }}>
  <Typography sx={{ textAlign: 'center', fontSize:'0.9rem' }}>Cannot find any posts.</Typography>
</Container>

: <>
  {postsDisplay.map(
    (post
    ) => (
      <PostWidget
        key={post.id}
        postId={post.id}
        postUserId={post.userData.id}
        name={`${post.userData.first_name} ${post.userData.last_name}`}
        description={post.caption}
        location={post.userData.location}
        picturePath={post.image}
        userPicturePath={post.userData.image}
        github={post.github_url}
        demo={post.demo_url}
        likes={post.likes}
        comments={post.comments}
      />
    )
  )}  </>
    }
</> 
);
};

export default PostsWidget;