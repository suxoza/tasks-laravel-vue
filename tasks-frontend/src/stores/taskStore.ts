import { defineStore } from 'pinia'
import { TaskType } from '@/interfaces/task/Task'

interface TaskState {
  tasks: TaskType[]
}

export const useTaskStore = defineStore({
  id: 'tasks',
  state: (): TaskState => ({
    tasks: []
  }),
  getters: {
    getTasks: (state) => state.tasks
  },
  actions: {
    prependTask(tasks: TaskState[]) {
      const uniqueTasks: number[] = this.tasks.map((task) => task.id)
      const filteredTasks = tasks?.filter((task: TaskType) => !uniqueTasks.includes(task.id)) || []
      this.tasks = [...filteredTasks, ...this.tasks]
    },
    deleteTask(task_id: number) {
      this.tasks = this.tasks.filter((item: TaskType) => item.id !== task_id)
    },
    setSingleTask(new_task: TaskType) {
      const index = this.tasks.findIndex((task: TaskType) => task.id === new_task.id)
      if (index >= 0) {
        this.tasks[index] = new_task
      }
    }
  }
})
