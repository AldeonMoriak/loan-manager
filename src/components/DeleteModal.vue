<template>
  <modal-container :is-shown="isModalShown">
    <div
      class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
    >
      <div class="bg-white dark:bg-blue-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
        <div class="sm:flex sm:items-start">
          <div
            class="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-600 sm:mx-0 sm:h-10 sm:w-10"
          >
            <!-- Heroicon name: outline/exclamation -->
            <svg
              class="h-6 w-6 text-red-600 dark:text-red-50"
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
          <div
            :class="store.dir === 'ltr' ? 'sm:ml-4 sm:text-left' : 'sm:mr-4 sm:text-right'"
            class="mt-3 text-center sm:mt-0"
          >
            <h3
              class="text-lg leading-6 font-medium text-gray-900 dark:text-blue-gray-50"
              id="modal-title"
            >{{ store.dir === 'ltr' ? 'Deleting' : 'حذف ' }}</h3>
            <div class="mt-2">
              <p
                class="text-sm text-gray-500 dark:text-blue-gray-400"
                :class="store.dir === 'ltr' ? 'text-left' : 'text-right'"
              >{{ store.dir === 'ltr' ? 'Are you sure you want to delete this item? All of its data will be permanently removed. This action cannot be undone.' : 'مطمئنی میخوای این مورد رو حذف کنی؟ تمام اطلاعات این وام برای همیشه حذف میشه و قابل بازگشت نیست.' }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-gray-50 dark:bg-blue-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
        <button
          @click="deleteHandler"
          type="button"
          class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
        >
          <span v-if="!store.loading">
            {{
              store.dir === "rtl" ? "حذف" : "Delete"
            }}
          </span>
          <span v-else class="gg-spinner text-center"></span>
        </button>
        <button
          @click="onClickCancel"
          type="button"
          class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
        >{{ store.dir == 'ltr' ? 'Cancel' : 'بازگشت' }}</button>
      </div>
    </div>
  </modal-container>
</template>

<script lang="ts" setup>
import ModalContainer from './ModalContainer.vue';
import { store } from '../store';

const emit = defineEmits<{ (e: 'emitDelete'): void, (e: 'emitCancel'): void }>()
const props = defineProps<{ isModalShown: boolean }>()

const deleteHandler = () => {
  emit('emitDelete');
}
const onClickCancel = () => {
  emit('emitCancel');
}

</script>