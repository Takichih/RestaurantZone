import { store } from "@/store";
import userService from "@/api/userService";
import { config } from "@/config";

export const useFacebookAuth = () => {
  let sdkInitialized = false;

  const initFacebookSDK = () => {
    return new Promise((resolve, reject) => {
      if (sdkInitialized) return resolve();
      console.log("Initialisation du SDK Facebook...");
      console.log("ID de l'application Facebook :", config.facebookAppId);

      window.fbAsyncInit = function () {
        FB.init({
          appId: config.facebookAppId, // Remplacer par l'ID de votre application Facebook
          cookie: true,
          xfbml: true,
          version: "v15.0",
        });
        sdkInitialized = true;
        resolve();
      };

      (function (d, s, id) {
        var js,
          fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s);
        js.id = id;
        js.src = "https://connect.facebook.net/en_US/sdk.js";
        js.onerror = () => reject("Échec du chargement du SDK Facebook.");
        fjs.parentNode.insertBefore(js, fjs);
      })(document, "script", "facebook-jssdk");
    });
  };

  const loginWithFacebook = async () => {
    await initFacebookSDK();

    return new Promise((resolve, reject) => {
      FB.login(
        async (response) => {
          if (response.authResponse) {
            const { accessToken, userID } = response.authResponse;

            FB.api("/me", { fields: "name,email" }, async (user) => {
              try {
                store.setFbToken(accessToken);
                store.setFbUserName(user.name);
                store.setFbUserEmail(user.email);

                // Enregistrer ou récupérer l'utilisateur
                const registeredUser = await registerOrFetchUserFb(user);
                resolve(registeredUser);
              } catch (err) {
                console.error("Erreur lors du traitement de l'utilisateur:", err);
                reject(err);
              }
            });
          } else {
            reject("Connexion Facebook annulée ou échouée.");
          }
        },
        { scope: "public_profile,email" }
      );
    });
  };

  const logoutFromFacebook = async () => {
    await initFacebookSDK();

    return new Promise((resolve, reject) => {
      FB.logout((response) => {
        if (response) {
          // Réinitialiser le store
          store.setFbToken(null);
          store.setFbUserName(null);
          store.setFbUserEmail(null);
          console.log("Déconnexion réussie.");
          resolve();
        } else {
          console.error("Erreur lors de la déconnexion de Facebook.");
          reject("Échec de la déconnexion.");
        }
      });
    });
  };

  const registerOrFetchUserFb = async (fbUser) => {
    try {
      const { email, name } = fbUser;
      const existingUser = await userService.getUserByEmail(email);

      if (existingUser) {
        return existingUser;
      } else {
        // Si l'utilisateur n'existe pas, le créer
        const newUser = await userService.createUser({ email, name });
        return newUser;
      }
    } catch (error) {
      console.error("Erreur lors de l'enregistrement ou de la récupération de l'utilisateur:", error);
      throw error;
    }
  };

  return { loginWithFacebook, logoutFromFacebook };
};
