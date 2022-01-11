import { createApp } from "vue";
import App from "./App.vue";
import "virtual:windi.css";
import "./assets/styles.css";
import Alert from "./components/Alert.vue";

createApp(App).component('Alert', Alert).mount("#app");
