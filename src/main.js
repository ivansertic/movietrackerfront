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
Vue.use(VueSimpleAlert);

Vue.use(VueRouter);
Vue.use(VueCookie);


const routes = [
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
    path:"/movie/add",
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
