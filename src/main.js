import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import VuePapaParse from "vue-papa-parse";
import { createPinia } from "pinia";

import "./assets/main.css";

const app = createApp(App);

app.use(router);
app.use(VuePapaParse);

app.use(createPinia()).mount("#app");
