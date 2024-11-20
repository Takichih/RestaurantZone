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
