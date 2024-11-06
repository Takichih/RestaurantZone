import { reactive } from "vue";

export const store = reactive({
  currentUser: {
    id: "6569767db55a58e85c543213",
    name: " ",
    email: "test1@ulaval.ca",
    rating: 1950,
    following: [],
    followers: [
      {
        id: "6577bec2ace10779fd2b4bab",
        email: "doha.seddiki.1@gmail.com",
        name: "Doha",
      },
      {
        id: "6608848535466c3764b29d67",
        email: "jeanpaul@hotmail.com",
        name: "Jean-Paul",
      },
      {
        id: "660c22c198b4eee145fadad2",
        email: "test500@mail.com",
        name: "Bob",
      },
      {
        id: "660c226b98b4eee145fada8a",
        email: "illuminatimax11@gmail.com",
        name: "Maxime",
      },
      {
        id: "65ea3e9df55288e8fb68bb93",
        email: "ptitjay@ufood.ca",
        name: "P'tit Jérémy",
      },
      {
        id: "660337882a362c2f8ee0cf35",
        email: "x.pelchat@gmail.com",
        name: "Xavier Pelchat",
      },
      {
        id: "66174205994ef08295fd8b53",
        email: "hihedi2203@rartg.com",
        name: "ziga",
      },
      {
        id: "661b03899daa4ddc17547599",
        email: "azertyui@g.com",
        name: "qsdfghjk",
      },
      {
        id: "661f01c1d46b33e65f703540",
        email: "gabil35@ulaval.ca",
        name: "Gabriel",
      },
      {
        id: "66210f9b3b423581da5d7f6f",
        email: "test1@mail.co",
        name: "test",
      },
      {
        id: "66217a016afbcd735dfcafe9",
        email: "chris.jesusmadrid7@gmail.com",
        name: "chris",
      },
      {
        id: "661c1efdb7769b0683c6baae",
        email: "omar@gmail.com",
        name: "omar",
      },
      {
        id: "654e49b3b2301f93d6e910cf",
        email: "alexandrecoyras@gmail.com",
        name: "Alexandre Coyras",
      },
      {
        id: "6610741937bb2880d27a8b5b",
        email: "rudyasaal3@gmail.com",
        name: "rudy",
      },
      {
        id: "661dc283a69a7c4024a34374",
        email: "allo@haha.com",
        name: "test",
      },
      {
        id: "6624015ca4dba5feb05f17ef",
        email: "fdsfd@fdsfdsij.com",
        name: "fdsfsfslkj",
      },
      {
        id: "66156dcc8498015059751c06",
        email: "testf",
        name: "testf",
      },
      {
        id: "66255446ca92c49d2f28ef60",
        email: "wo@gmail.com",
        name: "totototo",
      },
      {
        id: "66229d546afbcd735d5d7741",
        email: "shrek@shrek.tv",
        name: "Shrek",
      },
      {
        id: "5f9171b5368b7100044f5742",
        email: "1",
        name: "1",
      },
    ],
  },
  currentUserFavorites: {
    items: [
      {
        owner: {
          id: "6569767db55a58e85c543213",
          email: "test1@ulaval.ca",
          name: " ",
        },
        name: "My fav",
        restaurants: [
          {
            id: "5f31fc7155d7790550c08b02",
          },
        ],
        id: "660efd6a6da4a07c23234f5b",
      },
      {
        owner: {
          id: "6569767db55a58e85c543213",
          email: "test1@ulaval.ca",
          name: " ",
        },
        name: "Brooooo",
        restaurants: [],
        id: "660efd896da4a07c232350d6",
      },
      {
        owner: {
          id: "6569767db55a58e85c543213",
          email: "test1@ulaval.ca",
          name: " ",
        },
        name: "Brooooos",
        restaurants: [
          {
            id: "5f31fc7155d7790550c08b02",
          },
          {
            id: "5f31fc6555d7790550c08aff",
          },
          {
            id: "5f31fc6155d7790550c08afe",
          },
        ],
        id: "660efd8d6da4a07c23235138",
      },
      {
        owner: {
          id: "6569767db55a58e85c543213",
          email: "test1@ulaval.ca",
          name: " ",
        },
        name: "okayy lets go",
        restaurants: [],
        id: "66181c863fe80c48845f159f",
      },
      {
        owner: {
          id: "6569767db55a58e85c543213",
          email: "test1@ulaval.ca",
          name: " ",
        },
        name: "My super list",
        restaurants: [],
        id: "6709ad5f8399a59bc0dff337",
      },
      {
        owner: {
          id: "6569767db55a58e85c543213",
          email: "test1@ulaval.ca",
          name: " ",
        },
        name: "my list",
        restaurants: [],
        id: "6709b3168399a59bc0dff34e",
      },
      {
        owner: {
          id: "6569767db55a58e85c543213",
          email: "test1@ulaval.ca",
          name: " ",
        },
        name: "a",
        restaurants: [],
        id: "6709b49e8399a59bc0dff365",
      },
      {
        owner: {
          id: "6569767db55a58e85c543213",
          email: "test1@ulaval.ca",
          name: " ",
        },
        name: "wfq",
        restaurants: [],
        id: "6709b7558399a59bc0dff37c",
      },
      {
        owner: {
          id: "6569767db55a58e85c543213",
          email: "test1@ulaval.ca",
          name: " ",
        },
        name: "asd",
        restaurants: [],
        id: "6709b7818399a59bc0dff393",
      },
      {
        owner: {
          id: "6569767db55a58e85c543213",
          email: "test1@ulaval.ca",
          name: " ",
        },
        name: "lol",
        restaurants: [],
        id: "6709b7e28399a59bc0dff3aa",
      },
    ],
    total: 27,
  },
  favoritesModalOpen: false,
  restaurantIdToAddToFavorites: "",
  setCurrentUser(newUser) {
    this.currentUser = newUser;
  },
  setCurrentUserFavorites(newFavorites) {
    this.currentUserFavorites = newFavorites;
  },
  setFavoritesModalOpen(value) {
    this.favoritesModalOpen = value;
  },
  setRestaurantIdToAddToFavorites(newRestaurantId) {
    this.restaurantIdToAddToFavorites = newRestaurantId;
  },
});
