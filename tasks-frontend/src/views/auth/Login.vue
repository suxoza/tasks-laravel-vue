<script setup lang="ts">
// vue
import { useRouter } from 'vue-router'
// validate
import { Field, Form } from 'vee-validate'
import * as yup from 'yup'
// toast
import { toast } from 'vue3-toastify'
// interfaces
import { UserType } from '@/interfaces/User'
// components
import InputComponent from '@/components/InputComponent.vue'
import SwitchMenu from '@/components/SwitchMenu.vue'

// stores
import { useUserStore } from '@/stores/userStore'
import { loginUser } from '@/requests/authRequests'
import { useGlobalStore } from '@/stores/globalStore'

// helpers
import { callback } from '@/utils/helper'

// vars
const router = useRouter()
const userStore = useUserStore()
const globalStore = useGlobalStore()

const schema = yup.object<UserType>({
  email: yup.string().email('Invalid email format').required('Email is required'),
  password: yup.string().min(8, 'Password must by at least 8 characters').required('Password is required')
})

// methods
const onSubmit = async (userData: UserType) => {
  try {
    globalStore.setLoadingStatus()
    const response = await loginUser(userData)
    userStore.setUser({ ...response.user, ...response.token })
    toast.success('Welcome Back!')
    callback(() => {
      router.push({ name: 'task-list', replace: true })
      globalStore.setLoadingStatus()
    })
  } catch (error) {
    globalStore.setLoadingStatus()
    toast.error(error.toString() || JSON.stringify(error))
  } finally {
  }
}
</script>

<template>
  <div class="flex w-full h-full items-center justify-center">
    <div class="flex items-center justify-center pt-10 flex-col w-[30rem]">
      <SwitchMenu />
      <Form
        v-slot="{ meta }"
        :validation-schema="schema"
        @submit="onSubmit"
        class="bg-white rounded px-8 pt-6 p-8 m-5 w-full flex flex-col gap-y-8 shadow-2xl"
      >
        <!-- email  -->
        <div class="relative gap">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="title"> Email </label>
          <Field name="email" type="email" v-slot="{ field, errorMessage, meta }">
            <InputComponent type="email" placeholder="Email" :field="field" :errorMessage="errorMessage" :meta="meta" />
          </Field>
        </div>
        <!-- password  -->
        <div class="relative gap">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password"> Password </label>
          <Field name="password" type="text" v-slot="{ field, errorMessage, meta }">
            <InputComponent type="password" placeholder="Password" :field="field" :errorMessage="errorMessage" :meta="meta" />
          </Field>
        </div>

        <div class="flex items-center justify-center mt-10">
          <button
            :class="{ 'opacity-50': !(meta.touched && meta.valid) }"
            type="submit"
            class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
          >
            Save
          </button>
        </div>

        <div class="w-full flex items-center justify-center text-blue-500 underline">
          <router-link :to="{ name: 'register' }">Register</router-link>
        </div>
      </Form>
    </div>
  </div>
</template>
