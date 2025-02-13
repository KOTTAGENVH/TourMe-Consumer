import { createSlice } from "@reduxjs/toolkit";

// Define a function to fetch the initial state
const getInitialIdState = () => {
  const persistedState = localStorage.getItem("persistroot");
  if (persistedState) {
    const parsedState = JSON.parse(persistedState);
    const idState = parsedState ? parsedState.id : null;
    return idState;
  }

  return {
    id: null,
  };
};

export const idSlice = createSlice({
  name: "id",
  initialState: getInitialIdState(),
  reducers: {
    setIdResponse: (state, action) => {
      return {
        ...state,
        id: action.payload.id,
      };
    },
  },
});

export const { setIdResponse } = idSlice.actions;
export default idSlice.reducer;
