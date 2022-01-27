<template>
  <delete-modal
    :is-modal-shown="isModalShown"
    @emit-cancel="onClickCancel"
    @emit-delete="deleteHandler"
  />
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
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex items-center">
                    <div>
                      <div
                        class="text-sm font-medium text-gray-900"
                      >{{ $formatPrice(row.remainder as number) }}</div>
                      <div
                        class="text-sm text-gray-500"
                      >{{ remainingTime(row.remainder as number, row.portion) }}</div>
                    </div>
                  </div>
                </td>
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
import { computed, reactive, ref } from "vue";
import { Loan } from "../helpers/interfaces";
import { store } from "../store";
import { deleteLoan } from "../vuetils/useLoans";
import DeleteModal from "./DeleteModal.vue";
import { calculateRemainingTime } from "../helpers/remainingTimeCalculator";

const props = defineProps<{ headers: string[]; rows: Loan[] }>();
const emits = defineEmits<{
  (e: "emitDetails", index: string): void;
  (e: "emitDeleteLoan", index: number): void;
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
