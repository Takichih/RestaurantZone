import apiClient from "@/utils/apiClient";

export default {
  async getUsers(limit = 10, page = 0) {
    let users = [];

    try {
      const response = await apiClient.get("/users", { params: { limit, page } });

      if (response.status !== 200) {
        throw new Error("Users were not found, please try again.");
      }

      users = response.data.items;
    } catch (e) {
      console.error(e);
    } finally {
      return users;
    }
  },
  async getUser(userId) {
    let user = {};

    try {
      const response = await apiClient.get(`/users/${userId}`);

      if (response.status !== 200) {
        throw new Error("User was not found, please try again.");
      }

      user = response.data;
    } catch (e) {
      console.error(e);
    } finally {
      return user;
    }
  },
  async getUserFavoriteLists(userId, limit = 10, page = 0) {
    let userFavoriteLists = [];

    try {
      const response = await apiClient.get(`/users/${userId}/favorites`, { params: { limit, page } });

      if (response.status !== 200) {
        throw new Error("Favorite lists of specified user were not found, please try again.");
      }

      userFavoriteLists = response.data.items;
    } catch (e) {
      console.error(e);
    } finally {
      return userFavoriteLists;
    }
  },
  async followUser(userId) {
    let responseStatus;

    try {
      const response = await apiClient.post("/follow", { params: { id: userId } });

      if (response.status !== 200) {
        throw new Error("User follow failed, please try again.");
      }

      responseStatus = response.status;
    } catch (e) {
      console.error(e);
    } finally {
      return responseStatus;
    }
  },
  async removeFollow(userId) {
    let responseStatus;

    try {
      const response = await apiClient.post(`/follow/${userId}`);

      if (response.status !== 200) {
        throw new Error("User unfollow failed, please try again.");
      }

      responseStatus = response.status;
    } catch (e) {
      console.error(e);
    } finally {
      return responseStatus;
    }
  }
};