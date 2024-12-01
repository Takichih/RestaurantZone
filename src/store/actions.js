export const setConnectedUser = ({ commit }, userInfo) => {
  commit("setConnectedUser", userInfo);
}

export const logout = ({ commit }) => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  commit("setConnectedUser", null);
};

export const setAccountExists = ({ commit }, accountExists) => {
  commit("setAccountExists", accountExists);
}

export const syncAuthState = ({ commit }) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    commit("setConnectedUser", { token });
  } else {
    commit("setConnectedUser", null);
  }
};