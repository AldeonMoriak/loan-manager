<template>
  <modal-container :is-shown="isModalShown">
    <div
      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
    >
      <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div
            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10"
          >
            <!-- Heroicon name: outline/exclamation -->
            <svg
              class="h-6 w-6 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              class="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >Deactivate account</h3>
            <div class="mt-2">
              <p
                class="text-sm text-gray-500"
              >Are you sure you want to deactivate your account? All of your data will be permanently removed. This action cannot be undone.</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          @click="deleteHandler"
          type="button"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        >Deactivate</button>
        <button
          @click="onClickCancel"
          type="button"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >Cancel</button>
      </div>
    </div>
  </modal-container>
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="flex flex-col">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="(header, index) in props.headers"
                  scope="col"
                  :key="index"
                  :class="
                    store.dir === 'rtl'
                      ? 'text-right text-sm'
                      : 'text-left text-xs'
                  "
                  class="px-6 py-3 font-extrabold text-gray-500 uppercase tracking-wider"
                >{{ header }}</th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Operations</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(row, index) in props.rows" :key="index">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ row.name }}</div>
                      <div class="text-sm text-gray-500">{{ $formatPrice(row.total_amount) }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ row.month_day }}</div>
                  <div class="text-sm text-gray-500">{{ $formatPrice(row.portion) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="
                      row.is_complete
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-600'
                    "
                  >
                    {{
                      row.is_complete && store.dir === "rtl"
                        ? "اتمام"
                        : row.is_complete && store.dir === "ltr"
                          ? "Done"
                          : !row.is_complete && store.dir === "ltr"
                            ? "active"
                            : "فعال"
                    }}
                  </span>
                </td>
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                >{{ $formatPrice(row.remainder as number) }}</td>
                <td
                  :class="store.dir === 'rtl' ? 'text-left' : 'text-right'"
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium"
                >
                  <a
                    @click="emitDetailsHandler(row.id as string)"
                    class="cursor-pointer text-indigo-600 py-1 px-2 hover:(text-indigo-900 bg-indigo-100 rounded)"
                  >{{ store.dir === "rtl" ? " جزییات " : "details" }}</a>
                  <a
                    @click="onClickDelete(row, index)"
                    class="cursor-pointer text-red-600 py-1 px-2 hover:(text-red-900 bg-red-100 rounded)"
                  >{{ store.dir === "rtl" ? " حذف" : "delete" }}</a>
                </td>
              </tr>
              <tr v-if="store.loading">
                <td colspan="5" class="text-center">
                  <div class="gg-spinner text-center mx-auto"></div>
                </td>
              </tr>
              <tr v-else-if="!rows.length">
                <td colspan="5" class="text-center h-10 font-light text-sm">
                  {{
                    store.dir === "rtl"
                      ? "داده ای موجود نیست"
                      : "no data available"
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
import { reactive, ref } from "vue";
import { Loan } from "../helpers/interfaces";
import { store } from "../store";
import { deleteLoan } from "../vuetils/useLoans";
import ModalContainer from "./ModalContainer.vue";

const props = defineProps<{ headers: string[]; rows: Loan[] }>();
const emits = defineEmits<{
  (e: "emitDetails", index: string): void;
  (e: "emitDeleteLoan", index: number): void;
}>();

const isModalShown = ref(false);
let deleteCandidate = reactive<{loan?: Loan, index?: number}>({})

const onClickDelete = (loan: Loan, index: number) => {
  deleteCandidate = {loan, index};
  isModalShown.value = true;
}

const onClickCancel = () => {
  deleteCandidate = {};
}

const deleteHandler = async () => {
  const {loan, index} = deleteCandidate;
  try {
    const error = await deleteLoan(loan!);
    if (error) {
      console.log(error.message);
    } else {
      emits("emitDeleteLoan", index!);
    }
  } catch (error) { }
};

const emitDetailsHandler = (id: string) => {
  emits("emitDetails", id);
};
</script>
