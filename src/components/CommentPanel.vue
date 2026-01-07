<template>
  <div 
    v-if="isVisible"
    class="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-end"
    @click.self="close"
  >
    <div class="bg-gray-900 w-full max-h-[70vh] rounded-t-2xl overflow-hidden flex flex-col">
      <div class="flex justify-between items-center p-4 border-b border-gray-800">
        <h3 class="text-white font-semibold text-lg">
          {{ commentCount }} Comments
        </h3>
        <button
          @click="close"
          class="text-gray-400 hover:text-white"
          aria-label="Close comments"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div class="flex-1 overflow-y-auto p-4">
        <div 
          v-if="comments.length === 0"
          class="text-center text-gray-500 py-8"
        >
          No comments yet. Be the first to comment!
        </div>
        
        <div 
          v-for="comment in comments"
          :key="comment.id"
          class="flex gap-3 mb-4"
        >
          <img 
            :src="comment.avatar"
            :alt="comment.username"
            class="w-10 h-10 rounded-full flex-shrink-0"
          />
          <div class="flex-1">
            <div class="flex items-baseline gap-2">
              <span class="text-white font-semibold text-sm">{{ comment.username }}</span>
              <span class="text-gray-500 text-xs">{{ formatTime(comment.createdAt) }}</span>
            </div>
            <p class="text-gray-300 text-sm mt-1">{{ comment.text }}</p>
          </div>
        </div>
      </div>

      <div class="p-4 border-t border-gray-800">
        <div class="flex gap-2">
          <input
            type="text"
            placeholder="Add a comment..."
            class="flex-1 bg-gray-800 text-white px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Add comment"
          />
          <button
            class="px-6 py-2 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700"
            aria-label="Post comment"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Comment } from '@/types'

interface Props {
  isVisible: boolean
  comments: Comment[]
  commentCount: number
}

defineProps<Props>()

const emit = defineEmits<{
  close: []
}>()

const close = (): void => {
  emit('close')
}

const formatTime = (timestamp: string): string => {
  const date = new Date(timestamp)
  const now = new Date()
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diff < 60) return 'Just now'
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`
  return date.toLocaleDateString()
}
</script>
