import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "state/authReducer";
import { setPosts } from "state/postsReducer";

import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {

const dispatch = useDispatch();

const posts = useSelector((state) => state.posts.posts);


const token = useSelector((state) => state.auth.token);
const refreshToken = useSelector((state) => state.auth.refreshToken);
const tokenExpiration = useSelector((state) => state.auth.tokenExpiration);
const refreshTokenExpiration = useSelector((state) => state.auth.refreshTokenExpiration);

const getPosts = async () => {
    if (token && tokenExpiration && Date.now() < tokenExpiration && refreshToken && refreshTokenExpiration && Date.now() < refreshTokenExpiration) {
    const response = await fetch("api/posts/", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    if(response.ok) {
      dispatch(setPosts(data))
    console.log(data)
    // dispatch(setPosts({ posts: data })); 
  } else {
      console.log(response)
    }
  } 
    
    else {
      console.log('is this it?')
        dispatch(setLogout())
    }
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:3001/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    // dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); 



// if(posts.data) {
//   return null
// }
console.log(posts)
  return (
    <>
      {posts.map(
        (post
        //     {
        //   _id,
        //   userId,
        //   firstName,
        //   lastName,
        //   description,
        //   location,
        //   picturePath,
        //   userPicturePath,
        //   likes,
        //   comments,
        // }
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