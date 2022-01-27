<template>
  <Alert
    v-if="isAlertShown"
    @emit-close="isAlertShown = false"
    :type="alertType"
    :message="alertMessage"
    :class="store.dir === 'rtl' ? 'font-vazir' : 'font-poppins'"
  />
  <!-- This example requires Tailwind CSS v2.0+ -->
  <ModalContainer :is-shown="props.isShown">
    <div
      ref="target"
      :class="store.dir === 'rtl' ? 'text-right' : 'text-left'"
      class="inline-block align-bottom bg-white rounded-lg overflow-x-hidden overflow-y-auto shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full max-h-screen"
    >
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="flex flex-col">
          <div
            class="text-xl font-bold text-gray-500 mb-4"
          >{{ store.dir === 'rtl' ? 'افزودن قسط' : 'New Transaction' }}</div>
          <div id="loans mt-5">
            <label for="loan-select" class="block text-gray-600 text-sm">
              {{
                store.dir === "rtl" ? "وام" : "Loan"
              }}
            </label>
            <input
              type="text"
              dir="auto"
              id="loan-name"
              disabled
              class="px-4 bg-gray-300 py-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-inner sm:text-sm border-gray-300 rounded-md text-gray-700"
              v-model="loan.name"
            />
          </div>
          <div id="name" class="mt-4">
            <label for="transaction-name" class="block text-gray-600 text-sm">
              {{
                store.dir === "rtl" ? "عنوان پرداختی" : "Transaction Title"
              }}
            </label>
            <input
              type="text"
              dir="auto"
              ref="input"
              id="transaction-name"
              class="bg-gray-100 py-2 px-4 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-inner sm:text-sm border-gray-300 rounded-md text-gray-600"
              v-model="form.name"
            />
          </div>
          <div id="amount" class="mt-4">
            <label for="transaction-amount" class="block text-gray-600 text-sm">
              {{
                store.dir === "rtl" ? "مقدار پرداختی" : "Transaction Amount"
              }}
            </label>
            <input
              type="number"
              id="transaction-amount"
              v-model="form.amount"
              class="focus:ring-indigo-500 px-4 focus:border-indigo-500 block w-full shadow-inner sm:text-sm border-gray-300 rounded-md bg-gray-100 py-2 text-gray-600"
            />
          </div>
        </div>
      </div>
      <div
        class="bg-gray-50 px-4 pt-3 pb-6 sm:px-6 sm:flex"
        :class="store.dir === 'ltr' ? 'sm:flex-row-reverse' : 'sm:flex-row'"
      >
        <button
          @click="insertTransaction"
          type="button"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          <span v-if="!store.loading">
            {{
              store.dir === "rtl" ? "ثبت" : "Save"
            }}
          </span>
          <span v-else class="gg-spinner text-center"></span>
        </button>
        <button
          type="button"
          @click="closeHandler"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >{{ store.dir === "rtl" ? "بازگشت" : "Cancel" }}</button>
      </div>
    </div>
  </ModalContainer>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue";
import { store } from "../store";
import { onClickOutside, useFocus } from "@vueuse/core";
import { AlertType, Loan, Transaction } from "../helpers/interfaces";
import { addTransaction } from "../vuetils/useTransactions";
import ModalContainer from "./ModalContainer.vue";

const input = ref();
const isAlertShown = ref(false);
const alertMessage = ref('');
const alertType = ref<AlertType>("error");

useFocus({ target: input, initialValue: true });

const target = ref(null);

onClickOutside(target, (event) => closeHandler());

const closeHandler = () => emit("onClose");

const emit = defineEmits<{ (e: "onClose", transaction?: Transaction): void }>();

const props = defineProps<{
  isShown: boolean;
  loan: Loan;
}>();

const form = reactive<Transaction>({
  loan_id: "",
  name: "",
  amount: props.loan?.portion,
});

async function insertTransaction() {
  // Guard for short task descriptions which will fail db policy.
  if (form.name.length <= 3) {
    alertMessage.value = store.dir === 'rtl' ? 'عنوان خیلی کوچیکه!' : "Please make your transaction a little more descriptive";
    alertType.value = 'error';
    isAlertShown.value = true;
    return;
  }
  // Type check to ensure user is still logged in.
  if (store.userSession === null) {
    alertMessage.value = store.dir === 'rtl' ? 'لطفا دوباره وارد شوید' : "Please log in again";
    alertType.value = 'error';
    isAlertShown.value = true;
    return;
  }
  if(!form.amount || form.amount === 0) {
    alertMessage.value = store.dir === 'rtl' ? 'مقدار پرداختی وارد نشده' : "Please enter a valid value for transaction amount";
    alertType.value = 'error';
    isAlertShown.value = true;
    return;
  }
  try {
    // Try and write the data to the database.
    const transaction = await addTransaction({
      loan_id: props.loan.id as string,
      name: form.name,
      amount: form.amount,
      user_id: store.user?.id,
    });

    // If there was no response, don't do anything.
    if (!transaction) {
      return;
    }
    // Otherwise, push the response into allTodos.
    transaction.created_at = new Date(
      transaction.created_at as string
    ).toLocaleString();
    emit("onClose", transaction);

    // Reset input field.
  } catch (err) {
    console.error("Unknown error when adding todo", err);
  }
}
</script>
