import apiClient from "@/utils/apiClient";

export default {
  async getUsers(limit = 10, page = 0) {
    let users = [];

    try {
      const response = await apiClient.get("/users", {
        params: { limit, page },
      });

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
      const response = await apiClient.get(`/users/${userId}/favorites`, {
        params: { limit, page },
      });

      if (response.status !== 200) {
        throw new Error(
          "Favorite lists of specified user were not found, please try again.",
        );
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
      const response = await apiClient.post("/follow", { id: userId });
      console.log("From follow user : user added" + response.status);

      if (response.status !== 201) {
        console.log("From follow user : " + response.status);
        throw new Error("User follow failed, please try again.");
      }

      responseStatus = response.status;
    } catch (e) {
      console.error("Error following user:", e);
      throw e;
    } finally {
      return responseStatus;
    }
  },
  async removeFollow(userId) {
    let responseStatus;

    try {
      const response = await apiClient.delete(`/follow/${userId}`);

      if (response.status !== 200) {
        throw new Error("User unfollow failed, please try again.");
      }

      responseStatus = response.status;
      console.log("From follow user : user deleted" + response.status);
    } catch (e) {
      console.error(e);
    } finally {
      return responseStatus;
    }
  },

  async searchUsers(query, limit = 100, page = 0) {
    let users = [];
    try {
      const response = await apiClient.get("/users", {
        params: { q: query, limit, page },
      });
      if (response.status !== 200) {
        throw new Error("Search failed, please try again.");
      }
      users = response.data.items;
    } catch (e) {
      console.error(e);
    } finally {
      return users;
    }
  },
  async isUserFollowed(userId, activeUserId) {
    try {
      const response = await apiClient.get(`/users/${activeUserId}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch followers, please try again.");
      }


      return response.data.following.some((user) => user.id === userId);
    } catch (error) {
      console.error(`Error checking if user ${userId} is followed:`, error);
      throw error;
    }
  },
  async getFollowers(userId) {
    let followers = [];
    try {
      const response = await apiClient.get(`/users/${userId}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch followers, please try again.");
      }

      followers = response.data.followers;
    } catch (e) {
      console.error(`Error fetching followers for user ${userId}:`, e);
      throw e;
    } finally {
      return followers;
    }
  },
  async getFollowing(userId) {
    let following = [];
    try {
      const response = await apiClient.get(`/users/${userId}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch following, please try again.");
      }

      following = response.data.following;
    } catch (e) {
      console.error(`Error fetching following for user ${userId}:`, e);
      throw e;
    } finally {
      return following;
    }
  },
  async isUserFollower(userId, activeUserId) {
    try {
      const response = await apiClient.get(`/users/${activeUserId}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch followers, please try again.");
      }

      return response.data.followers.some((user) => user.id === userId);
    } catch (error) {
      console.error(`Error checking if user ${userId} is a follower:`, error);
      throw error;
    }
  },
  async getUserByEmail(email) {
    try {
      const response = await apiClient.get(`/users?email=${email}`);
      return response.data.items[0] || null;
    } catch (error) {
      console.error(
        "Erreur lors de la récupération de l'utilisateur par email:",
        error,
      );
      throw error;
    }
  },
  async createUser(userData) {
    try {
      const response = await apiClient.post("/users", userData);
      return response.data;
    } catch (error) {
      console.error("Erreur lors de la création de l'utilisateur:", error);
      throw error;
    }
  },
};
