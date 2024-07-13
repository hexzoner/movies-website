const key = "hex-movies-favorites";

export function saveFavorites(favorites) {
  localStorage.setItem(key, JSON.stringify(favorites));
}

export function loadFavorites() {
  return JSON.parse(localStorage.getItem(key)) || [];
}
