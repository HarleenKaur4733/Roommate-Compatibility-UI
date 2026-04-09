import axiosInstance from "./axiosInstance";

export const getMatchSuggestions = () =>
  axiosInstance.get("/matches/suggestions");
