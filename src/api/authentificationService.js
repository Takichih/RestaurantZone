import { config } from "@/config";
import apiClient from "@/utils/apiClient";

export default {
  async login(formData) {
    let user = {};

    try {
      apiClient.defaults.baseURL = config.apiUrl;
      const response = await apiClient.post(`/login`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      });

      if (response.status !== 200) {
        throw new Error("Failed to login, please try again.");
      }

      user = response.data;
    } catch (e) {
      console.error(e);
    } finally {
      return user;
    }
  },

  async signup(formData) {
    try {
      apiClient.defaults.baseURL = config.apiUrl;
      const response = await apiClient.post(`/signup`, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      if (response.status !== 200) {
        throw new Error("Failed to signUp, please try again.");
      }
    }catch (e) {
      console.error(e.message);
    } finally {
      return  response.data;
    }
  },
}

//TODO Logout

//IsLoggedIn

export const isUserLoggedIn = (id) => {
  // return localStorage.getItem("authToken") !== null;
  return true;
}
