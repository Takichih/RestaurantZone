import axios from "axios";
// Importer le fichier de configuration - Exemple
// main.js ou un autre fichier (avec CommonJS)
import { config } from "@/config.js";

console.log(config.apiUrl); // Utilise l'URL de l'API
let baseURL = config.SSL ? config.apiUrl : config.apiUrl + "/unsecure";

export const testUserService = async () => {
  console.log("From UserService.js : Test UserService import");
  console.log("apiURL : " + config.apiUrl);
  if (config.debugMode) {
    console.log("Debug mode is on");
    try {
      const user = await getUser("6716e7304bffd95d58ab6b40"); // Gordon Ramsay
      console.log(user);
      localStorage.setItem("userID", user.id);
    } catch (error) {
      console.error(
        `Erreur lors de la récupération de l'utilisateur : ${error.response.statusText}`,
      );
    }
  }
  return "Test UserService : OK";
};

export const getUser = async (id) => {
  console.log("User ID : " + id);
  const url = `${baseURL}/users/${id}`;
  console.log("URL : " + url);
  const response = await axios.get(url);
  const user = response;
  console.log("From getUser : " + user.data.name + " " + user.data.email);
  return user.data;
};
//chercher la liste des ID de listes de favoris
export const listeOfIDdesListesFavoris = async (id) => {
  try {
    const response = await axios.get(`${config.apiUrl}/users/:id/favorites`);
  } catch (error) {
    console.error(
      `Erreur lors de la récupération des IDs : ${error.response.statusText}`,
    );
  }
};
export const getActiveUser = async () => {
  let userID = localStorage.getItem("userID");
  if (!userID) {
    userID = "6716e7304bffd95d58ab6b40"; // Gordon Ramsay
  }
  try {
    const user = await getUser(userID);
    return user;
  } catch (error) {
    console.error(
      `Erreur lors de la récupération de l'utilisateur : ${error.response.statusText}`,
    );
    // throw error;
  }
};

export const getUserList = async () => {
  const response = await axios.get(`${baseURL}/users`);
  console.log(response.data);
  return response.data;
};

export const createUser = async (name, email, password) => {
  try {
    const response = await axios.post(`${config.apiUrl}/signup`, {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error(
      `Erreur lors de la création de l'utilisateur : ${error.response.statusText}`,
    );
    throw error;
  }
};
