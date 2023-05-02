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
        // state.posts.unshift(action.payload)
        state.postsDisplay.unshift(action.payload)
    },
    setSearchKeyword: (state, action) => {
      state.searchKeyword = action.payload
  },
    setPostsDisplay: (state, action) => {
    state.postsDisplay = action.payload
},

    // setPost: (state, action) => {
    //   const updatedPosts = state.posts.map((post) => {
    //     if (post._id === action.payload.post._id) return action.payload.post; 
    //     return post;
    //   });
    //   state.posts = updatedPosts;
    // },
  },
});

export const { setPosts, addPost, setSearchKeyword, setPostsDisplay } =
  postsSlice.actions;

export default postsSlice.reducer;