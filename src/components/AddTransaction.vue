<template>
  <div class="flex flex-col">
    <div id="loans">
      <label for="loan-select">{{ store.dir === 'rtl' ? 'نام وام' : 'Loan Name' }}</label>
      <select id="loan-select">
        <option v-for="loan in props.loanNames" :value="loan.id">{{ loan.name }}</option>
      </select>
    </div>
    <div id="name">
      <label for="transaction-name">{{ store.dir === 'rtl' ? 'نام پرداختی' : 'Transaction Title' }}</label>
      <input type="text" id="transaction-name" v-model="form.name" />
    </div>
    <div id="amount">
      <label
        for="transaction-amount"
      >{{ store.dir === 'rtl' ? 'مقدار پرداختی' : 'Transaction Amount' }}</label>
      <input type="number" id="transaction-amount" v-model="form.amount" />
    </div>
    <div id="buttons">
      <button
        type="button"
        class="bg-green-200 text-green-600 rounded px-4 py-2 self-end mb-4 hover:(bg-green-300 text-green-700)"
      >{{ store.dir === 'rtl' ? 'ثبت' : 'Save' }}</button>
      <button
        type="button"
        class="bg-red-200 text-red-600 rounded px-4 py-2 self-end mb-4 hover:(bg-red-300 text-red-700)"
      >{{ store.dir === 'rtl' ? 'بازگشت' : 'Cancel' }}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue';
import { store } from '../store';

const props = defineProps<{ loanNames: { name: string, id: string }[] }>();

const form = reactive<{
  loanId: string;
  name: string;
  amount: number;
}>({
  loanId: '',
  name: '',
  amount: 0,
})
</script>