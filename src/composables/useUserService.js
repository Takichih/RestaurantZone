import { store } from '@/store';
import userService from '@/api/userService';

export function useUserService() {
  let userId = "6716e7304bffd95d58ab6b40";

  const loginUser = async (/* email, password */) => {
    /*
    const userInfo = await loginService.login(email, password);
    userId = userInfo.id;
    */
    const user = await userService.getUser(userId);

    if (user) {
      store.setCurrentUser(user);
      localStorage.setItem("user", JSON.stringify(user));
    };
  }

  return { loginUser }
}

//TODO Magie pour sacoir le ID du User

export function getCurrentUserID() {
  return "6716e7304bffd95d58ab6b40";
}

