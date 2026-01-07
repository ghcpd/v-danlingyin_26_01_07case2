<template>
  <div class="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-end" @click="handleBackdropClick">
    <div class="bg-gray-900 rounded-t-3xl w-full max-h-[70vh] overflow-y-auto" @click.stop>
      <div class="sticky top-0 bg-gray-900 border-b border-gray-700 p-4">
        <div class="flex items-center justify-between">
          <h2 class="text-white text-lg font-semibold">
            {{ commentCount }} Comments
          </h2>
          <button
            @click="$emit('close')"
            class="text-white p-2 hover:bg-gray-800 rounded-full transition-colors"
            aria-label="Close comments"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>

      <div class="p-4 space-y-4">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="flex gap-3"
        >
          <UserAvatar
            :avatar="getUserAvatar(comment.userId)"
            :username="getUserName(comment.userId)"
            size="small"
          />
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <span class="text-white font-semibold text-sm">
                {{ getUserName(comment.userId) }}
              </span>
              <span class="text-gray-500 text-xs">
                {{ formatDate(comment.createdAt) }}
              </span>
            </div>
            <p class="text-white text-sm mt-1">{{ comment.text }}</p>
          </div>
        </div>

        <div v-if="comments.length === 0" class="text-center py-8 text-gray-400">
          No comments yet. Be the first to comment!
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import type { Comment } from '@/types'
import { useAppStore } from '@/store'
import UserAvatar from './UserAvatar.vue'

interface Props {
  videoId: string
  commentCount: number
}

const props = defineProps<Props>()
const emit = defineEmits<{
  close: []
}>()

const store = useAppStore()

// Mock comments for the video
const comments = computed<Comment[]>(() => {
  // In a real app, this would fetch comments from an API
  return [
    {
      id: 'c1',
      userId: 'user2',
      videoId: props.videoId,
      text: 'This is amazing! 😍',
      createdAt: new Date(Date.now() - 3600000).toISOString()
    },
    {
      id: 'c2',
      userId: 'user3',
      videoId: props.videoId,
      text: 'Love this content! Keep it up! 🔥',
      createdAt: new Date(Date.now() - 7200000).toISOString()
    },
    {
      id: 'c3',
      userId: 'user4',
      videoId: props.videoId,
      text: 'Great work! 👏',
      createdAt: new Date(Date.now() - 10800000).toISOString()
    }
  ]
})

function getUserAvatar(userId: string): string {
  const user = store.getUserById(userId)
  return user?.avatar || ''
}

function getUserName(userId: string): string {
  const user = store.getUserById(userId)
  return user?.username || 'Unknown'
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMs / 3600000)
  const diffDays = Math.floor(diffMs / 86400000)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  if (diffDays < 7) return `${diffDays}d ago`
  return date.toLocaleDateString()
}

function handleBackdropClick(): void {
  emit('close')
}
</script>
