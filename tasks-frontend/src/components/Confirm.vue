<script setup lang="ts">
import { watch } from 'vue'
// props
const props = defineProps({
  isActive: {
    type: Boolean,
    default: true
  },
  isFixed: {
    type: Boolean,
    default: true
  },
  promptMessage: {
    type: String,
    default: 'Are you ure?'
  }
})
// watchers
watch(
  () => props.isActive,
  (n) => {
    if (props.isFixed) document.body.style.overflow = n ? 'hidden' : 'auto'
  }
)

const emits = defineEmits(['update:deleteTrigger'])
</script>

<template>
  <div
    v-if="isActive"
    autofocus
    :class="[isFixed ? 'fixed' : 'absolute']"
    class="w-screen h-screen flex items-center justify-center bg-gray-300 bg-opacity-50 z-20 inset-0 px-5"
    @click="emits('update:deleteTrigger', false)"
  >
    <div class="flex flex-col p-5 bg-white border-gray-300 border-2 items-center justify-center gap-y-8 rounded-lg shadow-xl w-[20rem]">
      <input class="opacity-0 h-0" type="text" autofocus @keydown.enter="emits('update:deleteTrigger', true)" />
      <div class="text-xl font-bold">{{ props.promptMessage }}</div>
      <div class="flex gap-x-5 w-full cursor-pointer">
        <div class="hover:shadow-lg rounded-md px-5 py-1 w-1/2 bg-white text-black flex items-center justify-center border-gray-300 border">
          Cancel
        </div>
        <div
          @click.stop="emits('update:deleteTrigger', true)"
          class="hover:shadow-lg rounded-md px-5 py-1 w-1/2 bg-blue-500 text-white flex items-center justify-center"
        >
          Ok
        </div>
      </div>
    </div>
  </div>
</template>
