<template>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div
          class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg"
        >
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="(header, index) in headers"
                  scope="col"
                  :key="index"
                  :class="
                    store.dir === 'rtl'
                      ? 'text-right text-sm'
                      : 'text-left text-xs'
                  "
                  class="px-6 py-3 font-extrabold text-gray-500 uppercase tracking-wider"
                >
                  {{ header }}
                </th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Operations</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(row, index) in props.rows" :key="index">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="text-sm font-medium text-gray-900">
                      {{ row.name }}
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div
                    class="text-sm text-gray-900"
                    :class="store.dir === 'rtl' ? 'text-right' : 'text-left'"
                    dir="ltr"
                  >
                    {{ row.created_at }}
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {{ $formatPrice(row.amount) }}
                </td>
                <td
                  :class="store.dir === 'rtl' ? 'text-left' : 'text-right'"
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                >
                  <a
                    @click="deleteHandler(row, index)"
                    class="cursor-pointer text-red-600 px-2 hover:(text-red-900 bg-red-100 rounded-xl)"
                    >{{ store.dir === "rtl" ? "حذف" : "Delete" }}</a
                  >
                </td>
              </tr>
              <tr v-if="!props.rows.length">
                <td class="text-center h-10 text-sm font-light" colspan="4">
                  {{
                    store.dir === "ltr"
                      ? "no data available"
                      : "داده ای موجود نیست"
                  }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { store } from "../store";
import { ref, watch } from "vue";
import { Loan, Transaction } from "../helpers/interfaces";
import { deleteTransaction } from "../vuetils/useTransactions";

const defaultHeaders = {
  rtl: ["تراکنش", "تاریخ", "مقدار"],
  ltr: ["Transaction", "Date", "Amount"],
};

const deleteHandler = async (row: Transaction, index: number) => {
  try {
    const error = await deleteTransaction(row);
    if (error) {
      console.error(error.message);
    } else props.deleteTransactionHandler(index);
  } catch (error) {}
};
const props = defineProps<{
  rows: Transaction[];
  deleteTransactionHandler: (index: number) => void;
}>();
const headers = ref(defaultHeaders[store.dir]);

watch(
  () => store.dir,
  (dir: "rtl" | "ltr", prevDir: "rtl" | "ltr") => {
    headers.value = defaultHeaders[dir];
  }
);
</script>
