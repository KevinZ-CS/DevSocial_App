import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
};


export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
        state.posts.unshift(action.payload)
    },
    setPost: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
        if (post._id === action.payload.post._id) return action.payload.post; 
        return post;
      });
      state.posts = updatedPosts;
    },
  },
});

export const { setPosts, addPost, setPost } =
  postsSlice.actions;

export default postsSlice.reducer;