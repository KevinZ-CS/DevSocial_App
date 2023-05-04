import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light", 
  user: null,
  token: null,
  refreshToken: null,
  tokenExpiration: null,
  refreshTokenExpiration: null,
  image: null,
  full_name: null,
  friendsList: [],
  profileFriendsList: [],
  profileUser: null,
};


export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light"; 
    },
    setLogin: (state, action) => {
      console.log(action.payload)
      state.token = action.payload.token
      state.user = action.payload.user
      state.refreshToken = action.payload.refreshToken
      state.image = action.payload.image;
      state.tokenExpiration = action.payload.tokenExpiration;
      state.refreshTokenExpiration = action.payload.refreshTokenExpiration;
      state.full_name = action.payload.full_name
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
    setFriends: (state, action) => {
      state.friendsList = action.payload;
    },
    addFriend: (state, action) => {
      state.friendsList.push(action.payload)
    },
    removeFriend: (state, action) => {
      const updatedFriendsList = state.friendsList.filter((friend) => friend.id !== action.payload)
      state.friendsList = updatedFriendsList
    },
    setProfileFriends: (state, action) => {
      state.profileFriendsList = action.payload;
    },
    setProfileUser: (state, action) => {
      state.profileUser = action.payload;
    },
    updateLogin: (state, action) => {
      state.image = action.payload.image;
      state.full_name = action.payload.full_name
    },
  },
});

export const { setMode, setLogin, setLogout, setFriends, addFriend, removeFriend, setProfileFriends, setProfileUser, updateLogin } =
  authSlice.actions

export default authSlice.reducer;