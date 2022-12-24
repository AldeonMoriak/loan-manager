<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from "vue";
import Table from "./Table.vue";
import Transactions from "./Transactions.vue";
import { store } from "../store";
import AddTransaction from "./AddTransaction.vue";
import AddLoan from "./AddLoan.vue";
import { allLoans, computeRemainder, deleteLoan, fetchLoans } from "../vuetils/useLoans";
import { Loan, Transaction } from "../helpers/interfaces";
import EditTransaction from "./EditTransaction.vue";
import EditLoan from "./EditLoan.vue";

const showAddTransaction = ref(false);
const showEditTransaction = ref(false);
const showAddLoan = ref(false);

const defaultTitle = { rtl: "لیست وام ها", ltr: "Loans List" };
const defaultDetailsTitle = { rtl: "جزییات ", ltr: "Details of " };

const selectedLoan = ref<Loan | null>(null);

const deleteLoanHandler = (index: number) => {
  rows.value.splice(index, 1);
};

watch(
  () => store.dir,
  (dir: "rtl" | "ltr", prevDir: "rtl" | "ltr") => {
    if (showTransaction.value) {
      title.value = defaultDetailsTitle[dir] + selectedLoan.value!.name;
    } else {
      title.value = defaultTitle[dir];
    }
    headers.value = defaultHeaders[dir];
  }
);
const title = ref(defaultTitle[store.dir]);
const editTransactionContent = ref<Transaction>();
const editableTransactionIndex = ref<number>();

const editLoanContent = ref<Loan>();
const editableLoanIndex = ref<number>();

const showEditLoan = ref(false);

const editTransactionHandler = (transaction: Transaction, index: number) => {
  editTransactionContent.value = transaction;
  editableTransactionIndex.value = index;
  showEditTransactionHandler();
}

const editLoanHandler = (loan: Loan, index: number) => {
  editLoanContent.value = loan;
  editableLoanIndex.value = index;
  showEditLoanHandler();
}

const showEditLoanHandler = () => {
  showEditLoan.value = true;
};

const showAddTransactionHandler = () => {
  showAddTransaction.value = true;
};

const showEditTransactionHandler = () => {
  showEditTransaction.value = true;
};

const showAddLoanHandler = () => {
  showAddLoan.value = true;
};

const defaultHeaders = {
  rtl: ["وام", "موعد", "وضعیت", "مانده"],
  ltr: ["Loan", "Monthly Due", "Status", "Remainder"],
};

const headers = ref(defaultHeaders[store.dir]);
const rows = ref(allLoans);
const showTransaction = ref(false);
let transactionRows = ref<Transaction[]>([]);

const modalCloseHandler = (transaction?: Transaction) => {
  if (transaction) {
    selectedLoan.value?.transactions?.push(transaction);
    selectedLoan.value = computeRemainder(selectedLoan.value as Loan);
  }
  showAddTransaction.value = false;
  showAddLoan.value = false;
  showEditLoan.value = false;
};

const editTransactionModalCloseHandler = (transaction?: Transaction) => {
  if (transaction) {
    selectedLoan.value?.transactions?.splice(editableTransactionIndex.value!, 1, transaction);
    selectedLoan.value = computeRemainder(selectedLoan.value as Loan);
  }
  showEditTransaction.value = false;
}

const detailsHandler = (id: string) => {
  const loan = rows.value.find((row) => row.id === id);
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

const deleteTransactionHandler = (index: number) => {
  selectedLoan.value!.transactions?.splice(index, 1);
  selectedLoan.value = computeRemainder(selectedLoan.value as Loan);
};

onMounted(async () => await fetchLoans());
</script>

<template>
  <div class="max-w-4xl pt-28 flex flex-col mx-4 lg:mx-auto">
    <Teleport to="body">
      <EditTransaction :loan="selectedLoan!" :is-shown="showEditTransaction" v-if="showEditTransaction"
        :content="editTransactionContent!" @onClose="editTransactionModalCloseHandler" />
    </Teleport>
    <Teleport to="body">
      <AddTransaction :loan="selectedLoan!" :is-shown="showAddTransaction" v-if="showAddTransaction"
        @onClose="modalCloseHandler" />
    </Teleport>
    <Teleport to="body">
      <EditLoan v-if="showEditLoan" :is-shown="showEditLoan" :content="editLoanContent!"
        :loan-index="editableLoanIndex!" @onClose="modalCloseHandler" />
    </Teleport>
    <Teleport to="body">
      <AddLoan :is-shown="showAddLoan" @onClose="modalCloseHandler" />
    </Teleport>
    <div class="flex justify-between">
      <div v-if="!showTransaction"
        class="group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium py-2 px-4 mb-4 cursor-pointer shadow-sm hover:bg-blue-400"
        @click="showAddLoanHandler">
        {{ store.dir === "rtl" ? "وام جدید" : "New Loan" }}
        <svg width="20" height="20" fill="currentColor" class="mr-2">
          <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
        </svg>
      </div>
      <div v-else
        class="group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium py-2 px-4 mb-4 cursor-pointer shadow-sm hover:bg-blue-400"
        @click="showAddTransactionHandler">
        {{ store.dir === "rtl" ? "تراکنش جدید" : "New Transaction" }}
        <svg width="20" height="20" fill="currentColor" class="mr-2">
          <path d="M10 5a1 1 0 0 1 1 1v3h3a1 1 0 1 1 0 2h-3v3a1 1 0 1 1-2 0v-3H6a1 1 0 1 1 0-2h3V6a1 1 0 0 1 1-1Z" />
        </svg>
      </div>
      <button v-if="showTransaction" @click="backHandler"
        class="bg-red-200 text-red-600 text-sm font-medium rounded px-4 py-2 mb-4 hover:(bg-red-300 text-red-700)"
        type="button">{{ store.dir === "rtl" ? "بازگشت" : "Back" }}</button>
    </div>
    <div class="text-xl py-2 mb-2 text-gray-600 dark:text-white font-semibold font-poppins">{{ title }}</div>
    <Transactions v-if="showTransaction" :rows="transactionRows" :delete-transaction-handler="deleteTransactionHandler"
      @edit="editTransactionHandler" />
    <Table v-else :rows="rows" :headers="headers" @emit-edit-loan="editLoanHandler" @emit-details="detailsHandler"
      @emit-delete-loan="deleteLoanHandler" />
  </div>
</template>
