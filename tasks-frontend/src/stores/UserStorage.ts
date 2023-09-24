import { UserType } from '@/interfaces/User'

class UserStorage {
  private static instance: UserStorage
  private static storage: any
  private static keyName = 'user'

  private constructor() {
    UserStorage.storage = sessionStorage
  }

  public static getInstance(): UserStorage {
    if (!UserStorage.instance) UserStorage.instance = new UserStorage()
    return UserStorage.instance
  }

  public get user() {
    return JSON.parse(UserStorage.storage.getItem(UserStorage.keyName))
  }

  public set user(userData: UserType) {
    UserStorage.storage.setItem(UserStorage.keyName, JSON.stringify(userData))
  }

  public get token(): UserType | null {
    return this.user?.token ?? null
  }

  public set token(token: string) {
    const user = this.user
    if (user) {
      this.user = { ...user, token: token }
    }
  }

  public delUser() {
    UserStorage.storage.removeItem(UserStorage.keyName)
  }

  public get authenticated() {
    const status = !['undefined', null].includes(UserStorage.storage.getItem(UserStorage.keyName))
    return status || false
  }
}

export default UserStorage
