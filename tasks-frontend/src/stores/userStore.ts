import { defineStore } from 'pinia'
import UserStorage from './UserStorage'

interface UserState {
  name?: ''
  email?: ''
  token?: ''
}

export const useUserStore = defineStore({
  id: 'user-store',
  state: () => ({
    user: {} as UserState
  }),
  getters: {
    getUser: (state) => state.user || UserStorage.getInstance().user,
    getToken: (state) => state.user?.token || '',
    isAuthenticated: (state) => (state.user?.token || UserStorage.getInstance().user) ?? false
  },
  actions: {
    setUser(user: UserState) {
      UserStorage.getInstance().user = user
      this.user = user
    },
    delUser() {
      UserStorage.getInstance().delUser()
      this.user = {}
    }
  }
})
