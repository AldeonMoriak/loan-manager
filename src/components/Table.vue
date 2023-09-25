<template>
  <delete-modal
    :is-modal-shown="isModalShown"
    @emit-cancel="onClickCancel"
    @emit-delete="deleteHandler"
  />
  <!-- This example requires Tailwind CSS v2.0+ -->
  <div class="flex flex-col ">
    <div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
      <div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
        <div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50 dark:(bg-blue-gray-300)">
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
                  class="px-6 py-3 font-extrabold text-gray-500 dark:text-blue-gray-800 uppercase tracking-wider"
                >{{ header }}</th>
                <th scope="col" class="relative px-6 py-3">
                  <span class="sr-only">Operations</span>
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="(row, index) in props.rows" :key="index" :class="index % 2 !== 0 ? 'bg-white dark:bg-blue-gray-200' : 'bg-gray-100 dark:bg-blue-gray-100'">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div>
                      <div class="text-sm font-medium text-gray-900">{{ row.name }}</div>
                      <div class="text-sm text-gray-500">{{ formatPrice(row.total_amount) }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ row.month_day }}</div>
                  <div class="text-sm text-gray-500">{{ formatPrice(row.portion) }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="
                      row.remainder === 0
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-600'
                    "
                  >
                    {{
                      row.remainder === 0 && store.dir === "rtl"
                        ? "اتمام"
                        : row.remainder === 0 && store.dir === "ltr"
                          ? "Done"
                          : row.remainder !== 0 && store.dir === "ltr"
                            ? "active"
                            : "فعال"
                    }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div>
                      <div
                        class="text-sm font-medium text-gray-900"
                      >{{ formatPrice(row.remainder as number) }}</div>
                      <div
                        class="text-sm text-gray-500"
                      >{{ remainingTime(row.remainder as number, row.portion) }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div>
                      <div
                        class="text-sm font-medium text-gray-900"
                      >{{ 
                      row.transactions?.length ?
                       store.dir === 'rtl' ?
                        new Date(row.transactions[0].created_at!).toLocaleDateString(
                          "fa-IR"
                        ) : new Date(row.transactions[0].created_at as string).toLocaleDateString('en-US') : '' }}</div>
                    </div>
                  </div>
                </td>
                <td
                  :class="store.dir === 'rtl' ? 'text-left' : 'text-right'"
                  class="px-6 py-4 whitespace-nowrap text-sm font-medium flex flex-row-reverse items-center"
                >
                  <a
                    @click="onClickDelete(row, index)"
                    class="cursor-pointer text-red-600 py-1 px-2 hover:(text-red-900 bg-red-100 rounded)"
                  >{{ store.dir === "rtl" ? " حذف" : "delete" }}</a>
                  <a
                    id="edit-button"
                    @click="onClickEdit(row, index)"
                    class="cursor-pointer text-blue-600 mx-1 px-2 py-1 hover:(text-gray-700 bg-gray-200 rounded)"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      class="w-5 h-5"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M21.2635 2.29289C20.873 1.90237 20.2398 1.90237 19.8493 2.29289L18.9769 3.16525C17.8618 2.63254 16.4857 2.82801 15.5621 3.75165L4.95549 14.3582L10.6123 20.0151L21.2189 9.4085C22.1426 8.48486 22.338 7.1088 21.8053 5.99367L22.6777 5.12132C23.0682 4.7308 23.0682 4.09763 22.6777 3.70711L21.2635 2.29289ZM16.9955 10.8035L10.6123 17.1867L7.78392 14.3582L14.1671 7.9751L16.9955 10.8035ZM18.8138 8.98525L19.8047 7.99429C20.1953 7.60376 20.1953 6.9706 19.8047 6.58007L18.3905 5.16586C18 4.77534 17.3668 4.77534 16.9763 5.16586L15.9853 6.15683L18.8138 8.98525Z"
                        fill="currentColor"
                      />
                      <path
                        d="M2 22.9502L4.12171 15.1717L9.77817 20.8289L2 22.9502Z"
                        fill="currentColor"
                      />
                    </svg>
                  </a>
                  <a
                    @click="emitDetailsHandler(row.id as string)"
                    class="cursor-pointer text-indigo-600 py-1 px-2 hover:(text-indigo-900 bg-indigo-100 rounded)"
                  >{{ store.dir === "rtl" ? " جزییات " : "details" }}</a>
                </td>
              </tr>
              <tr v-if="store.loading">
                <td colspan="6" class="text-center">
                  <div class="gg-spinner text-center mx-auto"></div>
                </td>
              </tr>
              <tr v-else-if="!rows.length">
                <td colspan="6" class="text-center h-10 font-light text-sm">
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
import { computed, inject, reactive, ref } from "vue";
import { Loan } from "../helpers/interfaces";
import { store } from "../store";
import { deleteLoan } from "../vuetils/useLoans";
import DeleteModal from "./DeleteModal.vue";
import { calculateRemainingTime } from "../helpers/remainingTimeCalculator";

const props = defineProps<{ headers: string[]; rows: Loan[] }>();
const formatPrice = inject('formatPrice') as (value: number) => string;
const emits = defineEmits<{
  (e: "emitDetails", index: string): void;
  (e: "emitDeleteLoan", index: number): void;
  (e: 'emitEditLoan', loan: Loan, index: number): void;
}>();

const remainingTime = (remainder: number, portion: number) => {
  const [years, months] = calculateRemainingTime(remainder, portion)
  let yearText = '';
  let monthText = '';
  if (store.dir === 'ltr') {
    yearText = ' years'
    monthText = ' months'
  } else {
    yearText = ' سال'
    monthText = ' ماه'
  }
  if (months === 1 && store.dir === 'ltr') {
    monthText = ' month';
  }
  if (years) {
    if (years === 1 && store.dir === 'ltr') {
      yearText = ' year'
    }
    return years + yearText + ` ${store.dir === 'ltr' ? 'and ' : 'و '}` + months + monthText;
  }
  return months + monthText;
}

const isModalShown = ref(false);
let deleteCandidate = reactive<{ loan?: Loan, index?: number }>({})

const onClickDelete = (loan: Loan, index: number) => {
  deleteCandidate = { loan, index };
  isModalShown.value = true;
}

const onClickCancel = () => {
  deleteCandidate = {};
  isModalShown.value = false;
}

const onClickEdit =(loan: Loan, index: number) => {
  emits('emitEditLoan', loan, index);
}

const deleteHandler = async () => {
  const { loan, index } = deleteCandidate;
  try {
    const error = await deleteLoan(loan!);
    if (error) {
      console.log(error.message);
    } else {
      emits("emitDeleteLoan", index!);
    }
  } catch (error) { }
  onClickCancel();
};

const emitDetailsHandler = (id: string) => {
  emits("emitDetails", id);
};
</script>
