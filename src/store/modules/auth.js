import jwtDecode from "jwt-decode";

const token_keyname = "USER_TOKEN";

const state = {
  token: localStorage.getItem(token_keyname)
    ? localStorage.getItem(token_keyname)
    : ""
};

const mutations = {
  login: (state, token) => {
    state.token = token;
    localStorage.setItem(token_keyname, token);
  },
  logout: state => {
    state.token = null;
    localStorage.removeItem(token_keyname);
  }
};

const getters = {
  userId: state => {
    return jwtDecode(state.token).user_id;
  }
};

export default {
  namespaced: true,
  state: state,
  mutations,
  getters
};
