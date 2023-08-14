import axios from "axios";

export const ApiBase = axios.create({
  baseURL: "http://10.5.233.33:5000/api/v1",
  // baseURL: "https://api-sftpmanager.onerender.com/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});
