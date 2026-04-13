import axiosInstance from "./axiosInstance";

export const createProfile = (data) => axiosInstance.post("/profile", data);

export const updateProfile = (data) => axiosInstance.put("/profile", data);

export const getMyProfile = () => axiosInstance.get("/profile/me");

export const getAllProfiles = () => axiosInstance.get("/profile/all");
