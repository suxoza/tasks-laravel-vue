<script setup lang="ts">
// vue
import { reactive, ref } from 'vue'
// validate
import { Field, Form } from 'vee-validate'
import * as yup from 'yup'
// externals
import VueDatePicker from '@vuepic/vue-datepicker'
// interfaces
import { TaskType } from '@/interfaces/task/Task'
// components
import InputComponent from '@/components/InputComponent.vue'
// ext
import { toast } from 'vue3-toastify'

// vars
const attempt_submit = ref(false)
const schema = yup.object<TaskType>({
  title: yup.string().min(3, 'Title must be at least 3 characters').required('Title is required'),
  description: yup.string().min(10, 'Description must be at least 10 characters').required('Description is required')
})

// props
const props = defineProps({
  task: Object as () => TaskType
})

// emit
const emits = defineEmits(['submit'])
const optionalFields = reactive<TaskType>({
  date_from: props.task?.date_from_new,
  due_date: props.task?.due_date_new,
  is_active: props.task?.is_active === 1 ? true : false
})

// methods
const onSubmit = (values: TaskType) => {
  attempt_submit.value = false
  if (!optionalFields.due_date) {
    attempt_submit.value = true
    return toast.warning('Due Date field is mandatory!')
  }
  emits('submit', { ...values, ...optionalFields })
}
</script>

<template>
  <div class="w-full flex items-center justify-center pt-10">
    <Form
      v-slot="{ meta }"
      :validation-schema="schema"
      :initial-values="props.task"
      @submit="onSubmit"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-[30rem] flex flex-col gap-y-5"
    >
      <!-- title  -->
      <div class="relative gap">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="title"> Title </label>
        <Field name="title" type="text" v-slot="{ field, errorMessage, meta }">
          <InputComponent placeholder="Task Title" :field="field" :errorMessage="errorMessage" :meta="meta" />
        </Field>
      </div>

      <!-- description  -->
      <div class="relative">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="description"> Description </label>
        <Field name="description" type="text" v-slot="{ field, errorMessage, meta }">
          <InputComponent tag_type="textarea" placeholder="Task description" :field="field" :errorMessage="errorMessage" :meta="meta" />
        </Field>
      </div>

      <!-- date from/due  -->
      <div>
        <label class="block text-gray-700 text-sm font-bold mb-2" for="date_from"> From Date </label>
        <VueDatePicker input-class-name="h-12" v-model="optionalFields.date_from" :max-date="optionalFields.due_date || null" />
      </div>
      <div>
        <label class="block text-gray-700 text-sm font-bold mb-2" for="date_from"> Due Date </label>
        <VueDatePicker
          :input-class-name="'h-12 border-2 border-red-500 ' + (attempt_submit && !optionalFields.due_date ? 'invalid' : '')"
          v-model="optionalFields.due_date"
          :min-date="optionalFields.date_from || null"
        />
      </div>

      <!-- isActive  -->
      <div>
        <div class="">
          <label class="flex w-full items-center gap-x-3">
            <div class="relative inline-flex items-center cursor-pointer my-3">
              <input v-model="optionalFields.is_active" type="checkbox" class="sr-only peer" />
              <div
                class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
              ></div>
            </div>
            <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-800">Active</span>
          </label>
        </div>
      </div>
      <!-- isActive  -->

      <!-- Due date  -->
      <div class="flex items-center justify-center mt-10">
        <button
          :class="{ 'opacity-50': !(meta.touched && meta.valid) || !optionalFields.due_date }"
          type="submit"
          class="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded focus:outline-none focus:shadow-outline"
        >
          Save
        </button>
      </div>
    </Form>
  </div>
</template>

<style>
.dp__pointer.dp__input_readonly.dp__input.dp__input_icon_pad.dp__input_reg.invalid {
  border-color: red;
}
</style>
