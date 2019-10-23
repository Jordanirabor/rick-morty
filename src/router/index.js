import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

// import components
const Characters = () => import("@/views/Characters.vue");
const Locations = () => import("@/views/Locations.vue");
const Episodes = () => import("@/views/Episodes.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: "/characters",
    name: "Characters",
    component: Characters
  },
  {
    path: "/episodes",
    name: "Episodes",
    component: Episodes
  },
  {
    path: "/locations",
    name: "Locations",
    component: Locations
  }
  // {
  //   path: '/characters/:id',
  //   name: '',
  //   component: ,
  // },
  // {
  //   path: '/episodes/:id',
  //   name: '',
  //   component: ,
  // },
  // {
  //   path: '/locations/:id',
  //   name: '',
  //   component: ,
  // },  ,
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
