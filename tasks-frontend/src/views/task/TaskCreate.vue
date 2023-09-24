<script setup lang="ts">
// vue
import { useRouter } from 'vue-router'
// ext
import { toast } from 'vue3-toastify'
// components
import TaskForm from '@/components/TaskForm.vue'
// types
import { TaskType } from '@/interfaces/task/Task'
// reqeusts
import { createTask } from '@/requests/taskReqeusts'
// stores
import { useGlobalStore } from '@/stores/globalStore'
// helpers
import { callback } from '@/utils/helper'

// vars
const router = useRouter()
const globalStore = useGlobalStore()

// methods
const submit = async (data: TaskType) => {
  globalStore.setLoadingStatus()
  try {
    await createTask(data)
    toast.success('Task created successfully!')
    callback(() => {
      router.push({ name: 'task-list' })
      globalStore.setLoadingStatus()
    })
  } catch (error) {
    toast.error(error.toString() || JSON.stringify(error))
    globalStore.setLoadingStatus()
  } finally {
  }
}
</script>

<template>
  <TaskForm @submit="submit" />
</template>
