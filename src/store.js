import { reactive } from "vue";

export const store = reactive({
  currentUserFavorites: null,
  visitModalOpen: false,
  readOnlyVisitModal: false,
  visitModalContent: {
    comment: "",
    rating: 0,
    selectedDate: new Date()
  },
  favoritesModalOpen: false,
  currentAddingVisitRestaurantId: "",
  currentAddingVisitRestaurantVisits: [],

  fbToken: null,
  fbUserName: null,
  fbUserEmail: null,
  fbUserId: null,

  setFbToken(token) {
    this.fbToken = token;
  },
  setFbUserName(name) {
    this.fbUserName = name;
  },
  setFbUserEmail(email) {
    this.fbUserEmail = email;
  },
  setFacebookAuth(authData) {
    this.facebookAuth = authData;
  },
  setFbUserId(id) {
    this.fbUserId = id;
  },

  clearFbUser() {
    this.fbToken = null;
    this.fbUserName = null;
    this.fbUserEmail = null;
    this.fbUserId = null;
  },

  handleVisitSubmittedFunction: () => { },
  setCurrentUserFavorites(newFavorites) {
    this.currentUserFavorites = newFavorites;
  },
  setVisitModalOpen(value) {
    this.visitModalOpen = value;
  },
  setReadOnlyVisitModal(value) {
    this.readOnlyVisitModal = value;
  },
  setVisitModalContent(value) {
    this.visitModalContent = value;
  },
  setFavoritesModalOpen(value) {
    this.favoritesModalOpen = value;
  },
  setCurrentAddingVisitRestaurantId(restaurantId) {
    this.currentAddingVisitRestaurantId = restaurantId;
  },
  setCurrentAddingVisitRestaurantVisits(visits) {
    this.currentAddingVisitRestaurantVisits = visits;
  },
  setHandleVisitSubmittedFunction(handleVisitSubmittedFunction) {
    this.handleVisitSubmittedFunction = handleVisitSubmittedFunction;
  },
});
