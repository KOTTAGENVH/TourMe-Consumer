import { createSlice } from "@reduxjs/toolkit";

// Define a function to fetch the initial state
const getInitialAuthState = () => {
  const persistedState = localStorage.getItem("persist:root");
  if (persistedState) {
    const parsedState = JSON.parse(persistedState);
    return parsedState.auth || {}; // Assuming your persisted state has an 'auth' property
  }

  return {
    message: "",
    loggedUser: {
      _id: "",
      username: "",
      email: "",
      role: "",
      secretcode: "",
      block: "",
    },
  };
};

export const authSlice = createSlice({
  name: "auth",
  initialState: getInitialAuthState(),
  reducers: {
    setLoginResponse: (state, action) => {
      state.loggedUser = action.payload.loggedUser;
      state.message = action.payload.message;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    clearMessage: (state) => {
      state.message = "";
    },
    logOut: (state) => {
      // Reset auth state on logout
      state.loggedUser = {};
      state.message = "";
    },
    resetState: () => {
      // Clear entire Redux state on reset
      localStorage.removeItem("persist:root");
      return {
        message: "",
        loggedUser: {
          _id: "",
          username: "",
          email: "",
          role: "",
          secretcode: "",
          block: "",
        },
      };
    },
  },
});

export const {
  setLoginResponse,
  logOut,
  setMessage,
  clearMessage,
  resetState,
} = authSlice.actions;

export default authSlice.reducer;
