import Vue from "vue";
import Router from "vue-router";
import Search from "./views/Search.vue";
import Home from "./views/Home.vue";
import Results from "./views/Results.vue";

Vue.use(Router);

export default new Router({
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/search",
      name: "search",
      component: Search
    },
    {
      path: "/results",
      name: "results",
      component: Results,
      props: true
    },
  ]
});
