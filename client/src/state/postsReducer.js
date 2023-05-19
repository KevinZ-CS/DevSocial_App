import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  searchKeyword: '',
  postsDisplay: [],
};

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    addPost: (state, action) => {
      state.postsDisplay.unshift(action.payload)
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload
  },
    setPostsDisplay: (state, action) => {
      state.postsDisplay = action.payload

  },
  updatePosts: (state, action) => {
      const updatedPosts = state.posts.map((post) => {
      if (post.id === action.payload.id) return action.payload; 
      return post;
     });
      state.posts = updatedPosts;
  },
  updatePostsDisplay: (state, action) => {
    const updatedPosts = state.postsDisplay.map((post) => {
      if (post.id === action.payload.id) return action.payload; 
      return post;
      });
      state.postsDisplay = updatedPosts;
  },
  },
});

export const { setPosts, addPost, setSearchKeyword, setPostsDisplay, updatePosts, updatePostsDisplay } =
  postsSlice.actions;

export default postsSlice.reducer;