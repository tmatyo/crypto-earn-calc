import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VuePapaParse from "vue-papa-parse";
import { createPinia } from "pinia";

import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.provide("$router", app.config.globalProperties.$router);

app.use(VuePapaParse);
app.provide("$papa", app.config.globalProperties.$papa);

app.use(createPinia()).mount("#app");
