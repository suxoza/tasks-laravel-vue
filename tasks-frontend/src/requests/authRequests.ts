import axios, { removeToken } from './requests'
import { UserType } from '@/interfaces/User'

const registerUser = async (user: UserType) => {
  const response = await axios.post('/register', {
    name: user.name,
    email: user.email,
    password: user.password
  })

  if (response.status === 201) return response.data
  throw new Error('Registration Failed')
}

const loginUser = async (user: UserType) => {
  const response = await axios.post('/login', {
    email: user.email,
    password: user.password
  })

  if (response.status === 200) return response.data
  throw new Error('Login Failed')
}

const logout = async () => {
  removeToken()
  const response = await axios.post('/logout')
  if (response.status === 200) return response.data
  throw new Error('Login Failed')
}

export { registerUser, loginUser, logout }
