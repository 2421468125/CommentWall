import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";
import axios from "axios";
import VueAxios from "vue-axios";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import "animate.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(VueAxios, axios);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
  },
});

app.mount("#app");
