import Vue from 'vue'
import "./plugins/vuetify.js"
import App from './App.vue'
import vuetify from './plugins/vuetify';
import VueRouter from "vue-router";
import Login from "./components/auth/Login"
import Register from "./components/auth/Register";
import VueCookie from 'vue-cookie'
import VueSimpleAlert from "vue-simple-alert";
import MoviesToWatch from "@/components/movies/MoviesToWatch";
import AddMovie from "@/components/movies/AddMovie";
import EditMovie from "@/components/movies/EditMovie";
import AddActor from "@/components/actors/AddActor";
import EditActor from "@/components/actors/EditActor";
import WatchedMovies from "@/components/movies/WatchedMovies";
Vue.use(VueSimpleAlert);

Vue.use(VueRouter);
Vue.use(VueCookie);


const routes = [
  {
    path:"/moviesToWatch",
    component: WatchedMovies,
    name:"moviesToWatch"
  },
  {
    path:"/actor/edit/:id",
    component: EditActor,
    name:"editActor"
  },
  {
    path:"/actor/create/:id",
    component: AddActor,
    name:"addActor"
  },
  {
    path:"/movie/:id",
    component: EditMovie,
    name:"editMovie"
  },
  {
    path: "/",
    component: Login,
    name: "login"
  },
  {
    path: "/register",
    component: Register,
    name: "register"
  },
  {
    path:"/movie",
    component: MoviesToWatch,
    name:"moviesToWatch"
  },
  {
    path:"/movie/new/add",
    component: AddMovie,
    name:"addMovie"
  }
];

const router = new VueRouter({
  mode: "history",
  routes,
  base: "/"
});
Vue.config.productionTip = false
new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
