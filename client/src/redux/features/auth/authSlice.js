import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  _id: localStorage.getItem("_id")
    ? JSON.parse(localStorage.getItem("_id"))
    : null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state._id = action.payload;
      localStorage.setItem("_id", JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state._id = null;
      localStorage.removeItem("_id");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export default authSlice.reducer;
