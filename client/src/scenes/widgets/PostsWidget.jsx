import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts, setLogout } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();

  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const refreshToken = useSelector((state) => state.refreshToken);


const tokenExpiration = useSelector((state) => state.tokenExpiration);
const refreshTokenExpiration = useSelector((state) => state.refreshTokenExpiration);


  

  const getPosts = async () => {
    if (token && tokenExpiration && Date.now() < tokenExpiration && refreshToken && refreshTokenExpiration && Date.now() < refreshTokenExpiration) {
    const response = await fetch("api/posts/", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    console.log(data)
    dispatch(setPosts({ posts: data })); } 
    
    else {
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
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); 




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
            postUserId={post.user.id}
            name={`${post.user.first_name} ${post.user.last_name}`}
            description={post.caption}
            location={post.user.location}
            picturePath={post.image}
            userPicturePath={post.user.image}
            github={post.github_url}
            demo={post.demo_url}
            // likes={likes}
            // comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;