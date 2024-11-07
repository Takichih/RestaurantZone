import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView";
import RestaurantView from "@/views/RestaurantView";
import UserView from "@/views/UserView";

const routes = [
  {
    path: "/restaurant/:restaurantId",
    name: "Restaurant",
    component: RestaurantView,
  },
  {
    path: "/user",
    name: "User",
    component: UserView,
  },
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});
