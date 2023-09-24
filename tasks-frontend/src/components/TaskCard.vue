<script setup lang="ts">
// interfaces
import { TaskType } from '@/interfaces/task/Task'

// props
const props = defineProps({
  task: Object as () => TaskType
})

// refs
const emits = defineEmits(['update:setStatus', 'update:displayRemovalPrompt'])
</script>

<template>
  <div class="flex flex-col gap-y-3 text-lg text-gray-700">
    <router-link :to="{ name: 'task-detail', params: { task_id: props.task.id } }" class="gap-y-3 flex flex-col">
      <!-- title  -->
      <div class="underline bold text-lg text-gray-900">{{ props.task.title }}</div>
      <!-- description  -->
      <div class="truncate hover:underline">{{ props.task.description }}</div>
      <!-- dates  -->
      <div class="flex md:flex-col w-full justify-between md:gap-y-2 hover:underline">
        <div class="flex flex-col text-xs">
          <div class="bold">From date</div>
          <div class="text-sm">{{ props.task.date_from_new || '--/-- --:--' }}</div>
        </div>
        <div class="flex flex-col text-xs">
          <div class="bold">To date</div>
          <div class="text-sm">{{ props.task.due_date_new || '--/-- --:--' }}</div>
        </div>
      </div>
    </router-link>
    <!-- switch  -->
    <div class="">
      <label class="flex w-full items-center gap-x-3">
        <div class="relative inline-flex items-center cursor-pointer my-3">
          <input
            :checked="props.task.is_active"
            @change="emits('update:setStatus', $event, props.task)"
            type="checkbox"
            value=""
            class="sr-only peer"
          />
          <div
            class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
          ></div>
        </div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-800">Active</span>
      </label>
    </div>
    <!-- buttons  -->
    <div class="flex gap-x-1 text-gray-500">
      <div
        @click="emits('update:displayRemovalPrompt', task.id)"
        class="w-1/2 flex items-center justify-center bg-gray-100 py-2 cursor-pointer hover:text-red-400 hover:bg-gray-300 rounded-md"
      >
        <i class="fa fa-trash"></i>
      </div>
      <router-link
        :to="{ name: 'task-edit', params: { task_id: task.id } }"
        class="w-1/2 flex items-center justify-center bg-gray-100 py-2 cursor-pointer hover:text-green-500 hover:bg-gray-300 rounded-md"
      >
        <i class="fa fa-edit"></i>
      </router-link>
    </div>
  </div>
</template>
