<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import Table from "./Table.vue";
import Transactions from "./Transactions.vue";
import { store } from "../store";

const showAddTransaction = ref(false);

const defaultTitle = store.dir === "rtl" ? "لیست وام ها" : "Loans List";

const title = ref(defaultTitle);

const showAddHandler = () => {
  showAddTransaction.value = true;
};

const headers = ref(["وام", "موعد", "وضعیت", "مانده"]);
const rows = reactive([
  {
    id: "a",
    name: "وام صادرات",
    total_amount: "۱۰۰ میلیون",
    due_date: "۳۰م هر ماه",
    portion: "۱۲,۷۵۰,۰۰۰",
    status: "بدهکار",
    remainder: "۸۴۱,۵۰۰,۰۰۰",
  },
  {
    id: "a",
    name: "وام سپاه",
    total_amount: "۱۰ میلیون",
    due_date: "۳۰م هر ماه",
    portion: "۳,۰۰۰,۰۰۰",
    status: "بدهکار",
    remainder: "۹۵,۰۰۰,۰۰۰",
  },
  {
    id: "a",
    name: "وام سپاه ۲",
    total_amount: "۱۰ میلیون",
    due_date: "۳۰م هر ماه",
    portion: "۲,۵۰۰,۰۰۰",
    status: "بدهکار",
    remainder: "۷۱,۵۰۰,۰۰۰",
  },
  {
    id: "a",
    name: "وام ازدواج",
    total_amount: "۵۰ میلیون",
    due_date: "۱۳م هر ماه",
    portion: "۶,۴۹۰,۰۰۰",
    status: "بدهکار",
    remainder: "۴۸۱,۵۰۰,۰۰۰",
  },
  {
    id: "a",
    name: "بدهی به عادل",
    total_amount: "۱۰ میلیون",
    due_date: "آخر سال",
    portion: "۱۰۰,۰۰۰,۰۰۰",
    status: "بدهکار",
    remainder: "۱۰۰,۰۰۰,۰۰۰",
  },
  {
    id: "a",
    name: "بدهی به مرتضی",
    total_amount: "۲۰ میلیون",
    due_date: "هر زمان شد",
    portion: "۲۰۰,۰۰۰,۰۰۰",
    status: "بدهکار",
    remainder: "۲۰۰,۰۰۰,۰۰۰",
  },
  {
    id: "a",
    name: "بدهی به مادر",
    total_amount: "۷ میلیون",
    due_date: "هر وقت شد",
    portion: "۷۰,۰۰۰,۰۰۰",
    status: "بدهکار",
    remainder: "۷۰,۰۰۰,۰۰۰",
  },
]);
const showTransaction = ref(false);
const transactionRows = reactive([
  {
    name: "قسط 11 صادرات",
    date: "1400/09/30",
    amount: "12750000",
  },
  {
    name: "قسط 12 صادرات",
    date: "1400/09/30",
    amount: "12750000",
  },
  {
    name: "قسط 13 صادرات",
    date: "1400/09/30",
    amount: "12750000",
  },
  {
    name: "قسط 15 صادرات",
    date: "1400/09/30",
    amount: "12750000",
  },
  {
    name: "قسط 12 صادرات",
    date: "1400/10/30",
    amount: "12750000",
  },
  {
    name: "قسط 12 صادرات",
    date: "1400/11/30",
    amount: "12750000",
  },
]);

const detailsHandler = (index: number) => {
  showTransaction.value = true;
  title.value =
    (store.dir === "rtl" ? "جزییات " : "Details of ") + loanNames.value[index];
};
const backHandler = () => {
  showTransaction.value = false;
  title.value = defaultTitle;
};

const loanNames = computed(() => {
  return rows.map((el) => el.name);
});
</script>

<template>
  <!-- <AddTransaction :loan-names /> -->
  <div class="max-w-4xl pt-28 flex flex-col">
    <div class="flex justify-between">
      <div
      v-if="!showTransaction"
        class="
          group
          flex
          items-center
          rounded-md
          bg-blue-500
          text-white text-sm
          font-medium
          py-2
          px-4
          mb-4
          cursor-pointer
          shadow-sm
          hover:bg-blue-400
        "
        @click="showAddHandler"
      >
        {{ store.dir === "rtl" ? "وام جدید" : "New Loan" }}
        <svg width="20" height="20" fill="currentColor" class="mr-2">
          <path
            d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z"
          ></path>
        </svg>
      </div>
      <div
        v-else
        class="
          group
          flex
          items-center
          rounded-md
          bg-blue-500
          text-white text-sm
          font-medium
          py-2
          px-4
          mb-4
          cursor-pointer
          shadow-sm
          hover:bg-blue-400
        "
        @click="showAddHandler"
      >
        {{ store.dir === "rtl" ? "تراکنش جدید" : "New Transaction" }}
        <svg width="20" height="20" fill="currentColor" class="mr-2">
          <path
            d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z"
          ></path>
        </svg>
      </div>
      <button
        v-if="showTransaction"
        @click="backHandler"
        class="
          bg-red-200
          text-red-600 text-sm
          font-medium
          rounded
          px-4
          py-2
          mb-4
          hover:(bg-red-300
          text-red-700)
        "
        type="button"
      >
        {{ store.dir === "rtl" ? "بازگشت" : "Back" }}
      </button>
    </div>
    <div class="text-lg py-2 text-gray-900 dark:text-white font-semibold">{{ title }}</div>
    <Transactions v-if="showTransaction" :rows="transactionRows" />
    <Table
      v-else
      :rows="rows"
      :headers="headers"
      class
      @emit-details="detailsHandler"
    />
  </div>
</template>
