<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div
    v-if="isShown"
    class="fixed z-50 inset-0 overflow-y-hidden"
    aria-labelledby="modal-title"
    role="dialog"
    aria-modal="true"
  >
    <div
      class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
    >
      <!--
      Background overlay, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0"
        To: "opacity-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100"
        To: "opacity-0"
    -->
      <div
        class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        aria-hidden="true"
      ></div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span
        class="hidden sm:inline-block sm:align-middle sm:h-screen"
        aria-hidden="true"
        >&#8203;</span
      >

      <!--
      Modal panel, show/hide based on modal state.

      Entering: "ease-out duration-300"
        From: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        To: "opacity-100 translate-y-0 sm:scale-100"
      Leaving: "ease-in duration-200"
        From: "opacity-100 translate-y-0 sm:scale-100"
        To: "opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
    -->
      <div
        ref="target"
        :class="store.dir === 'rtl' ? 'text-right' : 'text-left'"
        class="inline-block align-bottom bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
      >
        <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div class="flex flex-col">
            <div id="loans mt-5">
              <label for="loan-name" class="block">{{
                store.dir === "rtl" ? "وام" : "Loan"
              }}</label>
              <input
                type="text"
                id="loan-name"
                class="bg-gray-100 py-2 mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-inner sm:text-sm border-gray-300 rounded-md text-gray-600"
                v-model="form.name"
              />
            </div>
            <div id="amount" class="mt-4">
              <label for="tinstallment-amount" class="block">{{
                store.dir === "rtl" ? "مقدار قسط" : "Installment"
              }}</label>
              <input
                type="number"
                id="installment-amount"
                v-model="form.portion"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-inner sm:text-sm border-gray-300 rounded-md bg-gray-100 py-2 text-gray-600"
              />
            </div>
            <div id="name" class="mt-4">
              <label for="total-amount" class="block">{{
                store.dir === "rtl" ? "مقدار کلی وام" : "Loan Total Amount"
              }}</label>
              <input
                type="number"
                id="total-amount"
                v-model="form.total_amount"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-inner sm:text-sm border-gray-300 rounded-md bg-gray-100 py-2 text-gray-600"
              />
            </div>
            <div id="amount" class="mt-4">
              <label for="month-day" class="block">{{
                store.dir === "rtl" ? "زمان پرداختی ماهانه" : "Monthly Due Day"
              }}</label>
              <input
                type="text"
                id="month-day"
                v-model="form.month_day"
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-inner sm:text-sm border-gray-300 rounded-md bg-gray-100 py-2 text-gray-600"
              />
            </div>
          </div>
        </div>
        <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
          @click="insertLoan"
            type="button"
            class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
          >
            {{ store.dir === "rtl" ? "ثبت" : "Save" }}
          </button>
          <button
            type="button"
            @click="closeHandler"
            class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
          >
            {{ store.dir === "rtl" ? "بازگشت" : "Cancel" }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { store } from "../store";
import { onClickOutside } from "@vueuse/core";
import { addLoan, allLoans } from "../vuetils/useLoans";

const target = ref(null);

onClickOutside(target, (event) => closeHandler());

const closeHandler = () => emit("onClose");

const emit = defineEmits<{ (e: "onClose"): void }>();

async function insertLoan() {
  // Guard for short task descriptions which will fail db policy.
  if (form.name.length <= 3) {
    alert("Please make your task a little more descriptive");
    return;
  }
  // Type check to ensure user is still logged in.
  if (store.userSession === null) {
    alert("Please log in again");
    return;
  }
  try {
    // Try and write the data to the database.
    const loan = await addLoan({
      user_id: store.userSession.user!.id,
      name: form.name,
      month_day: form.month_day,
      total_amount: form.total_amount,
      portion: form.portion,
    });

    // If there was no response, don't do anything.
    if (!loan) {
      return;
    }
    // Otherwise, push the response into allTodos.
    allLoans.value.push(loan);
    emit('onClose');

    // Reset input field.
  } catch (err) {
    console.error("Unknown error when adding todo", err);
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
