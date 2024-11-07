import { reactive } from "vue";

export const store = reactive({
  currentUser: {
    id: "6716e7304bffd95d58ab6b40",
    name: "Gordon Ramsay",
    email: "gordon.ramsay@gmail.com",
    rating: 80,
    following: [],
    followers: [],
  },
  currentUserFavorites: [
    {
      owner: {
        id: "6716e7304bffd95d58ab6b40",
        email: "gordon.ramsay@gmail.com",
        name: "Gordon Ramsay",
      },
      name: "Test2ougfhbdvnsouaihfndiuosjahnfoujdashnfoljakdshn",
      restaurants: [
        {
          id: "5f31fc6555d7790550c08aff",
        },
      ],
      id: "6727b49df19b4415011ebd80",
    },
    {
      owner: {
        id: "6716e7304bffd95d58ab6b40",
        email: "gordon.ramsay@gmail.com",
        name: "Gordon Ramsay",
      },
      name: "fff",
      restaurants: [
        {
          id: "5f31fc8f55d7790550c08b09",
        },
      ],
      id: "6727e768f19b4415011fbab0",
    },
    {
      owner: {
        id: "6716e7304bffd95d58ab6b40",
        email: "gordon.ramsay@gmail.com",
        name: "Gordon Ramsay",
      },
      name: "wewe",
      restaurants: [],
      id: "672c0879ae031989f9dd0f57",
    },
  ],
  visitModalOpen: false,
  currentAddingVisitRestaurantId: "",
  currentAddingVisitRestaurantVisits: [],
  setCurrentUser(newUser) {
    this.currentUser = newUser;
  },
  setCurrentUserFavorites(newFavorites) {
    this.currentUserFavorites = newFavorites;
  },
  setVisitModalOpen(value) {
    this.visitModalOpen = value;
  },
  setCurrentAddingVisitRestaurantId(restaurantId) {
    this.currentAddingVisitRestaurantId = restaurantId;
  },
  setCurrentAddingVisitRestaurantVisits(visits) {
    this.currentAddingVisitRestaurantVisits = visits;
  },
});
