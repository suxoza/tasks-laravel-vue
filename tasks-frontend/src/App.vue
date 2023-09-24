<script setup lang="ts">
// sys
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'

// stores
import { useGlobalStore } from '@/stores/globalStore'
import { useUserStore } from '@/stores/userStore'

// components
import Loading from '@/components/Loading.vue'

// vars
const sideNav = ref<HTMLDivElement | null>(null)
const route = useRoute()
const globalStore = useGlobalStore()
const userStore = useUserStore()

const pageTitle = computed(() => (route.name || '').replace('-', ' '))
const menuVisibilityStatus = ref(true)

const menuItems = [
  {
    url: 'task-list',
    routes: ['task-list', 'paginated-task-list', 'task-edit', 'task-detail'],
    title: 'Task List',
    icon: 'fa-home'
  },
  {
    url: 'task-create',
    routes: ['task-create'],
    title: 'Create Task',
    icon: 'fa-wallet'
  },
  {
    url: 'logout',
    title: 'LogOut',
    icon: 'fa-sign-out-alt'
  }
]
</script>

<template>
  <div>
    <Loading :is_visible="globalStore.isLoading" />

    <nav class="bg-white border-b border-gray-300 fixed inset-0 z-20 h-12">
      <div class="flex items-center px-9 my-3" :class="[userStore.isAuthenticated ? 'justify-between' : 'justify-center']">
        <button @click="menuVisibilityStatus = !menuVisibilityStatus" id="menuBtn">
          <i class="fas fa-bars text-cyan-500 text-lg" v-if="userStore.isAuthenticated"></i>
        </button>

        <div class="font-bold text-2xl font-serif text-gray-700">
          {{ pageTitle.charAt(0).toUpperCase() + pageTitle.slice(1).toLowerCase() }}
        </div>
      </div>
    </nav>

    <!-- left menu  -->
    <div
      v-if="userStore.isAuthenticated"
      ref="sideNav"
      class="bg-white z-10 w-64 h-screen fixed rounded-none border-r border-gray-200 mt-8"
      :class="{ hidden: !menuVisibilityStatus }"
    >
      <div class="p-4 space-y-4">
        <router-link
          v-for="(menuItem, index) in menuItems"
          :key="`${index}-menu-item`"
          :to="{ name: menuItem.url }"
          class="px-4 py-3 flex items-center space-x-4"
          :class="[
            menuItem.routes?.includes(route?.name)
              ? 'text-white relative rounded-lg text-white bg-gradient-to-r from-sky-600 to-cyan-400'
              : 'rounded-md text-gray-500 grou'
          ]"
        >
          <i class="fas" :class="menuItem.icon"></i>
          <span :class="{ '-mr-1 font-medium': menuItem.routes?.includes(route?.name) }">{{ menuItem.title }}</span>
        </router-link>
      </div>
    </div>
    <div
      class="mt-16 lg:flex lg:flex-col lg:w-100% mt-5 mx-2"
      :class="{ 'lg:pl-4 lg:ml-64': menuVisibilityStatus && !['login', 'register'].includes(route?.name) }"
    >
      <router-view />
    </div>
  </div>
</template>
