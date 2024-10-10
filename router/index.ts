// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Chat from "../src/components/Chat.vue";
import Name from "../src/components/Name.vue"; // 채팅 컴포넌트를 가져옵니다.

const routes = [
  {
    path: "/",
    name: "Name",
    component: Name,
  },
  {
    path: "/chat",
    name: "Chat",
    component: Chat,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
