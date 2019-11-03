import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use( VueRouter );

// import components
const CharactersView = () => import( "@/views/CharactersView.vue" );
const LocationsView = () => import( "@/views/LocationsView.vue" );
const EpisodesView = () => import( "@/views/EpisodesView.vue" );
const Character = () => import( "@/views/Character" );
const Location = () => import( "@/views/Location" );
const Episode = () => import( "@/views/Episode" );

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
  },
  {
    path: '/search',
    name: 'search',
    component: Home,
    props: ( params ) => ( { q: params.query.q } )
  },
  {
    path: "/characters",
    name: "Characters",
    component: CharactersView
  },
  {
    path: "/episodes",
    name: "Episodes",
    component: EpisodesView
  },
  {
    path: "/locations",
    name: "Locations",
    component: LocationsView
  },
  {
    path: "/characters/:id",
    name: "character",
    component: Character,
    props: true
  },
  {
    path: "/episodes/:id",
    name: "episode",
    component: Episode,
    props: true
  },
  {
    path: "/locations/:id",
    name: "location",
    component: Location,
    props: true
  },
  {
    path: "/404"
    // component: NotFound,
  },
  {
    path: "*",
    redirect: "/404"
  }
];

const router = new VueRouter( {
  mode: "history",
  base: process.env.BASE_URL,
  routes
} );

export default router;
