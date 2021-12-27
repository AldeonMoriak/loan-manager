<script setup lang="ts">
import { ref, reactive, computed } from "vue";
import Table from "./Table.vue";
import Transactions from "./Transactions.vue";
import { store } from "../store";
import AddTransaction from "./AddTransaction.vue";

const showAddTransaction = ref(false);

const showAddHandler = () => {
  showAddTransaction.value = true;
}

const headers = ref(["نام وام", "موعد", "وضعیت", "مانده"]);
const rows = reactive([
  {
    id: 'a',
    name: "وام صادرات",
    total_amount: "۱۰۰ میلیون",
    due_date: "۳۰م هر ماه",
    portion: "۱۲,۷۵۰,۰۰۰",
    status: "بدهکار",
    remainder: "۸۴۱,۵۰۰,۰۰۰",
  },
  {
    id: 'a',
    name: "وام سپاه",
    total_amount: "۱۰ میلیون",
    due_date: "۳۰م هر ماه",
    portion: "۳,۰۰۰,۰۰۰",
    status: "بدهکار",
    remainder: "۹۵,۰۰۰,۰۰۰",
  },
  {
    id: 'a',
    name: "وام سپاه ۲",
    total_amount: "۱۰ میلیون",
    due_date: "۳۰م هر ماه",
    portion: "۲,۵۰۰,۰۰۰",
    status: "بدهکار",
    remainder: "۷۱,۵۰۰,۰۰۰",
  },
  {
    id: 'a',
    name: "وام ازدواج",
    total_amount: "۵۰ میلیون",
    due_date: "۱۳م هر ماه",
    portion: "۶,۴۹۰,۰۰۰",
    status: "بدهکار",
    remainder: "۴۸۱,۵۰۰,۰۰۰",
  },
  {
    id: 'a',
    name: "بدهی به عادل",
    total_amount: "۱۰ میلیون",
    due_date: "آخر سال",
    portion: "۱۰۰,۰۰۰,۰۰۰",
    status: "بدهکار",
    remainder: "۱۰۰,۰۰۰,۰۰۰",
  },
  {
    id: 'a',
    name: "بدهی به مرتضی",
    total_amount: "۲۰ میلیون",
    due_date: "هر زمان شد",
    portion: "۲۰۰,۰۰۰,۰۰۰",
    status: "بدهکار",
    remainder: "۲۰۰,۰۰۰,۰۰۰",
  },
  {
    id: 'a',
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
    name: 'قسط 11 صادرات',
    date: '1400/09/30',
    amount: '12750000'
  },
  {
    name: 'قسط 12 صادرات',
    date: '1400/09/30',
    amount: '12750000'
  },
  {
    name: 'قسط 13 صادرات',
    date: '1400/09/30',
    amount: '12750000'
  },
  {
    name: 'قسط 15 صادرات',
    date: '1400/09/30',
    amount: '12750000'
  },
  {
    name: 'قسط 12 صادرات',
    date: '1400/10/30',
    amount: '12750000'
  },
  {
    name: 'قسط 12 صادرات',
    date: '1400/11/30',
    amount: '12750000'
  },
]);

const detailsHandler = (index: number) => {
  showTransaction.value = true;
}
const backHandler = () => { showTransaction.value = false; }

const loanNames = computed(() => {
    // rows.forEach(el =>)
})
</script>

<template>
  <div class="max-w-4xl pt-28 flex flex-col">
    <!-- <AddTransaction :loan-names /> -->
    <button
      v-if="showTransaction"
      @click="backHandler"
      class="bg-red-200 text-red-600 rounded px-4 py-2 self-end mb-4 hover:(bg-red-300 text-red-700)"
      type="button"
    >{{ store.dir === 'rtl' ? 'بازگشت' : 'Back' }}</button>
    <Transactions v-if="showTransaction" :rows="transactionRows" />
    <Table v-else :rows="rows" :headers="headers" class @emit-details="detailsHandler" />

    <div class :dir="store.dir === 'rtl' ? 'ltr' : 'rtl'">
      <button
        type="button"
        class="fixed rounded-full bg-yellow-500 bottom-4 shadow-2xl shadow-red-600 p-2"
        @click="showAddHandler"
      >
        <svg
          width="24"
          height="24"
          class="text-yellow-900 w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12 4C11.4477 4 11 4.44772 11 5V11H5C4.44772 11 4 11.4477 4 12C4 12.5523 4.44772 13 5 13H11V19C11 19.5523 11.4477 20 12 20C12.5523 20 13 19.5523 13 19V13H19C19.5523 13 20 12.5523 20 12C20 11.4477 19.5523 11 19 11H13V5C13 4.44772 12.5523 4 12 4Z"
            fill="currentColor"
          />
        </svg>
      </button>
    </div>
  </div>
</template>
