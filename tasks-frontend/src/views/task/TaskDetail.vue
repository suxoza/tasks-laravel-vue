<script setup lang="ts">
// vue
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

// requests
import { getTaskByID } from '@/requests/taskReqeusts'
// components
import TaskForm from '@/components/TaskForm.vue'
// interfaces
import { TaskType } from '@/interfaces/task/Task'
// stores
import { useGlobalStore } from '@/stores/globalStore'

// vars
const route = useRoute()
const globalStore = useGlobalStore()

const active_task = ref<TaskType | null>(null)

// methods
const getTask = async () => {
  globalStore.setLoadingStatus()
  const task = await getTaskByID(route.params.task_id)
  active_task.value = task
  globalStore.setLoadingStatus()
}

onMounted(() => getTask())
</script>

<template>
  <div class="flex flex-col items-center justify-center mt-10">
    <div class="shadow-2xl p-10 w-full lg:w-1/2">
      <div class="flex gap-x-3 my-2">
        <div class="w-1/2 font-bold">Title:</div>
        <div class="text-lg">{{ active_task?.title }}</div>
      </div>
      <div class="flex gap-x-3 my-2">
        <div class="w-1/2 font-bold">Description:</div>
        <div class="text-lg">{{ active_task?.description }}</div>
      </div>
      <div class="flex gap-x-3 my-2">
        <div class="w-1/2 font-bold">Active From:</div>
        <div class="text-lg">{{ active_task?.date_from_new || '' }}</div>
      </div>
      <div class="flex gap-x-3 my-2">
        <div class="w-1/2 font-bold">Due Date:</div>
        <div class="text-lg">{{ active_task?.due_date_new || '' }}</div>
      </div>
      <div class="flex gap-x-3 my-2">
        <div class="w-1/2 font-bold">Is Active:</div>
        <div class="text-lg">{{ active_task?.is_active ? 'YES' : 'NO' }}</div>
      </div>
    </div>
  </div>
</template>
