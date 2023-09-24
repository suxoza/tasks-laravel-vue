<script setup lang="ts">
// vue
import { ref, ChangeEventHandler, computed, onMounted } from 'vue'
// interfaces
import { TaskType } from '@/interfaces/task/Task'
// stores
import { useTaskStore } from '@/stores/taskStore'
// components
import TaskCard from '@/components/TaskCard.vue'
import Confirm from '@/components/Confirm.vue'
import Loading from '@/components/Loading.vue'
// reqeusts
import { getTaskList, setTaskStatus, deleteTask } from '@/requests/taskReqeusts'
// ext
import InfiniteLoading from 'v3-infinite-loading'
import { useGlobalStore } from '@/stores/globalStore'
import { toast } from 'vue3-toastify'

// vars
const taskStore = useTaskStore()
const globalStore = useGlobalStore()
const taskList = computed(() => taskStore.getTasks)

const selected_task_id = ref<Number | null>(null)
const removalPromptIsActive = ref<Boolean>(false)

// methods
const displayRemovalPrompt = (task_id: Number) => {
  selected_task_id.value = task_id
  removalPromptIsActive.value = true
}

const deleteTaskTrigger = async (status: Boolean) => {
  removalPromptIsActive.value = false
  if (status) {
    globalStore.setLoadingStatus()
    try {
      await deleteTask(selected_task_id.value)
      taskStore.deleteTask(selected_task_id.value)
    } catch (error) {
      toast.error(error.toString() || JSON.stringify(error))
    } finally {
      globalStore.setLoadingStatus()
      selected_task_id.value = null
    }
  }
}

const setStatus = async (event: ChangeEventHandler<HTMLInputElement>, task: TaskType) => {
  event.preventDefault()
  globalStore.setLoadingStatus()
  const current_status = event.target.checked
  event.target.checked = !current_status
  try {
    await setTaskStatus(task)
    event.target.checked = current_status
  } catch (error) {
  } finally {
    globalStore.setLoadingStatus()
  }
}

const is_selected = ref(false)
let current_page = 1
const fetchTasks = ($state: any) => {
  if (is_selected.value && $state) {
    $state?.complete()
    return (is_selected.value = false)
  }
  getTaskList(current_page).then((response: { last_page: number; total: number; data: TaskType[] }) => {
    taskStore.prependTask(response.data)
    if (response.last_page === current_page || response.total === 0) {
      return $state?.complete()
    }
    current_page++
  })
}

onMounted(() => {
  console.log('first fetch')
  fetchTasks(null)
  is_selected.value = true
})
</script>

<template>
  <div class="bg-white rounded-lg p-4 shadow-md mb-4">
    <div class="flex flex-wrap gap-3 py-5 mb-5 min-w-64">
      <Confirm @update:deleteTrigger="deleteTaskTrigger" :isActive="removalPromptIsActive" />
      <TaskCard
        :task="task"
        v-for="(task, index) in taskList"
        :key="`${index}-task`"
        class="rounded-lg p-3 border border-gray-300 w-full md:w-56 xl:w-64 p-5"
        @update:displayRemovalPrompt="displayRemovalPrompt"
        @update:setStatus="setStatus"
      />
    </div>
    <InfiniteLoading @infinite="fetchTasks">
      <template #complete>
        <div v-show="!taskList?.length" class="w-full flex items-center justify-center">
          <span>No data found!</span>
        </div>
      </template>
      <template #spinner>
        <div class="relative w-full h-full my-5 py-5">
          <Loading :is_visible="true" type="absolute" />
        </div>
      </template>
    </InfiniteLoading>
  </div>
</template>
