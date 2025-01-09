import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5117",
});

export const getGames = () => api.get("/games");
export const getGameById = (id) => api.get(`/games/${id}`); // Added this line
export const getGenres = () => api.get("/genres");
export const createGame = (game) => api.post("/games", game);
export const updateGame = (id, game) => api.put(`/games/${id}`, game);
export const deleteGame = (id) => api.delete(`/games/${id}`);
