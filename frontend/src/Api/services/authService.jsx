import { apiClient } from "../axios/api";

//Authentication Sign Up

export const signUp = async (username, email, role, password) => {
    try {
        const response = await apiClient.post("user/create-user", {
            username,
            email,
            role,
            true: true,
            password,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

//Authentication Sign In

export const signIn = async (username, password) => {
    try {
        const response = await apiClient.post("user/login-user", {
            username,
            username,
            password,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

//Authentication Forgot Password

export const forgotPassword = async (email, secretcode, newpassword) => {
    try {
        const response = await apiClient.patch("user/forget-password", {
            email,
            secretcode,
            newpassword,
        });
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

//Get All Users

export const getAllUsers = async () => {
    try {
        const response = await apiClient.get("/user/get-all-users");
        return response.data;
    } catch (error) {
        console.log(error);
    }
}

//Get User By Id

export const getUserById = async (id) => {
    try {
        const response = await apiClient.get(`/user/get-user-by-id/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}



