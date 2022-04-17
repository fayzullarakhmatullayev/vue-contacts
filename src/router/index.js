import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/add-contact",
    name: "add-contact",
    component: () => import("../views/AddContact.vue"),
  },
  {
    path: "/edit-contact/:key",
    name: "edit-contact",
    component: () => import("../views/EditContact.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
