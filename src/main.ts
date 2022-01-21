import { createApp } from "vue";
import App from "./App.vue";
import "virtual:windi.css";
import "./assets/styles.css";
import Alert from "./components/Alert.vue";

const app = createApp(App);

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $formatPrice: (value: number) => string;
  }
}

app.config.globalProperties.$formatPrice = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

app.component("Alert", Alert).mount("#app");
