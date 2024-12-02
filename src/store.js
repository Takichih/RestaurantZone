import { reactive } from "vue";
import favoriteService from "@/api/favoriteService";

export const store = reactive({
  currentUserFavorites: null,
  visitModalOpen: false,
  readOnlyVisitModal: false,
  visitModalContent: {
    comment: "",
    rating: 0,
    selectedDate: null,
  },
  favoritesModalOpen: false,
  currentAddingVisitRestaurantId: "",
  currentAddingVisitRestaurantVisits: [],

  fbToken: null,
  fbUserName: null,
  fbUserEmail: null,
  fbUserId: null,

  favoriteLists: [],
  isFavoriteDialogOpen: false,

  setFavoritesModalOpen(value) {
    this.isFavoriteDialogOpen = value;
  },
  setFavoriteLists(lists) {
    this.favoriteLists = lists;
  },

  async handleAddToFavorites({ restaurantId, listId }) {
    try {
      const favoriteList = await favoriteService.getFavoriteList(listId);
      const isRestaurantInList = favoriteList.restaurants.some(
        (restaurant) => restaurant.id === restaurantId,
      );
      if (isRestaurantInList) {
        alert(`Restaurant ${restaurantId} already exists in list ${listId}`);
        return;
      }

      await favoriteService.addRestaurantToFavoriteList(listId, restaurantId);
      console.log(`Restaurant ${restaurantId} added to list ${listId}`);
    } catch (error) {
      console.error("Error adding restaurant to favorites:", error);
    }
  },

  setFbToken(token) {
    this.fbToken = token;
  },
  setFbUserName(name) {
    this.fbUserName = name;
  },
  setFbUserEmail(email) {
    this.fbUserEmail = email;
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

  handleVisitSubmittedFunction: () => {},
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
