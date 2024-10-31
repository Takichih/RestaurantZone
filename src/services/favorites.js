import axios from "axios";

const UNSECURED = process.env.VUE_APP_API_UNSECURE ? "/unsecure" : "";
const BASE_API_URL = `${process.env.VUE_APP_API_URL}${UNSECURED}/favorites`;

export const postFavoriteList = async (listName, ownerEmail) => {
  const url = `${BASE_API_URL}`;
  let favoriteList = {};
  const body = {
    "name": listName,
    "owner": ownerEmail
  }
  const options = {
    headers: {
      'Content-Type': 'application/json'
    }
  }

  try {
    const response = await axios.post(url, body, options);

    if (response.status !== 200) {
      throw new Error("Favorites list was not created, please try again.");
    }

    favoriteList = response.data;
  } catch (error) {
    console.error(error);
  } finally {
    return favoriteList;
  }
};