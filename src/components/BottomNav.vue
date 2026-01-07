<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 z-50">
    <div class="flex justify-around items-center h-16 max-w-feed mx-auto">
      <router-link
        to="/"
        class="flex flex-col items-center justify-center flex-1 h-full"
        :class="isHomeActive ? 'text-white' : 'text-gray-500'"
        aria-label="Home"
      >
        <svg 
          class="w-7 h-7" 
          :fill="isHomeActive ? 'currentColor' : 'none'"
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        <span class="text-xs mt-1">Home</span>
      </router-link>

      <router-link
        :to="`/profile/${currentUser.id}`"
        class="flex flex-col items-center justify-center flex-1 h-full"
        :class="isProfileActive ? 'text-white' : 'text-gray-500'"
        aria-label="Profile"
      >
        <svg 
          class="w-7 h-7" 
          :fill="isProfileActive ? 'currentColor' : 'none'"
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
          />
        </svg>
        <span class="text-xs mt-1">Profile</span>
      </router-link>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useAppStore } from '@/store'

const route = useRoute()
const store = useAppStore()

const currentUser = computed(() => store.currentUser)
const isHomeActive = computed(() => route.path === '/')
const isProfileActive = computed(() => route.path.startsWith('/profile'))
</script>
