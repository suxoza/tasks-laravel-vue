<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <div class="flex gap-x-5 border-gray-200 rounded border items-center justify-around w-full font-bold cursor-pointer">
    <router-link
      :to="{ name: 'register' }"
      class="w-1/2 py-3 flex items-center justify-center"
      :class="{ ' bg-blue-400 text-white': route.name === 'register' }"
    >
      Register
    </router-link>
    <router-link
      :to="{ name: 'login' }"
      class="w-1/2 py-3 flex items-center justify-center"
      :class="{ ' bg-blue-400 text-white': route.name === 'login' }"
    >
      Login
    </router-link>
  </div>
</template>
