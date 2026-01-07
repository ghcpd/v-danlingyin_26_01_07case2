<template>
  <div class="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
    <nav class="max-w-feed mx-auto flex justify-around items-center h-16">
      <router-link
        to="/"
        class="flex flex-col items-center justify-center flex-1 h-full text-white transition-colors"
        :class="{ 'text-pink-500': isActive('/') }"
        aria-label="Home"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
        <span class="text-xs mt-1">Home</span>
      </router-link>

      <router-link
        to="/profile"
        class="flex flex-col items-center justify-center flex-1 h-full text-white transition-colors"
        :class="{ 'text-pink-500': isActive('/profile') }"
        aria-label="Profile"
      >
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
        <span class="text-xs mt-1">Profile</span>
      </router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const isActive = computed(() => {
  return (path: string): boolean => {
    return route.path === path
  }
})
</script>
