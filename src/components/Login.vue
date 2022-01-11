<template>
  <Alert
    v-if="isAlertShown"
    @emit-close="isAlertShown = false"
    :type="alertType"
    :message="alertMessage"
  />
  <form
    novalidate
    class="mx-auto w-md h-64 flex flex-col bg-white rounded p-4 shadow shadow-gray-800/50"
    @submit.prevent="handleLogin"
  >
    <div class="h-full">
      <h1 class="text-2xl text-center">
        {{
          store.dir === "rtl"
            ? "به برنامه مدیریت وام وارد شوید"
            : "Sign In to LoanManager App"
        }}
      </h1>
      <p class="text-gray-500 text-base mt-8 text-center">
        {{ store.dir === "ltr" ? "Sign in via" : "ورود توسط" }}
        <span
          class="underline underline-2 text-black underline-offset-4 underline-yellow-500 text-left"
        >{{ store.dir === "ltr" ? "magic link" : "لینک جادویی" }}</span>
        {{ store.dir === "ltr" ? "with your email below" : "با ایمیل خود" }}
      </p>
      <div class="text-left mt-6">
        <input
          dir="auto"
          class="p-2 rounded text-gray-500 focus:text-gray-700 bg-gray-200 focus:(ring-2 ring-blue-300) w-full"
          type="email"
          id="email"
          :placeholder="store.dir === 'ltr' ? 'Your email' : 'ایمیل شما'"
          v-model="email"
          @keyup.enter.stop="handleLogin"
        />
      </div>
    </div>
    <div class="mt-4">
      <button
        type="submit"
        :disabled="isButtonDisable"
        class="p-2 rounded bg-blue-200 text-blue-600 hover:(bg-blue-400 text-blue-800) block disabled:(opacity-50 cursor-not-allowed) uppercase w-full flex justify-center"
      >
        {{ buttonText }}
        <i v-if="loading" class="gg-spinner-alt"></i>
      </button>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ApiError, Session } from "@supabase/gotrue-js";
import { computed, ref } from "vue";
import { AlertType } from "../helpers/interfaces";
import { supabase } from "../helpers/supabase";
import { store } from "../store";

const loading = ref(false);
const email = ref("");
const alertMessage = ref("");
const alertType = ref<AlertType>("info");
const isAlertShown = ref(false);
const isButtonDisable = computed(() => {
  return !email.value || loading.value;
});

const handleLogin = async () => {
  try {
    const isEmailValid = (/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/).test(email.value);

    if (!isEmailValid) {
      alertMessage.value = store.dir === 'rtl' ? 'فرمت ایمیل صحیح نیست!' : 'Email format is not correct!';

      alertType.value = "error";
      isAlertShown.value = true;
      return
    }
    loading.value = true;
    const { error } = await supabase.auth.signIn({ email: email.value });
    if (error) throw error;
    alertMessage.value = store.dir === 'ltr' ? "Check your email for the login link!" : 'لینک به ایمیلتان فرستاده شد';
    // alertMessage.value = "ایمیلت رو چک کن!";
    alertType.value = "success";
    isAlertShown.value = true;
  } catch (error) {
    alertMessage.value =
      (error as any).error_description || (error as ApiError).message;
    alertType.value = "error";
    isAlertShown.value = true;
  } finally {
    loading.value = false;
  }
};

const placeholderDirection = computed(() => {
  return store.dir === "rtl" ? "right" : "left";
});

const buttonText = computed(() => {
  if (loading.value) return "";
  else if (store.dir === "rtl") return "ارسال لینک جادویی";
  else return "send magic link";
});
</script>

<style>
@keyframes spinneralt {
  0% {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

.gg-spinner-alt {
  transform: scale(var(--ggs, 1));
}

.gg-spinner-alt,
.gg-spinner-alt::before {
  box-sizing: border-box;
  position: relative;
  display: block;
  width: 20px;
  height: 20px;
}

.gg-spinner-alt::before {
  content: "";
  position: absolute;
  border-radius: 100px;
  animation: spinneralt 1s cubic-bezier(0.6, 0, 0.4, 1) infinite;
  border: 3px solid transparent;
  border-top-color: currentColor;
}

#email::placeholder {
  text-align: v-bind(placeholderDirection);
}
</style>
