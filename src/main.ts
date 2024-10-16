import { createApp } from "vue";
import App from "./App.vue";
import router from "../router/index";
import "./assets/font/font.css";

createApp(App).use(router).mount("#app");
