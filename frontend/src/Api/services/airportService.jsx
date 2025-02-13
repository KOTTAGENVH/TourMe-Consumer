import { apiClient } from "../axios/api";

export const allSriLankanAirports = async () => {
    try {
        const response = await apiClient.get("/plane/availability");
        return response.data;
    } catch (error) {
        return error;
    }
}

