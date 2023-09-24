import { RouteRecordRaw } from 'vue-router'
import { requireAuth } from '../auth'

const TaskLists = () => import('@/views/task/TaskList.vue')
const TaskCreate = () => import('@/views/task/TaskCreate.vue')
const TaskEdit = () => import('@/views/task/TaskEdit.vue')
const TaskDetail = () => import('@/views/task/TaskDetail.vue')

const task_list_route = {
  component: TaskLists,
  beforeEnter: requireAuth
}

const taskRoutes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'task-list',
    ...task_list_route
  },
  {
    path: '/tasks/page/:current_page(\\d+)',
    name: 'paginated-task-list',
    ...task_list_route
  },
  {
    path: '/tasks/edit/:task_id',
    name: 'task-edit',
    component: TaskEdit,
    beforeEnter: requireAuth
  },
  {
    path: '/tasks/create',
    name: 'task-create',
    component: TaskCreate,
    beforeEnter: requireAuth
  },
  {
    path: '/task/:task_id',
    name: 'task-detail',
    component: TaskDetail,
    beforeEnter: requireAuth
  }
]

export default taskRoutes
