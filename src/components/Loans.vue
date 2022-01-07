<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from "vue";
import Table from "./Table.vue";
import Transactions from "./Transactions.vue";
import { store } from "../store";
import AddTransaction from "./AddTransaction.vue";
import AddLoan from "./AddLoan.vue";
import { allLoans, deleteLoan, fetchLoans } from "../vuetils/useLoans";
import { Loan, Transaction } from "../helpers/interfaces";

const showAddTransaction = ref(false);
const showAddLoan = ref(false);

const defaultTitle = { rtl: "لیست وام ها", ltr: "Loans List" };
const defaultDetailsTitle = { rtl: "جزییات ", ltr: "Details of " };

const selectedLoan = ref<Loan | null>(null);

watch(
  () => store.dir,
  (dir: "rtl" | "ltr", prevDir: "rtl" | "ltr") => {
    if (showTransaction.value) {
      title.value = defaultDetailsTitle[store.dir] + selectedLoan.value!.name;
    } else {
      title.value = defaultTitle[dir];
    }
  }
);
const title = ref(defaultTitle[store.dir]);

const showAddTransactionHandler = () => {
  showAddTransaction.value = true;
};

const showAddLoanHandler = () => {
  showAddLoan.value = true;
};

const headers = ref(["وام", "موعد", "وضعیت", "مانده"]);
const rows = ref(allLoans);
const showTransaction = ref(false);
let transactionRows = ref<Transaction[]>([]);

const modalCloseHandler = () => {
  showAddTransaction.value = false;
  showAddLoan.value = false;
};

const detailsHandler = (id: string) => {
  const loan = rows.value.find(row => row.id === id);
  selectedLoan.value = loan as Loan;
  transactionRows.value = loan?.transactions as Transaction[];
  showTransaction.value = true;
  title.value = defaultDetailsTitle[store.dir] + selectedLoan.value.name;
};
const backHandler = () => {
  selectedLoan.value = null;
  showTransaction.value = false;
  title.value = defaultTitle[store.dir];
};

const loanNames = computed(() => {
  return rows.value.map((el, index) => ({ name: el.name, id: index.toString() }));
});

onMounted(async () => await fetchLoans());
</script>

<template>
  <div class="max-w-4xl pt-28 flex flex-col">
    <AddTransaction
      :loan="selectedLoan!"
      :is-shown="showAddTransaction"
      v-if="showAddTransaction"
      @onClose="modalCloseHandler"
    />
    <AddLoan :is-shown="showAddLoan" @onClose="modalCloseHandler" />
    <div class="flex justify-between">
      <div
        v-if="!showTransaction"
        class="group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium py-2 px-4 mb-4 cursor-pointer shadow-sm hover:bg-blue-400"
        @click="showAddLoanHandler"
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
        class="group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium py-2 px-4 mb-4 cursor-pointer shadow-sm hover:bg-blue-400"
        @click="showAddTransactionHandler"
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
        class="bg-red-200 text-red-600 text-sm font-medium rounded px-4 py-2 mb-4 hover:(bg-red-300 text-red-700)"
        type="button"
      >
        {{ store.dir === "rtl" ? "بازگشت" : "Back" }}
      </button>
    </div>
    <div class="text-xl py-2 mb-2 text-gray-600 dark:text-white font-semibold">
      {{ title }}
    </div>
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
