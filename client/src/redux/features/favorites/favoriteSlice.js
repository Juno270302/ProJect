import { createSlice } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "favorite",
  initialState: [],
  reducers: {
    addFavorite: (state, action) => {
      if (!state.some((product) => product._id === action.payload._id)) {
        state.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      return state.filter((product) => product._id !== action.payload._id);
    },
    setFavorite: (state, action) => {
      //Set the favorites from localStoragte
      return action.payload;
    },
  },
});

export const { addFavorite, removeFavorite, setFavorite } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
