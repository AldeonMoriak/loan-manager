import { createApp } from "vue";
import App from "./App.vue";
import "virtual:windi.css";
import "./assets/styles.css";
import Alert from "./components/Alert.vue";
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";

const app = createApp(App);

declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $formatPrice: (value: number) => string;
  }
}

app.config.globalProperties.$formatPrice = (value: number) => {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

Sentry.init({
  app,
  dsn: import.meta.env.VITE_SENTRY_URL as string,
  integrations: [
    new Integrations.BrowserTracing({
      tracingOrigins: ["localhost", "loan-manager.mirshekaran.ir", /^\//],
    }),
  ],
  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
});

app.component("Alert", Alert).mount("#app");
