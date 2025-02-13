import { createSlice } from "@reduxjs/toolkit";

// Define a function to fetch the initial state
const getInitialDarkmodeState = () => {
  const persistedState = localStorage.getItem("persistroot");
  if (persistedState) {
    const parsedState = JSON.parse(persistedState);
    const darkModeState = parsedState ? parsedState.darkMode : null;
    return darkModeState;
  }

  return {
    darkmode: false,
  };
};

export const darkmodeSlice = createSlice({
  name: "darkmode",
  initialState: getInitialDarkmodeState(),
  reducers: {
    setDarkModeResponse: (state, action) => {
      return {
        ...state,
        darkmode: action.payload.darkmode,
      };
    },
  },
});

export const { setDarkModeResponse } = darkmodeSlice.actions;
export default darkmodeSlice.reducer;
