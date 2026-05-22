import apiClient from "@/api/apiClient";

export const userProfile = async () => {
    try {
        const response = await apiClient.get("/api/profile");
        return response.data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};