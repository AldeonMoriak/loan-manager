import { createApp } from "vue";
import App from "./App.vue";
import "virtual:windi.css";
import "./assets/styles.css";
import Alert from "./components/Alert.vue";

const app = createApp(App);

const formatPrice = (v: number) => {
  let value = v.toString();
  if (value.includes(".")) {
    value = v.toFixed(2);
  }
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

app.provide("formatPrice", formatPrice);

app.component("Alert", Alert).mount("#app");
