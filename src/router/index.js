import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../components/Home.vue";
import Question from "../components/Question.vue";
import Result from "../components/Result.vue";
import NotFound from "../components/NotFound.vue";

Vue.use(VueRouter);

export default new VueRouter({
  mode: "history",
  routes: [
    { path: "/question", component: Home },
    { path: "/", redirect: "/question" },
    {
      path: "/question/:difficulty",
      component: Question,
      props: true,
      beforeEnter: (to, from, next) => {
        const difficulty = to.params.difficulty;
        if (!["easy", "medium", "hard"].includes(difficulty)) next("/notfound");
        next();
      }
    },
    { path: "/result", component: Result },
    { path: "*", component: NotFound }
  ]
});
