import axiosInstance from "./axiosInstance";

export const getMyPreferences = () => axiosInstance.get("/preferences/me");
export const createMyPreferences = (preferences) =>
  axiosInstance.post("/preferences", preferences);
export const updateMyPreferences = (data) =>
  axiosInstance.put("/preferences", data);
