<template>
  <!-- Alert Success -->
  <transition name="fade" dir="auto">
    <!-- Alert Error -->
    <div
      :class="[
        'fixed left-2 bottom-2  px-2 py-4 my-4 rounded-md text-lg flex flex-col max-w-96 w-3/4 lg:w-1/4 transition duration-500 ease-out z-10',
        backgroundColor,
      ]"
    >
      <svg
        id="close-button"
        class="absolute right-1 top-0 w-4 cursor-pointer"
        :class="textColor"
        @click="emitClose"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M6.2253 4.81108C5.83477 4.42056 5.20161 4.42056 4.81108 4.81108C4.42056 5.20161 4.42056 5.83477 4.81108 6.2253L10.5858 12L4.81114 17.7747C4.42062 18.1652 4.42062 18.7984 4.81114 19.1889C5.20167 19.5794 5.83483 19.5794 6.22535 19.1889L12 13.4142L17.7747 19.1889C18.1652 19.5794 18.7984 19.5794 19.1889 19.1889C19.5794 18.7984 19.5794 18.1652 19.1889 17.7747L13.4142 12L19.189 6.2253C19.5795 5.83477 19.5795 5.20161 19.189 4.81108C18.7985 4.42056 18.1653 4.42056 17.7748 4.81108L12 10.5858L6.2253 4.81108Z"
          fill="currentColor"
        />
      </svg>
      <div class="flex items-center mx-auto">
        <svg
          v-if="type === 'error'"
          viewBox="0 0 24 24"
          class="text-red-600 w-5 h-5 sm:w-5 sm:h-5 ml-3"
        >
          <path
            fill="currentColor"
            d="M11.983,0a12.206,12.206,0,0,0-8.51,3.653A11.8,11.8,0,0,0,0,12.207,11.779,11.779,0,0,0,11.8,24h.214A12.111,12.111,0,0,0,24,11.791h0A11.766,11.766,0,0,0,11.983,0ZM10.5,16.542a1.476,1.476,0,0,1,1.449-1.53h.027a1.527,1.527,0,0,1,1.523,1.47,1.475,1.475,0,0,1-1.449,1.53h-.027A1.529,1.529,0,0,1,10.5,16.542ZM11,12.5v-6a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Z"
          />
        </svg>
        <svg
          v-else-if="type === 'warning'"
          viewBox="0 0 24 24"
          class="text-yellow-600 w-5 h-5 sm:w-5 sm:h-5 ml-3"
        >
          <path
            fill="currentColor"
            d="M23.119,20,13.772,2.15h0a2,2,0,0,0-3.543,0L.881,20a2,2,0,0,0,1.772,2.928H21.347A2,2,0,0,0,23.119,20ZM11,8.423a1,1,0,0,1,2,0v6a1,1,0,1,1-2,0Zm1.05,11.51h-.028a1.528,1.528,0,0,1-1.522-1.47,1.476,1.476,0,0,1,1.448-1.53h.028A1.527,1.527,0,0,1,13.5,18.4,1.475,1.475,0,0,1,12.05,19.933Z"
          />
        </svg>
        <svg
          v-else-if="type === 'info'"
          viewBox="0 0 24 24"
          class="text-blue-600 w-5 h-5 sm:w-5 sm:h-5 ml-3"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.013,12.013,0,0,0,12,0Zm.25,5a1.5,1.5,0,1,1-1.5,1.5A1.5,1.5,0,0,1,12.25,5ZM14.5,18.5h-4a1,1,0,0,1,0-2h.75a.25.25,0,0,0,.25-.25v-4.5a.25.25,0,0,0-.25-.25H10.5a1,1,0,0,1,0-2h1a2,2,0,0,1,2,2v4.75a.25.25,0,0,0,.25.25h.75a1,1,0,1,1,0,2Z"
          />
        </svg>
        <svg
          v-else
          viewBox="0 0 24 24"
          class="text-green-600 w-5 h-5 sm:w-5 sm:h-5 ml-3"
        >
          <path
            fill="currentColor"
            d="M12,0A12,12,0,1,0,24,12,12.014,12.014,0,0,0,12,0Zm6.927,8.2-6.845,9.289a1.011,1.011,0,0,1-1.43.188L5.764,13.769a1,1,0,1,1,1.25-1.562l4.076,3.261,6.227-8.451A1,1,0,1,1,18.927,8.2Z"
          />
        </svg>
        <span :class="[textColor, ' font-vazir w-full text-left ml-2']">{{
          message
        }}</span>
      </div>
    </div>
    <!-- End Alert Error -->
  </transition>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { store } from "../store";
const props = withDefaults(
  defineProps<{
    type: "error" | "success" | "warning" | "info";
    message: string;
  }>(),
  { type: "success", message: "" }
);
const emit = defineEmits<{
  (e: "emitClose"): void;
}>();

const emitClose = () => {
  emit("emitClose");
};

const backgroundColor = computed(() => {
  if (props.type === "error") return "bg-red-200";
  else if (props.type === "success") return "bg-green-200";
  else if (props.type === "info") return "bg-blue-200";
  else return "bg-yellow-200";
});

const textColor = computed(() => {
  if (props.type === "error") return "text-red-800";
  else if (props.type === "success") return "text-green-800";
  else if (props.type === "info") return "text-blue-800";
  else return "text-yellow-800";
});
</script>
