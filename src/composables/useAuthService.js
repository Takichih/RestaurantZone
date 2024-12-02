import authentificationService from "@/api/authentificationService";
import { useRouter } from "vue-router";
import { useStore } from "vuex";

export function useAuthService() {
  const store = useStore();
  const router = useRouter();

  const setCurrentUser = async (userInfo = null) => {
    if (userInfo) {
      store.dispatch("setConnectedUser", userInfo);
      router.push({ name: "Profile" });
    } else {
      store.dispatch("setConnectedUser", null);
      router.push({ name: "Home" });
    }
  }

  const login = async (userEmail, userPassword) => {
    let formData = new URLSearchParams();
    formData.append("email", userEmail);
    formData.append("password", userPassword);

    const userConnected = await authentificationService.login(formData);
    localStorage.setItem("authToken", userConnected.token);
    setCurrentUser(userConnected);
  }

  const signup = async (name, email, password) => {
    let formData = new URLSearchParams();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);

    const newUser = await authentificationService.signup(formData);
    console.log("------------- newUser ---------------", newUser);
  };

  const logout = () => {
    setCurrentUser();
  }

  return { login, signup, logout }
}