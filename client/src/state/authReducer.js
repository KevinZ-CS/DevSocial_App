import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mode: "light", 
  user: null,
  token: null,
  refreshToken: null,
  tokenExpiration: null,
  refreshTokenExpiration: null,
  image: null,
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
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setMode, setLogin, setLogout } =
  authSlice.actions

export default authSlice.reducer;