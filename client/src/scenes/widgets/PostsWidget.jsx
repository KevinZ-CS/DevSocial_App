import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state/authReducer";
import { setPosts } from "state/postsReducer";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId }) => {

const dispatch = useDispatch();
const posts = useSelector((state) => state.posts.posts);
const { pathname } = useLocation();
const profilePath = pathname.split("/")[1]; // extracts "profile" from "/profile/123"
const token = useSelector((state) => state.auth.token);
const refreshToken = useSelector((state) => state.auth.refreshToken);
const tokenExpiration = useSelector((state) => state.auth.tokenExpiration);
const refreshTokenExpiration = useSelector((state) => state.auth.refreshTokenExpiration);

const getPosts = async () => {
    if (token && tokenExpiration && Date.now() < tokenExpiration && refreshToken && refreshTokenExpiration && Date.now() < refreshTokenExpiration) {
    const response = await fetch("/api/posts/", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if(response.ok) {
      dispatch(setPosts(data))
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
  } else {
      console.log(data)
    }
  }    else {
      dispatch(setLogout())
  }
  };



useEffect(() => {
  if (profilePath === 'profile') {
    getUserPosts(); 
  } else {
    getPosts();
  }
}, [userId]); 


if(posts.length === 0) {
    return null
  }

return (
<> 
  {posts.map(
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
  )} 
</> 
);
};

export default PostsWidget;