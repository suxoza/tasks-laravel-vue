import axios from 'axios'
import UserStorage from '@/stores/UserStorage'
const baseURL = `${import.meta.env.VITE_API_ENDPOINT}/api/`
const instance = axios.create({
  withCredentials: false,
  baseURL: baseURL
})

instance.interceptors.response.use(
  (response) => {
    if (response?.data?.token) {
      setBearerToken(response?.data?.token)
    }
    return response
  },
  (error) => {
    // refresh token
    if (error.response.status === 401 && error?.response?.data?.message?.includes('Token has expired')) {
      axios.get(`${baseURL}refresh-token`, { headers: { Authorization: `Bearer ${UserStorage.getInstance().token}` } }).catch(() => {
        removeToken()
        UserStorage.getInstance().delUser()
      })
    }
    return error
  }
)

const setBearerToken = async (token: string | null = null) => {
  let user_is_authentificated = false
  const accessToken = token || UserStorage.getInstance().token || ''
  return new Promise((resolve) => {
    if (accessToken) {
      if (!UserStorage.getInstance().token) user_is_authentificated = true
      instance.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`
    } else delete instance.defaults.headers.common['Authorization']
    resolve(instance)
    if (user_is_authentificated) setTimeout(() => (UserStorage.getInstance().token = token), 500)
  })
}

setBearerToken()

export const removeToken = () => (instance.defaults.headers.common['Authorization'] = null)

export default instance
