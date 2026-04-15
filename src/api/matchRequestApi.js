import axiosInstance from "./axiosInstance";

// Send match request
export const sendMatchRequest = (targetUserId) =>
  axiosInstance.post(`/matches/request/${targetUserId}`);

// Accept match request
export const acceptMatchRequest = (requestId) =>
  axiosInstance.put(`/matches/accept/${requestId}`);

// Reject match request
export const rejectMatchRequest = (requestId) =>
  axiosInstance.put(`/matches/reject/${requestId}`);

// Get incoming requests
export const getMyRequests = () => axiosInstance.get("/matches/my-requests");

// Get accepted connections
export const getMyConnections = () =>
  axiosInstance.get("/matches/my-connections");

export const getSentRequests = () =>
  axiosInstance.get("/matches/get-requests-sent");
