import { createRouter, createWebHashHistory } from "vue-router";
import Home from "@/components/Home";
import Restaurant from "@/components/Restaurant";
import CarteGeographique from "@/components/CarteGeographique";
import User from "@/components/User";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/restaurant",
    name: "Restaurant",
    component: Restaurant,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
  {
    path: "/CarteGeographique",
    name: "CarteGeographique",
    component: CarteGeographique,
  }
];

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
