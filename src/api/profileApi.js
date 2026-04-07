import axiosInstance from "./axiosInstance";

export const getMyProfile = () => axiosInstance.get("/profile/me");

export const createProfile = (data) => axiosInstance.post("/profile", data);
