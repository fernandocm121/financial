<template>
  <div class="w-full flex justify-center">
    <div 
      class="w-1/3 bg-white"
    >
      Realize o login
      <div class="mx-4 my-4">
        <input
          class="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
          placeholder="email"
          type="email" 
        >
        <input
          class="px-4 w-full border-2 py-2 rounded-md text-sm outline-none"
          placeholder="password"
          type="password"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, reactive } from 'vue'

defineProps({
  msg: String
})

const state = reactive({ count: 0 })
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
