import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addFavorite,
  removeFavorite,
  setFavorite,
} from "../redux/features/favorites/favoriteSlice";
import {
  addFavoriteToLocalStorage,
  deleteFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
} from "../utils/localStorage";

const HeartIcon = ({ product }) => {
  const favorite = useSelector((state) => state.favorite);

  const dispatch = useDispatch();

  const isFavorites = favorite?.some((p) => p._id === product._id);

  useEffect(() => {
    const favoritesFromLocalStorage = getFavoritesFromLocalStorage();
    console.log(favoritesFromLocalStorage);
    dispatch(setFavorite(favoritesFromLocalStorage));
  }, []);

  const toggleFavorites = () => {
    if (!isFavorites) {
      addFavoriteToLocalStorage(product);
      dispatch(addFavorite(product));
    } else {
      deleteFavoriteToLocalStorage(product);
      dispatch(removeFavorite(product));
    }
  };

  return (
    <button onClick={toggleFavorites}>
      {isFavorites ? (
        <FaHeart className="text-pink-500 text-2xl" />
      ) : (
        <FaRegHeart className="text-white text-2xl" />
      )}
    </button>
  );
};

export default HeartIcon;
