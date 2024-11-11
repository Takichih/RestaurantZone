import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView";
import RestaurantView from "@/views/RestaurantView";
import ProfileView from "@/views/ProfileView";

const routes = [
  {
    path: "/restaurant/:restaurantId",
    name: "Restaurant",
    component: RestaurantView,
  },
  {
    path: "/profile",
    name: "Profile",
    component: ProfileView,
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
