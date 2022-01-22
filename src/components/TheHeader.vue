<script lang="ts" setup>
import { useDark, useToggle } from "@vueuse/core";
import { ref } from "vue";
import { store } from "../store";
import { onClickOutside } from "@vueuse/core";
import { supabase } from "../helpers/supabase";

const isDark = useDark();
const toggleDark = useToggle(isDark);

const isDropdownVisible = ref(false);

const signOutHandler = () => {
  supabase.auth.signOut();
}

const clickHandler = () => {
  isDropdownVisible.value = !isDropdownVisible.value;
}

const target = ref(null)

onClickOutside(target, event => {
  isDropdownVisible.value = false;
});

const changeDir = () => {
  store.dir = store.dir === "rtl" ? "ltr" : "rtl";
  localStorage.setItem('lang', store.dir);
};
</script>
<template>
  <div
    dir="rtl"
    class="flex sticky top-0 z-40 w-full backdrop-blur transition-colors duration-500 lg:z-50 lg:border-b lg:border-gray-900/10 dark:border-gray-50/10 bg-white/90 supports-backdrop-blur:bg-white/60 dark:bg-gray-800/30 justify-between"
  >
    <div class="flex">
      <div @click="toggleDark()" class="mx-4 pt-4 cursor-pointer">
        <div v-if="isDark" class="bg-yellow-100 hover:bg-yellow-50 rounded p-2 inline-block">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="text-yellow-500 hover:text-yellow-700"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16ZM12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18Z"
              fill="currentColor"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M11 0H13V4.06189C12.6724 4.02104 12.3387 4 12 4C11.6613 4 11.3276 4.02104 11 4.06189V0ZM7.0943 5.68018L4.22173 2.80761L2.80752 4.22183L5.6801 7.09441C6.09071 6.56618 6.56608 6.0908 7.0943 5.68018ZM4.06189 11H0V13H4.06189C4.02104 12.6724 4 12.3387 4 12C4 11.6613 4.02104 11.3276 4.06189 11ZM5.6801 16.9056L2.80751 19.7782L4.22173 21.1924L7.0943 18.3198C6.56608 17.9092 6.09071 17.4338 5.6801 16.9056ZM11 19.9381V24H13V19.9381C12.6724 19.979 12.3387 20 12 20C11.6613 20 11.3276 19.979 11 19.9381ZM16.9056 18.3199L19.7781 21.1924L21.1923 19.7782L18.3198 16.9057C17.9092 17.4339 17.4338 17.9093 16.9056 18.3199ZM19.9381 13H24V11H19.9381C19.979 11.3276 20 11.6613 20 12C20 12.3387 19.979 12.6724 19.9381 13ZM18.3198 7.0943L21.1923 4.22183L19.7781 2.80762L16.9056 5.6801C17.4338 6.09071 17.9092 6.56608 18.3198 7.0943Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <div v-else class="bg-gray-700 hover:bg-gray-500 rounded p-2 inline-block">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            class="text-gray-100 hover:text-gray-200"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.2256 2.00253C9.59172 1.94346 6.93894 2.9189 4.92893 4.92891C1.02369 8.83415 1.02369 15.1658 4.92893 19.071C8.83418 22.9763 15.1658 22.9763 19.0711 19.071C21.0811 17.061 22.0565 14.4082 21.9975 11.7743C21.9796 10.9772 21.8669 10.1818 21.6595 9.40643C21.0933 9.9488 20.5078 10.4276 19.9163 10.8425C18.5649 11.7906 17.1826 12.4053 15.9301 12.6837C14.0241 13.1072 12.7156 12.7156 12 12C11.2844 11.2844 10.8928 9.97588 11.3163 8.0699C11.5947 6.81738 12.2094 5.43511 13.1575 4.08368C13.5724 3.49221 14.0512 2.90664 14.5935 2.34046C13.8182 2.13305 13.0228 2.02041 12.2256 2.00253ZM17.6569 17.6568C18.9081 16.4056 19.6582 14.8431 19.9072 13.2186C16.3611 15.2643 12.638 15.4664 10.5858 13.4142C8.53361 11.362 8.73568 7.63895 10.7814 4.09281C9.1569 4.34184 7.59434 5.09193 6.34315 6.34313C3.21895 9.46732 3.21895 14.5326 6.34315 17.6568C9.46734 20.781 14.5327 20.781 17.6569 17.6568Z"
              fill="currentColor"
            />
          </svg>
        </div>
      </div>
      <div class="mx-4 pt-4">
        <div class="flex items-center">
          <div
            class="cursor-pointer dark:bg-white bg-gray-700 dark:hover:bg-gray-200 hover:bg-gray-500 rounded inline-block p-2 mx-auto"
            @click="changeDir"
          >
            <svg
              class="dark:text-gray-600 text-gray-50"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21ZM14.8055 18.4151C17.1228 17.4003 18.7847 15.1667 18.9806 12.525C18.1577 12.9738 17.12 13.3418 15.9371 13.598C15.7882 15.4676 15.3827 17.1371 14.8055 18.4151ZM9.1945 5.58487C7.24725 6.43766 5.76275 8.15106 5.22208 10.244C5.4537 10.4638 5.84813 10.7341 6.44832 11.0008C6.89715 11.2003 7.42053 11.3798 8.00537 11.5297C8.05853 9.20582 8.50349 7.11489 9.1945 5.58487ZM10.1006 13.9108C10.2573 15.3675 10.5852 16.6202 10.9992 17.5517C11.2932 18.2133 11.5916 18.6248 11.8218 18.8439C11.9037 18.9219 11.9629 18.9634 12 18.9848C12.0371 18.9634 12.0963 18.9219 12.1782 18.8439C12.4084 18.6248 12.7068 18.2133 13.0008 17.5517C13.4148 16.6202 13.7427 15.3675 13.8994 13.9108C13.2871 13.9692 12.6516 14 12 14C11.3484 14 10.7129 13.9692 10.1006 13.9108ZM8.06286 13.598C8.21176 15.4676 8.61729 17.1371 9.1945 18.4151C6.8772 17.4003 5.21525 15.1666 5.01939 12.525C5.84231 12.9738 6.88001 13.3418 8.06286 13.598ZM13.9997 11.8896C13.369 11.9609 12.6993 12 12 12C11.3008 12 10.631 11.9609 10.0003 11.8896C10.0135 9.66408 10.4229 7.74504 10.9992 6.44832C11.2932 5.78673 11.5916 5.37516 11.8218 5.15605C11.9037 5.07812 11.9629 5.03659 12 5.01516C12.0371 5.03659 12.0963 5.07812 12.1782 5.15605C12.4084 5.37516 12.7068 5.78673 13.0008 6.44832C13.5771 7.74504 13.9865 9.66408 13.9997 11.8896ZM15.9946 11.5297C15.9415 9.20582 15.4965 7.11489 14.8055 5.58487C16.7528 6.43766 18.2373 8.15107 18.7779 10.244C18.5463 10.4638 18.1519 10.7341 17.5517 11.0008C17.1029 11.2003 16.5795 11.3798 15.9946 11.5297Z"
                fill="currentColor"
              />
            </svg>
          </div>
          <p
            class="mr-4 dark:text-white text-gray-800 font-medium"
          >{{ store.dir === "rtl" ? "فارسی" : "English" }}</p>
        </div>
      </div>
    </div>
    <div class="ml-3 relative pt-4" ref="target">
      <div class>
        <button
          type="button"
          class="dark:text-gray-100 flex text-sm pt-2 px-1 rounded-md text-gray-600 focus:outline-none hover:(outline-none text-gray-700 bg-gray-100) hover:dark:(outline-none text-gray-200 bg-gray-500)"
          id="user-menu-button"
          aria-expanded="false"
          aria-haspopup="true"
          @click="clickHandler"
        >
          <span class="sr-only">Open user menu</span>
          <span class="h-8">{{ store.user?.email?? 'aldeonmoriak@gmial.com' }}</span>
        </button>
      </div>

      <!--
            Dropdown menu, show/hide based on menu state.

            Entering: "transition ease-out duration-100"
              From: "transform opacity-0 scale-95"
              To: "transform opacity-100 scale-100"
            Leaving: "transition ease-in duration-75"
              From: "transform opacity-100 scale-100"
              To: "transform opacity-0 scale-95"
      -->
      <div
        v-if="isDropdownVisible"
        class="origin-top-right absolute left-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="user-menu-button"
        tabindex="-1"
      >
        <!-- Active: "bg-gray-100", Not Active: "" -->
        <a
          @click="signOutHandler"
          class="block px-4 py-2 text-sm text-gray-700 cursor-pointer"
          :class="store.dir === 'rtl' ? 'text-right' : 'text-left'"
          role="menuitem"
          tabindex="-1"
          id="user-menu-item-2"
        >{{ store.dir === 'ltr' ? 'Sign out' : 'خروج' }}</a>
      </div>
    </div>
  </div>
</template>
