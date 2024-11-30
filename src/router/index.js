import { createRouter, createWebHistory } from "vue-router";
import store from '@/store/index';

// Components
import HomeView from "@/views/HomeView";
import RestaurantView from "@/views/RestaurantView";
import ProfileView from "@/views/ProfileView";
import LoginView from "@/views/LoginView.vue";
import UserView from "@/views/UserView";
import UserDetailView from "@/views/UserDetailView";


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
    meta: { requiresAuth: true }
  },
  {
    path: "/login",
    name: "Login",
    component: LoginView,
    meta: { guest: true }
  },
  /*
  {
    path: "/register",
    name: "Register",
    component: RegisterView,
    meta: { guest: true }
  },
  */
  {
    path: "/",
    name: "Home",
    component: HomeView,
  },
  {
    path: "/users",
    name: "Users",
    component: UserView,
  },
  {
    path: "/user-detail",
    name: "UserDetailView",
    component: UserDetailView,
    props: (route) => ({ id: route.query.id }), // Passe l'ID en props
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.getters.isAuthenticated) {
      next();
      return;
    }
    next("/login");
  } else {
    next();
  }
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.guest)) {
    if (store.getters.isAuthenticated) {
      next('/profile');
      return;
    }
    next();
  } else {
    next();
  }
})

export default router;
