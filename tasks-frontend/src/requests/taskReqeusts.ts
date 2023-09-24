import axios from './requests'
import { TaskType } from '@/interfaces/task/Task'

export const taskListReqeust = (page = 1) => {}

export const createTask = async (task: TaskType) => {
  const response = await axios.post('/tasks', task)

  if (response.status === 201) return response.data
  throw new Error('Creating Failed')
}

export const updateTask = async (task: TaskType) => {
  const response = await axios.put(`/tasks/${task.id}`, task)
  if (response.status === 200) return response.data
  throw new Error('Updating Failed')
}

export const setTaskStatus = async (task: TaskType) => {
  const response = await axios.patch(`/tasks/set-status/${task.id}`)
  if (response.status === 200) return response.data
  throw new Error('Updating Failed')
}

export const getTaskList = async (page = 1) => {
  const response = await axios.get(`/tasks?page=${page}`)
  if (response.status === 200) return response.data
  throw new Error('Failed')
}

export const getTaskByID = async (task_id: number) => {
  const response = await axios.get(`/tasks/${task_id}`)
  if (response.status === 200) return response.data
  throw new Error('Failed')
}

export const deleteTask = async (task_id: number) => {
  const response = await axios.delete(`/tasks/${task_id}`)
  if (response.status === 200) return response.data
  throw new Error('Failed')
}
