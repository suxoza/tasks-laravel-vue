<script setup lang="ts">
// vue
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useRouter } from 'vue-router'
// ext
import { toast } from 'vue3-toastify'
// requests
import { updateTask, getTaskByID } from '@/requests/taskReqeusts'
// components
import TaskForm from '@/components/TaskForm.vue'
// interfaces
import { TaskType } from '@/interfaces/task/Task'
import { useTaskStore } from '@/stores/taskStore'
// stores
import { useGlobalStore } from '@/stores/globalStore'
// helpers
import { callback } from '@/utils/helper'

// vars
const route = useRoute()
const router = useRouter()
const taskStore = useTaskStore()
const globalStore = useGlobalStore()

// computed
// let active_task = computed<TaskType | null>(() => taskStore.getTasks.find((task: TaskType) => task.id === Number(route.params.task_id)))

const active_task = ref<TaskType | null>(null)

// methods
const getTask = async () => {
  globalStore.setLoadingStatus()
  const task = await getTaskByID(route.params.task_id)
  active_task.value = task
  globalStore.setLoadingStatus()
}

const submit = async (data: TaskType) => {
  globalStore.setLoadingStatus()
  try {
    const response = await updateTask(data)
    toast.success('Task updated successfully!')
    taskStore.setSingleTask(response)
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

onMounted(() => {
  getTask()
})
</script>

<template>
  <TaskForm :task="active_task" v-if="active_task" @submit="submit" />
</template>
