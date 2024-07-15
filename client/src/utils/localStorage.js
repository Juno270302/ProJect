export const addFavoriteToLocalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage();

  if (!favorites.some((p) => p._id === product._id)) {
    favorites.push(product);
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

export const deleteFavoriteToLocalStorage = (product) => {
  const favorites = getFavoritesFromLocalStorage();
  const updateFavorite = favorites.filter((item) => item._id !== product._id);
  localStorage.setItem("favorites", JSON.stringify(updateFavorite));
};

export const getFavoritesFromLocalStorage = () => {
  const favoritesJSON = localStorage.getItem("favorites");
  return favoritesJSON ? JSON.parse(favoritesJSON) : [];
};
