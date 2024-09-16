import axios from "axios";
import { HOST } from "@/utils/constants";

 export const apiClient = axios.create({
    baseURL: "http://localhost:8747",
    withCredentials: true
})