<template>
  <Alert v-if="isAlertShown" @emit-close="isAlertShown = false" :type="alertType" :message="alertMessage"
    :class="store.dir === 'rtl' ? 'font-vazir' : 'font-poppins'" />
  <ModalContainer :is-shown="props.isShown">
    <form @submit.prevent="insertLoan" ref="target" :class="store.dir === 'rtl' ? 'text-right' : 'text-left'"
      class="inline-block align-bottom bg-white rounded-lg overflow-x-hidden overflow-y-auto shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full max-h-screen">
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="flex flex-col">
          <div class="text-xl font-bold text-gray-500 mb-4">
            {{
                store.dir === "rtl"
                  ? "افزودن وام به لیست"
                  : "Add Loan to the list"
            }}
          </div>
          <div id="loans mt-5">
            <label for="loan-name" class="block text-gray-600 text-sm">
              {{ store.dir === "rtl" ? "عنوان وام" : "Loan Name" }}
            </label>
            <input type="text" dir="auto" ref="input" id="loan-name"
              class="bg-gray-100 py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-inner sm:text-sm border-gray-300 rounded-md text-gray-600"
              v-model="form.name" />
          </div>
          <div id="amount" class="mt-4">
            <label for="tinstallment-amount" class="block text-gray-600 text-sm">
              {{ store.dir === "rtl" ? "مقدار قسط" : "Installment" }}
            </label>
            <input type="number" id="installment-amount" v-model="form.portion"
              class="focus:ring-indigo-500 px-4 focus:border-indigo-500 block w-full shadow-inner sm:text-sm border-gray-300 rounded-md bg-gray-100 py-2 text-gray-600" />
          </div>
          <div id="name" class="mt-4">
            <label for="total-amount" class="block text-gray-600 text-sm">
              {{ store.dir === "rtl" ? "مقدار کلی وام" : "Loan Total Amount" }}
            </label>
            <input type="number" id="total-amount" v-model="form.total_amount"
              class="focus:ring-indigo-500 px-4 focus:border-indigo-500 block w-full shadow-inner sm:text-sm border-gray-300 rounded-md bg-gray-100 py-2 text-gray-600" />
          </div>
          <div id="amount" class="mt-4">
            <label for="month-day" class="block text-gray-600 text-sm">
              {{
                  store.dir === "rtl" ? "زمان پرداختی ماهانه" : "Monthly Due Day"
              }}
            </label>
            <input type="text" dir="auto" id="month-day" v-model="form.month_day"
              class="focus:ring-indigo-500 px-4 focus:border-indigo-500 block w-full shadow-inner sm:text-sm border-gray-300 rounded-md bg-gray-100 py-2 text-gray-600" />
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 pt-3 pb-6 sm:px-6 sm:flex"
        :class="store.dir === 'ltr' ? 'sm:flex-row-reverse' : 'sm:flex-row'">
        <button type="submit"
        :disabled="store.loading"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm">
          <span v-if="!store.loading">
            {{ store.dir === "rtl" ? "ثبت" : "Save" }}
          </span>
          <span v-else class="gg-spinner text-center"></span>
        </button>
        <button type="button" @click="closeHandler"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
          {{ store.dir === "rtl" ? "بازگشت" : "Cancel" }}
        </button>
      </div>
    </form>
  </ModalContainer>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { store } from "../store";
import { onClickOutside, useFocus } from "@vueuse/core";
import { addLoan, allLoans } from "../vuetils/useLoans";
import { AlertType } from "../helpers/interfaces";
import ModalContainer from "./ModalContainer.vue";

const isAlertShown = ref(false);
const alertMessage = ref("");
const alertType = ref<AlertType>("error");

const input = ref();

useFocus(input, { initialValue: true });
const target = ref(null);

onClickOutside(target, (event) => closeHandler());

const closeHandler = () => emit("onClose");

const emit = defineEmits<{ (e: "onClose"): void }>();

async function insertLoan() {
  // Guard for short task descriptions which will fail db policy.
  if (form.name.length <= 3) {
    alertMessage.value =
      store.dir === "rtl"
        ? "عنوان وام خیلی کوچیکه!"
        : "Please make your loan a little more descriptive";
    alertType.value = "error";
    isAlertShown.value = true;
    return;
  }
  // Type check to ensure user is still logged in.
  if (store.userSession === null) {
    alertMessage.value =
      store.dir === "rtl" ? "لطفا دوباره وارد شوید" : "Please log in again";
    alertType.value = "error";
    isAlertShown.value = true;
    return;
  }
  if (
    !form.month_day ||
    !form.portion ||
    !form.total_amount ||
    form.total_amount === 0 ||
    form.portion === 0
  ) {
    alertMessage.value =
      store.dir === "rtl"
        ? "مقادیر صحیح نمی‌باشد"
        : "Please enter valid inputs";
    alertType.value = "error";
    isAlertShown.value = true;
    return;
  }
  if(store.loading) return;
  try {
    // Try and write the data to the database.
    const { error, data: loan } = await addLoan({
      user_id: store.userSession.user!.id,
      name: form.name.trim(),
      month_day: form.month_day.trim(),
      total_amount: form.total_amount,
      portion: form.portion,
    });

    if (error) {
      alertMessage.value = error.message;
      alertType.value = "error";
      isAlertShown.value = true;
    }
    // If there was no response, don't do anything.
    if (!loan) {
      return;
    }
    loan.remainder = loan.total_amount;
    loan.transactions = [];
    // Otherwise, push the response into allTodos.
    allLoans.value.push(loan);
    emit("onClose");

    // Reset input field.
    form.name = "";
    form.month_day = "";
    form.portion = 0;
    form.total_amount = 0;
  } catch (err) {
    console.error("Unknown error when adding loan", err);
  }
}

const props = defineProps<{
  isShown: boolean;
}>();

const form = reactive<{
  name: string;
  portion: number;
  total_amount: number;
  month_day: string;
}>({
  portion: 0,
  name: "",
  total_amount: 0,
  month_day: "",
});
</script>
