<script setup lang="ts">
import { store } from "../store";
</script>
<template>
  <footer class=" w-full text-center font-normal text-base dark:text-white">
    <template v-if="store.dir === 'ltr'" >
      Made with <span class="text-red-600">❤️</span> by
      <span
        class="font-semibold text-lg dark:(text-gray-100 underline-gray-100) text-sky-600 underline underline-2 underline-sky-500 underline-offset-4 cursor-pointer text-gray-600"
        ><a target="_blank" href="https://twitter.com/aldeonmoriak"
          >Aldeon</a
        ></span
      >
    </template>
    <template v-else>
      ساخته شده با <span class="text-red-600">❤️</span> توسط
      <span
        class="font-semibold text-lg dark:(text-white underline-gray-100) text-sky-600 underline underline-2 underline-sky-500 underline-offset-4 cursor-pointer text-gray-600"
        ><a
          class="font-poppins"
          target="_blank"
          href="https://twitter.com/aldeonmoriak"
          >Aldeon</a
        ></span
      >
    </template>
  </footer>
</template>
