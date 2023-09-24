<script lang="ts" setup>
const props = defineProps({
  field: Object,
  errorMessage: String,
  meta: Object,

  placeholder: {
    type: String,
    default: ''
  },
  tag_type: {
    type: String as () => 'input' | 'textarea',
    default: 'input'
  },
  type: {
    type: String as () => 'email' | 'password' | 'text',
    default: 'text'
  },
  classNames: {
    type: String,
    default: 'shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
  }
})
</script>
<template>
  <input
    v-if="props.tag_type === 'input'"
    v-bind="props.field"
    :type="props.type"
    :placeholder="props.placeholder"
    :class="[
      props.meta?.valid && props.meta?.touched
        ? 'border-green-400'
        : !props.meta?.valid && props.meta?.touched
        ? 'border-red-300'
        : 'border-gray-300',
      props.classNames
    ]"
  />
  <textarea
    v-else
    v-bind="props.field"
    :placeholder="props.placeholder"
    :class="[
      props.meta?.valid && props.meta?.touched
        ? 'border-green-400'
        : !props.meta?.valid && props.meta?.touched
        ? 'border-red-300'
        : 'border-gray-300',
      props.classNames
    ]"
  ></textarea>

  <div class="absolute mt-1 right-0" v-if="props.errorMessage && !props.meta?.valid">
    <span>⛔️</span>
    <span class="text-red-500 text-xs italic m">{{ props.errorMessage }}</span>
  </div>
</template>
