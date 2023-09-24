import { defineStore } from 'pinia'

interface GeneralState {
  loading: boolean
}

export const useGlobalStore = defineStore({
  id: 'general-store',
  state: (): GeneralState => ({
    loading: false
  }),
  getters: {
    isLoading: (state) => state.loading
  },
  actions: {
    setLoadingStatus(status: boolean | null = null) {
      this.loading = status === null ? !this.loading : status
    }
  }
})
